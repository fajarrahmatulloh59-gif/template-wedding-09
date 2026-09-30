import React, { useEffect, useState } from "react";
import { MailOpen, Sparkles } from "lucide-react";
import { weddingData } from "../../data/weddingData";

interface OpeningProps {
  isOpen: boolean;
  onOpen: () => void;
}

export const Opening: React.FC<OpeningProps> = ({ isOpen, onOpen }) => {
  const [guestName, setGuestName] = useState<string>(weddingData.invitationText.defaultGuest);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const to = params.get("to") || params.get("u") || params.get("guest");
      if (to) {
        setGuestName(decodeURIComponent(to).trim());
      }
    } catch {
      // fallback
    }
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-6 sm:p-10 transition-all duration-1000 ease-in-out ${
        isOpen
          ? "opacity-0 pointer-events-none -translate-y-8"
          : "opacity-100 pointer-events-auto bg-stone-950"
      }`}
    >
      {/* Background poster & subtle ambient illumination */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <img
          src="/image/hero.jpg"
          alt="Dimas & Adinda Prewedding"
          className="w-full h-full object-cover scale-105 filter brightness-[0.32] contrast-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.12)_0%,transparent_70%)]" />
      </div>

      {/* Top Header: Brand Tag */}
      <div className="w-full max-w-md mx-auto text-center pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/30 bg-stone-900/40 backdrop-blur-md">
          <Sparkles className="w-3 h-3 text-amber-300" />
          <span className="text-[10px] tracking-[0.25em] uppercase text-amber-200/90 font-medium">
            T.M STUDIO · TEMPLATE 09
          </span>
        </div>
      </div>

      {/* Center: Wedding Invitation Hero Identity */}
      <div className="w-full max-w-lg mx-auto text-center space-y-6 my-auto">
        <div className="space-y-2">
          <p className="font-sans text-xs tracking-[0.35em] uppercase text-amber-300/80">
            {weddingData.invitationText.greeting}
          </p>
          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight text-white drop-shadow-2xl"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {weddingData.couple.shortNames}
          </h1>
          <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-stone-300 font-light">
            {weddingData.hero.dateFormatted}
          </p>
        </div>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-3 py-1 text-amber-400/60">
          <span className="w-12 h-px bg-gradient-to-r from-transparent to-amber-400/50" />
          <span className="text-xs">✦</span>
          <span className="w-12 h-px bg-gradient-to-l from-transparent to-amber-400/50" />
        </div>

        {/* Guest Greeting Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-stone-900/75 border border-stone-800/80 backdrop-blur-md shadow-2xl text-stone-200 space-y-2.5">
          <p className="text-xs tracking-wider uppercase text-stone-400">
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>
          <h2 className="text-xl sm:text-2xl font-serif font-semibold text-amber-100">
            {guestName}
          </h2>
          <p className="text-xs text-stone-400 leading-relaxed font-light">
            Tanpa mengurangi rasa hormat, kami bermaksud mengundang Anda untuk hadir di acara pernikahan kami.
          </p>
        </div>

        {/* Button: BUKA UNDANGAN */}
        <div className="pt-2">
          <button
            onClick={onOpen}
            type="button"
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-semibold text-sm tracking-widest uppercase shadow-lg shadow-amber-500/25 hover:from-amber-400 hover:to-amber-500 hover:shadow-amber-500/40 active:scale-95 transition-all duration-300"
          >
            <MailOpen className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>Buka Undangan</span>
          </button>
        </div>
      </div>

      {/* Bottom Footer note */}
      <div className="w-full max-w-md mx-auto text-center pb-2">
        <p className="text-[11px] text-stone-400/80 tracking-wider">
          Klik tombol di atas untuk memutar musik & video sinematik
        </p>
      </div>
    </div>
  );
};
