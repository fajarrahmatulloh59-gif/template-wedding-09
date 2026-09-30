import React, { useEffect, useState } from "react";
import { Calendar, ChevronDown, Sparkles } from "lucide-react";
import { weddingData } from "../../data/weddingData";

interface HeroProps {
  onScrollToEvent: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToEvent }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(weddingData.hero.targetDateIso).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between items-center text-center px-4 sm:px-6 py-20 overflow-hidden"
    >
      {/* Top Badge */}
      <div className="pt-6 sm:pt-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/30 bg-stone-950/60 backdrop-blur-md shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[11px] tracking-[0.25em] uppercase text-amber-200 font-medium">
            {weddingData.hero.badge}
          </span>
        </div>
      </div>

      {/* Main Title & Hero Identity */}
      <div className="max-w-4xl mx-auto my-auto py-8 space-y-6">
        <p className="text-xs sm:text-sm tracking-[0.4em] uppercase text-stone-300 font-light">
          {weddingData.invitationText.greeting}
        </p>

        <h1
          className="text-5xl sm:text-7xl md:text-8xl font-serif tracking-tight text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {weddingData.couple.shortNames}
        </h1>

        <p className="text-sm sm:text-base tracking-[0.25em] uppercase text-amber-200/90 font-light">
          {weddingData.hero.dateFormatted} · {weddingData.hero.locationCity}
        </p>

        {/* Cinematic Countdown Timer */}
        <div className="pt-4 max-w-lg mx-auto">
          <div className="grid grid-cols-4 gap-2 sm:gap-4 p-4 rounded-2xl bg-stone-950/70 border border-amber-400/20 backdrop-blur-md shadow-2xl">
            {[
              { label: "Hari", value: timeLeft.days },
              { label: "Jam", value: timeLeft.hours },
              { label: "Menit", value: timeLeft.minutes },
              { label: "Detik", value: timeLeft.seconds },
            ].map((unit) => (
              <div key={unit.label} className="text-center p-2 rounded-xl bg-stone-900/60 border border-stone-800/60">
                <span className="block text-2xl sm:text-4xl font-serif font-bold text-amber-100 tabular-nums">
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="block text-[10px] sm:text-xs uppercase tracking-wider text-stone-400 mt-1">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Save The Date Button */}
        <div className="pt-2 flex justify-center gap-4">
          <button
            onClick={onScrollToEvent}
            type="button"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900/80 border border-amber-400/40 text-amber-200 text-xs uppercase tracking-widest hover:bg-amber-500 hover:text-stone-950 hover:border-amber-500 transition-all duration-300 backdrop-blur-md active:scale-95"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Simpan Tanggal</span>
          </button>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="pb-6 flex flex-col items-center gap-2 text-stone-400">
        <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400">Scroll untuk Menjelajah</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-amber-400/80" />
      </div>
    </section>
  );
};
