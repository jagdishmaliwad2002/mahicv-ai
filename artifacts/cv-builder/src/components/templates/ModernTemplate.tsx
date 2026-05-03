import { CVData } from "../../types/cv";
import { SKILL_LABELS, LANGUAGE_LABELS } from "./template-utils";

interface Props {
  cv: CVData;
}

export default function ModernTemplate({ cv }: Props) {
  const { personal, skills, experience, education, projects, certifications, achievements, languages, customSections, sectionOrder, accentColor, fontSize } = cv;
  const accent = accentColor || "#2563eb";
  const visibleSections = sectionOrder.filter((s) => s.visible).map((s) => s.id);

  return (
    <div className="cv-preview" style={{ fontFamily: "Inter, sans-serif", fontSize: `${fontSize}px`, background: "white", color: "#1a1a1a", padding: "40px", minHeight: "297mm" }}>
      {/* Header */}
      <div style={{ borderBottom: `3px solid ${accent}`, paddingBottom: "24px", marginBottom: "28px", display: "flex", alignItems: "flex-start", gap: "20px" }}>
        {personal.photo && (
          <img src={personal.photo} alt="Photo" style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover", border: `3px solid ${accent}` }} />
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: "2em", fontWeight: 700, margin: 0, color: "#0f172a", letterSpacing: "-0.5px" }}>
            {personal.fullName || "Your Name"}
          </h1>
          {personal.jobTitle && (
            <p style={{ fontSize: "1.1em", color: accent, fontWeight: 600, margin: "4px 0 12px" }}>{personal.jobTitle}</p>
          )}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", fontSize: "0.82em", color: "#64748b" }}>
            {personal.email && <span>✉ {personal.email}</span>}
            {personal.phone && <span>✆ {personal.phone}</span>}
            {personal.location && <span>⌖ {personal.location}</span>}
            {personal.website && <span>🌐 {personal.website}</span>}
            {personal.linkedin && <span>in {personal.linkedin}</span>}
            {personal.github && <span>⌥ {personal.github}</span>}
          </div>
        </div>
      </div>

      {/* Summary */}
      {personal.summary && (
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "0.75em", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: accent, marginBottom: "8px" }}>
            Professional Summary
          </h2>
          <p style={{ fontSize: "0.9em", lineHeight: 1.7, color: "#374151" }}>{personal.summary}</p>
        </div>
      )}

      {/* Dynamic sections */}
      {visibleSections.map((sectionId) => {
        if (sectionId === "experience" && experience.length > 0) {
          return (
            <div key="experience" style={{ marginBottom: "24px" }}>
              <h2 style={{ fontSize: "0.75em", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: accent, marginBottom: "12px" }}>
                Work Experience
              </h2>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: "18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <strong style={{ fontSize: "1em", color: "#0f172a" }}>{exp.role}</strong>
                      <span style={{ color: "#64748b" }}> · {exp.company}</span>
                      {exp.location && <span style={{ color: "#94a3b8", fontSize: "0.85em" }}> · {exp.location}</span>}
                    </div>
                    <span style={{ color: "#94a3b8", fontSize: "0.82em", whiteSpace: "nowrap" }}>
                      {exp.startDate}{exp.startDate && (exp.current ? " – Present" : exp.endDate ? ` – ${exp.endDate}` : "")}
                    </span>
                  </div>
                  {exp.bullets.length > 0 ? (
                    <ul style={{ margin: "6px 0 0 18px", padding: 0 }}>
                      {exp.bullets.filter(Boolean).map((b, i) => (
                        <li key={i} style={{ fontSize: "0.88em", color: "#374151", marginBottom: "3px", lineHeight: 1.6 }}>{b}</li>
                      ))}
                    </ul>
                  ) : exp.description ? (
                    <p style={{ fontSize: "0.88em", color: "#374151", margin: "6px 0 0", lineHeight: 1.6 }}>{exp.description}</p>
                  ) : null}
                </div>
              ))}
            </div>
          );
        }
        if (sectionId === "education" && education.length > 0) {
          return (
            <div key="education" style={{ marginBottom: "24px" }}>
              <h2 style={{ fontSize: "0.75em", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: accent, marginBottom: "12px" }}>
                Education
              </h2>
              {education.map((ed) => (
                <div key={ed.id} style={{ marginBottom: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                      <strong style={{ color: "#0f172a" }}>{ed.institution}</strong>
                      <div style={{ fontSize: "0.88em", color: "#64748b" }}>
                        {ed.degree}{ed.field ? `, ${ed.field}` : ""}
                        {ed.gpa ? ` · GPA: ${ed.gpa}` : ""}
                      </div>
                    </div>
                    <span style={{ color: "#94a3b8", fontSize: "0.82em" }}>
                      {ed.startDate}{ed.endDate ? ` – ${ed.endDate}` : ""}
                    </span>
                  </div>
                  {ed.description && <p style={{ fontSize: "0.85em", color: "#374151", margin: "4px 0 0" }}>{ed.description}</p>}
                </div>
              ))}
            </div>
          );
        }
        if (sectionId === "skills" && skills.length > 0) {
          return (
            <div key="skills" style={{ marginBottom: "24px" }}>
              <h2 style={{ fontSize: "0.75em", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: accent, marginBottom: "12px" }}>
                Skills
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {skills.map((sk) => (
                  <div key={sk.id} style={{ background: `${accent}15`, border: `1px solid ${accent}30`, borderRadius: "4px", padding: "3px 10px", fontSize: "0.82em" }}>
                    <span style={{ color: "#0f172a" }}>{sk.name}</span>
                    {sk.level && <span style={{ color: "#94a3b8", marginLeft: "4px" }}>· {SKILL_LABELS[sk.level]}</span>}
                  </div>
                ))}
              </div>
            </div>
          );
        }
        if (sectionId === "projects" && projects.length > 0) {
          return (
            <div key="projects" style={{ marginBottom: "24px" }}>
              <h2 style={{ fontSize: "0.75em", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: accent, marginBottom: "12px" }}>
                Projects
              </h2>
              {projects.map((p) => (
                <div key={p.id} style={{ marginBottom: "14px" }}>
                  <div style={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
                    <strong style={{ color: "#0f172a" }}>{p.name}</strong>
                    {p.url && <a href={p.url} style={{ color: accent, fontSize: "0.82em" }}>{p.url}</a>}
                  </div>
                  {p.technologies.length > 0 && (
                    <div style={{ fontSize: "0.8em", color: "#94a3b8", marginBottom: "4px" }}>{p.technologies.join(" · ")}</div>
                  )}
                  {p.description && <p style={{ fontSize: "0.88em", color: "#374151", margin: "4px 0 0" }}>{p.description}</p>}
                </div>
              ))}
            </div>
          );
        }
        if (sectionId === "certifications" && certifications.length > 0) {
          return (
            <div key="certifications" style={{ marginBottom: "24px" }}>
              <h2 style={{ fontSize: "0.75em", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: accent, marginBottom: "12px" }}>
                Certifications
              </h2>
              {certifications.map((c) => (
                <div key={c.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <div>
                    <strong style={{ color: "#0f172a", fontSize: "0.92em" }}>{c.name}</strong>
                    {c.issuer && <span style={{ color: "#64748b", fontSize: "0.85em" }}> · {c.issuer}</span>}
                  </div>
                  <span style={{ color: "#94a3b8", fontSize: "0.82em" }}>{c.date}</span>
                </div>
              ))}
            </div>
          );
        }
        if (sectionId === "achievements" && achievements.length > 0) {
          return (
            <div key="achievements" style={{ marginBottom: "24px" }}>
              <h2 style={{ fontSize: "0.75em", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: accent, marginBottom: "12px" }}>
                Achievements
              </h2>
              {achievements.map((a) => (
                <div key={a.id} style={{ marginBottom: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong style={{ color: "#0f172a", fontSize: "0.92em" }}>{a.title}</strong>
                    {a.date && <span style={{ color: "#94a3b8", fontSize: "0.82em" }}>{a.date}</span>}
                  </div>
                  {a.description && <p style={{ fontSize: "0.85em", color: "#374151", margin: "3px 0 0" }}>{a.description}</p>}
                </div>
              ))}
            </div>
          );
        }
        if (sectionId === "languages" && languages.length > 0) {
          return (
            <div key="languages" style={{ marginBottom: "24px" }}>
              <h2 style={{ fontSize: "0.75em", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: accent, marginBottom: "12px" }}>
                Languages
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                {languages.map((l) => (
                  <span key={l.id} style={{ fontSize: "0.88em" }}>
                    <strong style={{ color: "#0f172a" }}>{l.name}</strong>
                    <span style={{ color: "#94a3b8" }}> · {LANGUAGE_LABELS[l.level]}</span>
                  </span>
                ))}
              </div>
            </div>
          );
        }
        const customSection = customSections.find((cs) => cs.id === sectionId);
        if (customSection && customSection.items.length > 0) {
          return (
            <div key={customSection.id} style={{ marginBottom: "24px" }}>
              <h2 style={{ fontSize: "0.75em", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: accent, marginBottom: "12px" }}>
                {customSection.title}
              </h2>
              {customSection.items.map((item) => (
                <div key={item.id} style={{ marginBottom: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                      {item.title && <strong style={{ color: "#0f172a", fontSize: "0.92em" }}>{item.title}</strong>}
                      {item.subtitle && <span style={{ color: "#64748b", fontSize: "0.85em" }}> · {item.subtitle}</span>}
                    </div>
                    {item.date && <span style={{ color: "#94a3b8", fontSize: "0.82em" }}>{item.date}</span>}
                  </div>
                  {item.description && <p style={{ fontSize: "0.85em", color: "#374151", margin: "3px 0 0" }}>{item.description}</p>}
                </div>
              ))}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
