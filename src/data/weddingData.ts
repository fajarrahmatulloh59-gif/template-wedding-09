// ======================================================
// ⚠️ DO NOT MODIFY
// ======================================================
export interface WeddingCouplePerson {
  name: string;
  fullName: string;
  role: string;
  father: string;
  mother: string;
  instagram?: string;
  photo: string;
}

export interface WeddingEventItem {
  id: string;
  title: string;
  tagline: string;
  date: string;
  time: string;
  zone: string;
  venue: string;
  address: string;
  mapUrl: string;
  calendarEvent: {
    title: string;
    description: string;
    location: string;
    startDate: string; // ISO string
    endDate: string;   // ISO string
  };
}

export interface StoryTimelineItem {
  year: string;
  title: string;
  date: string;
  story: string;
  location?: string;
}

export interface GalleryPhotoItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  aspect: "landscape" | "portrait" | "square" | "panorama";
}

export interface BankAccountItem {
  bank: string;
  accountNumber: string;
  accountName: string;
  qrCode?: string;
}

export interface PhysicalGiftAddress {
  recipientName: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
}

export interface VideoConfig {
  enabled: boolean;
  mp4: string;
  webm: string;
  mobile: string;
  poster: string;
  loop: boolean;
  muted: boolean;
}

export interface MusicConfig {
  enabled: boolean;
  src: string;
  title: string;
  artist: string;
  autoplayAfterOpen: boolean;
}

// ======================================================
// 🎬 CUSTOMER VIDEO
//
// TEMPLATE 09 — CINEMATIC PREWEDDING
//
// VIDEO DEMO SAAT DEVELOPMENT:
// public/video/prewedding.mp4
//
// SAAT ADA CUSTOMER:
// GANTI FILE DEMO DENGAN VIDEO PREWEDDING CUSTOMER
//
// OPTIONAL:
// public/video/prewedding.webm
//
// OPTIONAL MOBILE:
// public/video/prewedding-mobile.mp4
//
// POSTER:
// public/video/poster.jpg
//
// TIDAK PERLU MENGUBAH COMPONENT.
// ======================================================
export const videoConfig: VideoConfig = {
  enabled: true,
  mp4: "/video/prewedding.mp4",
  webm: "/video/prewedding.webm",
  mobile: "/video/prewedding-mobile.mp4",
  poster: "/video/poster.jpg",
  loop: true,
  muted: true,
};

// ======================================================
// 🎵 CUSTOMER MUSIC
//
// GANTI FILE:
// public/music/backsound.mp3
//
// TIDAK PERLU MENGUBAH COMPONENT.
// ======================================================
export const musicConfig: MusicConfig = {
  enabled: true,
  src: "/music/backsound.mp3",
  title: "Canon in D & A Thousand Years (Acoustic Ambient)",
  artist: "T.M STUDIO Wedding Ensemble",
  autoplayAfterOpen: true,
};

// ======================================================
// 🟠 CUSTOMER ASSET
//
// FOTO CUSTOMER
//
// GANTI FILE DI:
// public/image/
//
// FOTO TIDAK BOLEH DI-CROP OTOMATIS.
// ======================================================
export const customerAssets = {
  groom: "/image/groom.jpg",
  bride: "/image/bride.jpg",
  hero: "/image/hero.jpg",
  galleryForest: "/image/gallery_forest.jpg",
  galleryBeach: "/image/gallery_beach.jpg",
};

// ======================================================
// 🔴 CUSTOMER DATA
// ======================================================
export const weddingData = {
  couple: {
    groom: {
      name: "Dimas",
      fullName: "Dimas Raditya Pratama, S.T.",
      role: "Mempelai Pria",
      father: "Bpk. Bambang Suryo Pratama",
      mother: "Ibu Sri Wahyuni",
      instagram: "@dimaspratama",
      photo: "public/image/pasangan.jpg",
    } as WeddingCouplePerson,
    bride: {
      name: "Adinda",
      fullName: "Adinda Kirana Larasati, S.Ds.",
      role: "Mempelai Wanita",
      father: "Bpk. Hendro Wicaksono",
      mother: "Ibu Ratna Dewi",
      instagram: "@adindakrn",
      photo: "public/image/mempelai wanita.jpg",
    } as WeddingCouplePerson,
    shortNames: "Dimas & Adinda",
  },

  invitationText: {
    greeting: "The Wedding Of",
    subheading: "KAMI MENGUNDANG ANDA UNTUK MERAYAKAN HARI BAHAGIA KAMI",
    defaultGuest: "Tamu Undangan",
    verseNumber: "QS. Ar-Rum: 21",
    verseArabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ",
    verseTranslation: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.",
  },

  hero: {
    badge: "CINEMATIC PREWEDDING INVITATION",
    title: "Dimas & Adinda",
    dateFormatted: "Sabtu, 24 Oktober 2026",
    targetDateIso: "2026-10-24T08:00:00+07:00",
    locationCity: "Bandung, Jawa Barat",
  },

  events: [
    {
      id: "akad",
      title: "Akad Nikah",
      tagline: "SAKRAL & PENUH BERKAH",
      date: "Sabtu, 24 Oktober 2026",
      time: "08.00 – 10.00 WIB",
      zone: "WIB",
      venue: "Pine Hill Eco Glass House",
      address: "Jl. Maribaya Timur No. 1, Cibodas, Lembang, Bandung Barat, Jawa Barat 40391",
      mapUrl: "https://maps.google.com/?q=Pine+Hill+Cibodas+Lembang",
      calendarEvent: {
        title: "Akad Nikah Dimas & Adinda",
        description: "Akad Nikah Dimas Raditya Pratama & Adinda Kirana Larasati",
        location: "Pine Hill Eco Glass House, Lembang",
        startDate: "2026-10-24T08:00:00+07:00",
        endDate: "2026-10-24T10:00:00+07:00",
      },
    },
    {
      id: "resepsi",
      title: "Resepsi Pernikahan",
      tagline: "SELEBRASI CINTA & KEBAHAGIAAN",
      date: "Sabtu, 24 Oktober 2026",
      time: "11.00 – 16.00 WIB",
      zone: "WIB",
      venue: "Grand Pine Ballroom & Garden",
      address: "Jl. Maribaya Timur No. 1, Cibodas, Lembang, Bandung Barat, Jawa Barat 40391",
      mapUrl: "https://maps.google.com/?q=Pine+Hill+Cibodas+Lembang",
      calendarEvent: {
        title: "Resepsi Dimas & Adinda",
        description: "Resepsi Pernikahan Dimas Raditya Pratama & Adinda Kirana Larasati",
        location: "Grand Pine Ballroom & Garden, Lembang",
        startDate: "2026-10-24T11:00:00+07:00",
        endDate: "2026-10-24T16:00:00+07:00",
      },
    },
  ] as WeddingEventItem[],

  timeline: [
    {
      year: "2022",
      title: "Pertemuan Pertama",
      date: "14 Mei 2022",
      story: "Takdir mempertemukan kami di sebuah workshop desain arsitektur di Bandung. Berawal dari diskusi tentang estetika visual, kami menyadari ada rasa hangat yang tak terduga.",
      location: "Bandung Creative Hub",
    },
    {
      year: "2024",
      title: "Komitmen & Lamaran",
      date: "20 Juli 2024",
      story: "Setelah dua tahun merajut impian bersama dan saling menguatkan di setiap langkah, di hadapan kedua keluarga besar kami mengikrarkan niat tulus untuk melangkah ke jenjang pernikahan.",
      location: "The Valley Bistro Resort",
    },
    {
      year: "2026",
      title: "Menuju Pernikahan",
      date: "24 Oktober 2026",
      story: "Sebuah babak baru akan segera tertulis. Dengan restu orang tua dan doa dari Anda sekalian, kami bersiap mengarungi samudra kehidupan dalam satu ikatan suci pernikahan.",
      location: "Pine Hill, Lembang",
    },
  ] as StoryTimelineItem[],

  gallery: [
    {
      id: "gal-1",
      src: "/image/pasangan.jpg",
      alt: "Dimas & Adinda di tebing pantai saat golden hour",
      caption: "Satu komitmen di ujung senja, menatap masa depan bersama.",
      aspect: "panorama",
    },
    {
      id: "gal-2",
      src: "image/jalan di hutan.jpg",
      alt: "Dimas & Adinda berjalan di hutan pinus berkabut",
      caption: "Di antara ketenangan semesta, kami menemukan rumah yang sesungguhnya.",
      aspect: "landscape",
    },
    {
      id: "gal-3",
      src: "image/pantai.jpg",
      alt: "Potret Mempelai Pria",
      caption: "Keteguhan tekad menyongsong hari yang sakral.",
      aspect: "portrait",
    },
    {
      id: "gal-4",
      src: "image/kopel.jpg",
      alt: "Potret Mempelai Wanita",
      caption: "Anggun dalam balutan kelembutan doa dan cinta.",
      aspect: "portrait",
    },
    {
      id: "gal-5",
      src: "image/kopel sinematik.jpg",
      alt: "Canda tawa di pesisir pantai",
      caption: "Tawa yang tak pernah pudar, melengkapi setiap langkah perjalanan.",
      aspect: "landscape",
    },
  ] as GalleryPhotoItem[],

  gifts: {
    bankAccounts: [
      {
        bank: "Bank BCA",
        accountNumber: "8420198273",
        accountName: "Dimas Raditya Pratama",
      },
      {
        bank: "Bank Mandiri",
        accountNumber: "1310098471203",
        accountName: "Adinda Kirana Larasati",
      },
    ] as BankAccountItem[],

    physicalGift: {
      recipientName: "Adinda Kirana / Dimas Raditya",
      phone: "+62 812-3456-7890",
      address: "Kompleks Dago Asri Residence Blok C No. 12, Dago Atas",
      city: "Kota Bandung",
      postalCode: "40135",
    } as PhysicalGiftAddress,
  },

  closing: {
    message: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami.",
    gratitude: "Terima kasih telah menjadi bagian dari hari bahagia kami.",
    regards: "Kami yang berbahagia,",
    couple: "Dimas & Adinda",
    family: "Beserta Keluarga Besar Kedua Mempelai",
    brand: "T.M STUDIO",
    templateInfo: "CINEMATIC PREWEDDING — TEMPLATE 09",
  },
};

// ======================================================
// 🟢 SYSTEM CODE
// ======================================================
export const navigationItems = [
  { id: "hero", label: "HOME" },
  { id: "couple", label: "COUPLE" },
  { id: "event", label: "EVENT" },
  { id: "story", label: "STORY" },
  { id: "gallery", label: "GALLERY" },
  { id: "rsvp", label: "RSVP" },
  { id: "guestbook", label: "DOA" },
  { id: "gift", label: "GIFT" },
] as const;
