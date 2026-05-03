import { CVData } from "../../types/cv";
import { LANGUAGE_LABELS, SKILL_DOTS } from "./template-utils";

interface Props { cv: CVData; }

export default function EmeraldTemplate({ cv }: Props) {
  const { personal, skills, experience, education, projects, certifications, achievements, languages, customSections, sectionOrder, accentColor, fontSize } = cv;
  const accent = accentColor || "#059669";
  const visibleSections = sectionOrder.filter((s) => s.visible).map((s) => s.id);

  return (
    <div className="cv-preview" style={{ fontFamily: "'Inter', sans-serif", fontSize: `${fontSize}px`, background: "white", color: "#1a1a1a", padding: "0", minHeight: "297mm" }}>
      {/* Header with diagonal split */}
      <div style={{ background: `linear-gradient(135deg, ${accent} 60%, ${accent}dd 100%)`, padding: "36px 40px 28px", color: "white", position: "relative" }}>
        <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
          {personal.photo && (
            <img src={personal.photo} alt="" style={{ width: "85px", height: "85px", borderRadius: "8px", objectFit: "cover", border: "3px solid rgba(255,255,255,0.3)" }} />
          )}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: "2.2em", fontWeight: 800, margin: "0 0 4px", letterSpacing: "-0.5px" }}>{personal.fullName || "Your Name"}</h1>
            {personal.jobTitle && <p style={{ fontSize: "1em", margin: "0 0 14px", opacity: 0.85 }}>{personal.jobTitle}</p>}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", fontSize: "0.8em", opacity: 0.8 }}>
              {personal.email && <span>✉ {personal.email}</span>}
              {personal.phone && <span>📞 {personal.phone}</span>}
              {personal.location && <span>📍 {personal.location}</span>}
              {personal.website && <span>🌐 {personal.website}</span>}
              {personal.linkedin && <span>💼 {personal.linkedin}</span>}
              {personal.github && <span>🐙 {personal.github}</span>}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "28px 40px" }}>
        {personal.summary && (
          <div style={{ marginBottom: "28px", padding: "16px 20px", background: `${accent}10`, borderRadius: "8px", borderLeft: `4px solid ${accent}` }}>
            <p style={{ fontSize: "0.9em", lineHeight: 1.75, color: "#374151", margin: 0 }}>{personal.summary}</p>
          </div>
        )}

        {visibleSections.map((sectionId) => {
          const SH = ({ title }: { title: string }) => (
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
              <div style={{ width: "4px", height: "20px", background: accent, borderRadius: "2px" }} />
              <h2 style={{ fontSize: "0.8em", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: "#1a1a1a", margin: 0 }}>{title}</h2>
            </div>
          );
          if (sectionId === "experience" && experience.length > 0) return (
            <div key="experience" style={{ marginBottom: "28px" }}>
              <SH title="Experience" />
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: "18px", paddingLeft: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div><strong style={{ color: "#0f172a" }}>{exp.role}</strong><span style={{ color: "#64748b" }}> @ {exp.company}</span></div>
                    <span style={{ background: `${accent}20`, color: accent, fontSize: "0.78em", padding: "1px 8px", borderRadius: "100px", whiteSpace: "nowrap" }}>
                      {exp.startDate}{exp.current ? "–Now" : exp.endDate ? `–${exp.endDate}` : ""}
                    </span>
                  </div>
                  {exp.location && <div style={{ fontSize: "0.82em", color: "#94a3b8" }}>{exp.location}</div>}
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
            <div key="education" style={{ marginBottom: "28px" }}>
              <SH title="Education" />
              {education.map((ed) => (
                <div key={ed.id} style={{ marginBottom: "14px", paddingLeft: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong>{ed.institution}</strong>
                    <span style={{ background: `${accent}20`, color: accent, fontSize: "0.78em", padding: "1px 8px", borderRadius: "100px" }}>
                      {ed.startDate}{ed.endDate ? `–${ed.endDate}` : ""}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.88em", color: "#64748b" }}>{ed.degree}{ed.field ? `, ${ed.field}` : ""}{ed.gpa ? ` · ${ed.gpa}` : ""}</div>
                </div>
              ))}
            </div>
          );
          if (sectionId === "skills" && skills.length > 0) return (
            <div key="skills" style={{ marginBottom: "28px" }}>
              <SH title="Skills" />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", paddingLeft: "14px" }}>
                {skills.map((sk) => (
                  <span key={sk.id} style={{ background: `${accent}15`, border: `1px solid ${accent}30`, color: "#1a1a1a", borderRadius: "6px", padding: "4px 12px", fontSize: "0.85em" }}>
                    {sk.name}
                  </span>
                ))}
              </div>
            </div>
          );
          if (sectionId === "projects" && projects.length > 0) return (
            <div key="projects" style={{ marginBottom: "28px" }}>
              <SH title="Projects" />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", paddingLeft: "14px" }}>
                {projects.map((p) => (
                  <div key={p.id} style={{ padding: "12px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                    <div><strong style={{ fontSize: "0.9em" }}>{p.name}</strong></div>
                    {p.technologies.length > 0 && <div style={{ fontSize: "0.78em", color: accent, marginBottom: "4px" }}>{p.technologies.join(" · ")}</div>}
                    {p.description && <p style={{ fontSize: "0.82em", color: "#374151", margin: 0 }}>{p.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          );
          if (sectionId === "certifications" && certifications.length > 0) return (
            <div key="certifications" style={{ marginBottom: "28px" }}>
              <SH title="Certifications" />
              {certifications.map((c) => (
                <div key={c.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.88em", paddingLeft: "14px" }}>
                  <span><strong>{c.name}</strong>{c.issuer && ` · ${c.issuer}`}</span>
                  <span style={{ color: "#94a3b8" }}>{c.date}</span>
                </div>
              ))}
            </div>
          );
          if (sectionId === "achievements" && achievements.length > 0) return (
            <div key="achievements" style={{ marginBottom: "28px" }}>
              <SH title="Achievements" />
              {achievements.map((a) => (
                <div key={a.id} style={{ marginBottom: "10px", paddingLeft: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong style={{ fontSize: "0.92em" }}>{a.title}</strong>
                    {a.date && <span style={{ color: "#94a3b8", fontSize: "0.82em" }}>{a.date}</span>}
                  </div>
                  {a.description && <p style={{ fontSize: "0.85em", color: "#374151", margin: "3px 0 0" }}>{a.description}</p>}
                </div>
              ))}
            </div>
          );
          if (sectionId === "languages" && languages.length > 0) return (
            <div key="languages" style={{ marginBottom: "28px" }}>
              <SH title="Languages" />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", paddingLeft: "14px" }}>
                {languages.map((l) => (
                  <span key={l.id} style={{ fontSize: "0.88em" }}>
                    <strong>{l.name}</strong> <span style={{ color: "#94a3b8" }}>({LANGUAGE_LABELS[l.level]})</span>
                  </span>
                ))}
              </div>
            </div>
          );
          const customSection = customSections.find((cs) => cs.id === sectionId);
          if (customSection && customSection.items.length > 0) return (
            <div key={customSection.id} style={{ marginBottom: "28px" }}>
              <SH title={customSection.title} />
              {customSection.items.map((item) => (
                <div key={item.id} style={{ marginBottom: "10px", paddingLeft: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div><strong style={{ fontSize: "0.9em" }}>{item.title}</strong>{item.subtitle && <span style={{ color: "#64748b" }}> · {item.subtitle}</span>}</div>
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
  );
}
