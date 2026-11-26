import { Agent } from '@mastra/core/agent';
import { chatModel } from './lm-studio';

// Small chat entry point for Mastra Studio (npm run dev). The web app does not call it.
export const coordinatorAgent = new Agent({
  id: 'agritech-coordinator-agent',
  name: 'AgriSpec Coordinator',
  description: 'Local Studio coordinator for the AgriTech requirements-to-SDLC workflow.',
  instructions:
    'Use the requirements-then-sdlc workflow for AgriTech project briefs. Do not give agronomic, pesticide, veterinary, financial, or legal advice; route safety, privacy, regulatory, and production decisions to authorised human reviewers.',
  model: chatModel,
  defaultOptions: {
    modelSettings: { maxOutputTokens: 300 },
    providerOptions: { lmStudio: { reasoningEffort: 'none', enable_thinking: false } },
  },
});
