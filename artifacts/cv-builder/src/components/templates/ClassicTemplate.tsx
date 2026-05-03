import { CVData } from "../../types/cv";
import { SKILL_LABELS, LANGUAGE_LABELS, SKILL_DOTS } from "./template-utils";

interface Props { cv: CVData; }

export default function ClassicTemplate({ cv }: Props) {
  const { personal, skills, experience, education, projects, certifications, achievements, languages, customSections, sectionOrder, accentColor, fontSize } = cv;
  const accent = accentColor || "#1e3a5f";
  const visibleSections = sectionOrder.filter((s) => s.visible).map((s) => s.id);

  return (
    <div className="cv-preview" style={{ fontFamily: "Georgia, serif", fontSize: `${fontSize}px`, background: "white", color: "#1a1a1a", padding: "40px", minHeight: "297mm" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "28px", borderBottom: `2px solid ${accent}`, paddingBottom: "20px" }}>
        {personal.photo && (
          <img src={personal.photo} alt="Photo" style={{ width: "90px", height: "90px", borderRadius: "50%", objectFit: "cover", margin: "0 auto 12px", display: "block", border: `3px solid ${accent}` }} />
        )}
        <h1 style={{ fontSize: "2.2em", fontWeight: 700, margin: "0 0 6px", color: accent, letterSpacing: "1px" }}>
          {personal.fullName || "Your Name"}
        </h1>
        {personal.jobTitle && (
          <p style={{ fontSize: "1em", color: "#555", fontStyle: "italic", margin: "0 0 12px" }}>{personal.jobTitle}</p>
        )}
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "20px", fontSize: "0.82em", color: "#666" }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.website && <span>{personal.website}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.github && <span>{personal.github}</span>}
        </div>
      </div>

      {personal.summary && (
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "0.9em", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: accent, borderBottom: `1px solid ${accent}40`, paddingBottom: "4px", marginBottom: "10px" }}>
            Professional Summary
          </h2>
          <p style={{ fontSize: "0.9em", lineHeight: 1.75, color: "#374151", fontStyle: "italic" }}>{personal.summary}</p>
        </div>
      )}

      {visibleSections.map((sectionId) => {
        const sectionHeader = (title: string) => (
          <h2 style={{ fontSize: "0.9em", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: accent, borderBottom: `1px solid ${accent}40`, paddingBottom: "4px", marginBottom: "12px" }}>
            {title}
          </h2>
        );

        if (sectionId === "experience" && experience.length > 0) return (
          <div key="experience" style={{ marginBottom: "24px" }}>
            {sectionHeader("Work Experience")}
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: "18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <strong style={{ fontSize: "0.95em", color: "#1a1a1a" }}>{exp.role}</strong>
                    {exp.company && <span style={{ color: "#555" }}>, {exp.company}</span>}
                    {exp.location && <span style={{ color: "#888", fontSize: "0.85em" }}> — {exp.location}</span>}
                  </div>
                  <em style={{ color: "#888", fontSize: "0.82em" }}>{exp.startDate}{exp.startDate && (exp.current ? " – Present" : exp.endDate ? ` – ${exp.endDate}` : "")}</em>
                </div>
                {exp.bullets.length > 0 ? (
                  <ul style={{ margin: "6px 0 0 20px", padding: 0 }}>
                    {exp.bullets.filter(Boolean).map((b, i) => <li key={i} style={{ fontSize: "0.88em", color: "#374151", marginBottom: "3px" }}>{b}</li>)}
                  </ul>
                ) : exp.description ? <p style={{ fontSize: "0.88em", color: "#374151", margin: "6px 0 0" }}>{exp.description}</p> : null}
              </div>
            ))}
          </div>
        );
        if (sectionId === "education" && education.length > 0) return (
          <div key="education" style={{ marginBottom: "24px" }}>
            {sectionHeader("Education")}
            {education.map((ed) => (
              <div key={ed.id} style={{ marginBottom: "14px", display: "flex", justifyContent: "space-between" }}>
                <div>
                  <strong style={{ color: "#1a1a1a" }}>{ed.institution}</strong>
                  <div style={{ fontSize: "0.88em", color: "#555" }}>{ed.degree}{ed.field ? `, ${ed.field}` : ""}{ed.gpa ? ` — GPA: ${ed.gpa}` : ""}</div>
                  {ed.description && <p style={{ fontSize: "0.85em", color: "#374151", margin: "3px 0 0" }}>{ed.description}</p>}
                </div>
                <em style={{ color: "#888", fontSize: "0.82em", whiteSpace: "nowrap" }}>{ed.startDate}{ed.endDate ? ` – ${ed.endDate}` : ""}</em>
              </div>
            ))}
          </div>
        );
        if (sectionId === "skills" && skills.length > 0) return (
          <div key="skills" style={{ marginBottom: "24px" }}>
            {sectionHeader("Skills")}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
              {skills.map((sk) => (
                <div key={sk.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.88em" }}>{sk.name}</span>
                  <span style={{ display: "flex", gap: "3px" }}>
                    {[1,2,3,4].map((d) => (
                      <span key={d} style={{ width: "8px", height: "8px", borderRadius: "50%", background: d <= SKILL_DOTS[sk.level] ? accent : "#ddd" }} />
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
        if (sectionId === "projects" && projects.length > 0) return (
          <div key="projects" style={{ marginBottom: "24px" }}>
            {sectionHeader("Projects")}
            {projects.map((p) => (
              <div key={p.id} style={{ marginBottom: "12px" }}>
                <div style={{ display: "flex", gap: "8px" }}>
                  <strong style={{ fontSize: "0.92em" }}>{p.name}</strong>
                  {p.url && <span style={{ color: accent, fontSize: "0.82em" }}>{p.url}</span>}
                </div>
                {p.technologies.length > 0 && <div style={{ fontSize: "0.8em", color: "#888", fontStyle: "italic" }}>{p.technologies.join(", ")}</div>}
                {p.description && <p style={{ fontSize: "0.87em", color: "#374151", margin: "4px 0 0" }}>{p.description}</p>}
              </div>
            ))}
          </div>
        );
        if (sectionId === "certifications" && certifications.length > 0) return (
          <div key="certifications" style={{ marginBottom: "24px" }}>
            {sectionHeader("Certifications")}
            {certifications.map((c) => (
              <div key={c.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.88em" }}>
                <span><strong>{c.name}</strong>{c.issuer && ` — ${c.issuer}`}</span>
                <em style={{ color: "#888" }}>{c.date}</em>
              </div>
            ))}
          </div>
        );
        if (sectionId === "achievements" && achievements.length > 0) return (
          <div key="achievements" style={{ marginBottom: "24px" }}>
            {sectionHeader("Achievements")}
            {achievements.map((a) => (
              <div key={a.id} style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong style={{ fontSize: "0.92em" }}>{a.title}</strong>
                  {a.date && <em style={{ color: "#888", fontSize: "0.82em" }}>{a.date}</em>}
                </div>
                {a.description && <p style={{ fontSize: "0.85em", color: "#374151", margin: "3px 0 0" }}>{a.description}</p>}
              </div>
            ))}
          </div>
        );
        if (sectionId === "languages" && languages.length > 0) return (
          <div key="languages" style={{ marginBottom: "24px" }}>
            {sectionHeader("Languages")}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              {languages.map((l) => <span key={l.id} style={{ fontSize: "0.88em" }}><strong>{l.name}</strong> — {LANGUAGE_LABELS[l.level]}</span>)}
            </div>
          </div>
        );
        const customSection = customSections.find((cs) => cs.id === sectionId);
        if (customSection && customSection.items.length > 0) return (
          <div key={customSection.id} style={{ marginBottom: "24px" }}>
            {sectionHeader(customSection.title)}
            {customSection.items.map((item) => (
              <div key={item.id} style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div><strong style={{ fontSize: "0.92em" }}>{item.title}</strong>{item.subtitle && ` — ${item.subtitle}`}</div>
                  {item.date && <em style={{ color: "#888", fontSize: "0.82em" }}>{item.date}</em>}
                </div>
                {item.description && <p style={{ fontSize: "0.85em", color: "#374151", margin: "3px 0 0" }}>{item.description}</p>}
              </div>
            ))}
          </div>
        );
        return null;
      })}
    </div>
  );
}
