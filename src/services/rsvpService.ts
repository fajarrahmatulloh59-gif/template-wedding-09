export interface RsvpEntry {
  id: string;
  name: string;
  attendance: "HADIR" | "TIDAK HADIR" | "MASIH RAGU";
  guestCount: number;
  phone?: string;
  notes?: string;
  createdAt: string;
}

const DEFAULT_RSVP_DATA: RsvpEntry[] = [
  {
    id: "rsvp-1",
    name: "Dr. Rizky Ramadhan & Partner",
    attendance: "HADIR",
    guestCount: 2,
    createdAt: "2026-09-28T14:20:00.000Z",
  },
  {
    id: "rsvp-2",
    name: "Anisa Wardhani",
    attendance: "HADIR",
    guestCount: 1,
    createdAt: "2026-09-28T16:45:00.000Z",
  },
  {
    id: "rsvp-3",
    name: "Bagus Setiawan, S.Kom.",
    attendance: "MASIH RAGU",
    guestCount: 1,
    notes: "Menunggu jadwal dinas luar kota.",
    createdAt: "2026-09-29T09:12:00.000Z",
  },
  {
    id: "rsvp-4",
    name: "Keluarga Bpk. Hartanto",
    attendance: "HADIR",
    guestCount: 3,
    createdAt: "2026-09-29T11:30:00.000Z",
  },
  {
    id: "rsvp-5",
    name: "Maya Puspitasari (Singapura)",
    attendance: "TIDAK HADIR",
    guestCount: 0,
    notes: "Mohon maaf belum bisa pulang ke Bandung, doa terbaik selalu.",
    createdAt: "2026-09-29T15:00:00.000Z",
  },
];

const LOCAL_STORAGE_KEY = "tm_studio_template09_rsvp";

export const rsvpService = {
  async getRsvps(): Promise<RsvpEntry[]> {
    try {
      const res = await fetch("/api/rsvp");
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

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_RSVP_DATA));
    return DEFAULT_RSVP_DATA;
  },

  async submitRsvp(entry: Omit<RsvpEntry, "id" | "createdAt">): Promise<RsvpEntry> {
    const newEntry: RsvpEntry = {
      ...entry,
      id: "rsvp-" + Date.now(),
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      }
    } catch {
      // Backend not reached, use local storage fallback
    }

    try {
      const list = await this.getRsvps();
      const updated = [newEntry, ...list.filter((item) => item.name !== entry.name)];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }

    return newEntry;
  },
};
