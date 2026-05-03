import { CVData } from "../../types/cv";
import { LANGUAGE_LABELS, SKILL_DOTS } from "./template-utils";

interface Props { cv: CVData; }

export default function CreativeTemplate({ cv }: Props) {
  const { personal, skills, experience, education, projects, certifications, achievements, languages, customSections, sectionOrder, accentColor, fontSize } = cv;
  const accent = accentColor || "#7c3aed";
  const visibleSections = sectionOrder.filter((s) => s.visible).map((s) => s.id);

  const leftSections = ["skills", "languages", "certifications", "achievements"];
  const rightSections = visibleSections.filter((s) => !leftSections.includes(s));
  const leftVisible = visibleSections.filter((s) => leftSections.includes(s));

  return (
    <div className="cv-preview" style={{ fontFamily: "'Inter', sans-serif", fontSize: `${fontSize}px`, background: "white", color: "#1a1a1a", minHeight: "297mm", display: "flex", flexDirection: "column" }}>
      {/* Header strip */}
      <div style={{ background: accent, color: "white", padding: "36px 40px", display: "flex", alignItems: "center", gap: "24px" }}>
        {personal.photo && (
          <img src={personal.photo} alt="Photo" style={{ width: "90px", height: "90px", borderRadius: "50%", objectFit: "cover", border: "3px solid rgba(255,255,255,0.4)" }} />
        )}
        <div>
          <h1 style={{ fontSize: "2.2em", fontWeight: 700, margin: 0, letterSpacing: "-0.5px" }}>
            {personal.fullName || "Your Name"}
          </h1>
          {personal.jobTitle && <p style={{ fontSize: "1em", margin: "4px 0 12px", opacity: 0.85 }}>{personal.jobTitle}</p>}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", fontSize: "0.8em", opacity: 0.8 }}>
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
            {personal.website && <span>{personal.website}</span>}
            {personal.linkedin && <span>{personal.linkedin}</span>}
            {personal.github && <span>{personal.github}</span>}
          </div>
        </div>
      </div>

      {/* Body: two columns */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* Left sidebar */}
        <div style={{ width: "220px", flexShrink: 0, background: "#f8f7ff", padding: "28px 20px" }}>
          {personal.summary && (
            <div style={{ marginBottom: "24px" }}>
              <h3 style={{ fontSize: "0.7em", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: accent, marginBottom: "8px" }}>About</h3>
              <p style={{ fontSize: "0.82em", lineHeight: 1.7, color: "#374151" }}>{personal.summary}</p>
            </div>
          )}
          {leftVisible.map((sectionId) => {
            if (sectionId === "skills" && skills.length > 0) return (
              <div key="skills" style={{ marginBottom: "24px" }}>
                <h3 style={{ fontSize: "0.7em", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: accent, marginBottom: "10px" }}>Skills</h3>
                {skills.map((sk) => (
                  <div key={sk.id} style={{ marginBottom: "8px" }}>
                    <div style={{ fontSize: "0.85em", color: "#1a1a1a", marginBottom: "3px" }}>{sk.name}</div>
                    <div style={{ display: "flex", gap: "3px" }}>
                      {[1,2,3,4].map((d) => (
                        <div key={d} style={{ height: "4px", flex: 1, borderRadius: "2px", background: d <= SKILL_DOTS[sk.level] ? accent : "#e2e8f0" }} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            );
            if (sectionId === "languages" && languages.length > 0) return (
              <div key="languages" style={{ marginBottom: "24px" }}>
                <h3 style={{ fontSize: "0.7em", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: accent, marginBottom: "10px" }}>Languages</h3>
                {languages.map((l) => (
                  <div key={l.id} style={{ marginBottom: "6px", fontSize: "0.85em" }}>
                    <strong>{l.name}</strong><span style={{ color: "#94a3b8" }}> · {LANGUAGE_LABELS[l.level]}</span>
                  </div>
                ))}
              </div>
            );
            if (sectionId === "certifications" && certifications.length > 0) return (
              <div key="certifications" style={{ marginBottom: "24px" }}>
                <h3 style={{ fontSize: "0.7em", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: accent, marginBottom: "10px" }}>Certifications</h3>
                {certifications.map((c) => (
                  <div key={c.id} style={{ marginBottom: "8px", fontSize: "0.82em" }}>
                    <div style={{ fontWeight: 600 }}>{c.name}</div>
                    {c.issuer && <div style={{ color: "#64748b" }}>{c.issuer}</div>}
                    {c.date && <div style={{ color: "#94a3b8" }}>{c.date}</div>}
                  </div>
                ))}
              </div>
            );
            if (sectionId === "achievements" && achievements.length > 0) return (
              <div key="achievements" style={{ marginBottom: "24px" }}>
                <h3 style={{ fontSize: "0.7em", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: accent, marginBottom: "10px" }}>Achievements</h3>
                {achievements.map((a) => (
                  <div key={a.id} style={{ marginBottom: "8px", fontSize: "0.82em" }}>
                    <div style={{ fontWeight: 600 }}>{a.title}</div>
                    {a.description && <p style={{ color: "#374151", margin: "2px 0 0" }}>{a.description}</p>}
                  </div>
                ))}
              </div>
            );
            return null;
          })}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: "28px 32px" }}>
          {rightSections.map((sectionId) => {
            const SH = ({ title }: { title: string }) => (
              <h2 style={{ fontSize: "0.75em", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: accent, marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ display: "block", width: "20px", height: "2px", background: accent }} />{title}
              </h2>
            );
            if (sectionId === "experience" && experience.length > 0) return (
              <div key="experience" style={{ marginBottom: "24px" }}>
                <SH title="Experience" />
                {experience.map((exp) => (
                  <div key={exp.id} style={{ marginBottom: "18px", paddingLeft: "12px", borderLeft: `2px solid ${accent}30` }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div><strong style={{ color: "#0f172a" }}>{exp.role}</strong><span style={{ color: "#64748b" }}> · {exp.company}</span></div>
                      <span style={{ color: "#94a3b8", fontSize: "0.8em" }}>{exp.startDate}{exp.startDate && (exp.current ? "–Present" : exp.endDate ? `–${exp.endDate}` : "")}</span>
                    </div>
                    {exp.bullets.length > 0 ? (
                      <ul style={{ margin: "6px 0 0 16px", padding: 0 }}>
                        {exp.bullets.filter(Boolean).map((b, i) => <li key={i} style={{ fontSize: "0.87em", color: "#374151", marginBottom: "3px" }}>{b}</li>)}
                      </ul>
                    ) : exp.description ? <p style={{ fontSize: "0.87em", color: "#374151", margin: "6px 0 0" }}>{exp.description}</p> : null}
                  </div>
                ))}
              </div>
            );
            if (sectionId === "education" && education.length > 0) return (
              <div key="education" style={{ marginBottom: "24px" }}>
                <SH title="Education" />
                {education.map((ed) => (
                  <div key={ed.id} style={{ marginBottom: "14px", paddingLeft: "12px", borderLeft: `2px solid ${accent}30` }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <strong>{ed.institution}</strong>
                      <span style={{ color: "#94a3b8", fontSize: "0.8em" }}>{ed.startDate}{ed.endDate ? `–${ed.endDate}` : ""}</span>
                    </div>
                    <div style={{ fontSize: "0.88em", color: "#64748b" }}>{ed.degree}{ed.field ? `, ${ed.field}` : ""}{ed.gpa ? ` · ${ed.gpa}` : ""}</div>
                  </div>
                ))}
              </div>
            );
            if (sectionId === "projects" && projects.length > 0) return (
              <div key="projects" style={{ marginBottom: "24px" }}>
                <SH title="Projects" />
                {projects.map((p) => (
                  <div key={p.id} style={{ marginBottom: "14px", paddingLeft: "12px", borderLeft: `2px solid ${accent}30` }}>
                    <div style={{ fontWeight: 600 }}>{p.name}{p.url && <span style={{ color: accent, fontSize: "0.82em", marginLeft: "8px" }}>{p.url}</span>}</div>
                    {p.technologies.length > 0 && <div style={{ fontSize: "0.8em", color: "#94a3b8" }}>{p.technologies.join(" · ")}</div>}
                    {p.description && <p style={{ fontSize: "0.87em", color: "#374151", margin: "4px 0 0" }}>{p.description}</p>}
                  </div>
                ))}
              </div>
            );
            const customSection = customSections.find((cs) => cs.id === sectionId);
            if (customSection && customSection.items.length > 0) return (
              <div key={customSection.id} style={{ marginBottom: "24px" }}>
                <SH title={customSection.title} />
                {customSection.items.map((item) => (
                  <div key={item.id} style={{ marginBottom: "12px", paddingLeft: "12px", borderLeft: `2px solid ${accent}30` }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div><strong style={{ fontSize: "0.9em" }}>{item.title}</strong>{item.subtitle && <span style={{ color: "#64748b", fontSize: "0.85em" }}> · {item.subtitle}</span>}</div>
                      {item.date && <span style={{ color: "#94a3b8", fontSize: "0.8em" }}>{item.date}</span>}
                    </div>
                    {item.description && <p style={{ fontSize: "0.85em", color: "#374151", margin: "3px 0 0" }}>{item.description}</p>}
                  </div>
                ))}
              </div>
            );
            return null;
          })}
        </div>
      </div>
    </div>
  );
}
