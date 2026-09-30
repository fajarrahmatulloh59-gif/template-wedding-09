import React from "react";
import {
  Calendar,
  Clock,
  Gift,
  Heart,
  Home,
  Image as ImageIcon,
  MessageCircle,
  UserCheck,
} from "lucide-react";
import { navigationItems } from "../../data/weddingData";

interface NavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  visible: boolean;
}

const itemIcons: Record<string, React.ReactNode> = {
  hero: <Home className="w-4 h-4" />,
  couple: <Heart className="w-4 h-4" />,
  event: <Calendar className="w-4 h-4" />,
  story: <Clock className="w-4 h-4" />,
  gallery: <ImageIcon className="w-4 h-4" />,
  rsvp: <UserCheck className="w-4 h-4" />,
  guestbook: <MessageCircle className="w-4 h-4" />,
  gift: <Gift className="w-4 h-4" />,
};

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onNavigate,
  visible,
}) => {
  if (!visible) return null;

  return (
    <nav
      aria-label="Navigasi Undangan"
      className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-auto max-w-[96vw] px-2"
    >
      {/* Template 04 Signature Docked Floating Bar */}
      <div className="flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-full bg-stone-950/85 backdrop-blur-xl border border-stone-800/80 shadow-2xl shadow-black/80 ring-1 ring-white/10">
        {navigationItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap ${
                isActive
                  ? "bg-amber-500/20 text-amber-300 border border-amber-400/40 shadow-inner"
                  : "text-stone-400 hover:text-stone-200 hover:bg-white/5 border border-transparent"
              }`}
              title={item.label}
              aria-current={isActive ? "true" : undefined}
            >
              <span className={`transition-transform duration-200 ${isActive ? "scale-110 text-amber-300" : ""}`}>
                {itemIcons[item.id]}
              </span>
              <span className={`text-[10px] sm:text-xs tracking-wider uppercase font-semibold ${isActive ? "inline" : "hidden md:inline"}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-400" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
