import { useCVStore } from "../store/cv-store";
import { TemplateId } from "../types/cv";
import { cn } from "../lib/utils";

interface Template {
  id: TemplateId;
  name: string;
  description: string;
  accent: string;
  preview: string;
}

const TEMPLATES: Template[] = [
  { id: "modern", name: "Modern", description: "Clean with accent border", accent: "#2563eb", preview: "M" },
  { id: "classic", name: "Classic", description: "Traditional serif layout", accent: "#1e3a5f", preview: "C" },
  { id: "minimal", name: "Minimal", description: "Ultra-clean with whitespace", accent: "#18181b", preview: "Mi" },
  { id: "creative", name: "Creative", description: "Two-column with sidebar", accent: "#7c3aed", preview: "Cr" },
  { id: "executive", name: "Executive", description: "Bold header with competencies", accent: "#0f4c75", preview: "E" },
  { id: "slate", name: "Slate", description: "Dark sidebar, light content", accent: "#0ea5e9", preview: "S" },
  { id: "emerald", name: "Emerald", description: "Gradient header, vibrant chips", accent: "#059669", preview: "Em" },
];

export default function TemplateSelector() {
  const { cv, setTemplate, setAccentColor } = useCVStore();

  const handleSelect = (template: Template) => {
    setTemplate(template.id);
    setAccentColor(template.accent);
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {TEMPLATES.map((t) => (
        <button
          key={t.id}
          onClick={() => handleSelect(t)}
          className={cn(
            "relative flex flex-col items-start gap-1.5 rounded-lg border-2 p-3 text-left transition-all hover:shadow-md",
            cv.templateId === t.id
              ? "border-primary bg-primary/5 shadow-sm"
              : "border-border hover:border-primary/40"
          )}
        >
          {/* Mini preview swatch */}
          <div className="w-full h-12 rounded-md overflow-hidden flex" style={{ background: "#f8fafc" }}>
            <div style={{ width: "4px", background: t.accent, flexShrink: 0 }} />
            <div className="flex-1 p-1.5 space-y-1">
              <div style={{ width: "60%", height: "4px", background: t.accent, borderRadius: "2px" }} />
              <div style={{ width: "40%", height: "3px", background: "#e2e8f0", borderRadius: "2px" }} />
              <div style={{ width: "80%", height: "3px", background: "#e2e8f0", borderRadius: "2px" }} />
              <div style={{ width: "70%", height: "3px", background: "#e2e8f0", borderRadius: "2px" }} />
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold">{t.name}</p>
            <p className="text-[10px] text-muted-foreground">{t.description}</p>
          </div>
          {cv.templateId === t.id && (
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
          )}
        </button>
      ))}
    </div>
  );
}
