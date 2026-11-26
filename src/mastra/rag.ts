import type { InputProcessorOrWorkflow, ProcessInputArgs, ProcessInputResult } from '@mastra/core/processors';
import { agriWorkspace } from './workspace';

const MAX_HIT_CHARS = 1000;
const TOP_K = 5;
const MAX_HITS = 6;

// Always-on query so every run sees AgriTech privacy, scheme, drone, and SDLC context even when the brief is short.
const AGRI_BASE_QUERY =
  'agriculture farmer Agristack consent DPDP privacy drone pesticide fertiliser mandi crop insurance IoT sensor offline security SDLC verification';

type Hit = { id: string; content: string };

const partText = (part: unknown): string => {
  if (typeof part === 'string') return part;
  if (!part || typeof part !== 'object') return '';
  const record = part as Record<string, unknown>;
  if (typeof record.text === 'string') return record.text;
  if (typeof record.content === 'string') return record.content;
  return '';
};

const messageText = (message: { content?: unknown }): string => {
  const content = message.content;
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) return content.map(partText).join('\n');
  if (content && typeof content === 'object') {
    const record = content as Record<string, unknown>;
    if (typeof record.content === 'string') return record.content;
    if (Array.isArray(record.parts)) return record.parts.map(partText).join('\n');
  }
  return '';
};

const lastUserIndex = (messages: Array<{ role?: string }>) => {
  for (let i = messages.length - 1; i >= 0; i--) if (messages[i]?.role === 'user') return i;
  return -1;
};

export const retrieveEvidence = async (query: string): Promise<Hit[]> => {
  const trimmed = query.trim();
  if (trimmed.length < 8) return [];
  // BM25 is keyword matching (like a smarter Ctrl+F), not an AI model.
  const results = await agriWorkspace.search(trimmed, { mode: 'bm25', topK: TOP_K });
  return results as Hit[];
};

const uniqueHits = (...lists: Hit[][]) => {
  const seen = new Set<string>();
  const merged: Hit[] = [];
  for (const list of lists) {
    for (const hit of list) {
      if (seen.has(hit.id)) continue;
      seen.add(hit.id);
      merged.push(hit);
    }
  }
  return merged.slice(0, MAX_HITS);
};

export const formatEvidence = (hits: Hit[]) => {
  if (hits.length === 0) {
    return [
      'Retrieved AgriTech evidence: none.',
      'Mark every scheme, regulatory, privacy, safety, security, and numeric claim NEEDS-VALIDATION.',
      'Do not invent thresholds or legal applicability.',
    ].join('\n');
  }
  const blocks = hits.map((hit, index) => {
    const excerpt = hit.content.replace(/\s+/g, ' ').trim().slice(0, MAX_HIT_CHARS);
    return `[${index + 1}] ${hit.id}\n${excerpt}`;
  });
  return [
    'Retrieved evidence from docs/ingested (already searched; do not call search tools).',
    'These are orientation notes, not official text or advice. Cite the path shown for each item you use.',
    ...blocks,
  ].join('\n\n');
};

export const assertCorpusSearchable = async () => {
  const hits = await retrieveEvidence('agriculture farmer consent privacy Agristack crop insurance mandi');
  if (hits.length === 0) throw new Error('Workspace BM25 index returned no AgriTech hits; docs/ingested was not indexed.');
};

// Prepend the evidence to the user's message. Some local chat templates accept only ONE system message,
// so the evidence travels inside the user turn instead of as an extra system message.
const withEvidenceInUserTurn = (messages: ProcessInputArgs['messages'], index: number, evidence: string) => {
  const original = messages[index] as unknown as { content?: unknown };
  const prefix = `${evidence}\n\n---\nUser request:\n`;
  const next = [...messages] as unknown as Array<{ content?: unknown }>;
  const content = original.content;

  if (typeof content === 'string') {
    next[index] = { ...original, content: prefix + content };
    return next as unknown as ProcessInputArgs['messages'];
  }
  if (content && typeof content === 'object') {
    const record = content as { content?: unknown; parts?: unknown };
    if (Array.isArray(record.parts)) {
      const parts = record.parts.map((part) => ({ ...(part as object) })) as Array<{ type?: string; text?: string }>;
      const textPart = parts.find((part) => part.type === 'text' && typeof part.text === 'string');
      if (textPart) {
        textPart.text = prefix + textPart.text;
        next[index] = {
          ...original,
          content: { ...record, parts, ...(typeof record.content === 'string' ? { content: prefix + record.content } : {}) },
        };
        return next as unknown as ProcessInputArgs['messages'];
      }
    }
  }
  return null;
};

export const ragContextProcessor = {
  id: 'rag-context-processor',
  name: 'AgriTech RAG Context',
  async processInput({ messages, systemMessages }: ProcessInputArgs): Promise<ProcessInputResult> {
    const index = lastUserIndex(messages as Array<{ role?: string }>);
    if (index < 0) return { messages, systemMessages };
    const query = messageText(messages[index] as unknown as { content?: unknown }).trim();
    if (!query) return { messages, systemMessages };

    const evidence = formatEvidence(uniqueHits(await retrieveEvidence(query), await retrieveEvidence(AGRI_BASE_QUERY)));
    const merged = withEvidenceInUserTurn(messages, index, evidence);
    if (merged) return { messages: merged, systemMessages };
    // Fallback if the message shape is unexpected: add a system message instead.
    return { messages, systemMessages: [...systemMessages, { role: 'system', content: evidence }] };
  },
} as InputProcessorOrWorkflow;
