import { useCVStore } from "../../store/cv-store";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Plus, Trash2, ChevronDown, ChevronUp, PlusCircle, X } from "lucide-react";
import { useState } from "react";
import { Experience } from "../../types/cv";

function ExperienceCard({ exp }: { exp: Experience }) {
  const { updateExperience, removeExperience } = useCVStore();
  const [open, setOpen] = useState(true);

  const update = (field: string, value: string | boolean | string[]) =>
    updateExperience(exp.id, field, value);

  const addBullet = () => update("bullets", [...exp.bullets, ""]);
  const updateBullet = (i: number, val: string) => {
    const next = [...exp.bullets];
    next[i] = val;
    update("bullets", next);
  };
  const removeBullet = (i: number) => update("bullets", exp.bullets.filter((_, idx) => idx !== i));

  return (
    <div className="border rounded-lg overflow-hidden">
      <div
        className="flex items-center justify-between px-3 py-2 cursor-pointer bg-muted/30 hover:bg-muted/50"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="text-sm font-medium truncate">
          {exp.role || exp.company ? `${exp.role || "Role"}${exp.company ? ` @ ${exp.company}` : ""}` : "New Experience"}
        </span>
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => removeExperience(exp.id)}>
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
          {open ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
        </div>
      </div>
      {open && (
        <div className="p-3 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Role / Position</Label>
              <Input value={exp.role} onChange={(e) => update("role", e.target.value)} placeholder="Software Engineer" className="h-8 text-sm" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Company</Label>
              <Input value={exp.company} onChange={(e) => update("company", e.target.value)} placeholder="Acme Corp" className="h-8 text-sm" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Location</Label>
              <Input value={exp.location} onChange={(e) => update("location", e.target.value)} placeholder="San Francisco, CA" className="h-8 text-sm" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Start Date</Label>
              <Input value={exp.startDate} onChange={(e) => update("startDate", e.target.value)} placeholder="Jan 2022" className="h-8 text-sm" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Checkbox
                id={`current-${exp.id}`}
                checked={exp.current}
                onCheckedChange={(c) => update("current", !!c)}
              />
              <Label htmlFor={`current-${exp.id}`} className="text-xs">Current Role</Label>
            </div>
            {!exp.current && (
              <div className="flex-1 space-y-1">
                <Label className="text-xs text-muted-foreground">End Date</Label>
                <Input value={exp.endDate} onChange={(e) => update("endDate", e.target.value)} placeholder="Dec 2023" className="h-8 text-sm" />
              </div>
            )}
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Description (or use bullet points below)</Label>
            <Textarea
              value={exp.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Brief overview of responsibilities..."
              className="text-sm min-h-[60px] resize-none"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Bullet Points</Label>
            {exp.bullets.map((b, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-muted-foreground text-xs">•</span>
                <Input value={b} onChange={(e) => updateBullet(i, e.target.value)} placeholder="Achieved X by doing Y, resulting in Z" className="h-7 text-sm flex-1" />
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground" onClick={() => removeBullet(i)}>
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
            <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-muted-foreground" onClick={addBullet}>
              <PlusCircle className="h-3 w-3" /> Add bullet
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ExperienceEditor() {
  const { cv, addExperience } = useCVStore();
  return (
    <div className="space-y-2">
      {cv.experience.map((exp) => <ExperienceCard key={exp.id} exp={exp} />)}
      <Button variant="outline" size="sm" className="w-full h-8 text-xs gap-1.5" onClick={addExperience}>
        <Plus className="h-3.5 w-3.5" /> Add Experience
      </Button>
    </div>
  );
}
