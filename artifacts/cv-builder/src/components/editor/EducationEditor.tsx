import { useCVStore } from "../../store/cv-store";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Education } from "../../types/cv";

function EducationCard({ ed }: { ed: Education }) {
  const { updateEducation, removeEducation } = useCVStore();
  const [open, setOpen] = useState(true);
  const update = (field: string, value: string) => updateEducation(ed.id, field, value);

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 cursor-pointer bg-muted/30 hover:bg-muted/50" onClick={() => setOpen((o) => !o)}>
        <span className="text-sm font-medium truncate">
          {ed.institution || ed.degree ? `${ed.degree || "Degree"} — ${ed.institution || "Institution"}` : "New Education"}
        </span>
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => removeEducation(ed.id)}>
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
          {open ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
        </div>
      </div>
      {open && (
        <div className="p-3 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Institution</Label>
              <Input value={ed.institution} onChange={(e) => update("institution", e.target.value)} placeholder="MIT" className="h-8 text-sm" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Degree</Label>
              <Input value={ed.degree} onChange={(e) => update("degree", e.target.value)} placeholder="Bachelor of Science" className="h-8 text-sm" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Field of Study</Label>
              <Input value={ed.field} onChange={(e) => update("field", e.target.value)} placeholder="Computer Science" className="h-8 text-sm" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">GPA (optional)</Label>
              <Input value={ed.gpa} onChange={(e) => update("gpa", e.target.value)} placeholder="3.8/4.0" className="h-8 text-sm" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Start Date</Label>
              <Input value={ed.startDate} onChange={(e) => update("startDate", e.target.value)} placeholder="Sep 2018" className="h-8 text-sm" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">End Date</Label>
              <Input value={ed.endDate} onChange={(e) => update("endDate", e.target.value)} placeholder="May 2022" className="h-8 text-sm" />
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Additional Info</Label>
            <Textarea value={ed.description} onChange={(e) => update("description", e.target.value)} placeholder="Honors, activities, thesis..." className="text-sm min-h-[60px] resize-none" />
          </div>
        </div>
      )}
    </div>
  );
}

export default function EducationEditor() {
  const { cv, addEducation } = useCVStore();
  return (
    <div className="space-y-2">
      {cv.education.map((ed) => <EducationCard key={ed.id} ed={ed} />)}
      <Button variant="outline" size="sm" className="w-full h-8 text-xs gap-1.5" onClick={addEducation}>
        <Plus className="h-3.5 w-3.5" /> Add Education
      </Button>
    </div>
  );
}
