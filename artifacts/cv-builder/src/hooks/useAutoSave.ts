import { useEffect, useRef, useState } from "react";
import { useCVStore } from "../store/cv-store";
import { useCVHistoryStore } from "../store/cv-history-store";

export function useAutoSave(debounceMs = 2500) {
  const addSnapshot = useCVHistoryStore((s) => s.addSnapshot);
  const lastSavedAt = useCVHistoryStore((s) => s.lastSavedAt);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRun = useRef(true);
  const [savedAgo, setSavedAgo] = useState<string>("");
  const [justSaved, setJustSaved] = useState(false);

  /* Subscribe to store changes and debounce snapshot creation */
  useEffect(() => {
    const unsub = useCVStore.subscribe((state) => {
      if (isFirstRun.current) {
        isFirstRun.current = false;
        return;
      }
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        addSnapshot(state.cv);
        setJustSaved(true);
        setTimeout(() => setJustSaved(false), 2500);
      }, debounceMs);
    });
    return () => {
      unsub();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [addSnapshot, debounceMs]);

  /* Update the "Saved X ago" label every 15 s */
  useEffect(() => {
    const format = () => {
      if (!lastSavedAt) return setSavedAgo("Not saved yet");
      const diff = Math.floor((Date.now() - lastSavedAt) / 1000);
      if (diff < 10) return setSavedAgo("Just saved");
      if (diff < 60) return setSavedAgo(`Saved ${diff}s ago`);
      if (diff < 3600) return setSavedAgo(`Saved ${Math.floor(diff / 60)}m ago`);
      setSavedAgo(`Saved ${Math.floor(diff / 3600)}h ago`);
    };
    format();
    const id = setInterval(format, 15_000);
    return () => clearInterval(id);
  }, [lastSavedAt]);

  return { savedAgo, justSaved, lastSavedAt };
}
