// content templates
import SimpleTemplate from "../components/SimpleTemplate";
import FAQTemplate from "../components/FAQTemplate";
import ImageTemplate from "../components/ImageTemplate";
import VideoTemplate from "../components/VideoTemplate";
import ListTemplate from "../components/ListTemplate";

interface ISubContent {
  content: BlogSubContent,
  mainTitle: string
}

const SubContent: React.FC<ISubContent> = ({ content, mainTitle }) => {
  switch (content.type) {
    case "simple":
      return (<SimpleTemplate content={content} />);

    case "image":
      return (<ImageTemplate content={content} mainTitle={mainTitle} />);

    case "video":
      return (<VideoTemplate content={content} />);

    case "list":
      return (<ListTemplate content={content} />);

    case "faq":
      return (<FAQTemplate content={content} />);

    default:
      return null; // Handle unknown types safely
  }
};

export default SubContent;
