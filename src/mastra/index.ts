import { Mastra } from '@mastra/core/mastra';
import { LibSQLStore } from '@mastra/libsql';
import { requirementsAgent, sdlcSelectionAgent } from './agri-agents';
import { coordinatorAgent } from './coordinator-agent';
import { assertCorpusSearchable } from './rag';
import { requirementsThenSdlc } from './workflow';
import { agriWorkspace } from './workspace';

// Registers agents, the workflow, storage, and the document workspace so Mastra Studio can show them.
export const mastra = new Mastra({
  agents: { coordinatorAgent, requirementsAgent, sdlcSelectionAgent },
  workflows: { requirementsThenSdlc },
  storage: new LibSQLStore({
    id: 'agritech-spec-storage',
    url: process.env.MASTRA_DATABASE_URL ?? 'file:./agrispec.db',
  }),
  workspace: agriWorkspace,
});

await agriWorkspace.init();
await assertCorpusSearchable();
