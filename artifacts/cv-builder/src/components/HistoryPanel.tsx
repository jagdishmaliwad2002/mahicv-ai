import { useState } from "react";
import { useCVHistoryStore, CVSnapshot } from "../store/cv-history-store";
import { useCVStore } from "../store/cv-store";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { ConfirmDialog } from "./ConfirmDialog";
import { History, Trash2, RotateCcw, Clock, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "../lib/utils";

function timeAgo(ts: number): string {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function SnapshotRow({
  snap,
  isLatest,
  onRestore,
  onDelete,
}: {
  snap: CVSnapshot;
  isLatest: boolean;
  onRestore: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [confirmRestore, setConfirmRestore] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <>
      <div
        className={cn(
          "group flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50",
          isLatest && "border-primary/30 bg-primary/5"
        )}
      >
        <div className="mt-0.5 shrink-0 w-7 h-7 rounded-full bg-muted flex items-center justify-center">
          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium truncate">{snap.label}</span>
            {isLatest && (
              <Badge variant="outline" className="text-[10px] h-4 px-1.5 border-primary/40 text-primary">
                Latest
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {formatDate(snap.timestamp)} · {timeAgo(snap.timestamp)}
          </p>
        </div>
        <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setConfirmRestore(true)}
            title="Restore this version"
            className="h-7 w-7 flex items-center justify-center rounded-md hover:bg-muted transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setConfirmDelete(true)}
            title="Delete this snapshot"
            className="h-7 w-7 flex items-center justify-center rounded-md hover:bg-muted text-destructive transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={confirmRestore}
        title="Restore this version?"
        description={
          <>
            Your current CV will be replaced with the version from{" "}
            <strong>{formatDate(snap.timestamp)}</strong>. Your current state is also saved in history so you can get it back.
          </>
        }
        confirmLabel="Restore"
        onConfirm={() => { setConfirmRestore(false); onRestore(snap.id); }}
        onCancel={() => setConfirmRestore(false)}
      />

      <ConfirmDialog
        open={confirmDelete}
        title="Delete this snapshot?"
        description={
          <>
            The version saved at <strong>{formatDate(snap.timestamp)}</strong> will be permanently removed from your browser.
          </>
        }
        confirmLabel="Delete"
        destructive
        onConfirm={() => { setConfirmDelete(false); onDelete(snap.id); }}
        onCancel={() => setConfirmDelete(false)}
      />
    </>
  );
}

export default function HistoryPanel() {
  const { snapshots, getSnapshot, deleteSnapshot, clearHistory } = useCVHistoryStore();
  const { restoreCV } = useCVStore();
  const [confirmClear, setConfirmClear] = useState(false);

  const handleRestore = (id: string) => {
    const cv = getSnapshot(id);
    if (!cv) return;
    restoreCV(cv);
    toast.success("Version restored successfully!");
  };

  const handleDelete = (id: string) => {
    deleteSnapshot(id);
    toast.info("Snapshot deleted.");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <History className="h-4 w-4 text-primary" />
            Version History
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {snapshots.length} version{snapshots.length !== 1 ? "s" : ""} saved in your browser
          </p>
        </div>
        {snapshots.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs text-destructive hover:text-destructive gap-1"
            onClick={() => setConfirmClear(true)}
          >
            <Trash2 className="h-3 w-3" />
            Clear all
          </Button>
        )}
      </div>

      {snapshots.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <History className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium">No history yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Start editing your CV — versions are saved automatically every few seconds.
            </p>
          </div>
        </div>
      ) : (
        <ScrollArea className="flex-1 -mx-1 px-1">
          <div className="space-y-2 pb-4">
            {snapshots.map((snap, i) => (
              <SnapshotRow
                key={snap.id}
                snap={snap}
                isLatest={i === 0}
                onRestore={handleRestore}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </ScrollArea>
      )}

      <div className="mt-3 pt-3 border-t">
        <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
          History is stored only in <strong>this browser</strong>.<br />
          Clearing browser data will erase all saved versions.
        </p>
      </div>

      <ConfirmDialog
        open={confirmClear}
        title={
          <span className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            Clear entire history?
          </span>
        }
        description={`All ${snapshots.length} saved versions will be permanently deleted from your browser. Your current CV data will not be affected.`}
        confirmLabel="Clear all history"
        destructive
        onConfirm={() => { setConfirmClear(false); clearHistory(); toast.success("History cleared."); }}
        onCancel={() => setConfirmClear(false)}
      />
    </div>
  );
}
