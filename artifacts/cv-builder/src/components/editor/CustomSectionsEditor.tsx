import { useCVStore } from "../../store/cv-store";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Plus, Trash2, PlusCircle } from "lucide-react";
import { CustomSection } from "../../types/cv";

function CustomSectionCard({ section }: { section: CustomSection }) {
  const { updateCustomSection, removeCustomSection, addCustomItem, updateCustomItem, removeCustomItem } = useCVStore();
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 bg-muted/30">
        <Input
          value={section.title}
          onChange={(e) => updateCustomSection(section.id, "title", e.target.value)}
          placeholder="Section Title"
          className="h-7 text-sm flex-1 font-medium"
        />
        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeCustomSection(section.id)}>
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
      <div className="p-3 space-y-3">
        {section.items.map((item) => (
          <div key={item.id} className="border rounded-md p-2 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-medium">{item.title || "Item"}</span>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => removeCustomItem(section.id, item.id)}>
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Title</Label>
                <Input value={item.title} onChange={(e) => updateCustomItem(section.id, item.id, "title", e.target.value)} className="h-7 text-xs" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Subtitle</Label>
                <Input value={item.subtitle} onChange={(e) => updateCustomItem(section.id, item.id, "subtitle", e.target.value)} className="h-7 text-xs" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Date</Label>
                <Input value={item.date} onChange={(e) => updateCustomItem(section.id, item.id, "date", e.target.value)} className="h-7 text-xs" />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Description</Label>
              <Textarea value={item.description} onChange={(e) => updateCustomItem(section.id, item.id, "description", e.target.value)} className="text-xs min-h-[48px] resize-none" />
            </div>
          </div>
        ))}
        <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-muted-foreground w-full" onClick={() => addCustomItem(section.id)}>
          <PlusCircle className="h-3 w-3" /> Add Item
        </Button>
      </div>
    </div>
  );
}

export default function CustomSectionsEditor() {
  const { cv, addCustomSection } = useCVStore();
  return (
    <div className="space-y-3">
      {cv.customSections.map((cs) => <CustomSectionCard key={cs.id} section={cs} />)}
      <Button variant="outline" size="sm" className="w-full h-8 text-xs gap-1.5" onClick={addCustomSection}>
        <Plus className="h-3.5 w-3.5" /> Add Custom Section
      </Button>
    </div>
  );
}
