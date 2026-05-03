import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CVData, DEFAULT_CV, Skill, Experience, Education, Project, Certification, Achievement, Language, CustomSection, Section, TemplateId } from "../types/cv";
import { nanoid } from "nanoid";

interface CVStore {
  cv: CVData;
  updatePersonal: (field: string, value: string) => void;
  addSkill: () => void;
  updateSkill: (id: string, field: string, value: string) => void;
  removeSkill: (id: string) => void;
  addExperience: () => void;
  updateExperience: (id: string, field: string, value: string | boolean | string[]) => void;
  removeExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, field: string, value: string) => void;
  removeEducation: (id: string) => void;
  addProject: () => void;
  updateProject: (id: string, field: string, value: string | string[]) => void;
  removeProject: (id: string) => void;
  addCertification: () => void;
  updateCertification: (id: string, field: string, value: string) => void;
  removeCertification: (id: string) => void;
  addAchievement: () => void;
  updateAchievement: (id: string, field: string, value: string) => void;
  removeAchievement: (id: string) => void;
  addLanguage: () => void;
  updateLanguage: (id: string, field: string, value: string) => void;
  removeLanguage: (id: string) => void;
  addCustomSection: () => void;
  updateCustomSection: (id: string, field: string, value: string) => void;
  removeCustomSection: (id: string) => void;
  addCustomItem: (sectionId: string) => void;
  updateCustomItem: (sectionId: string, itemId: string, field: string, value: string) => void;
  removeCustomItem: (sectionId: string, itemId: string) => void;
  reorderSections: (sections: Section[]) => void;
  toggleSection: (id: string) => void;
  setTemplate: (templateId: TemplateId) => void;
  setAccentColor: (color: string) => void;
  setFontSize: (size: number) => void;
  resetCV: () => void;
}

export const useCVStore = create<CVStore>()(
  persist(
    (set) => ({
      cv: DEFAULT_CV,

      updatePersonal: (field, value) =>
        set((s) => ({ cv: { ...s.cv, personal: { ...s.cv.personal, [field]: value } } })),

      addSkill: () =>
        set((s) => ({
          cv: {
            ...s.cv,
            skills: [...s.cv.skills, { id: nanoid(), name: "", level: "intermediate" }],
          },
        })),
      updateSkill: (id, field, value) =>
        set((s) => ({
          cv: {
            ...s.cv,
            skills: s.cv.skills.map((sk) => (sk.id === id ? { ...sk, [field]: value } : sk)),
          },
        })),
      removeSkill: (id) =>
        set((s) => ({ cv: { ...s.cv, skills: s.cv.skills.filter((sk) => sk.id !== id) } })),

      addExperience: () =>
        set((s) => ({
          cv: {
            ...s.cv,
            experience: [
              ...s.cv.experience,
              { id: nanoid(), company: "", role: "", location: "", startDate: "", endDate: "", current: false, description: "", bullets: [] },
            ],
          },
        })),
      updateExperience: (id, field, value) =>
        set((s) => ({
          cv: {
            ...s.cv,
            experience: s.cv.experience.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
          },
        })),
      removeExperience: (id) =>
        set((s) => ({ cv: { ...s.cv, experience: s.cv.experience.filter((e) => e.id !== id) } })),

      addEducation: () =>
        set((s) => ({
          cv: {
            ...s.cv,
            education: [
              ...s.cv.education,
              { id: nanoid(), institution: "", degree: "", field: "", startDate: "", endDate: "", gpa: "", description: "" },
            ],
          },
        })),
      updateEducation: (id, field, value) =>
        set((s) => ({
          cv: {
            ...s.cv,
            education: s.cv.education.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
          },
        })),
      removeEducation: (id) =>
        set((s) => ({ cv: { ...s.cv, education: s.cv.education.filter((e) => e.id !== id) } })),

      addProject: () =>
        set((s) => ({
          cv: {
            ...s.cv,
            projects: [
              ...s.cv.projects,
              { id: nanoid(), name: "", url: "", description: "", technologies: [] },
            ],
          },
        })),
      updateProject: (id, field, value) =>
        set((s) => ({
          cv: {
            ...s.cv,
            projects: s.cv.projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
          },
        })),
      removeProject: (id) =>
        set((s) => ({ cv: { ...s.cv, projects: s.cv.projects.filter((p) => p.id !== id) } })),

      addCertification: () =>
        set((s) => ({
          cv: {
            ...s.cv,
            certifications: [
              ...s.cv.certifications,
              { id: nanoid(), name: "", issuer: "", date: "", url: "" },
            ],
          },
        })),
      updateCertification: (id, field, value) =>
        set((s) => ({
          cv: {
            ...s.cv,
            certifications: s.cv.certifications.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
          },
        })),
      removeCertification: (id) =>
        set((s) => ({ cv: { ...s.cv, certifications: s.cv.certifications.filter((c) => c.id !== id) } })),

      addAchievement: () =>
        set((s) => ({
          cv: {
            ...s.cv,
            achievements: [
              ...s.cv.achievements,
              { id: nanoid(), title: "", description: "", date: "" },
            ],
          },
        })),
      updateAchievement: (id, field, value) =>
        set((s) => ({
          cv: {
            ...s.cv,
            achievements: s.cv.achievements.map((a) => (a.id === id ? { ...a, [field]: value } : a)),
          },
        })),
      removeAchievement: (id) =>
        set((s) => ({ cv: { ...s.cv, achievements: s.cv.achievements.filter((a) => a.id !== id) } })),

      addLanguage: () =>
        set((s) => ({
          cv: { ...s.cv, languages: [...s.cv.languages, { id: nanoid(), name: "", level: "conversational" }] },
        })),
      updateLanguage: (id, field, value) =>
        set((s) => ({
          cv: {
            ...s.cv,
            languages: s.cv.languages.map((l) => (l.id === id ? { ...l, [field]: value } : l)),
          },
        })),
      removeLanguage: (id) =>
        set((s) => ({ cv: { ...s.cv, languages: s.cv.languages.filter((l) => l.id !== id) } })),

      addCustomSection: () =>
        set((s) => ({
          cv: {
            ...s.cv,
            customSections: [
              ...s.cv.customSections,
              { id: nanoid(), title: "Custom Section", items: [] },
            ],
          },
        })),
      updateCustomSection: (id, field, value) =>
        set((s) => ({
          cv: {
            ...s.cv,
            customSections: s.cv.customSections.map((cs) => (cs.id === id ? { ...cs, [field]: value } : cs)),
          },
        })),
      removeCustomSection: (id) =>
        set((s) => ({
          cv: { ...s.cv, customSections: s.cv.customSections.filter((cs) => cs.id !== id) },
        })),
      addCustomItem: (sectionId) =>
        set((s) => ({
          cv: {
            ...s.cv,
            customSections: s.cv.customSections.map((cs) =>
              cs.id === sectionId
                ? { ...cs, items: [...cs.items, { id: nanoid(), title: "", subtitle: "", date: "", description: "" }] }
                : cs
            ),
          },
        })),
      updateCustomItem: (sectionId, itemId, field, value) =>
        set((s) => ({
          cv: {
            ...s.cv,
            customSections: s.cv.customSections.map((cs) =>
              cs.id === sectionId
                ? {
                    ...cs,
                    items: cs.items.map((item) => (item.id === itemId ? { ...item, [field]: value } : item)),
                  }
                : cs
            ),
          },
        })),
      removeCustomItem: (sectionId, itemId) =>
        set((s) => ({
          cv: {
            ...s.cv,
            customSections: s.cv.customSections.map((cs) =>
              cs.id === sectionId ? { ...cs, items: cs.items.filter((item) => item.id !== itemId) } : cs
            ),
          },
        })),

      reorderSections: (sections) =>
        set((s) => ({ cv: { ...s.cv, sectionOrder: sections } })),

      toggleSection: (id) =>
        set((s) => ({
          cv: {
            ...s.cv,
            sectionOrder: s.cv.sectionOrder.map((sec) =>
              sec.id === id ? { ...sec, visible: !sec.visible } : sec
            ),
          },
        })),

      setTemplate: (templateId) =>
        set((s) => ({ cv: { ...s.cv, templateId } })),

      setAccentColor: (color) =>
        set((s) => ({ cv: { ...s.cv, accentColor: color } })),

      setFontSize: (fontSize) =>
        set((s) => ({ cv: { ...s.cv, fontSize } })),

      resetCV: () => set({ cv: DEFAULT_CV }),
    }),
    { name: "cv-builder-data" }
  )
);
