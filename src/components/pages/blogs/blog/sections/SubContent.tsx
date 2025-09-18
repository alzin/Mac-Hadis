"use client"

import React from "react";

// Content Templates
import SimpleTemplate from "../components/SimpleTemplate";
import FAQTemplate from "../components/FAQTemplate";
import ImageTemplate from "../components/ImageTemplate";
import VideoTemplate from "../components/VideoTemplate";
import ListTemplate from "../components/ListTemplate";
import TableTemplate from "../components/TableTemplate";

interface ISubContent {
  content: BlogSubContent;
  mainTitle: string;
}

const SubContent: React.FC<ISubContent> = ({ content, mainTitle }) => {
  switch (content.type) {
    case "simple":
      return <SimpleTemplate content={content} />;
    case "image":
      return <ImageTemplate content={content} mainTitle={mainTitle} />;
    case "video":
      return <VideoTemplate content={content} />;
    case "list":
      return <ListTemplate content={content} />;
    case "faq":
      return <FAQTemplate content={content} />;
    case "table":
      return <TableTemplate content={content} />;
    default:
      return null;
  }
};

export default SubContent;
