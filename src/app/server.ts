import 'dotenv/config';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { extname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import '../mastra/index.js';
import { config } from '../mastra/config.js';
import { runRequirementsThenSdlc } from '../mastra/workflow.js';

const projectRoot = join(fileURLToPath(new URL('.', import.meta.url)), '../..');
const publicRoot = join(projectRoot, 'public');
const port = Number(process.env.AGRISPEC_PORT ?? process.env.PORT ?? 4174);
const host = process.env.AGRISPEC_HOST ?? '127.0.0.1';
const MAX_BODY_BYTES = 64 * 1024;

const contentTypes: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
};

class HttpError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

const sendJson = (response: ServerResponse, status: number, body: unknown) => {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  response.end(JSON.stringify(body));
};

const readBody = async (request: IncomingMessage) => {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of request) {
    const buffer = Buffer.from(chunk);
    size += buffer.length;
    if (size > MAX_BODY_BYTES) throw new HttpError(413, 'Request body is too large.');
    chunks.push(buffer);
  }
  return Buffer.concat(chunks).toString('utf8');
};

const parseBrief = async (request: IncomingMessage) => {
  let body: { prompt?: unknown };
  try {
    body = JSON.parse(await readBody(request)) as { prompt?: unknown };
  } catch (error) {
    if (error instanceof HttpError) throw error;
    throw new HttpError(400, 'Request body must be valid JSON like {"prompt":"..."}.');
  }
  const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';
  const { minBriefChars, maxBriefChars } = config.limits;
  if (prompt.length < minBriefChars) throw new HttpError(400, `Please provide an AgriTech project brief of at least ${minBriefChars} characters.`);
  if (prompt.length > maxBriefChars) throw new HttpError(400, `Please keep the brief under ${maxBriefChars} characters.`);
  return prompt;
};

const serveStatic = async (requestPath: string, response: ServerResponse) => {
  const requested = requestPath === '/' ? '/index.html' : requestPath;
  const filePath = normalize(join(publicRoot, requested));
  // Path-traversal guard: the resolved path must stay inside /public.
  if (!filePath.startsWith(publicRoot + sep) || !existsSync(filePath)) return false;
  const content = await readFile(filePath);
  response.writeHead(200, { 'Content-Type': contentTypes[extname(filePath)] ?? 'application/octet-stream', 'Cache-Control': 'no-cache' });
  response.end(content);
  return true;
};

// Ask LM Studio which models are loaded so the UI can show a real status.
const checkModel = async () => {
  try {
    const reply = await fetch(`${config.lmStudio.baseURL.replace(/\/$/, '')}/models`, {
      headers: { Authorization: `Bearer ${config.lmStudio.apiKey}` },
      signal: AbortSignal.timeout(2500),
    });
    if (!reply.ok) return { reachable: false, modelLoaded: false };
    const data = (await reply.json()) as { data?: Array<{ id?: string }> };
    const modelLoaded = (data.data ?? []).some((model) => model.id === config.lmStudio.model);
    return { reachable: true, modelLoaded };
  } catch {
    return { reachable: false, modelLoaded: false };
  }
};

// A local model handles one analysis at a time.
let busy = false;

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? '/', `http://${request.headers.host ?? `${host}:${port}`}`);

    if (url.pathname === '/api/health') {
      const lm = await checkModel();
      sendJson(response, 200, { ok: true, service: 'agrispec-ai', workflow: 'requirements-then-sdlc', model: config.lmStudio.model, ...lm, busy });
      return;
    }

    if (url.pathname === '/api/analyze' && request.method === 'POST') {
      const prompt = await parseBrief(request);
      if (busy) throw new HttpError(429, 'An analysis is already running. Please wait for it to finish.');
      busy = true;
      const started = Date.now();
      try {
        const result = await runRequirementsThenSdlc(prompt);
        sendJson(response, 200, { ...result, elapsedSeconds: Math.round((Date.now() - started) / 1000) });
      } finally {
        busy = false;
      }
      return;
    }

    if (request.method === 'GET' && (await serveStatic(url.pathname, response))) return;
    sendJson(response, 404, { error: 'Not found' });
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500;
    const message = error instanceof Error ? error.message : 'Unexpected server error';
    console.error(`[AgriSpec AI] ${message}`);
    sendJson(response, status, { error: message });
  }
});

// Disable server-side request and headers timeouts for long-running local LLM workflows
server.requestTimeout = 0;
server.timeout = 0;
server.headersTimeout = 0;

server.listen(port, host, () => {
  console.log(`AgriSpec AI app: http://${host}:${port}`);
  console.log('Mastra workflow backend: requirements-then-sdlc');
  console.log(`LM Studio: ${config.lmStudio.baseURL} (model ${config.lmStudio.model})`);
  console.log('Press Ctrl+C to stop.');
});
