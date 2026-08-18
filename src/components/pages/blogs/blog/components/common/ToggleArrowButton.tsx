import React from "react";

interface IToggleArrowButton {
  isOpen: boolean;
  onClick: () => void;
  controls?: string;
  label?: string;
}

/**
 * Icon-only expand/collapse control (no text label on purpose — the section it
 * belongs to is secondary content and should stay visually quiet).
 */
const ToggleArrowButton: React.FC<IToggleArrowButton> = ({
  isOpen,
  onClick,
  controls,
  label = "リンク",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls={controls}
      aria-label={isOpen ? `${label}を閉じる` : `${label}をもっとみる`}
      title={isOpen ? "閉じる" : "もっとみる"}
      className="mx-auto flex h-9 w-9 items-center justify-center rounded-full border border-[#EAEAEA] bg-white text-[#B81122] shadow-[0px_2px_4px_0px_#0000000D] transition-all duration-200 hover:border-[#B8112240] hover:bg-[#FFF5F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B81122]/50 focus-visible:ring-offset-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={`h-4 w-4 transition-transform duration-300 ${
          isOpen ? "rotate-180" : "rotate-0"
        }`}
      >
        <path d="M5 7.5 10 12.5 15 7.5" />
      </svg>
    </button>
  );
};

export default ToggleArrowButton;
