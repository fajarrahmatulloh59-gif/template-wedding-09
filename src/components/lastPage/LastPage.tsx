import React from "react";
import { Heart } from "lucide-react";
import { weddingData } from "../../data/weddingData";

export const LastPage: React.FC = () => {
  return (
    <section id="lastPage" className="relative py-24 px-4 sm:px-6 max-w-4xl mx-auto text-stone-100 text-center">
      <div className="p-8 sm:p-14 rounded-3xl bg-stone-950/80 border border-stone-800/80 backdrop-blur-md shadow-2xl space-y-8">
        <div className="inline-flex p-3 rounded-full bg-amber-500/10 text-amber-400 border border-amber-400/20">
          <Heart className="w-5 h-5 fill-amber-400/30" />
        </div>

        <div className="space-y-4 max-w-2xl mx-auto">
          <h2
            className="text-3xl sm:text-5xl font-serif text-white tracking-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Ungkapan Terima Kasih
          </h2>
          <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed">
            {weddingData.closing.message}
          </p>
        </div>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-3 py-2 text-amber-400/50">
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-amber-400/40" />
          <span className="text-xs">✦</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-amber-400/40" />
        </div>

        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] text-stone-400 font-light">
            {weddingData.closing.regards}
          </p>
          <h3
            className="text-4xl sm:text-6xl font-serif text-amber-200"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {weddingData.closing.couple}
          </h3>
          <p className="text-xs sm:text-sm text-stone-400 font-light pt-1">
            {weddingData.closing.family}
          </p>
        </div>
      </div>
    </section>
  );
};
