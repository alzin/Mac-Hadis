type PurchaseProcessCategoryType = "On-site purchase" | "Home delivery purchase" | "Bring-in purchase"

type SubContentType = "simple" | "faq" | "list" | "image" | "video";

interface BlogItemBase {
    id: string;
    title: string;
    type: SubContentType;
}

interface SimpleContent extends BlogItemBase {
    type: "simple";
    description: string;
}

interface ImageContent extends BlogItemBase {
    type: "image";
    imageSrc: string;
}

interface VideoContent extends BlogItemBase {
    type: "video";
    list: {
        id: string
        videoSrc: string;
        poster: string
    }[]
}
interface FAQContent extends BlogItemBase {
    type: "faq";
    description?: string;
    items: {
        id: string;
        question: string;
        answer: string;
    }[];
}

interface ListContent extends BlogItemBase {
    type: "list";
    topDescription?: string;
    listType?: "number" | "dot" | "none"
    items: {
        id: string;
        title?: string;
        description?: string;
    }[];
    bottomDescription?: string;
}

type BlogSubContent = SimpleContent | FAQContent | ImageContent | ListContent | VideoContent;

interface BlogPost {
    id: string;
    title: string;
    imageSrc: string;
    description: string;
    metaDescription: string;
    subContent: BlogSubContent[];
}
