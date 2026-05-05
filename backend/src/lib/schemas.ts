import { z } from "zod";

export const HealthCheckResponse = z.object({
  status: z.string(),
});

export const GenerateSummaryBody = z.object({
  name: z.string(),
  currentRole: z.string().optional(),
  skills: z.array(z.string()).optional(),
  experience: z.array(z.string()).optional(),
  education: z.string().optional(),
  tone: z
    .enum(["professional", "creative", "technical", "executive"])
    .optional(),
});

export const GenerateSummaryResponse = z.object({
  summary: z.string(),
});

export const GetResumeScoreBody = z.object({
  hasPhoto: z.boolean().optional(),
  hasSummary: z.boolean().optional(),
  skillsCount: z.number(),
  experienceCount: z.number(),
  educationCount: z.number(),
  hasProjects: z.boolean().optional(),
  hasCertifications: z.boolean().optional(),
  hasLanguages: z.boolean().optional(),
  summaryLength: z.number().optional(),
});

export const GetResumeScoreResponse = z.object({
  score: z.number().describe("Score from 0 to 100"),
  level: z.enum(["poor", "fair", "good", "excellent"]),
  feedback: z.array(z.string()),
  suggestions: z.array(z.string()),
});
