export interface GuestbookEntry {
  id: string;
  name: string;
  relationship: string;
  message: string;
  createdAt: string;
}

const DEFAULT_GUESTBOOK_DATA: GuestbookEntry[] = [
  {
    id: "wish-1",
    name: "Om Hendra & Tante Dewi",
    relationship: "Keluarga",
    message: "Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fii khoir. Selamat menempuh hidup baru untuk Dimas & Adinda. Semoga sakinah mawaddah warahmah selalu sampai maut memisahkan.",
    createdAt: "2026-09-28T10:15:00.000Z",
  },
  {
    id: "wish-2",
    name: "Rangga & Tim Studio Arsitektur",
    relationship: "Rekan Kerja",
    message: "Selamat ya Mas Dimas dan Mbak Dinda! Akhirnya berlabuh ke pelaminan. Semoga rumah tangganya penuh cinta, kedamaian, dan rezeki yang melimpah berkah. Happy wedding!",
    createdAt: "2026-09-28T18:30:00.000Z",
  },
  {
    id: "wish-3",
    name: "Clara Salsabila",
    relationship: "Sahabat",
    message: "Dindaaa terharu banget liat video cinematic prewedding kalian, cantik dan gagah banget! Bahagia terus ya sama Dimas, saling menjaga dan saling melengkapi selamanya. Love you!",
    createdAt: "2026-09-29T08:45:00.000Z",
  },
  {
    id: "wish-4",
    name: "Fajar Nugraha",
    relationship: "Sahabat",
    message: "Bro Dimas, selamat bro! Sukses terus acaranya, semoga diberi kelancaran sampai hari H dan selamanya jadi nahkoda keluarga yang bijaksana dan penuh kasih sayang.",
    createdAt: "2026-09-29T14:10:00.000Z",
  },
];

const LOCAL_STORAGE_KEY = "tm_studio_template09_guestbook";

export const guestbookService = {
  async getWishes(): Promise<GuestbookEntry[]> {
    try {
      const res = await fetch("/api/guestbook");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
          return data;
        }
      }
    } catch {
      // Backend not reached or static deployment (Cloudflare Pages fallback)
    }

    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_GUESTBOOK_DATA));
    return DEFAULT_GUESTBOOK_DATA;
  },

  async submitWish(entry: Omit<GuestbookEntry, "id" | "createdAt">): Promise<GuestbookEntry> {
    const newEntry: GuestbookEntry = {
      ...entry,
      id: "wish-" + Date.now(),
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      }
    } catch {
      // Fallback to local storage
    }

    try {
      const list = await this.getWishes();
      const updated = [newEntry, ...list];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }

    return newEntry;
  },
};
