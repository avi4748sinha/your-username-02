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
  nightAmbient: {
    id: "nightAmbient",
    video: `${A}/3335a5c1-848e-45b7-817e-791c5a4d0572/night-ambient.mp4`,
    poster: `${A}/e2b0d837-c5fd-41a2-88f7-6b8d5dc0b222/night-ambient.jpg`,
    label: "Diyas at Dusk",
    category: "night",
  },
  offerings: {
    id: "offerings",
    video: `${A}/eb90b19b-d123-4141-990c-0f0327d93cf3/offerings.mp4`,
    poster: `${A}/e77a48d4-e854-4b31-941d-1c81216860cd/offerings.jpg`,
    label: "The Soop",
    category: "offerings",
  },
  riverDiyas: {
    id: "riverDiyas",
    video: `${A}/269ff7ff-8ff9-4bcc-b88a-5c27b9b5a13a/river-diyas.mp4`,
    poster: `${A}/9d13d83b-0198-4daa-95c8-5da823ad53cd/river-diyas.jpg`,
    label: "Lamps on the Bank",
    category: "night",
  },
  candleRow: {
    id: "candleRow",
    video: `${A}/907beed0-1af4-4b6e-a268-46fe93b192bf/candle-row.mp4`,
    poster: `${A}/e14c1981-ca96-4aad-8a25-16ce19fb2fa1/candle-row.jpg`,
    label: "A Line of Candles",
    category: "night",
  },
  vratiDawn: {
    id: "vratiDawn",
    video: `${A}/639db620-0ef2-4af8-a750-8997f8889856/vrati-dawn.mp4`,
    poster: `${A}/90123432-c31e-4bc3-bd81-90d65c6906b1/vrati-dawn.jpg`,
    label: "Waist-deep at Dawn",
    category: "people",
  },
} satisfies Record<string, Clip>;

export const clipList: Clip[] = Object.values(clips);

/** The opening film — this one keeps its own sound and plays on entry. */
export const introFilm = {
  id: "introFilm",
  video: "/__l5e/assets-v1/2f9b3679-51ae-41ce-9c7d-a54c108072a7/intro-anthem.mp4",
  poster: "/__l5e/assets-v1/79cef30d-8b87-4032-b37c-d28d87be524c/intro-anthem.jpg",
  label: "Rafiganj, opening film",
  category: "ghat",
} satisfies Clip;

/** Full-screen ambience that starts once the visitor enters. */
export const ambientClip = clips.nightAmbient;

/** The backdrop cross-fades through these, so the page never sits still. */
export const ambientClips: Clip[] = [
  clips.nightAmbient,
  clips.candleRow,
  clips.riverDiyas,
  clips.droneWater,
  clips.vratiDawn,
  clips.sunriseTemple,
];

export const galleryCategories = [
  { id: "all", label: "All" },
  { id: "ghat", label: "The Ghat" },
  { id: "people", label: "People" },
  { id: "offerings", label: "Offerings" },
  { id: "night", label: "Night" },
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
    desc: "Ritual bath, first sattvik meal.",
    clip: clips.ghatWalk,
  },
  {
    id: "kharna",
    name: "Kharna",
    native: "खरना",
    date: ist("2026-11-14T18:00:00"),
    dateLabel: "14 Nov 2026",
    desc: "Day-long fast, broken at dusk with kheer.",
    clip: clips.prasad,
  },
  {
    id: "sandhya",
    name: "Sandhya Arghya",
    native: "संध्या अर्घ्य",
    date: ist("2026-11-15T17:05:00"),
    dateLabel: "15 Nov 2026",
    desc: "First offering, to the setting sun.",
    clip: clips.droneGhat,
  },
  {
    id: "pratah",
    name: "Pratah Arghya",
    native: "प्रातः अर्घ्य",
    date: ist("2026-11-16T06:05:00"),
    dateLabel: "16 Nov 2026",
    desc: "Offering to the rising sun.",
    clip: clips.sunriseTemple,
  },
  {
    id: "paran",
    name: "Paran",
    native: "पारण",
    date: ist("2026-11-16T08:30:00"),
    dateLabel: "16 Nov 2026",
    desc: "Thirty-six hours end. Prasad is shared.",
    clip: clips.waterCrowd,
  },
];

export const story = [
  { n: "01", clip: clips.droneGhat, title: "The Ghat", sub: "One bend of water. The whole town." },
  { n: "02", clip: clips.prasad, title: "Preparation", sub: "Thekua, cane, fruit — all by hand." },
  { n: "03", clip: clips.offerings, title: "The Soop", sub: "Everything the river will be offered." },
  { n: "04", clip: clips.devotee, title: "The Vratis", sub: "Thirty-six hours, carried quietly." },
  { n: "05", clip: clips.arghyaThali, title: "Sandhya Arghya", sub: "The first offering leaves with the sun." },
  { n: "06", clip: clips.riverDiyas, title: "The Night", sub: "Lamps down the bank, light on water." },
  { n: "07", clip: clips.sunriseTemple, title: "Pratah Arghya", sub: "The ghat turns east together." },
  { n: "08", clip: clips.waterCrowd, title: "After", sub: "The water settles. Everyone walks home." },
];

// ── Music: streamed live from YouTube ───────────────────────────────────
export type Track = { id: string; title: string; artist: string; cat: string; hit?: boolean };

export const musicCategories = [
  { id: "all", label: "All" },
  { id: "hit", label: "Goosebumps" },
  { id: "legend", label: "Sharda Sinha" },
  { id: "arghya", label: "Arghya" },
  { id: "folk", label: "Folk" },
  { id: "new", label: "New" },
];

export const tracks: Track[] = [
  { id: "DG8F-csoRAQ", hit: true, title: "Pahile Pahil Chhathi Maiya", artist: "Sharda Sinha", cat: "legend" },
  { id: "knZ8b5YnQiY", hit: true, title: "Kelwa Ke Paat Par", artist: "Sharda Sinha", cat: "legend" },
  { id: "fOVGz9WFymU", hit: true, title: "Ho Deenanath", artist: "Sharda Sinha", cat: "legend" },
  { id: "gh6cssL0dr8", title: "Best of Sharda Sinha (Jukebox)", artist: "Sharda Sinha", cat: "legend" },
  { id: "j9G3caThH98", hit: true, title: "Uthau Suruj Bhaile Bihaan", artist: "Sharda Sinha", cat: "arghya" },
  { id: "6DePUrUWtmE", title: "Chhathi Maiya — Full Jukebox", artist: "Sharda Sinha", cat: "arghya" },
  { id: "vSMnJ9BFtLE", title: "Suna Chhathi Maiya", artist: "Anuradha Paudwal", cat: "arghya" },
  { id: "0v0PW0AsCiE", title: "Marbo Re Sugwa Dhanukh Se", artist: "Sharda Sinha", cat: "folk" },
  { id: "9Q9c8bUtWSA", title: "Chhath Geet — Traditional", artist: "Vinod Rathod", cat: "folk" },
  { id: "8BfbY0vb7Ro", title: "Aahe Aaditmal", artist: "Pandey Sisters", cat: "folk" },
  { id: "FPDKM5NidYM", hit: true, title: "Kawana Kalamwa Se Likhla Karamwa", artist: "Pawan Singh", cat: "new" },
  { id: "tnARZzZ4oE0", hit: true, title: "Koshiya Bharaye Lagal", artist: "Neelkamal Singh", cat: "new" },
  { id: "8ZmAqvJmXhs", title: "Chhathi Maiya Aaili Anganwa", artist: "Khesari Lal Yadav", cat: "new" },
  { id: "5ZUCVGKlxD0", title: "Bahangi Lachkat Jaye", artist: "Kalpana Patowary", cat: "new" },
  { id: "8yGZfM_o3rE", title: "Chhathi Maiya Ke Mahima", artist: "Sharda Sinha", cat: "legend" },
  { id: "9r4vGZ1CmzI", title: "Daura Ghat Par Pahunchai", artist: "Sharda Sinha", cat: "arghya" },
  { id: "0kEPTHY7WjE", title: "Sooraj Ke Rathwa", artist: "Anuradha Paudwal", cat: "arghya" },
  { id: "Bd_1v6b9VJk", title: "Rojahi Rojahi Ugelan Suruj Dev", artist: "Traditional", cat: "folk" },
  { id: "1FIpvpXjXNw", title: "Chhath Ke Barat", artist: "Maithili Thakur", cat: "new" },
  { id: "cw3fY6q7Sxg", title: "Kelwa Je Fadela", artist: "Maithili Thakur", cat: "folk" },
];

export const GITHUB_URL = "https://github.com/avi4748sinha";
export const OWNER = "Avinash";
