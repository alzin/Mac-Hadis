"use client";

import React, { useId, useState } from "react";
import ToggleArrowButton from "./common/ToggleArrowButton";

interface IReferenceLinksItem {
  id: string;
  description?: string;
}

interface IReferenceLinks {
  items: IReferenceLinksItem[];
  /** Rendered when the parent section has no heading of its own */
  showLabel?: boolean;
}

/** Below this count the whole list is shown at once — no toggle needed. */
const COLLAPSED_COUNT = 5;
/** Above this count the expanded list is split into two columns. */
const MULTI_COLUMN_COUNT = 8;

/**
 * Reference links exist for organic search, not for readers, so they are
 * rendered as a compact, muted citation block instead of a full content list.
 * Every link stays in the DOM even while collapsed (the collapse is CSS only)
 * so crawlers always see the complete set.
 */
const ReferenceLinks: React.FC<IReferenceLinks> = ({ items, showLabel }) => {
  const listId = useId();
  const [isOpen, setIsOpen] = useState(false);

  const isCollapsible = items.length > COLLAPSED_COUNT;
  const isCollapsed = isCollapsible && !isOpen;
  const isMultiColumn = items.length > MULTI_COLUMN_COUNT;

  // The JSON authors anchors with their own colour/underline classes; strip them
  // so the block keeps one consistent, quiet style, and harden target="_blank".
  const normalizeAnchor = (html: string): string =>
    html
      .replace(/\sclass=(["'])[\s\S]*?\1/gi, "")
      .replace(/<a\b(?![^>]*\brel=)/gi, '<a rel="noopener noreferrer"');

  return (
    <div className="my-6 rounded-xl border border-[#EFEFEF] bg-[#FAFAFA] px-4 py-3 lg:px-5 lg:py-4">
      {showLabel && (
        <div className="mb-2 flex items-center gap-1.5 text-[#9A9A9A]">
          <span className="font-noto text-[12px] font-medium leading-none">
            参考リンク
          </span>
          <span className="font-noto text-[11px] leading-none text-[#B5B5B5]">
            （{items.length}件）
          </span>
        </div>
      )}

      <div className="relative">
        <ul
          id={listId}
          className={`list-disc pl-5 font-noto text-[12px] leading-[170%] text-[#6B6B6B] marker:text-[10px] marker:text-[#B5B5B5] lg:text-[13px] [&_a]:break-words [&_a]:text-[#5A6472] [&_a]:underline [&_a]:decoration-[#D5D5D5] [&_a]:underline-offset-2 [&_a]:transition-colors hover:[&_a]:text-[#B81122] hover:[&_a]:decoration-[#B81122] ${
            isCollapsed
              ? "max-h-[132px] overflow-hidden lg:max-h-[140px]"
              : "max-h-none"
          } ${!isCollapsed && isMultiColumn ? "lg:columns-2 lg:gap-x-10" : ""}`}
        >
          {items.map((item) => (
            <li
              key={item.id}
              className="mb-1 break-inside-avoid last:mb-0"
              dangerouslySetInnerHTML={{
                __html: normalizeAnchor(item.description ?? ""),
              }}
            />
          ))}
        </ul>

        {isCollapsed && (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#FAFAFA] to-transparent"
            aria-hidden="true"
          />
        )}
      </div>

      {isCollapsible && (
        <div className="mt-3 flex justify-center">
          <ToggleArrowButton
            isOpen={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            controls={listId}
            label="参考リンク"
          />
        </div>
      )}
    </div>
  );
};

export default ReferenceLinks;
