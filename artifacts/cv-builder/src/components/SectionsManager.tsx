import { useCVStore } from "../store/cv-store";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { Switch } from "./ui/switch";
import { Section } from "../types/cv";

function SortableSection({ section }: { section: Section }) {
  const { toggleSection } = useCVStore();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2"
    >
      <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground">
        <GripVertical className="h-4 w-4" />
      </button>
      <span className="flex-1 text-sm">{section.label}</span>
      <Switch
        checked={section.visible}
        onCheckedChange={() => toggleSection(section.id)}
        className="scale-75"
      />
    </div>
  );
}

export default function SectionsManager() {
  const { cv, reorderSections } = useCVStore();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = cv.sectionOrder.findIndex((s) => s.id === active.id);
      const newIndex = cv.sectionOrder.findIndex((s) => s.id === over.id);
      reorderSections(arrayMove(cv.sectionOrder, oldIndex, newIndex));
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground">Drag to reorder · Toggle to show/hide</p>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={cv.sectionOrder.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          {cv.sectionOrder.map((section) => (
            <SortableSection key={section.id} section={section} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
