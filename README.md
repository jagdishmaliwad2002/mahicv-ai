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

### Backend — `artifacts/api-server`

| Category | Technology | Version |
|---|---|---|
| Runtime | [Node.js](https://nodejs.org) | 24 |
| HTTP Framework | [Express](https://expressjs.com) | 5 |
| Language | TypeScript | 5.9 |
| AI Integration | OpenAI GPT-4o (via Replit AI proxy) | — |
| Logging | [Pino](https://getpino.io) + pino-http | 9 / 10 |
| Bundler | [esbuild](https://esbuild.github.io) | 0.27 |
| Schema Validation | [Zod](https://zod.dev) | latest |
| CORS | cors | 2 |

### Monorepo / Tooling

| Category | Technology | Version |
|---|---|---|
| Package Manager | [pnpm](https://pnpm.io) (workspaces) | 10 |
| Type Checking | TypeScript project references | 5.9 |
| API Contract | OpenAPI spec → Orval codegen | — |
| Prettier | Code formatting | 3 |

---

## Project Structure

```
mahicv-ai/
├── artifacts/
│   ├── cv-builder/                   # React + Vite frontend
│   │   ├── index.html
│   │   └── src/
│   │       ├── components/
│   │       │   ├── editor/           # One editor per CV section
│   │       │   │   ├── PersonalEditor.tsx
│   │       │   │   ├── ExperienceEditor.tsx
│   │       │   │   ├── EducationEditor.tsx
│   │       │   │   ├── SkillsEditor.tsx
│   │       │   │   ├── ProjectsEditor.tsx
│   │       │   │   ├── CertificationsEditor.tsx
│   │       │   │   ├── AchievementsEditor.tsx
│   │       │   │   ├── LanguagesEditor.tsx
│   │       │   │   └── CustomSectionsEditor.tsx
│   │       │   ├── templates/        # 7 CV templates + dispatcher
│   │       │   │   └── CVPreview.tsx
│   │       │   ├── ui/               # shadcn/ui components
│   │       │   ├── AppearanceSettings.tsx
│   │       │   ├── ConfirmDialog.tsx
│   │       │   ├── HistoryPanel.tsx
│   │       │   ├── ResizablePanels.tsx
│   │       │   ├── ResumeScore.tsx
│   │       │   ├── SectionsManager.tsx
│   │       │   └── TemplateSelector.tsx
│   │       ├── hooks/
│   │       │   └── useAutoSave.ts    # Debounced auto-save to history
│   │       ├── pages/
│   │       │   └── builder.tsx       # Main page (desktop + mobile layouts)
│   │       ├── store/
│   │       │   ├── cv-store.ts             # Zustand store (persisted to localStorage)
│   │       │   └── cv-history-store.ts     # Version history (up to 30 snapshots)
│   │       └── types/
│   │           └── cv.ts             # All CV data types & interfaces
│   └── api-server/                   # Express API backend
│       └── src/
│           ├── routes/
│           │   ├── ai.ts             # POST /api/ai/generate-summary
│           │   │                     # POST /api/ai/resume-score
│           │   └── index.ts
│           └── index.ts              # Server entry point (port 8080)
├── lib/
│   ├── api-zod/                      # Shared Zod request/response schemas
│   ├── api-client-react/             # Generated TanStack Query hooks
│   └── db/                           # Drizzle ORM schema
├── scripts/                          # Shared utility scripts
├── pnpm-workspace.yaml               # Workspace config + catalog versions
├── tsconfig.base.json                # Shared TypeScript strict config
├── package.json                      # Root scripts (build, typecheck)
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

## AI API Reference

### `POST /api/ai/generate-summary`
Generates a professional summary paragraph.

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

**Response:**
```json
{
  "summary": "Results-driven software engineer with 8+ years of experience..."
}
```

---

### `POST /api/ai/resume-score`
Scores the CV and returns structured feedback.

**Request:**
```json
{
  "cv": { /* full CV data object */ }
}
```

**Response:**
```json
{
  "score": 82,
  "grade": "B+",
  "strengths": ["Clear work history", "Strong skills section"],
  "improvements": ["Add quantified achievements", "Include project URLs"],
  "summary": "Your CV is well-structured but could benefit from..."
}
```

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
| pnpm | v9 | v10 |

Install pnpm if you don't have it:
```bash
npm install -g pnpm
```

---

## Installation & Running

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

Starts the backend on **port 8080**. Routes are served under `/api`.

### 3. Start the frontend

```bash
pnpm --filter @workspace/cv-builder run dev
```

Starts the CV Builder frontend (port assigned by `$PORT` env var).

### 4. Open the app

Both services run behind a shared reverse proxy:
```
http://localhost:80/
```

> Always use `localhost:80` — do not use the individual service ports directly.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `SESSION_SECRET` | Yes | Secret key for Express session signing |
| `PORT` | Auto | Assigned automatically per service by the proxy |
| OpenAI key | Auto | Provided via Replit AI Integrations — no manual key needed |

---

## Building for Production

```bash
# Type-check the entire monorepo
pnpm run typecheck

# Build all packages
pnpm run build
```

| Output | Location |
|---|---|
| Frontend (static) | `artifacts/cv-builder/dist/` |
| Backend (bundled) | `artifacts/api-server/dist/index.mjs` |

---

## All Dependencies at a Glance

```
Frontend
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

Backend
├── express@5                        HTTP server
├── pino@9 + pino-http@10            Structured JSON logging
├── cors@2                           CORS headers
├── cookie-parser@1                  Cookie handling
├── zod                              Request/response validation
└── esbuild@0.27                     Fast TS/JS bundler
```

---

## License

MIT © 2026 MahiCV.AI — All rights reserved.

---

## Author

**Jagdish Maliwad**
- GitHub: [github.com/jagdishmaliwad2002](https://github.com/jagdishmaliwad2002)
