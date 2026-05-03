import { useRef, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { useCVStore } from "../store/cv-store";
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
import { ResizablePanels } from "../components/ResizablePanels";
import { ScrollArea } from "../components/ui/scroll-area";
import { Button } from "../components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
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
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "../lib/utils";

type EditorSection =
  | "personal"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "certifications"
  | "achievements"
  | "languages"
  | "custom";

/* Defined OUTSIDE BuilderPage so React never remounts it on re-render */
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

export default function BuilderPage() {
  const { cv, resetCV } = useCVStore();
  const { theme, setTheme } = useTheme();
  const previewRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<EditorSection>("personal");
  const [rightTab, setRightTab] = useState<"preview" | "templates" | "sections" | "appearance" | "score">("preview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [exporting, setExporting] = useState(false);

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
    if (confirm("Reset all CV data? This cannot be undone.")) {
      resetCV();
      toast.success("CV reset.");
    }
  };

  /* ── Editor panel (left of drag handle) ── */
  const editorPanel = (
    <div className="flex flex-col h-full bg-card border-r">
      <div className="flex items-center justify-between px-4 py-3 border-b shrink-0">
        <h2 className="text-sm font-semibold truncate">
          {EDITOR_SECTIONS.find((s) => s.id === activeSection)?.label}
        </h2>
        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full shrink-0 ml-2">
          Auto-saved
        </span>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4">
          <EditorContent section={activeSection} />
        </div>
      </ScrollArea>
    </div>
  );

  /* ── Preview + controls panel (right of drag handle) ── */
  const previewPanel = (
    <div className="flex flex-col h-full">
      {/* Top bar — single scrollable row, never wraps */}
      <div className="flex items-center gap-2 px-3 py-2 border-b bg-card shrink-0 min-w-0">
        {/* Scrollable tab strip */}
        <div className="flex-1 min-w-0 overflow-x-auto scrollbar-none">
          <Tabs
            value={rightTab}
            onValueChange={(v) => setRightTab(v as typeof rightTab)}
          >
            <TabsList className="h-8 inline-flex flex-nowrap whitespace-nowrap w-max gap-0.5">
              <TabsTrigger value="preview"    className="text-xs h-7 gap-1 px-2.5 shrink-0">
                <FileText   className="h-3.5 w-3.5" /><span>Preview</span>
              </TabsTrigger>
              <TabsTrigger value="templates"  className="text-xs h-7 gap-1 px-2.5 shrink-0">
                <LayoutGrid className="h-3.5 w-3.5" /><span>Templates</span>
              </TabsTrigger>
              <TabsTrigger value="sections"   className="text-xs h-7 gap-1 px-2.5 shrink-0">
                <Settings2  className="h-3.5 w-3.5" /><span>Sections</span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="text-xs h-7 gap-1 px-2.5 shrink-0">
                <Star       className="h-3.5 w-3.5" /><span>Style</span>
              </TabsTrigger>
              <TabsTrigger value="score"      className="text-xs h-7 gap-1 px-2.5 shrink-0">
                <BarChart3  className="h-3.5 w-3.5" /><span>Score</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <Button
          size="sm"
          className="h-8 gap-1.5 text-xs shrink-0"
          onClick={handleExport}
          disabled={exporting}
        >
          <Download className="h-3.5 w-3.5" />
          {exporting ? "Exporting…" : "Export PDF"}
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-muted/30">
        {rightTab === "preview" && (
          <div className="flex justify-center items-start p-8 min-h-full">
            <div
              className="bg-white shadow-2xl rounded-sm"
              style={{
                width: "210mm",
                minHeight: "297mm",
                transform: "scale(0.72)",
                transformOrigin: "top center",
                marginBottom: "calc((0.72 - 1) * 297mm)",
              }}
            >
              <CVPreview cv={cv} previewRef={previewRef as React.RefObject<HTMLDivElement>} />
            </div>
          </div>
        )}
        {rightTab === "templates" && (
          <div className="p-6 max-w-2xl">
            <h3 className="text-sm font-semibold mb-4">Choose Template</h3>
            <TemplateSelector />
          </div>
        )}
        {rightTab === "sections" && (
          <div className="p-6 max-w-lg">
            <h3 className="text-sm font-semibold mb-1">Section Order & Visibility</h3>
            <p className="text-xs text-muted-foreground mb-4">Drag to reorder · Toggle to show/hide</p>
            <SectionsManager />
          </div>
        )}
        {rightTab === "appearance" && (
          <div className="p-6 max-w-sm">
            <h3 className="text-sm font-semibold mb-4">Appearance</h3>
            <AppearanceSettings />
          </div>
        )}
        {rightTab === "score" && (
          <div className="p-6 max-w-sm">
            <h3 className="text-sm font-semibold mb-1">Resume Score</h3>
            <p className="text-xs text-muted-foreground mb-4">AI feedback on how strong your CV is</p>
            <ResumeScore />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">

      {/* ── Fixed icon sidebar ── */}
      <div
        className={cn(
          "flex flex-col border-r bg-sidebar transition-all duration-200 shrink-0 h-full",
          sidebarCollapsed ? "w-14" : "w-48"
        )}
      >
        {/* Brand */}
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

        {/* Nav */}
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

        {/* Bottom */}
        <div className="border-t p-2 space-y-1 shrink-0">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            title={sidebarCollapsed ? "Toggle theme" : undefined}
            className="w-full flex items-center gap-2.5 rounded-md px-2 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {!sidebarCollapsed && <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>}
          </button>
          <button
            onClick={handleReset}
            title={sidebarCollapsed ? "Reset CV" : undefined}
            className="w-full flex items-center gap-2.5 rounded-md px-2 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            {!sidebarCollapsed && <span>Reset</span>}
          </button>
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

      {/* ── Resizable editor + preview ── */}
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
