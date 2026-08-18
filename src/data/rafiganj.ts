// Central config for the Rafiganj Chhath Puja 2026 experience.
// All media, dates, captions and copy live here.

const A = "/__l5e/assets-v1";

export type Clip = { id: string; video: string; poster: string; label: string; category: string };

export const clips = {
  ghatWalk: {
    id: "ghatWalk",
    video: `${A}/324f8252-aeb8-45e6-b8de-cf900e60b30d/ghat-walk.mp4`,
    poster: `${A}/2ccceb97-0b10-4ff9-9950-0436fc2dfb42/ghat-walk.jpg`,
    label: "घाट की ओर",
    category: "shraddhalu",
  },
  devotee: {
    id: "devotee",
    video: `${A}/de862eeb-7f14-4948-bb36-e86d8b8b96f1/devotee.mp4`,
    poster: `${A}/a8bdfe3c-5f3f-4d52-81dd-5250df70ec10/devotee.jpg`,
    label: "व्रती माँ",
    category: "shraddhalu",
  },
  arghyaThali: {
    id: "arghyaThali",
    video: `${A}/fcc3557c-f2d2-406a-94e8-ab8d83bd12f7/arghya-thali.mp4`,
    poster: `${A}/ff5c8163-6888-4ed7-9752-edae661a984d/arghya-thali.jpg`,
    label: "अर्घ्य की थाली",
    category: "tokri",
  },
  templeCrowd: {
    id: "templeCrowd",
    video: `${A}/4f7cab88-a10b-4401-bf3e-9e72c9c5c363/temple-crowd.mp4`,
    poster: `${A}/e57e97fa-4208-46a4-8002-a9fab0fc0219/temple-crowd.jpg`,
    label: "मंदिर के पास",
    category: "mandir",
  },
  droneGhat: {
    id: "droneGhat",
    video: `${A}/20bffe1c-488d-48f1-8d75-f682ff0d43e2/drone-ghat.mp4`,
    poster: `${A}/b2aa1d6f-d0be-445b-b03c-e68174920190/drone-ghat.jpg`,
    label: "रफीगंज का घाट",
    category: "sandhya",
  },
  droneWater: {
    id: "droneWater",
    video: `${A}/247941d2-2f30-4d28-a7b5-f51388fe4804/drone-water.mp4`,
    poster: `${A}/8a8626b8-ebac-4a86-890b-1eaaa7de8f82/drone-water.jpg`,
    label: "पानी और परछाई",
    category: "roshni",
  },
  sunriseTemple: {
    id: "sunriseTemple",
    video: `${A}/9b34fe22-a626-4443-82bf-35733180ffde/sunrise-temple.mp4`,
    poster: `${A}/2b36074f-d57f-4ba5-b3eb-d6bdc93b3b8d/sunrise-temple.jpg`,
    label: "उषा अर्घ्य",
    category: "pratah",
  },
  prasad: {
    id: "prasad",
    video: `${A}/f438ccd6-ee99-434e-923b-b929ad1f4a56/prasad.mp4`,
    poster: `${A}/b4b470cf-9397-4c46-bf04-cfd44c34f2bf/prasad.jpg`,
    label: "प्रसाद की तैयारी",
    category: "tokri",
  },
  waterCrowd: {
    id: "waterCrowd",
    video: `${A}/2b02a477-d772-4904-ad50-63ce01c64e49/water-crowd.mp4`,
    poster: `${A}/4a36b8bc-27cd-4902-8f34-ae7342605fbc/water-crowd.jpg`,
    label: "जल में आस्था",
    category: "yaadein",
  },
} satisfies Record<string, Clip>;

export const clipList: Clip[] = Object.values(clips);

export const galleryCategories = [
  { id: "all", label: "सब", icon: "❤️" },
  { id: "sandhya", label: "संध्या अर्घ्य", icon: "🌅" },
  { id: "pratah", label: "प्रातः अर्घ्य", icon: "☀️" },
  { id: "roshni", label: "घाट की रोशनी", icon: "🪔" },
  { id: "tokri", label: "छठ की टोकरी", icon: "🌾" },
  { id: "shraddhalu", label: "श्रद्धालु", icon: "🙏" },
  { id: "mandir", label: "मंदिर", icon: "🛕" },
  { id: "yaadein", label: "रफीगंज की यादें", icon: "❤️" },
];

// ── Chhath Puja 2026 (Kartik Shukla) — times in IST (UTC+5:30) ──────────
const IST = "+05:30";
const ist = (s: string) => new Date(`${s}${IST}`);

export type Stage = {
  id: string;
  name: string;
  icon: string;
  date: Date;
  dateLabel: string;
  desc: string;
  clip: Clip;
};

export const stages: Stage[] = [
  {
    id: "nahay",
    name: "नहाय-खाय",
    icon: "🛁",
    date: ist("2026-11-13T07:00:00"),
    dateLabel: "13 नवम्बर 2026",
    desc: "स्नान, शुद्धता और व्रत की शुरुआत। कद्दू-भात का पहला प्रसाद।",
    clip: clips.ghatWalk,
  },
  {
    id: "kharna",
    name: "खरना",
    icon: "🍚",
    date: ist("2026-11-14T18:00:00"),
    dateLabel: "14 नवम्बर 2026",
    desc: "दिनभर का निर्जला उपवास, शाम को गुड़ की खीर और रोटी।",
    clip: clips.prasad,
  },
  {
    id: "sandhya",
    name: "संध्या अर्घ्य",
    icon: "🌇",
    date: ist("2026-11-15T17:05:00"),
    dateLabel: "15 नवम्बर 2026",
    desc: "डूबते सूरज को पहला अर्घ्य। रफीगंज का घाट भर जाता है।",
    clip: clips.droneGhat,
  },
  {
    id: "pratah",
    name: "प्रातः अर्घ्य",
    icon: "🌅",
    date: ist("2026-11-16T06:05:00"),
    dateLabel: "16 नवम्बर 2026",
    desc: "उगते सूरज को अर्घ्य — उषा अर्घ्य, महापर्व का शिखर।",
    clip: clips.sunriseTemple,
  },
  {
    id: "paran",
    name: "पारण",
    icon: "🙏",
    date: ist("2026-11-16T08:30:00"),
    dateLabel: "16 नवम्बर 2026",
    desc: "36 घंटे का व्रत पूरा। प्रसाद ग्रहण और छठी मैया का आशीर्वाद।",
    clip: clips.waterCrowd,
  },
];

export const story = [
  {
    n: "01",
    clip: clips.droneGhat,
    title: "ये सिर्फ घाट नहीं…",
    sub: "यहाँ हर साल पूरा रफीगंज एक साथ खड़ा होता है।",
  },
  {
    n: "02",
    clip: clips.prasad,
    title: "हर तैयारी में एक विश्वास…",
    sub: "ठेकुआ, गन्ना, फल — सब कुछ मन से।",
  },
  {
    n: "03",
    clip: clips.devotee,
    title: "हर चेहरे पर एक प्रार्थना…",
    sub: "व्रती माँओं का 36 घंटे का संकल्प।",
  },
  {
    n: "04",
    clip: clips.arghyaThali,
    title: "हर डूबते सूरज को एक प्रणाम…",
    sub: "संध्या अर्घ्य — जल में उतरती आस्था।",
  },
  {
    n: "05",
    clip: clips.droneWater,
    title: "रात भी यहाँ रोशनी से भर जाती है…",
    sub: "दीये, सजावट और पानी में काँपती परछाइयाँ।",
  },
  {
    n: "06",
    clip: clips.sunriseTemple,
    title: "और उगते सूरज के साथ…",
    sub: "प्रातः अर्घ्य — पूरा घाट एक स्वर में।",
  },
  {
    n: "07",
    clip: clips.waterCrowd,
    title: "एक नई उम्मीद जन्म लेती है। ❤️",
    sub: "जय छठी मैया 🙏",
  },
];

export const musicCategories = [
  { id: "sandhya", label: "संध्या अर्घ्य", icon: "🌅" },
  { id: "pratah", label: "प्रातः अर्घ्य", icon: "☀️" },
  { id: "maiya", label: "छठी मैया", icon: "🙏" },
  { id: "rafiganj", label: "रफीगंज स्पेशल", icon: "❤️" },
];

export const GITHUB_URL = "https://github.com/avi4748sinha";
