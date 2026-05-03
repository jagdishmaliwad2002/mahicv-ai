import { useCVStore } from "../../store/cv-store";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Plus, Trash2, ChevronDown, ChevronUp, X } from "lucide-react";
import { useState } from "react";
import { Project } from "../../types/cv";

function ProjectCard({ proj }: { proj: Project }) {
  const { updateProject, removeProject } = useCVStore();
  const [open, setOpen] = useState(true);
  const [techInput, setTechInput] = useState("");
  const update = (field: string, value: string | string[]) => updateProject(proj.id, field, value);

  const addTech = () => {
    const val = techInput.trim();
    if (val && !proj.technologies.includes(val)) {
      update("technologies", [...proj.technologies, val]);
      setTechInput("");
    }
  };
  const removeTech = (t: string) => update("technologies", proj.technologies.filter((x) => x !== t));

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 cursor-pointer bg-muted/30 hover:bg-muted/50" onClick={() => setOpen((o) => !o)}>
        <span className="text-sm font-medium truncate">{proj.name || "New Project"}</span>
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => removeProject(proj.id)}>
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
          {open ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
        </div>
      </div>
      {open && (
        <div className="p-3 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Project Name</Label>
              <Input value={proj.name} onChange={(e) => update("name", e.target.value)} placeholder="My Awesome App" className="h-8 text-sm" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">URL (optional)</Label>
              <Input value={proj.url} onChange={(e) => update("url", e.target.value)} placeholder="github.com/..." className="h-8 text-sm" />
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Technologies</Label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {proj.technologies.map((t) => (
                <span key={t} className="flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                  {t}
                  <button onClick={() => removeTech(t)} className="text-primary/60 hover:text-primary"><X className="h-2.5 w-2.5" /></button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input value={techInput} onChange={(e) => setTechInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addTech()} placeholder="React, Node.js..." className="h-7 text-sm flex-1" />
              <Button variant="outline" size="sm" className="h-7 text-xs" onClick={addTech}>Add</Button>
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Description</Label>
            <Textarea value={proj.description} onChange={(e) => update("description", e.target.value)} placeholder="What this project does and your role..." className="text-sm min-h-[60px] resize-none" />
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProjectsEditor() {
  const { cv, addProject } = useCVStore();
  return (
    <div className="space-y-2">
      {cv.projects.map((p) => <ProjectCard key={p.id} proj={p} />)}
      <Button variant="outline" size="sm" className="w-full h-8 text-xs gap-1.5" onClick={addProject}>
        <Plus className="h-3.5 w-3.5" /> Add Project
      </Button>
    </div>
  );
}
