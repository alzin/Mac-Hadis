import dynamic from "next/dynamic";
import Hero from "./sections/Hero";
import ContactFixedBanner from "@/components/common/sections/ContactFixedBanner";
import { PurchaseRecords } from "@/components/common/sections/PurchaseRecords";
import data from "@/content/home/PurchaseResults.json";
import { LocalBusinessSchema } from '@/components/seo/schemas';

import InquiryClient from "./sections/InquiryClient";

// Helper for consistent loading states to prevent CLS
const SectionLoader = ({ height = "400px" }: { height?: string }) => (
  <div className={`w-full bg-gray-50 animate-pulse`} style={{ height }} />
);

const Flow = dynamic(() => import("./sections/Flow"), {
  loading: () => <SectionLoader height="600px" />,
});
const WhyChoose = dynamic(() => import("./sections/WhyChoose"), {
  loading: () => <SectionLoader height="500px" />,
});

const BlogsPost = dynamic(() => import("./sections/BlogsPost"), {
  loading: () => <SectionLoader height="400px" />,
});
const ContactBanner = dynamic(() => import("./sections/ContactBanner"), {
  loading: () => <SectionLoader height="200px" />,
});
const PurchasedItems = dynamic(() => import("./sections/PurchasedItems"), {
  loading: () => <SectionLoader height="500px" />,
});

const PurchaseProcess = dynamic(() => import("./sections/PurchaseProcess"), {
  loading: () => <SectionLoader height="400px" />,
});
const BusinessPolicy = dynamic(() => import("./sections/BusinessPolicy"), {
  loading: () => <SectionLoader height="300px" />,
});
const ReviewsReceived = dynamic(() => import("./sections/ReviewsReceived"), {
  loading: () => <SectionLoader height="400px" />,
});
const FrequentlyAskedQuestions = dynamic(
  () => import("./sections/FrequentlyAskedQuestions"),
  { loading: () => <SectionLoader height="600px" /> }
);
const CompanyProfile = dynamic(() => import("./sections/CompanyProfile"), {
  loading: () => <SectionLoader height="500px" />
});

const Index = () => {
  return (
    <>
      <LocalBusinessSchema />
      <Hero />
      <ContactFixedBanner />
      <Flow />
      <WhyChoose />
      <ContactBanner />
      <PurchasedItems />
      <PurchaseRecords label="機械買取実績" purchaseItems={data} isLimit={true} />
      <PurchaseProcess />
      <BusinessPolicy />
      <ContactBanner />
      <ReviewsReceived />
      <BlogsPost />
      <FrequentlyAskedQuestions />
      <ContactBanner />
      <CompanyProfile />
      <InquiryClient />
    </>
  );
};

export default Index;