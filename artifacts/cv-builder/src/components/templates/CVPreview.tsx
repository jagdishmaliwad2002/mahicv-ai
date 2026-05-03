import { CVData, TemplateId } from "../../types/cv";
import ModernTemplate from "./ModernTemplate";
import ClassicTemplate from "./ClassicTemplate";
import MinimalTemplate from "./MinimalTemplate";
import CreativeTemplate from "./CreativeTemplate";
import ExecutiveTemplate from "./ExecutiveTemplate";
import SlateTemplate from "./SlateTemplate";
import EmeraldTemplate from "./EmeraldTemplate";

interface Props {
  cv: CVData;
  previewRef?: React.RefObject<HTMLDivElement>;
}

const templates: Record<TemplateId, React.ComponentType<{ cv: CVData }>> = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  minimal: MinimalTemplate,
  creative: CreativeTemplate,
  executive: ExecutiveTemplate,
  slate: SlateTemplate,
  emerald: EmeraldTemplate,
};

export default function CVPreview({ cv, previewRef }: Props) {
  const Template = templates[cv.templateId] ?? ModernTemplate;
  return (
    <div ref={previewRef} id="cv-preview-root">
      <Template cv={cv} />
    </div>
  );
}
