import React, { useEffect, useState } from "react";
import { Check, Heart, Loader2, MessageCircle, MessageSquare, Send, User } from "lucide-react";
import { GuestbookEntry, guestbookService } from "../../services/guestbookService";

export const Guestbook: React.FC = () => {
  const [wishes, setWishes] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  // Form State
  const [name, setName] = useState<string>("");
  const [relationship, setRelationship] = useState<string>("Sahabat");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    setLoading(true);
    try {
      const data = await guestbookService.getWishes();
      setWishes(data);
    } catch (err) {
      console.error("Failed to load wishes:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSubmitting(true);
    setSuccess(false);

    try {
      const saved = await guestbookService.submitWish({
        name: name.trim(),
        relationship,
        message: message.trim(),
      });

      setWishes((prev) => [saved, ...prev]);
      setSuccess(true);
      setName("");
      setMessage("");
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error("Failed to post wish:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "Baru saja";
    }
  };

  return (
    <section id="guestbook" className="relative py-24 px-4 sm:px-6 max-w-4xl mx-auto text-stone-100">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-3 mb-14">
        <p className="text-xs tracking-[0.3em] uppercase text-amber-400 font-medium">
          Untaian Doa & Restu
        </p>
        <h2
          className="text-4xl sm:text-5xl font-serif text-white tracking-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Kirim Doa & Ucapan
        </h2>
        <p className="text-sm text-stone-300 font-light">
          Setiap doa dan restu yang tulus merupakan anugerah yang sangat berharga bagi lembaran baru kehidupan kami.
        </p>
      </div>

      {/* Main Grid: Form + Live Feed */}
      <div className="space-y-8">
        {/* Form Card */}
        <div className="p-6 sm:p-10 rounded-3xl bg-stone-950/80 border border-stone-800/80 backdrop-blur-md shadow-2xl space-y-6">
          <div className="flex items-center gap-2.5 pb-2 border-b border-stone-800/80">
            <MessageSquare className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-semibold tracking-wider uppercase text-amber-200">
              Tulis Ucapan & Doa Restu
            </h3>
          </div>

          {success && (
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-sm flex items-center gap-3">
              <Check className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Terima kasih! Doa dan ucapan Anda telah berhasil dikirimkan.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Nama Pengirim */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-stone-300 font-medium">
                  Nama Anda <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama Anda"
                  className="w-full px-4 py-3 rounded-xl bg-stone-900/90 border border-stone-700/80 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {/* Hubungan */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-stone-300 font-medium">
                  Hubungan
                </label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-stone-900/90 border border-stone-700/80 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                >
                  <option value="Keluarga">Keluarga</option>
                  <option value="Sahabat">Sahabat</option>
                  <option value="Rekan Kerja">Rekan Kerja</option>
                  <option value="Teman Sekolah / Kuliah">Teman Sekolah / Kuliah</option>
                  <option value="Kerabat">Kerabat</option>
                </select>
              </div>
            </div>

            {/* Pesan Doa */}
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-stone-300 font-medium">
                Doa & Ucapan <span className="text-amber-400">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tuliskan doa kebaikan dan ucapan selamat untuk Dimas & Adinda..."
                className="w-full px-4 py-3 rounded-xl bg-stone-900/90 border border-stone-700/80 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-amber-400 transition-colors resize-none"
              />
            </div>

            {/* Tombol Kirim */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-semibold text-xs tracking-widest uppercase shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 transition-all duration-300 active:scale-[0.99]"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Mengirim Doa...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Kirim Doa Restu</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Wishes Feed List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h4 className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
              Kumpulan Doa & Harapan ({wishes.length})
            </h4>
          </div>

          {loading ? (
            <div className="text-center py-12 text-stone-500 text-xs">Memuat ucapan...</div>
          ) : (
            <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1">
              {wishes.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-stone-950/70 border border-stone-800/80 backdrop-blur-md shadow-lg space-y-2.5 hover:border-amber-400/30 transition-all duration-200"
                >
                  <div className="flex items-center justify-between gap-2 border-b border-stone-800/60 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 text-xs font-semibold">
                        {item.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <span className="font-semibold text-stone-100 text-sm">{item.name}</span>
                        <span className="text-[11px] text-amber-400/80 ml-2 font-medium">· {item.relationship}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-stone-400 font-light">
                      {formatDate(item.createdAt)}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                    {item.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
