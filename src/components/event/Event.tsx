import React from "react";
import { Calendar, Clock, MapPin, Navigation } from "lucide-react";
import { weddingData } from "../../data/weddingData";

export const Event: React.FC = () => {
  const handleAddToCalendar = (item: (typeof weddingData.events)[0]) => {
    const { calendarEvent } = item;
    const startIso = calendarEvent.startDate.replace(/[-:]/g, "").split(".")[0];
    const endIso = calendarEvent.endDate.replace(/[-:]/g, "").split(".")[0];

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      calendarEvent.title
    )}&dates=${startIso}/${endIso}&details=${encodeURIComponent(
      calendarEvent.description
    )}&location=${encodeURIComponent(calendarEvent.location)}`;

    window.open(googleCalendarUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="event" className="relative py-24 px-4 sm:px-6 max-w-6xl mx-auto text-stone-100">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
        <p className="text-xs tracking-[0.3em] uppercase text-amber-400 font-medium">
          Waktu & Lokasi
        </p>
        <h2
          className="text-4xl sm:text-5xl font-serif text-white tracking-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Rangkaian Acara
        </h2>
        <p className="text-sm text-stone-300 font-light">
          Dengan penuh rasa syukur, kami mengundang kehadiran Anda pada momen bahagia ini.
        </p>
      </div>

      {/* Events Grid: Akad Nikah & Resepsi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {weddingData.events.map((event) => (
          <div
            key={event.id}
            className="flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-stone-950/75 border border-stone-800/80 backdrop-blur-md shadow-2xl hover:border-amber-400/40 transition-all duration-300 relative overflow-hidden group"
          >
            {/* Top gold accent line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

            <div className="space-y-6">
              <div>
                <span className="text-[11px] tracking-[0.25em] uppercase text-amber-400 font-semibold">
                  {event.tagline}
                </span>
                <h3
                  className="text-3xl sm:text-4xl font-serif text-white mt-1"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {event.title}
                </h3>
              </div>

              {/* Details list */}
              <div className="space-y-4 text-sm text-stone-300 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-amber-300 shrink-0 mt-0.5">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-stone-400 font-light">Tanggal</p>
                    <p className="text-stone-100 font-medium">{event.date}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-amber-300 shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-stone-400 font-light">Waktu</p>
                    <p className="text-stone-100 font-medium">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-amber-300 shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-stone-400 font-light">Tempat & Alamat</p>
                    <p className="text-stone-100 font-medium">{event.venue}</p>
                    <p className="text-xs text-stone-400 leading-relaxed mt-0.5">{event.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions: Google Maps & Calendar */}
            <div className="pt-8 mt-6 border-t border-stone-800/80 flex flex-wrap gap-3">
              <a
                href={event.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-850 border border-stone-700/80 text-xs tracking-wider uppercase text-amber-200 transition-colors shadow-sm"
              >
                <Navigation className="w-3.5 h-3.5 text-amber-400" />
                <span>Petunjuk Arah</span>
              </a>

              <button
                type="button"
                onClick={() => handleAddToCalendar(event)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 text-xs tracking-wider uppercase text-amber-300 transition-colors shadow-sm"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Tambah Kalender</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
