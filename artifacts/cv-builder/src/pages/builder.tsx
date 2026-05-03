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
import { ScrollArea } from "../components/ui/scroll-area";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Separator } from "../components/ui/separator";
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

const EDITOR_SECTIONS: { id: EditorSection; label: string; icon: React.ReactNode }[] = [
  { id: "personal", label: "Personal", icon: <User className="h-4 w-4" /> },
  { id: "experience", label: "Experience", icon: <Briefcase className="h-4 w-4" /> },
  { id: "education", label: "Education", icon: <GraduationCap className="h-4 w-4" /> },
  { id: "skills", label: "Skills", icon: <Star className="h-4 w-4" /> },
  { id: "projects", label: "Projects", icon: <Code2 className="h-4 w-4" /> },
  { id: "certifications", label: "Certifications", icon: <Award className="h-4 w-4" /> },
  { id: "achievements", label: "Achievements", icon: <Trophy className="h-4 w-4" /> },
  { id: "languages", label: "Languages", icon: <Globe className="h-4 w-4" /> },
  { id: "custom", label: "Custom", icon: <FileText className="h-4 w-4" /> },
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

  const EditorContent = () => {
    switch (activeSection) {
      case "personal": return <PersonalEditor />;
      case "experience": return <ExperienceEditor />;
      case "education": return <EducationEditor />;
      case "skills": return <SkillsEditor />;
      case "projects": return <ProjectsEditor />;
      case "certifications": return <CertificationsEditor />;
      case "achievements": return <AchievementsEditor />;
      case "languages": return <LanguagesEditor />;
      case "custom": return <CustomSectionsEditor />;
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Left sidebar nav */}
      <div
        className={cn(
          "flex flex-col border-r bg-sidebar transition-all duration-200",
          sidebarCollapsed ? "w-14" : "w-52"
        )}
      >
        {/* Logo / brand */}
        <div className="flex items-center gap-2 px-3 py-4 border-b">
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center shrink-0">
            <FileText className="h-4 w-4 text-primary-foreground" />
          </div>
          {!sidebarCollapsed && (
            <span className="font-semibold text-sm tracking-tight">CV Builder</span>
          )}
        </div>

        {/* Section nav */}
        <ScrollArea className="flex-1 py-2">
          <nav className="px-2 space-y-1">
            {EDITOR_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={cn(
                  "w-full flex items-center gap-2.5 rounded-md px-2 py-2 text-sm transition-colors",
                  activeSection === sec.id
                    ? "bg-primary text-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
                title={sidebarCollapsed ? sec.label : undefined}
              >
                {sec.icon}
                {!sidebarCollapsed && <span>{sec.label}</span>}
              </button>
            ))}
          </nav>
        </ScrollArea>

        {/* Bottom actions */}
        <div className="border-t p-2 space-y-1">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-full flex items-center gap-2.5 rounded-md px-2 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
            title={sidebarCollapsed ? "Toggle theme" : undefined}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {!sidebarCollapsed && <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>}
          </button>
          <button
            onClick={handleReset}
            className="w-full flex items-center gap-2.5 rounded-md px-2 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
            title={sidebarCollapsed ? "Reset CV" : undefined}
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
        </div>
      </div>

      {/* Editor panel */}
      <div className="w-80 flex flex-col border-r bg-card shrink-0">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-sm font-semibold">
            {EDITOR_SECTIONS.find((s) => s.id === activeSection)?.label}
          </h2>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            Auto-saved
          </span>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-4">
            <EditorContent />
          </div>
        </ScrollArea>
      </div>

      {/* Right panel (preview + controls) */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="flex items-center gap-2 px-4 py-2 border-b bg-card">
          <Tabs value={rightTab} onValueChange={(v) => setRightTab(v as typeof rightTab)} className="flex-1">
            <TabsList className="h-8">
              <TabsTrigger value="preview" className="text-xs h-7 gap-1.5">
                <FileText className="h-3.5 w-3.5" /> Preview
              </TabsTrigger>
              <TabsTrigger value="templates" className="text-xs h-7 gap-1.5">
                <LayoutGrid className="h-3.5 w-3.5" /> Templates
              </TabsTrigger>
              <TabsTrigger value="sections" className="text-xs h-7 gap-1.5">
                <Settings2 className="h-3.5 w-3.5" /> Sections
              </TabsTrigger>
              <TabsTrigger value="appearance" className="text-xs h-7 gap-1.5">
                <Star className="h-3.5 w-3.5" /> Style
              </TabsTrigger>
              <TabsTrigger value="score" className="text-xs h-7 gap-1.5">
                <BarChart3 className="h-3.5 w-3.5" /> Score
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button size="sm" className="h-8 gap-1.5 text-xs shrink-0" onClick={handleExport} disabled={exporting}>
            <Download className="h-3.5 w-3.5" />
            {exporting ? "Exporting..." : "Export PDF"}
          </Button>
        </div>

        {/* Right content */}
        <div className="flex-1 overflow-auto bg-muted/30">
          {rightTab === "preview" && (
            <div className="flex justify-center p-6 min-h-full">
              <div
                className="bg-white shadow-xl rounded-sm"
                style={{ width: "210mm", minHeight: "297mm", transform: "scale(0.75)", transformOrigin: "top center", marginBottom: "-25%" }}
              >
                <CVPreview cv={cv} previewRef={previewRef as React.RefObject<HTMLDivElement>} />
              </div>
            </div>
          )}
          {rightTab === "templates" && (
            <div className="p-6">
              <h3 className="text-sm font-semibold mb-4">Choose Template</h3>
              <TemplateSelector />
            </div>
          )}
          {rightTab === "sections" && (
            <div className="p-6">
              <h3 className="text-sm font-semibold mb-4">Section Order & Visibility</h3>
              <SectionsManager />
            </div>
          )}
          {rightTab === "appearance" && (
            <div className="p-6">
              <h3 className="text-sm font-semibold mb-4">Appearance</h3>
              <AppearanceSettings />
            </div>
          )}
          {rightTab === "score" && (
            <div className="p-6">
              <h3 className="text-sm font-semibold mb-1">Resume Score</h3>
              <p className="text-xs text-muted-foreground mb-4">Get AI feedback on how strong your CV is</p>
              <ResumeScore />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
