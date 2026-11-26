import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { LocalFilesystem, Workspace } from '@mastra/core/workspace';

// Find the folder that contains docs/ingested (project root when started with npm run app or mastra dev).
export const workspaceRoot =
  [process.env.AGRISPEC_WORKSPACE_ROOT, process.env.INIT_CWD, process.cwd(), resolve(process.cwd(), '../../..')].find(
    (path): path is string => Boolean(path && existsSync(join(path, 'docs/ingested'))),
  ) ?? process.cwd();

// Read-only workspace: the agents can search the reference library but never change it.
export const agriWorkspace = new Workspace({
  id: 'agrispec-workspace',
  filesystem: new LocalFilesystem({ basePath: workspaceRoot, readOnly: true }),
  bm25: true,
  autoIndexPaths: ['docs/ingested/**/*.txt', 'docs/ingested/**/*.md', 'docs/ingested/**/*.yaml'],
  skills: ['skills'],
  tools: { enabled: false },
});
