import React from "react";
import { weddingData } from "../../data/weddingData";

export const Closing: React.FC = () => {
  return (
    <footer className="relative py-20 px-4 text-center text-stone-400 space-y-6 pb-32">
      <div className="max-w-md mx-auto space-y-3">
        <p className="text-sm sm:text-base font-serif italic text-stone-200" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          &ldquo;{weddingData.closing.gratitude}&rdquo;
        </p>

        {/* Brand attribution signature compliant with PRD & Anti-slop */}
        <div className="pt-6">
          <p className="text-[11px] tracking-[0.35em] uppercase text-amber-400/90 font-semibold">
            {weddingData.closing.brand}
          </p>
          <p className="text-[10px] tracking-[0.2em] text-stone-400 font-light mt-1">
            {weddingData.closing.templateInfo}
          </p>
        </div>
      </div>
    </footer>
  );
};
