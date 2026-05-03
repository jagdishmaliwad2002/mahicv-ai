import { useCVStore } from "../../store/cv-store";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Plus, Trash2 } from "lucide-react";
import { LanguageLevel } from "../../types/cv";

const LEVELS: LanguageLevel[] = ["basic", "conversational", "professional", "fluent", "native"];
const LEVEL_LABELS: Record<LanguageLevel, string> = {
  basic: "Basic",
  conversational: "Conversational",
  professional: "Professional",
  fluent: "Fluent",
  native: "Native",
};

export default function LanguagesEditor() {
  const { cv, addLanguage, updateLanguage, removeLanguage } = useCVStore();
  return (
    <div className="space-y-2">
      {cv.languages.map((l) => (
        <div key={l.id} className="flex items-center gap-2">
          <Input value={l.name} onChange={(e) => updateLanguage(l.id, "name", e.target.value)} placeholder="e.g. Spanish" className="h-8 text-sm flex-1" />
          <Select value={l.level} onValueChange={(v) => updateLanguage(l.id, "level", v)}>
            <SelectTrigger className="h-8 text-xs w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LEVELS.map((lv) => (
                <SelectItem key={lv} value={lv} className="text-xs">{LEVEL_LABELS[lv]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-destructive hover:text-destructive" onClick={() => removeLanguage(l.id)}>
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" className="w-full h-8 text-xs gap-1.5" onClick={addLanguage}>
        <Plus className="h-3.5 w-3.5" /> Add Language
      </Button>
    </div>
  );
}
