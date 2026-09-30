/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { BackgroundVideo } from "./components/backgroundVideo/BackgroundVideo";
import { Closing } from "./components/closing/Closing";
import { Couple } from "./components/couple/Couple";
import { Event } from "./components/event/Event";
import { Gallery } from "./components/gallery/Gallery";
import { WeddingGift } from "./components/gift/WeddingGift";
import { Guestbook } from "./components/guestbook/Guestbook";
import { Hero } from "./components/hero/Hero";
import { LastPage } from "./components/lastPage/LastPage";
import { MusicPlayer } from "./components/music/MusicPlayer";
import { Navigation } from "./components/navigation/Navigation";
import { Opening } from "./components/opening/Opening";
import { Rsvp } from "./components/rsvp/Rsvp";
import { Story } from "./components/story/Story";
import { navigationItems } from "./data/weddingData";
import { useActiveSection } from "./hooks/useActiveSection";
import { useMusic } from "./hooks/useMusic";

export default function App() {
  const [invitationOpened, setInvitationOpened] = useState<boolean>(false);
  const { isPlaying, toggleMusic, startMusic } = useMusic();

  const sectionIds = navigationItems.map((n) => n.id);
  const { activeSection, scrollTo } = useActiveSection(sectionIds, "hero");

  const handleOpenInvitation = () => {
    setInvitationOpened(true);
    // User gesture activates audio playback
    startMusic();
    // Smooth scroll to top of Hero
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen text-stone-100 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* 01. GLOBAL BACKGROUND VIDEO & OVERLAY SCENE */}
      <BackgroundVideo invitationOpened={invitationOpened} />

      {/* 02. MUSIC CONTROLLER (Visible after opening) */}
      <MusicPlayer
        isPlaying={isPlaying}
        onToggle={toggleMusic}
        visible={invitationOpened}
      />

      {/* 03. OPENING SCREEN (Prior to user clicking Buka Undangan) */}
      <Opening
        isOpen={invitationOpened}
        onOpen={handleOpenInvitation}
      />

      {/* MAIN INVITATION CONTENT (Displayed when invitation is opened) */}
      <div
        className={`transition-opacity duration-1000 ${
          invitationOpened ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <main className="relative z-10 w-full">
          {/* Section 02: HOME / HERO */}
          <Hero onScrollToEvent={() => scrollTo("event")} />

          {/* Section 03: COUPLE */}
          <Couple />

          {/* Section 04: EVENT */}
          <Event />

          {/* Section 05: STORY */}
          <Story />

          {/* Section 06: GALLERY */}
          <Gallery />

          {/* Section 07: RSVP */}
          <Rsvp />

          {/* Section 08: KIRIM DOA */}
          <Guestbook />

          {/* Section 09: WEDDING GIFT */}
          <WeddingGift />

          {/* Section 10: LAST PAGE */}
          <LastPage />

          {/* Section 11: CLOSING */}
          <Closing />
        </main>

        {/* TEMPLATE 04 SIGNATURE FLOATING NAVIGATION */}
        <Navigation
          activeSection={activeSection}
          onNavigate={scrollTo}
          visible={invitationOpened}
        />
      </div>
    </div>
  );
}
