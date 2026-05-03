import { useCVStore } from "../store/cv-store";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

const ACCENT_COLORS = [
  "#2563eb", "#7c3aed", "#059669", "#dc2626", "#ea580c",
  "#0ea5e9", "#0f4c75", "#1e3a5f", "#18181b", "#be185d",
];

export default function AppearanceSettings() {
  const { cv, setAccentColor, setFontSize } = useCVStore();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Accent Color</Label>
        <div className="flex flex-wrap gap-2">
          {ACCENT_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => setAccentColor(color)}
              className="w-7 h-7 rounded-full border-2 transition-transform hover:scale-110"
              style={{
                background: color,
                borderColor: cv.accentColor === color ? "#fff" : "transparent",
                boxShadow: cv.accentColor === color ? `0 0 0 2px ${color}` : "none",
              }}
            />
          ))}
          <input
            type="color"
            value={cv.accentColor}
            onChange={(e) => setAccentColor(e.target.value)}
            className="w-7 h-7 rounded-full cursor-pointer border-2 border-border"
            title="Custom color"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Font Size: {cv.fontSize}px</Label>
        <Slider
          min={11}
          max={16}
          step={0.5}
          value={[cv.fontSize]}
          onValueChange={([v]) => setFontSize(v)}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Small</span>
          <span>Large</span>
        </div>
      </div>
    </div>
  );
}
