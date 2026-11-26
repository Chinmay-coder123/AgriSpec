# AgriSpec AI

A local, privacy-friendly workspace that turns a short **AgriTech project brief** into:

1. a structured, traceable **requirements specification (SRS)** and
2. a justified **SDLC recommendation** (Waterfall, V-Model, Spiral, Agile, DevSecOps, Prototype, or a named Hybrid).

It uses two specialised AI agents chained in a workflow, a small searchable library of reference notes (RAG), and a language model running on your own computer through LM Studio. Nothing is sent to a cloud service.

> AgriSpec AI is a drafting aid for software requirements. It does **not** give agronomic, pesticide, veterinary, financial, insurance, or legal advice. A qualified human must review everything. Use synthetic or anonymised data only.

## How it works

```
Browser (public/)  --POST /api/analyze-->  src/app/server.ts
                                              |
                                              v
                          Mastra workflow: requirements-then-sdlc
        Step 1  AgriTech Requirements Agent  (Agent i)   <-- RAG evidence
        Step 2  AgriTech SDLC Selection Agent (Agent ii) <-- RAG evidence
        Step 3  Save artifacts/evaluation/latest.md and latest.html
                                              |
                                              v
                                    LM Studio (local model)
```

| Piece | File | Role |
|---|---|---|
| Agent (i) | `src/mastra/agri-agents.ts` + `prompts.ts` | Writes the SRS using fixed sections and a one-line-per-requirement format |
| Agent (ii) | `src/mastra/agri-agents.ts` + `prompts.ts` | Reads the SRS and picks one SDLC, with rejected alternatives and a workflow |
| Coordinator | `src/mastra/coordinator-agent.ts` | Small chat agent for Mastra Studio only |
| RAG | `src/mastra/rag.ts`, `workspace.ts` | BM25 keyword search over `docs/ingested`, added to each request |
| Workflow | `src/mastra/workflow.ts` | Chains the two agents and saves the report |
| Registration | `src/mastra/index.ts` | Registers agents, workflow, storage, and workspace |
| Server | `src/app/server.ts` | Serves the UI and the `/api/analyze` and `/api/health` endpoints |
| UI | `public/` | Plain HTML, CSS, and JavaScript |
| Reference library | `docs/ingested/` | Notes the agents can search and cite |

## Setup

Requirements: Node.js 22.13 or newer, and [LM Studio](https://lmstudio.ai).

1. In LM Studio, download a chat model (for example `qwen/qwen3-8b`), load it, and start the **local server** (default `http://127.0.0.1:1234`).
2. Install and configure:
   ```bash
   npm install
   cp .env.example .env
   ```
3. Open `.env` and set `LM_STUDIO_MODEL` to the exact id shown by LM Studio (you can see ids at `http://127.0.0.1:1234/v1/models`).
4. Start the app:
   ```bash
   npm run app
   ```
5. Open <http://127.0.0.1:4174>. The sidebar shows whether LM Studio and the model are ready.

Optional: `npm run dev` opens Mastra Studio, where you can chat with each agent and run the workflow step by step.

## Using it

Paste a brief (20 to 8,000 characters) or click a sample chip, then press **Generate analysis**. A local model can take several minutes. The result has three tabs: the complete document, the requirements only, and the SDLC recommendation. You can copy or download the Markdown. The latest run is also saved in `artifacts/evaluation/` (`latest.md` and `latest.html`).

Example brief:

> A smart irrigation system for smallholder farmers. Soil-moisture sensors send readings to a gateway. A mobile app in Hindi and Kannada works offline and shows schedules. Farmers get SMS alerts. An FPO dashboard shows member plots. Valves can be opened remotely.

If the brief is not about agriculture, Agent (i) answers `OUTSIDE CONFIGURED DOMAIN: AgriTech` and the SDLC step is skipped.

## Configuration

| Variable | Default | Meaning |
|---|---|---|
| `LM_STUDIO_BASE_URL` | `http://127.0.0.1:1234/v1` | LM Studio API address |
| `LM_STUDIO_API_KEY` | `lm-studio` | Any non-empty value |
| `LM_STUDIO_MODEL` | `qwen/qwen3-8b` | Must match a loaded model id |
| `MASTRA_DATABASE_URL` | `file:./agrispec.db` | Local storage for Studio |
| `AGRISPEC_WORKSPACE_ROOT` | project root | Folder containing `docs/ingested` |
| `AGRISPEC_HOST` / `AGRISPEC_PORT` | `127.0.0.1` / `4174` | Web app address |

## Adapting the corpus

Add `.md` or `.txt` files under `docs/ingested/` and restart. See `docs/CORPUS_SOURCES.md` for what each file is and how to replace the included **orientation notes** with official documents. The notes are summaries written for this project and must be verified before relying on them.

## Known limitations

- Small local models can struggle with long, strictly formatted output. If sections are missing or the text is cut off, try a larger model or shorter brief.
- BM25 is keyword matching, so evidence quality depends on the files in `docs/ingested`.
- One analysis runs at a time. There is no streaming, so the page waits for the full result.
- Outputs are drafts. Confidence scores come from the model and are not measured.
- The reference notes may be out of date.

## Scripts

| Command | What it does |
|---|---|
| `npm run app` | Start the web app |
| `npm run dev` | Start Mastra Studio |
| `npm run typecheck` | TypeScript check |
| `npm run check` | Typecheck and build |

## License

MIT
