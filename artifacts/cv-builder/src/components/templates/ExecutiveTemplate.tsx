import { CVData } from "../../types/cv";
import { LANGUAGE_LABELS, SKILL_DOTS } from "./template-utils";

interface Props { cv: CVData; }

export default function ExecutiveTemplate({ cv }: Props) {
  const { personal, skills, experience, education, projects, certifications, achievements, languages, customSections, sectionOrder, accentColor, fontSize } = cv;
  const accent = accentColor || "#0f4c75";
  const visibleSections = sectionOrder.filter((s) => s.visible).map((s) => s.id);

  return (
    <div className="cv-preview" style={{ fontFamily: "'Georgia', serif", fontSize: `${fontSize}px`, background: "white", color: "#1a1a1a", minHeight: "297mm" }}>
      {/* Top bar */}
      <div style={{ background: accent, padding: "32px 40px", color: "white" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          {personal.photo && (
            <img src={personal.photo} alt="Photo" style={{ width: "100px", height: "100px", borderRadius: "4px", objectFit: "cover", border: "2px solid rgba(255,255,255,0.3)" }} />
          )}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: "2.4em", fontWeight: 700, margin: 0, letterSpacing: "0.5px" }}>
              {personal.fullName || "Your Name"}
            </h1>
            {personal.jobTitle && <p style={{ fontSize: "1em", margin: "6px 0 0", opacity: 0.8, fontStyle: "italic" }}>{personal.jobTitle}</p>}
          </div>
          <div style={{ textAlign: "right", fontSize: "0.8em", opacity: 0.85, lineHeight: 2 }}>
            {personal.email && <div>{personal.email}</div>}
            {personal.phone && <div>{personal.phone}</div>}
            {personal.location && <div>{personal.location}</div>}
            {personal.website && <div>{personal.website}</div>}
            {personal.linkedin && <div>{personal.linkedin}</div>}
          </div>
        </div>
      </div>

      <div style={{ padding: "32px 40px" }}>
        {personal.summary && (
          <div style={{ marginBottom: "28px", padding: "20px", background: `${accent}08`, borderLeft: `4px solid ${accent}` }}>
            <p style={{ fontSize: "0.95em", lineHeight: 1.8, color: "#374151", margin: 0, fontStyle: "italic" }}>{personal.summary}</p>
          </div>
        )}

        {visibleSections.map((sectionId) => {
          const SH = ({ title }: { title: string }) => (
            <div style={{ marginBottom: "14px", display: "flex", alignItems: "center", gap: "12px" }}>
              <h2 style={{ fontSize: "0.85em", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: accent, margin: 0 }}>{title}</h2>
              <div style={{ flex: 1, height: "1px", background: `${accent}30` }} />
            </div>
          );
          if (sectionId === "experience" && experience.length > 0) return (
            <div key="experience" style={{ marginBottom: "28px" }}>
              <SH title="Professional Experience" />
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <strong style={{ fontSize: "1em", color: "#0f172a" }}>{exp.role}</strong>
                      {exp.company && <span style={{ color: "#64748b" }}> | {exp.company}</span>}
                      {exp.location && <span style={{ color: "#94a3b8", fontSize: "0.85em" }}> | {exp.location}</span>}
                    </div>
                    <span style={{ color: "#94a3b8", fontSize: "0.82em", fontStyle: "italic" }}>
                      {exp.startDate}{exp.startDate && (exp.current ? " – Present" : exp.endDate ? ` – ${exp.endDate}` : "")}
                    </span>
                  </div>
                  {exp.bullets.length > 0 ? (
                    <ul style={{ margin: "8px 0 0 20px", padding: 0 }}>
                      {exp.bullets.filter(Boolean).map((b, i) => <li key={i} style={{ fontSize: "0.9em", color: "#374151", marginBottom: "4px", lineHeight: 1.65 }}>{b}</li>)}
                    </ul>
                  ) : exp.description ? <p style={{ fontSize: "0.9em", color: "#374151", margin: "8px 0 0", lineHeight: 1.65 }}>{exp.description}</p> : null}
                </div>
              ))}
            </div>
          );
          if (sectionId === "education" && education.length > 0) return (
            <div key="education" style={{ marginBottom: "28px" }}>
              <SH title="Education" />
              {education.map((ed) => (
                <div key={ed.id} style={{ marginBottom: "14px", display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <strong style={{ color: "#0f172a" }}>{ed.institution}</strong>
                    <div style={{ fontSize: "0.9em", color: "#64748b" }}>{ed.degree}{ed.field ? `, ${ed.field}` : ""}{ed.gpa ? ` · GPA: ${ed.gpa}` : ""}</div>
                    {ed.description && <p style={{ fontSize: "0.85em", color: "#374151", margin: "3px 0 0" }}>{ed.description}</p>}
                  </div>
                  <em style={{ color: "#94a3b8", fontSize: "0.82em" }}>{ed.startDate}{ed.endDate ? ` – ${ed.endDate}` : ""}</em>
                </div>
              ))}
            </div>
          );
          if (sectionId === "skills" && skills.length > 0) return (
            <div key="skills" style={{ marginBottom: "28px" }}>
              <SH title="Core Competencies" />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                {skills.map((sk) => (
                  <div key={sk.id} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ flex: 1, fontSize: "0.88em", color: "#374151" }}>{sk.name}</div>
                    <div style={{ display: "flex", gap: "2px" }}>
                      {[1,2,3,4].map((d) => <span key={d} style={{ width: "7px", height: "7px", borderRadius: "50%", background: d <= SKILL_DOTS[sk.level] ? accent : "#e2e8f0" }} />)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
          if (sectionId === "projects" && projects.length > 0) return (
            <div key="projects" style={{ marginBottom: "28px" }}>
              <SH title="Key Projects" />
              {projects.map((p) => (
                <div key={p.id} style={{ marginBottom: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong style={{ fontSize: "0.92em" }}>{p.name}</strong>
                    {p.url && <span style={{ color: accent, fontSize: "0.82em" }}>{p.url}</span>}
                  </div>
                  {p.technologies.length > 0 && <div style={{ fontSize: "0.8em", color: "#94a3b8", fontStyle: "italic" }}>{p.technologies.join(", ")}</div>}
                  {p.description && <p style={{ fontSize: "0.88em", color: "#374151", margin: "4px 0 0" }}>{p.description}</p>}
                </div>
              ))}
            </div>
          );
          if (sectionId === "certifications" && certifications.length > 0) return (
            <div key="certifications" style={{ marginBottom: "28px" }}>
              <SH title="Certifications" />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
                {certifications.map((c) => (
                  <div key={c.id} style={{ fontSize: "0.88em" }}>
                    <strong>{c.name}</strong>{c.issuer && <span style={{ color: "#64748b" }}> · {c.issuer}</span>}
                    {c.date && <span style={{ color: "#94a3b8" }}> · {c.date}</span>}
                  </div>
                ))}
              </div>
            </div>
          );
          if (sectionId === "achievements" && achievements.length > 0) return (
            <div key="achievements" style={{ marginBottom: "28px" }}>
              <SH title="Achievements & Awards" />
              {achievements.map((a) => (
                <div key={a.id} style={{ marginBottom: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong style={{ fontSize: "0.92em" }}>{a.title}</strong>
                    {a.date && <em style={{ color: "#94a3b8", fontSize: "0.82em" }}>{a.date}</em>}
                  </div>
                  {a.description && <p style={{ fontSize: "0.85em", color: "#374151", margin: "3px 0 0" }}>{a.description}</p>}
                </div>
              ))}
            </div>
          );
          if (sectionId === "languages" && languages.length > 0) return (
            <div key="languages" style={{ marginBottom: "28px" }}>
              <SH title="Languages" />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {languages.map((l) => <span key={l.id} style={{ fontSize: "0.88em" }}><strong>{l.name}</strong> · {LANGUAGE_LABELS[l.level]}</span>)}
              </div>
            </div>
          );
          const customSection = customSections.find((cs) => cs.id === sectionId);
          if (customSection && customSection.items.length > 0) return (
            <div key={customSection.id} style={{ marginBottom: "28px" }}>
              <SH title={customSection.title} />
              {customSection.items.map((item) => (
                <div key={item.id} style={{ marginBottom: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div><strong style={{ fontSize: "0.92em" }}>{item.title}</strong>{item.subtitle && <span style={{ color: "#64748b", fontSize: "0.85em" }}> · {item.subtitle}</span>}</div>
                    {item.date && <em style={{ color: "#94a3b8", fontSize: "0.82em" }}>{item.date}</em>}
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
  );
}
