# MahiCV.AI — AI-Powered CV Builder

A fully featured, browser-based CV builder with live split-screen preview, 7 premium templates, AI-generated summaries, resume scoring, version history, drag-and-drop section reordering, PDF export, and a responsive mobile layout. All data is stored securely in your own browser — no account required.

---

## Features

| Feature | Details |
|---|---|
| **7 Premium Templates** | Modern, Classic, Minimal, Creative, Executive, Slate, Emerald |
| **Live Split-Screen Preview** | Resizable editor & preview panels — drag the divider like Figma |
| **AI Summary Generator** | One-click professional summary powered by OpenAI GPT-4o |
| **Resume Score Checker** | AI analysis with percentage score and actionable feedback |
| **Version History** | Auto-saves every edit to browser localStorage — up to 30 snapshots, restore any version |
| **Auto-save Status** | Live "Saved X ago" indicator updates in real time |
| **PDF Export** | High-quality A4 PDF via `html2pdf.js` |
| **Drag-and-Drop Sections** | Reorder CV sections with `@dnd-kit` |
| **Section Visibility** | Toggle any section on/off without deleting data |
| **Dark / Light Mode** | System-aware theme toggle |
| **Mobile-Friendly** | Fully responsive — native-app style bottom tab bar on phones |
| **Safe Reset** | Confirmation dialog before clearing data; history always preserved |
| **100% Browser-Based** | No account, no server database — your data never leaves your browser |
| **Standalone Backend** | Production-ready Express API deployable independently on Render |

---

## Repository Layout

This project has two independent deployment units:

| Directory | Purpose | Deploy target |
|---|---|---|
| `artifacts/cv-builder/` | React + Vite frontend (full monorepo) | Replit / Vercel / Netlify |
| `artifacts/api-server/` | Express backend (monorepo, Replit-native) | Replit |
| **`backend/`** | **Standalone Express API (zero workspace deps)** | **Render / Railway / Fly.io** |

---

## Tech Stack

### Frontend — `artifacts/cv-builder`

| Category | Technology | Version |
|---|---|---|
| UI Framework | [React](https://react.dev) | 19 |
| Build Tool | [Vite](https://vitejs.dev) | 7 |
| Language | TypeScript | 5.9 |
| Styling | [Tailwind CSS](https://tailwindcss.com) | 4 |
| UI Components | [shadcn/ui](https://ui.shadcn.com) (Radix UI) | latest |
| State Management | [Zustand](https://zustand-demo.pmnd.rs) | 5 |
| Client-side Routing | [Wouter](https://github.com/molefrog/wouter) | 3 |
| Server State / API | [TanStack React Query](https://tanstack.com/query) | 5 |
| Drag and Drop | [@dnd-kit/core](https://dndkit.com) + @dnd-kit/sortable | 6 / 10 |
| Animations | [Framer Motion](https://www.framer.com/motion) | latest |
| PDF Export | [html2pdf.js](https://ekoopmans.github.io/html2pdf.js) | 0.10 |
| Toast Notifications | [Sonner](https://sonner.emilkowal.ski) | 2 |
| Dark Mode | [next-themes](https://github.com/pacocoursey/next-themes) | 0.4 |
| Icons | [Lucide React](https://lucide.dev) | latest |
| ID Generation | [nanoid](https://github.com/ai/nanoid) | 5 |
| Schema Validation | [Zod](https://zod.dev) | latest |
| Forms | [React Hook Form](https://react-hook-form.com) | 7 |

### Standalone Backend — `backend/` (Render-ready)

| Category | Technology | Version |
|---|---|---|
| Runtime | [Node.js](https://nodejs.org) | >=18 |
| HTTP Framework | [Express](https://expressjs.com) | 4 |
| Language | TypeScript | 5.8 |
| AI Integration | [OpenAI](https://platform.openai.com) GPT-4o (standard API key) | 4 |
| Logging | [Pino](https://getpino.io) + pino-http | 9 / 10 |
| Bundler | [esbuild](https://esbuild.github.io) | 0.25 |
| Schema Validation | [Zod](https://zod.dev) | 3 |
| CORS | cors | 2 |

### Monorepo / Tooling

| Category | Technology | Version |
|---|---|---|
| Package Manager | [pnpm](https://pnpm.io) (workspaces) | 10 |
| Type Checking | TypeScript project references | 5.9 |
| API Contract | OpenAPI spec → Orval codegen | — |
| Formatter | Prettier | 3 |

---

## Full Project Structure

```
mahicv-ai/
├── artifacts/
│   ├── cv-builder/                        # React + Vite frontend (monorepo)
│   │   ├── index.html
│   │   └── src/
│   │       ├── components/
│   │       │   ├── editor/                # One editor component per CV section
│   │       │   │   ├── PersonalEditor.tsx
│   │       │   │   ├── ExperienceEditor.tsx
│   │       │   │   ├── EducationEditor.tsx
│   │       │   │   ├── SkillsEditor.tsx
│   │       │   │   ├── ProjectsEditor.tsx
│   │       │   │   ├── CertificationsEditor.tsx
│   │       │   │   ├── AchievementsEditor.tsx
│   │       │   │   ├── LanguagesEditor.tsx
│   │       │   │   └── CustomSectionsEditor.tsx
│   │       │   ├── templates/             # 7 CV templates + dispatcher
│   │       │   │   └── CVPreview.tsx
│   │       │   ├── ui/                    # shadcn/ui base components
│   │       │   ├── AppearanceSettings.tsx
│   │       │   ├── ConfirmDialog.tsx      # Custom portal modal (no Radix)
│   │       │   ├── HistoryPanel.tsx       # Browse & restore saved versions
│   │       │   ├── ResizablePanels.tsx    # Custom drag-to-resize panels
│   │       │   ├── ResumeScore.tsx
│   │       │   ├── SectionsManager.tsx
│   │       │   └── TemplateSelector.tsx
│   │       ├── hooks/
│   │       │   └── useAutoSave.ts         # Debounced auto-save (2.5s) to history
│   │       ├── pages/
│   │       │   └── builder.tsx            # Main page — desktop + mobile layouts
│   │       ├── store/
│   │       │   ├── cv-store.ts            # Zustand store (persisted to localStorage)
│   │       │   └── cv-history-store.ts    # Version history store (max 30 snapshots)
│   │       └── types/
│   │           └── cv.ts                  # All CV data types & interfaces
│   └── api-server/                        # Express backend (Replit monorepo)
│       └── src/
│           ├── routes/
│           │   ├── ai.ts                  # POST /api/ai/generate-summary
│           │   │                          # POST /api/ai/resume-score
│           │   ├── health.ts              # GET  /api/healthz
│           │   └── index.ts
│           ├── lib/
│           │   └── logger.ts
│           ├── app.ts
│           └── index.ts                   # Entry point (reads $PORT)
│
├── backend/                               # Standalone backend — deploy to Render
│   ├── src/
│   │   ├── index.ts                       # process.env.PORT || 5000
│   │   ├── app.ts                         # express + cors + json + / + /health
│   │   ├── lib/
│   │   │   ├── logger.ts                  # Pino (pretty dev / JSON prod)
│   │   │   ├── openai.ts                  # Standard OPENAI_API_KEY client
│   │   │   └── schemas.ts                 # All Zod schemas (inlined, no @workspace/*)
│   │   └── routes/
│   │       ├── index.ts
│   │       ├── health.ts                  # GET / and GET /health
│   │       └── ai.ts                      # POST /api/ai/generate-summary
│   │                                      # POST /api/ai/resume-score
│   ├── build.mjs                          # esbuild: src/index.ts → dist/index.mjs
│   ├── package.json                       # Standalone — zero @workspace/* deps
│   ├── tsconfig.json
│   ├── .env.example                       # Documents all required env vars
│   └── .gitignore
│
├── lib/
│   ├── api-zod/                           # Shared Zod schemas (monorepo only)
│   ├── api-client-react/                  # Generated TanStack Query hooks
│   └── db/                                # Drizzle ORM schema
├── scripts/                               # Shared utility scripts
├── pnpm-workspace.yaml                    # Workspace config + catalog versions
├── tsconfig.base.json                     # Shared TypeScript strict config
├── package.json                           # Root monorepo scripts
└── README.md
```

---

## CV Sections

| Section | Fields |
|---|---|
| Personal Info | Full name, job title, email, phone, location, website, LinkedIn, GitHub, photo URL, professional summary |
| Work Experience | Company, role, location, start/end date, currently working toggle, description, bullet points |
| Education | Institution, degree, field of study, start/end date, GPA, description |
| Skills | Skill name + proficiency level (Beginner / Intermediate / Advanced / Expert) |
| Projects | Project name, URL, description, technology tags |
| Certifications | Name, issuer, date, URL |
| Achievements | Title, description, date |
| Languages | Language name + level (Basic / Conversational / Professional / Fluent / Native) |
| Custom Sections | Any title + unlimited custom items with title, subtitle, date, description |

---

## API Reference

All AI routes are available in both the monorepo backend (`/api/...`) and the standalone backend (`/api/...`).

### `GET /`
```json
{ "message": "MahiCV.AI API is running", "version": "1.0.0" }
```

### `GET /health` or `GET /api/health`
```json
{ "status": "ok" }
```

### `POST /api/ai/generate-summary`
Generates a professional summary paragraph using GPT-4o.

**Request:**
```json
{
  "name": "Jane Smith",
  "currentRole": "Senior Software Engineer",
  "skills": ["React", "TypeScript", "Node.js"],
  "experience": ["Senior Engineer at Acme Corp", "Developer at StartupXYZ"],
  "education": "BSc Computer Science from MIT",
  "tone": "professional"
}
```
> `tone` options: `professional` | `creative` | `technical` | `executive`

**Response:**
```json
{
  "summary": "Results-driven software engineer with 8+ years of experience..."
}
```

---

### `POST /api/ai/resume-score`
Scores the CV on completeness and returns structured feedback (no AI call — instant).

**Request:**
```json
{
  "hasPhoto": true,
  "hasSummary": true,
  "summaryLength": 65,
  "skillsCount": 8,
  "experienceCount": 3,
  "educationCount": 1,
  "hasProjects": true,
  "hasCertifications": false,
  "hasLanguages": true
}
```

**Response:**
```json
{
  "score": 85,
  "level": "excellent",
  "feedback": ["Professional summary present", "8 skills listed", "3 work experiences listed"],
  "suggestions": ["Add certifications to boost credibility"]
}
```
> `level` values: `poor` | `fair` | `good` | `excellent`

---

## Browser Storage

| Key | Storage | Content |
|---|---|---|
| `cv-builder-data` | `localStorage` | Full CV data (auto-persisted by Zustand) |
| `cv-builder-history` | `localStorage` | Array of up to 30 timestamped CV snapshots |
| `mahicv-panel-split` | `sessionStorage` | Last used editor/preview panel split ratio |

> Clearing your browser's site data will erase your CV and history. Export a PDF before clearing if needed.

---

## Prerequisites

| Requirement | Minimum | Recommended |
|---|---|---|
| Node.js | v18 | v24 |
| pnpm | v9 | v10 (monorepo only) |
| npm | v8 | latest (standalone backend) |

Install pnpm if you don't have it:
```bash
npm install -g pnpm
```

---

## Running Locally (Monorepo — Replit)

### 1. Clone & install

```bash
git clone https://github.com/jagdishmaliwad2002/mahicv-ai.git
cd mahicv-ai
pnpm install
```

### 2. Start the API server

```bash
pnpm --filter @workspace/api-server run dev
```

Starts on **port 8080**. Routes served under `/api`.

### 3. Start the frontend

```bash
pnpm --filter @workspace/cv-builder run dev
```

### 4. Open the app

```
http://localhost:80/
```

> Always access via `localhost:80` — both services run behind a shared reverse proxy.

---

## Running the Standalone Backend Locally

```bash
cd backend
npm install
npm run build
npm start
```

Server starts on **port 5000** by default (override with `PORT` env var).

```
http://localhost:5000/
http://localhost:5000/health
http://localhost:5000/api/ai/generate-summary
http://localhost:5000/api/ai/resume-score
```

---

## Deploying the Standalone Backend to Render

1. Push this repo to GitHub
2. In Render, create a new **Web Service**
3. Set **Root Directory** → `backend`
4. Set **Build Command** → `npm install && npm run build`
5. Set **Start Command** → `npm start`
6. Add Environment Variables:

| Variable | Value |
|---|---|
| `NODE_ENV` | `production` |
| `OPENAI_API_KEY` | Your OpenAI API key |
| `CORS_ORIGIN` | Your frontend domain (e.g. `https://mahicv.vercel.app`) |
| `PORT` | Set automatically by Render — do not override |

Render health check URL: `/health`

---

## Environment Variables

### Standalone backend (`backend/`)

| Variable | Required | Description |
|---|---|---|
| `OPENAI_API_KEY` | Yes | Standard OpenAI API key |
| `NODE_ENV` | No | `development` or `production` (default: development) |
| `PORT` | No | Server port (default: 5000, set automatically on Render) |
| `LOG_LEVEL` | No | Pino log level — `info`, `debug`, `warn`, `error` |
| `CORS_ORIGIN` | No | Allowed frontend origin — defaults to `*` |

### Monorepo backend (`artifacts/api-server`)

| Variable | Required | Description |
|---|---|---|
| `SESSION_SECRET` | Yes | Express session signing secret |
| `PORT` | Auto | Assigned automatically by Replit proxy |

---

## Build Outputs

| Target | Command | Output |
|---|---|---|
| Standalone backend | `npm run build` (inside `backend/`) | `backend/dist/index.mjs` |
| Monorepo frontend | `pnpm --filter @workspace/cv-builder run build` | `artifacts/cv-builder/dist/` |
| Monorepo backend | `pnpm --filter @workspace/api-server run build` | `artifacts/api-server/dist/index.mjs` |

---

## All Dependencies at a Glance

```
Frontend (artifacts/cv-builder)
├── react@19 + react-dom@19          Core UI
├── vite@7                           Dev server & bundler
├── tailwindcss@4                    Utility CSS
├── zustand@5                        State management + localStorage persist
├── @dnd-kit/core@6                  Drag-and-drop engine
├── @dnd-kit/sortable@10             Sortable list hook
├── framer-motion                    Animations
├── html2pdf.js@0.10                 PDF export
├── sonner@2                         Toast notifications
├── next-themes@0.4                  Dark/light mode
├── @tanstack/react-query@5          API data fetching
├── wouter@3                         Lightweight router
├── lucide-react                     Icon library
├── nanoid@5                         Unique IDs
├── zod                              Schema validation
├── react-hook-form@7                Form state
├── @radix-ui/* (20+ packages)       Accessible UI primitives
└── class-variance-authority         Component variants

Standalone Backend (backend/)
├── express@4                        HTTP server
├── openai@4                         OpenAI SDK (GPT-4o)
├── pino@9 + pino-http@10            Structured JSON logging
├── cors@2                           CORS headers
├── zod@3                            Request/response validation
└── esbuild@0.25                     Fast TS/JS bundler (build-time only)
```

---

## License

MIT © 2026 MahiCV.AI — All rights reserved.

---

## Author

**Jagdish Maliwad**
- GitHub: [github.com/jagdishmaliwad2002](https://github.com/jagdishmaliwad2002)
