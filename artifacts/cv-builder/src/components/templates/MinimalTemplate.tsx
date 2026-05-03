import { CVData } from "../../types/cv";
import { SKILL_LABELS, LANGUAGE_LABELS } from "./template-utils";

interface Props { cv: CVData; }

export default function MinimalTemplate({ cv }: Props) {
  const { personal, skills, experience, education, projects, certifications, achievements, languages, customSections, sectionOrder, accentColor, fontSize } = cv;
  const accent = accentColor || "#18181b";
  const visibleSections = sectionOrder.filter((s) => s.visible).map((s) => s.id);

  const SectionTitle = ({ children }: { children: string }) => (
    <h2 style={{ fontSize: "0.7em", fontWeight: 700, textTransform: "uppercase", letterSpacing: "3px", color: "#94a3b8", marginBottom: "12px" }}>{children}</h2>
  );

  return (
    <div className="cv-preview" style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: `${fontSize}px`, background: "white", color: "#18181b", padding: "48px", minHeight: "297mm" }}>
      {/* Header */}
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2.5em", fontWeight: 300, margin: "0 0 4px", letterSpacing: "-1px", color: "#0f172a" }}>
          {personal.fullName || "Your Name"}
        </h1>
        {personal.jobTitle && <p style={{ fontSize: "1em", color: "#64748b", margin: "0 0 16px", fontWeight: 400 }}>{personal.jobTitle}</p>}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", fontSize: "0.8em", color: "#94a3b8" }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.website && <span>{personal.website}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.github && <span>{personal.github}</span>}
        </div>
      </div>

      {personal.summary && (
        <div style={{ marginBottom: "36px" }}>
          <p style={{ fontSize: "0.95em", lineHeight: 1.8, color: "#374151", maxWidth: "600px" }}>{personal.summary}</p>
        </div>
      )}

      {visibleSections.map((sectionId) => {
        if (sectionId === "experience" && experience.length > 0) return (
          <div key="experience" style={{ marginBottom: "36px" }}>
            <SectionTitle>Experience</SectionTitle>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: "24px", display: "grid", gridTemplateColumns: "160px 1fr", gap: "16px" }}>
                <div style={{ color: "#94a3b8", fontSize: "0.82em", paddingTop: "2px" }}>
                  {exp.startDate}{exp.startDate && (exp.current ? "–now" : exp.endDate ? `–${exp.endDate}` : "")}
                  {exp.location && <div>{exp.location}</div>}
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: "#0f172a" }}>{exp.role}</div>
                  <div style={{ color: "#64748b", fontSize: "0.88em", marginBottom: "6px" }}>{exp.company}</div>
                  {exp.bullets.length > 0 ? (
                    <ul style={{ margin: 0, paddingLeft: "16px" }}>
                      {exp.bullets.filter(Boolean).map((b, i) => <li key={i} style={{ fontSize: "0.88em", color: "#374151", marginBottom: "3px" }}>{b}</li>)}
                    </ul>
                  ) : exp.description ? <p style={{ fontSize: "0.88em", color: "#374151", margin: 0 }}>{exp.description}</p> : null}
                </div>
              </div>
            ))}
          </div>
        );
        if (sectionId === "education" && education.length > 0) return (
          <div key="education" style={{ marginBottom: "36px" }}>
            <SectionTitle>Education</SectionTitle>
            {education.map((ed) => (
              <div key={ed.id} style={{ marginBottom: "16px", display: "grid", gridTemplateColumns: "160px 1fr", gap: "16px" }}>
                <div style={{ color: "#94a3b8", fontSize: "0.82em" }}>{ed.startDate}{ed.endDate ? `–${ed.endDate}` : ""}</div>
                <div>
                  <div style={{ fontWeight: 600, color: "#0f172a" }}>{ed.institution}</div>
                  <div style={{ color: "#64748b", fontSize: "0.88em" }}>{ed.degree}{ed.field ? `, ${ed.field}` : ""}{ed.gpa ? ` · ${ed.gpa}` : ""}</div>
                </div>
              </div>
            ))}
          </div>
        );
        if (sectionId === "skills" && skills.length > 0) return (
          <div key="skills" style={{ marginBottom: "36px" }}>
            <SectionTitle>Skills</SectionTitle>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {skills.map((sk) => (
                <span key={sk.id} style={{ fontSize: "0.85em", color: "#374151", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "3px", padding: "2px 8px" }}>
                  {sk.name}
                </span>
              ))}
            </div>
          </div>
        );
        if (sectionId === "projects" && projects.length > 0) return (
          <div key="projects" style={{ marginBottom: "36px" }}>
            <SectionTitle>Projects</SectionTitle>
            {projects.map((p) => (
              <div key={p.id} style={{ marginBottom: "16px", display: "grid", gridTemplateColumns: "160px 1fr", gap: "16px" }}>
                <div style={{ color: "#94a3b8", fontSize: "0.82em" }}>{p.technologies.slice(0, 2).join(", ")}</div>
                <div>
                  <div style={{ fontWeight: 600, color: "#0f172a" }}>{p.name}{p.url && <span style={{ color: "#94a3b8", fontSize: "0.8em", fontWeight: 400, marginLeft: "8px" }}>{p.url}</span>}</div>
                  {p.description && <p style={{ fontSize: "0.88em", color: "#374151", margin: "4px 0 0" }}>{p.description}</p>}
                </div>
              </div>
            ))}
          </div>
        );
        if (sectionId === "certifications" && certifications.length > 0) return (
          <div key="certifications" style={{ marginBottom: "36px" }}>
            <SectionTitle>Certifications</SectionTitle>
            {certifications.map((c) => (
              <div key={c.id} style={{ marginBottom: "8px", display: "grid", gridTemplateColumns: "160px 1fr", gap: "16px" }}>
                <span style={{ color: "#94a3b8", fontSize: "0.82em" }}>{c.date}</span>
                <span style={{ fontSize: "0.88em" }}><strong>{c.name}</strong>{c.issuer && ` — ${c.issuer}`}</span>
              </div>
            ))}
          </div>
        );
        if (sectionId === "achievements" && achievements.length > 0) return (
          <div key="achievements" style={{ marginBottom: "36px" }}>
            <SectionTitle>Achievements</SectionTitle>
            {achievements.map((a) => (
              <div key={a.id} style={{ marginBottom: "10px" }}>
                <strong style={{ fontSize: "0.9em" }}>{a.title}</strong>{a.date && <span style={{ color: "#94a3b8", fontSize: "0.82em", marginLeft: "8px" }}>{a.date}</span>}
                {a.description && <p style={{ fontSize: "0.85em", color: "#374151", margin: "3px 0 0" }}>{a.description}</p>}
              </div>
            ))}
          </div>
        );
        if (sectionId === "languages" && languages.length > 0) return (
          <div key="languages" style={{ marginBottom: "36px" }}>
            <SectionTitle>Languages</SectionTitle>
            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
              {languages.map((l) => <span key={l.id} style={{ fontSize: "0.88em" }}>{l.name} <span style={{ color: "#94a3b8" }}>({LANGUAGE_LABELS[l.level]})</span></span>)}
            </div>
          </div>
        );
        const customSection = customSections.find((cs) => cs.id === sectionId);
        if (customSection && customSection.items.length > 0) return (
          <div key={customSection.id} style={{ marginBottom: "36px" }}>
            <SectionTitle>{customSection.title}</SectionTitle>
            {customSection.items.map((item) => (
              <div key={item.id} style={{ marginBottom: "10px", display: "grid", gridTemplateColumns: "160px 1fr", gap: "16px" }}>
                <span style={{ color: "#94a3b8", fontSize: "0.82em" }}>{item.date}</span>
                <div>
                  <strong style={{ fontSize: "0.9em" }}>{item.title}</strong>{item.subtitle && <span style={{ color: "#64748b", fontSize: "0.85em" }}> — {item.subtitle}</span>}
                  {item.description && <p style={{ fontSize: "0.85em", color: "#374151", margin: "3px 0 0" }}>{item.description}</p>}
                </div>
              </div>
            ))}
          </div>
        );
        return null;
      })}
    </div>
  );
}
