# CV Builder Workspace

## Overview

pnpm workspace monorepo using TypeScript. A fully-featured CV/resume builder web application.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Frontend**: React + Vite, Tailwind CSS v4, shadcn/ui, wouter routing
- **State management**: Zustand (with localStorage persistence via `persist` middleware)
- **DnD**: @dnd-kit/core, @dnd-kit/sortable for section reordering
- **PDF export**: html2pdf.js
- **Themes**: next-themes (dark/light mode)
- **Notifications**: Sonner toast
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle for API server)
- **AI**: OpenAI via Replit AI Integration (ai-integrations-openai-ai-server/react libs)

## Artifacts

### `artifacts/cv-builder` (web, port 22723, previewPath `/`)
Full CV builder SPA. All data stored in localStorage (no database needed).

Features:
- Split-screen editor (left nav + form editor + right preview)
- 7 premium templates: Modern, Classic, Minimal, Creative, Executive, Slate, Emerald
- All CV sections: Personal, Experience, Education, Skills, Projects, Certifications, Achievements, Languages, Custom sections
- Drag-and-drop section reordering (dnd-kit)
- Section visibility toggle
- Accent color picker + font size slider
- AI-generated summary (calls `/api/ai/generate-summary`)
- Resume score checker (calls `/api/ai/resume-score`)
- PDF export via html2pdf.js
- Dark/light mode toggle
- Auto-save to localStorage

### `artifacts/api-server` (API, port 8080, previewPath `/api`)
Express API server. Routes:
- `GET /api/healthz` — health check
- `POST /api/ai/generate-summary` — AI professional summary generation (OpenAI GPT)
- `POST /api/ai/resume-score` — Algorithmic resume strength checker

## Libraries

- `lib/api-spec` — OpenAPI spec + Orval codegen config
- `lib/api-client-react` — Generated React Query hooks (useGenerateSummary, useGetResumeScore)
- `lib/api-zod` — Generated Zod validation schemas
- `lib/integrations-openai-ai-server` — OpenAI client for server
- `lib/integrations-openai-ai-react` — OpenAI integration for React (future use)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run typecheck:libs` — build composite lib declarations
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks from OpenAPI spec
  - **IMPORTANT**: After codegen, always overwrite `lib/api-zod/src/index.ts` with just `export * from "./generated/api";` (orval generates an incorrect barrel with a reference to `./generated/api.schemas`)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Important Notes

- `lib/api-zod/src/index.ts` must only contain `export * from "./generated/api";`
- Orval zod config uses `mode: "single"` with `target: "generated/api.ts"`
- CV builder has no database — all state is in Zustand persisted to localStorage key `cv-builder-data`
- The API server uses esbuild (not tsc) for bundling, so type errors don't block runtime
