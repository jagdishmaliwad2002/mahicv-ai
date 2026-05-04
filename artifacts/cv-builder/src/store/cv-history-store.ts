import { create } from "zustand";
import { CVData } from "../types/cv";

export interface CVSnapshot {
  id: string;
  timestamp: number;
  label: string;
  cv: CVData;
}

const HISTORY_KEY = "cv-builder-history";
const MAX_SNAPSHOTS = 30;

function loadHistory(): CVSnapshot[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as CVSnapshot[]) : [];
  } catch {
    return [];
  }
}

function persistHistory(snapshots: CVSnapshot[]) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(snapshots));
  } catch {}
}

interface CVHistoryStore {
  snapshots: CVSnapshot[];
  lastSavedAt: number | null;
  addSnapshot: (cv: CVData, label?: string) => void;
  getSnapshot: (id: string) => CVData | null;
  deleteSnapshot: (id: string) => void;
  clearHistory: () => void;
}

export const useCVHistoryStore = create<CVHistoryStore>()((set, get) => ({
  snapshots: loadHistory(),
  lastSavedAt: (() => {
    const h = loadHistory();
    return h.length > 0 ? h[0].timestamp : null;
  })(),

  addSnapshot: (cv, label) => {
    const snap: CVSnapshot = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      label: cv.personal.fullName?.trim() || "Untitled CV",
      cv: JSON.parse(JSON.stringify(cv)),
    };
    if (label) snap.label = label;
    const updated = [snap, ...get().snapshots].slice(0, MAX_SNAPSHOTS);
    persistHistory(updated);
    set({ snapshots: updated, lastSavedAt: snap.timestamp });
  },

  getSnapshot: (id) => {
    const snap = get().snapshots.find((s) => s.id === id);
    return snap ? JSON.parse(JSON.stringify(snap.cv)) : null;
  },

  deleteSnapshot: (id) => {
    const updated = get().snapshots.filter((s) => s.id !== id);
    persistHistory(updated);
    set({ snapshots: updated });
  },

  clearHistory: () => {
    persistHistory([]);
    set({ snapshots: [], lastSavedAt: null });
  },
}));
