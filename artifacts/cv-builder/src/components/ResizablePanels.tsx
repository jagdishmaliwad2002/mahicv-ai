import { useRef, useState, useCallback, useEffect } from "react";
import { GripVertical } from "lucide-react";

interface ResizablePanelsProps {
  left: React.ReactNode;
  right: React.ReactNode;
  defaultLeftPercent?: number;
  minLeftPercent?: number;
  maxLeftPercent?: number;
  storageKey?: string;
}

export function ResizablePanels({
  left,
  right,
  defaultLeftPercent = 28,
  minLeftPercent = 16,
  maxLeftPercent = 60,
  storageKey = "cv-panel-split",
}: ResizablePanelsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const getSaved = () => {
    try {
      const v = sessionStorage.getItem(storageKey);
      return v ? parseFloat(v) : defaultLeftPercent;
    } catch {
      return defaultLeftPercent;
    }
  };

  const [leftPercent, setLeftPercent] = useState<number>(getSaved);

  const clamp = (v: number) =>
    Math.min(maxLeftPercent, Math.max(minLeftPercent, v));

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pct = clamp(((e.clientX - rect.left) / rect.width) * 100);
      setLeftPercent(pct);
      try { sessionStorage.setItem(storageKey, String(pct)); } catch {}
    };
    const onMouseUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [storageKey]);

  return (
    <div ref={containerRef} className="flex flex-1 min-w-0 h-full overflow-hidden">
      {/* Left panel */}
      <div
        className="flex flex-col min-w-0 overflow-hidden h-full"
        style={{ width: `${leftPercent}%`, flexShrink: 0 }}
      >
        {left}
      </div>

      {/* Drag handle */}
      <div
        onMouseDown={onMouseDown}
        className="group relative flex w-1.5 shrink-0 cursor-col-resize items-center justify-center bg-border/60 hover:bg-primary/40 transition-colors duration-100 z-10"
        title="Drag to resize"
      >
        <div className="absolute flex h-8 w-4 items-center justify-center rounded border border-border bg-background shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none">
          <GripVertical className="h-3 w-3 text-muted-foreground" />
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden h-full">
        {right}
      </div>
    </div>
  );
}
