export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";
export type LanguageLevel = "basic" | "conversational" | "professional" | "fluent" | "native";

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  photo: string;
  jobTitle: string;
  summary: string;
}

export interface Skill {
  id: string;
  name: string;
  level: SkillLevel;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  bullets: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  url: string;
  description: string;
  technologies: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
}

export interface Language {
  id: string;
  name: string;
  level: LanguageLevel;
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomItem[];
}

export interface CustomItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
}

export type SectionId =
  | "personal"
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "certifications"
  | "achievements"
  | "languages"
  | string;

export interface Section {
  id: SectionId;
  label: string;
  visible: boolean;
}

export type TemplateId =
  | "modern"
  | "classic"
  | "minimal"
  | "creative"
  | "executive"
  | "slate"
  | "emerald";

export interface CVData {
  personal: PersonalInfo;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
  achievements: Achievement[];
  languages: Language[];
  customSections: CustomSection[];
  sectionOrder: Section[];
  templateId: TemplateId;
  accentColor: string;
  fontSize: number;
}

export const DEFAULT_CV: CVData = {
  personal: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    photo: "",
    jobTitle: "",
    summary: "",
  },
  skills: [],
  experience: [],
  education: [],
  projects: [],
  certifications: [],
  achievements: [],
  languages: [],
  customSections: [],
  sectionOrder: [
    { id: "experience", label: "Experience", visible: true },
    { id: "education", label: "Education", visible: true },
    { id: "skills", label: "Skills", visible: true },
    { id: "projects", label: "Projects", visible: true },
    { id: "certifications", label: "Certifications", visible: true },
    { id: "achievements", label: "Achievements", visible: true },
    { id: "languages", label: "Languages", visible: true },
  ],
  templateId: "modern",
  accentColor: "#2563eb",
  fontSize: 14,
};
