import React from "react";
import { Music, Pause, Play } from "lucide-react";

interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
  visible: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ isPlaying, onToggle, visible }) => {
  if (!visible) return null;

  return (
    <div className="fixed top-5 right-5 z-40">
      <button
        onClick={onToggle}
        type="button"
        aria-label={isPlaying ? "Jeda Musik Latar" : "Putar Musik Latar"}
        className="group relative flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-stone-900/80 backdrop-blur-md border border-amber-400/30 text-stone-200 shadow-xl shadow-black/40 hover:border-amber-400/70 hover:bg-stone-850 transition-all duration-300 active:scale-95"
      >
        {/* Pulsing glow ring when playing */}
        {isPlaying && (
          <span className="absolute -inset-0.5 rounded-full bg-amber-500/20 animate-pulse pointer-events-none" />
        )}

        {/* Vinyl disc / music note indicator */}
        <div
          className={`w-6 h-6 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-amber-300 transition-transform ${
            isPlaying ? "animate-spin [animation-duration:4s]" : ""
          }`}
        >
          <Music className="w-3.5 h-3.5" />
        </div>

        {/* Status text & Icon */}
        <div className="flex items-center gap-1.5 text-xs tracking-wider uppercase font-medium">
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] text-stone-300 hidden sm:inline">Pause</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-[11px] text-stone-300 hidden sm:inline">Play</span>
            </>
          )}
        </div>
      </button>
    </div>
  );
};
