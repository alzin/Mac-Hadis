"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import SectionWrapper from "./common/SectionWrapper";
import SectionHeader from "./common/SectionHeader";

interface TableContent {
  id: string;
  type: "table";
  title: string;
  topDescription: string;
  bottomDescription: string;
  headers: string[];
  rows: {
    id: string;
    columns: string[];
  }[];
}

interface ITableTemplate {
  content: TableContent;
  sectionNumber?: number;
}

const minWidthClass = (columnCount: number): string =>
  columnCount >= 4 ? "min-w-[44rem]" : "min-w-[32rem]";

const TableTemplate: React.FC<ITableTemplate> = ({
  content,
  sectionNumber,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  // Which side has content scrolled out of view — drives the fade hints.
  const [overflow, setOverflow] = useState({ left: false, right: false });

  const syncOverflow = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    setOverflow({
      left: el.scrollLeft > 1,
      right: maxScroll > 1 && el.scrollLeft < maxScroll - 1,
    });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    syncOverflow();

    // Fonts loading and viewport changes both alter whether the table overflows.
    const observer = new ResizeObserver(syncOverflow);
    observer.observe(el);

    return () => observer.disconnect();
  }, [syncOverflow]);

  const tableMinWidth = minWidthClass(content.headers.length);

  return (
    <SectionWrapper id={content.title}>
      <SectionHeader number={sectionNumber} title={content.title} />

      {/* Top Description */}
      {content.topDescription && (
        <div className="mb-8">
          {content.topDescription.split("\n").map((paragraph, index) => (
            <p
              key={index}
              className="font-noto font-normal text-[14px] lg:text-[16px] leading-[200%] tracking-normal align-middle text-[#323232] mb-4"
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          ))}
        </div>
      )}

      {/* Table */}
      <div className="relative my-8">
        <div
          ref={scrollRef}
          onScroll={syncOverflow}
          role="region"
          aria-label={`${content.title}の表`}
          tabIndex={0}
          className="overflow-x-auto overscroll-x-contain rounded-lg border border-gray-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B81122]/60"
        >
          <table
            className={`w-full ${tableMinWidth} border-collapse text-left font-noto`}
          >
            <thead>
              <tr className="bg-[#F7F7F8]">
                {content.headers.map((header, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="whitespace-nowrap border-b-2 border-gray-200 px-4 py-3.5 text-[13px] font-bold tracking-wide text-gray-700 lg:px-6 lg:py-4 lg:text-sm"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {content.rows.map((row) => (
                <tr
                  key={row.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  {row.columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className={`px-4 py-3.5 align-top text-[13px] leading-[180%] text-gray-700 lg:px-6 lg:py-4 lg:text-sm ${colIndex === 0
                          ? "whitespace-nowrap font-medium text-gray-800"
                          : ""
                        }`}
                      dangerouslySetInnerHTML={{ __html: col }}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edge fades: the only cue that more columns exist off-screen. */}
        {overflow.left && (
          <div
            className="pointer-events-none absolute inset-y-px left-px w-8 rounded-l-lg bg-gradient-to-r from-white to-transparent"
            aria-hidden="true"
          />
        )}
        {overflow.right && (
          <div
            className="pointer-events-none absolute inset-y-px right-px w-8 rounded-r-lg bg-gradient-to-l from-white to-transparent"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Bottom Description */}
      {content.bottomDescription && (
        <div className="border border-[#B81122] rounded-2xl bg-[#FFF5F6] p-4">
          {content.bottomDescription.split("\n").map((paragraph, index) => (
            <p
              key={index}
              className="text-[14px] lg:text-[16px] leading-[160%] align-middle font-noto text-[#B81122]"
              dangerouslySetInnerHTML={{
                __html: paragraph,
              }}
            />
          ))}
        </div>
      )}
    </SectionWrapper>
  );
};

export default TableTemplate;
