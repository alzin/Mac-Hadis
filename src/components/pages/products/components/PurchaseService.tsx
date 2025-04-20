"use client";
import { useState } from "react";
import Head from "next/head";
import { TService } from "@/types/product.type";
import ServiceCard from "./ServiceCard";

interface IPurchaseServicesProps {
  servicesTitle: string;
  servicesDescription: string;
  dismantling: TService;
  transportation: TService;
  whyChooseUs: TService;
}

const PurchaseServices = ({
  servicesTitle,
  servicesDescription,
  dismantling,
  transportation,
  whyChooseUs,
}: IPurchaseServicesProps) => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const services = [dismantling, transportation, whyChooseUs];

  return (
    <>
      <Head>
        <title>中古油圧式カーリフト買取サービス | ハディズ</title>
      </Head>
      <main className="bg-gray-50 text-gray-900">
        <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#B81122] mb-8">
            {servicesTitle}
          </h2>
          <p className="mb-8 leading-7">
            {servicesDescription.split("\n").map((desc, index) => (
              <span key={index}>
                {desc}
                <br />
              </span>
            ))}
          </p>
          <div className="space-y-4">
            {services.map((service, index) => (
              <ServiceCard
                index={index}
                key={index}
                service={service}
                openAccordion={openAccordion}
                toggleAccordion={toggleAccordion}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default PurchaseServices;
