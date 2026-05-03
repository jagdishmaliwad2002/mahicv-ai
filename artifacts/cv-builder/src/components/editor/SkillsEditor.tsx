import { useCVStore } from "../../store/cv-store";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Plus, Trash2 } from "lucide-react";
import { SkillLevel } from "../../types/cv";

const LEVELS: SkillLevel[] = ["beginner", "intermediate", "advanced", "expert"];
const LEVEL_LABELS: Record<SkillLevel, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  expert: "Expert",
};

export default function SkillsEditor() {
  const { cv, addSkill, updateSkill, removeSkill } = useCVStore();

  return (
    <div className="space-y-2">
      {cv.skills.map((sk) => (
        <div key={sk.id} className="flex items-center gap-2">
          <Input
            value={sk.name}
            onChange={(e) => updateSkill(sk.id, "name", e.target.value)}
            placeholder="e.g. TypeScript"
            className="h-8 text-sm flex-1"
          />
          <Select value={sk.level} onValueChange={(v) => updateSkill(sk.id, "level", v)}>
            <SelectTrigger className="h-8 text-xs w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LEVELS.map((l) => (
                <SelectItem key={l} value={l} className="text-xs">{LEVEL_LABELS[l]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-destructive hover:text-destructive" onClick={() => removeSkill(sk.id)}>
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" className="w-full h-8 text-xs gap-1.5" onClick={addSkill}>
        <Plus className="h-3.5 w-3.5" /> Add Skill
      </Button>
    </div>
  );
}
