import { useCVStore } from "../../store/cv-store";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Plus, Trash2 } from "lucide-react";
import { Achievement } from "../../types/cv";

function AchievementCard({ ach }: { ach: Achievement }) {
  const { updateAchievement, removeAchievement } = useCVStore();
  const u = (f: string, v: string) => updateAchievement(ach.id, f, v);
  return (
    <div className="border rounded-lg p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium truncate">{ach.title || "New Achievement"}</span>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeAchievement(ach.id)}>
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1 col-span-2">
          <Label className="text-xs text-muted-foreground">Title</Label>
          <Input value={ach.title} onChange={(e) => u("title", e.target.value)} placeholder="Employee of the Year" className="h-8 text-sm" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Date</Label>
          <Input value={ach.date} onChange={(e) => u("date", e.target.value)} placeholder="2023" className="h-8 text-sm" />
        </div>
      </div>
      <div className="space-y-1">
        <Label className="text-xs text-muted-foreground">Description</Label>
        <Textarea value={ach.description} onChange={(e) => u("description", e.target.value)} placeholder="Brief description of this achievement..." className="text-sm min-h-[56px] resize-none" />
      </div>
    </div>
  );
}

export default function AchievementsEditor() {
  const { cv, addAchievement } = useCVStore();
  return (
    <div className="space-y-2">
      {cv.achievements.map((a) => <AchievementCard key={a.id} ach={a} />)}
      <Button variant="outline" size="sm" className="w-full h-8 text-xs gap-1.5" onClick={addAchievement}>
        <Plus className="h-3.5 w-3.5" /> Add Achievement
      </Button>
    </div>
  );
}
