type PurchaseProcessCategoryType = "On-site purchase" | "Home delivery purchase" | "Bring-in purchase"

type SubContentType = "simple" | "numberedList" | "faq" | "unNumberedList";

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

interface NumberedListContent extends BlogItemBase {
    type: "numberedList";
    description?: string
    items: {
        id: string;
        title: string;
        description: string;
    }[];
}

interface UnNumberedListContent extends BlogItemBase {
    type: "unNumberedList";
    topDescription: string;
    items: string[];
    bottomDescription: string;
}

interface FAQContent extends BlogItemBase {
    type: "faq";
    items: {
        id: string;
        question: string;
        answer: string;
    }[];
}

type BlogSubContent = SimpleContent | NumberedListContent | UnNumberedListContent | FAQContent | ImageContent;

interface BlogPost {
    id: string;
    title: string;
    imageSrc: string;
    description: string;
    subContent: BlogSubContent[];
}
