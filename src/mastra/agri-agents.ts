import { Agent } from '@mastra/core/agent';
import { chatModel } from './lm-studio';
import { REQUIREMENTS_PROMPT, SDLC_PROMPT } from './prompts';
import { ragContextProcessor } from './rag';
import { agriWorkspace } from './workspace';

// Qwen-style models can think out loud; ask LM Studio not to. cleanAgentText() strips any leftovers.
const providerOptions = { lmStudio: { reasoningEffort: 'none', enable_thinking: false } } as const;

// Agent (i): turns a brief into a traceable requirements specification.
export const requirementsAgent = new Agent({
  id: 'agritech-requirements-agent',
  name: 'AgriTech Requirements Agent',
  description: '(i) Identify and classify software requirements for an AgriTech project in India.',
  instructions: REQUIREMENTS_PROMPT,
  model: chatModel,
  defaultOptions: { modelSettings: { maxOutputTokens: 4000 }, providerOptions },
  workspace: agriWorkspace,
  inputProcessors: [ragContextProcessor],
});

// Agent (ii): reads the specification and chooses and justifies an SDLC.
export const sdlcSelectionAgent = new Agent({
  id: 'agritech-sdlc-selection-agent',
  name: 'AgriTech SDLC Selection Agent',
  description: '(ii) Identify and justify a suitable lifecycle for an AgriTech requirements specification.',
  instructions: SDLC_PROMPT,
  model: chatModel,
  defaultOptions: { modelSettings: { maxOutputTokens: 3500 }, providerOptions },
  workspace: agriWorkspace,
  inputProcessors: [ragContextProcessor],
});
