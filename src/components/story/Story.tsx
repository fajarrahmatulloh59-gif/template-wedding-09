import React from "react";
import { Sparkles } from "lucide-react";
import { weddingData } from "../../data/weddingData";

export const Story: React.FC = () => {
  return (
    <section id="story" className="relative py-24 px-4 sm:px-6 max-w-4xl mx-auto text-stone-100">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
        <p className="text-xs tracking-[0.3em] uppercase text-amber-400 font-medium">
          Kisah Kami
        </p>
        <h2
          className="text-4xl sm:text-5xl font-serif text-white tracking-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Cerita Cinta
        </h2>
        <p className="text-sm text-stone-300 font-light">
          Setiap langkah yang kami tempuh bermuara pada satu janji suci.
        </p>
      </div>

      {/* Cinematic Timeline */}
      <div className="relative border-l border-amber-400/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
        {weddingData.timeline.map((item, index) => (
          <div key={item.year} className="relative group">
            {/* Glowing timeline node */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-stone-950 border-2 border-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-125 transition-transform duration-300">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
            </div>

            {/* Timeline content card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-stone-950/75 border border-stone-800/80 backdrop-blur-md shadow-2xl hover:border-amber-400/30 transition-all duration-300 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800/80 pb-3">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-amber-300" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {item.year}
                </span>
                <span className="text-xs uppercase tracking-wider text-stone-400 font-light">
                  {item.date} {item.location && `· ${item.location}`}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-semibold text-white pt-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {item.title}
              </h3>

              <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed">
                {item.story}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
