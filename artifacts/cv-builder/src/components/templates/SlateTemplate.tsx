import { CVData } from "../../types/cv";
import { LANGUAGE_LABELS } from "./template-utils";

interface Props { cv: CVData; }

export default function SlateTemplate({ cv }: Props) {
  const { personal, skills, experience, education, projects, certifications, achievements, languages, customSections, sectionOrder, accentColor, fontSize } = cv;
  const accent = accentColor || "#0ea5e9";
  const visibleSections = sectionOrder.filter((s) => s.visible).map((s) => s.id);

  return (
    <div className="cv-preview" style={{ fontFamily: "'Inter', sans-serif", fontSize: `${fontSize}px`, background: "white", color: "#1e293b", minHeight: "297mm", display: "flex" }}>
      {/* Left dark column */}
      <div style={{ width: "200px", background: "#1e293b", color: "white", padding: "32px 20px", flexShrink: 0 }}>
        {personal.photo && (
          <img src={personal.photo} alt="" style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover", marginBottom: "16px", border: `2px solid ${accent}` }} />
        )}
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "1.2em", fontWeight: 700, margin: "0 0 4px", color: "white" }}>{personal.fullName || "Your Name"}</h1>
          {personal.jobTitle && <p style={{ fontSize: "0.8em", color: accent, margin: 0 }}>{personal.jobTitle}</p>}
        </div>
        <div style={{ marginBottom: "24px", fontSize: "0.75em", lineHeight: 2, color: "#94a3b8" }}>
          {personal.email && <div>{personal.email}</div>}
          {personal.phone && <div>{personal.phone}</div>}
          {personal.location && <div>{personal.location}</div>}
          {personal.website && <div>{personal.website}</div>}
          {personal.linkedin && <div>{personal.linkedin}</div>}
          {personal.github && <div>{personal.github}</div>}
        </div>
        {skills.length > 0 && (
          <div style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "0.65em", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: accent, marginBottom: "10px" }}>Skills</h3>
            {skills.map((sk) => (
              <div key={sk.id} style={{ marginBottom: "6px" }}>
                <div style={{ fontSize: "0.8em", color: "#cbd5e1" }}>{sk.name}</div>
              </div>
            ))}
          </div>
        )}
        {languages.length > 0 && (
          <div style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "0.65em", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: accent, marginBottom: "10px" }}>Languages</h3>
            {languages.map((l) => (
              <div key={l.id} style={{ fontSize: "0.8em", color: "#cbd5e1", marginBottom: "4px" }}>
                {l.name} <span style={{ color: "#64748b" }}>({LANGUAGE_LABELS[l.level]})</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right main content */}
      <div style={{ flex: 1, padding: "32px 32px" }}>
        {personal.summary && (
          <div style={{ marginBottom: "28px" }}>
            <h2 style={{ fontSize: "0.7em", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: accent, marginBottom: "8px" }}>Profile</h2>
            <p style={{ fontSize: "0.9em", lineHeight: 1.75, color: "#374151" }}>{personal.summary}</p>
          </div>
        )}
        {visibleSections.filter(s => !["skills","languages"].includes(s)).map((sectionId) => {
          const SH = ({ title }: { title: string }) => (
            <h2 style={{ fontSize: "0.7em", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: accent, marginBottom: "12px", paddingBottom: "6px", borderBottom: `1px solid #e2e8f0` }}>{title}</h2>
          );
          if (sectionId === "experience" && experience.length > 0) return (
            <div key="experience" style={{ marginBottom: "24px" }}>
              <SH title="Experience" />
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: "18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div><strong>{exp.role}</strong><span style={{ color: "#64748b" }}> · {exp.company}</span></div>
                    <span style={{ color: "#94a3b8", fontSize: "0.8em" }}>{exp.startDate}{exp.current ? "–Present" : exp.endDate ? `–${exp.endDate}` : ""}</span>
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
            <div key="education" style={{ marginBottom: "24px" }}>
              <SH title="Education" />
              {education.map((ed) => (
                <div key={ed.id} style={{ marginBottom: "14px", display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <strong>{ed.institution}</strong>
                    <div style={{ fontSize: "0.88em", color: "#64748b" }}>{ed.degree}{ed.field ? `, ${ed.field}` : ""}{ed.gpa ? ` · ${ed.gpa}` : ""}</div>
                  </div>
                  <span style={{ color: "#94a3b8", fontSize: "0.8em" }}>{ed.startDate}{ed.endDate ? `–${ed.endDate}` : ""}</span>
                </div>
              ))}
            </div>
          );
          if (sectionId === "projects" && projects.length > 0) return (
            <div key="projects" style={{ marginBottom: "24px" }}>
              <SH title="Projects" />
              {projects.map((p) => (
                <div key={p.id} style={{ marginBottom: "14px" }}>
                  <div><strong>{p.name}</strong>{p.url && <span style={{ color: accent, fontSize: "0.82em", marginLeft: "8px" }}>{p.url}</span>}</div>
                  {p.technologies.length > 0 && <div style={{ fontSize: "0.8em", color: "#94a3b8" }}>{p.technologies.join(" · ")}</div>}
                  {p.description && <p style={{ fontSize: "0.87em", color: "#374151", margin: "4px 0 0" }}>{p.description}</p>}
                </div>
              ))}
            </div>
          );
          if (sectionId === "certifications" && certifications.length > 0) return (
            <div key="certifications" style={{ marginBottom: "24px" }}>
              <SH title="Certifications" />
              {certifications.map((c) => (
                <div key={c.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.88em" }}>
                  <span><strong>{c.name}</strong>{c.issuer && ` · ${c.issuer}`}</span>
                  <span style={{ color: "#94a3b8" }}>{c.date}</span>
                </div>
              ))}
            </div>
          );
          if (sectionId === "achievements" && achievements.length > 0) return (
            <div key="achievements" style={{ marginBottom: "24px" }}>
              <SH title="Achievements" />
              {achievements.map((a) => (
                <div key={a.id} style={{ marginBottom: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong style={{ fontSize: "0.92em" }}>{a.title}</strong>
                    {a.date && <span style={{ color: "#94a3b8", fontSize: "0.82em" }}>{a.date}</span>}
                  </div>
                  {a.description && <p style={{ fontSize: "0.85em", color: "#374151", margin: "3px 0 0" }}>{a.description}</p>}
                </div>
              ))}
            </div>
          );
          const customSection = customSections.find((cs) => cs.id === sectionId);
          if (customSection && customSection.items.length > 0) return (
            <div key={customSection.id} style={{ marginBottom: "24px" }}>
              <SH title={customSection.title} />
              {customSection.items.map((item) => (
                <div key={item.id} style={{ marginBottom: "10px" }}>
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
