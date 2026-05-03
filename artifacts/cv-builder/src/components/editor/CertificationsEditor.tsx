import { useCVStore } from "../../store/cv-store";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Plus, Trash2 } from "lucide-react";
import { Certification } from "../../types/cv";

function CertCard({ cert }: { cert: Certification }) {
  const { updateCertification, removeCertification } = useCVStore();
  const u = (f: string, v: string) => updateCertification(cert.id, f, v);
  return (
    <div className="border rounded-lg p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium truncate">{cert.name || "New Certification"}</span>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeCertification(cert.id)}>
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Certification Name</Label>
          <Input value={cert.name} onChange={(e) => u("name", e.target.value)} placeholder="AWS Solutions Architect" className="h-8 text-sm" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Issuing Organization</Label>
          <Input value={cert.issuer} onChange={(e) => u("issuer", e.target.value)} placeholder="Amazon Web Services" className="h-8 text-sm" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Date</Label>
          <Input value={cert.date} onChange={(e) => u("date", e.target.value)} placeholder="Mar 2023" className="h-8 text-sm" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">URL (optional)</Label>
          <Input value={cert.url} onChange={(e) => u("url", e.target.value)} placeholder="credly.com/..." className="h-8 text-sm" />
        </div>
      </div>
    </div>
  );
}

export default function CertificationsEditor() {
  const { cv, addCertification } = useCVStore();
  return (
    <div className="space-y-2">
      {cv.certifications.map((c) => <CertCard key={c.id} cert={c} />)}
      <Button variant="outline" size="sm" className="w-full h-8 text-xs gap-1.5" onClick={addCertification}>
        <Plus className="h-3.5 w-3.5" /> Add Certification
      </Button>
    </div>
  );
}
