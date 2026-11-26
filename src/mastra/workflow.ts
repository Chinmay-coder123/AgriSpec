import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { createStep, createWorkflow } from '@mastra/core/workflows';
import { z } from 'zod';
import { requirementsAgent, sdlcSelectionAgent } from './agri-agents';
import { OUT_OF_DOMAIN_REPLY } from './prompts';
import { describeGenerationFailure, textFromGenerateResult } from './text-utils';
import { workspaceRoot } from './workspace';

const previewDir = join(workspaceRoot, 'artifacts/evaluation');

const resultSchema = z.object({
  requirements: z.string(),
  sdlc: z.string(),
  document: z.string(),
  outOfDomain: z.boolean(),
});

// Step 1: Agent (i) writes the requirements specification.
const listRequirements = createStep({
  id: 'list-agritech-requirements',
  description: 'AgriTech Requirements Agent structures the brief into traceable requirements.',
  inputSchema: z.object({ prompt: z.string() }),
  outputSchema: z.object({ requirements: z.string() }),
  execute: async ({ inputData }) => {
    const result = await requirementsAgent.generate(
      `${inputData.prompt}\n\nCOMPACT MODE: keep every field short. Write 12 to 16 requirements. Use the exact section order and requirement line format.`,
    );
    const requirements = textFromGenerateResult(result);
    if (!requirements) throw new Error(`AgriTech Requirements Agent returned no text. ${describeGenerationFailure(result)}`);
    return { requirements };
  },
});

// Step 2: Agent (ii) reads that specification and chooses an SDLC.
const selectSdlc = createStep({
  id: 'select-agritech-sdlc',
  description: 'AgriTech SDLC Selection Agent chooses and justifies a lifecycle for the SRS.',
  inputSchema: z.object({ requirements: z.string() }),
  outputSchema: resultSchema,
  execute: async ({ inputData }) => {
    // If agent (i) rejected the brief as not AgriTech, skip the SDLC call.
    if (inputData.requirements.trim().startsWith(OUT_OF_DOMAIN_REPLY)) {
      return { requirements: inputData.requirements, sdlc: '', document: inputData.requirements.trim(), outOfDomain: true };
    }
    const result = await sdlcSelectionAgent.generate(
      `Select a suitable SDLC for this AgriTech specification.\n\n${inputData.requirements}\n\nCOMPACT MODE: keep the table and each paragraph short. Use the exact section order.`,
    );
    const sdlc = textFromGenerateResult(result);
    if (!sdlc) throw new Error(`AgriTech SDLC Selection Agent returned no text. ${describeGenerationFailure(result)}`);
    return {
      requirements: inputData.requirements,
      sdlc,
      document: `${inputData.requirements.trim()}\n\n---\n\n${sdlc.trim()}`,
      outOfDomain: false,
    };
  },
});

const escapeForScript = (value: string) => JSON.stringify(value).replace(/</g, '\\u003c');

const htmlPreview = (markdown: string) => `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>AgriSpec AI AgriTech Requirements and SDLC</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.8.1/github-markdown.min.css"/>
<style>body{box-sizing:border-box;min-width:200px;max-width:980px;margin:0 auto;padding:45px;background:#f4f8ee}.markdown-body{background:#fff;border-top:5px solid #3f7d2a;padding:32px;border-radius:12px;box-shadow:0 8px 28px #2a4a1c18}.markdown-body h1{color:#2f5d1f}.markdown-body h2{border-bottom-color:#d9e8c9}pre.raw{white-space:pre-wrap}</style></head>
<body class="markdown-body"><div id="content"></div><script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script>const md=${escapeForScript(markdown)};const el=document.getElementById('content');
if(window.marked){el.innerHTML=marked.parse(md);}else{const pre=document.createElement('pre');pre.className='raw';pre.textContent=md;el.appendChild(pre);}</script></body></html>`;

// Step 3: save the combined document as Markdown and HTML.
const writePreview = createStep({
  id: 'write-agritech-preview',
  description: 'Write Markdown and lightly styled HTML previews under artifacts/evaluation.',
  inputSchema: resultSchema,
  outputSchema: resultSchema.extend({ markdownPath: z.string(), htmlPath: z.string() }),
  execute: async ({ inputData }) => {
    await mkdir(previewDir, { recursive: true });
    const markdownPath = join(previewDir, 'latest.md');
    const htmlPath = join(previewDir, 'latest.html');
    await writeFile(markdownPath, `${inputData.document.trim()}\n`, 'utf8');
    await writeFile(htmlPath, htmlPreview(inputData.document), 'utf8');
    return { ...inputData, markdownPath, htmlPath };
  },
});

export const requirementsThenSdlc = createWorkflow({
  id: 'requirements-then-sdlc',
  description: 'AgriTech workflow: structure a brief, select a justified SDLC, and write traceable Markdown and HTML previews.',
  inputSchema: z.object({ prompt: z.string() }),
  outputSchema: resultSchema.extend({ markdownPath: z.string(), htmlPath: z.string() }),
})
  .then(listRequirements)
  .then(selectSdlc)
  .then(writePreview)
  .commit();

export const runRequirementsThenSdlc = async (prompt: string) => {
  const run = await requirementsThenSdlc.createRun();
  const result = await run.start({ inputData: { prompt } });
  if (result.status !== 'success') {
    throw new Error(`Workflow failed: ${result.status === 'failed' ? result.error.message : result.status}`);
  }
  return result.result;
};
