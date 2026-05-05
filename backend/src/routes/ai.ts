import { Router } from "express";
import { openai } from "../lib/openai.js";
import { GenerateSummaryBody, GetResumeScoreBody } from "../lib/schemas.js";

const router = Router();

router.post("/ai/generate-summary", async (req, res) => {
  const parsed = GenerateSummaryBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body", details: parsed.error.flatten() });
    return;
  }

  const {
    name,
    currentRole,
    skills = [],
    experience = [],
    education,
    tone = "professional",
  } = parsed.data;

  const prompt = `Write a concise, compelling professional summary for a CV/resume.

Person: ${name}
${currentRole ? `Current/Target Role: ${currentRole}` : ""}
${skills.length > 0 ? `Skills: ${skills.join(", ")}` : ""}
${experience.length > 0 ? `Experience highlights: ${experience.join("; ")}` : ""}
${education ? `Education: ${education}` : ""}
Tone: ${tone}

Write 2-3 sentences (50-80 words) in first-person. Be specific, confident, and results-oriented. Do not use clichés like "passionate", "detail-oriented", or "team player". Return only the summary text with no extra commentary.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 200,
      messages: [{ role: "user", content: prompt }],
    });

    const summary = response.choices[0]?.message?.content?.trim() ?? "";
    res.json({ summary });
  } catch (err) {
    console.error("Failed to generate summary:", err);
    res.status(500).json({ error: "Failed to generate summary" });
  }
});

router.post("/ai/resume-score", async (req, res) => {
  const parsed = GetResumeScoreBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body", details: parsed.error.flatten() });
    return;
  }

  const {
    hasPhoto = false,
    hasSummary = false,
    skillsCount = 0,
    experienceCount = 0,
    educationCount = 0,
    hasProjects = false,
    hasCertifications = false,
    hasLanguages = false,
    summaryLength = 0,
  } = parsed.data;

  let score = 0;
  const feedback: string[] = [];
  const suggestions: string[] = [];

  if (hasSummary && summaryLength > 30) {
    score += 20;
    feedback.push("Professional summary present");
  } else {
    suggestions.push("Add a professional summary (50-80 words)");
  }

  if (skillsCount >= 5) {
    score += 20;
    feedback.push(`${skillsCount} skills listed`);
  } else if (skillsCount > 0) {
    score += 10;
    suggestions.push("Add at least 5 skills");
  } else {
    suggestions.push("Add your key skills");
  }

  if (experienceCount >= 2) {
    score += 25;
    feedback.push(`${experienceCount} work experiences listed`);
  } else if (experienceCount === 1) {
    score += 12;
    suggestions.push("Add more work experience entries");
  } else {
    suggestions.push("Add work experience");
  }

  if (educationCount >= 1) {
    score += 15;
    feedback.push("Education section complete");
  } else {
    suggestions.push("Add your education background");
  }

  if (hasProjects) {
    score += 10;
    feedback.push("Projects section adds depth");
  } else {
    suggestions.push("Showcase projects to stand out");
  }

  if (hasCertifications) {
    score += 5;
    feedback.push("Certifications boost credibility");
  }

  if (hasLanguages) {
    score += 5;
    feedback.push("Language skills highlighted");
  }

  if (hasPhoto) {
    feedback.push("Profile photo included");
  } else {
    suggestions.push("Add a professional profile photo");
  }

  let level: "poor" | "fair" | "good" | "excellent";
  if (score >= 85) level = "excellent";
  else if (score >= 65) level = "good";
  else if (score >= 40) level = "fair";
  else level = "poor";

  res.json({ score, level, feedback, suggestions });
});

export default router;
