import React from "react";
import { Instagram } from "lucide-react";
import { weddingData } from "../../data/weddingData";

export const Couple: React.FC = () => {
  const { groom, bride } = weddingData.couple;

  return (
    <section id="couple" className="relative py-24 px-4 sm:px-6 max-w-6xl mx-auto text-stone-100">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <p className="text-xs tracking-[0.3em] uppercase text-amber-400 font-medium">
          Sang Mempelai
        </p>
        <h2
          className="text-4xl sm:text-5xl font-serif text-white tracking-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Mempelai Pria & Wanita
        </h2>

        {/* Ayat Ar-Rum 21 */}
        <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-stone-950/70 border border-stone-800/80 backdrop-blur-md shadow-xl text-center space-y-4">
          <p
            className="text-lg sm:text-2xl font-serif text-amber-200/95 leading-relaxed tracking-wide"
            dir="rtl"
          >
            {weddingData.invitationText.verseArabic}
          </p>
          <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed italic max-w-2xl mx-auto">
            &ldquo;{weddingData.invitationText.verseTranslation}&rdquo;
          </p>
          <p className="text-[11px] tracking-widest uppercase text-amber-400/80 font-medium">
            — {weddingData.invitationText.verseNumber} —
          </p>
        </div>
      </div>

      {/* Two Couples Grid: Groom & Bride */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-stretch">
        {/* Groom Card */}
        <div className="flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-stone-950/70 border border-stone-800/80 backdrop-blur-md shadow-2xl hover:border-amber-400/30 transition-all duration-300">
          {/* Framed Photo Container (Compliant with object-fit: contain & No Distortion) */}
          <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden bg-stone-900 border-2 border-amber-400/30 p-2 shadow-2xl group">
            <div className="w-full h-full rounded-xl overflow-hidden bg-stone-950 flex items-center justify-center">
              <img
                src={groom.photo}
                alt={groom.fullName}
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
          </div>

          <div className="mt-6 space-y-2">
            <span className="text-[11px] tracking-[0.25em] uppercase text-amber-400 font-medium">
              {groom.role}
            </span>
            <h3
              className="text-3xl sm:text-4xl font-serif text-white"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {groom.name}
            </h3>
            <p className="text-sm font-medium text-stone-300">
              {groom.fullName}
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-stone-800/80 text-xs sm:text-sm text-stone-400 space-y-1">
            <p>Putra tercinta dari:</p>
            <p className="text-stone-200 font-medium">{groom.father}</p>
            <p>& {groom.mother}</p>
          </div>

          {groom.instagram && (
            <a
              href={`https://instagram.com/${groom.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-stone-900/90 border border-stone-700/80 text-xs text-stone-300 hover:text-amber-300 hover:border-amber-400/40 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>{groom.instagram}</span>
            </a>
          )}
        </div>

        {/* Bride Card */}
        <div className="flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-stone-950/70 border border-stone-800/80 backdrop-blur-md shadow-2xl hover:border-amber-400/30 transition-all duration-300">
          {/* Framed Photo Container (Compliant with object-fit: contain & No Distortion) */}
          <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden bg-stone-900 border-2 border-amber-400/30 p-2 shadow-2xl group">
            <div className="w-full h-full rounded-xl overflow-hidden bg-stone-950 flex items-center justify-center">
              <img
                src={bride.photo}
                alt={bride.fullName}
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
          </div>

          <div className="mt-6 space-y-2">
            <span className="text-[11px] tracking-[0.25em] uppercase text-amber-400 font-medium">
              {bride.role}
            </span>
            <h3
              className="text-3xl sm:text-4xl font-serif text-white"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {bride.name}
            </h3>
            <p className="text-sm font-medium text-stone-300">
              {bride.fullName}
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-stone-800/80 text-xs sm:text-sm text-stone-400 space-y-1">
            <p>Putri tercinta dari:</p>
            <p className="text-stone-200 font-medium">{bride.father}</p>
            <p>& {bride.mother}</p>
          </div>

          {bride.instagram && (
            <a
              href={`https://instagram.com/${bride.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-stone-900/90 border border-stone-700/80 text-xs text-stone-300 hover:text-amber-300 hover:border-amber-400/40 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>{bride.instagram}</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
};
