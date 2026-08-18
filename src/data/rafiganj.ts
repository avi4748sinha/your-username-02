// Central config for the Rafiganj Chhath Puja 2026 experience.
// All media, dates, captions and copy live here.

const A = "/__l5e/assets-v1";

export type Clip = { id: string; video: string; poster: string; label: string; category: string };

export const clips = {
  ghatWalk: {
    id: "ghatWalk",
    video: `${A}/324f8252-aeb8-45e6-b8de-cf900e60b30d/ghat-walk.mp4`,
    poster: `${A}/2ccceb97-0b10-4ff9-9950-0436fc2dfb42/ghat-walk.jpg`,
    label: "Walk to the Ghat",
    category: "people",
  },
  devotee: {
    id: "devotee",
    video: `${A}/de862eeb-7f14-4948-bb36-e86d8b8b96f1/devotee.mp4`,
    poster: `${A}/a8bdfe3c-5f3f-4d52-81dd-5250df70ec10/devotee.jpg`,
    label: "The Vratis",
    category: "people",
  },
  arghyaThali: {
    id: "arghyaThali",
    video: `${A}/fcc3557c-f2d2-406a-94e8-ab8d83bd12f7/arghya-thali.mp4`,
    poster: `${A}/ff5c8163-6888-4ed7-9752-edae661a984d/arghya-thali.jpg`,
    label: "Arghya Offering",
    category: "offerings",
  },
  templeCrowd: {
    id: "templeCrowd",
    video: `${A}/4f7cab88-a10b-4401-bf3e-9e72c9c5c363/temple-crowd.mp4`,
    poster: `${A}/e57e97fa-4208-46a4-8002-a9fab0fc0219/temple-crowd.jpg`,
    label: "Near the Temple",
    category: "temple",
  },
  droneGhat: {
    id: "droneGhat",
    video: `${A}/144a7aa4-bd03-4aaf-8a0f-db45da09e31e/drone-ghat.mp4`,
    poster: `${A}/cf3138ed-2fcf-4ae0-981c-f3691e5e3e79/drone-ghat.jpg`,
    label: "Rafiganj Ghat",
    category: "ghat",
  },
  droneWater: {
    id: "droneWater",
    video: `${A}/4fccb500-e9ca-486a-9974-e01fd10b9d66/drone-water.mp4`,
    poster: `${A}/35e64a10-98d4-49eb-90ee-d2b10205a9e6/drone-water.jpg`,
    label: "Water & Reflections",
    category: "ghat",
  },
  sunriseTemple: {
    id: "sunriseTemple",
    video: `${A}/9b34fe22-a626-4443-82bf-35733180ffde/sunrise-temple.mp4`,
    poster: `${A}/2b36074f-d57f-4ba5-b3eb-d6bdc93b3b8d/sunrise-temple.jpg`,
    label: "Morning Arghya",
    category: "morning",
  },
  prasad: {
    id: "prasad",
    video: `${A}/f438ccd6-ee99-434e-923b-b929ad1f4a56/prasad.mp4`,
    poster: `${A}/b4b470cf-9397-4c46-bf04-cfd44c34f2bf/prasad.jpg`,
    label: "Prasad Preparation",
    category: "offerings",
  },
  waterCrowd: {
    id: "waterCrowd",
    video: `${A}/2b02a477-d772-4904-ad50-63ce01c64e49/water-crowd.mp4`,
    poster: `${A}/4a36b8bc-27cd-4902-8f34-ae7342605fbc/water-crowd.jpg`,
    label: "Faith in the Water",
    category: "people",
  },
} satisfies Record<string, Clip>;

export const clipList: Clip[] = Object.values(clips);

export const galleryCategories = [
  { id: "all", label: "All" },
  { id: "ghat", label: "The Ghat" },
  { id: "people", label: "People" },
  { id: "offerings", label: "Offerings" },
  { id: "morning", label: "Morning" },
  { id: "temple", label: "Temple" },
];

// ── Chhath Puja 2026 (Kartik Shukla) — times in IST (UTC+5:30) ──────────
const IST = "+05:30";
const ist = (s: string) => new Date(`${s}${IST}`);

export type Stage = {
  id: string;
  name: string;
  native: string;
  date: Date;
  dateLabel: string;
  desc: string;
  clip: Clip;
};

export const stages: Stage[] = [
  {
    id: "nahay",
    name: "Nahay Khay",
    native: "नहाय-खाय",
    date: ist("2026-11-13T07:00:00"),
    dateLabel: "13 Nov 2026",
    desc: "The fast begins with a ritual bath and the first sattvik meal of the festival.",
    clip: clips.ghatWalk,
  },
  {
    id: "kharna",
    name: "Kharna",
    native: "खरना",
    date: ist("2026-11-14T18:00:00"),
    dateLabel: "14 Nov 2026",
    desc: "A day-long fast without water, broken at dusk with jaggery kheer and roti.",
    clip: clips.prasad,
  },
  {
    id: "sandhya",
    name: "Sandhya Arghya",
    native: "संध्या अर्घ्य",
    date: ist("2026-11-15T17:05:00"),
    dateLabel: "15 Nov 2026",
    desc: "The first offering, made to the setting sun. Every ghat in Rafiganj fills up.",
    clip: clips.droneGhat,
  },
  {
    id: "pratah",
    name: "Pratah Arghya",
    native: "प्रातः अर्घ्य",
    date: ist("2026-11-16T06:05:00"),
    dateLabel: "16 Nov 2026",
    desc: "The offering to the rising sun — the high point of the four days.",
    clip: clips.sunriseTemple,
  },
  {
    id: "paran",
    name: "Paran",
    native: "पारण",
    date: ist("2026-11-16T08:30:00"),
    dateLabel: "16 Nov 2026",
    desc: "Thirty-six hours of fasting end. Prasad is shared across the neighbourhood.",
    clip: clips.waterCrowd,
  },
];

export const story = [
  {
    n: "01",
    clip: clips.droneGhat,
    title: "The Ghat",
    sub: "One bend of water where the whole town shows up, year after year.",
  },
  {
    n: "02",
    clip: clips.prasad,
    title: "Preparation",
    sub: "Thekua, sugarcane, fruit — everything made by hand, at home.",
  },
  {
    n: "03",
    clip: clips.devotee,
    title: "The Devotees",
    sub: "Thirty-six hours of fasting, carried quietly.",
  },
  {
    n: "04",
    clip: clips.arghyaThali,
    title: "Evening Arghya",
    sub: "The first offering goes to the sun that is leaving.",
  },
  {
    n: "05",
    clip: clips.droneWater,
    title: "The Night",
    sub: "Lamps on the steps, light shivering on the water.",
  },
  {
    n: "06",
    clip: clips.sunriseTemple,
    title: "Morning Arghya",
    sub: "The whole ghat turns east at the same moment.",
  },
  {
    n: "07",
    clip: clips.waterCrowd,
    title: "After",
    sub: "The water settles. Everyone walks home together.",
  },
];

// ── Music: streamed live from YouTube ───────────────────────────────────
export type Track = { id: string; title: string; artist: string; cat: string };

export const musicCategories = [
  { id: "classics", label: "Classics" },
  { id: "arghya", label: "Arghya" },
  { id: "new", label: "New 2025" },
];

export const tracks: Track[] = [
  { id: "DG8F-csoRAQ", title: "Pahile Pahil Chhathi Maiya", artist: "Sharda Sinha", cat: "classics" },
  { id: "knZ8b5YnQiY", title: "Kelwa Ke Paat Par", artist: "Sharda Sinha", cat: "classics" },
  { id: "gh6cssL0dr8", title: "Best of Sharda Sinha (Jukebox)", artist: "Sharda Sinha", cat: "classics" },
  { id: "fOVGz9WFymU", title: "Ho Deenanath", artist: "Sharda Sinha", cat: "arghya" },
  { id: "j9G3caThH98", title: "Uthau Suruj Bhaile Bihaan", artist: "Sharda Sinha", cat: "arghya" },
  { id: "6DePUrUWtmE", title: "Chhathi Maiya — Full Jukebox", artist: "Sharda Sinha", cat: "arghya" },
  { id: "FPDKM5NidYM", title: "Kawana Kalamwa Se Likhla Karamwa", artist: "Pawan Singh", cat: "new" },
  { id: "tnARZzZ4oE0", title: "Koshiya Bharaye Lagal", artist: "Neelkamal Singh", cat: "new" },
  { id: "8BfbY0vb7Ro", title: "Aahe Aaditmal", artist: "Pandey Sisters", cat: "new" },
];

export const GITHUB_URL = "https://github.com/avi4748sinha";
