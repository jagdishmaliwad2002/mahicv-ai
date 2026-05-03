import { useCVStore } from "../../store/cv-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { useGenerateSummary } from "@workspace/api-client-react";
import { useState } from "react";
import { toast } from "sonner";

export default function PersonalEditor() {
  const { cv, updatePersonal } = useCVStore();
  const p = cv.personal;
  const [loadingSummary, setLoadingSummary] = useState(false);

  const generateSummary = useGenerateSummary({
    mutation: {
      onSuccess: (data) => {
        if (data.summary) {
          updatePersonal("summary", data.summary);
          toast.success("Summary generated!");
        }
        setLoadingSummary(false);
      },
      onError: () => {
        toast.error("Failed to generate summary. Please try again.");
        setLoadingSummary(false);
      },
    },
  });

  const handleAISummary = () => {
    setLoadingSummary(true);
    generateSummary.mutate({
      data: {
        name: p.fullName,
        currentRole: p.jobTitle,
        skills: cv.skills.map((s) => s.name).filter(Boolean),
        experience: cv.experience.map((e) => `${e.role} at ${e.company}`).filter((s) => s.trim() !== " at "),
        education: cv.education[0] ? `${cv.education[0].degree} from ${cv.education[0].institution}` : undefined,
        tone: "professional",
      },
    });
  };

  const field = (label: string, key: string, placeholder?: string, type = "text") => (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      <Input
        type={type}
        value={(p as unknown as Record<string, string>)[key] ?? ""}
        onChange={(e) => updatePersonal(key, e.target.value)}
        placeholder={placeholder}
        className="h-8 text-sm"
      />
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {field("Full Name", "fullName", "Jane Smith")}
        {field("Job Title", "jobTitle", "Senior Software Engineer")}
        {field("Email", "email", "jane@example.com", "email")}
        {field("Phone", "phone", "+1 555-000-0000", "tel")}
        {field("Location", "location", "San Francisco, CA")}
        {field("Website", "website", "janesmith.dev")}
        {field("LinkedIn", "linkedin", "linkedin.com/in/janesmith")}
        {field("GitHub", "github", "github.com/janesmith")}
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs font-medium text-muted-foreground">Photo URL</Label>
        <Input
          value={p.photo}
          onChange={(e) => updatePersonal("photo", e.target.value)}
          placeholder="https://example.com/photo.jpg"
          className="h-8 text-sm"
        />
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-medium text-muted-foreground">Professional Summary</Label>
          <Button
            size="sm"
            variant="outline"
            className="h-7 text-xs gap-1"
            onClick={handleAISummary}
            disabled={loadingSummary}
          >
            {loadingSummary ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
            AI Generate
          </Button>
        </div>
        <Textarea
          value={p.summary}
          onChange={(e) => updatePersonal("summary", e.target.value)}
          placeholder="A results-driven engineer with 5+ years of experience..."
          className="text-sm min-h-[90px] resize-none"
        />
      </div>
    </div>
  );
}
