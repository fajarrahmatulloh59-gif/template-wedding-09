import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Persistent database path
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

interface DatabaseSchema {
  rsvp: Array<{
    id: string;
    name: string;
    attendance: 'HADIR' | 'TIDAK HADIR' | 'MASIH RAGU';
    guestCount: number;
    phone?: string;
    notes?: string;
    createdAt: string;
  }>;
  guestbook: Array<{
    id: string;
    name: string;
    relationship: string;
    message: string;
    createdAt: string;
  }>;
}

const initialDb: DatabaseSchema = {
  rsvp: [
    {
      id: 'rsvp-1',
      name: 'Dr. Rizky Ramadhan & Partner',
      attendance: 'HADIR',
      guestCount: 2,
      createdAt: '2026-09-28T14:20:00.000Z',
    },
    {
      id: 'rsvp-2',
      name: 'Anisa Wardhani',
      attendance: 'HADIR',
      guestCount: 1,
      createdAt: '2026-09-28T16:45:00.000Z',
    },
    {
      id: 'rsvp-3',
      name: 'Bagus Setiawan, S.Kom.',
      attendance: 'MASIH RAGU',
      guestCount: 1,
      notes: 'Menunggu jadwal dinas luar kota.',
      createdAt: '2026-09-29T09:12:00.000Z',
    },
    {
      id: 'rsvp-4',
      name: 'Keluarga Bpk. Hartanto',
      attendance: 'HADIR',
      guestCount: 3,
      createdAt: '2026-09-29T11:30:00.000Z',
    },
    {
      id: 'rsvp-5',
      name: 'Maya Puspitasari (Singapura)',
      attendance: 'TIDAK HADIR',
      guestCount: 0,
      notes: 'Mohon maaf belum bisa pulang ke Bandung, doa terbaik selalu.',
      createdAt: '2026-09-29T15:00:00.000Z',
    },
  ],
  guestbook: [
    {
      id: 'wish-1',
      name: 'Om Hendra & Tante Dewi',
      relationship: 'Keluarga',
      message: "Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fii khoir. Selamat menempuh hidup baru untuk Dimas & Adinda. Semoga sakinah mawaddah warahmah selalu sampai maut memisahkan.",
      createdAt: '2026-09-28T10:15:00.000Z',
    },
    {
      id: 'wish-2',
      name: 'Rangga & Tim Studio Arsitektur',
      relationship: 'Rekan Kerja',
      message: 'Selamat ya Mas Dimas dan Mbak Dinda! Akhirnya berlabuh ke pelaminan. Semoga rumah tangganya penuh cinta, kedamaian, dan rezeki yang melimpah berkah. Happy wedding!',
      createdAt: '2026-09-28T18:30:00.000Z',
    },
    {
      id: 'wish-3',
      name: 'Clara Salsabila',
      relationship: 'Sahabat',
      message: 'Dindaaa terharu banget liat video cinematic prewedding kalian, cantik dan gagah banget! Bahagia terus ya sama Dimas, saling menjaga dan saling melengkapi selamanya. Love you!',
      createdAt: '2026-09-29T08:45:00.000Z',
    },
    {
      id: 'wish-4',
      name: 'Fajar Nugraha',
      relationship: 'Sahabat',
      message: 'Bro Dimas, selamat bro! Sukses terus acaranya, semoga diberi kelancaran sampai hari H dan selamanya jadi nahkoda keluarga yang bijaksana dan penuh kasih sayang.',
      createdAt: '2026-09-29T14:10:00.000Z',
    },
  ],
};

function getDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), 'utf-8');
      return initialDb;
    }
    const content = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error('Error reading db:', err);
    return initialDb;
  }
}

function saveDb(data: DatabaseSchema) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving db:', err);
  }
}

// API Routes
app.get('/api/rsvp', (_req, res) => {
  const db = getDb();
  res.json(db.rsvp);
});

app.post('/api/rsvp', (req, res) => {
  const { name, attendance, guestCount, phone, notes } = req.body;
  if (!name || !attendance) {
    return res.status(400).json({ error: 'Name and attendance are required' });
  }

  const db = getDb();
  const newEntry = {
    id: 'rsvp-' + Date.now(),
    name: String(name).trim(),
    attendance: attendance,
    guestCount: Number(guestCount) || 1,
    phone: phone ? String(phone).trim() : undefined,
    notes: notes ? String(notes).trim() : undefined,
    createdAt: new Date().toISOString(),
  };

  // Replace if existing name or prepend
  const existingIdx = db.rsvp.findIndex((r) => r.name.toLowerCase() === newEntry.name.toLowerCase());
  if (existingIdx >= 0) {
    db.rsvp[existingIdx] = newEntry;
  } else {
    db.rsvp.unshift(newEntry);
  }

  saveDb(db);
  res.status(201).json(newEntry);
});

app.get('/api/guestbook', (_req, res) => {
  const db = getDb();
  res.json(db.guestbook);
});

app.post('/api/guestbook', (req, res) => {
  const { name, relationship, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message are required' });
  }

  const db = getDb();
  const newEntry = {
    id: 'wish-' + Date.now(),
    name: String(name).trim(),
    relationship: relationship ? String(relationship).trim() : 'Kerabat',
    message: String(message).trim(),
    createdAt: new Date().toISOString(),
  };

  db.guestbook.unshift(newEntry);
  saveDb(db);
  res.status(201).json(newEntry);
});

// Dev server / Vite middleware setup or Production static serve
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
