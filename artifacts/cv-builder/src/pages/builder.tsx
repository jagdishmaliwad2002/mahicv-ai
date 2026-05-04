import { useRef, useState, useCallback, useEffect } from "react";
import { useTheme } from "next-themes";
import { useCVStore } from "../store/cv-store";
import { useAutoSave } from "../hooks/useAutoSave";
import CVPreview from "../components/templates/CVPreview";
import PersonalEditor from "../components/editor/PersonalEditor";
import SkillsEditor from "../components/editor/SkillsEditor";
import ExperienceEditor from "../components/editor/ExperienceEditor";
import EducationEditor from "../components/editor/EducationEditor";
import ProjectsEditor from "../components/editor/ProjectsEditor";
import CertificationsEditor from "../components/editor/CertificationsEditor";
import AchievementsEditor from "../components/editor/AchievementsEditor";
import LanguagesEditor from "../components/editor/LanguagesEditor";
import CustomSectionsEditor from "../components/editor/CustomSectionsEditor";
import TemplateSelector from "../components/TemplateSelector";
import SectionsManager from "../components/SectionsManager";
import AppearanceSettings from "../components/AppearanceSettings";
import ResumeScore from "../components/ResumeScore";
import HistoryPanel from "../components/HistoryPanel";
import { ResizablePanels } from "../components/ResizablePanels";
import { ScrollArea } from "../components/ui/scroll-area";
import { Button } from "../components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ConfirmDialog } from "../components/ConfirmDialog";
import {
  Download,
  Moon,
  Sun,
  RotateCcw,
  User,
  Briefcase,
  GraduationCap,
  Code2,
  Award,
  Globe,
  Star,
  Trophy,
  LayoutGrid,
  Settings2,
  BarChart3,
  FileText,
  ChevronRight,
  ChevronLeft,
  PenLine,
  History,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "../lib/utils";

/* ─── Types ─────────────────────────────────────────────── */

type EditorSection =
  | "personal" | "experience" | "education" | "skills"
  | "projects" | "certifications" | "achievements" | "languages" | "custom";

type RightTab = "preview" | "templates" | "sections" | "appearance" | "score" | "history";
type MobileTab = "edit" | RightTab;

/* ─── Static data ────────────────────────────────────────── */

const EDITOR_SECTIONS: { id: EditorSection; label: string; icon: React.ReactNode }[] = [
  { id: "personal",       label: "Personal",       icon: <User className="h-4 w-4" /> },
  { id: "experience",     label: "Experience",     icon: <Briefcase className="h-4 w-4" /> },
  { id: "education",      label: "Education",      icon: <GraduationCap className="h-4 w-4" /> },
  { id: "skills",         label: "Skills",         icon: <Star className="h-4 w-4" /> },
  { id: "projects",       label: "Projects",       icon: <Code2 className="h-4 w-4" /> },
  { id: "certifications", label: "Certifications", icon: <Award className="h-4 w-4" /> },
  { id: "achievements",   label: "Achievements",   icon: <Trophy className="h-4 w-4" /> },
  { id: "languages",      label: "Languages",      icon: <Globe className="h-4 w-4" /> },
  { id: "custom",         label: "Custom",         icon: <FileText className="h-4 w-4" /> },
];

const RIGHT_TABS: { id: RightTab; label: string; icon: React.ReactNode }[] = [
  { id: "preview",    label: "Preview",    icon: <FileText   className="h-3.5 w-3.5" /> },
  { id: "templates",  label: "Templates",  icon: <LayoutGrid className="h-3.5 w-3.5" /> },
  { id: "sections",   label: "Sections",   icon: <Settings2  className="h-3.5 w-3.5" /> },
  { id: "appearance", label: "Style",      icon: <Star       className="h-3.5 w-3.5" /> },
  { id: "score",      label: "Score",      icon: <BarChart3  className="h-3.5 w-3.5" /> },
  { id: "history",    label: "History",    icon: <History    className="h-3.5 w-3.5" /> },
];

/* ─── Stable editor switcher (never defined inside the page) ── */

function EditorContent({ section }: { section: EditorSection }) {
  switch (section) {
    case "personal":       return <PersonalEditor />;
    case "experience":     return <ExperienceEditor />;
    case "education":      return <EducationEditor />;
    case "skills":         return <SkillsEditor />;
    case "projects":       return <ProjectsEditor />;
    case "certifications": return <CertificationsEditor />;
    case "achievements":   return <AchievementsEditor />;
    case "languages":      return <LanguagesEditor />;
    case "custom":         return <CustomSectionsEditor />;
  }
}

/* ─── Shared right-panel content ────────────────────────── */

function RightPanelContent({
  tab, cv, previewRef,
}: {
  tab: string;
  cv: ReturnType<typeof useCVStore>["cv"];
  previewRef: React.RefObject<HTMLDivElement>;
}) {
  if (tab === "preview") return (
    <div className="flex justify-center items-start p-6 min-h-full">
      <div
        className="bg-white shadow-2xl rounded-sm"
        style={{ width: "210mm", minHeight: "297mm", transform: "scale(0.72)", transformOrigin: "top center", marginBottom: "calc((0.72 - 1) * 297mm)" }}
      >
        <CVPreview cv={cv} previewRef={previewRef} />
      </div>
    </div>
  );
  if (tab === "templates") return (
    <div className="p-4 md:p-6 max-w-2xl">
      <h3 className="text-sm font-semibold mb-4">Choose Template</h3>
      <TemplateSelector />
    </div>
  );
  if (tab === "sections") return (
    <div className="p-4 md:p-6 max-w-lg">
      <h3 className="text-sm font-semibold mb-1">Section Order & Visibility</h3>
      <p className="text-xs text-muted-foreground mb-4">Drag to reorder · Toggle to show/hide</p>
      <SectionsManager />
    </div>
  );
  if (tab === "appearance") return (
    <div className="p-4 md:p-6 max-w-sm">
      <h3 className="text-sm font-semibold mb-4">Appearance</h3>
      <AppearanceSettings />
    </div>
  );
  if (tab === "score") return (
    <div className="p-4 md:p-6 max-w-sm">
      <h3 className="text-sm font-semibold mb-1">Resume Score</h3>
      <p className="text-xs text-muted-foreground mb-4">AI feedback on how strong your CV is</p>
      <ResumeScore />
    </div>
  );
  if (tab === "history") return (
    <div className="p-4 md:p-6 h-full flex flex-col max-w-lg">
      <HistoryPanel />
    </div>
  );
  return null;
}

/* ─── Auto-save status badge ─────────────────────────────── */

function SaveStatus({ savedAgo, justSaved }: { savedAgo: string; justSaved: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full transition-colors duration-500",
        justSaved
          ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
          : "bg-muted text-muted-foreground"
      )}
    >
      {justSaved
        ? <CheckCircle2 className="h-3 w-3" />
        : <Clock className="h-3 w-3" />}
      {justSaved ? "Saved!" : savedAgo}
    </span>
  );
}

/* ─── Safe reset dialog ──────────────────────────────────── */

function ResetDialog({ onConfirm }: { onConfirm: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center gap-2.5 rounded-md px-2 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
      >
        <RotateCcw className="h-4 w-4" />
        <span>Reset CV</span>
      </button>
      <ConfirmDialog
        open={open}
        title={<span className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-red-500" />Reset entire CV?</span>}
        description="All your CV data will be wiped and replaced with a blank template. Your saved history in this browser will still be available — restore any version from the History tab."
        confirmLabel="Yes, reset everything"
        destructive
        onConfirm={() => { setOpen(false); onConfirm(); }}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}

function MobileResetDialog({ onConfirm }: { onConfirm: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-1.5 rounded-md text-muted-foreground hover:bg-muted transition-colors"
      >
        <RotateCcw className="h-4 w-4" />
      </button>
      <ConfirmDialog
        open={open}
        title={<span className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-red-500" />Reset entire CV?</span>}
        description="All your CV data will be wiped. Your history in this browser is still safe — restore from the History tab anytime."
        confirmLabel="Yes, reset everything"
        destructive
        onConfirm={() => { setOpen(false); onConfirm(); }}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}

/* ─── Hook: detect mobile ────────────────────────────────── */

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, [breakpoint]);
  return isMobile;
}

/* ─── Page ───────────────────────────────────────────────── */

export default function BuilderPage() {
  const { cv, resetCV } = useCVStore();
  const { theme, setTheme } = useTheme();
  const previewRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const [activeSection, setActiveSection] = useState<EditorSection>("personal");
  const [rightTab, setRightTab] = useState<RightTab>("preview");
  const [mobileTab, setMobileTab] = useState<MobileTab>("edit");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [exporting, setExporting] = useState(false);

  /* Auto-save — saves a history snapshot after each edit */
  const { savedAgo, justSaved } = useAutoSave();

  const handleExport = useCallback(async () => {
    const el = document.getElementById("cv-preview-root");
    if (!el) return;
    setExporting(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const name = cv.personal.fullName || "cv";
      await html2pdf()
        .set({
          margin: 0,
          filename: `${name.replace(/\s+/g, "_")}_CV.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, letterRendering: true },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .from(el)
        .save();
      toast.success("PDF exported!");
    } catch {
      toast.error("Export failed. Please try again.");
    }
    setExporting(false);
  }, [cv.personal.fullName]);

  const handleReset = () => {
    resetCV();
    toast.success("CV reset. You can restore a previous version from History.");
  };

  /* ════════════════════════════════════════════
     MOBILE LAYOUT
  ════════════════════════════════════════════ */
  if (isMobile) {
    const MOBILE_TABS: { id: MobileTab; label: string; icon: React.ReactNode }[] = [
      { id: "edit",       label: "Edit",      icon: <PenLine    className="h-5 w-5" /> },
      { id: "preview",    label: "Preview",   icon: <FileText   className="h-5 w-5" /> },
      { id: "templates",  label: "Templates", icon: <LayoutGrid className="h-5 w-5" /> },
      { id: "sections",   label: "Sections",  icon: <Settings2  className="h-5 w-5" /> },
      { id: "appearance", label: "Style",     icon: <Star       className="h-5 w-5" /> },
      { id: "history",    label: "History",   icon: <History    className="h-5 w-5" /> },
    ];

    return (
      <div className="flex flex-col h-[100dvh] w-full overflow-hidden bg-background">
        {/* Top header */}
        <div className="flex items-center justify-between px-3 py-2.5 border-b bg-card shrink-0 gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center shrink-0">
              <FileText className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sm tracking-tight shrink-0">
              MahiCV<span className="text-primary">.AI</span>
            </span>
            <SaveStatus savedAgo={savedAgo} justSaved={justSaved} />
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-1.5 rounded-md text-muted-foreground hover:bg-muted transition-colors"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <MobileResetDialog onConfirm={handleReset} />
            <Button size="sm" className="h-8 gap-1 text-xs" onClick={handleExport} disabled={exporting}>
              <Download className="h-3.5 w-3.5" />
              {exporting ? "…" : "PDF"}
            </Button>
          </div>
        </div>

        {/* Section sub-nav (edit mode only) */}
        {mobileTab === "edit" && (
          <div className="shrink-0 border-b bg-card overflow-x-auto scrollbar-none">
            <div className="flex gap-1.5 px-3 py-2 w-max">
              {EDITOR_SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors",
                    activeSection === sec.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {sec.icon}
                  {sec.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {mobileTab === "edit" ? (
            <div className="p-4">
              <EditorContent section={activeSection} />
            </div>
          ) : (
            <RightPanelContent tab={mobileTab} cv={cv} previewRef={previewRef as React.RefObject<HTMLDivElement>} />
          )}
        </div>

        {/* Bottom tab bar */}
        <div className="shrink-0 border-t bg-card">
          <div className="flex items-stretch overflow-x-auto scrollbar-none">
            {MOBILE_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setMobileTab(tab.id)}
                className={cn(
                  "flex-1 flex flex-col items-center justify-center gap-0.5 py-2 px-1 text-[10px] font-medium transition-colors min-w-[52px]",
                  mobileTab === tab.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ════════════════════════════════════════════
     DESKTOP LAYOUT
  ════════════════════════════════════════════ */

  const editorPanel = (
    <div className="flex flex-col h-full bg-card border-r">
      <div className="flex items-center justify-between px-4 py-3 border-b shrink-0">
        <h2 className="text-sm font-semibold truncate">
          {EDITOR_SECTIONS.find((s) => s.id === activeSection)?.label}
        </h2>
        <SaveStatus savedAgo={savedAgo} justSaved={justSaved} />
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4">
          <EditorContent section={activeSection} />
        </div>
      </ScrollArea>
    </div>
  );

  const previewPanel = (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-3 py-2 border-b bg-card shrink-0 min-w-0">
        <div className="flex-1 min-w-0 overflow-x-auto scrollbar-none">
          <Tabs value={rightTab} onValueChange={(v) => setRightTab(v as RightTab)}>
            <TabsList className="h-8 inline-flex flex-nowrap whitespace-nowrap w-max gap-0.5">
              {RIGHT_TABS.map((t) => (
                <TabsTrigger key={t.id} value={t.id} className="text-xs h-7 gap-1 px-2.5 shrink-0">
                  {t.icon}<span>{t.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <Button size="sm" className="h-8 gap-1.5 text-xs shrink-0" onClick={handleExport} disabled={exporting}>
          <Download className="h-3.5 w-3.5" />
          {exporting ? "Exporting…" : "Export PDF"}
        </Button>
      </div>
      <div className="flex-1 overflow-auto bg-muted/30">
        <RightPanelContent tab={rightTab} cv={cv} previewRef={previewRef as React.RefObject<HTMLDivElement>} />
      </div>
    </div>
  );

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <div
        className={cn(
          "flex flex-col border-r bg-sidebar transition-all duration-200 shrink-0 h-full",
          sidebarCollapsed ? "w-14" : "w-48"
        )}
      >
        <div className="flex items-center gap-2 px-3 py-4 border-b shrink-0">
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center shrink-0">
            <FileText className="h-4 w-4 text-primary-foreground" />
          </div>
          {!sidebarCollapsed && (
            <span className="font-semibold text-sm tracking-tight">
              MahiCV<span className="text-primary">.AI</span>
            </span>
          )}
        </div>

        <ScrollArea className="flex-1 py-2">
          <nav className="px-2 space-y-1">
            {EDITOR_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                title={sidebarCollapsed ? sec.label : undefined}
                className={cn(
                  "w-full flex items-center gap-2.5 rounded-md px-2 py-2 text-sm transition-colors",
                  activeSection === sec.id
                    ? "bg-primary text-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                {sec.icon}
                {!sidebarCollapsed && <span>{sec.label}</span>}
              </button>
            ))}
          </nav>
        </ScrollArea>

        <div className="border-t p-2 space-y-1 shrink-0">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            title={sidebarCollapsed ? "Toggle theme" : undefined}
            className="w-full flex items-center gap-2.5 rounded-md px-2 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {!sidebarCollapsed && <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>}
          </button>

          {sidebarCollapsed ? (
            <button
              onClick={() => {
                if (confirm("Reset all CV data? Your history will still be saved.")) handleReset();
              }}
              title="Reset CV"
              className="w-full flex items-center gap-2.5 rounded-md px-2 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          ) : (
            <ResetDialog onConfirm={handleReset} />
          )}

          <button
            onClick={() => setSidebarCollapsed((v) => !v)}
            className="w-full flex items-center gap-2.5 rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-sidebar-accent transition-colors"
          >
            {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            {!sidebarCollapsed && <span className="text-xs">Collapse</span>}
          </button>
          {!sidebarCollapsed && (
            <p className="px-2 pt-1 pb-0.5 text-[10px] text-muted-foreground/60 leading-tight">
              © 2026 MahiCV.AI<br />All rights reserved.
            </p>
          )}
        </div>
      </div>

      <ResizablePanels
        left={editorPanel}
        right={previewPanel}
        defaultLeftPercent={30}
        minLeftPercent={18}
        maxLeftPercent={58}
        storageKey="mahicv-panel-split"
      />
    </div>
  );
}
