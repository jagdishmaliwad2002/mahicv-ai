import { useCVStore } from "../store/cv-store";
import { useGetResumeScore } from "@workspace/api-client-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Loader2, TrendingUp, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";

const scoreColors: Record<string, string> = {
  excellent: "text-green-600",
  good: "text-blue-600",
  fair: "text-amber-600",
  poor: "text-red-600",
};
const scoreBg: Record<string, string> = {
  excellent: "bg-green-50 border-green-200",
  good: "bg-blue-50 border-blue-200",
  fair: "bg-amber-50 border-amber-200",
  poor: "bg-red-50 border-red-200",
};

interface ScoreResult {
  score: number;
  level: string;
  feedback: string[];
  suggestions: string[];
}

export default function ResumeScore() {
  const { cv } = useCVStore();
  const [result, setResult] = useState<ScoreResult | null>(null);

  const scorer = useGetResumeScore({
    mutation: {
      onSuccess: (data) => {
        setResult(data as ScoreResult);
      },
    },
  });

  const check = () => {
    scorer.mutate({
      data: {
        hasPhoto: !!cv.personal.photo,
        hasSummary: !!cv.personal.summary,
        skillsCount: cv.skills.filter((s) => s.name).length,
        experienceCount: cv.experience.filter((e) => e.company || e.role).length,
        educationCount: cv.education.filter((e) => e.institution).length,
        hasProjects: cv.projects.filter((p) => p.name).length > 0,
        hasCertifications: cv.certifications.filter((c) => c.name).length > 0,
        hasLanguages: cv.languages.filter((l) => l.name).length > 0,
        summaryLength: cv.personal.summary.length,
      },
    });
  };

  return (
    <div className="space-y-3">
      <Button onClick={check} disabled={scorer.isPending} className="w-full gap-2" size="sm">
        {scorer.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <TrendingUp className="h-4 w-4" />}
        Check Resume Score
      </Button>

      {result && (
        <div className={`rounded-lg border p-4 ${scoreBg[result.level] || "bg-muted"}`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold">Resume Score</span>
            <div className="flex items-center gap-2">
              <span className={`text-2xl font-bold ${scoreColors[result.level]}`}>{result.score}</span>
              <span className="text-muted-foreground text-sm">/100</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-white/60 rounded-full h-2 mb-3">
            <div
              className="h-2 rounded-full transition-all duration-500"
              style={{
                width: `${result.score}%`,
                background: result.level === "excellent" ? "#16a34a" : result.level === "good" ? "#2563eb" : result.level === "fair" ? "#d97706" : "#dc2626"
              }}
            />
          </div>

          <Badge variant="outline" className={`capitalize mb-3 ${scoreColors[result.level]}`}>
            {result.level}
          </Badge>

          {result.feedback.length > 0 && (
            <div className="space-y-1 mb-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">What's good</p>
              {result.feedback.map((f, i) => (
                <div key={i} className="flex items-start gap-1.5 text-xs">
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mt-0.5 shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          )}
          {result.suggestions.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Suggestions</p>
              {result.suggestions.map((s, i) => (
                <div key={i} className="flex items-start gap-1.5 text-xs">
                  <AlertCircle className="h-3.5 w-3.5 text-amber-500 mt-0.5 shrink-0" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
