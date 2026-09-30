import React, { useEffect, useState } from "react";
import { Check, CheckCircle2, Clock, HelpCircle, Loader2, Send, Users, XCircle } from "lucide-react";
import { RsvpEntry, rsvpService } from "../../services/rsvpService";

export const Rsvp: React.FC = () => {
  const [entries, setEntries] = useState<RsvpEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState<string>("");
  const [attendance, setAttendance] = useState<"HADIR" | "TIDAK HADIR" | "MASIH RAGU">("HADIR");
  const [guestCount, setGuestCount] = useState<number>(1);
  const [phone, setPhone] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  useEffect(() => {
    fetchRsvps();
  }, []);

  const fetchRsvps = async () => {
    setLoading(true);
    try {
      const data = await rsvpService.getRsvps();
      setEntries(data);
    } catch (err) {
      console.error("Failed to load RSVPs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitting(true);
    setSuccessMessage(null);
    try {
      const saved = await rsvpService.submitRsvp({
        name: name.trim(),
        attendance,
        guestCount: attendance === "TIDAK HADIR" ? 0 : guestCount,
        phone: phone.trim() || undefined,
        notes: notes.trim() || undefined,
      });

      setEntries((prev) => [saved, ...prev.filter((item) => item.name !== saved.name)]);
      setSuccessMessage("Terima kasih atas konfirmasi kehadiran Anda.");
      setName("");
      setNotes("");
      setPhone("");
    } catch (err) {
      console.error("Failed to submit RSVP:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // Summary counts
  const totalHadir = entries
    .filter((e) => e.attendance === "HADIR")
    .reduce((sum, e) => sum + (e.guestCount || 1), 0);
  const countRagu = entries.filter((e) => e.attendance === "MASIH RAGU").length;
  const countTidakHadir = entries.filter((e) => e.attendance === "TIDAK HADIR").length;

  return (
    <section id="rsvp" className="relative py-24 px-4 sm:px-6 max-w-4xl mx-auto text-stone-100">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-3 mb-12">
        <p className="text-xs tracking-[0.3em] uppercase text-amber-400 font-medium">
          Konfirmasi Kehadiran
        </p>
        <h2
          className="text-4xl sm:text-5xl font-serif text-white tracking-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          RSVP Online
        </h2>
        <p className="text-sm text-stone-300 font-light">
          Mohon berkenan mengisi konfirmasi kehadiran untuk membantu kami mempersiapkan jamuan terbaik bagi Anda.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-stone-950/70 border border-emerald-500/30 backdrop-blur-md text-center">
          <div className="flex items-center justify-center gap-1.5 text-emerald-400 text-xs font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Hadir</span>
          </div>
          <span className="block text-2xl sm:text-3xl font-serif font-bold text-white mt-1 tabular-nums">
            {totalHadir}
          </span>
          <span className="text-[10px] text-stone-400">Total Tamu</span>
        </div>

        <div className="p-4 rounded-2xl bg-stone-950/70 border border-amber-500/30 backdrop-blur-md text-center">
          <div className="flex items-center justify-center gap-1.5 text-amber-400 text-xs font-medium">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Masih Ragu</span>
          </div>
          <span className="block text-2xl sm:text-3xl font-serif font-bold text-white mt-1 tabular-nums">
            {countRagu}
          </span>
          <span className="text-[10px] text-stone-400">Konfirmasi</span>
        </div>

        <div className="p-4 rounded-2xl bg-stone-950/70 border border-rose-500/30 backdrop-blur-md text-center">
          <div className="flex items-center justify-center gap-1.5 text-rose-400 text-xs font-medium">
            <XCircle className="w-3.5 h-3.5" />
            <span>Tidak Hadir</span>
          </div>
          <span className="block text-2xl sm:text-3xl font-serif font-bold text-white mt-1 tabular-nums">
            {countTidakHadir}
          </span>
          <span className="text-[10px] text-stone-400">Konfirmasi</span>
        </div>
      </div>

      {/* Form Container */}
      <div className="p-6 sm:p-10 rounded-3xl bg-stone-950/80 border border-stone-800/80 backdrop-blur-md shadow-2xl space-y-6">
        {successMessage && (
          <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-sm flex items-center gap-3">
            <Check className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nama Lengkap */}
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-stone-300 font-medium">
              Nama Lengkap <span className="text-amber-400">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Dimas Pratama / Keluarga Bpk. Santoso"
              className="w-full px-4 py-3 rounded-xl bg-stone-900/90 border border-stone-700/80 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          {/* Status Kehadiran Radio Segment */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-stone-300 font-medium">
              Status Kehadiran <span className="text-amber-400">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { id: "HADIR", label: "HADIR", icon: CheckCircle2, color: "text-emerald-400" },
                { id: "MASIH RAGU", label: "MASIH RAGU", icon: HelpCircle, color: "text-amber-400" },
                { id: "TIDAK HADIR", label: "TIDAK HADIR", icon: XCircle, color: "text-rose-400" },
              ].map((opt) => {
                const isSelected = attendance === opt.id;
                const IconComponent = opt.icon;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setAttendance(opt.id as any)}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                      isSelected
                        ? "bg-amber-500/20 border-amber-400 text-white shadow-inner"
                        : "bg-stone-900/70 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700"
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 ${opt.color}`} />
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Jumlah Tamu (jika hadir/ragu) */}
          {attendance !== "TIDAK HADIR" && (
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-stone-300 font-medium">
                Jumlah Tamu / Pendamping <span className="text-amber-400">*</span>
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-28 px-4 py-3 rounded-xl bg-stone-900/90 border border-stone-700/80 text-white text-sm text-center font-medium focus:outline-none focus:border-amber-400"
                />
                <span className="text-xs text-stone-400">Orang (termasuk Anda)</span>
              </div>
            </div>
          )}

          {/* Nomor WhatsApp (opsional) */}
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-stone-300 font-medium">
              Nomor WhatsApp (Opsional)
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Contoh: 08123456789"
              className="w-full px-4 py-3 rounded-xl bg-stone-900/90 border border-stone-700/80 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          {/* Catatan / Keterangan */}
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-stone-300 font-medium">
              Pesan / Catatan Tambahan (Opsional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tuliskan catatan khusus (misal: membawa anak, dsb)"
              className="w-full px-4 py-3 rounded-xl bg-stone-900/90 border border-stone-700/80 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-amber-400 transition-colors resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-semibold text-xs tracking-widest uppercase shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 transition-all duration-300"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Mengirim Konfirmasi...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Kirim Konfirmasi RSVP</span>
              </>
            )}
          </button>
        </form>

        {/* Recent RSVP List */}
        <div className="pt-6 border-t border-stone-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs uppercase tracking-wider text-stone-400 font-medium">
              Daftar Konfirmasi Terbaru
            </h4>
            <span className="text-[11px] text-stone-500">{entries.length} data tercatat</span>
          </div>

          {loading ? (
            <div className="text-center py-6 text-stone-500 text-xs">Memuat data RSVP...</div>
          ) : (
            <div className="max-h-60 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {entries.slice(0, 10).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-stone-900/60 border border-stone-800/60 text-xs"
                >
                  <div className="space-y-0.5">
                    <p className="font-medium text-stone-200">{item.name}</p>
                    {item.notes && <p className="text-[11px] text-stone-400 italic">{item.notes}</p>}
                  </div>
                  <div className="text-right shrink-0">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase ${
                        item.attendance === "HADIR"
                          ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/30"
                          : item.attendance === "MASIH RAGU"
                          ? "bg-amber-950/80 text-amber-300 border border-amber-500/30"
                          : "bg-rose-950/80 text-rose-300 border border-rose-500/30"
                      }`}
                    >
                      {item.attendance} {item.attendance === "HADIR" && `(${item.guestCount} Tamu)`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
