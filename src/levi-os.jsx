import React, { useState, useEffect, useCallback, useRef } from "react";
import { createRoot } from "react-dom/client";

/* ---------------- Minimal inline icon set (no external dependency) ---------------- */
function Icon({ children, size = 16, color = "currentColor", className = "" }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}
const Sun = (p) => <Icon {...p}><circle cx="12" cy="12" r="4" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.2" y1="4.2" x2="5.6" y2="5.6" /><line x1="18.4" y1="18.4" x2="19.8" y2="19.8" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.2" y1="19.8" x2="5.6" y2="18.4" /><line x1="18.4" y1="5.6" x2="19.8" y2="4.2" /></Icon>;
const Moon = (p) => <Icon {...p}><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" /></Icon>;
const Compass = (p) => <Icon {...p}><circle cx="12" cy="12" r="9" /><polygon points="15,9 13,13 9,15 11,11" /></Icon>;
const CalendarDays = (p) => <Icon {...p}><rect x="4" y="5" width="16" height="15" rx="1.5" /><line x1="4" y1="9" x2="20" y2="9" /><line x1="8" y1="3" x2="8" y2="6" /><line x1="16" y1="3" x2="16" y2="6" /></Icon>;
const Brain = (p) => <Icon {...p}><path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-1 5.5A3 3 0 0 0 8 18a3 3 0 0 0 3-3V6a2 2 0 0 0-2-2z" /><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 1 5.5A3 3 0 0 1 16 18a3 3 0 0 1-3-3V6a2 2 0 0 1 2-2z" /></Icon>;
const Dumbbell = (p) => <Icon {...p}><line x1="6" y1="12" x2="18" y2="12" /><rect x="2.5" y="9" width="3" height="6" rx="0.8" /><rect x="18.5" y="9" width="3" height="6" rx="0.8" /></Icon>;
const GraduationCap = (p) => <Icon {...p}><path d="M12 4 2 9l10 5 10-5-10-5z" /><path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5" /></Icon>;
const Sparkles = (p) => <Icon {...p}><path d="M12 3 L14 10 L21 12 L14 14 L12 21 L10 14 L3 12 L10 10 Z" /></Icon>;
const BookOpen = (p) => <Icon {...p}><path d="M3 5c3-1 6-1 9 1v13c-3-2-6-2-9-1z" /><path d="M21 5c-3-1-6-1-9 1v13c3-2 6-2 9-1z" /></Icon>;
const ListChecks = (p) => <Icon {...p}><polyline points="3,7 5,9 9,5" /><line x1="12" y1="7" x2="21" y2="7" /><polyline points="3,15 5,17 9,13" /><line x1="12" y1="15" x2="21" y2="15" /></Icon>;
const ArchiveIcon = (p) => <Icon {...p}><rect x="3" y="4" width="18" height="4" rx="1" /><path d="M5 8v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8" /><line x1="10" y1="12" x2="14" y2="12" /></Icon>;
const Feather = (p) => <Icon {...p}><line x1="19" y1="5" x2="6" y2="18" /><path d="M14.5 6.5c2 2 2 6 0 8s-6 2-8 0" /><line x1="9" y1="15" x2="5" y2="19" /></Icon>;
const Plus = (p) => <Icon {...p}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></Icon>;
const Check = (p) => <Icon {...p}><polyline points="4,12 9,17 20,6" /></Icon>;
const X = (p) => <Icon {...p}><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></Icon>;
const Flame = (p) => <Icon {...p}><path d="M12 2c1 4-3 5-3 9a3 3 0 0 0 6 0c0-1-1-2-1-3 2 1 3 3 3 5a5 5 0 0 1-10 0c0-5 3-6 5-11z" /></Icon>;
const Droplets = (p) => <Icon {...p}><path d="M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11z" /></Icon>;
const TrendingUp = (p) => <Icon {...p}><polyline points="3,17 10,10 14,14 21,6" /><polyline points="15,6 21,6 21,12" /></Icon>;
const ChevronRight = (p) => <Icon {...p}><polyline points="9,5 16,12 9,19" /></Icon>;
const ChevronLeft = (p) => <Icon {...p}><polyline points="15,5 8,12 15,19" /></Icon>;
const Trash2 = (p) => <Icon {...p}><line x1="4" y1="7" x2="20" y2="7" /><path d="M6 7v13a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7" /><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></Icon>;
const ShoppingBag = (p) => <Icon {...p}><path d="M6 8h12l-1 12H7z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></Icon>;
const SettingsIcon = (p) => <Icon {...p}><circle cx="12" cy="12" r="3" /><path d="M19 12a7 7 0 0 0-.1-1.1l2-1.6-2-3.4-2.4.7a7 7 0 0 0-1.9-1.1L14 3h-4l-.6 2.5a7 7 0 0 0-1.9 1.1l-2.4-.7-2 3.4 2 1.6a7 7 0 0 0 0 2.2l-2 1.6 2 3.4 2.4-.7a7 7 0 0 0 1.9 1.1L10 21h4l.6-2.5a7 7 0 0 0 1.9-1.1l2.4.7 2-3.4-2-1.6c.067-.36.1-.727.1-1.1z" /></Icon>;
const Search = (p) => <Icon {...p}><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.5" y2="16.5" /></Icon>;
const LayoutGrid = (p) => <Icon {...p}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></Icon>;
const TimerIcon = (p) => <Icon {...p}><circle cx="12" cy="13" r="8" /><line x1="12" y1="13" x2="12" y2="9" /><line x1="9" y1="2" x2="15" y2="2" /><line x1="12" y1="2" x2="12" y2="5" /></Icon>;
const MessageCircle = (p) => <Icon {...p}><path d="M4 12a8 8 0 1 1 3.5 6.6L4 20l1.2-3.6A8 8 0 0 1 4 12z" /></Icon>;
const ImageIcon = (p) => <Icon {...p}><rect x="3" y="4" width="18" height="16" rx="1.5" /><circle cx="9" cy="10" r="1.7" /><path d="M21 16l-5.5-5.5L4 21" /></Icon>;
const Utensils = (p) => <Icon {...p}><path d="M6 3v7a2 2 0 0 0 4 0V3" /><line x1="8" y1="10" x2="8" y2="21" /><path d="M17 3c-1.5 1-2 2.5-2 4.5S16 11 16 11v10" /></Icon>;
const Target = (p) => <Icon {...p}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="0.6" fill={p.color || "currentColor"} /></Icon>;
const FolderPlus = (p) => <Icon {...p}><path d="M3 6a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" /><line x1="12" y1="11" x2="12" y2="16" /><line x1="9.5" y1="13.5" x2="14.5" y2="13.5" /></Icon>;
const Battery = (p) => <Icon {...p}><rect x="2" y="8" width="17" height="8" rx="1.5" /><line x1="21" y1="10.5" x2="21" y2="13.5" /></Icon>;

/* ---------------------------------------------------------------
   THEME — Plum & Olive, editorial/minimal, fully user-customizable
   from Settings. T is a shared mutable object: values are updated
   in place from state.theme at the top of the root render, so every
   component reading T.xxx during that render pass sees fresh colors
   without needing a context provider.
------------------------------------------------------------------*/
const DEFAULT_THEME = {
  ink: "#FFFFFF",        // crisp white text
  paper: "#000000",      // deep midnight black
  parchment: "#141417",  // charcoal glass panels
  line: "#26262B",       // thin hairlines
  brass: "#A78BFA",      // neon purple — progress/gem glow
  brassSoft: "#7C5CFA",
  gold: "#D9B36C",       // champagne gold — headers, names, selected states (the mockup's signature)
  olive: "#22D3EE",      // electric cyan
  emerald: "#34D399",    // emerald green
  sub: "#8E8E93",        // muted gray
  bgImage: null,
};
const T = { ...DEFAULT_THEME };
// Holographic gradient used for rings, bars, and highlights app-wide.
const HOLO = () => `linear-gradient(90deg, ${T.olive}, ${T.brass}, ${T.emerald || "#34D399"})`;
// iOS-style liquid glass: translucent panel, heavy blur+saturation, hairline
// border, and a specular top edge. Needs something visible behind it (the
// ambient background layer or a user photo) to read as glass.
const GLASS = (alpha = 0.5) => ({
  background: `rgba(22, 22, 28, ${alpha})`,
  border: "1px solid rgba(255,255,255,0.10)",
  backdropFilter: "blur(28px) saturate(180%)",
  WebkitBackdropFilter: "blur(28px) saturate(180%)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), 0 12px 36px rgba(0,0,0,0.5)",
});

const PILLARS = {
  maintenance: { label: "Maintenance", color: "#F5C563" },
  deepwork: { label: "Deep Work", color: "#8B5CF6" },
  mastery: { label: "Mastery", color: "#4CE0D2" },
  life: { label: "Life", color: "#FF6B9D" },
};

const ENERGY = {
  high: { label: "High Energy", color: "#FF6B9D" },
  medium: { label: "Medium Energy", color: "#F5C563" },
  low: { label: "Low Energy", color: "#4CE0D2" },
};

const QUOTES = [
  "Discipline is choosing between what you want now and what you want most.",
  "Mystery equals respect. Let the work speak first.",
  "The next action is the only action.",
  "Build the person before you build the empire.",
  "Quiet consistency outlasts loud intensity.",
  "You're measuring consistency, not perfection.",
  "The identity makes the decision before the moment arrives.",
];

const STORAGE_KEY = "levi-os-state-v2";

const uid = () => Math.random().toString(36).slice(2, 10);
const todayStr = () => {
  const d = new Date();
  const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, "0"), day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};
const getQuarter = (d = new Date()) => `Q${Math.floor(d.getMonth() / 3) + 1}`;
const getYear = (d = new Date()) => String(d.getFullYear());
const getMonthName = (d = new Date()) => d.toLocaleString("default", { month: "long" });
const CURRENT_QUARTER = getQuarter();
const CURRENT_YEAR = getYear();

// Resize + compress an uploaded image client-side before storing it as a
// data URL, so photos don't blow past localStorage's ~5-10MB quota.
function fileToResizedDataURL(file, maxDim = 320, quality = 0.6) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > height && width > maxDim) { height = Math.round((height * maxDim) / width); width = maxDim; }
        else if (height > maxDim) { width = Math.round((width * maxDim) / height); height = maxDim; }
        const canvas = document.createElement("canvas");
        canvas.width = width; canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const DEFAULT_STATE = {
  lastActiveDate: todayStr(),
  theme: { ...DEFAULT_THEME },
  identity: {
    mission: "",
    vision: "Healthy. Intelligent. Cultured. Creative. Wealthy. Capable. Well-spoken.",
    motto: "",
    values: ["Discipline", "Craft", "Mystery"],
    nonNegotiables: ["Sleep 7+ hours", "Move daily", "Protect deep work blocks"],
    futureSelf: "",
    annualTheme: { year: CURRENT_YEAR, theme: "Build the foundation." },
    quarterlyFocus: [
      { id: uid(), text: "Finish applications", quarter: `${CURRENT_QUARTER} ${CURRENT_YEAR}`, done: false },
      { id: uid(), text: "Build Levi OS", quarter: `${CURRENT_QUARTER} ${CURRENT_YEAR}`, done: false },
    ],
    monthlyProjects: [
      { id: uid(), title: "Finish Korea and Poland applications", notes: "", month: getMonthName(), done: false },
      { id: uid(), title: "Build morning routine", notes: "", month: getMonthName(), done: false },
    ],
  },
  routines: {
    morning: [
      { id: uid(), text: "Wake up", done: false },
      { id: uid(), text: "Open blinds", done: false },
      { id: uid(), text: "Make the bed", done: false },
      { id: uid(), text: "10 minutes moving", done: false },
      { id: uid(), text: "Morning body maintenance", done: false },
      { id: uid(), text: "Breakfast", done: false },
      { id: uid(), text: "10 minutes reviewing Levi OS — what's today", done: false },
      { id: uid(), text: "Morning walk", done: false },
      { id: uid(), text: "Work", done: false },
    ],
    afternoon: [
      { id: uid(), text: "45 min–1 hr workout / calisthenics", done: false },
      { id: uid(), text: "Lunch", done: false },
      { id: uid(), text: "Deep work block", done: false },
      { id: uid(), text: "Skill block", done: false },
    ],
    evening: [
      { id: uid(), text: "Outside life block — go somewhere", done: false },
      { id: uid(), text: "Dinner", done: false },
    ],
    night: [
      { id: uid(), text: "Deep work block 2 (if needed)", done: false },
      { id: uid(), text: "Night reset — shower, skincare", done: false },
      { id: uid(), text: "Plan tomorrow", done: false },
      { id: uid(), text: "Journal", done: false },
      { id: uid(), text: "Read", done: false },
      { id: uid(), text: "Sleep", done: false },
    ],
  },
  // Recurring maintenance at longer cadences than daily. Each item tracks the
  // last date it was checked off; the "due" logic lives in the view. Editable.
  recurringRoutines: {
    weekly: [
      { id: uid(), text: "Wash hair", lastDone: null },
      { id: uid(), text: "Clean room", lastDone: null },
      { id: uid(), text: "Laundry", lastDone: null },
      { id: uid(), text: "Meal prep", lastDone: null },
      { id: uid(), text: "Grocery shopping", lastDone: null },
      { id: uid(), text: "Nails", lastDone: null },
    ],
    biweekly: [
      { id: uid(), text: "Eyebrows", lastDone: null },
      { id: uid(), text: "Deep clean room", lastDone: null },
      { id: uid(), text: "Shave / Nair", lastDone: null },
    ],
    monthly: [
      { id: uid(), text: "Hair treatment", lastDone: null },
      { id: uid(), text: "Declutter & donate", lastDone: null },
      { id: uid(), text: "Financial self-audit", lastDone: null },
      { id: uid(), text: "Update resume & portfolio", lastDone: null },
    ],
  },
  // Day themes remove decision fatigue — each weekday has a focus. Editable.
  dayThemes: {
    monday: "Admin + School",
    tuesday: "Career",
    wednesday: "Abroad",
    thursday: "Learning",
    friday: "RKR",
    saturday: "Adventure",
    sunday: "Reset",
  },
  // The repeating time-block skeleton. Same blocks every day; only the contents
  // change day to day (set in the Calendar). Fully editable.
  timeBlocks: [
    { id: uid(), time: "8:00–9:00", label: "Morning OS" },
    { id: uid(), time: "9:00–11:00", label: "Deep Work Block 1" },
    { id: uid(), time: "11:00–12:00", label: "Skill Block" },
    { id: uid(), time: "12:00–1:00", label: "Lunch" },
    { id: uid(), time: "1:00–2:30", label: "Workout / Walk" },
    { id: uid(), time: "2:30–4:30", label: "Deep Work Block 2" },
    { id: uid(), time: "4:30–6:30", label: "Outside Life Block" },
    { id: uid(), time: "6:30–7:30", label: "Dinner" },
    { id: uid(), time: "7:30–9:30", label: "Creative Block" },
    { id: uid(), time: "9:30–10:30", label: "Night Reset" },
    { id: uid(), time: "11:00", label: "In bed" },
  ],
  weeklyPlan: {
    monday: { bigThree: ["", "", ""], deepWork: "", skillFocus: "", items: [] },
    tuesday: { bigThree: ["", "", ""], deepWork: "", skillFocus: "", items: [] },
    wednesday: { bigThree: ["", "", ""], deepWork: "", skillFocus: "", items: [] },
    thursday: { bigThree: ["", "", ""], deepWork: "", skillFocus: "", items: [] },
    friday: { bigThree: ["", "", ""], deepWork: "", skillFocus: "", items: [] },
    saturday: { bigThree: ["", "", ""], deepWork: "", skillFocus: "", items: [] },
    sunday: { bigThree: ["", "", ""], deepWork: "", skillFocus: "", items: [] },
  },
  // Regenerated fresh each day from weeklyPlan — see applyDailyReset. Big
  // Three items and weekly items are read-only on Today (editing happens in
  // Planning). One-off items added in Planning > Daily also live here and
  // clear at the next day change.
  todayTasks: [],
  eveningScorecard: {
    slept: false, ateBreakfast: false, moved: false, read: false, skill: false,
    deepWork: false, outside: false, selfCare: false, plannedTomorrow: false,
  },
  dailyLog: [],
  brainDump: [],
  skills: [
    { id: uid(), name: "Chess", pillar: "mastery", level: 1, xp: 10, xpToNext: 100, hours: 4 },
    { id: uid(), name: "Writing", pillar: "mastery", level: 1, xp: 0, xpToNext: 100, hours: 0 },
    { id: uid(), name: "Drawing", pillar: "mastery", level: 1, xp: 0, xpToNext: 100, hours: 0 },
    { id: uid(), name: "Guitar", pillar: "mastery", level: 1, xp: 0, xpToNext: 100, hours: 0 },
    { id: uid(), name: "Piano", pillar: "mastery", level: 1, xp: 0, xpToNext: 100, hours: 0 },
    { id: uid(), name: "Horseback Riding", pillar: "life", level: 1, xp: 0, xpToNext: 100, hours: 0 },
    { id: uid(), name: "Racing", pillar: "life", level: 1, xp: 0, xpToNext: 100, hours: 0 },
    { id: uid(), name: "Shooting", pillar: "life", level: 1, xp: 0, xpToNext: 100, hours: 0 },
    { id: uid(), name: "Boxing", pillar: "life", level: 1, xp: 0, xpToNext: 100, hours: 0 },
    { id: uid(), name: "Italian", pillar: "mastery", level: 1, xp: 0, xpToNext: 100, hours: 0 },
    { id: uid(), name: "German", pillar: "mastery", level: 1, xp: 0, xpToNext: 100, hours: 0 },
    { id: uid(), name: "Russian", pillar: "mastery", level: 1, xp: 0, xpToNext: 100, hours: 0 },
    { id: uid(), name: "Photography", pillar: "life", level: 1, xp: 0, xpToNext: 100, hours: 0 },
  ],
  health: {
    sleepHours: 7,
    waterBottles: 0,
    waterGoal: 4,
    steps: 0,
    stepsGoal: 8000,
    supplements: [
      { id: uid(), name: "Magnesium Glycinate", time: "Night", taken: false },
      { id: uid(), name: "Omega-3 Fish Oil", time: "Morning", taken: false },
      { id: uid(), name: "Creatine", time: "Morning", taken: false },
      { id: uid(), name: "Collagen", time: "Morning", taken: false },
    ],
    nutrition: {
      fiberGoal: 30,
      proteinGoal: 130,
      log: [],
      recipes: [],
    },
    workouts: {
      days: [],
      history: [],
    },
  },
  journal: [],
  weeklyReview: {
    lastCompleted: null,
    answers: { mustHappen: "", skillTraining: "", experience: "", canWait: "" },
    customQuestions: [],
  },
  streaks: { current: 0, best: 0, lastCheckin: null },
  gems: 0,
  gemFlags: {},
  countdowns: [], // [{id,label,date}] shown on Home
  focusSessions: [],
  focusTimer: null,
  finances: { transactions: [] },
  calendarEvents: [],
  // The repeating daily schedule. scheduleTemplate holds timed blocks per
  // weekday; every day starts from its weekday's template. Once a specific
  // date is edited (drag, add, delete), that date's version is frozen into
  // daySchedules and stops following the template. Home's Today Schedule and
  // the Calendar day view both read and write this same model, so they stay
  // in sync. See resolveSchedule / SCHEDULE_TEMPLATE_DEFAULT below.
  scheduleTemplate: null, // filled by migration
  daySchedules: {},       // { "2025-08-16": [ {id,time,label,pillar,done}, ... ] }
  assistantChat: [],
  customSections: [],
  seeds: { contentV2: false, removeStarterSectionsV1: false, structuralV3: false, fiberAndSupplementsV1: false, scheduleV1: false, contentV4: false, antiInflV1: false, scheduleV3: false, routinesV2: false, nutritionIdeasV1: false, recipesV2: false, countdownsV2: false },
  archeor: {
    projects: [
      { id: uid(), name: "Investor pitch deck v2", status: "In Progress", pillar: "deepwork" },
      { id: uid(), name: "Talent marketplace wireframes", status: "Not Started", pillar: "deepwork" },
    ],
    ideas: [
      { id: uid(), text: "Seasonal showcase event tied to a city's creative calendar", source: "manual" },
    ],
    contentCalendar: [
      { id: uid(), date: "", title: "Teaser reel — brand manifesto", platform: "Instagram", done: false },
    ],
    roadmap: [
      { id: uid(), milestone: "Finalize brand identity system", quarter: "Q3", done: true },
      { id: uid(), milestone: "Close first cohort of talent", quarter: "Q3", done: false },
      { id: uid(), milestone: "Launch showcase event #1", quarter: "Q4", done: false },
      { id: uid(), milestone: "Open talent marketplace beta", quarter: "Q1 next year", done: false },
    ],
    finance: { revenue: 0, expenses: 0, runwayMonths: 0, fundingTarget: 0 },
    brand: {
      palette: ["Burgundy", "Burnt Orange", "Gold", "Forest Green", "Warm Ivory"],
      typography: "Editorial serif display, restrained sans body",
      principle: "Mystery equals respect — let the work speak first.",
    },
    links: [],
    meetingNotes: [],
  },
  education: {
    courses: [
      {
        id: uid(),
        name: "Marketing Strategy",
        assignments: [{ id: uid(), text: "Case study writeup — positioning", due: "", done: false }],
      },
    ],
    studySessions: [{ id: uid(), subject: "Marketing Strategy", day: "Mon", time: "6:00 PM", duration: "45 min" }],
    readingList: [{ id: uid(), title: "Positioning: The Battle for Your Mind", status: "Reading" }],
    flashcards: [{ id: uid(), front: "Blue Ocean Strategy", back: "Compete in uncontested market space instead of a saturated one.", box: 1 }],
  },
  shopping: {
    list: [],
    inventory: {
      wardrobe: [],
      skincare: [{ id: uid(), name: "Vitamin C Serum", replaceBy: "", note: "", image: null, link: "" }],
      tech: [],
      apartment: [],
    },
    wishlist: [],
  },
};

// If the calendar date has rolled over since the app was last open, archive
// yesterday into dailyLog, reset routines and daily trackers, and regenerate
// today's task list fresh from the weekly planning template.
const WEEKDAY_KEYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

// ---- Shared daily schedule engine -------------------------------------
// A block: { id, time ("HH:MM" 24h), label, pillar, done, locked }
// "locked" marks a non-negotiable (shown but still editable/movable).
const PILLAR_FOR = {
  "Morning OS": "maintenance", "Morning routine": "maintenance", "Wake": "maintenance",
  "Deep Work Block 1": "deepwork", "Deep Work Block 2": "deepwork", "Emails": "deepwork",
  "Lunch": "life", "Dinner": "life", "Workout / Walk": "mastery", "Outside Life Block": "life",
  "Guitar": "mastery", "Drawing": "mastery", "Chess": "mastery", "Language": "mastery",
  "Night Reset": "maintenance", "In bed": "maintenance",
};
function blk(time, label, pillar, locked, bk) {
  const o = { id: uid(), time, label, pillar: pillar || PILLAR_FOR[label] || "life", done: false, locked: !!locked };
  if (bk) o.bk = bk; // stable key: the same block on different weekdays shares it, so "Every day" edits can find it
  return o;
}
// One weekday's default timed schedule. Non-negotiables (locked) appear every
// day: Morning OS, Deep Work, Emails, the 4 skills, Workout, meals, Night Reset.
// Levi's exact daily skeleton (from her plan), with the Deep Work rotation
// and the rotating skill differing per weekday. Everything editable in-app.
const DEEPWORK_ROTATION = {
  monday: "School emails · FAFSA · Semester · Abroad",
  tuesday: "Job applications · Resume · LinkedIn · Upwork",
  wednesday: "Polygence research · Research writing · Papers",
  thursday: "Business (RKR) · Content · Brand · Roadmap",
  friday: "Finance · Budget · Credit · Weekly cleanup",
  saturday: "Creative projects · Photography · Writing · Catch-up",
  sunday: "Weekly Review · Meal prep · Laundry · Reset Levi OS",
};
const ROTATING_SKILL = {
  monday: "Public Speaking", tuesday: "Trading", wednesday: "Cooking", thursday: "Photography",
  friday: "Writing", saturday: "Korean · Graphic Design", sunday: "Free exploration",
};
function legacyDayBlocks(weekday) {
  const rot = DEEPWORK_ROTATION[weekday] || "Highest priority project";
  const skill = ROTATING_SKILL[weekday] || "Rotating skill";
  return [
    blk("08:00", "Morning OS", "maintenance", true),
    blk("09:00", `Deep Work #1 — ${rot}`, "deepwork", true),
    blk("10:30", "Break — walk, water", "life", false),
    blk("10:45", "Russian", "mastery", true),
    blk("11:45", "Admin — emails, paperwork, planning", "deepwork", true),
    blk("12:30", "Lunch", "life", true),
    blk("13:15", "Gym / Calisthenics", "mastery", true),
    blk("14:30", "Deep Work #2 — second priority", "deepwork", true),
    blk("16:00", "Chess", "mastery", true),
    blk("17:00", "Drawing", "mastery", true),
    blk("18:00", "Outside Life Block — café, library, walk", "life", false),
    blk("19:00", "Dinner", "life", true),
    blk("19:45", "Guitar", "mastery", true),
    blk("20:45", `Learning Block — ${skill}`, "mastery", false),
    blk("21:30", "Journal + Tomorrow Planning", "maintenance", true),
    blk("22:00", "Reading", "maintenance", true),
    blk("23:00", "Bed", "maintenance", true),
  ];
}

// Daily OS v3 (Nov 2026) — Levi's "final" daily schedule. Weekdays share one
// skeleton (each block has a stable `bk` key); the workout and Deep Work theme
// differ per day, Saturday and Sunday are reset/recovery days.
const WORKOUT_BY_DAY = {
  monday: "Lower Body", tuesday: "Upper Body", wednesday: "Dance Conditioning + Mobility",
  thursday: "Lower Body + Glutes", friday: "Calisthenics + Dance", saturday: "Mobility + Pilates",
};
function defaultDayBlocks(weekday) {
  const rot = DEEPWORK_ROTATION[weekday] || "Highest priority project";
  if (weekday === "sunday") {
    return [
      blk("08:00", "Morning OS", "maintenance", true, "morning"),
      blk("08:30", "High-protein breakfast", "life", false, "breakfast"),
      blk("09:15", "Morning walk", "life", true, "walk"),
      blk("10:00", "Stretch + Pilates — recovery day, no gym", "mastery", true, "sun-stretch"),
      blk("11:00", "Weekly Review + plan the calendar", "deepwork", true, "sun-review"),
      blk("12:00", "Retouch Block — hair · nails · brows (see Operating System)", "maintenance", false, "sun-retouch"),
      blk("13:15", "Lunch", "life", true, "lunch"),
      blk("14:00", "Dance practice", "mastery", true, "sun-dance"),
      blk("15:30", "Grocery shopping + Meal prep", "life", false, "sun-groc"),
      blk("17:30", "Reset — clean room · pillowcases · laundry", "maintenance", false, "sun-reset"),
      blk("18:30", "Weekly admin — finances · school · job apps · choose weekly skill", "deepwork", false, "sun-admin"),
      blk("19:30", "Dinner / decompress", "life", true, "dinner"),
      blk("20:30", "Skill session — one of Russian · Chess · Drawing · Guitar", "mastery", false, "sun-skill"),
      blk("21:15", "Skin night — microneedling (every other Sunday) + skincare", "maintenance", false, "sun-skin"),
      blk("21:45", "Update appointments + tomorrow planning", "maintenance", true, "planning"),
      blk("22:05", "Journal", "maintenance", true, "journal"),
      blk("22:20", "Read", "maintenance", true, "read"),
      blk("23:00", "Bed", "maintenance", true, "bed"),
    ];
  }
  const sat = weekday === "saturday";
  const out = [
    blk("07:00", "Morning OS", "maintenance", true, "morning"),
    blk("07:30", "High-protein breakfast", "life", false, "breakfast"),
    blk("08:00", "Review Levi OS + calendar", "maintenance", true, "review"),
    blk("08:10", "Morning walk", "life", true, "walk"),
    blk("08:40", "Set up for work / school", "maintenance", false, "setup"),
    blk("09:00", `Deep Work #1 — ${rot}`, "deepwork", true, "dw1"),
    blk("10:30", "Break", "life", false, "break1"),
    blk("10:45", "Russian", "mastery", true, "russian"),
    blk("11:45", "Admin — emails, small tasks", "deepwork", false, "admin"),
    blk("12:15", `Workout — ${WORKOUT_BY_DAY[weekday]}`, "mastery", true, "workout"),
    blk("13:00", "Lunch", "life", true, "lunch"),
    sat
      ? blk("13:30", "Care + Reset Block — hair wash · nails · brows · toes · laundry · deep clean (see Operating System)", "maintenance", false, "dw2")
      : blk("13:30", "Deep Work #2 — second priority", "deepwork", true, "dw2"),
    blk("15:30", "Break / reset", "life", false, "break2"),
    blk("16:00", "Chess", "mastery", true, "chess"),
    blk("17:00", "Drawing", "mastery", true, "drawing"),
    blk("18:00", "Outside Life Block — café, library, walk", "life", false, "outside"),
    blk("19:45", "Guitar — only if home", "mastery", false, "guitar"),
    blk("20:30", "Dinner / decompress", "life", true, "dinner"),
    blk("21:15", "Optional Work Block 3 / school review", "deepwork", false, "work3"),
    blk("21:30", "Shower + body care + skincare", "maintenance", true, "shower"),
    blk("22:00", "Tomorrow planning", "maintenance", true, "planning"),
    blk("22:15", "Journal", "maintenance", true, "journal"),
    blk("22:25", "Read", "maintenance", true, "read"),
    blk("23:00", "Bed", "maintenance", true, "bed"),
  ];
  return out;
}
function buildScheduleTemplate() {
  const t = {};
  for (const k of WEEKDAY_KEYS) t[k] = defaultDayBlocks(k);
  return t;
}
// Resolve the schedule for a given date string: an edited day (in daySchedules)
// wins; otherwise a fresh copy of that weekday's template.
function resolveSchedule(state, dateStr) {
  if (state.daySchedules && state.daySchedules[dateStr]) return state.daySchedules[dateStr];
  const wd = WEEKDAY_KEYS[new Date(dateStr + "T00:00:00").getDay()];
  const tmpl = (state.scheduleTemplate && state.scheduleTemplate[wd]) || defaultDayBlocks(wd);
  // deep copy with fresh ids so edits to one day never mutate the template
  // stable per-date ids (so typing in a field doesn't lose focus on re-render); stripped again when written back to a template
  return tmpl.map((b) => ({ ...b, id: String(b.id).split("@")[0] + "@" + dateStr }));
}
// Write an edited schedule for a specific date (freezes it away from template).
function writeDaySchedule(state, dateStr, blocks) {
  const sorted = [...blocks].sort((a, b) => (a.time || "").localeCompare(b.time || ""));
  return { ...state, daySchedules: { ...state.daySchedules, [dateStr]: sorted } };
}

// "Every day": apply the SAME change to every weekday's template. We work out
// what changed on the day being edited (added / removed / edited blocks) and
// replay it on the other six, matching blocks by their stable `bk` key — so
// swapping Russian for Gym everywhere leaves each day's own workout name and
// Deep Work theme alone.
function writeTemplateAllWeekdays(state, dateStr, prev, next) {
  const wd0 = WEEKDAY_KEYS[new Date(dateStr + "T00:00:00").getDay()];
  const prevById = new Map(prev.map((b) => [b.id, b]));
  const nextIds = new Set(next.map((b) => b.id));
  const added = next.filter((b) => !prevById.has(b.id));
  const removed = prev.filter((b) => !nextIds.has(b.id));
  const changed = next.filter((b) => { const o = prevById.get(b.id); return o && (o.time !== b.time || o.label !== b.label || o.pillar !== b.pillar); });
  const clean = (b) => ({ ...b, done: false });
  const tpl = {};
  for (const wd of WEEKDAY_KEYS) {
    let list = ((state.scheduleTemplate && state.scheduleTemplate[wd]) || defaultDayBlocks(wd)).map((b) => ({ ...b }));
    if (wd === wd0) {
      list = next.map((b) => { const c = clean(b); c.id = String(c.id).split("@")[0]; if (!c.bk) c.bk = "u-" + c.id; return c; });
    } else {
      for (const r of removed) { const key = r.bk; list = list.filter((b) => !(key ? b.bk === key : (b.time === r.time && b.label === r.label))); }
      for (const c of changed) {
        const o = prevById.get(c.id);
        list = list.map((b) => {
          const hit = o.bk ? b.bk === o.bk : (b.time === o.time && b.label === o.label);
          return hit ? { ...b, time: c.time, label: c.label, pillar: c.pillar } : b;
        });
      }
      for (const a of added) list.push({ ...clean(a), id: uid(), bk: a.bk || ("u-" + a.id) });
    }
    tpl[wd] = list.sort((a, b) => (a.time || "").localeCompare(b.time || ""));
  }
  const today = todayStr();
  const daySchedules = { ...state.daySchedules };
  for (const key of Object.keys(daySchedules)) if (key >= today) delete daySchedules[key];
  return { ...state, scheduleTemplate: tpl, daySchedules };
}

// Edit the repeating weekday template. Also clears any already-frozen day
// overrides for that same weekday so the new template actually shows going
// forward (past frozen days that the user hand-edited are left alone only if
// they differ — simplest correct behavior: drop future-relevant same-weekday
// overrides so the template change is visible).
function writeTemplateForWeekday(state, dateStr, blocks) {
  const wd = WEEKDAY_KEYS[new Date(dateStr + "T00:00:00").getDay()];
  const sorted = [...blocks].sort((a, b) => (a.time || "").localeCompare(b.time || ""));
  const template = sorted.map((b) => ({ ...b, id: String(b.id).split("@")[0], done: false }));
  // Remove overrides for this weekday from today forward so the new template shows.
  const today = todayStr();
  const daySchedules = { ...state.daySchedules };
  for (const key of Object.keys(daySchedules)) {
    if (key >= today && WEEKDAY_KEYS[new Date(key + "T00:00:00").getDay()] === wd) {
      delete daySchedules[key];
    }
  }
  return { ...state, scheduleTemplate: { ...state.scheduleTemplate, [wd]: template }, daySchedules };
}

/* ------------------ Syllabus + calendar-file readers ------------------
   Both run entirely in the browser (no AI, no account). The syllabus reader
   is pattern-based: it finds lines that contain a date AND a word like
   "exam" or "due". It is good, not perfect — results are always shown for
   review before anything is added. */
const MONTHS = { jan:0, feb:1, mar:2, apr:3, may:4, jun:5, jul:6, aug:7, sep:8, sept:8, oct:9, nov:10, dec:11 };
const MONTH_RE = "(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)";
const pad2 = (n) => String(n).padStart(2, "0");
const ymd = (d) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
function guessYear(month, day, explicitYear) {
  if (explicitYear) return explicitYear < 100 ? 2000 + explicitYear : explicitYear;
  const now = new Date();
  let y = now.getFullYear();
  const cand = new Date(y, month, day);
  // a date more than ~45 days in the past is almost certainly next year's
  if (cand < new Date(now.getTime() - 45 * 86400000)) y += 1;
  return y;
}
function findDateInLine(line) {
  let m = line.match(new RegExp("\\b" + MONTH_RE + "\\.?\\s+(\\d{1,2})(?:st|nd|rd|th)?(?:,?\\s*(\\d{4}))?\\b", "i"));
  if (m) {
    const mon = MONTHS[m[1].slice(0, m[1].toLowerCase().startsWith("sept") ? 4 : 3).toLowerCase()];
    const day = Number(m[2]);
    if (mon !== undefined && day >= 1 && day <= 31) return { date: ymd(new Date(guessYear(mon, day, m[3] ? Number(m[3]) : null), mon, day)), raw: m[0] };
  }
  m = line.match(/\b(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?\b/);
  if (m) {
    const mon = Number(m[1]) - 1, day = Number(m[2]);
    if (mon >= 0 && mon <= 11 && day >= 1 && day <= 31) return { date: ymd(new Date(guessYear(mon, day, m[3] ? Number(m[3]) : null), mon, day)), raw: m[0] };
  }
  return null;
}
function parseSyllabus(text) {
  const EXAM = /\b(midterm|mid-term|final exam|final|exam|test|quiz)\b/i;
  const DUE = /\b(due|assignment|homework|paper|essay|project|presentation|lab report|submit|submission|deadline|reading response|case study|draft|portfolio)\b/i;
  const RULE = /\b(late|attendance|absen|grading|grade breakdown|percent|%|plagiar|academic integrity|participation|extra credit|make-?up|office hours|policy|laptops?|phones?|miss(?:ed)?)\b/i;
  const items = [], rules = [], seen = new Set();
  const lines = text.split(/\r?\n/).map((l) => l.replace(/\s+/g, " ").trim()).filter(Boolean);
  for (const line of lines) {
    const hit = findDateInLine(line);
    const isExam = EXAM.test(line), isDue = DUE.test(line);
    if (hit && (isExam || isDue)) {
      let title = line.replace(hit.raw, "").replace(/^[\s\-–—:|•·*]+|[\s\-–—:|•·*]+$/g, "").trim();
      if (title.length < 3) title = line;
      if (title.length > 110) title = title.slice(0, 107) + "...";
      const key = title.toLowerCase() + hit.date;
      if (seen.has(key)) continue;
      seen.add(key);
      items.push({ id: uid(), kind: isExam ? "exam" : "due", title, date: hit.date, keep: true });
    } else if (!hit && RULE.test(line) && line.length >= 14 && line.length <= 240) {
      rules.push(line);
    }
  }
  items.sort((a, b) => a.date.localeCompare(b.date));
  return { items, rules: rules.slice(0, 14) };
}

function unfoldICS(text) { return text.replace(/\r?\n[ \t]/g, ""); }
function icsDateParts(val) {
  // 20270120T093000Z | 20270120T093000 | 20270120
  const m = val.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})?(Z)?)?$/);
  if (!m) return null;
  if (!m[4]) return { y: +m[1], mo: +m[2] - 1, d: +m[3], time: "" };
  if (m[7]) { // UTC -> local
    const dt = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +(m[6] || 0)));
    return { y: dt.getFullYear(), mo: dt.getMonth(), d: dt.getDate(), time: `${pad2(dt.getHours())}:${pad2(dt.getMinutes())}` };
  }
  return { y: +m[1], mo: +m[2] - 1, d: +m[3], time: `${pad2(m[4])}:${pad2(m[5])}` };
}
function parseICS(text) {
  const events = [];
  const now = new Date(); now.setHours(0, 0, 0, 0);
  const winStart = new Date(now); winStart.setDate(winStart.getDate() - 14);
  const winEnd = new Date(now); winEnd.setDate(winEnd.getDate() + 420);
  const DAYS = { SU: 0, MO: 1, TU: 2, WE: 3, TH: 4, FR: 5, SA: 6 };
  const blocks = unfoldICS(text).split("BEGIN:VEVENT").slice(1);
  for (const raw of blocks) {
    const body = raw.split("END:VEVENT")[0];
    const get = (name) => { const m = body.match(new RegExp("^" + name + "(?:;[^:\\n]*)?:(.*)$", "mi")); return m ? m[1].trim() : ""; };
    const summary = get("SUMMARY").replace(/\\,/g, ",").replace(/\\n/g, " ").replace(/\\;/g, ";");
    const start = icsDateParts(get("DTSTART"));
    if (!summary || !start) continue;
    const startDate = new Date(start.y, start.mo, start.d);
    const rrule = get("RRULE");
    const push = (d) => { if (d >= winStart && d <= winEnd) events.push({ date: ymd(d), time: start.time, title: summary }); };
    if (!rrule) { push(startDate); continue; }
    const rr = {}; rrule.split(";").forEach((kv) => { const [k, v] = kv.split("="); rr[k] = v; });
    const interval = Number(rr.INTERVAL || 1);
    let until = winEnd;
    if (rr.UNTIL) { const u = icsDateParts(rr.UNTIL.replace(/Z$/, "")); if (u) until = new Date(Math.min(winEnd, new Date(u.y, u.mo, u.d))); }
    const maxCount = rr.COUNT ? Number(rr.COUNT) : Infinity;
    const byday = rr.BYDAY ? rr.BYDAY.split(",").map((x) => DAYS[x.slice(-2)]).filter((x) => x !== undefined) : null;
    let produced = 0, guard = 0;
    for (let d = new Date(startDate); d <= until && produced < maxCount && guard < 2000; d.setDate(d.getDate() + 1), guard++) {
      const daysSince = Math.round((d - startDate) / 86400000);
      let ok = false;
      if (rr.FREQ === "DAILY") ok = daysSince % interval === 0;
      else if (rr.FREQ === "WEEKLY") {
        const weeks = Math.floor(daysSince / 7);
        const wd = byday || [startDate.getDay()];
        ok = wd.includes(d.getDay()) && weeks % interval === 0;
      } else if (rr.FREQ === "MONTHLY") ok = d.getDate() === startDate.getDate() && ((d.getFullYear() - startDate.getFullYear()) * 12 + d.getMonth() - startDate.getMonth()) % interval === 0;
      else if (rr.FREQ === "YEARLY") ok = d.getDate() === startDate.getDate() && d.getMonth() === startDate.getMonth() && (d.getFullYear() - startDate.getFullYear()) % interval === 0;
      else ok = daysSince === 0;
      if (ok) { produced++; push(new Date(d)); }
    }
  }
  return events;
}

function fmt12(t) {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  const ap = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${ap}`;
}


function tasksFromWeeklyPlan(weeklyPlan, date) {
  const weekday = WEEKDAY_KEYS[date.getDay()];
  const plan = (weeklyPlan && weeklyPlan[weekday]) || DEFAULT_WEEKLY_PLAN[weekday];
  const bigThreeTasks = (plan.bigThree || []).filter((t) => t && t.trim()).map((text) => ({
    id: uid(), text, pillar: "deepwork", energy: "high", big: true, done: false, source: "weekly",
  }));
  const itemTasks = (plan.items || []).map((it) => ({
    id: uid(), text: it.text, pillar: "life", energy: "medium", big: false, done: false, source: "weekly",
  }));
  return [...bigThreeTasks, ...itemTasks];
}
function applyDailyReset(state) {
  const today = todayStr();
  if (state.lastActiveDate === today) return state;

  const bigThreeTotal = state.todayTasks.filter((t) => t.big).length;
  const bigThreeDone = state.todayTasks.filter((t) => t.big && t.done).length;
  const scorecardValues = Object.values(state.eveningScorecard || {});
  const scorecardDone = scorecardValues.filter(Boolean).length;

  const logEntry = {
    date: state.lastActiveDate,
    bigThreeDone, bigThreeTotal,
    scorecardDone, scorecardTotal: scorecardValues.length,
    waterBottles: state.health.waterBottles,
    sleepHours: state.health.sleepHours,
    steps: state.health.steps || 0,
  };

  const kept = (bigThreeTotal > 0 && bigThreeDone >= Math.min(2, bigThreeTotal)) ||
    (scorecardValues.length > 0 && scorecardDone / scorecardValues.length >= 0.6);
  const wasYesterday = (() => {
    const y = new Date(state.lastActiveDate);
    y.setDate(y.getDate() + 1);
    return y.toISOString().slice(0, 10) === today;
  })();
  const nextCurrent = kept && wasYesterday ? state.streaks.current + 1 : (kept ? 1 : 0);

  const resetRoutines = {};
  for (const period of Object.keys(state.routines)) {
    resetRoutines[period] = state.routines[period].map((r) => ({ ...r, done: false }));
  }

  return {
    ...state,
    lastActiveDate: today,
    dailyLog: [logEntry, ...state.dailyLog].slice(0, 120),
    todayTasks: tasksFromWeeklyPlan(state.weeklyPlan, new Date()),
    routines: resetRoutines,
    eveningScorecard: {
      slept: false, ateBreakfast: false, moved: false, read: false, skill: false,
      deepWork: false, outside: false, selfCare: false, plannedTomorrow: false,
    },
    health: { ...state.health, waterBottles: 0, supplements: state.health.supplements.map((s) => ({ ...s, taken: false })) },
    streaks: { current: nextCurrent, best: Math.max(state.streaks.best, nextCurrent), lastCheckin: today },
  };
}

// One-time migration that folds in Levi's personal notes doc — runs once per
// browser (gated by state.seeds.contentV2) so it never overwrites anything
// she's already customized on repeat visits.
function applyContentSeed(state) {
  if (state.seeds && state.seeds.contentV2) return state;

  const existingSkillNames = new Set(state.skills.map((s) => s.name));
  const hobbySkills = [
    "Writing", "Drawing", "Guitar", "Piano", "Horseback Riding",
    "Racing", "Shooting", "Boxing", "Italian", "German", "Russian", "Photography",
  ].filter((n) => !existingSkillNames.has(n))
    .map((n) => ({ id: uid(), name: n, pillar: "life", level: 1, xp: 0, xpToNext: 100, hours: 0 }));

  const existingSuppNames = new Set(state.health.supplements.map((s) => s.name.toLowerCase()));
  const newSupps = [
    { name: "Oxyshred Pre-Workout", time: "Afternoon" },
    { name: "Probiotics", time: "Morning" },
    { name: "Multivitamin (C/A/B-complex)", time: "Morning" },
    { name: "Iron + Zinc", time: "Morning" },
  ].filter((s) => !existingSuppNames.has(s.name.toLowerCase()))
    .map((s) => ({ id: uid(), ...s, taken: false }));

  const recipes = state.health.nutrition.recipes.length ? state.health.nutrition.recipes : [
    { id: uid(), name: "Protein Yogurt Bowl", category: "Breakfast", fiber: 7, protein: 40, image: null, notes: "Greek yogurt, chia, flax, berries, granola, cinnamon, honey, nuts." },
    { id: uid(), name: "Protein Eggs + Toast", category: "Breakfast", fiber: 5, protein: 38, image: null, notes: "2 eggs, egg whites, avocado, sourdough, microgreens, fruit." },
    { id: uid(), name: "Salmon Rice Bowl", category: "Lunch", fiber: 6, protein: 40, image: null, notes: "Salmon, rice, cucumber, avocado, microgreens, carrots, olive oil + lemon." },
    { id: uid(), name: "Ground Beef Burrito Wrap", category: "Lunch", fiber: 9, protein: 40, image: null, notes: "Lean ground beef, black beans, rice, lettuce, tomato, cilantro, avocado." },
    { id: uid(), name: "Garlic Chicken + Potatoes", category: "Dinner", fiber: 5, protein: 40, image: null, notes: "Chicken breast, potatoes, onions, garlic, olive oil, parsley, side salad." },
    { id: uid(), name: "Shrimp Pasta", category: "Dinner", fiber: 4, protein: 40, image: null, notes: "Shrimp, pasta, olive oil, garlic, parmesan, spinach, lemon, pepper." },
    { id: uid(), name: "Cottage Cheese + Fruit + Honey", category: "Snack", fiber: 3, protein: 20, image: null, notes: "" },
    { id: uid(), name: "Apple + Peanut Butter", category: "Snack", fiber: 4, protein: 8, image: null, notes: "" },
    { id: uid(), name: "Fairlife Milk + Cereal", category: "Snack", fiber: 2, protein: 20, image: null, notes: "" },
    { id: uid(), name: "Boiled Eggs + Fruit", category: "Snack", fiber: 3, protein: 14, image: null, notes: "" },
    { id: uid(), name: "Dark Chocolate + Nuts + Strawberries", category: "Snack", fiber: 4, protein: 6, image: null, notes: "" },
  ];

  const workoutDays = state.health.workouts.days.length ? state.health.workouts.days : [
    { id: uid(), name: "Day 1 — Legs / Glutes", exercises: [
      { id: uid(), name: "Prone leg curl", sets: 4, reps: "6", done: false },
      { id: uid(), name: "Leg press", sets: 4, reps: "10", done: false },
      { id: uid(), name: "Hip abduction", sets: 3, reps: "15", done: false },
      { id: uid(), name: "Bulgarian split squats", sets: 4, reps: "6", done: false },
    ]},
    { id: uid(), name: "Day 2 — Back / Chest", exercises: [
      { id: uid(), name: "Lat pulldown (seated)", sets: 3, reps: "8", done: false },
      { id: uid(), name: "Close grip cable row", sets: 4, reps: "10", done: false },
      { id: uid(), name: "Pec deck", sets: 3, reps: "15", done: false },
      { id: uid(), name: "DB incline chest fly", sets: 3, reps: "15", done: false },
      { id: uid(), name: "Barbell rows", sets: 3, reps: "15", done: false },
    ]},
    { id: uid(), name: "Day 3 — Legs / Glutes B", exercises: [
      { id: uid(), name: "Calf raises", sets: 10, reps: "4", done: false },
      { id: uid(), name: "Adductors", sets: 4, reps: "8", done: false },
      { id: uid(), name: "Hip thrust", sets: 3, reps: "10", done: false },
      { id: uid(), name: "Leg curl", sets: 3, reps: "8", done: false },
    ]},
    { id: uid(), name: "Day 4 — Full Body", exercises: [
      { id: uid(), name: "Cable kickback", sets: 3, reps: "15", done: false },
      { id: uid(), name: "Dumbbell rows", sets: 3, reps: "15", done: false },
      { id: uid(), name: "Single grip cable row", sets: 3, reps: "10", done: false },
      { id: uid(), name: "Weighted squats", sets: 3, reps: "15", done: false },
      { id: uid(), name: "Weighted step up", sets: 3, reps: "8", done: false },
    ]},
    { id: uid(), name: "Day 5 — Arms / Shoulders", exercises: [
      { id: uid(), name: "Biceps curls", sets: 8, reps: "3", done: false },
      { id: uid(), name: "Chest press", sets: 4, reps: "8", done: false },
      { id: uid(), name: "Overhead press", sets: 4, reps: "8", done: false },
      { id: uid(), name: "Triceps dips", sets: 4, reps: "8", done: false },
    ]},
    { id: uid(), name: "Abs / Core (8 min)", exercises: [
      { id: uid(), name: "Butterfly kicks", sets: 1, reps: "1 min", done: false },
      { id: uid(), name: "Scissor kicks", sets: 1, reps: "1 min", done: false },
      { id: uid(), name: "Weighted marches", sets: 1, reps: "1 min", done: false },
      { id: uid(), name: "Bicycle", sets: 1, reps: "1 min", done: false },
      { id: uid(), name: "Reverse plank", sets: 1, reps: "45s", done: false },
      { id: uid(), name: "Plank", sets: 1, reps: "30s", done: false },
      { id: uid(), name: "Plank up-down", sets: 1, reps: "1 min", done: false },
      { id: uid(), name: "Shoulder tap planks", sets: 3, reps: "16", done: false },
    ]},
    { id: uid(), name: "Calisthenics", exercises: [] },
  ];

  const needsItems = [
    "Marvis whitening paste", "Whitening strips", "Face razor", "Cleanser", "Sunscreen",
    "Nair", "Brightening body lotion", "Body scrub", "Body oil cleanser",
  ].map((text) => ({ id: uid(), text, bought: false, source: "notes import" }));

  const beingDreamItems = [
    ["Body", "Train 4-5 days a week with intent and intensity"], ["Body", "Eat nutrient dense, whole foods"],
    ["Body", "Drink 3L of water daily"], ["Body", "Prioritize recovery and sleep"], ["Body", "Stretch and move daily"],
    ["Body", "Fix posture & build confidence through presence"], ["Body", "Dress with care — it reflects self-respect"],
    ["Mind", "Journal your thoughts and wins"], ["Mind", "Pray, meditate, or breathe consciously"],
    ["Mind", "Read something that expands perspective"], ["Mind", "Limit negativity & pointless consumption"],
    ["Mind", "Practice gratitude & awareness"], ["Mind", "Rewire your self-talk"], ["Mind", "Spend time in solitude"],
    ["Soul", "Spend time in nature regularly"], ["Soul", "Help without expecting anything"], ["Soul", "Sit in silence and reflect"],
    ["Soul", "Let go of grudges completely"], ["Soul", "Practice faith or trust"], ["Soul", "Be kind even when it's hard"],
    ["Soul", "Seek depth over distraction"],
    ["Habits", "Build repeatable systems, not motivation"], ["Habits", "Prepare for tomorrow the night before"],
    ["Habits", "Track wins weekly"], ["Habits", "Say no to things that don't align"], ["Habits", "Delay comfort for long-term peace"],
    ["Habits", "Limit screen time"], ["Habits", "Consistency over intensity"],
    ["Future", "Visualize the person you're becoming"], ["Future", "Write down 6-month and 1-year goals"],
    ["Future", "Learn one new high-value skill"], ["Future", "Take calculated risks"],
    ["Future", "Keep promises — especially to yourself"], ["Future", "Stay consistent even when unnoticed"],
    ["Future", "Move with quiet confidence"],
    ["1% Better", "Be a little stronger, wiser, calmer daily"], ["1% Better", "Let small wins build momentum"],
    ["1% Better", "Focus on daily actions, not outcomes"], ["1% Better", "Show up no matter how you feel"], ["1% Better", "Discipline is key"],
    ["Money", "Track every dollar — income & expenses"], ["Money", "Save minimum 20% of all money you touch"],
    ["Money", "Build an emergency fund (3 months)"], ["Money", "No impulsive purchases"],
    ["Money", "Learn investing basics — index funds, Roth IRA"], ["Money", "Build credit strategically (utilization < 10%)"],
    ["Money", "Monthly financial self-audits"], ["Money", "Prioritize sales, communication, negotiation skills"],
    ["Career & Education", "Study 1-2 hours/day minimum"], ["Career & Education", "Master note-taking & retention systems"],
    ["Career & Education", "Network intentionally"], ["Career & Education", "Apply to opportunities weekly"],
    ["Career & Education", "Keep resume + portfolio updated monthly"], ["Career & Education", "Build a reliable, professional reputation"],
    ["Career & Education", "Pursue depth, not busywork"], ["Career & Education", "Train communication & public speaking"],
    ["Relationships", "Only keep relationships that are reciprocal"], ["Relationships", "Set boundaries without guilt"],
    ["Relationships", "Communicate clearly & respectfully"], ["Relationships", "Cut off emotional chaos fast"],
    ["Relationships", "Surround yourself with driven, ambitious people"], ["Relationships", "Protect your energy"],
    ["Relationships", "Be intentional with your partner: love + growth + stability"], ["Relationships", "Don't chase people; choose alignment"],
    ["Environment", "Keep your living space clean & organized"], ["Environment", "Declutter weekly"],
    ["Environment", "Make your space match who you want to be"], ["Environment", "Keep a tidy digital environment"],
    ["Environment", "Create a work zone and a rest zone"], ["Environment", "Limit noise and chaos"],
    ["Identity / Mindset", "Act like the person you are becoming"], ["Identity / Mindset", "Self-discipline over self-motivation"],
    ["Identity / Mindset", "No victim mentality"], ["Identity / Mindset", "Replace complaining with solutions"],
    ["Identity / Mindset", "Build self-trust by keeping promises"], ["Identity / Mindset", "Rehearse your new identity daily"],
    ["Identity / Mindset", "Stop explaining yourself to people who aren't on your level"], ["Identity / Mindset", "Move in silence until results speak"],
    ["Health & Longevity", "Regular bloodwork"], ["Health & Longevity", "Daily vitamins — D3, Omega-3, Magnesium"],
    ["Health & Longevity", "Good skincare & haircare routines"], ["Health & Longevity", "Gut health — fiber, probiotics"],
    ["Health & Longevity", "Limit alcohol, no smoking"], ["Health & Longevity", "Walk 8k+ steps daily"],
    ["Health & Longevity", "Protect your sleep like your life depends on it"],
  ].map(([cat, text]) => ({ id: uid(), text: `[${cat}] ${text}`, done: false }));

  const selfCareHabitsItems = [
    "[Daily] Ice face every morning", "[Daily] Meditation", "[Daily] Journaling", "[Daily] Affirmation",
    "[Weekly] Nails", "[Weekly] Full shower routine (bar soap, shave, body scrub, body gel, oil)",
    "[Monthly] Hair (once every 6 weeks)", "[Monthly] Detox 3 days", "[Weekly] Honey rice mask",
    "[Weekly] Hydrating flaxseed mask",
  ].map((text) => ({ id: uid(), text, done: false }));

  const dietItems = [
    ["Green smoothie in the morning", false], ["Tea", false], ["Fruits", false], ["Veggies", false],
    ["Avocado oil", false], ["Fish", false], ["Coconut milk", false], ["Gluten free bread", false],
    ["No refined sugar", false], ["Eggs", false], ["Greek yogurt", false], ["Meat (chicken, pork, beef, goat)", true],
    ["Matcha", true], ["Natural juice only — cut sodas", true], ["Cucumber water", false], ["Ginger", false],
    ["Cheese", true], ["Smoothies", false], ["Salads", false],
  ].map(([text, done]) => ({ id: uid(), text, done }));

  const scentItems = ["J'adore", "360", "Femme Noire"].map((text) => ({ id: uid(), text, done: false }));

  const skincareItems = [
    "[AM] Water rinse", "[AM] Centella serum", "[AM] Mandelic acid serum", "[AM] Cicaplast balm",
    "[AM] Sunscreen", "[AM] Lip balm",
    "[PM] Beauty of Joseon green plum / Anua cleanser", "[PM] Centella serum", "[PM] Mandelic acid serum / glycolic",
    "[PM] Castor oil", "[PM] Cicaplast balm",
  ].map((text) => ({ id: uid(), text, done: false }));

  return {
    ...state,
    seeds: { ...state.seeds, contentV2: true },
    skills: [...state.skills, ...hobbySkills],
    health: {
      ...state.health,
      supplements: [...state.health.supplements, ...newSupps],
      nutrition: { ...state.health.nutrition, recipes },
      workouts: { ...state.health.workouts, days: workoutDays },
    },
    shopping: { ...state.shopping, list: [...needsItems, ...state.shopping.list] },
  };
}

const KEEP_SKILL_NAMES = new Set([
  "chess", "writing", "drawing", "guitar", "piano", "horseback riding",
  "racing", "shooting", "boxing", "italian", "german", "russian", "photography",
]);
const DEFAULT_WEEKLY_PLAN = {
  monday: { bigThree: ["", "", ""], deepWork: "", skillFocus: "", items: [] },
  tuesday: { bigThree: ["", "", ""], deepWork: "", skillFocus: "", items: [] },
  wednesday: { bigThree: ["", "", ""], deepWork: "", skillFocus: "", items: [] },
  thursday: { bigThree: ["", "", ""], deepWork: "", skillFocus: "", items: [] },
  friday: { bigThree: ["", "", ""], deepWork: "", skillFocus: "", items: [] },
  saturday: { bigThree: ["", "", ""], deepWork: "", skillFocus: "", items: [] },
  sunday: { bigThree: ["", "", ""], deepWork: "", skillFocus: "", items: [] },
};

// One-time structural migration: renames water tracking to bottles, trims
// the skill tree down to the exact kept list, replaces Daily OS routine
// content with the finalized version, and introduces the weekly planning
// template. Runs once, gated by seeds.structuralV3.
function applyStructuralMigration(state) {
  if (state.seeds && state.seeds.structuralV3) return state;

  const oldWater = state.health.waterBottles != null ? state.health.waterBottles : (state.health.waterCups || 0);
  const health = { ...state.health, waterBottles: oldWater, waterGoal: state.health.waterGoal || 4 };
  delete health.waterCups;

  const skills = state.skills.filter((s) => KEEP_SKILL_NAMES.has(s.name.toLowerCase()));
  const existingNames = new Set(skills.map((s) => s.name.toLowerCase()));
  const properCase = { "horseback riding": "Horseback Riding" };
  for (const name of KEEP_SKILL_NAMES) {
    if (!existingNames.has(name)) {
      const display = properCase[name] || name.charAt(0).toUpperCase() + name.slice(1);
      skills.push({ id: uid(), name: display, pillar: "mastery", level: 1, xp: 0, xpToNext: 100, hours: 0 });
    }
  }

  return {
    ...state,
    seeds: { ...state.seeds, structuralV3: true },
    health,
    skills,
    routines: DEFAULT_STATE.routines,
    weeklyPlan: state.weeklyPlan || DEFAULT_WEEKLY_PLAN,
    todayTasks: [],
    lastActiveDate: "2000-01-01", // forces an immediate regeneration of todayTasks from weeklyPlan on next reset check
  };
}

// One-time cleanup: removes the starter custom sections from the notes-doc
// import that turned out to be redundant with other modules. Gated so it
// only ever runs once and never touches sections added after that.
const STARTER_SECTION_TITLES = new Set(["Being Dream", "Self-Care & Habits", "Diet Habits", "Skincare Routine", "Signature Scents"]);
function applyStarterCleanup(state) {
  if (state.seeds && state.seeds.removeStarterSectionsV1) return state;
  const DROP_SKILLS = new Set(["Dancing", "Reading", "Cooking", "French", "French → fluency polish", "Public Speaking"]);
  return {
    ...state,
    seeds: { ...state.seeds, removeStarterSectionsV1: true },
    customSections: state.customSections.filter((s) => !STARTER_SECTION_TITLES.has(s.title)),
    skills: state.skills.filter((s) => !DROP_SKILLS.has(s.name)),
  };
}

// One-time migration: Levi doesn't track calories, she tracks fiber. Converts
// any existing recipes/log entries and the daily goal over, and trims the
// extra supplements she didn't want kept.
const UNWANTED_SUPPLEMENTS = new Set(["probiotics", "multivitamin (c/a/b-complex)", "iron + zinc"]);
function applyNutritionAndSupplementCleanup(state) {
  if (state.seeds && state.seeds.fiberAndSupplementsV1) return state;
  const recipes = state.health.nutrition.recipes.map((r) => {
    if (r.fiber != null) return r;
    const { calories, ...rest } = r;
    return { ...rest, fiber: 5 };
  });
  const log = state.health.nutrition.log.map((l) => {
    if (l.fiber != null) return l;
    const { calories, ...rest } = l;
    return { ...rest, fiber: 4 };
  });
  const { calorieGoal, ...nutritionRest } = state.health.nutrition;
  const supplements = state.health.supplements.filter((s) => !UNWANTED_SUPPLEMENTS.has(s.name.toLowerCase()));
  return {
    ...state,
    seeds: { ...state.seeds, fiberAndSupplementsV1: true },
    health: {
      ...state.health,
      supplements,
      nutrition: { ...nutritionRest, fiberGoal: state.health.nutrition.fiberGoal || 30, recipes, log },
    },
  };
}

// contentV3: Levi's home-training era. Replaces the gym routine with her
// dumbbell/calisthenics week, replaces meals with the new protein+fiber list
// (with her real photos bundled into the app), adds Ashwagandha. Runs once.
function applyContentV3(state) {
  if (state.seeds && state.seeds.contentV3) return state;
  const ex = (name, sets, reps) => ({ id: uid(), name, sets, reps, done: false });
  const days = [
    { id: uid(), name: "Mon — Lower Body A (Glutes + Quads)", exercises: [
      ex("Warm-up: dynamic stretching", 1, "5-10 min"), ex("Goblet Squats", 4, "10"), ex("Bulgarian Split Squats", 3, "10"),
      ex("Romanian Deadlift", 4, "10"), ex("Hip Thrusts", 4, "12"), ex("Standing Calf Raises", 4, "15"), ex("Wall Sit (finisher)", 2, "hold"),
    ]},
    { id: uid(), name: "Tue — Push (Chest / Shoulders / Triceps)", exercises: [
      ex("Push-ups", 3, "max"), ex("Dumbbell Bench Press (floor)", 4, "8"), ex("Incline Push-ups", 3, "12"),
      ex("Dumbbell Shoulder Press", 4, "10"), ex("Lateral Raises", 3, "15"), ex("Tricep Dips", 3, "12"), ex("Diamond Push-ups", 2, "failure"),
    ]},
    { id: uid(), name: "Wed — Pull (Back / Biceps)", exercises: [
      ex("Pull-up Progressions", 3, "-"), ex("Negative Pull-ups", 3, "5"), ex("Single Arm Dumbbell Rows", 4, "10"),
      ex("Chest Supported Rows", 3, "12"), ex("Hammer Curl", 3, "10"), ex("Bicep Curl", 3, "12"), ex("Farmer Carries", 3, "rounds"),
    ]},
    { id: uid(), name: "Thu — Recovery", exercises: [
      ex("Walking", 1, "-"), ex("Stretching", 1, "-"), ex("Mobility", 1, "-"), ex("Optional yoga", 1, "-"),
    ]},
    { id: uid(), name: "Fri — Lower Body B", exercises: [
      ex("Romanian Deadlift", 4, "8"), ex("Step Ups", 3, "12"), ex("Hip Thrust", 4, "10"),
      ex("Single Leg Romanian Deadlift", 3, "10"), ex("Walking Lunges", 3, "20"), ex("Standing Calf Raises", 4, "15"),
    ]},
    { id: uid(), name: "Sat — Hybrid Strength + Calisthenics", exercises: [
      ex("Push-ups", 3, "max"), ex("Pull-ups", 3, "max"), ex("Dips", 3, "max"), ex("Goblet Squats", 3, "10"),
      ex("Farmer Carry", 3, "rounds"), ex("Hanging Knee Raises", 3, "10"), ex("Dragon Flag Progression", 3, "5"),
    ]},
    { id: uid(), name: "Sun — Recovery", exercises: [ex("Stretch", 1, "-"), ex("Walk", 1, "-")] },
    { id: uid(), name: "Core A", exercises: [
      ex("Plank", 3, "1 min"), ex("Side Plank", 3, "45s"), ex("Dead Bug", 3, "12"), ex("Bird Dog", 3, "12"),
    ]},
    { id: uid(), name: "Core B", exercises: [
      ex("Hanging Knee Raises", 3, "10"), ex("Reverse Crunch", 3, "15"), ex("Leg Raises", 3, "12"), ex("Hollow Hold", 3, "30s"),
    ]},
    { id: uid(), name: "Core C", exercises: [
      ex("Dragon Flag Progression", 3, "5"), ex("Ab Wheel Rollout", 3, "10"), ex("L-Sit Progression", 3, "rounds"), ex("Mountain Climbers", 3, "30s"),
    ]},
  ];
  const R = (name, category, protein, fiber, image) => ({ id: uid(), name, category, protein, fiber, image, notes: "" });
  const recipes = [
    R("Yogurt Bowl", "Breakfast", 37, 18, "img/yogurt-bowl.jpg"),
    R("Eggs & Toast", "Breakfast", 36, 6, "img/eggs-toast.jpg"),
    R("PB Banana Toast", "Breakfast", 13, 6, "img/pb-banana-toast.jpg"),
    R("Salmon Bowl", "Lunch", 38, 6, "img/salmon-bowl.jpg"),
    R("Chicken Bowl", "Lunch", 44, 5, "img/chicken-bowl.jpg"),
    R("Beef Burrito", "Lunch", 44, 26, "img/beef-burrito.jpg"),
    R("Rice Paper Rolls", "Lunch", 30, 4, "img/rice-paper-rolls.jpg"),
    R("Chicken & Potatoes", "Dinner", 38, 6, "img/chicken-potatoes.jpg"),
    R("Steak Dinner", "Dinner", 41, 5, "img/steak-dinner.jpg"),
    R("Shrimp Pasta", "Dinner", 38, 4, "img/shrimp-pasta.jpg"),
    R("Apple + Peanut Butter", "Snack", 8, 8, "img/apple-pb.jpg"),
    R("Banana + Peanut Butter", "Snack", 8, 6, "img/banana-pb.jpg"),
    R("Fruit + Nuts", "Snack", 8, 9, "img/fruit-nuts.jpg"),
    R("Boiled Eggs", "Snack", 15, 1, null),
    R("Rice Cakes", "Snack", 9, 4, "img/rice-cakes.jpg"),
  ];
  const supps = state.health.supplements.some((s) => s.name.toLowerCase().includes("ashwagandha"))
    ? state.health.supplements
    : [...state.health.supplements, { id: uid(), name: "Ashwagandha", time: "Night", taken: false }];
  return {
    ...state,
    seeds: { ...state.seeds, contentV3: true },
    health: {
      ...state.health,
      supplements: supps,
      nutrition: { ...state.health.nutrition, recipes },
      workouts: { ...state.health.workouts, days },
    },
  };
}

// contentV4 (Nov 2026): skill list now matches what Levi is actually learning,
// burrito becomes a wrap-free bowl, Korea countdown added. Touches ONLY those
// things — her edited workouts, photos, theme and schedule edits are untouched.
function applyContentV4(state) {
  if (state.seeds && state.seeds.contentV4) return state;
  const DROP = new Set(["Italian", "German", "Piano"]);
  const have = new Set(state.skills.map((s) => s.name));
  const add = ["Korean", "Graphic Design"].filter((n) => !have.has(n))
    .map((n) => ({ id: uid(), name: n, pillar: "mastery", level: 1, xp: 0, xpToNext: 100, hours: 0, image: null }));
  const skills = [...state.skills.filter((s) => !DROP.has(s.name)), ...add];
  let tpl = state.scheduleTemplate;
  if (tpl && tpl.saturday) {
    tpl = { ...tpl, saturday: tpl.saturday.map((b) => b.label === "Learning Block — Piano" ? { ...b, label: "Learning Block — Korean · Graphic Design" } : b) };
  }
  const recipes = state.health.nutrition.recipes.map((r) =>
    (r.name === "Beef Burrito" && r.fiber === 26)
      ? { ...r, name: "Burrito Bowl", fiber: 7, notes: "Ground beef, lettuce, tomato, cucumber, flaxseed, Caesar-style sauce — no wrap. Fiber is an estimate; edit it if you know better." }
      : r);
  return {
    ...state,
    seeds: { ...state.seeds, contentV4: true },
    skills,
    scheduleTemplate: tpl,
    health: { ...state.health, nutrition: { ...state.health.nutrition, recipes } },
    countdowns: (state.countdowns && state.countdowns.length) ? state.countdowns : [{ id: uid(), label: "Korea", date: "2027-03-01" }],
  };
}


// contentV5 (Nov 2026): anti-inflammatory layer for Nutrition. Adds an editable
// guide + a rating tag on existing meals. Never changes protein/fiber, photos,
// names, or anything she edited. Meals she adds later simply have no tag.
const AF_RATING = {
  "Yogurt Bowl": ["core", "Plain Greek yogurt + berries + nuts is a good one. Skip honey/sweetened yogurt and flavored granola."],
  "Eggs & Toast": ["fine", "Eggs are fine. The toast is the weak spot — your homemade bread is better than store bread. Add spinach and a little olive oil."],
  "PB Banana Toast": ["fine", "Neutral. Use peanut butter with no added sugar or oils, and keep the bread homemade."],
  "Salmon Bowl": ["core", "Salmon is one of the strongest anti-inflammatory foods (omega-3)."],
  "Chicken Bowl": ["core", "Lean protein with veg — fits well. Cook with olive oil, not fried."],
  "Burrito Bowl": ["core", "Without the wrap it fits. Flaxseed is a plus. Check the Caesar-style sauce for added sugar and heavy oils."],
  "Rice Paper Rolls": ["fine", "Mostly veg and protein — fine. Dipping sauces are where the added sugar hides."],
  "Chicken & Potatoes": ["fine", "Roast in olive oil instead of frying; leave the skin on the potato for fiber."],
  "Steak Dinner": ["limit", "Red meat is fine sometimes, just not a daily default. Pair with greens and keep the portion modest."],
  "Apple + Peanut Butter": ["core", "Whole fruit + nut butter — a good swap for sweet cravings."],
  "Banana + Peanut Butter": ["core", "Whole fruit + nut butter — a good swap for sweet cravings."],
  "Fruit + Nuts": ["core", "Berries and walnuts are especially good."],
  "Boiled Eggs": ["fine", "Easy protein. Fine."],
  "Fruit bowl": ["core", "Whole fruit is fine — the sugar to cut is ADDED sugar, not fruit."],
};
function defaultAFGuide() {
  return {
    more: ["Salmon, sardines", "Berries", "Spinach & leafy greens", "Walnuts, almonds", "Flax, chia seeds", "Extra-virgin olive oil", "Avocado", "Tomatoes", "Broccoli & crucifers", "Eggs", "Ginger, turmeric", "Green tea"],
    fine: ["Homemade bread (sourdough / whole grain)", "Plain Greek yogurt", "Plain oats", "Potatoes, rice", "Peanut butter (no added sugar/oil)", "Banana, apple & other whole fruit", "Red meat — now and then"],
    limit: ["Added sugar", "Sweetened drinks", "Pastries, candy, sweet snacks", "Store white bread", "Fried food", "Bacon, sausage, deli meat", "Sweetened yogurt / granola / flavored oats", "Lots of alcohol"],
    swap: "Craving something sweet? Apple or banana + peanut butter, fruit + nuts, or plain Greek yogurt with berries.",
  };
}
function applyContentV5(state) {
  if (state.seeds && state.seeds.antiInflV1) return state;
  const recipes = state.health.nutrition.recipes.map((r) => {
    if (r.af || !AF_RATING[r.name]) return r;
    return { ...r, af: AF_RATING[r.name][0], afNote: AF_RATING[r.name][1] };
  });
  return {
    ...state,
    seeds: { ...state.seeds, antiInflV1: true },
    health: { ...state.health, nutrition: { ...state.health.nutrition, recipes, guide: state.health.nutrition.guide || defaultAFGuide() } },
  };
}


// ---- contentV6 (Nov 2026): schedule v3, routines v2, meal ideas + grocery ----
const AF_IDEAS = [["Overnight oats + blueberries + walnuts", "Breakfast", 12, 8, "core", "Plain oats and unsweetened milk. Skip the honey or maple."], ["Spinach & feta eggs + toast", "Breakfast", 24, 4, "fine", "Eggs and spinach are great. Use your homemade bread; feta is salty, so go light."], ["Greek yogurt + strawberries + oats", "Breakfast", 22, 5, "core", "Plain, unsweetened yogurt only."], ["Avocado toast + boiled egg", "Breakfast", 13, 9, "fine", "Fine with your own bread."], ["Vegetable omelette + berries", "Breakfast", 20, 5, "core", "Cook in olive oil."], ["Oat pancakes + warm apple + walnuts", "Breakfast", 10, 6, "fine", "Fine now and then — no syrup, the apple is the sweetener."], ["Quinoa, chickpea, cucumber + tomato bowl", "Lunch", 16, 10, "core", "Olive oil + lemon dressing."], ["Golden lentil soup + herbs", "Lunch", 18, 14, "core", "Turmeric and lentils — a classic."], ["Turkey, avocado + hummus lettuce wraps", "Lunch", 22, 7, "core", "The plan uses a flour wrap — romaine keeps it wrap-free like your bowls."], ["Salmon, white bean, tomato + cucumber salad", "Lunch", 34, 9, "core", "Salmon plus beans — protein, fiber and omega-3."], ["Tomato, white bean + kale soup", "Lunch", 14, 12, "core", "Easy to batch on Sunday."], ["Farro, zucchini, feta + olive bowl", "Lunch", 14, 9, "fine", "Fine. Farro is a whole grain."], ["Grilled chicken, avocado + cucumber salad", "Lunch", 36, 8, "core", "Olive oil + lemon."], ["Baked salmon, broccoli + sweet potato", "Dinner", 36, 8, "core", "The anchor meal of the plan."], ["Grilled chicken, brown rice + green beans", "Dinner", 38, 6, "core", "Simple and solid."], ["Chickpea + spinach curry with brown rice", "Dinner", 16, 14, "core", "Low in protein as written — add eggs, chicken or a side of Greek yogurt."], ["Turkey + vegetable stir-fry with quinoa", "Dinner", 34, 8, "core", "Use olive or avocado oil; watch bottled sauces for sugar."], ["Baked cod, Brussels sprouts + wild rice", "Dinner", 32, 7, "core", "Light and lean."], ["Garlic shrimp, zucchini noodles + tomatoes", "Dinner", 30, 4, "core", "Pair with something starchy if you're training that day."], ["Hearty lentil + vegetable stew", "Dinner", 20, 16, "core", "High fiber — a good batch-cook."], ["Grass-fed beef patty, mushrooms + sweet potato mash", "Dinner", 32, 6, "fine", "Red meat — fine, just not every night."], ["Greek yogurt + mixed berries", "Snack", 15, 4, "core", "Plain yogurt."], ["Orange + walnuts", "Snack", 4, 4, "core", ""], ["Hummus + carrot sticks", "Snack", 5, 5, "core", ""], ["Pear + almonds", "Snack", 6, 7, "core", ""], ["Green tea + mixed nuts", "Snack", 6, 3, "core", "Unsweetened tea."], ["Cottage cheese + pineapple", "Snack", 14, 1, "fine", "Fine — pineapple's sugar is natural, just don't use canned in syrup."]];
const AF_GROCERY = {"Produce": ["Blueberries", "Strawberries & mixed berries", "Bananas", "Apples, oranges & pears", "Pineapple chunks", "Lemons & limes", "Avocados", "Spinach & kale", "Mixed salad greens", "Broccoli", "Green beans", "Brussels sprouts", "Zucchini", "Carrots & celery", "Cucumbers", "Cherry tomatoes", "Bell peppers & onions", "Sweet potatoes", "Fresh ginger & garlic"], "Protein": ["Salmon fillets", "Cod fillet", "Shrimp", "Chicken breast", "Turkey slices & strips", "Eggs", "Red & brown lentils", "Chickpeas", "White beans"], "Dairy & eggs": ["Greek yogurt (plain)", "Cottage cheese", "Feta cheese", "Unsweetened almond or oat milk"], "Pantry": ["Rolled oats", "Quinoa", "Brown & wild rice", "Farro", "Almond butter / peanut butter (no added sugar)", "Hummus", "Walnuts, almonds & mixed nuts", "Chia seeds & ground flaxseed", "Turmeric, cinnamon & chili flakes", "Extra-virgin olive oil", "Green tea", "Olives"], "Frozen": ["Frozen mixed berries (backup)", "Frozen cherries"]};
function sigOf(list) { return (list || []).map((b) => b.time + "|" + b.label).join("~"); }
function applyScheduleV3(state) {
  if (state.seeds && state.seeds.scheduleV3) return state;
  // Replace a weekday only if it's still exactly the old starter template —
  // anything she edited by hand is left alone.
  const tpl = { ...(state.scheduleTemplate || {}) };
  for (const wd of WEEKDAY_KEYS) {
    if (!tpl[wd] || sigOf(tpl[wd]) === sigOf(legacyDayBlocks(wd))) tpl[wd] = defaultDayBlocks(wd);
  }
  return { ...state, seeds: { ...state.seeds, scheduleV3: true }, scheduleTemplate: tpl };
}
const ROUTINES_V2 = {
  weekly: ["Weekly review", "Plan calendar", "Grocery shopping", "Meal prep", "Clean room", "Change pillowcases", "Review finances", "Review school", "Review job applications", "Choose weekly skill", "Update upcoming appointments"],
  biweekly: ["Laundry", "Hair wash", "Nails", "Toes", "Eyebrows", "Full-body grooming", "Deep clean", "Hair treatment if needed", "Microneedling (evening — skin night)"],
  monthly: ["Financial self-audit", "Declutter & donate", "Update resume & portfolio", "Review goals", "Review progress", "Review subscriptions", "Review business"],
};
function applyRoutinesV2(state) {
  if (state.seeds && state.seeds.routinesV2) return state;
  const cur = state.recurringRoutines || { weekly: [], biweekly: [], monthly: [] };
  const oldStarter = new Set(["Wash hair", "Clean room", "Laundry", "Meal prep", "Grocery shopping", "Nails", "Eyebrows", "Deep clean room", "Shave / Nair", "Hair treatment", "Declutter & donate", "Financial self-audit", "Update resume & portfolio"]);
  const all = [...(cur.weekly || []), ...(cur.biweekly || []), ...(cur.monthly || [])];
  const untouched = all.every((r) => !r.lastDone && oldStarter.has(r.text));
  const mk = (t) => ({ id: uid(), text: t, lastDone: null });
  let next;
  if (untouched) {
    next = { weekly: ROUTINES_V2.weekly.map(mk), biweekly: ROUTINES_V2.biweekly.map(mk), monthly: ROUTINES_V2.monthly.map(mk) };
    // keep the one starter item she had that isn't on her new list
    if (all.some((r) => r.text === "Shave / Nair")) next.biweekly.push(mk("Shave / Nair"));
  } else {
    const have = new Set(all.map((r) => r.text.toLowerCase()));
    next = {};
    for (const k of ["weekly", "biweekly", "monthly"]) next[k] = [...(cur[k] || []), ...ROUTINES_V2[k].filter((t) => !have.has(t.toLowerCase())).map(mk)];
  }
  return { ...state, seeds: { ...state.seeds, routinesV2: true }, recurringRoutines: next };
}
function applyNutritionIdeasV1(state) {
  if (state.seeds && state.seeds.nutritionIdeasV1) return state;
  const n = state.health.nutrition;
  const ideas = n.ideas || AF_IDEAS.map(([name, category, protein, fiber, af, note]) => ({ id: uid(), name, category, protein, fiber, af, afNote: note }));
  const grocery = n.grocery || Object.entries(AF_GROCERY).map(([cat, items]) => ({ cat, items: items.map((name) => ({ id: uid(), name, have: false })) }));
  return { ...state, seeds: { ...state.seeds, nutritionIdeasV1: true }, health: { ...state.health, nutrition: { ...n, ideas, grocery } } };
}

// Populate the schedule template once.
function applyScheduleSeed(state) {
  if (state.seeds && state.seeds.scheduleV2) return state;
  // v2: install Levi's exact plan and clear overrides built on the old template.
  return {
    ...state,
    seeds: { ...state.seeds, scheduleV1: true, scheduleV2: true },
    scheduleTemplate: buildScheduleTemplate(),
    daySchedules: {},
  };
}


// recipesV2 (Nov 2026): real recipes for every meal, sized so ANY pick from each of
// Breakfast / Lunch / Dinner / Snack lands at 100g+ protein and 25g+ fiber.
// Each main meal is built for 30g+ protein and 8g+ fiber. Values are estimates
// from standard food tables. Keeps her ids, photos and any recipe she made herself.
const RECIPE_LIB = [{"name": "Overnight Oats — Blueberry Walnut", "category": "Breakfast", "ingredients": ["½ cup rolled oats", "1 cup plain Greek yogurt", "1 tbsp ground flaxseed", "½ cup unsweetened almond milk", "½ cup blueberries", "1 oz walnuts (about 14 halves)"], "method": "Stir oats, yogurt, flax and almond milk in a jar. Fridge overnight. Top with blueberries and walnuts in the morning. No honey needed — the berries sweeten it.", "protein": 34, "fiber": 10, "af": "core", "afNote": "Oats, berries, walnuts and flax are all anti-inflammatory staples. Plain yogurt only."}, {"name": "Eggs & Toast", "category": "Breakfast", "ingredients": ["3 eggs", "2 big handfuls spinach (about 1 cup wilted)", "2 slices homemade whole-grain bread", "¼ avocado, sliced"], "method": "Wilt the spinach in 1 tsp olive oil, scramble the eggs in the same pan. Toast the bread, top with eggs and avocado.", "protein": 32, "fiber": 13, "af": "fine", "afNote": "Your homemade bread is the right call. Eggs, spinach and avocado carry this one."}, {"name": "Yogurt Bowl", "category": "Breakfast", "ingredients": ["1 cup plain Greek yogurt", "1 cup strawberries, sliced", "¼ cup rolled oats (dry, or toasted)", "1 oz almonds, chopped", "1 tbsp ground flaxseed"], "method": "Layer yogurt, strawberries, oats, almonds and flax. Plain yogurt only — the fruit is the sweet part.", "protein": 34, "fiber": 10, "af": "core", "afNote": "Fermented dairy is generally neutral-to-helpful for inflammation unless you're sensitive to dairy."}, {"name": "Veggie Omelet + Berries", "category": "Breakfast", "ingredients": ["3 eggs", "½ cup egg whites", "2 cups spinach", "½ cup peppers / mushrooms", "1 cup raspberries on the side", "1 slice homemade bread"], "method": "Sauté veg in 1 tsp olive oil, pour in beaten eggs + whites, fold. Berries and toast on the side.", "protein": 33, "fiber": 13, "af": "core", "afNote": "Olive oil, greens and berries — easy anti-inflammatory plate."}, {"name": "PB Banana Toast", "category": "Breakfast", "ingredients": ["2 slices homemade whole-grain bread", "2 tbsp peanut butter (no added sugar/oil)", "1 banana, sliced", "1 cup plain Greek yogurt on the side"], "method": "Toast, spread, layer the banana. Yogurt on the side is what gets the protein up.", "protein": 40, "fiber": 11, "af": "fine", "afNote": "Toast alone is low in protein, so the yogurt matters here. Check the peanut butter label for added sugar."}, {"name": "Salmon Bowl", "category": "Lunch", "ingredients": ["4 oz cooked salmon", "¾ cup white beans", "2 cups mixed greens", "½ cup cherry tomatoes", "½ cup cucumber"], "method": "Flake the salmon over greens, beans, tomato and cucumber. Dress with 1 tbsp olive oil + lemon + salt.", "protein": 43, "fiber": 11, "af": "core", "afNote": "Salmon = omega-3, beans = fiber. Strong combo."}, {"name": "Chicken Bowl", "category": "Lunch", "ingredients": ["3 oz grilled chicken", "¾ cup cooked quinoa", "½ cup chickpeas", "½ cup tomato + cucumber", "1 cup spinach", "1 tbsp tahini + lemon"], "method": "Build the bowl, drizzle tahini mixed with lemon juice and a splash of water.", "protein": 43, "fiber": 13, "af": "core", "afNote": "Quinoa, chickpeas and tahini add the fiber and healthy fats."}, {"name": "Burrito Bowl", "category": "Lunch", "ingredients": ["4 oz cooked lean ground beef", "½ cup black beans", "2 cups chopped romaine", "½ cup tomato + cucumber", "1 tbsp ground flaxseed", "¼ avocado", "Caesar-style sauce: 2 tbsp Greek yogurt + lemon + garlic + parmesan"], "method": "Brown the beef with cumin and paprika. Pile onto lettuce with the beans, tomato, cucumber and avocado. Flax on top, sauce over it. No wrap.", "protein": 44, "fiber": 15, "af": "core", "afNote": "Without the wrap it fits. Swap ground turkey on days you've had red meat."}, {"name": "Golden Lentil Soup + Chicken", "category": "Lunch", "ingredients": ["¾ cup cooked red/brown lentils", "3 oz shredded chicken", "1 carrot, diced", "1 cup spinach"], "method": "Simmer lentils with onion, garlic, ginger, carrot and 1 tsp turmeric in broth for 20 min. Stir in chicken and spinach. A little olive oil + black pepper on top.", "protein": 41, "fiber": 15, "af": "core", "afNote": "Turmeric + ginger + lentils is the classic anti-inflammatory soup. Batch it on Sunday."}, {"name": "Rice Paper Rolls", "category": "Lunch", "ingredients": ["5 oz cooked shrimp", "6 rice papers + carrot, cucumber, lettuce, mint", "¾ cup shelled edamame on the side", "Dip: 1 tbsp almond butter + lime + splash of water"], "method": "Soften rice papers in warm water, fill with shrimp and veg, roll. Edamame on the side.", "protein": 51, "fiber": 11, "af": "fine", "afNote": "Rice paper is just a vehicle. Edamame is what brings the fiber and protein."}, {"name": "Baked Salmon, Broccoli + Sweet Potato", "category": "Dinner", "ingredients": ["4 oz salmon fillet", "1 cup broccoli", "1 medium sweet potato (skin on)", "side of greens with lemon"], "method": "Everything on one tray with 1 tbsp olive oil, salt, pepper: 200°C / 400°F — salmon 12–15 min, sweet potato ~35 min, broccoli 15 min.", "protein": 36, "fiber": 10, "af": "core", "afNote": "The anchor anti-inflammatory dinner."}, {"name": "Chicken & Potatoes", "category": "Dinner", "ingredients": ["4 oz chicken breast", "1 medium potato, skin on", "1½ cups green beans"], "method": "Roast chicken and potato wedges with olive oil, garlic and rosemary at 200°C / 400°F for 25–30 min. Steam or roast the green beans.", "protein": 42, "fiber": 10, "af": "fine", "afNote": "Roast in olive oil rather than frying; keep the potato skin for fiber."}, {"name": "Steak Dinner", "category": "Dinner", "ingredients": ["4 oz sirloin", "1 cup roasted broccoli", "1 medium sweet potato"], "method": "Sear the steak 3–4 min per side, rest 5 min. Roast the broccoli and potato.", "protein": 39, "fiber": 9, "af": "limit", "afNote": "Red meat is fine sometimes — not an every-night default. Grass-fed if you can."}, {"name": "Garlic Shrimp + Zucchini + White Beans", "category": "Dinner", "ingredients": ["5 oz shrimp", "2 cups zucchini noodles", "½ cup white beans", "½ cup cherry tomatoes"], "method": "Sauté garlic in olive oil, add shrimp 2–3 min per side, then tomatoes, beans, zoodles for 2 min. Lemon at the end.", "protein": 45, "fiber": 8, "af": "core", "afNote": "Light and quick. Add rice or quinoa on a heavy training day."}, {"name": "Baked Cod, Brussels Sprouts + Wild Rice", "category": "Dinner", "ingredients": ["5 oz cod fillet", "2 cups Brussels sprouts", "½ cup cooked wild rice"], "method": "Roast the halved sprouts with olive oil 20 min at 200°C / 400°F, add cod for the last 12. Serve over rice with lemon.", "protein": 44, "fiber": 10, "af": "core", "afNote": "Big veg portion — fill half your plate."}, {"name": "Turkey Veggie Stir-Fry + Quinoa", "category": "Dinner", "ingredients": ["4 oz ground turkey", "1 cup broccoli", "1 cup peppers / onion / mushrooms", "¾ cup cooked quinoa"], "method": "Brown turkey in olive or avocado oil, add veg, ginger, garlic and a splash of coconut aminos or low-sodium soy. Serve over quinoa.", "protein": 41, "fiber": 11, "af": "core", "afNote": "Watch bottled sauces — that's where the added sugar hides."}, {"name": "Apple + Peanut Butter", "category": "Snack", "ingredients": ["1 apple", "2 tbsp peanut butter"], "method": "Slice and dip.", "protein": 8, "fiber": 6, "af": "core", "afNote": "Whole fruit + nut butter — your go-to swap for sweet cravings."}, {"name": "Banana + Peanut Butter", "category": "Snack", "ingredients": ["1 banana", "2 tbsp peanut butter"], "method": "Slice and dip.", "protein": 9, "fiber": 5, "af": "core", "afNote": "Same idea, a bit sweeter."}, {"name": "Fruit + Nuts", "category": "Snack", "ingredients": ["1 cup berries", "1 oz almonds"], "method": "Eat together.", "protein": 7, "fiber": 6, "af": "core", "afNote": "Berries + nuts is the most anti-inflammatory snack on the list."}, {"name": "Boiled Eggs", "category": "Snack", "ingredients": ["2 boiled eggs", "carrot + celery sticks"], "method": "Boil eggs 9–10 min, ice bath, peel.", "protein": 13, "fiber": 3, "af": "fine", "afNote": "Easy protein. The veg adds a little fiber."}, {"name": "Greek Yogurt + Berries", "category": "Snack", "ingredients": ["1 cup plain Greek yogurt", "½ cup mixed berries", "1 tbsp ground flaxseed"], "method": "Stir together.", "protein": 25, "fiber": 4, "af": "core", "afNote": "Plain yogurt, never the sweetened cups."}, {"name": "Edamame", "category": "Snack", "ingredients": ["¾ cup shelled edamame"], "method": "Steam or microwave 3 min, sea salt.", "protein": 14, "fiber": 6, "af": "core", "afNote": "Protein + fiber in one."}, {"name": "Cottage Cheese + Pineapple", "category": "Snack", "ingredients": ["½ cup cottage cheese", "½ cup fresh pineapple", "1 tbsp ground flaxseed"], "method": "Top and eat.", "protein": 15, "fiber": 3, "af": "fine", "afNote": "Pineapple is whole fruit — just not the canned-in-syrup kind."}, {"name": "Hummus + Veggies", "category": "Snack", "ingredients": ["3 tbsp hummus", "1 cup carrot + cucumber sticks"], "method": "Dip.", "protein": 4, "fiber": 7, "af": "core", "afNote": "Lower in protein — pair it with a higher-protein meal that day."}];
const GROCERY_ADD = { "Produce": ["Romaine lettuce", "Mushrooms", "Raspberries", "Potatoes"], "Protein": ["Lean ground beef", "Ground turkey", "Edamame (shelled, frozen)", "Black beans"], "Pantry": ["Tahini", "Whole-grain flour (for your bread)", "Rice paper wrappers"] };
function applyRecipesV2(state) {
  if (state.seeds && state.seeds.recipesV2) return state;
  const n = state.health.nutrition;
  const byName = new Map(n.recipes.map((r) => [r.name, r]));
  const used = new Set();
  const recipes = n.recipes.map((r) => {
    const lib = RECIPE_LIB.find((x) => x.name === r.name);
    if (!lib || r.ingredients) return r;
    used.add(lib.name);
    return { ...r, category: lib.category, protein: lib.protein, fiber: lib.fiber, ingredients: lib.ingredients, method: lib.method, af: lib.af, afNote: lib.afNote };
  });
  for (const lib of RECIPE_LIB) {
    if (byName.has(lib.name)) continue;
    recipes.push({ id: uid(), name: lib.name, category: lib.category, protein: lib.protein, fiber: lib.fiber, image: null, notes: "", ingredients: lib.ingredients, method: lib.method, af: lib.af, afNote: lib.afNote });
  }
  let grocery = n.grocery || [];
  const have = new Set(grocery.flatMap((g) => g.items.map((x) => x.name.toLowerCase())));
  grocery = grocery.map((g) => ({ ...g, items: [...g.items] }));
  for (const [cat, names] of Object.entries(GROCERY_ADD)) {
    let g = grocery.find((x) => x.cat === cat);
    if (!g) { g = { cat, items: [] }; grocery.push(g); }
    for (const nm of names) if (!have.has(nm.toLowerCase())) g.items.push({ id: uid(), name: nm, have: false });
  }
  return { ...state, seeds: { ...state.seeds, recipesV2: true }, health: { ...state.health, nutrition: { ...n, recipes, ideas: [], grocery } } };
}
// countdownsV2: school starts Mar 2; departure is late Jan / Feb (placeholder date she can edit)
function applyCountdownsV2(state) {
  if (state.seeds && state.seeds.countdownsV2) return state;
  const cur = state.countdowns || [];
  const seededOnly = cur.length === 1 && cur[0].label === "Korea" && cur[0].date === "2027-03-01";
  const next = (cur.length === 0 || seededOnly)
    ? [{ id: uid(), label: "Leaving for Korea", date: "2027-01-31" }, { id: uid(), label: "Classes start", date: "2027-03-02" }]
    : cur;
  return { ...state, seeds: { ...state.seeds, countdownsV2: true }, countdowns: next };
}

function migrateState(loaded) {
  // Each step is gated by its own seeds flag, so running them again is harmless.
  const steps = [
    applyStructuralMigration, applyDailyReset, applyContentSeed, applyStarterCleanup, applyContentV3,
    applyScheduleSeed, applyContentV4, applyContentV5, applyScheduleV3, applyRoutinesV2,
    applyNutritionIdeasV1, applyRecipesV2, applyCountdownsV2,
  ];
  return steps.reduce((st, fn) => fn(st), loaded);
}

// Persists to this browser's localStorage only, and applies the daily reset
// check on load and whenever the tab regains focus (covers "left it open
// overnight" and "opened it fresh the next day" both).
function useLeviStorage() {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const loaded = raw ? { ...DEFAULT_STATE, ...JSON.parse(raw) } : DEFAULT_STATE;
      return migrateState(loaded);
    } catch (e) {
      console.error("Levi OS: failed to load saved data", e);
      return DEFAULT_STATE;
    }
  });
  const saveTimer = useRef(null);
  const updatedAtRef = useRef(Number(localStorage.getItem(STORAGE_KEY + "-updated-at")) || 0);
  // Monotonic edit counter — sync compares THIS, never wall clocks, so a
  // device with a slightly-wrong clock can no longer overwrite fresh edits.
  const revRef = useRef(Number(localStorage.getItem(STORAGE_KEY + "-rev")) || 0);

  useEffect(() => {
    const check = () => setState((s) => applyDailyReset(s));
    document.addEventListener("visibilitychange", check);
    const interval = setInterval(check, 60000);
    return () => { document.removeEventListener("visibilitychange", check); clearInterval(interval); };
  }, []);

  const [saveError, setSaveError] = useState("");
  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try {
        updatedAtRef.current = Date.now();
        revRef.current += 1;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        localStorage.setItem(STORAGE_KEY + "-updated-at", String(updatedAtRef.current));
        localStorage.setItem(STORAGE_KEY + "-rev", String(revRef.current));
        setSaveError("");
      }
      catch (e) {
        console.error("Levi OS: save failed", e);
        setSaveError("Storage is full — changes are NOT being saved. Remove a few uploaded photos to fix this.");
      }
    }, 300);
    return () => clearTimeout(saveTimer.current);
  }, [state]);

  return [state, setState, true, updatedAtRef, saveError, revRef];
}

// Manual backup: since data lives in this browser's localStorage only,
// export/import is the free way to move data between phone and computer, or
// keep a safety copy. This is not automatic real-time sync — see Settings
// for what that would take.
function exportBackup(state) {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `levi-os-backup-${todayStr()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
function importBackup(file, setState) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        setState(migrateState({ ...DEFAULT_STATE, ...parsed }));
        resolve();
      } catch (e) { reject(e); }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}


/* ------------------------- CLOUD ACCOUNT (Supabase) -------------------------
   Optional. If public/config.js has no Supabase details, none of this runs and
   the app works exactly as before (data stays on the device).
   When configured: you sign in once, your data lives in your own Supabase
   database (locked to your login), and every device shows the same thing.
   Only the public "anon" key is ever in the browser; it can't read anything
   without your signed-in session. Secret keys live only in Netlify.
------------------------------------------------------------------------------*/
const CLOUD_SESSION_KEY = "levi-os-cloud-session";
const cloudListeners = new Set();
function cloudCfg() {
  const c = (typeof window !== "undefined" && window.LEVI_CONFIG) || {};
  return { url: String(c.SUPABASE_URL || "").replace(/\/+$/, ""), anon: String(c.SUPABASE_ANON_KEY || ""), fn: String(c.FUNCTIONS_BASE || "").replace(/\/+$/, "") };
}
const cloudConfigured = () => { const c = cloudCfg(); return !!(c.url && c.anon); };
function readSession() { try { return JSON.parse(localStorage.getItem(CLOUD_SESSION_KEY) || "null"); } catch (e) { return null; } }
function writeSession(sess) {
  try { sess ? localStorage.setItem(CLOUD_SESSION_KEY, JSON.stringify(sess)) : localStorage.removeItem(CLOUD_SESSION_KEY); } catch (e) {}
  cloudListeners.forEach((f) => f(sess));
}
function sessionFromAuth(d) {
  return { access_token: d.access_token, refresh_token: d.refresh_token, expires_at: d.expires_at || (Math.floor(Date.now() / 1000) + (d.expires_in || 3600)), user: { id: d.user && d.user.id, email: d.user && d.user.email } };
}
async function cloudSignIn(email, password) {
  const c = cloudCfg();
  try {
    const res = await fetch(`${c.url}/auth/v1/token?grant_type=password`, { method: "POST", headers: { apikey: c.anon, "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
    const d = await res.json().catch(() => ({}));
    if (!res.ok || !d.access_token) {
      const msg = (d.error_description || d.msg || d.message || "").toLowerCase();
      if (res.status === 400 && msg.includes("invalid")) return { error: "That email or password isn't right." };
      if (msg.includes("confirm")) return { error: "This email hasn't been confirmed yet — see SETUP.md step 3." };
      return { error: "Couldn't sign in right now. Check the connection and try again." };
    }
    writeSession(sessionFromAuth(d));
    return { ok: true };
  } catch (e) { return { error: "Couldn't reach the server. Check your connection." }; }
}
async function cloudSignOut() {
  const c = cloudCfg(); const sess = readSession();
  try { if (sess) await fetch(`${c.url}/auth/v1/logout`, { method: "POST", headers: { apikey: c.anon, Authorization: `Bearer ${sess.access_token}` } }); } catch (e) {}
  writeSession(null);
}
let refreshing = null;
async function refreshSession() {
  if (refreshing) return refreshing;
  refreshing = (async () => {
    const sess = readSession(); const c = cloudCfg();
    if (!sess || !sess.refresh_token) return null;
    try {
      const res = await fetch(`${c.url}/auth/v1/token?grant_type=refresh_token`, { method: "POST", headers: { apikey: c.anon, "Content-Type": "application/json" }, body: JSON.stringify({ refresh_token: sess.refresh_token }) });
      const d = await res.json().catch(() => ({}));
      if (res.ok && d.access_token) { const next = sessionFromAuth(d); writeSession(next); return next; }
      if (res.status === 400 || res.status === 401) writeSession(null); // refresh token no longer valid -> sign in again
      return null;
    } catch (e) { return null; } // offline: keep the session, try later
  })();
  try { return await refreshing; } finally { refreshing = null; }
}
async function cloudToken() {
  let sess = readSession();
  if (!sess) return null;
  if ((sess.expires_at || 0) - 60 < Math.floor(Date.now() / 1000)) sess = (await refreshSession()) || readSession();
  return sess ? sess.access_token : null;
}
async function cloudRest(path, opts = {}) {
  const c = cloudCfg();
  const call = async (token) => fetch(`${c.url}/rest/v1/${path}`, { ...opts, headers: { apikey: c.anon, Authorization: `Bearer ${token}`, "Content-Type": "application/json", ...(opts.headers || {}) } });
  let token = await cloudToken();
  if (!token) throw new Error("not signed in");
  let res = await call(token);
  if (res.status === 401) { const next = await refreshSession(); if (next) res = await call(next.access_token); }
  return res;
}
function useCloudAuth() {
  const [session, setSession] = useState(() => (cloudConfigured() ? readSession() : null));
  useEffect(() => { cloudListeners.add(setSession); return () => cloudListeners.delete(setSession); }, []);
  useEffect(() => { if (cloudConfigured() && readSession()) cloudToken(); }, []); // refresh early if the saved token is old
  return { configured: cloudConfigured(), session, signIn: cloudSignIn, signOut: cloudSignOut };
}

// --- app data row (one per user) ---
async function cloudPull(knownRev) {
  try {
    const sess = readSession(); if (!sess) return undefined;
    const uid = encodeURIComponent(sess.user.id);
    // cheap check first: only download the whole thing if the cloud copy is newer
    let r = await cloudRest(`levi_state?select=rev,updated_ms&user_id=eq.${uid}`);
    if (!r.ok) return undefined;
    const rows = await r.json();
    if (!rows.length) return null;
    const rev = Number(rows[0].rev) || 0;
    if (rev <= knownRev) return { rev, updatedAt: Number(rows[0].updated_ms) || 0, unchanged: true };
    r = await cloudRest(`levi_state?select=state,rev,updated_ms&user_id=eq.${uid}`);
    if (!r.ok) return undefined;
    const full = (await r.json())[0];
    return full ? { rev: Number(full.rev) || 0, updatedAt: Number(full.updated_ms) || 0, data: full.state } : null;
  } catch (e) { return undefined; }
}
async function cloudPush(payload) {
  try {
    const sess = readSession(); if (!sess) return false;
    const uid = encodeURIComponent(sess.user.id);
    const row = { state: payload.data, rev: payload.rev, updated_ms: payload.updatedAt };
    // update only if our copy is at least as new as what's stored
    let r = await cloudRest(`levi_state?user_id=eq.${uid}&rev=lte.${payload.rev}`, { method: "PATCH", headers: { Prefer: "return=representation" }, body: JSON.stringify(row) });
    if (!r.ok) return false;
    if ((await r.json()).length) return true;
    // nothing updated: either no row yet (create it), or the cloud is newer (leave it; next pull adopts it)
    r = await cloudRest(`levi_state?select=rev&user_id=eq.${uid}`);
    if (!r.ok) return false;
    if ((await r.json()).length) return true;
    r = await cloudRest("levi_state", { method: "POST", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ user_id: sess.user.id, ...row }) });
    return r.ok;
  } catch (e) { return false; }
}

// --- inbox: things Make.com / Apple Shortcuts sent in ---
async function cloudInboxPull() {
  try { const r = await cloudRest("inbox?select=id,kind,payload&order=id.asc&limit=100"); return r.ok ? await r.json() : undefined; } catch (e) { return undefined; }
}
async function cloudInboxDelete(ids) {
  if (!ids.length) return;
  try { await cloudRest(`inbox?id=in.(${ids.join(",")})`, { method: "DELETE" }); } catch (e) {}
}
// Pure function: files each inbox item into the right place. Safe to run twice
// on the same item (health overwrites with the same numbers; calendar and
// email items are de-duplicated).
function applyInboxItems(state, rows) {
  let next = state;
  const today = todayStr();
  for (const row of rows) {
    const p = row.payload || {};
    if (row.kind === "health") {
      const date = p.date || today;
      const bottleMl = Number(next.health.bottleMl) || 500;
      const patch = {};
      if (typeof p.sleep_hours === "number") patch.sleepHours = p.sleep_hours;
      if (typeof p.steps === "number") patch.steps = p.steps;
      if (typeof p.water_ml === "number") patch.waterBottles = Math.round((p.water_ml / bottleMl) * 10) / 10;
      if (date === today) {
        let h = { ...next.health, ...patch };
        let sc = next.eveningScorecard;
        if (p.workout) {
          const ref = `apple-${date}-${p.workout.name}-${p.workout.minutes}`;
          const list = h.appleWorkouts || [];
          if (!list.some((w) => w.ref === ref)) h = { ...h, appleWorkouts: [{ id: uid(), ref, date, name: p.workout.name, minutes: p.workout.minutes }, ...list].slice(0, 60) };
          sc = { ...sc, moved: true };
        }
        next = { ...next, health: h, eveningScorecard: sc };
      } else {
        // an earlier day: update that day's archived entry if it exists
        const log = (next.dailyLog || []).map((e) => e.date === date ? { ...e, ...(patch.steps !== undefined ? { steps: patch.steps } : {}), ...(patch.sleepHours !== undefined ? { sleepHours: patch.sleepHours } : {}), ...(patch.waterBottles !== undefined ? { waterBottles: patch.waterBottles } : {}) } : e);
        let h = next.health;
        if (p.workout) {
          const ref = `apple-${date}-${p.workout.name}-${p.workout.minutes}`;
          const list = h.appleWorkouts || [];
          if (!list.some((w) => w.ref === ref)) h = { ...h, appleWorkouts: [{ id: uid(), ref, date, name: p.workout.name, minutes: p.workout.minutes }, ...list].slice(0, 60) };
        }
        next = { ...next, dailyLog: log, health: h };
      }
    } else if (row.kind === "calendar" && p.title && p.date) {
      const time = p.time || "";
      if (!next.calendarEvents.some((e) => e.date === p.date && (e.time || "") === time && e.title === p.title)) {
        next = { ...next, calendarEvents: [...next.calendarEvents, { id: uid(), title: p.title, date: p.date, time, reminderMinutes: 30, pillar: "life", notes: p.notes || "synced", notified: false }].slice(-1500) };
      }
    } else if (row.kind === "email" && p.subject) {
      const ref = "email-" + (p.ext || `${p.from}|${p.subject}`);
      if (!next.brainDump.some((b) => b.ref === ref)) {
        next = { ...next, brainDump: [{ id: uid(), ref, src: "email", text: `✉ ${p.subject}${p.from ? " — " + p.from : ""}`, category: "note", createdAt: Date.now() }, ...next.brainDump] };
      }
    }
  }
  return next;
}

// --- Ask Claude (through the Netlify function; the Anthropic key never reaches the browser) ---
const cloudAIAvailable = () => cloudConfigured() && !!readSession();
async function cloudAsk({ messages, context, maxTokens }) {
  try {
    const token = await cloudToken();
    if (!token) return { error: "Please sign in again." };
    const res = await fetch(`${cloudCfg().fn}/.netlify/functions/ask-claude`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ messages, context: context || "", max_tokens: maxTokens || 900 }) });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { error: data.error || `The assistant isn't responding (error ${res.status}). See SETUP.md step 6.` };
    return { reply: data.reply };
  } catch (e) { return { error: "Couldn't reach the assistant. Check your connection." }; }
}

/* ---------------------------- CROSS-DEVICE SYNC ----------------------------
   Real automatic sync, built on kvdb.io — a free, no-signup key/value store.
   A "sync code" is just the bucket ID; typing the same code into the app on
   another device points it at the same bucket. This is best-effort: if the
   service is unreachable the app degrades silently to local-only, and Backup
   in Settings remains the guaranteed fallback.
   Honest security note: kvdb buckets aren't authenticated — anyone with the
   exact code could read or write it. Treat the code like a password, not a
   username: long, random, not shared. It's convenience sync, not a vault.
------------------------------------------------------------------------------*/
const SYNC_CODE_KEY = "levi-os-sync-code";
const getSyncCode = () => { try { return localStorage.getItem(SYNC_CODE_KEY) || ""; } catch (e) { return ""; } };
const persistSyncCode = (code) => { try { code ? localStorage.setItem(SYNC_CODE_KEY, code) : localStorage.removeItem(SYNC_CODE_KEY); } catch (e) {} };

function randomSyncCode() {
  const chars = "abcdefghjkmnpqrstuvwxyz23456789";
  let out = "";
  for (let i = 0; i < 16; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}
async function pushSync(code, payload) {
  try {
    const res = await fetch(`https://kvdb.io/${encodeURIComponent(code)}/levi-os-state`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch (e) { return false; }
}
async function pullSync(code) {
  try {
    const res = await fetch(`https://kvdb.io/${encodeURIComponent(code)}/levi-os-state`);
    if (res.status === 404) return null; // no data saved yet — that's fine
    if (!res.ok) return undefined;       // service problem
    const text = await res.text();
    if (!text) return null;
    return JSON.parse(text);
  } catch (e) { return undefined; }
}

// Uploaded photos are large base64 strings; syncing them blows past free-tier
// size limits and breaks the whole push. Strip them from the payload — bundled
// app photos are just file paths and sync fine.
function stripUploadedImages(obj) {
  if (Array.isArray(obj)) return obj.map(stripUploadedImages);
  if (obj && typeof obj === "object") {
    const out = {};
    for (const k of Object.keys(obj)) {
      const v = obj[k];
      out[k] = (typeof v === "string" && v.startsWith("data:image")) ? null : stripUploadedImages(v);
    }
    return out;
  }
  return obj;
}
// When adopting the cloud copy, keep this device's uploaded photos for items
// the cloud version has no photo for (they were stripped before upload).
function mergeLocalImages(local, incoming) {
  const collect = (node, map) => {
    if (Array.isArray(node)) node.forEach((n) => collect(n, map));
    else if (node && typeof node === "object") {
      if (node.id && typeof node.image === "string" && node.image.startsWith("data:image")) map[node.id] = node.image;
      Object.values(node).forEach((v) => collect(v, map));
    }
  };
  const imgs = {};
  collect(local, imgs);
  const restore = (node) => {
    if (Array.isArray(node)) return node.map(restore);
    if (node && typeof node === "object") {
      const out = { ...node };
      if (out.id && !out.image && imgs[out.id]) out.image = imgs[out.id];
      for (const k of Object.keys(out)) out[k] = restore(out[k]);
      return out;
    }
    return node;
  };
  return restore(incoming);
}

// A device that has never held any Levi OS data (first load, nothing saved) is "virgin":
// when it first signs in it simply takes the cloud copy, without asking.
const VIRGIN_KEY = "levi-os-virgin-device";
try { if (cloudConfigured() && !localStorage.getItem(STORAGE_KEY) && !localStorage.getItem(VIRGIN_KEY)) localStorage.setItem(VIRGIN_KEY, "1"); } catch (e) {}
const isVirgin = () => { try { return localStorage.getItem(VIRGIN_KEY) === "1"; } catch (e) { return false; } };
const CLOUD_LINKED_KEY = "levi-os-cloud-linked";
const cloudLinked = () => { try { const sess = readSession(); return !!sess && localStorage.getItem(CLOUD_LINKED_KEY) === sess.user.id; } catch (e) { return false; } };
const markCloudLinked = () => { try { const sess = readSession(); if (sess) localStorage.setItem(CLOUD_LINKED_KEY, sess.user.id); localStorage.removeItem(VIRGIN_KEY); } catch (e) {} };

function useCloudSync(state, setState, updatedAtRef, revRef, auth) {
  const cloud = !!(auth && auth.configured && auth.session);
  const [syncCode, setSyncCodeState] = useState(() => getSyncCode());
  const active = cloud ? "cloud" : (cloudConfigured() ? "" : syncCode); // when Supabase is configured, the old code-based sync stays off
  const [status, setStatus] = useState("idle"); // idle | syncing | synced | error | off
  const [lastError, setLastError] = useState("");
  const skipNextPush = useRef(false);
  const pushTimer = useRef(null);
  // Pushing is forbidden until the first pull has completed. This is what
  // prevents a freshly-installed device from overwriting real data in the
  // cloud with its own empty state.
  const firstPullDone = useRef(false);
  const stateRef = useRef(state); stateRef.current = state;   // latest state, for uploads started outside a render
  const pushNowRef = useRef(null);
  const dirtyRef = useRef(false);                            // an upload failed and still needs to go out
  // First time THIS device meets the cloud and BOTH have data: never guess — ask.
  const [conflict, setConflict] = useState(null);

  const drainInbox = useCallback(async () => {
    const rows = await cloudInboxPull();
    if (!rows || !rows.length) return;
    setState((s) => applyInboxItems(s, rows));
    await cloudInboxDelete(rows.map((r) => r.id));
  }, []);

  const pull = useCallback(async () => {
    if (!active) return;
    setStatus("syncing");
    if (cloud && !cloudLinked() && isVirgin() && revRef.current !== 0) {
      // brand-new device: forget the empty starter state's edit count so the cloud copy wins
      revRef.current = 0; updatedAtRef.current = 0;
      try { localStorage.setItem(STORAGE_KEY + "-rev", "0"); localStorage.setItem(STORAGE_KEY + "-updated-at", "0"); } catch (e) {}
    }
    const remote = cloud ? await cloudPull(revRef.current) : await pullSync(syncCode);
    if (remote === undefined) { // network/service failure
      setStatus("error");
      setLastError("Couldn't reach the sync service.");
      return;
    }
    if (cloud && !cloudLinked()) {
      if (remote && revRef.current > 0 && !isVirgin()) {
        setConflict({ cloudAt: remote.updatedAt || 0, cloudRev: Number(remote.rev) || 0, localAt: updatedAtRef.current || 0 });
        setStatus("idle");
        return; // pushing stays blocked until she chooses
      }
      markCloudLinked(); // empty cloud, or an empty device: no risk of losing anything
    }
    // Adopt remote only if it has strictly MORE edits than this device (a
    // clock-independent counter). Legacy payloads without rev fall back to a
    // conservative timestamp check.
    const remoteRev = remote && Number(remote.rev || 0);
    const shouldAdopt = remote && !remote.unchanged && (
      remoteRev ? remoteRev > revRef.current
                : (remote.updatedAt && remote.updatedAt < Date.now() + 120000 && remote.updatedAt > updatedAtRef.current)
    );
    if (shouldAdopt) {
      skipNextPush.current = true;
      updatedAtRef.current = remote.updatedAt || updatedAtRef.current;
      if (remoteRev) {
        revRef.current = remoteRev;
        try { localStorage.setItem(STORAGE_KEY + "-rev", String(remoteRev)); } catch (e) {}
      }
      setState((local) => migrateState(mergeLocalImages(local, { ...DEFAULT_STATE, ...remote.data })));
    }
    firstPullDone.current = true;
    setLastError("");
    setStatus("synced");
    if (cloud) {
      drainInbox();
      // empty cloud (first ever upload) or an earlier upload that failed: send now
      if (remote === null || dirtyRef.current) setTimeout(() => pushNowRef.current && pushNowRef.current(), 0);
    }
  }, [active]);

  const pushNow = useCallback(async () => {
    if (!active || !firstPullDone.current) return;
    setStatus("syncing");
    let ok;
    const state = stateRef.current;
    if (cloud) {
      let data = state;
      try { if (JSON.stringify(state).length > 5500000) data = stripUploadedImages(state); } catch (e) {}
      ok = await cloudPush({ rev: revRef.current, updatedAt: updatedAtRef.current, data });
    } else {
      ok = await pushSync(syncCode, { rev: revRef.current, updatedAt: updatedAtRef.current, data: stripUploadedImages(state) });
    }
    dirtyRef.current = !ok;
    if (!ok) setLastError("Couldn't reach the sync service.");
    else setLastError("");
    setStatus(ok ? "synced" : "error");
  }, [active]);
  pushNowRef.current = pushNow;

  useEffect(() => {
    if (!active) { setStatus("off"); return; }
    firstPullDone.current = false;
    let cancelled = false;
    const safePull = () => { if (!cancelled) pull(); };
    safePull();
    const interval = setInterval(safePull, cloud ? 30000 : 15000);
    document.addEventListener("visibilitychange", safePull);
    window.addEventListener("focus", safePull);
    return () => { cancelled = true; clearInterval(interval); document.removeEventListener("visibilitychange", safePull); window.removeEventListener("focus", safePull); };
  }, [active]);

  useEffect(() => {
    if (!active || !firstPullDone.current) return;
    if (skipNextPush.current) { skipNextPush.current = false; return; }
    if (pushTimer.current) clearTimeout(pushTimer.current);
    pushTimer.current = setTimeout(pushNow, 1500);
    return () => clearTimeout(pushTimer.current);
  }, [state, active]);

  // Joining an existing code = this device defers to whatever's in the cloud.
  const enableWithCode = (code) => {
    updatedAtRef.current = 0;
    revRef.current = 0;
    try { localStorage.setItem(STORAGE_KEY + "-updated-at", "0"); localStorage.setItem(STORAGE_KEY + "-rev", "0"); } catch (e) {}
    persistSyncCode(code); setSyncCodeState(code);
  };
  // Generating a fresh code = this device's data becomes the cloud copy.
  const generateNewCode = () => {
    const code = randomSyncCode();
    updatedAtRef.current = Date.now();
    try { localStorage.setItem(STORAGE_KEY + "-updated-at", String(updatedAtRef.current)); } catch (e) {}
    persistSyncCode(code); setSyncCodeState(code);
    return code;
  };
  const disable = () => { persistSyncCode(""); setSyncCodeState(""); setStatus("off"); };
  const syncNow = async () => { await pull(); await pushNow(); };

  // The two answers to the first-connection question.
  const useCloudCopy = () => {
    revRef.current = 0; updatedAtRef.current = 0;
    try { localStorage.setItem(STORAGE_KEY + "-rev", "0"); localStorage.setItem(STORAGE_KEY + "-updated-at", "0"); } catch (e) {}
    markCloudLinked(); setConflict(null); pull();
  };
  const useThisDevice = () => {
    const c = conflict;
    revRef.current = Math.max(revRef.current, (c ? c.cloudRev : 0) + 1);
    try { localStorage.setItem(STORAGE_KEY + "-rev", String(revRef.current)); } catch (e) {}
    markCloudLinked(); firstPullDone.current = true; setConflict(null);
    setState((st) => ({ ...st })); // nudges a save + upload
  };

  return { syncCode, status, lastError, enableWithCode, generateNewCode, disable, syncNow, cloud, conflict, useCloudCopy, useThisDevice };
}

// The Anthropic API key, if added in Settings, lives only in this browser's
// localStorage and is sent directly from the browser to Anthropic.
const API_KEY_STORAGE = "levi-os-anthropic-key";
const getApiKey = () => { try { return localStorage.getItem(API_KEY_STORAGE) || ""; } catch (e) { return ""; } };

function categorizeKeyword(text) {
  const t = text.toLowerCase();
  if (/\b(buy|order|pick up|purchase|need to get)\b/.test(t)) return { category: "shopping" };
  if (/\b(tomorrow|next week|on \w+day|at \d{1,2}(am|pm)|appointment|meeting)\b/.test(t)) return { category: "calendar" };
  if (/\b(archeor|investor|pitch|showcase|marketplace|brand)\b/.test(t)) return { category: "business" };
  if (/\b(idea|what if|concept for)\b/.test(t)) return { category: "idea" };
  if (/\b(remind me|don't forget|remember to)\b/.test(t)) return { category: "reminder" };
  if (/\b(goal|by \d{4}|this year|this quarter)\b/.test(t)) return { category: "goal" };
  return { category: "note" };
}

const CATEGORIES = ["shopping", "calendar", "reminder", "goal", "idea", "business", "note"];
const ANTHROPIC_HEADERS = (apiKey) => ({
  "Content-Type": "application/json",
  "x-api-key": apiKey,
  "anthropic-version": "2023-06-01",
  "anthropic-dangerous-direct-browser-access": "true",
});

async function categorizeWithAI(text) {
  const apiKey = getApiKey();
  if (cloudAIAvailable()) {
    const r = await cloudAsk({ maxTokens: 200, messages: [{ role: "user", content:
      `Classify this brain-dump note into exactly one category from this list: ${CATEGORIES.join(", ")}.\n"business" = Levi's company ARCHEOR. "shopping" = something to buy. "calendar" = has a specific day/time. "reminder" = a nudge without a time. "goal" = longer-term target. "idea" = a creative idea not about ARCHEOR. "note" = anything else.\n` +
      `Note: "${text}"\n\nRespond with ONLY compact JSON: {"category": "...", "clean_text": "a short cleaned-up version"}` }] });
    try {
      const m = (r.reply || "").match(/\{[\s\S]*\}/);
      const parsed = JSON.parse(m ? m[0] : r.reply);
      if (!CATEGORIES.includes(parsed.category)) throw new Error("bad category");
      return { category: parsed.category, clean_text: parsed.clean_text || text };
    } catch (e) { return categorizeKeyword(text); }
  }
  if (!apiKey) return categorizeKeyword(text);
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: ANTHROPIC_HEADERS(apiKey),
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 200,
        messages: [{
          role: "user",
          content:
            `Classify this brain-dump note into exactly one category from this list: ${CATEGORIES.join(", ")}.\n\n` +
            `"business" means it relates to Levi's company ARCHEOR — projects, pitches, brand, ideas, talent, showcases, finances.\n` +
            `"shopping" is anything to buy. "calendar" has a specific day/time. "reminder" is a nudge without a specific time. "goal" is a longer-term target. "idea" is a creative/business idea NOT related to ARCHEOR. "note" is anything else.\n\n` +
            `Note: "${text}"\n\nRespond with ONLY compact JSON: {"category": "...", "clean_text": "a short cleaned-up version"}`,
        }],
      }),
    });
    const data = await response.json();
    const raw = (data.content || []).map((b) => b.text || "").join("").trim();
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : raw);
    if (!CATEGORIES.includes(parsed.category)) throw new Error("bad category");
    return { category: parsed.category, clean_text: parsed.clean_text || text };
  } catch (e) {
    console.error("Levi OS: AI categorization failed, falling back to keywords", e);
    return categorizeKeyword(text);
  }
}

const CATEGORY_LABEL = {
  shopping: "Shopping List", calendar: "Calendar Event", idea: "Idea", reminder: "Reminder",
  goal: "Goal", business: "ARCHEOR", note: "Note", pending: "Sorting…",
};

// Single-turn helper (Education assistant, flashcard generation).
async function askClaude(prompt) {
  if (cloudAIAvailable()) { const r = await cloudAsk({ messages: [{ role: "user", content: prompt }], maxTokens: 1400 }); return r.reply || r.error; }
  const apiKey = getApiKey();
  if (!apiKey) return "Add your Anthropic API key in Settings to turn this on.";
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: ANTHROPIC_HEADERS(apiKey),
      body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, messages: [{ role: "user", content: prompt }] }),
    });
    const data = await response.json();
    if (data.error) return `Anthropic API error: ${data.error.message || "check your key in Settings."}`;
    return (data.content || []).map((b) => b.text || "").join("").trim() || "No response.";
  } catch (e) {
    console.error("Levi OS: askClaude failed", e);
    return "Couldn't reach the assistant right now — try again in a moment.";
  }
}

// Multi-turn helper for the general Assistant chat — takes prior turns plus
// a context block built from the person's own data so answers are grounded.
async function askClaudeConversation(history, contextBlock) {
  if (cloudAIAvailable()) { const r = await cloudAsk({ messages: history.map((m) => ({ role: m.role, content: m.text })), context: contextBlock }); return r.reply || r.error; }
  const apiKey = getApiKey();
  if (!apiKey) return "Add your Anthropic API key in Settings to turn on the AI Assistant.";
  try {
    const messages = history.map((m) => ({ role: m.role, content: m.text }));
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: ANTHROPIC_HEADERS(apiKey),
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        system:
          `You are Levi's personal AI assistant inside her app "Levi OS." Be warm, direct, and concise — ` +
          `like a sharp chief-of-staff, not a generic chatbot. Use short paragraphs or brief bullet points. ` +
          `Here is context about her life right now:\n${contextBlock}`,
        messages,
      }),
    });
    const data = await response.json();
    if (data.error) return `Anthropic API error: ${data.error.message || "check your key in Settings."}`;
    return (data.content || []).map((b) => b.text || "").join("").trim() || "No response.";
  } catch (e) {
    console.error("Levi OS: askClaudeConversation failed", e);
    return "Couldn't reach the assistant right now — try again in a moment.";
  }
}

function buildAssistantContext(state) {
  const today = todayStr();
  const bigThree = state.todayTasks.filter((t) => t.big).map((t) => `${t.done ? "[done] " : ""}${t.text}`);
  const activeProjects = state.archeor.projects.filter((p) => p.status !== "Done").map((p) => p.name);
  const to12 = (t) => { const [h, m] = String(t || "0:0").split(":").map(Number); return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")}${h < 12 ? "am" : "pm"}`; };
  let schedule = [];
  try { schedule = resolveSchedule(state, today).map((b) => `${to12(b.time)} ${b.label}${b.done ? " [done]" : ""}`); } catch (e) {}
  const sc = state.eveningScorecard || {};
  const scorecard = Object.keys(sc).map((k) => `${k}: ${sc[k] ? "yes" : "no"}`).join(", ");
  const wd = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][new Date().getDay()];
  const plan = (state.weeklyPlan && state.weeklyPlan[wd]) || {};
  const weeklyBits = [plan.deepWork && `Deep work focus: ${plan.deepWork}`, plan.skillFocus && `Skill focus: ${plan.skillFocus}`].filter(Boolean);
  const horizon = new Date(); horizon.setDate(horizon.getDate() + 21);
  const upcoming = (state.calendarEvents || []).filter((e) => e.date >= today && e.date <= ymd(horizon)).sort((a, b) => (a.date + (a.time || "")).localeCompare(b.date + (b.time || ""))).slice(0, 25).map((e) => `${e.date}${e.time ? " " + e.time : ""} ${e.title}`);
  const due = [];
  for (const c of (state.education && state.education.courses) || []) for (const a of c.assignments || []) if (!a.done && a.due) due.push(`${a.due} ${c.name}: ${a.text}`);
  const countdowns = (state.countdowns || []).map((c) => `${c.label}: ${c.date}`);
  const h = state.health || {};
  return [
    `Today is ${new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}.`,
    state.identity.mission ? `Mission: ${state.identity.mission}` : "",
    state.identity.annualTheme?.theme ? `${state.identity.annualTheme.year} theme: ${state.identity.annualTheme.theme}` : "",
    bigThree.length ? `Today's Big Three: ${bigThree.join("; ")}` : "",
    schedule.length ? `Today's schedule:\n${schedule.join("\n")}` : "",
    scorecard ? `Evening scorecard so far: ${scorecard}` : "",
    weeklyBits.length ? `This weekday's plan: ${weeklyBits.join("; ")}` : "",
    upcoming.length ? `Calendar, next 3 weeks:\n${upcoming.join("\n")}` : "",
    due.length ? `School items not done:\n${due.sort().slice(0, 25).join("\n")}` : "",
    countdowns.length ? `Countdowns: ${countdowns.join("; ")}` : "",
    `Health today: sleep ${h.sleepHours ?? "?"}h, steps ${h.steps ?? 0}, water ${h.waterBottles ?? 0} bottles.`,
    activeProjects.length ? `Active ARCHEOR projects: ${activeProjects.join("; ")}` : "",
    `Current streak: ${state.streaks.current} days.`,
  ].filter(Boolean).join("\n").slice(0, 11500);
}

// Browser Notification permission + reminder polling. Important honest limit:
// this only fires while the app/tab is actually open (foreground or
// background tab) — a static, serverless app like this cannot wake up and
// notify you while fully closed, the way Google Calendar's server can.
function requestNotificationPermission() {
  if (typeof Notification === "undefined") return Promise.resolve("unsupported");
  if (Notification.permission === "granted" || Notification.permission === "denied") return Promise.resolve(Notification.permission);
  return Notification.requestPermission();
}

function useReminderPolling(state, setState) {
  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof Notification === "undefined" || Notification.permission !== "granted") return;
      const now = new Date();
      setState((s) => {
        let changed = false;
        const events = s.calendarEvents.map((ev) => {
          if (ev.notified || !ev.date || !ev.time) return ev;
          const when = new Date(`${ev.date}T${ev.time}`);
          const reminderAt = new Date(when.getTime() - (Number(ev.reminderMinutes) || 0) * 60000);
          if (now >= reminderAt && now <= when) {
            try { new Notification("Levi OS", { body: `${ev.title} — ${ev.time}`, icon: "icon-192.png" }); } catch (e) {}
            changed = true;
            return { ...ev, notified: true };
          }
          return ev;
        });
        return changed ? { ...s, calendarEvents: events } : s;
      });
    }, 30000);
    return () => clearInterval(interval);
  }, [setState]);
}

/* ---------------------------- Shared UI atoms ---------------------------- */
function PillarTag({ pillar }) {
  const p = PILLARS[pillar] || PILLARS.life;
  return (
    <span style={{ color: p.color, borderColor: p.color }} className="text-[10px] uppercase tracking-widest border rounded-full px-2 py-0.5 whitespace-nowrap">
      {p.label}
    </span>
  );
}
function EnergyTag({ energy }) {
  if (!energy) return null;
  const e = ENERGY[energy];
  return (
    <span style={{ color: e.color, borderColor: e.color }} className="text-[10px] uppercase tracking-widest border rounded-full px-2 py-0.5 whitespace-nowrap flex items-center gap-1">
      <Battery size={9} color={e.color} /> {e.label}
    </span>
  );
}
function SectionLabel({ children }) {
  return <div style={{ color: T.sub, letterSpacing: "0.2em" }} className="text-[11px] uppercase font-semibold mb-3">{children}</div>;
}
function Card({ children, style, className = "" }) {
  return (
    <div style={{ ...GLASS(), ...style }} className={`levi-card rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  );
}
function Checkbox({ checked, onClick }) {
  const [burst, setBurst] = useState(0);
  const handle = () => { if (!checked) setBurst((n) => n + 1); onClick && onClick(); };
  return (
    <button onClick={handle} className="relative shrink-0" style={{ width: 16, height: 16 }}>
      {burst > 0 && checked && (
        <span key={burst} className="levi-ripple" style={{ border: `2px solid ${T.brass}` }} />
      )}
      <span
        key={"box" + (checked ? "1" : "0")}
        className={checked ? "levi-pop" : ""}
        style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 16, height: 16, borderRadius: 999,
          border: `1px solid ${checked ? T.brass : T.line}`,
          background: checked ? T.brass : "transparent",
          boxShadow: checked ? `0 0 10px ${T.brass}AA` : "none",
          transition: "background .2s ease, border-color .2s ease, box-shadow .2s ease",
        }}
      >
        {checked && <Check size={10} color={T.paper} strokeWidth={3} />}
      </span>
    </button>
  );
}

// Small floating "+N" that rises and fades — the instant reward for a tap.
function GemFloater({ trigger, amount }) {
  if (!trigger) return null;
  return (
    <span key={trigger} className="levi-floater" style={{ color: T.brass, fontWeight: 500 }}>
      <span className="text-xs">+{amount}</span>
    </span>
  );
}

// Number that counts up to its value instead of snapping — makes stats feel live.
function CountUp({ value, duration = 700, className, style, suffix = "" }) {
  const [shown, setShown] = useState(value);
  const fromRef = useRef(value);
  useEffect(() => {
    const from = fromRef.current;
    const to = value;
    if (from === to) return;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setShown(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = to;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return <span className={className} style={style}>{shown}{suffix}</span>;
}

// Sparkle burst overlay for milestones (all Big Three done, level-ups).
function Celebration({ trigger, label }) {
  if (!trigger) return null;
  const colors = [T.brass, T.olive, T.emerald || "#34D399", "#FFD166"];
  const sparks = Array.from({ length: 18 }, (_, i) => {
    const ang = (Math.PI * 2 * i) / 18 + Math.random() * 0.3;
    const dist = 46 + Math.random() * 54;
    return { dx: Math.cos(ang) * dist, dy: Math.sin(ang) * dist, c: colors[i % colors.length], d: Math.random() * 0.12 };
  });
  return (
    <div key={trigger} className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
      <div className="relative">
        {sparks.map((s, i) => (
          <span key={i} className="levi-spark" style={{
            background: s.c, boxShadow: `0 0 8px ${s.c}`,
            ["--dx"]: `${s.dx}px`, ["--dy"]: `${s.dy}px`, animationDelay: `${s.d}s`,
          }} />
        ))}
        {label && (
          <div className="levi-badge-in rounded-2xl px-5 py-3 text-center" style={{ ...GLASS(0.7) }}>
            <div style={{ color: T.brass, fontWeight: 500 }} className="text-xs uppercase tracking-[0.2em]">{label}</div>
          </div>
        )}
      </div>
    </div>
  );
}

function ImagePicker({ image, onChange, size = 72, label = "Add photo" }) {
  const inputRef = useRef(null);
  return (
    <div className="flex items-center gap-3">
      {image ? (
        <img src={image} alt="" style={{ width: size, height: size, objectFit: "cover", borderColor: T.line }} className="rounded-sm border" />
      ) : (
        <div style={{ width: size, height: size, borderColor: T.line, color: T.sub }} className="rounded-sm border border-dashed flex items-center justify-center">
          <ImageIcon size={18} color={T.sub} />
        </div>
      )}
      <div className="flex flex-col gap-1">
        <button
          onClick={() => inputRef.current && inputRef.current.click()}
          style={{ borderColor: T.ink, color: T.ink }}
          className="text-[10px] uppercase tracking-widest border rounded-full px-2.5 py-1"
        >{label}</button>
        {image && <button onClick={() => onChange(null)} style={{ color: T.sub }} className="text-[10px] uppercase tracking-widest">Remove</button>}
      </div>
      <input
        ref={inputRef} type="file" accept="image/*" className="hidden"
        onChange={async (e) => {
          const file = e.target.files && e.target.files[0];
          if (!file) return;
          try { onChange(await fileToResizedDataURL(file)); } catch (err) { console.error(err); }
          e.target.value = "";
        }}
      />
    </div>
  );
}

/* ------------------------------- TODAY ------------------------------- */
function ProgressRing({ pct, size = 150, stroke = 9, children }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - Math.min(1, Math.max(0, pct)));
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="holoRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={T.olive} />
            <stop offset="50%" stopColor={T.brass} />
            <stop offset="100%" stopColor={T.emerald || "#34D399"} />
          </linearGradient>
        </defs>
        <circle cx={size/2} cy={size/2} r={r} stroke={T.line} strokeWidth={stroke} fill="none" />
        <circle cx={size/2} cy={size/2} r={r} stroke="url(#holoRing)" strokeWidth={stroke} fill="none"
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off}
          style={{ transition: "stroke-dashoffset 0.6s ease", filter: `drop-shadow(0 0 8px ${T.brass}66)` }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  );
}

function GemIcon({ size = 22, glow = true }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={glow ? { filter: `drop-shadow(0 0 6px ${T.brass})` } : undefined}>
      <defs>
        <linearGradient id="gemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={T.olive} /><stop offset="55%" stopColor={T.brass} /><stop offset="100%" stopColor={T.emerald || "#34D399"} />
        </linearGradient>
      </defs>
      <path d="M6 3h12l4 6-10 12L2 9l4-6z" stroke="url(#gemGrad)" strokeWidth="1.4" fill={`${T.brass}18`} strokeLinejoin="round" />
      <path d="M2 9h20M9 3l3 6 3-6M12 9v12" stroke="url(#gemGrad)" strokeWidth="0.9" opacity="0.7" />
    </svg>
  );
}

function StatPill({ icon: PillIcon, label, value, color, onAdd, onSub }) {
  return (
    <div style={{ ...GLASS(0.55) }} className="rounded-2xl px-4 py-3 flex-1 min-w-0">
      <div className="flex items-center gap-1.5 mb-1">
        <PillIcon size={13} color={color} style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
        <span style={{ color: T.sub, fontWeight: 300 }} className="text-[10px] uppercase tracking-widest truncate">{label}</span>
      </div>
      <div className="flex items-center justify-between gap-1">
        <span style={{ color: T.ink, fontWeight: 300 }} className="text-xl">{value}</span>
        {onAdd && (
          <div className="flex gap-1 shrink-0">
            <button onClick={onSub} style={{ borderColor: T.line, color: T.sub }} className="w-5 h-5 rounded-full border text-[11px] leading-none">−</button>
            <button onClick={onAdd} style={{ borderColor: color, color: color, boxShadow: `0 0 6px ${color}44` }} className="w-5 h-5 rounded-full border text-[11px] leading-none">+</button>
          </div>
        )}
      </div>
      <div style={{ background: T.line }} className="h-[3px] rounded-full overflow-hidden mt-2 relative levi-shimmer">
        <div style={{ background: `linear-gradient(90deg, ${color}, ${T.brass})`, width: "100%", opacity: 0.85 }} className="h-full" />
      </div>
    </div>
  );
}

// The habit-tracker centrepiece: 12 weeks of consistency, one square per day,
// brightness = how much of that day you completed. Seeing the grid fill in is
// what makes the work feel like it accumulates.
function ConsistencyGrid({ state }) {
  const WEEKS = 12;
  const today = new Date(); today.setHours(0,0,0,0);
  const end = new Date(today);
  end.setDate(end.getDate() + (6 - end.getDay())); // end of current week
  const days = [];
  for (let i = WEEKS * 7 - 1; i >= 0; i--) {
    const d = new Date(end); d.setDate(d.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
    days.push({ key, date: d, future: d > today });
  }
  const logByDate = {};
  (state.dailyLog || []).forEach((e) => { logByDate[e.date] = e; });

  const scoreFor = (key) => {
    if (key === todayStr()) {
      const sc = Object.values(state.eveningScorecard || {});
      const done = sc.filter(Boolean).length;
      const sched = resolveSchedule(state, key);
      const schedDone = sched.filter((b) => b.done).length;
      const total = sc.length + sched.length;
      return total ? (done + schedDone) / total : 0;
    }
    const e = logByDate[key];
    if (!e) return null;
    const a = e.scorecardTotal ? e.scorecardDone / e.scorecardTotal : 0;
    const b = e.bigThreeTotal ? e.bigThreeDone / e.bigThreeTotal : 0;
    return (a + b) / 2;
  };

  const cols = [];
  for (let w = 0; w < WEEKS; w++) cols.push(days.slice(w * 7, w * 7 + 7));
  const activeDays = days.filter((d) => !d.future && (scoreFor(d.key) || 0) > 0.3).length;

  return (
    <div style={{ ...GLASS() }} className="rounded-3xl p-5 mb-4">
      <div className="flex items-center justify-between mb-3">
        <span style={{ color: T.sub, fontWeight: 300 }} className="text-[10px] uppercase tracking-[0.2em]">Consistency</span>
        <span style={{ color: T.sub, fontWeight: 300 }} className="text-[10px]">
          <CountUp value={activeDays} style={{ color: T.brass }} /> strong days
        </span>
      </div>
      <div className="flex gap-[3px] overflow-hidden">
        {cols.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((d) => {
              const s = d.future ? null : scoreFor(d.key);
              const isToday = d.key === todayStr();
              let bg = "rgba(255,255,255,0.05)";
              if (s !== null && s > 0) {
                const a = 0.18 + Math.min(1, s) * 0.72;
                bg = `rgba(185,140,255,${a.toFixed(2)})`;
              }
              return (
                <div key={d.key} title={`${d.key}${s !== null ? ` — ${Math.round((s||0)*100)}%` : ""}`}
                  style={{
                    width: 11, height: 11, borderRadius: 3, background: bg,
                    outline: isToday ? `1px solid ${T.olive}` : "none",
                    boxShadow: s !== null && s > 0.66 ? `0 0 6px ${T.brass}66` : "none",
                  }} />
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end gap-1.5 mt-2">
        <span style={{ color: T.sub }} className="text-[9px]">less</span>
        {[0.12, 0.34, 0.56, 0.78, 0.95].map((a) => (
          <span key={a} style={{ width: 9, height: 9, borderRadius: 2, background: `rgba(185,140,255,${a})` }} />
        ))}
        <span style={{ color: T.sub }} className="text-[9px]">more</span>
      </div>
    </div>
  );
}


// Slim countdown to a big upcoming date (e.g. leaving for Korea). Tap to edit.

// Small "Ask Claude" bar for Home. Shares the same chat history as the Assistant
// page; hidden unless an AI connection exists (cloud login or a key in Settings).
function AskClaudeBar({ state, setState }) {
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const [answer, setAnswer] = useState("");
  if (!(cloudAIAvailable() || getApiKey())) return null;
  const send = async () => {
    const text = q.trim();
    if (!text || busy) return;
    setQ(""); setBusy(true); setAnswer("");
    const userMsg = { id: uid(), role: "user", text, ts: Date.now() };
    const history = [...(state.assistantChat || []), userMsg].slice(-16).map((m) => ({ role: m.role, text: m.text }));
    const reply = await askClaudeConversation(history, buildAssistantContext(state));
    setState((s) => ({ ...s, assistantChat: [...(s.assistantChat || []), userMsg, { id: uid(), role: "assistant", text: reply, ts: Date.now() }].slice(-60) }));
    setAnswer(reply); setBusy(false);
  };
  return (
    <div className="mb-4">
      <div style={{ ...GLASS(0.5) }} className="rounded-full flex items-center gap-2 pl-4 pr-1.5 py-1.5">
        <input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Ask Claude about your day…"
          style={{ color: T.ink, fontWeight: 300 }} className="flex-1 min-w-0 bg-transparent text-sm focus:outline-none" />
        <button onClick={send} disabled={busy || !q.trim()} style={{ background: HOLO(), color: T.paper, opacity: busy || !q.trim() ? 0.5 : 1 }} className="text-[10px] uppercase tracking-widest px-4 py-2 rounded-full shrink-0">{busy ? "…" : "Ask"}</button>
      </div>
      {(busy || answer) && (
        <div style={{ ...GLASS(0.5) }} className="rounded-2xl p-4 mt-2 relative">
          {answer && <button onClick={() => setAnswer("")} className="absolute top-2 right-3"><X size={12} color={T.sub} /></button>}
          <div style={{ color: T.ink, fontWeight: 300 }} className="text-sm whitespace-pre-wrap pr-4">{busy ? "Thinking…" : answer}</div>
        </div>
      )}
    </div>
  );
}

function CountdownChip({ state, setState }) {
  const list = state.countdowns || [];
  const [openId, setOpenId] = useState(null);
  if (!list.length) return null;
  const midnight = new Date(); midnight.setHours(0, 0, 0, 0);
  const patch = (id, p) => setState((s) => ({ ...s, countdowns: s.countdowns.map((x) => (x.id === id ? { ...x, ...p } : x)) }));
  const del = (id) => { setState((s) => ({ ...s, countdowns: s.countdowns.filter((x) => x.id !== id) })); setOpenId(null); };
  const open = list.find((c) => c.id === openId);
  return (
    <div className="mt-2">
      <div className="flex flex-wrap gap-2">
        {list.map((cd) => {
          const days = Math.ceil((new Date(cd.date + "T00:00:00") - midnight) / 86400000);
          return (
            <button key={cd.id} onClick={() => setOpenId(openId === cd.id ? null : cd.id)} style={{ ...GLASS(0.45), color: T.ink, fontWeight: 300 }} className="text-[11px] rounded-full px-3 py-1 inline-flex items-center gap-2">
              <span style={{ color: T.brass }}>{cd.label}</span>
              <span>{days > 0 ? `${days} days` : days === 0 ? "today" : "now"}</span>
            </button>
          );
        })}
      </div>
      {open && (
        <div style={{ ...GLASS(0.5) }} className="rounded-2xl p-3 mt-2 flex gap-2 items-center flex-wrap">
          <input value={open.label} onChange={(e) => patch(open.id, { label: e.target.value })} style={{ color: T.ink, borderColor: T.line }} className="w-36 border-b bg-transparent text-xs py-1 focus:outline-none" />
          <input type="date" value={open.date} onChange={(e) => patch(open.id, { date: e.target.value })} style={{ color: T.brass, background: "transparent" }} className="text-xs focus:outline-none" />
          <button onClick={() => del(open.id)}><X size={12} color={T.sub} /></button>
        </div>
      )}
    </div>
  );
}

function TodayView({ state, setState, go }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const weekday = WEEKDAY_KEYS[new Date().getDay()];
  const plan = state.weeklyPlan[weekday] || DEFAULT_WEEKLY_PLAN[weekday];
  const today = todayStr();

  const [floater, setFloater] = useState(null);   // {n, amount}
  const [celebrate, setCelebrate] = useState(null); // {n, label}
  const fireFloater = (amount) => setFloater((f) => ({ n: (f ? f.n : 0) + 1, amount }));
  const fireCelebration = (label) => {
    setCelebrate((c2) => ({ n: (c2 ? c2.n : 0) + 1, label }));
    setTimeout(() => setCelebrate(null), 1400);
  };
  const awardGems = (s, delta) => ({ ...s, gems: Math.max(0, (s.gems || 0) + delta) });

  const toggleTask = (id) => setState((s) => {
    const tasks = s.todayTasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
    const toggled = s.todayTasks.find((t) => t.id === id);
    let next = { ...s, todayTasks: tasks };
    if (toggled && toggled.big) {
      next = awardGems(next, toggled.done ? -1 : 1);
      if (!toggled.done) setTimeout(() => fireFloater(1), 0);
    }
    const bigs = tasks.filter((t) => t.big);
    if (bigs.length === 3 && bigs.every((t) => t.done) && s.gemFlags?.bigThree !== today) {
      next = awardGems({ ...next, gemFlags: { ...next.gemFlags, bigThree: today } }, 5);
      setTimeout(() => { fireFloater(5); fireCelebration("Big Three complete"); }, 0);
    }
    return next;
  });
  const toggleScorecard = (key) => setState((s) => {
    const sc = { ...s.eveningScorecard, [key]: !s.eveningScorecard[key] };
    let next = { ...s, eveningScorecard: sc };
    const doneCount = Object.values(sc).filter(Boolean).length;
    if (doneCount === Object.keys(sc).length && s.gemFlags?.scorecard !== today) {
      next = awardGems({ ...next, gemFlags: { ...next.gemFlags, scorecard: today } }, 3);
      setTimeout(() => { fireFloater(3); fireCelebration("Perfect day"); }, 0);
    }
    return next;
  });
  const adjustWater = (delta) => setState((s) => {
    const bottles = Math.max(0, s.health.waterBottles + delta);
    let next = { ...s, health: { ...s.health, waterBottles: bottles } };
    if (delta > 0 && bottles >= 6 && s.gemFlags?.water !== today) {
      next = awardGems({ ...next, gemFlags: { ...next.gemFlags, water: today } }, 2);
      setTimeout(() => { fireFloater(2); fireCelebration("Hydration goal"); }, 0);
    }
    return next;
  });
  const adjustSleep = (delta) => setState((s) => ({ ...s, health: { ...s.health, sleepHours: Math.max(0, s.health.sleepHours + delta) } }));

  const bigThree = state.todayTasks.filter((t) => t.big);
  const planItems = state.todayTasks.filter((t) => !t.big);
  const doneTasks = state.todayTasks.filter((t) => t.done).length;
  const scorecardKeys = Object.keys(state.eveningScorecard);
  const scorecardDone = Object.values(state.eveningScorecard).filter(Boolean).length;
  const pct = (doneTasks + scorecardDone) / ((state.todayTasks.length || 1) + scorecardKeys.length);

  const todayEvents = state.calendarEvents.filter((e) => e.date === today).sort((a, b) => (a.time || "").localeCompare(b.time || ""));
  const scheduleRows = [
    ...todayEvents.map((e) => ({ id: e.id, time: e.time || "", text: e.title, pillar: e.pillar, event: true })),
    ...planItems.map((t) => ({ id: t.id, time: "", text: t.text, pillar: t.pillar, done: t.done })),
  ];

  const quick = [
    { key: "timer", label: "Timer", icon: TimerIcon },
    { key: "calendar", label: "Calendar", icon: CalendarDays },
    { key: "education", label: "Education", icon: GraduationCap },
    { key: "health", label: "Health", icon: Dumbbell },
    { key: "archeor", label: "Business", icon: Sparkles },
  ];

  const scorecardItems = [
    ["slept", "Slept 8 hours"], ["ateBreakfast", "Ate breakfast"], ["moved", "Moved my body"],
    ["read", "Read"], ["skill", "Practiced one skill"], ["deepWork", "Deep work completed"],
    ["outside", "Went outside"], ["selfCare", "Took care of myself"], ["plannedTomorrow", "Planned tomorrow"],
  ];

  return (
    <div className="max-w-2xl mx-auto">
      {/* header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div style={{ color: T.ink, fontWeight: 300, letterSpacing: "-0.01em" }} className="text-3xl">{greeting}, <span style={{ fontStyle: "italic", background: HOLO(), WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Levi.</span></div>
          <div style={{ color: T.sub, fontWeight: 300 }} className="text-sm mt-1">{new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}</div>
          {state.dayThemes && state.dayThemes[weekday] && (
            <div style={{ color: T.brass, fontWeight: 300 }} className="text-[11px] uppercase tracking-[0.2em] mt-1">{state.dayThemes[weekday]} Day</div>
          )}
          <CountdownChip state={state} setState={setState} />
        </div>
        <div style={{ ...GLASS(0.55) }} className="relative flex items-center gap-1.5 rounded-full px-3 py-1.5 levi-alive">
          <GemIcon size={15} />
          <CountUp value={state.gems || 0} style={{ color: T.ink, fontWeight: 400 }} className="text-sm" />
          {floater && <GemFloater trigger={floater.n} amount={floater.amount} />}
        </div>
      </div>

      <AskClaudeBar state={state} setState={setState} />

      {/* today focus */}
      <div style={{ ...GLASS(), animationDelay: "40ms" }} className="levi-rise rounded-3xl p-6 mb-4 relative overflow-hidden">
        <div className="absolute -top-8 -right-8 opacity-90 pointer-events-none"><GemIcon size={130} /></div>
        <div style={{ color: T.sub, fontWeight: 300 }} className="text-[10px] uppercase tracking-[0.2em] mb-1">Today Focus</div>
        <div className="flex items-baseline gap-2 mb-4">
          <span style={{ color: T.ink, fontWeight: 200 }} className="text-4xl">{bigThree.length}</span>
          <span style={{ color: T.sub, fontWeight: 300 }} className="text-[10px] uppercase tracking-[0.2em]">Priorities</span>
        </div>
        <div className="flex flex-col gap-2.5">
          {bigThree.map((t) => (
            <div key={t.id} className={`flex items-center gap-3 rounded-lg px-1 -mx-1 ${t.done ? "levi-row-flash" : ""}`}>
              <Checkbox checked={t.done} onClick={() => toggleTask(t.id)} />
              <span style={{ color: t.done ? T.sub : T.ink, textDecoration: t.done ? "line-through" : "none", fontWeight: 300 }} className="text-sm">{t.text}</span>
            </div>
          ))}
          {bigThree.length === 0 && <span style={{ color: T.sub, fontWeight: 300 }} className="text-sm">Set in Planning → Weekly.</span>}
        </div>
      </div>

      {/* stat pills */}
      <div className="levi-rise flex gap-3 mb-4" style={{ animationDelay: "110ms" }}>
        <StatPill icon={Moon} label="Sleep" value={`${state.health.sleepHours}h`} color={T.brass} onAdd={() => adjustSleep(0.5)} onSub={() => adjustSleep(-0.5)} />
        <StatPill icon={Flame} label="Steps" value={state.health.steps >= 1000 ? `${(state.health.steps/1000).toFixed(1)}k` : state.health.steps} color={T.emerald || "#34D399"} />
        <StatPill icon={Droplets} label="Water" value={state.health.waterBottles} color={T.olive} onAdd={() => adjustWater(1)} onSub={() => adjustWater(-1)} />
      </div>

      {/* progress ring + streak */}
      <div style={{ ...GLASS(), animationDelay: "180ms" }} className="levi-rise rounded-3xl p-6 mb-4 flex items-center gap-6">
        <ProgressRing pct={pct}>
          <span style={{ color: T.ink, fontWeight: 200 }} className="text-3xl"><CountUp value={Math.round(pct * 100)} /><span className="text-base">%</span></span>
          <span style={{ color: T.sub, fontWeight: 300 }} className="text-[9px] uppercase tracking-[0.2em]">Complete</span>
        </ProgressRing>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <Flame size={15} color={T.brass} style={{ filter: `drop-shadow(0 0 5px ${T.brass})` }} />
            <span style={{ color: T.ink, fontWeight: 300 }} className="text-sm"><CountUp value={state.streaks.current} />-day streak</span>
          </div>
          <div className="flex flex-col gap-1.5">
            {(plan.deepWork || plan.skillFocus) ? (
              <>
                {plan.deepWork && <div><span style={{ color: T.sub }} className="text-[9px] uppercase tracking-[0.18em]">Deep Work</span><div style={{ color: T.ink, fontWeight: 300 }} className="text-xs">{plan.deepWork}</div></div>}
                {plan.skillFocus && <div><span style={{ color: T.sub }} className="text-[9px] uppercase tracking-[0.18em]">Skill</span><div style={{ color: T.ink, fontWeight: 300 }} className="text-xs">{plan.skillFocus}</div></div>}
              </>
            ) : <span style={{ color: T.sub, fontWeight: 300 }} className="text-xs">No focus set — Planning → Weekly.</span>}
          </div>
        </div>
      </div>

      <ConsistencyGrid state={state} />

      {/* quick access */}
      <div className="flex items-center justify-between mb-2 px-1">
        <span style={{ color: T.sub, fontWeight: 300 }} className="text-[10px] uppercase tracking-[0.2em]">Quick Access</span>
      </div>
      <div className="grid grid-cols-5 gap-2 mb-4">
        {quick.map((q) => {
          const QIcon = q.icon;
          return (
            <button key={q.key} onClick={() => go(q.key)} style={{ ...GLASS(0.55) }} className="rounded-2xl py-3 flex flex-col items-center gap-1.5">
              <QIcon size={17} color={T.brass} strokeWidth={1.5} style={{ filter: `drop-shadow(0 0 4px ${T.brass}66)` }} />
              <span style={{ color: T.sub, fontWeight: 300 }} className="text-[9px]">{q.label}</span>
            </button>
          );
        })}
      </div>

      {/* today schedule — same shared model as the Calendar day view */}
      <div className="flex items-center justify-between mb-2 px-1">
        <span style={{ color: T.sub, fontWeight: 300 }} className="text-[10px] uppercase tracking-[0.2em]">Today Schedule</span>
        <button onClick={() => go("calendar")} style={{ color: T.brass, fontWeight: 300 }} className="text-[10px] uppercase tracking-widest">Open Calendar</button>
      </div>
      <div className="mb-4">
        <ScheduleEditor state={state} setState={setState} dateStr={today} />
      </div>

      {celebrate && <Celebration trigger={celebrate.n} label={celebrate.label} />}

      {/* evening scorecard */}
      <div className="flex items-center justify-between mb-2 px-1">
        <span style={{ color: T.sub, fontWeight: 300 }} className="text-[10px] uppercase tracking-[0.2em]">Evening Scorecard</span>
        <span style={{ color: T.sub, fontWeight: 300 }} className="text-[10px]">{scorecardDone}/{scorecardItems.length}</span>
      </div>
      <div style={{ ...GLASS() }} className="rounded-3xl p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4">
          {scorecardItems.map(([key, label]) => (
            <div key={key} className="flex items-center gap-3">
              <Checkbox checked={state.eveningScorecard[key]} onClick={() => toggleScorecard(key)} />
              <span style={{ color: state.eveningScorecard[key] ? T.sub : T.ink, textDecoration: state.eveningScorecard[key] ? "line-through" : "none", fontWeight: 300 }} className="text-sm">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ IDENTITY ------------------------------ */
function EditableBlock({ label, value, onChange, multiline }) {
  return (
    <div className="mb-6">
      <SectionLabel>{label}</SectionLabel>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} placeholder="Write it plainly, in your own words."
          style={{ background: "transparent", color: T.ink, borderColor: T.line, fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif" }}
          className="w-full border-b resize-none text-lg py-1 focus:outline-none focus:border-black" />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder="Write it plainly, in your own words."
          style={{ background: "transparent", color: T.ink, borderColor: T.line, fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif" }}
          className="w-full border-b text-lg py-1 focus:outline-none focus:border-black" />
      )}
    </div>
  );
}
function ListEditor({ label, items, onChange }) {
  const [draft, setDraft] = useState("");
  const add = () => { if (!draft.trim()) return; onChange([...items, draft.trim()]); setDraft(""); };
  return (
    <div className="mb-6">
      <SectionLabel>{label}</SectionLabel>
      <div className="flex flex-col gap-2 mb-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span style={{ color: T.brass }}>—</span>
            <span style={{ color: T.ink }} className="flex-1">{item}</span>
            <button onClick={() => onChange(items.filter((_, j) => j !== i))}><X size={12} color={T.sub} /></button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="Add..." style={{ borderColor: T.line }} className="flex-1 border-b text-sm py-1 bg-transparent focus:outline-none" />
        <button onClick={add}><Plus size={14} color={T.brass} /></button>
      </div>
    </div>
  );
}
function IdentityView({ state, setState }) {
  const set = (k, v) => setState((s) => ({ ...s, identity: { ...s.identity, [k]: v } }));
  return (
    <div className="max-w-xl">
      <h1 style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif", color: T.ink }} className="text-3xl mb-1">Identity Manual</h1>
      <p style={{ color: T.sub }} className="text-sm mb-8">Level 1 — the vision. Who am I becoming? This almost never changes.</p>
      <EditableBlock label="Mission" value={state.identity.mission} onChange={(v) => set("mission", v)} multiline />
      <EditableBlock label="Vision" value={state.identity.vision} onChange={(v) => set("vision", v)} multiline />
      <EditableBlock label="Motto" value={state.identity.motto} onChange={(v) => set("motto", v)} />
      <EditableBlock label="Future Self" value={state.identity.futureSelf} onChange={(v) => set("futureSelf", v)} multiline />
      <ListEditor label="Core Values" items={state.identity.values} onChange={(v) => set("values", v)} />
      <ListEditor label="Non-Negotiables" items={state.identity.nonNegotiables} onChange={(v) => set("nonNegotiables", v)} />
    </div>
  );
}

/* ------------------------------ PLANNING ------------------------------ */
function PlanningView({ state, setState }) {
  const [tab, setTab] = useState("annual");
  const identity = state.identity;
  const setIdentity = (fn) => setState((s) => ({ ...s, identity: fn(s.identity) }));
  const [qDraft, setQDraft] = useState("");
  const [mDraft, setMDraft] = useState("");
  const [dailyDraft, setDailyDraft] = useState("");
  const [itemDrafts, setItemDrafts] = useState({});
  const tabs = [
    { key: "annual", label: "Annual Theme" },
    { key: "quarterly", label: "Quarterly Focus" },
    { key: "monthly", label: "Monthly Projects" },
    { key: "weekly", label: "Weekly" },
    { key: "daily", label: "Daily" },
    { key: "template", label: "Template" },
  ];
  const WEEKDAY_LABELS = { monday: "Monday", tuesday: "Tuesday", wednesday: "Wednesday", thursday: "Thursday", friday: "Friday", saturday: "Saturday", sunday: "Sunday" };
  const setDayPlan = (dayKey, fn) => setState((s) => ({ ...s, weeklyPlan: { ...s.weeklyPlan, [dayKey]: fn(s.weeklyPlan[dayKey]) } }));
  const setBigThreeSlot = (dayKey, index, value) => setDayPlan(dayKey, (p) => ({ ...p, bigThree: p.bigThree.map((b, i) => i === index ? value : b) }));

  const todayWeekday = WEEKDAY_KEYS[new Date().getDay()];
  const addDailyItem = () => {
    if (!dailyDraft.trim()) return;
    setState((s) => ({ ...s, todayTasks: [...s.todayTasks, { id: uid(), text: dailyDraft.trim(), pillar: "life", energy: "medium", big: false, done: false, source: "daily" }] }));
    setDailyDraft("");
  };
  const removeDailyItem = (id) => setState((s) => ({ ...s, todayTasks: s.todayTasks.filter((t) => t.id !== id) }));

  return (
    <div className="max-w-xl">
      <h1 style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif", color: T.ink }} className="text-3xl mb-1">Planning</h1>
      <div className="flex flex-wrap gap-1 mb-8" style={{ borderBottom: `1px solid ${T.line}` }}>
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)}
            style={{ color: tab === t.key ? T.ink : T.sub, borderColor: tab === t.key ? T.brass : "transparent" }}
            className="text-xs uppercase tracking-widest px-3 py-2 border-b-2 -mb-px">{t.label}</button>
        ))}
      </div>

      {tab === "annual" && (
        <Card>
          <SectionLabel>{identity.annualTheme.year} — this year's one job</SectionLabel>
          <input value={identity.annualTheme.theme}
            onChange={(e) => setIdentity((i) => ({ ...i, annualTheme: { ...i.annualTheme, theme: e.target.value } }))}
            placeholder="e.g. Build the foundation."
            style={{ borderColor: T.line, color: T.ink, fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif" }}
            className="w-full border-b text-xl py-2 bg-transparent focus:outline-none" />
          <p style={{ color: T.sub }} className="text-xs mt-3">Everything else this year should support this one sentence.</p>
        </Card>
      )}

      {tab === "quarterly" && (
        <div>
          <p style={{ color: T.sub }} className="text-xs mb-4">Every three months, ask: what would make the biggest difference if I finished it?</p>
          <div className="flex flex-col gap-2 mb-4">
            {identity.quarterlyFocus.map((q) => (
              <Card key={q.id} className="flex items-center gap-3">
                <Checkbox checked={q.done} onClick={() => setIdentity((i) => ({ ...i, quarterlyFocus: i.quarterlyFocus.map((x) => x.id === q.id ? { ...x, done: !x.done } : x) }))} />
                <span style={{ color: q.done ? T.sub : T.ink, textDecoration: q.done ? "line-through" : "none" }} className="text-sm flex-1">{q.text}</span>
                <span style={{ color: T.brass }} className="text-xs uppercase tracking-wider">{q.quarter}</span>
                <button onClick={() => setIdentity((i) => ({ ...i, quarterlyFocus: i.quarterlyFocus.filter((x) => x.id !== q.id) }))}><X size={12} color={T.sub} /></button>
              </Card>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={qDraft} onChange={(e) => setQDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && qDraft.trim()) {
                setIdentity((i) => ({ ...i, quarterlyFocus: [...i.quarterlyFocus, { id: uid(), text: qDraft.trim(), quarter: `${CURRENT_QUARTER} ${CURRENT_YEAR}`, done: false }] }));
                setQDraft("");
              }}}
              placeholder="Add a focus for this quarter..." style={{ borderColor: T.line }}
              className="flex-1 border-b text-sm py-1 bg-transparent focus:outline-none" />
          </div>
        </div>
      )}

      {tab === "monthly" && (
        <div>
          <p style={{ color: T.sub }} className="text-xs mb-4">Not 100 tasks — a small number of real projects for {getMonthName()}.</p>
          <div className="flex flex-col gap-2 mb-4">
            {identity.monthlyProjects.map((m) => (
              <Card key={m.id} className="flex items-center gap-3">
                <Checkbox checked={m.done} onClick={() => setIdentity((i) => ({ ...i, monthlyProjects: i.monthlyProjects.map((x) => x.id === m.id ? { ...x, done: !x.done } : x) }))} />
                <span style={{ color: m.done ? T.sub : T.ink, textDecoration: m.done ? "line-through" : "none" }} className="text-sm flex-1">{m.title}</span>
                <button onClick={() => setIdentity((i) => ({ ...i, monthlyProjects: i.monthlyProjects.filter((x) => x.id !== m.id) }))}><X size={12} color={T.sub} /></button>
              </Card>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={mDraft} onChange={(e) => setMDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && mDraft.trim()) {
                setIdentity((i) => ({ ...i, monthlyProjects: [...i.monthlyProjects, { id: uid(), title: mDraft.trim(), notes: "", month: getMonthName(), done: false }] }));
                setMDraft("");
              }}}
              placeholder="Add a project for this month..." style={{ borderColor: T.line }}
              className="flex-1 border-b text-sm py-1 bg-transparent focus:outline-none" />
          </div>
        </div>
      )}

      {tab === "weekly" && (
        <div>
          <p style={{ color: T.sub }} className="text-xs mb-4">
            The recurring shape of your week — same structure every week, but Deep Work and Skill Focus change per
            day. This is what shows up read-only under Today when that day comes around.
          </p>
          <div className="flex flex-col gap-4">
            {Object.keys(WEEKDAY_LABELS).map((dayKey) => {
              const p = state.weeklyPlan[dayKey];
              const isToday = dayKey === todayWeekday;
              return (
                <Card key={dayKey} style={isToday ? { borderColor: T.brass } : {}}>
                  <div className="flex items-center gap-2 mb-3">
                    <span style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif", color: T.ink }} className="text-lg">{WEEKDAY_LABELS[dayKey]}</span>
                    {isToday && <span style={{ color: T.brass }} className="text-[10px] uppercase tracking-widest">Today</span>}
                  </div>
                  <div className="flex flex-col gap-2 mb-3">
                    {p.bigThree.map((val, i) => (
                      <input key={i} value={val} onChange={(e) => setBigThreeSlot(dayKey, i, e.target.value)}
                        placeholder={`Big Three #${i + 1}`} style={{ borderColor: T.line, color: T.ink }}
                        className="w-full border-b text-sm py-1 bg-transparent focus:outline-none" />
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <input value={p.deepWork} onChange={(e) => setDayPlan(dayKey, (pp) => ({ ...pp, deepWork: e.target.value }))}
                      placeholder="Deep work focus" style={{ borderColor: T.line, color: T.ink }} className="border-b text-sm py-1 bg-transparent focus:outline-none" />
                    <select value={p.skillFocus} onChange={(e) => setDayPlan(dayKey, (pp) => ({ ...pp, skillFocus: e.target.value }))}
                      style={{ borderColor: T.line, color: T.ink, background: "transparent" }} className="border-b text-sm py-1 focus:outline-none">
                      <option value="">Skill focus…</option>
                      {state.skills.map((sk) => <option key={sk.id} value={sk.name}>{sk.name}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2 mb-2">
                    {p.items.map((it) => (
                      <div key={it.id} className="flex items-center gap-2">
                        <span style={{ color: T.sub }} className="text-xs">—</span>
                        <span style={{ color: T.ink }} className="text-sm flex-1">{it.text}</span>
                        <button onClick={() => setDayPlan(dayKey, (pp) => ({ ...pp, items: pp.items.filter((x) => x.id !== it.id) }))}><X size={11} color={T.sub} /></button>
                      </div>
                    ))}
                  </div>
                  <input value={itemDrafts[dayKey] || ""} onChange={(e) => setItemDrafts({ ...itemDrafts, [dayKey]: e.target.value })}
                    onKeyDown={(e) => { if (e.key === "Enter" && (itemDrafts[dayKey] || "").trim()) {
                      setDayPlan(dayKey, (pp) => ({ ...pp, items: [...pp.items, { id: uid(), text: itemDrafts[dayKey].trim() }] }));
                      setItemDrafts({ ...itemDrafts, [dayKey]: "" });
                    }}}
                    placeholder="Add a recurring item for this day..." style={{ borderColor: T.line }}
                    className="w-full border-b text-sm py-1 bg-transparent focus:outline-none" />
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {tab === "daily" && (
        <div>
          <p style={{ color: T.sub }} className="text-xs mb-4">One-off items for today only — these don't recur and clear at the next day change. Shows up under Today's Plan.</p>
          <div className="flex flex-col gap-2 mb-4">
            {state.todayTasks.filter((t) => !t.big).map((t) => (
              <Card key={t.id} className="flex items-center gap-3">
                <span style={{ color: T.ink }} className="text-sm flex-1">{t.text}</span>
                <span style={{ color: T.sub }} className="text-[10px] uppercase tracking-wider">{t.source === "weekly" ? "from weekly" : "one-off"}</span>
                <button onClick={() => removeDailyItem(t.id)}><X size={12} color={T.sub} /></button>
              </Card>
            ))}
            {state.todayTasks.filter((t) => !t.big).length === 0 && <span style={{ color: T.sub }} className="text-sm">Nothing added for today yet.</span>}
          </div>
          <div className="flex gap-2">
            <input value={dailyDraft} onChange={(e) => setDailyDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addDailyItem()}
              placeholder="Add something for today only..." style={{ borderColor: T.line }} className="flex-1 border-b text-sm py-1 bg-transparent focus:outline-none" />
            <button onClick={addDailyItem}><Plus size={14} color={T.brass} /></button>
          </div>
        </div>
      )}
      {tab === "template" && (
        <div>
          <p style={{ color: T.sub, fontWeight: 300 }} className="text-xs mb-4">Your day's skeleton. Same time-blocks every day — only the contents change (in Calendar). Each weekday has a theme so you never wonder what to focus on.</p>

          <SectionLabel>Day Themes</SectionLabel>
          <div className="flex flex-col gap-2 mb-8">
            {["monday","tuesday","wednesday","thursday","friday","saturday","sunday"].map((day) => (
              <Card key={day} className="flex items-center gap-3 py-3">
                <span style={{ color: T.brass, fontWeight: 300 }} className="text-xs uppercase tracking-wider w-24 shrink-0">{WEEKDAY_LABELS[day]}</span>
                <input value={state.dayThemes[day] || ""} onChange={(e) => setState((s) => ({ ...s, dayThemes: { ...s.dayThemes, [day]: e.target.value } }))}
                  placeholder="Theme..." style={{ color: T.ink }} className="flex-1 bg-transparent text-sm focus:outline-none" />
              </Card>
            ))}
          </div>

          <p style={{ color: T.sub, fontWeight: 300 }} className="text-xs">Your timed schedule is edited in Calendar → Day (or on Home) — flip the toggle there to "Every [weekday]" to change the repeating template.</p>
        </div>
      )}
    </div>
  );
}
function RoutineBlock({ title, items, onToggle, onAdd, onRemove }) {
  const [draft, setDraft] = useState("");
  return (
    <Card className="mb-4">
      <SectionLabel>{title}</SectionLabel>
      <div className="flex flex-col gap-2 mb-3">
        {items.map((it) => (
          <div key={it.id} className="flex items-center gap-3">
            <Checkbox checked={it.done} onClick={() => onToggle(it.id)} />
            <span style={{ color: it.done ? T.sub : T.ink, textDecoration: it.done ? "line-through" : "none" }} className="text-sm flex-1">{it.text}</span>
            <button onClick={() => onRemove(it.id)}><Trash2 size={12} color={T.sub} /></button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input value={draft} onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && draft.trim()) { onAdd(draft.trim()); setDraft(""); } }}
          placeholder="Add step..." style={{ borderColor: T.line }} className="flex-1 border-b text-sm py-1 bg-transparent focus:outline-none" />
      </div>
    </Card>
  );
}
function daysSince(dateStr) {
  if (!dateStr) return Infinity;
  const then = new Date(dateStr); then.setHours(0,0,0,0);
  const now = new Date(); now.setHours(0,0,0,0);
  return Math.round((now - then) / 86400000);
}

function RecurringList({ items, intervalDays, onToggle, onAdd, onRemove }) {
  const [draft, setDraft] = useState("");
  return (
    <div>
      <div className="flex flex-col gap-2 mb-4">
        {items.map((it) => {
          const since = daysSince(it.lastDone);
          const due = since >= intervalDays;
          const label = it.lastDone == null ? "never done" : since === 0 ? "done today" : since === 1 ? "1 day ago" : `${since} days ago`;
          return (
            <Card key={it.id} className="flex items-center gap-3 py-3">
              <button onClick={() => onToggle(it.id)}
                style={{ borderColor: due ? T.brass : T.line, background: due ? "transparent" : `${T.olive}22`, boxShadow: due ? `0 0 8px ${T.brass}55` : "none" }}
                className="w-5 h-5 rounded-full border flex items-center justify-center shrink-0">
                {!due && <Check size={11} color={T.olive} strokeWidth={3} />}
              </button>
              <div className="flex-1 min-w-0">
                <div style={{ color: T.ink, fontWeight: 300 }} className="text-sm">{it.text}</div>
                <div style={{ color: due ? T.brass : T.sub, fontWeight: 300 }} className="text-[10px] uppercase tracking-wider">{due ? "Due now" : "Up to date"} · {label}</div>
              </div>
              <button onClick={() => onRemove(it.id)}><X size={12} color={T.sub} /></button>
            </Card>
          );
        })}
      </div>
      <div className="flex gap-2">
        <input value={draft} onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && draft.trim()) { onAdd(draft.trim()); setDraft(""); } }}
          placeholder="Add a task..." style={{ borderColor: T.line }} className="flex-1 border-b text-sm py-1 bg-transparent focus:outline-none" />
        <button onClick={() => { if (draft.trim()) { onAdd(draft.trim()); setDraft(""); } }}><Plus size={14} color={T.brass} /></button>
      </div>
    </div>
  );
}

function DailyOSView({ state, setState }) {
  const [tab, setTab] = useState("daily");
  const update = (period, fn) => setState((s) => ({ ...s, routines: { ...s.routines, [period]: fn(s.routines[period]) } }));
  const blocks = [{ key: "morning", title: "Morning" }, { key: "afternoon", title: "Afternoon" }, { key: "evening", title: "Evening" }, { key: "night", title: "Night" }];

  const updateRecurring = (cadence, fn) => setState((s) => ({ ...s, recurringRoutines: { ...s.recurringRoutines, [cadence]: fn(s.recurringRoutines[cadence]) } }));
  const toggleRecurring = (cadence, id) => updateRecurring(cadence, (arr) => arr.map((i) => i.id === id ? { ...i, lastDone: daysSince(i.lastDone) === 0 ? null : todayStr() } : i));
  const addRecurring = (cadence, text) => updateRecurring(cadence, (arr) => [...arr, { id: uid(), text, lastDone: null }]);
  const removeRecurring = (cadence, id) => updateRecurring(cadence, (arr) => arr.filter((i) => i.id !== id));

  const tabs = [
    { key: "daily", label: "Daily" },
    { key: "weekly", label: "Weekly" },
    { key: "biweekly", label: "Biweekly" },
    { key: "monthly", label: "Monthly" },
  ];
  const intervals = { weekly: 7, biweekly: 14, monthly: 30 };

  return (
    <div className="max-w-xl mx-auto">
      <h1 style={{ color: T.ink, fontWeight: 300 }} className="text-3xl mb-6">Operating System</h1>
      <div className="flex flex-wrap gap-1 mb-8" style={{ borderBottom: `1px solid ${T.line}` }}>
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{ color: tab === t.key ? T.ink : T.sub, borderColor: tab === t.key ? T.brass : "transparent" }} className="text-xs uppercase tracking-widest px-3 py-2 border-b-2 -mb-px">{t.label}</button>
        ))}
      </div>

      {tab === "daily" && (
        <div>
          {blocks.map((b) => (
            <RoutineBlock key={b.key} title={b.title} items={state.routines[b.key]}
              onToggle={(id) => update(b.key, (arr) => arr.map((i) => (i.id === id ? { ...i, done: !i.done } : i)))}
              onAdd={(text) => update(b.key, (arr) => [...arr, { id: uid(), text, done: false }])}
              onRemove={(id) => update(b.key, (arr) => arr.filter((i) => i.id !== id))} />
          ))}
        </div>
      )}
      {tab !== "daily" && (
        <div>
          <p style={{ color: T.sub, fontWeight: 300 }} className="text-xs mb-4">
            {tab === "weekly" ? "Things you do about once a week." : tab === "biweekly" ? "Every couple of weeks." : "Once a month."} Tap to mark done — it turns back to "due" after {intervals[tab]} days.
          </p>
          <RecurringList items={state.recurringRoutines[tab]} intervalDays={intervals[tab]}
            onToggle={(id) => toggleRecurring(tab, id)} onAdd={(text) => addRecurring(tab, text)} onRemove={(id) => removeRecurring(tab, id)} />
        </div>
      )}
    </div>
  );
}

/* ----------------------------- BRAIN DUMP ------------------------------ */
function BrainDumpView({ state, setState }) {
  const [draft, setDraft] = useState("");
  const [sorting, setSorting] = useState(false);
  const add = async () => {
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    const id = uid();
    setState((s) => ({ ...s, brainDump: [{ id, text, category: "pending", createdAt: Date.now() }, ...s.brainDump] }));
    setSorting(true);
    const { category, clean_text } = await categorizeWithAI(text);
    setState((s) => {
      const brainDump = s.brainDump.map((it) => it.id === id ? { ...it, category, text: clean_text || it.text } : it);
      const archeor = category === "business"
        ? { ...s.archeor, ideas: [{ id: uid(), text: clean_text || text, source: "brain dump" }, ...s.archeor.ideas] }
        : s.archeor;
      const shopping = category === "shopping"
        ? { ...s.shopping, list: [{ id: uid(), text: clean_text || text, bought: false, source: "brain dump" }, ...s.shopping.list] }
        : s.shopping;
      return { ...s, brainDump, archeor, shopping };
    });
    setSorting(false);
  };
  const remove = (id) => setState((s) => ({ ...s, brainDump: s.brainDump.filter((i) => i.id !== id) }));
  const order = ["pending", "calendar", "reminder", "goal", "business", "shopping", "idea", "note"];
  const groups = state.brainDump.reduce((acc, item) => { acc[item.category] = acc[item.category] || []; acc[item.category].push(item); return acc; }, {});
  return (
    <div className="max-w-xl">
      <h1 style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif", color: T.ink }} className="text-3xl mb-1">Brain Dump</h1>
      <Card className="mb-8">
        <div className="flex gap-2">
          <input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="Buy new notebook... call the printer tomorrow at 2pm... ARCHEOR: pop-up showcase idea..."
            style={{ borderColor: T.line, color: T.ink }} className="flex-1 border-b text-sm py-1 bg-transparent focus:outline-none" />
          <button onClick={add} style={{ background: T.ink, color: T.paper }} className="px-3 rounded-sm"><Plus size={14} /></button>
        </div>
        <div style={{ color: T.sub }} className="text-[11px] mt-2">
          {sorting ? "Sorting…" : "Sorted automatically into shopping, calendar, reminders, goals, ARCHEOR, ideas, or notes."}
        </div>
      </Card>
      {Object.keys(groups).length === 0 && <div style={{ color: T.sub }} className="text-sm">Nothing dumped yet.</div>}
      {order.filter((cat) => groups[cat]?.length).map((cat) => (
        <div key={cat} className="mb-6">
          <SectionLabel>{CATEGORY_LABEL[cat]}</SectionLabel>
          <div className="flex flex-col gap-2">
            {groups[cat].map((it) => (
              <Card key={it.id} className="flex items-center justify-between py-2.5 px-4">
                <span style={{ color: cat === "pending" ? T.sub : T.ink, fontStyle: cat === "pending" ? "italic" : "normal" }} className="text-sm">{it.text}</span>
                {cat !== "pending" && <button onClick={() => remove(it.id)}><X size={12} color={T.sub} /></button>}
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------- WEEKLY REVIEW ---------------------------- */
function WeeklyReviewView({ state, setState }) {
  const setAnswer = (key, v) => setState((s) => ({ ...s, weeklyReview: { ...s.weeklyReview, answers: { ...s.weeklyReview.answers, [key]: v } } }));
  const complete = () => setState((s) => ({ ...s, weeklyReview: { ...s.weeklyReview, lastCompleted: todayStr() } }));
  const [newQ, setNewQ] = useState("");
  const addCustom = () => {
    if (!newQ.trim()) return;
    setState((s) => ({ ...s, weeklyReview: { ...s.weeklyReview, customQuestions: [...s.weeklyReview.customQuestions, { id: uid(), question: newQ.trim(), answer: "" }] } }));
    setNewQ("");
  };
  const setCustomAnswer = (id, v) => setState((s) => ({ ...s, weeklyReview: { ...s.weeklyReview, customQuestions: s.weeklyReview.customQuestions.map((q) => q.id === id ? { ...q, answer: v } : q) } }));
  const removeCustom = (id) => setState((s) => ({ ...s, weeklyReview: { ...s.weeklyReview, customQuestions: s.weeklyReview.customQuestions.filter((q) => q.id !== id) } }));
  const questions = [
    ["mustHappen", "What must happen this week?", "Translate transcript, submit application, gym four times..."],
    ["skillTraining", "What skill am I training?", "Just one — guitar this week, chess next week."],
    ["experience", "What experience am I creating?", "Museum, café, hike, new restaurant — at least one."],
    ["canWait", "What can wait?", "You don't have to do everything."],
  ];
  return (
    <div className="max-w-xl">
      <h1 style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif", color: T.ink }} className="text-3xl mb-1">Weekly Review</h1>
      {state.weeklyReview.lastCompleted && <p style={{ color: T.brass }} className="text-xs mb-6">Last completed {state.weeklyReview.lastCompleted}</p>}
      <div className="flex flex-col gap-6 mb-6">
        {questions.map(([key, q, hint]) => (
          <Card key={key}>
            <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif", color: T.ink }} className="text-lg mb-1">{q}</div>
            <p style={{ color: T.sub }} className="text-xs mb-3">{hint}</p>
            <textarea value={state.weeklyReview.answers[key] || ""} onChange={(e) => setAnswer(key, e.target.value)} rows={2}
              style={{ borderColor: T.line, color: T.ink }} className="w-full border-b text-sm py-1 bg-transparent focus:outline-none resize-none" placeholder="..." />
          </Card>
        ))}
        {state.weeklyReview.customQuestions.map((q) => (
          <Card key={q.id}>
            <div className="flex items-start justify-between gap-3 mb-1">
              <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif", color: T.ink }} className="text-lg">{q.question}</div>
              <button onClick={() => removeCustom(q.id)}><X size={12} color={T.sub} /></button>
            </div>
            <textarea value={q.answer} onChange={(e) => setCustomAnswer(q.id, e.target.value)} rows={2}
              style={{ borderColor: T.line, color: T.ink }} className="w-full border-b text-sm py-1 bg-transparent focus:outline-none resize-none" placeholder="..." />
          </Card>
        ))}
      </div>
      <Card className="mb-6">
        <SectionLabel>Add your own question</SectionLabel>
        <div className="flex gap-2">
          <input value={newQ} onChange={(e) => setNewQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addCustom()}
            placeholder="e.g. What drained me this week?" style={{ borderColor: T.line }} className="flex-1 border-b text-sm py-1 bg-transparent focus:outline-none" />
          <button onClick={addCustom}><Plus size={14} color={T.brass} /></button>
        </div>
      </Card>
      <button onClick={complete} style={{ background: T.ink, color: T.paper }} className="text-xs uppercase tracking-widest px-4 py-2 rounded-sm levi-glow-btn">Mark review complete</button>
    </div>
  );
}

/* ------------------------------- CALENDAR ------------------------------ */
// Shared timed-schedule editor used by BOTH Home's Today Schedule and the
// Calendar day view — they read/write the same daySchedules model, so an edit
// in one place shows in the other. Supports drag-to-reschedule, inline
// time/label edit, add, delete.
function ScheduleEditor({ state, setState, dateStr }) {
  const blocks = resolveSchedule(state, dateStr);
  const [dragId, setDragId] = useState(null);
  const [overId, setOverId] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [scope, setScope] = useState("today"); // "today" | "template" (every this-weekday) | "all" (every day)
  const [draft, setDraft] = useState({ time: "12:00", label: "", pillar: "life" });

  const weekdayName = new Date(dateStr + "T00:00:00").toLocaleDateString(undefined, { weekday: "long" });
  const commit = (next) => setState((s) => {
    if (scope === "all") return writeTemplateAllWeekdays(s, dateStr, blocks, next);
    return scope === "template" ? writeTemplateForWeekday(s, dateStr, next) : writeDaySchedule(s, dateStr, next);
  });
  // Checking something off only ever applies to that one day.
  const toggle = (id) => setState((s) => writeDaySchedule(s, dateStr, blocks.map((b) => b.id === id ? { ...b, done: !b.done } : b)));
  const editField = (id, field, value) => commit(blocks.map((b) => b.id === id ? { ...b, [field]: value } : b));
  const remove = (id) => commit(blocks.filter((b) => b.id !== id));
  const add = () => {
    if (!draft.label.trim()) return;
    const nid = uid();
    commit([...blocks, { id: nid, bk: "u-" + nid, time: draft.time, label: draft.label.trim(), pillar: draft.pillar, done: false, locked: false }]);
    setDraft({ time: "12:00", label: "", pillar: "life" });
    setAddOpen(false);
  };
  const onDrop = (targetId) => {
    if (!dragId || dragId === targetId) { setDragId(null); setOverId(null); return; }
    const target = blocks.find((b) => b.id === targetId);
    commit(blocks.map((b) => b.id === dragId ? { ...b, time: target.time } : b));
    setDragId(null); setOverId(null);
  };
  // Touch drag: HTML5 draggable is mouse-only, so the ⠿ handle also listens
  // to touch events. While the finger moves we highlight the row underneath;
  // lifting the finger drops onto it.
  const touchDragId = useRef(null);
  const onHandleTouchStart = (id) => (e) => { touchDragId.current = id; setDragId(id); };
  const onHandleTouchMove = (e) => {
    if (!touchDragId.current) return;
    e.preventDefault();
    const t = e.touches[0];
    const el = document.elementFromPoint(t.clientX, t.clientY);
    const row = el && el.closest && el.closest("[data-block-id]");
    setOverId(row ? row.getAttribute("data-block-id") : null);
  };
  const onHandleTouchEnd = () => {
    if (touchDragId.current && overId && overId !== touchDragId.current) onDrop(overId);
    else { setDragId(null); setOverId(null); }
    touchDragId.current = null;
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span style={{ color: T.sub, fontWeight: 300 }} className="text-[10px] uppercase tracking-wider">Edits apply to</span>
        <div style={{ ...GLASS(0.4) }} className="inline-flex rounded-full p-0.5">
          <button onClick={() => setScope("today")} style={{ background: scope === "today" ? T.brass : "transparent", color: scope === "today" ? T.paper : T.sub }} className="text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">Just today</button>
          <button onClick={() => setScope("template")} style={{ background: scope === "template" ? T.brass : "transparent", color: scope === "template" ? T.paper : T.sub }} className="text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">Every {weekdayName}</button>
          <button onClick={() => setScope("all")} style={{ background: scope === "all" ? T.brass : "transparent", color: scope === "all" ? T.paper : T.sub }} className="text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">Every day</button>
        </div>
      </div>
      {scope === "template" && (
        <p style={{ color: T.brass, fontWeight: 300 }} className="text-[10px] mb-3">Changes now update every {weekdayName} going forward.</p>
      )}
      {scope === "all" && (
        <p style={{ color: T.brass, fontWeight: 300 }} className="text-[10px] mb-3">Changes now update all 7 days going forward. Each day keeps its own workout and Deep Work theme unless you edit those.</p>
      )}
      <div className="flex flex-col gap-2">
        {blocks.map((b) => {
          const color = (PILLARS[b.pillar] || PILLARS.life).color;
          return (
            <div key={b.id}
              data-block-id={b.id}
              draggable
              onDragStart={() => setDragId(b.id)}
              onDragOver={(e) => { e.preventDefault(); setOverId(b.id); }}
              onDragEnd={() => { setDragId(null); setOverId(null); }}
              onDrop={() => onDrop(b.id)}
              style={{
                ...GLASS(0.5),
                opacity: dragId === b.id ? 0.4 : 1,
                outline: overId === b.id && dragId && dragId !== b.id ? `1px solid ${T.brass}` : "none",
              }}
              className="rounded-2xl px-3 py-2.5 flex items-center gap-2.5"
            >
              <span style={{ color: T.sub, touchAction: "none", padding: "6px 4px", margin: "-6px -4px" }} className="cursor-grab shrink-0 text-sm select-none"
                title="Drag to move"
                onTouchStart={onHandleTouchStart(b.id)}
                onTouchMove={onHandleTouchMove}
                onTouchEnd={onHandleTouchEnd}
              >⠿</span>
              <span style={{ width: 3, alignSelf: "stretch", background: color, boxShadow: `0 0 6px ${color}` }} className="rounded-full shrink-0" />
              <input value={b.time} onChange={(e) => editField(b.id, "time", e.target.value)}
                style={{ color: T.brass, fontWeight: 300 }} className="w-[68px] shrink-0 bg-transparent text-xs focus:outline-none"
                type="time" />
              <button onClick={() => toggle(b.id)} className="shrink-0">
                <span style={{
                  width: 15, height: 15, borderRadius: 999, display: "inline-flex", alignItems: "center", justifyContent: "center",
                  border: `1px solid ${b.done ? color : T.line}`, background: b.done ? color : "transparent",
                  boxShadow: b.done ? `0 0 6px ${color}88` : "none",
                }}>{b.done && <Check size={9} color={T.paper} strokeWidth={3} />}</span>
              </button>
              <input value={b.label} onChange={(e) => editField(b.id, "label", e.target.value)}
                style={{ color: b.done ? T.sub : T.ink, textDecoration: b.done ? "line-through" : "none", fontWeight: 300 }}
                className="flex-1 min-w-0 bg-transparent text-sm focus:outline-none" />
              {b.locked && <span style={{ color: T.sub }} className="text-[9px] uppercase tracking-wider shrink-0">core</span>}
              <button onClick={() => remove(b.id)} className="shrink-0"><X size={12} color={T.sub} /></button>
            </div>
          );
        })}
        {blocks.length === 0 && <span style={{ color: T.sub, fontWeight: 300 }} className="text-sm">Nothing scheduled. Add a block below.</span>}
      </div>

      {addOpen ? (
        <div style={{ ...GLASS(0.5) }} className="rounded-2xl p-3 mt-3 flex flex-col gap-2">
          <div className="flex gap-2">
            <input type="time" value={draft.time} onChange={(e) => setDraft({ ...draft, time: e.target.value })}
              style={{ color: T.ink, borderColor: T.line }} className="border-b bg-transparent text-sm py-1 focus:outline-none" />
            <input value={draft.label} onChange={(e) => setDraft({ ...draft, label: e.target.value })} onKeyDown={(e) => e.key === "Enter" && add()}
              placeholder="What are you doing?" style={{ color: T.ink, borderColor: T.line }} className="flex-1 border-b bg-transparent text-sm py-1 focus:outline-none" />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {Object.entries(PILLARS).map(([key, pl]) => (
              <button key={key} onClick={() => setDraft({ ...draft, pillar: key })}
                style={{ background: pl.color, borderColor: draft.pillar === key ? T.ink : "transparent", opacity: draft.pillar === key ? 1 : 0.5 }}
                className="w-5 h-5 rounded-full border-2" title={pl.label} />
            ))}
            <button onClick={add} style={{ background: HOLO(), color: T.paper }} className="ml-auto text-xs uppercase tracking-widest px-4 py-1.5 rounded-full">Add</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setAddOpen(true)} style={{ borderColor: T.line, color: T.sub }} className="mt-3 text-xs uppercase tracking-widest border rounded-full px-4 py-2">+ Add to schedule</button>
      )}
    </div>
  );
}

function CalendarView({ state, setState }) {
  const [viewMode, setViewMode] = useState("day");
  const icsRef = useRef(null);
  const [icsMsg, setIcsMsg] = useState("");
  const importICS = async (file) => {
    try {
      const text = await file.text();
      const found = parseICS(text);
      if (!found.length) { setIcsMsg("No upcoming events found in that file."); return; }
      let added = 0;
      setState((s) => {
        const have = new Set(s.calendarEvents.map((e) => `${e.date}|${e.time}|${e.title}`));
        const fresh = [];
        for (const ev of found) {
          const k = `${ev.date}|${ev.time}|${ev.title}`;
          if (have.has(k)) continue;
          have.add(k);
          fresh.push({ id: uid(), title: ev.title, date: ev.date, time: ev.time, reminderMinutes: 15, pillar: "life", notes: "imported", notified: false });
        }
        added = fresh.length;
        return { ...s, calendarEvents: [...s.calendarEvents, ...fresh.slice(0, 1500)] };
      });
      setTimeout(() => setIcsMsg(`Imported ${Math.min(found.length, 1500)} events (duplicates skipped).`), 50);
    } catch (e) { setIcsMsg("Couldn't read that file — it needs to be an .ics calendar export."); }
  };
  const [cursor, setCursor] = useState(() => { const d = new Date(); d.setDate(1); return d; });
  const [selectedDate, setSelectedDate] = useState(todayStr());
  const [draft, setDraft] = useState({ title: "", time: "", reminderMinutes: 15, pillar: "deepwork" });
  const [notifStatus, setNotifStatus] = useState(typeof Notification !== "undefined" ? Notification.permission : "unsupported");

  const year = cursor.getFullYear(), month = cursor.getMonth();
  const firstDay = new Date(year, month, 1);
  const startWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const dateKey = (d) => `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const eventsByDate = state.calendarEvents.reduce((acc, e) => { (acc[e.date] = acc[e.date] || []).push(e); return acc; }, {});
  const selectedEvents = (eventsByDate[selectedDate] || []).sort((a, b) => (a.time || "").localeCompare(b.time || ""));

  // Everything shown on a date in month/week grids: schedule blocks (the daily
  // routine) + one-off calendar appointments, unified and color-coded.
  const allForDate = (key) => {
    const sched = resolveSchedule(state, key).map((b) => ({ id: b.id, time: b.time, title: b.label, pillar: b.pillar }));
    const oneOff = (eventsByDate[key] || []).map((e) => ({ id: e.id, time: e.time, title: e.title, pillar: e.pillar }));
    return [...sched, ...oneOff].sort((a, b) => (a.time || "").localeCompare(b.time || ""));
  };

  const addEvent = () => {
    if (!draft.title.trim()) return;
    setState((s) => ({ ...s, calendarEvents: [...s.calendarEvents, { id: uid(), title: draft.title.trim(), date: selectedDate, time: draft.time, reminderMinutes: draft.reminderMinutes, pillar: draft.pillar, notes: "", notified: false }] }));
    setDraft({ title: "", time: "", reminderMinutes: 15, pillar: "deepwork" });
  };
  const removeEvent = (id) => setState((s) => ({ ...s, calendarEvents: s.calendarEvents.filter((e) => e.id !== id) }));

  const enableNotifs = async () => { const p = await requestNotificationPermission(); setNotifStatus(p); };

  const selectedDateObj = new Date(selectedDate + "T00:00:00");
  const weekStart = new Date(selectedDateObj);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart); d.setDate(d.getDate() + i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    return { date: d, key, events: (eventsByDate[key] || []).sort((a, b) => (a.time || "").localeCompare(b.time || "")) };
  });

  const HOURS = Array.from({ length: 17 }, (_, i) => i + 6); // 6am - 10pm
  const eventsAtHour = (h) => selectedEvents.filter((ev) => {
    if (!ev.time) return h === 6; // untimed events shown at the top slot
    const hh = Number(ev.time.split(":")[0]);
    return hh === h;
  });

  return (
    <div className="max-w-2xl">
      <h1 style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif", color: T.ink }} className="text-3xl mb-1">Calendar</h1>
      <p style={{ color: T.sub }} className="text-sm mb-4">Time-block your days. Reminders fire while this app is open.</p>

      <div className="flex gap-2 mb-4">
        {["month", "week", "day"].map((m) => (
          <button key={m} onClick={() => setViewMode(m)}
            style={{ borderColor: viewMode === m ? T.brass : T.line, color: viewMode === m ? T.ink : T.sub, background: viewMode === m ? T.parchment : "transparent" }}
            className="text-[11px] uppercase tracking-widest border rounded-full px-3 py-1.5 capitalize">{m}</button>
        ))}
      </div>
      <div className="flex flex-wrap gap-3 mb-6">
        {Object.entries(PILLARS).map(([key, pl]) => (
          <div key={key} className="flex items-center gap-1.5">
            <span style={{ background: pl.color, boxShadow: `0 0 5px ${pl.color}` }} className="w-2 h-2 rounded-full" />
            <span style={{ color: T.sub, fontWeight: 300 }} className="text-[10px]">{pl.label}</span>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <button onClick={() => icsRef.current && icsRef.current.click()} style={{ ...GLASS(0.45), color: T.ink }} className="text-[11px] uppercase tracking-widest rounded-full px-4 py-2">Import calendar file (.ics)</button>
        <input ref={icsRef} type="file" accept=".ics,text/calendar" className="hidden" onChange={(e) => { const f = e.target.files && e.target.files[0]; if (f) importICS(f); e.target.value = ""; }} />
        {icsMsg && <span style={{ color: T.olive }} className="text-xs ml-3">{icsMsg}</span>}
      </div>

      {notifStatus !== "granted" && notifStatus !== "unsupported" && (
        <Card className="mb-6" style={{ borderColor: T.brass }}>
          <p style={{ color: T.ink }} className="text-sm mb-2">Turn on notifications to get reminders for events you schedule below.</p>
          <p style={{ color: T.sub }} className="text-xs mb-3">Honest limit: this is a personal app with no server, so reminders only fire while Levi OS is open in a tab or window — not when it's fully closed, the way Google Calendar's server-side reminders do.</p>
          <button onClick={enableNotifs} style={{ background: T.ink, color: T.paper }} className="text-xs uppercase tracking-widest px-4 py-2 rounded-sm levi-glow-btn">Enable notifications</button>
        </Card>
      )}

      {viewMode === "month" && (
        <Card className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setCursor(new Date(year, month - 1, 1))}><ChevronLeft size={16} color={T.ink} /></button>
            <span style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif", color: T.ink }} className="text-lg">{cursor.toLocaleString("default", { month: "long", year: "numeric" })}</span>
            <button onClick={() => setCursor(new Date(year, month + 1, 1))}><ChevronRight size={16} color={T.ink} /></button>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-1">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <div key={i} style={{ color: T.sub }} className="text-center text-[10px] uppercase">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((d, i) => {
              if (d === null) return <div key={i} />;
              const key = dateKey(d);
              const isToday = key === todayStr();
              const dayEvents = allForDate(key);
              return (
                <button key={i} onClick={() => { setSelectedDate(key); setViewMode("day"); }}
                  style={{
                    background: isToday ? `${T.brass}14` : "transparent",
                    borderColor: isToday ? T.brass : T.line,
                    borderWidth: isToday ? 1.5 : 1,
                    minHeight: 74,
                  }}
                  className="rounded-lg border flex flex-col items-stretch p-1 text-left overflow-hidden"
                >
                  <span style={{ color: isToday ? T.brass : T.ink, fontWeight: 300 }} className="text-[11px] mb-1 px-0.5">{d}</span>
                  <div className="flex flex-col gap-0.5">
                    {dayEvents.slice(0, 3).map((ev) => {
                      const c = (PILLARS[ev.pillar] || PILLARS.life).color;
                      return (
                        <span key={ev.id} style={{ background: `${c}2E`, color: T.ink, borderLeft: `2px solid ${c}` }} className="text-[8px] leading-tight rounded-[2px] pl-1 pr-0.5 py-0.5 truncate">
                          {ev.title}
                        </span>
                      );
                    })}
                    {dayEvents.length > 3 && <span style={{ color: T.sub }} className="text-[8px] px-0.5">+{dayEvents.length - 3}</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </Card>
      )}

      {viewMode === "week" && (
        <Card className="mb-6 overflow-x-auto">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => { const d = new Date(selectedDateObj); d.setDate(d.getDate() - 7); setSelectedDate(`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`); }}><ChevronLeft size={16} color={T.ink} /></button>
            <span style={{ color: T.ink, fontWeight: 300 }} className="text-base">{weekStart.toLocaleDateString(undefined, { month: "short", day: "numeric" })} – {weekDays[6].date.toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span>
            <button onClick={() => { const d = new Date(selectedDateObj); d.setDate(d.getDate() + 7); setSelectedDate(`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`); }}><ChevronRight size={16} color={T.ink} /></button>
          </div>
          <div style={{ minWidth: 620 }}>
            {/* header row */}
            <div className="grid" style={{ gridTemplateColumns: "38px repeat(7, 1fr)" }}>
              <div />
              {weekDays.map((wd) => {
                const isToday = wd.key === todayStr();
                return (
                  <button key={wd.key} onClick={() => { setSelectedDate(wd.key); setViewMode("day"); }} className="flex flex-col items-center py-1">
                    <span style={{ color: T.sub, fontWeight: 300 }} className="text-[9px] uppercase">{wd.date.toLocaleDateString(undefined, { weekday: "short" })}</span>
                    <span style={{
                      color: isToday ? T.paper : T.ink, background: isToday ? T.brass : "transparent",
                      width: 22, height: 22, borderRadius: 999, display: "inline-flex", alignItems: "center", justifyContent: "center",
                    }} className="text-xs mt-0.5">{wd.date.getDate()}</span>
                  </button>
                );
              })}
            </div>
            {/* hour grid */}
            <div className="grid" style={{ gridTemplateColumns: "38px repeat(7, 1fr)" }}>
              {HOURS.map((h) => (
                <React.Fragment key={h}>
                  <div style={{ color: T.sub, borderColor: T.line }} className="text-[8px] text-right pr-1 border-t pt-0.5" >{h % 12 === 0 ? 12 : h % 12}{h < 12 ? "a" : "p"}</div>
                  {weekDays.map((wd) => {
                    const items = allForDate(wd.key).filter((ev) => {
                      const hh = ev.time ? Number(ev.time.split(":")[0]) : 6;
                      return hh === h;
                    });
                    return (
                      <div key={wd.key + h} onClick={() => { setSelectedDate(wd.key); setViewMode("day"); }}
                        style={{ borderColor: T.line, minHeight: 26 }} className="border-t border-l px-0.5 py-0.5 cursor-pointer">
                        {items.map((ev) => {
                          const c = (PILLARS[ev.pillar] || PILLARS.life).color;
                          return <div key={ev.id} style={{ background: `${c}33`, borderLeft: `2px solid ${c}`, color: T.ink }} className="text-[7px] leading-tight rounded-[2px] pl-0.5 mb-0.5 truncate">{ev.title}</div>;
                        })}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </Card>
      )}

      {viewMode === "day" && (
        <div className="mb-6">
          <Card className="mb-4">
            <div className="flex items-center justify-between">
              <button onClick={() => { const d = new Date(selectedDateObj); d.setDate(d.getDate() - 1); setSelectedDate(`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`); }}><ChevronLeft size={16} color={T.ink} /></button>
              <span style={{ color: T.ink, fontWeight: 300 }} className="text-base">{selectedDateObj.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}</span>
              <button onClick={() => { const d = new Date(selectedDateObj); d.setDate(d.getDate() + 1); setSelectedDate(`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`); }}><ChevronRight size={16} color={T.ink} /></button>
            </div>
          </Card>
          <p style={{ color: T.sub, fontWeight: 300 }} className="text-xs mb-3 px-1">This is your day's schedule — the same one on Home. Drag the ⠿ handle to move a block, tap a time to change it, edit any label. Edits to this day stick.</p>
          <ScheduleEditor state={state} setState={setState} dateStr={selectedDate} />
        </div>
      )}

      {viewMode !== "day" && (
      <>
      <SectionLabel>{new Date(selectedDate).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}</SectionLabel>
      <Card className="mb-6">
        <div className="flex flex-col gap-2 mb-4">
          {selectedEvents.map((ev) => (
            <div key={ev.id} className="flex items-center gap-3">
              <span style={{ width: 4, alignSelf: "stretch", background: (PILLARS[ev.pillar] || PILLARS.life).color }} className="rounded-full shrink-0" />
              <span style={{ color: T.brass }} className="text-sm w-16 shrink-0">{ev.time || "—"}</span>
              <span style={{ color: T.ink }} className="text-sm flex-1">{ev.title}</span>
              <PillarTag pillar={ev.pillar} />
              <button onClick={() => removeEvent(ev.id)}><X size={12} color={T.sub} /></button>
            </div>
          ))}
          {selectedEvents.length === 0 && <span style={{ color: T.sub }} className="text-sm">No one-off appointments. Switch to Day view for your full schedule.</span>}
        </div>
        <div className="flex gap-2 flex-wrap mb-2">
          <input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="One-off appointment..."
            style={{ borderColor: T.line }} className="flex-1 min-w-[140px] border-b text-sm py-1 bg-transparent focus:outline-none" />
          <input type="time" value={draft.time} onChange={(e) => setDraft({ ...draft, time: e.target.value })}
            style={{ borderColor: T.line, color: T.ink, background: "transparent" }} className="border-b text-sm py-1 focus:outline-none" />
          <select value={draft.reminderMinutes} onChange={(e) => setDraft({ ...draft, reminderMinutes: Number(e.target.value) })}
            style={{ borderColor: T.line, color: T.ink, background: "transparent" }} className="border-b text-sm py-1 focus:outline-none">
            <option value={0}>At time</option><option value={10}>10 min before</option><option value={15}>15 min before</option>
            <option value={30}>30 min before</option><option value={60}>1 hour before</option>
          </select>
        </div>
        <div className="flex gap-2 flex-wrap items-center">
          <span style={{ color: T.sub }} className="text-xs">Color:</span>
          {Object.entries(PILLARS).map(([key, p]) => (
            <button key={key} onClick={() => setDraft({ ...draft, pillar: key })}
              style={{ background: p.color, borderColor: draft.pillar === key ? T.ink : "transparent" }}
              className="w-6 h-6 rounded-full border-2" title={p.label} />
          ))}
          <button onClick={addEvent} style={{ background: T.ink, color: T.paper }} className="ml-auto px-3 py-1.5 rounded-sm text-xs uppercase tracking-widest levi-glow-btn">Add</button>
        </div>
      </Card>
      </>
      )}
    </div>
  );
}

/* ------------------------------- ASSISTANT ------------------------------ */
function AssistantView({ state, setState }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const hasKey = !!getApiKey() || cloudAIAvailable();

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [state.assistantChat, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    const userMsg = { id: uid(), role: "user", text, ts: Date.now() };
    setState((s) => ({ ...s, assistantChat: [...s.assistantChat, userMsg] }));
    setLoading(true);
    const history = [...state.assistantChat, userMsg].slice(-16).map((m) => ({ role: m.role, text: m.text }));
    const context = buildAssistantContext(state);
    const reply = await askClaudeConversation(history, context);
    setState((s) => ({ ...s, assistantChat: [...s.assistantChat, { id: uid(), role: "assistant", text: reply, ts: Date.now() }] }));
    setLoading(false);
  };

  return (
    <div className="max-w-2xl flex flex-col" style={{ height: "calc(100vh - 140px)" }}>
      <h1 style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif", color: T.ink }} className="text-3xl mb-1">Assistant</h1>
      <p style={{ color: T.sub }} className="text-sm mb-4">Talk to it about anything — today's plan, a decision, a rough day, what's next.</p>
      {!hasKey && (
        <Card className="mb-4" style={{ borderColor: T.brass }}>
          <p style={{ color: T.ink }} className="text-sm">Add your Anthropic API key in Settings to turn this on.</p>
        </Card>
      )}
      <div ref={scrollRef} style={{ borderColor: T.line }} className="flex-1 overflow-y-auto border rounded-sm p-4 mb-4 flex flex-col gap-3">
        {state.assistantChat.length === 0 && <p style={{ color: T.sub }} className="text-sm italic">No conversation yet. Try: "What should I focus on today?"</p>}
        {state.assistantChat.map((m) => (
          <div key={m.id} className={`max-w-[85%] ${m.role === "user" ? "self-end" : "self-start"}`}>
            <div style={{
              background: m.role === "user" ? T.ink : T.parchment,
              color: m.role === "user" ? T.paper : T.ink,
              borderColor: T.line,
            }} className="rounded-sm px-4 py-2.5 text-sm border whitespace-pre-wrap">{m.text}</div>
          </div>
        ))}
        {loading && <div style={{ color: T.sub }} className="text-sm italic self-start">Thinking…</div>}
      </div>
      <div className="flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask anything..." style={{ borderColor: T.line, color: T.ink }}
          className="flex-1 border-b text-sm py-2 bg-transparent focus:outline-none" />
        <button onClick={send} disabled={loading} style={{ background: T.ink, color: T.paper }} className="px-4 rounded-sm text-xs uppercase tracking-widest">Send</button>
      </div>
    </div>
  );
}

/* --------------------------- EDUCATION WORKSPACE ---------------------------- */
// Paste a syllabus -> review detected exams/due dates -> add to the course
// AND the Calendar in one tap. Nothing is added until you confirm.
function SyllabusImporter({ state, setState }) {
  const courses = state.education.courses;
  const [text, setText] = useState("");
  const [courseId, setCourseId] = useState(courses[0] ? courses[0].id : "new");
  const [newName, setNewName] = useState("");
  const [result, setResult] = useState(null);
  const [msg, setMsg] = useState("");

  const run = () => { setMsg(""); setResult(parseSyllabus(text)); };
  const setItem = (id, patch) => setResult((r) => ({ ...r, items: r.items.map((i) => (i.id === id ? { ...i, ...patch } : i)) }));
  const kept = result ? result.items.filter((i) => i.keep) : [];

  const addAll = () => {
    if (!result) return;
    setState((s) => {
      let list = s.education.courses;
      let cid = courseId;
      let cname;
      if (cid === "new" || !list.find((x) => x.id === cid)) {
        cid = uid(); cname = newName.trim() || "New course";
        list = [...list, { id: cid, name: cname, assignments: [], rules: [] }];
      } else cname = list.find((x) => x.id === cid).name;
      list = list.map((co) => co.id !== cid ? co : {
        ...co,
        assignments: [...co.assignments, ...kept.map((i) => ({ id: uid(), text: (i.kind === "exam" ? "EXAM — " : "") + i.title, due: i.date, done: false }))],
        rules: [...(co.rules || []), ...result.rules],
      });
      const events = kept.map((i) => ({ id: uid(), title: `${cname}: ${i.title}`, date: i.date, time: "", reminderMinutes: i.kind === "exam" ? 1440 : 60, pillar: "deepwork", notes: "", notified: false }));
      return { ...s, education: { ...s.education, courses: list }, calendarEvents: [...s.calendarEvents, ...events] };
    });
    setMsg(`Added ${kept.length} dates to ${courseId === "new" ? (newName.trim() || "your new course") : "the course"} and to your Calendar.`);
    setResult(null); setText("");
  };

  return (
    <div className="mb-8">
      <SectionLabel>Syllabus Import</SectionLabel>
      <Card>
        <p style={{ color: T.sub, fontWeight: 300 }} className="text-xs mb-3">Paste the text of a syllabus. I'll find exams, quizzes and due dates, show them to you to double-check, then add them to the course and your Calendar.</p>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={5} placeholder="Paste syllabus text here..."
          style={{ borderColor: T.line, color: T.ink }} className="w-full border rounded-xl p-3 text-sm bg-transparent focus:outline-none resize-y mb-3" />
        <div className="flex gap-2 flex-wrap items-center mb-3">
          <select value={courseId} onChange={(e) => setCourseId(e.target.value)} style={{ borderColor: T.line, color: T.ink, background: "transparent" }} className="border-b text-sm py-1 focus:outline-none">
            {courses.map((co) => <option key={co.id} value={co.id} style={{ color: "#000" }}>{co.name}</option>)}
            <option value="new" style={{ color: "#000" }}>+ New course</option>
          </select>
          {courseId === "new" && <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Course name" style={{ borderColor: T.line, color: T.ink }} className="flex-1 min-w-[120px] border-b text-sm py-1 bg-transparent focus:outline-none" />}
          <button onClick={run} disabled={!text.trim()} style={{ background: HOLO(), color: T.paper, opacity: text.trim() ? 1 : 0.4 }} className="text-xs uppercase tracking-widest px-4 py-1.5 rounded-full">Find dates</button>
        </div>
        {msg && <p style={{ color: T.olive }} className="text-xs mb-2">{msg}</p>}

        {result && (
          <div>
            {result.items.length === 0 && <p style={{ color: T.sub }} className="text-sm mb-2">I couldn't find any lines that have both a date and a word like "exam" or "due." If the syllabus uses a table, try pasting it row by row, or paste it into a chat with me and I'll turn it into a calendar file you can import.</p>}
            <div className="flex flex-col gap-2 mb-3">
              {result.items.map((it) => (
                <div key={it.id} style={{ borderColor: T.line }} className="flex items-center gap-2 border rounded-xl px-3 py-2">
                  <Checkbox checked={it.keep} onClick={() => setItem(it.id, { keep: !it.keep })} />
                  <button onClick={() => setItem(it.id, { kind: it.kind === "exam" ? "due" : "exam" })}
                    style={{ color: it.kind === "exam" ? "#FF6B9D" : T.olive, borderColor: T.line }} className="text-[9px] uppercase tracking-wider border rounded-full px-2 py-0.5 shrink-0">{it.kind}</button>
                  <input value={it.title} onChange={(e) => setItem(it.id, { title: e.target.value })} style={{ color: T.ink }} className="flex-1 min-w-0 bg-transparent text-xs focus:outline-none" />
                  <input type="date" value={it.date} onChange={(e) => setItem(it.id, { date: e.target.value })} style={{ color: T.brass, background: "transparent" }} className="text-[11px] focus:outline-none w-[104px]" />
                </div>
              ))}
            </div>
            {result.rules.length > 0 && (
              <div className="mb-3">
                <div style={{ color: T.sub }} className="text-[10px] uppercase tracking-wider mb-1">Rules & policies spotted — saved on the course</div>
                <ul className="flex flex-col gap-1">
                  {result.rules.map((r, i) => <li key={i} style={{ color: T.ink, fontWeight: 300 }} className="text-xs">• {r}</li>)}
                </ul>
              </div>
            )}
            {(kept.length > 0 || result.rules.length > 0) && (
              <button onClick={addAll} style={{ background: T.ink, color: T.paper }} className="text-xs uppercase tracking-widest px-4 py-2 rounded-full levi-glow-btn">Add {kept.length} to course + Calendar</button>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}


function AntiInflGuide({ state, setState }) {
  const g = state.health.nutrition.guide || defaultAFGuide();
  const [open, setOpen] = useState(false);
  const [drafts, setDrafts] = useState({ more: "", fine: "", limit: "" });
  const setGuide = (fn) => setState((st) => ({ ...st, health: { ...st.health, nutrition: { ...st.health.nutrition, guide: fn(st.health.nutrition.guide || defaultAFGuide()) } } }));
  const cols = [
    { key: "more", label: "Eat more of", color: "#34D399" },
    { key: "fine", label: "Fine in moderation", color: "#F5C26B" },
    { key: "limit", label: "Limit", color: "#FB7185" },
  ];
  return (
    <div style={{ ...GLASS() }} className="rounded-3xl p-5 mb-6">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between text-left">
        <div>
          <div style={{ color: T.ink }} className="text-sm font-medium">Anti-inflammatory guide</div>
          <div style={{ color: T.sub }} className="text-[11px]">Your plan, in three lists. Tap to {open ? "close" : "open"} and edit.</div>
        </div>
        <span style={{ color: T.sub }} className="text-lg">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="mt-4">
          <p style={{ color: T.sub }} className="text-[11px] mb-4">Anti-inflammatory eating is really a pattern — lots of plants, fish, nuts, olive oil, little added sugar — not a list of magic foods. This is general guidance, not medical advice; a doctor or dietitian can tailor it to you.</p>
          {cols.map((c) => (
            <div key={c.key} className="mb-4">
              <div style={{ color: c.color }} className="text-[11px] uppercase tracking-widest mb-2">{c.label}</div>
              <div className="flex flex-wrap gap-2 mb-2">
                {(g[c.key] || []).map((it, i) => (
                  <span key={i} style={{ borderColor: T.line, color: T.ink }} className="text-xs border rounded-full pl-3 pr-2 py-1 flex items-center gap-1.5">
                    {it}
                    <button onClick={() => setGuide((gg) => ({ ...gg, [c.key]: gg[c.key].filter((_, j) => j !== i) }))}><X size={10} color={T.sub} /></button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input value={drafts[c.key]} onChange={(e) => setDrafts({ ...drafts, [c.key]: e.target.value })} placeholder="Add one…" style={{ borderColor: T.line, color: T.ink }} className="flex-1 border-b text-xs py-1 bg-transparent focus:outline-none" />
                <button onClick={() => { const v = drafts[c.key].trim(); if (!v) return; setGuide((gg) => ({ ...gg, [c.key]: [...(gg[c.key] || []), v] })); setDrafts({ ...drafts, [c.key]: "" }); }} style={{ color: T.brass }} className="text-xs uppercase tracking-widest">Add</button>
              </div>
            </div>
          ))}
          <div style={{ color: T.brass }} className="text-[11px] uppercase tracking-widest mb-2">Sweet-craving swap</div>
          <textarea value={g.swap || ""} onChange={(e) => setGuide((gg) => ({ ...gg, swap: e.target.value }))} rows={2} style={{ borderColor: T.line, color: T.ink }} className="w-full border rounded-md text-xs p-2 bg-transparent focus:outline-none" />
        </div>
      )}
    </div>
  );
}


const AF_COLORS = { core: "#34D399", fine: "#F5C26B", limit: "#FB7185" };
function MealIdeasAndGrocery({ state, setState }) {
  const n = state.health.nutrition;
  const ideas = n.ideas || [];
  const grocery = n.grocery || [];
  const [openIdeas, setOpenIdeas] = useState(false);
  const [openGroc, setOpenGroc] = useState(false);
  const [gDraft, setGDraft] = useState({ cat: "Produce", name: "" });
  const setN = (fn) => setState((st) => ({ ...st, health: { ...st.health, nutrition: fn(st.health.nutrition) } }));
  const addIdea = (it) => setN((nn) => ({
    ...nn,
    recipes: [...nn.recipes, { id: uid(), name: it.name, category: it.category, protein: it.protein, fiber: it.fiber, image: null, notes: "", af: it.af, afNote: it.afNote }],
    ideas: (nn.ideas || []).filter((x) => x.id !== it.id),
  }));
  const dropIdea = (id) => setN((nn) => ({ ...nn, ideas: (nn.ideas || []).filter((x) => x.id !== id) }));
  const tick = (cat, id) => setN((nn) => ({ ...nn, grocery: nn.grocery.map((g) => g.cat !== cat ? g : { ...g, items: g.items.map((x) => x.id === id ? { ...x, have: !x.have } : x) }) }));
  const delItem = (cat, id) => setN((nn) => ({ ...nn, grocery: nn.grocery.map((g) => g.cat !== cat ? g : { ...g, items: g.items.filter((x) => x.id !== id) }) }));
  const addItem = () => {
    const v = gDraft.name.trim(); if (!v) return;
    setN((nn) => {
      const has = nn.grocery.some((g) => g.cat === gDraft.cat);
      const item = { id: uid(), name: v, have: false };
      return { ...nn, grocery: has ? nn.grocery.map((g) => g.cat === gDraft.cat ? { ...g, items: [...g.items, item] } : g) : [...nn.grocery, { cat: gDraft.cat, items: [item] }] };
    });
    setGDraft({ ...gDraft, name: "" });
  };
  const uncheckAll = () => setN((nn) => ({ ...nn, grocery: nn.grocery.map((g) => ({ ...g, items: g.items.map((x) => ({ ...x, have: false })) })) }));
  const cats = ["Breakfast", "Lunch", "Dinner", "Snack"];
  const needed = grocery.reduce((a, g) => a + g.items.filter((x) => !x.have).length, 0);
  return (
    <div>
      {ideas.length > 0 && <div style={{ ...GLASS() }} className="rounded-3xl p-5 mb-4">
        <button onClick={() => setOpenIdeas(!openIdeas)} className="w-full flex items-center justify-between text-left">
          <div>
            <div style={{ color: T.ink }} className="text-sm font-medium">Ideas from your 7-day plan</div>
            <div style={{ color: T.sub }} className="text-[11px]">{ideas.length} left — add the ones you'd actually eat, dismiss the rest. Protein/fiber are estimates.</div>
          </div>
          <span style={{ color: T.sub }} className="text-lg">{openIdeas ? "−" : "+"}</span>
        </button>
        {openIdeas && (
          <div className="mt-4">
            {cats.map((c) => {
              const list = ideas.filter((i) => i.category === c);
              if (!list.length) return null;
              return (
                <div key={c} className="mb-4">
                  <div style={{ color: T.brass }} className="text-[11px] uppercase tracking-widest mb-2">{c}</div>
                  <div className="flex flex-col gap-2">
                    {list.map((it) => (
                      <div key={it.id} style={{ borderColor: T.line }} className="border rounded-2xl px-3 py-2">
                        <div className="flex items-center gap-2">
                          <span style={{ color: T.ink }} className="text-xs flex-1 min-w-0">{it.name}</span>
                          <span style={{ color: AF_COLORS[it.af], borderColor: AF_COLORS[it.af] }} className="text-[9px] uppercase tracking-widest border rounded-full px-2 py-0.5 shrink-0">{it.af === "core" ? "Anti-inflam ✓" : it.af === "fine" ? "Fine" : "Sometimes"}</span>
                          <button onClick={() => dropIdea(it.id)}><X size={11} color={T.sub} /></button>
                        </div>
                        <div style={{ color: T.sub }} className="text-[10px] mt-1">{it.protein}g protein · {it.fiber}g fiber{it.afNote ? " — " + it.afNote : ""}</div>
                        <button onClick={() => addIdea(it)} style={{ background: T.ink, color: T.paper }} className="text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full mt-2">Add to my meals</button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            {ideas.length === 0 && <p style={{ color: T.sub }} className="text-xs">All sorted — nothing left to review.</p>}
          </div>
        )}
      </div>}

      <div style={{ ...GLASS() }} className="rounded-3xl p-5 mb-6">
        <button onClick={() => setOpenGroc(!openGroc)} className="w-full flex items-center justify-between text-left">
          <div>
            <div style={{ color: T.ink }} className="text-sm font-medium">Grocery list</div>
            <div style={{ color: T.sub }} className="text-[11px]">{needed} to get. Tick things you already have or have bought.</div>
          </div>
          <span style={{ color: T.sub }} className="text-lg">{openGroc ? "−" : "+"}</span>
        </button>
        {openGroc && (
          <div className="mt-4">
            {grocery.map((g) => (
              <div key={g.cat} className="mb-4">
                <div style={{ color: T.brass }} className="text-[11px] uppercase tracking-widest mb-2">{g.cat}</div>
                <div className="flex flex-col gap-1.5">
                  {g.items.map((x) => (
                    <div key={x.id} className="flex items-center gap-2.5">
                      <Checkbox checked={x.have} onClick={() => tick(g.cat, x.id)} />
                      <span style={{ color: x.have ? T.sub : T.ink, textDecoration: x.have ? "line-through" : "none" }} className="text-xs flex-1">{x.name}</span>
                      <button onClick={() => delItem(g.cat, x.id)}><X size={11} color={T.sub} /></button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex gap-2 items-center mb-3">
              <select value={gDraft.cat} onChange={(e) => setGDraft({ ...gDraft, cat: e.target.value })} style={{ borderColor: T.line, color: T.ink, background: "transparent" }} className="border-b text-xs py-1 focus:outline-none">
                {["Produce", "Protein", "Dairy & eggs", "Pantry", "Frozen", ...grocery.map((g) => g.cat).filter((c) => !["Produce", "Protein", "Dairy & eggs", "Pantry", "Frozen"].includes(c))].map((c) => <option key={c} style={{ color: "#000" }}>{c}</option>)}
              </select>
              <input value={gDraft.name} onChange={(e) => setGDraft({ ...gDraft, name: e.target.value })} onKeyDown={(e) => e.key === "Enter" && addItem()} placeholder="Add an item…" style={{ borderColor: T.line, color: T.ink }} className="flex-1 border-b text-xs py-1 bg-transparent focus:outline-none" />
              <button onClick={addItem} style={{ color: T.brass }} className="text-xs uppercase tracking-widest">Add</button>
            </div>
            <button onClick={uncheckAll} style={{ color: T.sub }} className="text-[10px] uppercase tracking-widest">Uncheck everything (new week)</button>
          </div>
        )}
      </div>
    </div>
  );
}

function EducationView({ state, setState }) {
  const [tab, setTab] = useState("courses");
  const edu = state.education;
  const setEdu = (fn) => setState((s) => ({ ...s, education: fn(s.education) }));
  const [courseDraft, setCourseDraft] = useState("");
  const [assignmentDrafts, setAssignmentDrafts] = useState({});
  const [sessionDraft, setSessionDraft] = useState({ subject: "", day: "Mon", time: "" });
  const [readingDraft, setReadingDraft] = useState("");
  const [cardDraft, setCardDraft] = useState({ front: "", back: "" });
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const runAI = async () => {
    if (!aiPrompt.trim()) return;
    setAiLoading(true); setAiResponse("");
    const answer = await askClaude(`You are a calm, precise study assistant for a college student. Keep answers concise and structured. Question: ${aiPrompt}`);
    setAiResponse(answer); setAiLoading(false);
  };
  const generateFlashcards = async () => {
    if (!aiPrompt.trim()) return;
    setAiLoading(true);
    const raw = await askClaude(`Generate exactly 3 flashcards (front/back) for studying: "${aiPrompt}". Respond with ONLY compact JSON: [{"front":"...","back":"..."}, ...]`);
    try {
      const match = raw.match(/\[[\s\S]*\]/);
      const cards = JSON.parse(match ? match[0] : raw);
      setEdu((e) => ({ ...e, flashcards: [...e.flashcards, ...cards.map((c) => ({ id: uid(), front: c.front, back: c.back, box: 1 }))] }));
      setAiResponse(`Added ${cards.length} flashcards to your deck.`);
    } catch (err) { setAiResponse("Couldn't parse flashcards — try rephrasing the topic."); }
    setAiLoading(false);
  };
  return (
    <div className="max-w-2xl">
      <h1 style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif", color: T.ink }} className="text-3xl mb-1">Education</h1>

      <SyllabusImporter state={state} setState={setState} />

      <SectionLabel>Courses</SectionLabel>
      {true && (
        <div className="mb-8">
          <div className="flex flex-col gap-4 mb-4">
            {edu.courses.map((c) => (
              <Card key={c.id}>
                <div className="flex items-center justify-between mb-3">
                  <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif", color: T.ink }} className="text-lg">{c.name}</div>
                  <button onClick={() => setEdu((e) => ({ ...e, courses: e.courses.filter((x) => x.id !== c.id) }))}><Trash2 size={13} color={T.sub} /></button>
                </div>
                <div className="flex flex-col gap-2 mb-2">
                  {c.assignments.map((a) => (
                    <div key={a.id} className="flex items-center gap-3">
                      <Checkbox checked={a.done} onClick={() => setEdu((e) => ({ ...e, courses: e.courses.map((x) => x.id === c.id ? { ...x, assignments: x.assignments.map((y) => y.id === a.id ? { ...y, done: !y.done } : y) } : x) }))} />
                      <span style={{ color: a.done ? T.sub : T.ink, textDecoration: a.done ? "line-through" : "none" }} className="text-sm flex-1">{a.text}</span>
                      {a.due && <span style={{ color: T.brass, fontWeight: 300 }} className="text-[10px] shrink-0">{a.due}</span>}
                      <button onClick={() => setEdu((e) => ({ ...e, courses: e.courses.map((x) => x.id === c.id ? { ...x, assignments: x.assignments.filter((y) => y.id !== a.id) } : x) }))}><X size={12} color={T.sub} /></button>
                    </div>
                  ))}
                </div>
                <input value={assignmentDrafts[c.id] || ""} onChange={(e) => setAssignmentDrafts({ ...assignmentDrafts, [c.id]: e.target.value })}
                  onKeyDown={(e) => { if (e.key === "Enter" && (assignmentDrafts[c.id] || "").trim()) {
                    setEdu((ed) => ({ ...ed, courses: ed.courses.map((x) => x.id === c.id ? { ...x, assignments: [...x.assignments, { id: uid(), text: assignmentDrafts[c.id].trim(), due: "", done: false }] } : x) }));
                    setAssignmentDrafts({ ...assignmentDrafts, [c.id]: "" });
                  }}}
                  placeholder="Add assignment..." style={{ borderColor: T.line }} className="w-full border-b text-sm py-1 bg-transparent focus:outline-none" />
                {c.rules && c.rules.length > 0 && (
                  <details className="mt-3">
                    <summary style={{ color: T.sub }} className="text-[10px] uppercase tracking-wider cursor-pointer">Course rules ({c.rules.length})</summary>
                    <ul className="flex flex-col gap-1 mt-2">
                      {c.rules.map((r, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span style={{ color: T.ink, fontWeight: 300 }} className="text-xs flex-1">• {r}</span>
                          <button onClick={() => setEdu((e) => ({ ...e, courses: e.courses.map((x) => x.id === c.id ? { ...x, rules: x.rules.filter((_, j) => j !== i) } : x) }))}><X size={10} color={T.sub} /></button>
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
              </Card>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={courseDraft} onChange={(e) => setCourseDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && courseDraft.trim()) { setEdu((e_) => ({ ...e_, courses: [...e_.courses, { id: uid(), name: courseDraft.trim(), assignments: [] }] })); setCourseDraft(""); } }}
              placeholder="Add a course..." style={{ borderColor: T.line }} className="flex-1 border-b text-sm py-1 bg-transparent focus:outline-none" />
          </div>
        </div>
      )}

      <SectionLabel>Study Planner</SectionLabel>
      {true && (
        <div className="mb-8">
          <div className="flex flex-col gap-2 mb-4">
            {edu.studySessions.map((s) => (
              <Card key={s.id} className="flex items-center justify-between">
                <span style={{ color: T.ink }} className="text-sm">{s.subject}</span>
                <div className="flex items-center gap-3">
                  <span style={{ color: T.brass }} className="text-xs uppercase tracking-wider">{s.day} · {s.time} · {s.duration}</span>
                  <button onClick={() => setEdu((e) => ({ ...e, studySessions: e.studySessions.filter((x) => x.id !== s.id) }))}><X size={12} color={T.sub} /></button>
                </div>
              </Card>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            <input value={sessionDraft.subject} onChange={(e) => setSessionDraft({ ...sessionDraft, subject: e.target.value })} placeholder="Subject" style={{ borderColor: T.line }} className="flex-1 min-w-[120px] border-b text-sm py-1 bg-transparent focus:outline-none" />
            <select value={sessionDraft.day} onChange={(e) => setSessionDraft({ ...sessionDraft, day: e.target.value })} style={{ borderColor: T.line, color: T.ink, background: "transparent" }} className="border-b text-sm py-1 focus:outline-none">
              {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            <input value={sessionDraft.time} onChange={(e) => setSessionDraft({ ...sessionDraft, time: e.target.value })} placeholder="Time" style={{ borderColor: T.line }} className="w-24 border-b text-sm py-1 bg-transparent focus:outline-none" />
            <button onClick={() => { if (!sessionDraft.subject.trim()) return; setEdu((e) => ({ ...e, studySessions: [...e.studySessions, { id: uid(), duration: "45 min", ...sessionDraft }] })); setSessionDraft({ subject: "", day: "Mon", time: "" }); }}
              style={{ background: T.ink, color: T.paper }} className="px-3 rounded-sm text-xs uppercase tracking-widest">Add</button>
          </div>
        </div>
      )}

      <SectionLabel>Reading List</SectionLabel>
      {true && (
        <div className="mb-8">
          <div className="flex flex-col gap-2 mb-4">
            {edu.readingList.map((r) => (
              <Card key={r.id} className="flex items-center justify-between gap-2">
                <span style={{ color: T.ink }} className="text-sm flex-1">{r.title}</span>
                <button onClick={() => setEdu((e) => ({ ...e, readingList: e.readingList.map((x) => x.id === r.id ? { ...x, status: x.status === "To Read" ? "Reading" : x.status === "Reading" ? "Done" : "To Read" } : x) }))}
                  style={{ borderColor: T.line, color: T.sub }} className="text-[11px] uppercase tracking-wider border rounded-full px-2.5 py-1 shrink-0">{r.status}</button>
                <button onClick={() => setEdu((e) => ({ ...e, readingList: e.readingList.filter((x) => x.id !== r.id) }))}><X size={12} color={T.sub} /></button>
              </Card>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={readingDraft} onChange={(e) => setReadingDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && readingDraft.trim()) { setEdu((e_) => ({ ...e_, readingList: [...e_.readingList, { id: uid(), title: readingDraft.trim(), status: "To Read" }] })); setReadingDraft(""); } }}
              placeholder="Add a book or article..." style={{ borderColor: T.line }} className="flex-1 border-b text-sm py-1 bg-transparent focus:outline-none" />
          </div>
        </div>
      )}

      <SectionLabel>Flashcards</SectionLabel>
      {true && (
        <div className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {edu.flashcards.map((c) => (
              <FlashcardTile key={c.id} card={c}
                onReview={(known) => setEdu((e) => ({ ...e, flashcards: e.flashcards.map((x) => x.id === c.id ? { ...x, box: known ? Math.min(5, x.box + 1) : 1 } : x) }))}
                onDelete={() => setEdu((e) => ({ ...e, flashcards: e.flashcards.filter((x) => x.id !== c.id) }))} />
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            <input value={cardDraft.front} onChange={(e) => setCardDraft({ ...cardDraft, front: e.target.value })} placeholder="Front" style={{ borderColor: T.line }} className="flex-1 min-w-[120px] border-b text-sm py-1 bg-transparent focus:outline-none" />
            <input value={cardDraft.back} onChange={(e) => setCardDraft({ ...cardDraft, back: e.target.value })} placeholder="Back" style={{ borderColor: T.line }} className="flex-1 min-w-[120px] border-b text-sm py-1 bg-transparent focus:outline-none" />
            <button onClick={() => { if (!cardDraft.front.trim() || !cardDraft.back.trim()) return; setEdu((e) => ({ ...e, flashcards: [...e.flashcards, { id: uid(), ...cardDraft, box: 1 }] })); setCardDraft({ front: "", back: "" }); }}
              style={{ background: T.ink, color: T.paper }} className="px-3 rounded-sm text-xs uppercase tracking-widest">Add</button>
          </div>
        </div>
      )}

      <SectionLabel>AI Study Assistant</SectionLabel>
      {true && (
        <div>
          <Card className="mb-4">
            <textarea value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} rows={3}
              placeholder="Explain a concept, quiz yourself, or ask it to generate flashcards for a topic..."
              style={{ color: T.ink }} className="w-full bg-transparent text-sm focus:outline-none resize-none mb-3" />
            <div className="flex gap-2 flex-wrap">
              <button onClick={runAI} disabled={aiLoading} style={{ background: T.ink, color: T.paper }} className="text-xs uppercase tracking-widest px-4 py-2 rounded-sm levi-glow-btn">{aiLoading ? "Thinking…" : "Ask"}</button>
              <button onClick={generateFlashcards} disabled={aiLoading} style={{ borderColor: T.ink, color: T.ink }} className="text-xs uppercase tracking-widest px-4 py-2 rounded-sm border">Generate flashcards from this</button>
            </div>
          </Card>
          {aiResponse && <Card><div style={{ color: T.ink, whiteSpace: "pre-wrap" }} className="text-sm">{aiResponse}</div></Card>}
        </div>
      )}
    </div>
  );
}
function FlashcardTile({ card, onReview, onDelete }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div onClick={() => setFlipped((f) => !f)} className="cursor-pointer min-h-[70px] flex items-center flex-1">
          <span style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif", color: T.ink }} className="text-base">{flipped ? card.back : card.front}</span>
        </div>
        {onDelete && <button onClick={onDelete}><X size={12} color={T.sub} /></button>}
      </div>
      <div style={{ borderColor: T.line }} className="border-t mt-3 pt-2 flex items-center justify-between">
        <span style={{ color: T.sub }} className="text-[11px] uppercase tracking-wider">Box {card.box}</span>
        <div className="flex gap-2">
          <button onClick={() => onReview(false)} style={{ color: T.sub }} className="text-[11px] uppercase tracking-widest">Missed</button>
          <button onClick={() => onReview(true)} style={{ color: T.brass }} className="text-[11px] uppercase tracking-widest">Knew it</button>
        </div>
      </div>
    </Card>
  );
}

/* ------------------------------- SKILL TREE ----------------------------- */
const SKILL_EMBLEMS = {
  chess: "\u265E", writing: "\u2712\uFE0F", drawing: "\uD83C\uDFA8", guitar: "\uD83C\uDFB8", piano: "\uD83C\uDFB9",
  "horseback riding": "\uD83D\uDC0E", riding: "\uD83D\uDC0E", racing: "\uD83C\uDFCE\uFE0F", shooting: "\uD83C\uDFAF",
  boxing: "\uD83E\uDD4A", italian: "\uD83C\uDDEE\uD83C\uDDF9", german: "\uD83C\uDDE9\uD83C\uDDEA", russian: "\uD83C\uDDF7\uD83C\uDDFA",
  french: "\u269C\uFE0F", photography: "\uD83D\uDCF7", cooking: "\uD83C\uDF73", dancing: "\uD83E\uDE70", reading: "\uD83D\uDCD6",
};
const skillEmblem = (name) => SKILL_EMBLEMS[name.toLowerCase().trim()] || "\u2726";

function SkillCard({ sk, onPractice, onDelete, onImage }) {
  const inputRef = useRef(null);
  return (
    <div style={{ ...GLASS() }} className="rounded-3xl p-4 flex items-center gap-4">
      <button onClick={() => inputRef.current && inputRef.current.click()}
        style={{ background: `${T.paper}AA`, border: `1px solid ${T.line}`, boxShadow: `0 0 12px ${T.brass}22` }}
        className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden"
        title="Tap to set a photo for this skill">
        {sk.image
          ? <img src={sk.image} alt="" className="w-full h-full object-cover" />
          : <span className="text-2xl" style={{ filter: `drop-shadow(0 0 5px ${T.brass}66)` }}>{skillEmblem(sk.name)}</span>}
      </button>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={async (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        try { onImage(await fileToResizedDataURL(file, 300)); } catch (err) { console.error(err); }
        e.target.value = "";
      }} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span style={{ color: T.ink, fontWeight: 300 }} className="text-base truncate">{sk.name}</span>
          <span style={{ color: T.sub, fontWeight: 300 }} className="text-[11px] shrink-0">lvl {sk.level}</span>
        </div>
        <div style={{ background: T.line }} className="h-[5px] rounded-full overflow-hidden mb-1.5">
          <div style={{ background: HOLO(), width: `${(sk.xp / sk.xpToNext) * 100}%`, boxShadow: `0 0 8px ${T.brass}66` }} className="h-full rounded-full" />
        </div>
        <div className="flex items-center justify-between">
          <span style={{ color: T.sub, fontWeight: 300 }} className="text-[10px]">{sk.hours}h practiced</span>
          <div className="flex items-center gap-2">
            <button onClick={onPractice} style={{ color: T.brass, fontWeight: 300 }} className="text-[10px] uppercase tracking-widest">+30 min</button>
            <button onClick={onDelete}><Trash2 size={11} color={T.sub} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkillTreeView({ state, setState }) {
  const [draft, setDraft] = useState("");
  const addSkill = () => { if (!draft.trim()) return; setState((s) => ({ ...s, skills: [...s.skills, { id: uid(), name: draft.trim(), pillar: "mastery", level: 1, xp: 0, xpToNext: 100, hours: 0, image: null }] })); setDraft(""); };
  const practice = (id) => setState((s) => ({ ...s, skills: s.skills.map((sk) => { if (sk.id !== id) return sk; let xp = sk.xp + 15, level = sk.level, xpToNext = sk.xpToNext; if (xp >= xpToNext) { xp -= xpToNext; level += 1; xpToNext = Math.round(xpToNext * 1.15); } return { ...sk, xp, level, xpToNext, hours: +(sk.hours + 0.5).toFixed(1) }; }) }));
  const setImage = (id, image) => setState((s) => ({ ...s, skills: s.skills.map((sk) => sk.id === id ? { ...sk, image } : sk) }));
  return (
    <div className="max-w-xl mx-auto">
      <h1 style={{ color: T.ink, fontWeight: 300 }} className="text-3xl mb-6">Skills</h1>
      <div className="flex flex-col gap-3 mb-6">
        {state.skills.map((sk) => (
          <SkillCard key={sk.id} sk={sk}
            onPractice={() => practice(sk.id)}
            onDelete={() => setState((s) => ({ ...s, skills: s.skills.filter((x) => x.id !== sk.id) }))}
            onImage={(img) => setImage(sk.id, img)} />
        ))}
      </div>
      <div className="flex gap-2">
        <input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addSkill()} placeholder="Add a new skill..." style={{ borderColor: T.line }} className="flex-1 border-b text-sm py-1 bg-transparent focus:outline-none" />
        <button onClick={addSkill}><Plus size={14} color={T.brass} /></button>
      </div>
    </div>
  );
}

/* --------------------------- ARCHEOR DASHBOARD ---------------------------- */
function MiniMonthCalendar({ items, selectedDate, onSelectDate, colorFor }) {
  const [cursor, setCursor] = useState(() => { const d = selectedDate ? new Date(selectedDate) : new Date(); d.setDate(1); return d; });
  const year = cursor.getFullYear(), month = cursor.getMonth();
  const firstDay = new Date(year, month, 1);
  const startWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  const dateKey = (d) => `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const byDate = items.reduce((acc, it) => { if (it.date) (acc[it.date] = acc[it.date] || []).push(it); return acc; }, {});
  return (
    <Card className="mb-4">
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => setCursor(new Date(year, month - 1, 1))}><ChevronLeft size={15} color={T.ink} /></button>
        <span style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif", color: T.ink }} className="text-base">{cursor.toLocaleString("default", { month: "long", year: "numeric" })}</span>
        <button onClick={() => setCursor(new Date(year, month + 1, 1))}><ChevronRight size={15} color={T.ink} /></button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {["S","M","T","W","T","F","S"].map((d, i) => <div key={i} style={{ color: T.sub }} className="text-center text-[9px] uppercase">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (d === null) return <div key={i} />;
          const key = dateKey(d);
          const isToday = key === todayStr();
          const isSelected = key === selectedDate;
          const dayItems = byDate[key] || [];
          return (
            <button key={i} onClick={() => onSelectDate(key)}
              style={{ background: isSelected ? T.parchment : "transparent", borderColor: isToday ? T.brass : T.line, borderWidth: isToday ? 1.5 : 1, minHeight: 44 }}
              className="rounded-sm border flex flex-col items-center p-1 text-[10px]">
              <span style={{ color: isToday ? T.brass : T.ink }}>{d}</span>
              {dayItems.length > 0 && <span style={{ background: colorFor ? colorFor(dayItems[0]) : T.brass, boxShadow: `0 0 5px ${colorFor ? colorFor(dayItems[0]) : T.brass}` }} className="w-1.5 h-1.5 rounded-full mt-0.5" />}
            </button>
          );
        })}
      </div>
    </Card>
  );
}

function ArcheorView({ state, setState }) {
  const [tab, setTab] = useState("projects");
  const archeor = state.archeor;
  const setArcheor = (fn) => setState((s) => ({ ...s, archeor: fn(s.archeor) }));
  const [projectDraft, setProjectDraft] = useState("");
  const [ideaDraft, setIdeaDraft] = useState("");
  const [calDraft, setCalDraft] = useState({ title: "", date: "", platform: "Instagram" });
  const [noteDraft, setNoteDraft] = useState("");
  const [linkDraft, setLinkDraft] = useState({ label: "", url: "" });
  const STATUS_CYCLE = ["Not Started", "In Progress", "Done"];
  const cycleStatus = (s) => STATUS_CYCLE[(STATUS_CYCLE.indexOf(s) + 1) % STATUS_CYCLE.length];
  const tabs = [
    { key: "projects", label: "Projects" }, { key: "ideas", label: "Idea Vault" }, { key: "content", label: "Content Calendar" },
    { key: "roadmap", label: "Roadmap" }, { key: "links", label: "Links" }, { key: "brand", label: "Brand" },
    { key: "finance", label: "Finance" }, { key: "notes", label: "Meeting Notes" },
  ];
  return (
    <div className="max-w-2xl">
      <h1 style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif", color: T.ink }} className="text-3xl mb-1">ARCHEOR</h1>
      <div className="flex flex-wrap gap-1 mb-8" style={{ borderBottom: `1px solid ${T.line}` }}>
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{ color: tab === t.key ? T.ink : T.sub, borderColor: tab === t.key ? T.brass : "transparent" }} className="text-xs uppercase tracking-widest px-3 py-2 border-b-2 -mb-px">{t.label}</button>
        ))}
      </div>
      {tab === "projects" && (
        <div>
          <div className="flex flex-col gap-2 mb-4">
            {archeor.projects.map((p) => (
              <Card key={p.id} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0"><PillarTag pillar={p.pillar} /><span style={{ color: T.ink }} className="text-sm truncate">{p.name}</span></div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => setArcheor((a) => ({ ...a, projects: a.projects.map((x) => x.id === p.id ? { ...x, status: cycleStatus(x.status) } : x) }))} style={{ borderColor: T.line, color: T.sub }} className="text-[11px] uppercase tracking-wider border rounded-full px-2.5 py-1">{p.status}</button>
                  <button onClick={() => setArcheor((a) => ({ ...a, projects: a.projects.filter((x) => x.id !== p.id) }))}><Trash2 size={12} color={T.sub} /></button>
                </div>
              </Card>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={projectDraft} onChange={(e) => setProjectDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && projectDraft.trim()) { setArcheor((a) => ({ ...a, projects: [...a.projects, { id: uid(), name: projectDraft.trim(), status: "Not Started", pillar: "deepwork" }] })); setProjectDraft(""); } }}
              placeholder="Add a project..." style={{ borderColor: T.line }} className="flex-1 border-b text-sm py-1 bg-transparent focus:outline-none" />
          </div>
        </div>
      )}
      {tab === "ideas" && (
        <div>
          <p style={{ color: T.sub }} className="text-xs mb-4">Business ideas from Brain Dump land here automatically.</p>
          <div className="flex flex-col gap-2 mb-4">
            {archeor.ideas.map((idea) => (
              <Card key={idea.id} className="flex items-center justify-between gap-3">
                <span style={{ color: T.ink }} className="text-sm">{idea.text}</span>
                <div className="flex items-center gap-2 shrink-0">
                  {idea.source === "brain dump" && <span style={{ color: T.brass }} className="text-[10px] uppercase tracking-widest">via Brain Dump</span>}
                  <button onClick={() => setArcheor((a) => ({ ...a, ideas: a.ideas.filter((x) => x.id !== idea.id) }))}><X size={12} color={T.sub} /></button>
                </div>
              </Card>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={ideaDraft} onChange={(e) => setIdeaDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && ideaDraft.trim()) { setArcheor((a) => ({ ...a, ideas: [{ id: uid(), text: ideaDraft.trim(), source: "manual" }, ...a.ideas] })); setIdeaDraft(""); } }}
              placeholder="Drop an idea..." style={{ borderColor: T.line }} className="flex-1 border-b text-sm py-1 bg-transparent focus:outline-none" />
          </div>
        </div>
      )}
      {tab === "content" && (
        <div>
          <p style={{ color: T.sub }} className="text-xs mb-3">Its own calendar — separate from the main Calendar in the sidebar.</p>
          <MiniMonthCalendar items={archeor.contentCalendar} selectedDate={calDraft.date || todayStr()} onSelectDate={(d) => setCalDraft({ ...calDraft, date: d })} colorFor={() => T.brass} />
          <SectionLabel>{new Date(calDraft.date || todayStr()).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}</SectionLabel>
          <div className="flex flex-col gap-2 mb-4">
            {archeor.contentCalendar.filter((c) => c.date === (calDraft.date || todayStr())).map((c) => (
              <Card key={c.id} className="flex items-center gap-3">
                <Checkbox checked={c.done} onClick={() => setArcheor((a) => ({ ...a, contentCalendar: a.contentCalendar.map((x) => x.id === c.id ? { ...x, done: !x.done } : x) }))} />
                <span style={{ color: c.done ? T.sub : T.ink, textDecoration: c.done ? "line-through" : "none" }} className="text-sm flex-1">{c.title}</span>
                <span style={{ color: T.brass }} className="text-[10px] uppercase tracking-widest">{c.platform}</span>
                <button onClick={() => setArcheor((a) => ({ ...a, contentCalendar: a.contentCalendar.filter((x) => x.id !== c.id) }))}><X size={12} color={T.sub} /></button>
              </Card>
            ))}
            {archeor.contentCalendar.filter((c) => c.date === (calDraft.date || todayStr())).length === 0 && <span style={{ color: T.sub }} className="text-sm">Nothing planned for this day.</span>}
          </div>
          <div className="flex gap-2 flex-wrap">
            <input value={calDraft.title} onChange={(e) => setCalDraft({ ...calDraft, title: e.target.value })} placeholder="Content piece..." style={{ borderColor: T.line }} className="flex-1 min-w-[140px] border-b text-sm py-1 bg-transparent focus:outline-none" />
            <input type="date" value={calDraft.date} onChange={(e) => setCalDraft({ ...calDraft, date: e.target.value })} style={{ borderColor: T.line, color: T.ink, background: "transparent" }} className="border-b text-sm py-1 focus:outline-none" />
            <select value={calDraft.platform} onChange={(e) => setCalDraft({ ...calDraft, platform: e.target.value })} style={{ borderColor: T.line, color: T.ink, background: "transparent" }} className="border-b text-sm py-1 focus:outline-none">
              <option>Instagram</option><option>TikTok</option><option>Email</option><option>Site</option><option>Other</option>
            </select>
            <button onClick={() => { if (!calDraft.title.trim()) return; setArcheor((a) => ({ ...a, contentCalendar: [...a.contentCalendar, { id: uid(), ...calDraft, date: calDraft.date || todayStr(), done: false }] })); setCalDraft({ ...calDraft, title: "" }); }} style={{ background: T.ink, color: T.paper }} className="px-3 rounded-sm text-xs uppercase tracking-widest levi-glow-btn">Add</button>
          </div>
        </div>
      )}
      {tab === "roadmap" && (
        <div>
          <div className="flex flex-col gap-2 mb-4">
            {archeor.roadmap.map((r) => (
              <Card key={r.id} className="flex items-center gap-3">
                <Checkbox checked={r.done} onClick={() => setArcheor((a) => ({ ...a, roadmap: a.roadmap.map((x) => x.id === r.id ? { ...x, done: !x.done } : x) }))} />
                <span style={{ color: r.done ? T.sub : T.ink, textDecoration: r.done ? "line-through" : "none" }} className="text-sm flex-1">{r.milestone}</span>
                <span style={{ color: T.brass }} className="text-xs uppercase tracking-wider">{r.quarter}</span>
                <button onClick={() => setArcheor((a) => ({ ...a, roadmap: a.roadmap.filter((x) => x.id !== r.id) }))}><X size={12} color={T.sub} /></button>
              </Card>
            ))}
          </div>
        </div>
      )}
      {tab === "links" && (
        <div>
          <p style={{ color: T.sub }} className="text-xs mb-4">A link tree for the business — email, socials, site — one tap away.</p>
          <div className="flex flex-col gap-2 mb-4">
            {archeor.links.map((l) => (
              <Card key={l.id} className="flex items-center justify-between gap-3">
                <a href={l.url} target="_blank" rel="noreferrer" style={{ color: T.ink }} className="text-sm truncate flex-1">{l.label}</a>
                <div className="flex items-center gap-2 shrink-0">
                  <a href={l.url} target="_blank" rel="noreferrer" style={{ color: T.brass }} className="text-[10px] uppercase tracking-widest">Open</a>
                  <button onClick={() => setArcheor((a) => ({ ...a, links: a.links.filter((x) => x.id !== l.id) }))}><X size={12} color={T.sub} /></button>
                </div>
              </Card>
            ))}
            {archeor.links.length === 0 && <span style={{ color: T.sub }} className="text-sm">No links yet — add your email, Instagram, TikTok, or site below.</span>}
          </div>
          <div className="flex gap-2 flex-wrap">
            <input value={linkDraft.label} onChange={(e) => setLinkDraft({ ...linkDraft, label: e.target.value })} placeholder="Label — e.g. Email, Instagram" style={{ borderColor: T.line }} className="flex-1 min-w-[120px] border-b text-sm py-1 bg-transparent focus:outline-none" />
            <input value={linkDraft.url} onChange={(e) => setLinkDraft({ ...linkDraft, url: e.target.value })} placeholder="https:// or mailto:..." style={{ borderColor: T.line }} className="flex-1 min-w-[160px] border-b text-sm py-1 bg-transparent focus:outline-none" />
            <button onClick={() => { if (!linkDraft.label.trim() || !linkDraft.url.trim()) return; setArcheor((a) => ({ ...a, links: [...a.links, { id: uid(), ...linkDraft }] })); setLinkDraft({ label: "", url: "" }); }} style={{ background: T.ink, color: T.paper }} className="px-3 rounded-sm text-xs uppercase tracking-widest">Add</button>
          </div>
        </div>
      )}
      {tab === "brand" && (
        <div>
          <Card className="mb-4"><SectionLabel>Palette</SectionLabel><div className="flex flex-wrap gap-2">{archeor.brand.palette.map((c) => (<span key={c} style={{ borderColor: T.line, color: T.ink }} className="text-xs border rounded-full px-3 py-1">{c}</span>))}</div></Card>
          <Card className="mb-4"><SectionLabel>Typography</SectionLabel><span style={{ color: T.ink }} className="text-sm">{archeor.brand.typography}</span></Card>
          <Card><SectionLabel>Guiding Principle</SectionLabel><span style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif", color: T.ink }} className="text-lg italic">"{archeor.brand.principle}"</span></Card>
        </div>
      )}
      {tab === "finance" && (
        <div className="grid grid-cols-2 gap-4">
          {[["revenue", "Revenue"], ["expenses", "Expenses"], ["runwayMonths", "Runway (months)"], ["fundingTarget", "Funding Target"]].map(([key, label]) => (
            <Card key={key}><SectionLabel>{label}</SectionLabel>
              <input type="number" value={archeor.finance[key]} onChange={(e) => setArcheor((a) => ({ ...a, finance: { ...a.finance, [key]: Number(e.target.value) } }))} style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif", color: T.ink, background: "transparent" }} className="text-2xl w-full focus:outline-none" />
            </Card>
          ))}
        </div>
      )}
      {tab === "notes" && (
        <div>
          <Card className="mb-4">
            <textarea value={noteDraft} onChange={(e) => setNoteDraft(e.target.value)} rows={3} placeholder="Meeting notes, decisions, follow-ups..." style={{ color: T.ink }} className="w-full bg-transparent text-sm focus:outline-none resize-none" />
            <div className="flex justify-end"><button onClick={() => { if (!noteDraft.trim()) return; setArcheor((a) => ({ ...a, meetingNotes: [{ id: uid(), date: todayStr(), text: noteDraft.trim() }, ...a.meetingNotes] })); setNoteDraft(""); }} style={{ background: T.ink, color: T.paper }} className="text-xs uppercase tracking-widest px-4 py-2 rounded-sm mt-2">Save note</button></div>
          </Card>
          <div className="flex flex-col gap-3">{archeor.meetingNotes.map((n) => (<Card key={n.id} className="flex items-start justify-between gap-3"><div><div style={{ color: T.sub }} className="text-xs uppercase tracking-wider mb-2">{n.date}</div><div style={{ color: T.ink }} className="text-sm whitespace-pre-wrap">{n.text}</div></div><button onClick={() => setArcheor((a) => ({ ...a, meetingNotes: a.meetingNotes.filter((x) => x.id !== n.id) }))}><X size={12} color={T.sub} /></button></Card>))}</div>
        </div>
      )}
    </div>

  );
}

/* -------------------------------- HEALTH -------------------------------- */

function RecipeDetail({ recipe, onClose, onSave, onLog }) {
  const [editing, setEditing] = useState(false);
  const [d, setD] = useState({ ingredients: (recipe.ingredients || []).join("\n"), method: recipe.method || "", protein: recipe.protein, fiber: recipe.fiber });
  const save = () => { onSave({ ingredients: d.ingredients.split("\n").map((x) => x.trim()).filter(Boolean), method: d.method, protein: Number(d.protein) || 0, fiber: Number(d.fiber) || 0 }); setEditing(false); };
  const has = (recipe.ingredients || []).length > 0;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 80, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ ...GLASS(0.85), maxHeight: "88vh", overflowY: "auto", width: "100%", maxWidth: 560 }} className="rounded-t-3xl p-5 pb-10">
        <div className="flex items-start justify-between gap-3 mb-1">
          <div style={{ color: T.ink }} className="text-lg font-medium">{recipe.name}</div>
          <button onClick={onClose}><X size={16} color={T.sub} /></button>
        </div>
        <div style={{ color: T.sub }} className="text-xs mb-3">{recipe.category} · about {recipe.protein}g protein · {recipe.fiber}g fiber</div>
        {recipe.image && <img src={recipe.image} alt="" className="w-full h-40 object-cover rounded-2xl mb-3" />}
        {!editing && (
          <div>
            <div style={{ color: T.brass }} className="text-[11px] uppercase tracking-widest mb-2">What goes in</div>
            {has ? (
              <ul className="mb-4 flex flex-col gap-1">{recipe.ingredients.map((x, i) => <li key={i} style={{ color: T.ink }} className="text-sm">• {x}</li>)}</ul>
            ) : <p style={{ color: T.sub }} className="text-xs mb-4">No ingredients written down yet — tap Edit to add them.</p>}
            {recipe.method && (<><div style={{ color: T.brass }} className="text-[11px] uppercase tracking-widest mb-2">How</div><p style={{ color: T.ink, fontWeight: 300 }} className="text-sm mb-4">{recipe.method}</p></>)}
            {recipe.afNote && <p style={{ color: T.sub }} className="text-xs mb-4">{recipe.afNote}</p>}
            <p style={{ color: T.sub }} className="text-[10px] mb-4">Numbers are estimates from standard food tables — your portions will vary a little. Treat them as a floor, not a limit: if you're hungry or it's a heavy dance day, eat more (extra rice, potato, quinoa, olive oil, avocado).</p>
            <div className="flex gap-2">
              <button onClick={() => { onLog(); onClose(); }} style={{ background: T.ink, color: T.paper }} className="text-[10px] uppercase tracking-widest px-4 py-2 rounded-full">Log it (optional)</button>
              <button onClick={() => setEditing(true)} style={{ borderColor: T.line, color: T.ink }} className="text-[10px] uppercase tracking-widest px-4 py-2 rounded-full border">Edit</button>
            </div>
          </div>
        )}
        {editing && (
          <div className="flex flex-col gap-3">
            <div style={{ color: T.sub }} className="text-[10px] uppercase tracking-wider">Ingredients — one per line</div>
            <textarea value={d.ingredients} onChange={(e) => setD({ ...d, ingredients: e.target.value })} rows={7} style={{ borderColor: T.line, color: T.ink }} className="w-full border rounded-xl p-3 text-sm bg-transparent focus:outline-none" />
            <div style={{ color: T.sub }} className="text-[10px] uppercase tracking-wider">How</div>
            <textarea value={d.method} onChange={(e) => setD({ ...d, method: e.target.value })} rows={4} style={{ borderColor: T.line, color: T.ink }} className="w-full border rounded-xl p-3 text-sm bg-transparent focus:outline-none" />
            <div className="flex gap-3 items-center">
              <label style={{ color: T.sub }} className="text-xs">Protein g <input type="number" value={d.protein} onChange={(e) => setD({ ...d, protein: e.target.value })} style={{ borderColor: T.line, color: T.ink }} className="w-16 border-b bg-transparent text-sm ml-1 focus:outline-none" /></label>
              <label style={{ color: T.sub }} className="text-xs">Fiber g <input type="number" value={d.fiber} onChange={(e) => setD({ ...d, fiber: e.target.value })} style={{ borderColor: T.line, color: T.ink }} className="w-16 border-b bg-transparent text-sm ml-1 focus:outline-none" /></label>
            </div>
            <div className="flex gap-2">
              <button onClick={save} style={{ background: T.ink, color: T.paper }} className="text-[10px] uppercase tracking-widest px-4 py-2 rounded-full">Save</button>
              <button onClick={() => setEditing(false)} style={{ color: T.sub }} className="text-[10px] uppercase tracking-widest px-3 py-2">Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function RecipePhotoSlot({ recipe, onChange }) {
  const inputRef = useRef(null);
  return (
    <div className="relative group w-full aspect-square">
      {recipe.image ? (
        <img src={recipe.image} alt="" className="w-full h-full object-cover" />
      ) : (
        <div style={{ color: T.sub }} className="w-full h-full flex items-center justify-center"><Utensils size={20} color={T.sub} /></div>
      )}
      <button
        onClick={() => inputRef.current && inputRef.current.click()}
        style={{ background: `${T.ink}CC`, color: T.paper }}
        className="absolute bottom-1 right-1 text-[9px] uppercase tracking-widest px-2 py-1 rounded-sm"
      >
        {recipe.image ? "Change" : "+ Photo"}
      </button>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={async (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        try { onChange(await fileToResizedDataURL(file)); } catch (err) { console.error(err); }
        e.target.value = "";
      }} />
    </div>
  );
}
function HealthView({ state, setState }) {
  const [tab, setTab] = useState("vitals");
  const setHealth = (fn) => setState((s) => ({ ...s, health: fn(s.health) }));
  const toggleSupp = (id) => setHealth((h) => ({ ...h, supplements: h.supplements.map((sp) => (sp.id === id ? { ...sp, taken: !sp.taken } : sp)) }));
  const [suppDraft, setSuppDraft] = useState({ name: "", time: "Morning" });
  const [recipeDraft, setRecipeDraft] = useState({ name: "", category: "Breakfast", fiber: "", protein: "", image: null, notes: "" });
  const [showRecipeForm, setShowRecipeForm] = useState(false);
  const [openRecipeId, setOpenRecipeId] = useState(null);
  const [activeDayId, setActiveDayId] = useState(null);
  const [dayNameDraft, setDayNameDraft] = useState("");
  const [exerciseDrafts, setExerciseDrafts] = useState({});

  const tabs = [
    { key: "vitals", label: "Vitals & Supplements" },
    { key: "nutrition", label: "Nutrition" },
    { key: "fitness", label: "Fitness" },
  ];

  const todayLog = state.health.nutrition.log.filter((l) => l.date === todayStr());
  const fiberToday = todayLog.reduce((sum, l) => sum + (Number(l.fiber) || 0), 0);
  const proteinToday = todayLog.reduce((sum, l) => sum + (Number(l.protein) || 0), 0);

  const logRecipe = (recipe) => setHealth((h) => ({ ...h, nutrition: { ...h.nutrition, log: [{ id: uid(), date: todayStr(), food: recipe.name, fiber: recipe.fiber, protein: recipe.protein }, ...h.nutrition.log] } }));
  const saveRecipe = (id, patch) => setHealth((h) => ({ ...h, nutrition: { ...h.nutrition, recipes: h.nutrition.recipes.map((r) => r.id === id ? { ...r, ...patch } : r) } }));
  const removeFood = (id) => setHealth((h) => ({ ...h, nutrition: { ...h.nutrition, log: h.nutrition.log.filter((l) => l.id !== id) } }));
  const removeRecipe = (id) => setHealth((h) => ({ ...h, nutrition: { ...h.nutrition, recipes: h.nutrition.recipes.filter((r) => r.id !== id) } }));
  const updateRecipeImage = (id, image) => setHealth((h) => ({ ...h, nutrition: { ...h.nutrition, recipes: h.nutrition.recipes.map((r) => r.id === id ? { ...r, image } : r) } }));
  const addRecipe = () => {
    if (!recipeDraft.name.trim()) return;
    setHealth((h) => ({ ...h, nutrition: { ...h.nutrition, recipes: [...h.nutrition.recipes, { id: uid(), ...recipeDraft, fiber: Number(recipeDraft.fiber) || 0, protein: Number(recipeDraft.protein) || 0 }] } }));
    setRecipeDraft({ name: "", category: "Breakfast", fiber: "", protein: "", image: null, notes: "" });
    setShowRecipeForm(false);
  };

  const days = state.health.workouts.days;
  const activeDay = days.find((d) => d.id === activeDayId) || days[0];
  const setDays = (fn) => setHealth((h) => ({ ...h, workouts: { ...h.workouts, days: fn(h.workouts.days) } }));
  const toggleExercise = (dayId, exId) => setDays((ds) => ds.map((d) => d.id === dayId ? { ...d, exercises: d.exercises.map((ex) => ex.id === exId ? { ...ex, done: !ex.done } : ex) } : d));
  const removeExercise = (dayId, exId) => setDays((ds) => ds.map((d) => d.id === dayId ? { ...d, exercises: d.exercises.filter((ex) => ex.id !== exId) } : d));
  const addExercise = (dayId) => {
    const draft = exerciseDrafts[dayId];
    if (!draft || !draft.name || !draft.name.trim()) return;
    setDays((ds) => ds.map((d) => d.id === dayId ? { ...d, exercises: [...d.exercises, { id: uid(), name: draft.name.trim(), sets: Number(draft.sets) || 3, reps: draft.reps || "10", done: false }] } : d));
    setExerciseDrafts({ ...exerciseDrafts, [dayId]: { name: "", sets: "", reps: "" } });
  };
  const addDay = () => {
    if (!dayNameDraft.trim()) return;
    const newDay = { id: uid(), name: dayNameDraft.trim(), exercises: [] };
    setDays((ds) => [...ds, newDay]);
    setActiveDayId(newDay.id);
    setDayNameDraft("");
  };
  const removeDay = (dayId) => { setDays((ds) => ds.filter((d) => d.id !== dayId)); if (activeDayId === dayId) setActiveDayId(null); };
  const logSession = (day) => {
    const doneCount = day.exercises.filter((e) => e.done).length;
    setHealth((h) => ({ ...h, workouts: { ...h.workouts, history: [{ id: uid(), date: todayStr(), summary: `${day.name} — ${doneCount}/${day.exercises.length} exercises` }, ...h.workouts.history] } }));
    setDays((ds) => ds.map((d) => d.id === day.id ? { ...d, exercises: d.exercises.map((ex) => ({ ...ex, done: false })) } : d));
  };
  const removeHistory = (id) => setHealth((h) => ({ ...h, workouts: { ...h.workouts, history: h.workouts.history.filter((w) => w.id !== id) } }));

  const recipesByCategory = state.health.nutrition.recipes.reduce((acc, r) => { (acc[r.category] = acc[r.category] || []).push(r); return acc; }, {});

  return (
    <div className="max-w-2xl">
      <h1 style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif", color: T.ink }} className="text-3xl mb-1">Health</h1>
      <div className="flex flex-wrap gap-1 mb-8" style={{ borderBottom: `1px solid ${T.line}` }}>
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{ color: tab === t.key ? T.ink : T.sub, borderColor: tab === t.key ? T.brass : "transparent" }} className="text-xs uppercase tracking-widest px-3 py-2 border-b-2 -mb-px">{t.label}</button>
        ))}
      </div>

      {tab === "vitals" && (
        <div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card><SectionLabel>Sleep</SectionLabel>
              <div className="flex items-center gap-2">
                <button onClick={() => setHealth((h) => ({ ...h, sleepHours: Math.max(0, h.sleepHours - 0.5) }))} style={{ color: T.brass }}>−</button>
                <span style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif" }} className="text-xl w-12 text-center">{state.health.sleepHours}h</span>
                <button onClick={() => setHealth((h) => ({ ...h, sleepHours: h.sleepHours + 0.5 }))} style={{ color: T.brass }}>+</button>
              </div>
            </Card>
            <Card><SectionLabel>Water</SectionLabel>
              <div className="flex items-center gap-2">
                <button onClick={() => setHealth((h) => ({ ...h, waterBottles: Math.max(0, h.waterBottles - 1) }))} style={{ color: T.brass }}>−</button>
                <span style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif" }} className="text-xl w-12 text-center">{state.health.waterBottles}</span>
                <button onClick={() => setHealth((h) => ({ ...h, waterBottles: h.waterBottles + 1 }))} style={{ color: T.brass }}>+</button>
              </div>
            </Card>
            <Card><SectionLabel>Steps</SectionLabel>
              <input type="number" value={state.health.steps} onChange={(e) => setHealth((h) => ({ ...h, steps: Number(e.target.value) || 0 }))}
                style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif", color: T.ink, background: "transparent" }} className="text-xl w-full focus:outline-none" />
              <div style={{ color: T.sub }} className="text-[10px] uppercase tracking-wider">of {state.health.stepsGoal} goal</div>
            </Card>
          </div>

          <div style={{ ...GLASS() }} className="rounded-3xl p-6 mb-6 flex items-center gap-6">
            <ProgressRing pct={(state.health.steps || 0) / (state.health.stepsGoal || 1)} size={110} stroke={8}>
              <span style={{ color: T.ink, fontWeight: 200 }} className="text-lg">{state.health.steps >= 1000 ? `${(state.health.steps/1000).toFixed(1)}k` : state.health.steps}</span>
              <span style={{ color: T.sub, fontWeight: 300 }} className="text-[8px] uppercase tracking-[0.18em]">Steps</span>
            </ProgressRing>
            <div className="flex-1">
              <div style={{ color: T.sub, fontWeight: 300 }} className="text-[10px] uppercase tracking-[0.2em] mb-2">Steps — Last 7 Days</div>
              <WeekBars color={T.emerald || "#34D399"} values={(() => {
                const out = [];
                for (let i = 6; i >= 0; i--) {
                  const d = new Date(); d.setDate(d.getDate() - i);
                  const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
                  const isToday = key === todayStr();
                  const entry = state.dailyLog.find((e) => e.date === key);
                  out.push({ label: ["S","M","T","W","T","F","S"][d.getDay()], value: isToday ? (state.health.steps || 0) : (entry && entry.steps) || 0 });
                }
                return out;
              })()} />
            </div>
          </div>

          {(state.health.appleWorkouts || []).length > 0 && (() => { const w = state.health.appleWorkouts[0]; return (
            <p style={{ color: T.sub }} className="text-xs mb-5">Last workout from Apple Health: {w.name}{w.minutes ? ` · ${w.minutes} min` : ""} · {w.date}</p>
          ); })()}

          <SectionLabel>Supplements</SectionLabel>
          <div className="flex flex-col gap-2 mb-3">
            {state.health.supplements.map((sp) => (
              <Card key={sp.id} className="flex items-center gap-3 py-2.5">
                <Checkbox checked={sp.taken} onClick={() => toggleSupp(sp.id)} />
                <span style={{ color: sp.taken ? T.sub : T.ink, textDecoration: sp.taken ? "line-through" : "none" }} className="text-sm flex-1">{sp.name}</span>
                <span style={{ color: T.sub }} className="text-xs uppercase tracking-wider">{sp.time}</span>
                <button onClick={() => setHealth((h) => ({ ...h, supplements: h.supplements.filter((x) => x.id !== sp.id) }))}><X size={12} color={T.sub} /></button>
              </Card>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            <input value={suppDraft.name} onChange={(e) => setSuppDraft({ ...suppDraft, name: e.target.value })} placeholder="Supplement name..." style={{ borderColor: T.line }} className="flex-1 min-w-[140px] border-b text-sm py-1 bg-transparent focus:outline-none" />
            <select value={suppDraft.time} onChange={(e) => setSuppDraft({ ...suppDraft, time: e.target.value })} style={{ borderColor: T.line, color: T.ink, background: "transparent" }} className="border-b text-sm py-1 focus:outline-none">
              <option>Morning</option><option>Afternoon</option><option>Night</option>
            </select>
            <button onClick={() => { if (!suppDraft.name.trim()) return; setHealth((h) => ({ ...h, supplements: [...h.supplements, { id: uid(), name: suppDraft.name.trim(), time: suppDraft.time, taken: false }] })); setSuppDraft({ name: "", time: "Morning" }); }} style={{ background: T.ink, color: T.paper }} className="px-3 rounded-sm text-xs uppercase tracking-widest">Add</button>
          </div>
        </div>
      )}

      {tab === "nutrition" && (
        <div>
          {(() => {
            const mins = ["Breakfast", "Lunch", "Dinner", "Snack"].map((c) => {
              const l = state.health.nutrition.recipes.filter((r) => r.category === c);
              return l.length ? { p: Math.min(...l.map((r) => Number(r.protein) || 0)), f: Math.min(...l.map((r) => Number(r.fiber) || 0)) } : null;
            });
            if (mins.some((m) => !m)) return null;
            const P = mins.reduce((a, m) => a + m.p, 0), F = mins.reduce((a, m) => a + m.f, 0);
            return (
              <div style={{ ...GLASS() }} className="rounded-3xl p-5 mb-4">
                <div style={{ color: T.ink }} className="text-sm font-medium mb-1">No counting needed</div>
                <p style={{ color: T.sub, fontWeight: 300 }} className="text-xs">Eat any one meal from each row below — breakfast, lunch, dinner, snack — and even the lowest combination comes to about {P}g protein and {F}g fiber. Every breakfast, lunch and dinner is built for 30g+ protein and 8g+ fiber. Tap a meal to see exactly what goes in it. Logging is optional.</p>
              </div>
            );
          })()}
          <div style={{ ...GLASS() }} className="rounded-3xl p-6 mb-6 flex items-center justify-around">
            <ProgressRing pct={proteinToday / (state.health.nutrition.proteinGoal || 1)} size={130} stroke={9}>
              <span style={{ color: T.ink, fontWeight: 200 }} className="text-2xl">{proteinToday}<span className="text-sm">g</span></span>
              <span style={{ color: T.sub, fontWeight: 300 }} className="text-[9px] uppercase tracking-[0.18em]">Protein / {state.health.nutrition.proteinGoal}g</span>
            </ProgressRing>
            <ProgressRing pct={fiberToday / (state.health.nutrition.fiberGoal || 1)} size={130} stroke={9}>
              <span style={{ color: T.ink, fontWeight: 200 }} className="text-2xl">{fiberToday}<span className="text-sm">g</span></span>
              <span style={{ color: T.sub, fontWeight: 300 }} className="text-[9px] uppercase tracking-[0.18em]">Fiber / {state.health.nutrition.fiberGoal}g</span>
            </ProgressRing>
          </div>

          <AntiInflGuide state={state} setState={setState} />
          <MealIdeasAndGrocery state={state} setState={setState} />

          <SectionLabel>What are you eating today?</SectionLabel>
          <p style={{ color: T.sub }} className="text-xs mb-3">Pick from your recipes — tap one to log it. Add new ones anytime, no need to redo anything else.</p>
          {["Breakfast", "Lunch", "Dinner", "Snack"].map((cat) => (
            recipesByCategory[cat] && recipesByCategory[cat].length > 0 && (
              <div key={cat} className="mb-5">
                <div style={{ color: T.brass }} className="text-[11px] uppercase tracking-widest mb-2">{cat}</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {recipesByCategory[cat].map((r) => (
                    <div key={r.id} style={{ borderColor: T.line, background: T.parchment }} className="rounded-sm border overflow-hidden">
                      <RecipePhotoSlot recipe={r} onChange={(img) => updateRecipeImage(r.id, img)} />
                      <div className="p-2">
                        <button onClick={() => setOpenRecipeId(r.id)} style={{ color: T.ink }} className="text-xs font-medium truncate block w-full text-left underline decoration-dotted underline-offset-2">{r.name}</button>
                        <div style={{ color: T.sub }} className="text-[10px] mb-1">{r.protein}g protein · {r.fiber}g fiber</div>
                        {r.af && (
                          <div className="mb-2">
                            <button onClick={() => setHealth((h) => ({ ...h, nutrition: { ...h.nutrition, recipes: h.nutrition.recipes.map((x) => x.id === r.id ? { ...x, af: ({ core: "fine", fine: "limit", limit: "core" })[x.af] || "core" } : x) } }))}
                              style={{ color: ({ core: "#34D399", fine: "#F5C26B", limit: "#FB7185" })[r.af], borderColor: ({ core: "#34D399", fine: "#F5C26B", limit: "#FB7185" })[r.af] }}
                              className="text-[9px] uppercase tracking-widest border rounded-full px-2 py-0.5">{({ core: "Anti-inflam ✓", fine: "Fine", limit: "Sometimes" })[r.af]}</button>
                            {r.afNote && <div style={{ color: T.sub, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }} className="text-[10px] mt-1 leading-snug">{r.afNote}</div>}
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <button onClick={() => setOpenRecipeId(r.id)} style={{ background: T.ink, color: T.paper }} className="text-[9px] uppercase tracking-widest px-2 py-1 rounded-sm">Recipe</button>
                          <button onClick={() => removeRecipe(r.id)}><X size={11} color={T.sub} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}

          {!showRecipeForm ? (
            <button onClick={() => setShowRecipeForm(true)} style={{ borderColor: T.ink, color: T.ink }} className="text-xs uppercase tracking-widest border rounded-full px-4 py-2 mb-6">+ Add a recipe</button>
          ) : (
            <Card className="mb-6">
              <SectionLabel>New recipe</SectionLabel>
              <div className="flex flex-col gap-3">
                <ImagePicker image={recipeDraft.image} onChange={(img) => setRecipeDraft({ ...recipeDraft, image: img })} label="Add photo" />
                <input value={recipeDraft.name} onChange={(e) => setRecipeDraft({ ...recipeDraft, name: e.target.value })} placeholder="Recipe name" style={{ borderColor: T.line }} className="border-b text-sm py-1 bg-transparent focus:outline-none" />
                <div className="flex gap-3 flex-wrap">
                  <select value={recipeDraft.category} onChange={(e) => setRecipeDraft({ ...recipeDraft, category: e.target.value })} style={{ borderColor: T.line, color: T.ink, background: "transparent" }} className="border-b text-sm py-1 focus:outline-none">
                    <option>Breakfast</option><option>Lunch</option><option>Dinner</option><option>Snack</option>
                  </select>
                  <input type="number" value={recipeDraft.fiber} onChange={(e) => setRecipeDraft({ ...recipeDraft, fiber: e.target.value })} placeholder="Fiber g" style={{ borderColor: T.line }} className="w-24 border-b text-sm py-1 bg-transparent focus:outline-none" />
                  <input type="number" value={recipeDraft.protein} onChange={(e) => setRecipeDraft({ ...recipeDraft, protein: e.target.value })} placeholder="Protein g" style={{ borderColor: T.line }} className="w-24 border-b text-sm py-1 bg-transparent focus:outline-none" />
                </div>
                <div className="flex gap-2">
                  <button onClick={addRecipe} style={{ background: T.ink, color: T.paper }} className="px-4 py-2 rounded-sm text-xs uppercase tracking-widest">Save recipe</button>
                  <button onClick={() => setShowRecipeForm(false)} style={{ color: T.sub }} className="text-xs uppercase tracking-widest">Cancel</button>
                </div>
              </div>
            </Card>
          )}

          <SectionLabel>Today's log</SectionLabel>
          <div className="flex flex-col gap-2 mb-2">
            {todayLog.map((l) => (
              <Card key={l.id} className="flex items-center justify-between">
                <span style={{ color: T.ink }} className="text-sm">{l.food}</span>
                <div className="flex items-center gap-3">
                  <span style={{ color: T.sub }} className="text-xs">{l.protein}g protein · {l.fiber || 0}g fiber</span>
                  <button onClick={() => removeFood(l.id)}><X size={12} color={T.sub} /></button>
                </div>
              </Card>
            ))}
            {todayLog.length === 0 && <span style={{ color: T.sub }} className="text-sm">Nothing logged yet today.</span>}
          </div>
        </div>
      )}

      {openRecipeId && (() => { const r = state.health.nutrition.recipes.find((x) => x.id === openRecipeId); return r ? <RecipeDetail key={r.id} recipe={r} onClose={() => setOpenRecipeId(null)} onSave={(patch) => saveRecipe(r.id, patch)} onLog={() => logRecipe(r)} /> : null; })()}

      {tab === "fitness" && (
        <div>
          <p style={{ color: T.sub }} className="text-xs mb-4">Organized by day, not weekday — check off each exercise as you go, then log the session.</p>
          <div className="flex gap-2 mb-4 flex-wrap">
            {days.map((d) => (
              <button key={d.id} onClick={() => setActiveDayId(d.id)}
                style={{ borderColor: (activeDay && activeDay.id === d.id) ? T.ink : T.line, color: (activeDay && activeDay.id === d.id) ? T.ink : T.sub }}
                className="text-[11px] uppercase tracking-widest border rounded-full px-3 py-1.5">{d.name}</button>
            ))}
          </div>
          {activeDay && (
            <div style={{ borderColor: T.line, background: T.parchment }} className="rounded-sm border overflow-hidden mb-4">
              <div style={{ borderColor: T.line }} className="flex items-center justify-between px-4 py-3 border-b">
                <span style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif", color: T.ink }} className="text-lg">{activeDay.name}</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => logSession(activeDay)} style={{ background: T.ink, color: T.paper }} className="text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-sm">Log session</button>
                  <button onClick={() => removeDay(activeDay.id)}><Trash2 size={13} color={T.sub} /></button>
                </div>
              </div>
              <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderColor: T.line, color: T.sub }} className="border-b text-[10px] uppercase tracking-wider">
                    <th className="text-left py-2 px-4 font-normal w-10"></th>
                    <th className="text-left py-2 px-2 font-normal">Exercise</th>
                    <th className="text-center py-2 px-2 font-normal w-16">Sets</th>
                    <th className="text-center py-2 px-2 font-normal w-20">Reps</th>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {activeDay.exercises.map((ex, i) => (
                    <tr key={ex.id} style={{ borderColor: T.line, background: i % 2 === 1 ? T.paper : "transparent" }} className="border-b">
                      <td className="py-2 px-4"><Checkbox checked={ex.done} onClick={() => toggleExercise(activeDay.id, ex.id)} /></td>
                      <td style={{ color: ex.done ? T.sub : T.ink, textDecoration: ex.done ? "line-through" : "none" }} className="py-2 px-2">{ex.name}</td>
                      <td style={{ color: T.ink }} className="py-2 px-2 text-center">{ex.sets}</td>
                      <td style={{ color: T.ink }} className="py-2 px-2 text-center">{ex.reps}</td>
                      <td className="py-2 px-2 text-center"><button onClick={() => removeExercise(activeDay.id, ex.id)}><X size={12} color={T.sub} /></button></td>
                    </tr>
                  ))}
                  {activeDay.exercises.length === 0 && (
                    <tr><td colSpan={5} style={{ color: T.sub }} className="py-3 px-4 text-sm">No exercises yet — add one below.</td></tr>
                  )}
                </tbody>
              </table>
              <div style={{ borderColor: T.line }} className="flex gap-2 flex-wrap p-3 border-t">
                <input value={(exerciseDrafts[activeDay.id] || {}).name || ""} onChange={(e) => setExerciseDrafts({ ...exerciseDrafts, [activeDay.id]: { ...(exerciseDrafts[activeDay.id] || {}), name: e.target.value } })}
                  placeholder="Exercise" style={{ borderColor: T.line }} className="flex-1 min-w-[120px] border-b text-sm py-1 bg-transparent focus:outline-none" />
                <input type="number" value={(exerciseDrafts[activeDay.id] || {}).sets || ""} onChange={(e) => setExerciseDrafts({ ...exerciseDrafts, [activeDay.id]: { ...(exerciseDrafts[activeDay.id] || {}), sets: e.target.value } })}
                  placeholder="Sets" style={{ borderColor: T.line }} className="w-16 border-b text-sm py-1 bg-transparent focus:outline-none" />
                <input value={(exerciseDrafts[activeDay.id] || {}).reps || ""} onChange={(e) => setExerciseDrafts({ ...exerciseDrafts, [activeDay.id]: { ...(exerciseDrafts[activeDay.id] || {}), reps: e.target.value } })}
                  placeholder="Reps" style={{ borderColor: T.line }} className="w-20 border-b text-sm py-1 bg-transparent focus:outline-none" />
                <button onClick={() => addExercise(activeDay.id)} style={{ background: T.ink, color: T.paper }} className="px-3 rounded-sm text-xs uppercase tracking-widest">Add</button>
              </div>
            </div>
          )}
          <div className="flex gap-2 mb-8">
            <input value={dayNameDraft} onChange={(e) => setDayNameDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addDay()}
              placeholder="Add a day — e.g. Calisthenics, Day 6..." style={{ borderColor: T.line }} className="flex-1 border-b text-sm py-1 bg-transparent focus:outline-none" />
            <button onClick={addDay}><Plus size={14} color={T.brass} /></button>
          </div>

          <SectionLabel>History</SectionLabel>
          <div className="flex flex-col gap-2">
            {state.health.workouts.history.map((w) => (
              <Card key={w.id} className="flex items-center justify-between">
                <div><div style={{ color: T.sub }} className="text-xs uppercase tracking-wider mb-1">{w.date}</div><div style={{ color: T.ink }} className="text-sm">{w.summary}</div></div>
                <button onClick={() => removeHistory(w.id)}><X size={12} color={T.sub} /></button>
              </Card>
            ))}
            {state.health.workouts.history.length === 0 && <span style={{ color: T.sub }} className="text-sm">No sessions logged yet.</span>}
          </div>
        </div>
      )}
    </div>
  );
}

/* --------------------------- SHOPPING & INVENTORY ---------------------------- */
function ShoppingView({ state, setState }) {
  const [tab, setTab] = useState("list");
  const [invCategory, setInvCategory] = useState("wardrobe");
  const shop = state.shopping;
  const setShop = (fn) => setState((s) => ({ ...s, shopping: fn(s.shopping) }));
  const [listDraft, setListDraft] = useState("");
  const [invDraft, setInvDraft] = useState({ name: "", replaceBy: "", link: "", image: null });

  const tabs = [{ key: "list", label: "Shopping List" }, { key: "inventory", label: "Inventory" }];
  const invCategories = [{ key: "wardrobe", label: "Wardrobe" }, { key: "skincare", label: "Skincare" }, { key: "tech", label: "Tech" }, { key: "apartment", label: "Apartment" }];
  const today = todayStr();
  const isSoon = (dateStr) => dateStr && dateStr <= today;

  return (
    <div className="max-w-2xl">
      <h1 style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif", color: T.ink }} className="text-3xl mb-1">Shopping &amp; Inventory</h1>
      <div className="flex flex-wrap gap-1 mb-8" style={{ borderBottom: `1px solid ${T.line}` }}>
        {tabs.map((t) => (<button key={t.key} onClick={() => setTab(t.key)} style={{ color: tab === t.key ? T.ink : T.sub, borderColor: tab === t.key ? T.brass : "transparent" }} className="text-xs uppercase tracking-widest px-3 py-2 border-b-2 -mb-px">{t.label}</button>))}
      </div>

      {tab === "list" && (
        <div>
          <p style={{ color: T.sub }} className="text-xs mb-4">Text list — shopping items from Brain Dump land here automatically.</p>
          <div className="flex flex-col gap-2 mb-4">
            {shop.list.map((item) => (
              <Card key={item.id} className="flex items-center gap-3 py-2.5">
                <Checkbox checked={item.bought} onClick={() => setShop((s) => ({ ...s, list: s.list.map((x) => x.id === item.id ? { ...x, bought: !x.bought } : x) }))} />
                <span style={{ color: item.bought ? T.sub : T.ink, textDecoration: item.bought ? "line-through" : "none" }} className="text-sm flex-1">{item.text}</span>
                {item.source === "brain dump" && <span style={{ color: T.brass }} className="text-[10px] uppercase tracking-widest">via Brain Dump</span>}
                <button onClick={() => setShop((s) => ({ ...s, list: s.list.filter((x) => x.id !== item.id) }))}><X size={12} color={T.sub} /></button>
              </Card>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={listDraft} onChange={(e) => setListDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && listDraft.trim()) { setShop((s) => ({ ...s, list: [{ id: uid(), text: listDraft.trim(), bought: false, source: "manual" }, ...s.list] })); setListDraft(""); } }}
              placeholder="Add to shopping list..." style={{ borderColor: T.line }} className="flex-1 border-b text-sm py-1 bg-transparent focus:outline-none" />
          </div>
        </div>
      )}

      {tab === "inventory" && (
        <div>
          <div className="flex gap-2 mb-4 flex-wrap">
            {invCategories.map((c) => (<button key={c.key} onClick={() => setInvCategory(c.key)} style={{ borderColor: invCategory === c.key ? T.ink : T.line, color: invCategory === c.key ? T.ink : T.sub }} className="text-[11px] uppercase tracking-widest border rounded-full px-3 py-1.5">{c.label}</button>))}
          </div>
          <div className="flex flex-col gap-2 mb-4">
            {shop.inventory[invCategory].map((item) => (
              <Card key={item.id} className="flex items-center gap-3">
                {item.image ? <img src={item.image} alt="" className="w-12 h-12 object-cover rounded-sm shrink-0" style={{ borderColor: T.line }} /> : <div style={{ borderColor: T.line, color: T.sub }} className="w-12 h-12 rounded-sm border border-dashed flex items-center justify-center shrink-0"><ImageIcon size={14} color={T.sub} /></div>}
                <div className="flex-1 min-w-0">
                  <div style={{ color: T.ink }} className="text-sm truncate">{item.name}</div>
                  {item.link && <a href={item.link} target="_blank" rel="noreferrer" style={{ color: T.brass }} className="text-xs underline truncate block">{item.link}</a>}
                </div>
                {item.replaceBy && <span style={{ color: isSoon(item.replaceBy) ? PILLARS.life.color : T.sub }} className="text-[11px] uppercase tracking-wider shrink-0">{isSoon(item.replaceBy) ? "Replace now" : `By ${item.replaceBy}`}</span>}
                <button onClick={() => setShop((s) => ({ ...s, inventory: { ...s.inventory, [invCategory]: s.inventory[invCategory].filter((x) => x.id !== item.id) } }))}><Trash2 size={12} color={T.sub} /></button>
              </Card>
            ))}
          </div>
          <Card>
            <SectionLabel>Add to {invCategories.find((c) => c.key === invCategory).label}</SectionLabel>
            <div className="flex flex-col gap-3">
              <ImagePicker image={invDraft.image} onChange={(img) => setInvDraft({ ...invDraft, image: img })} />
              <input value={invDraft.name} onChange={(e) => setInvDraft({ ...invDraft, name: e.target.value })} placeholder="Item name" style={{ borderColor: T.line }} className="border-b text-sm py-1 bg-transparent focus:outline-none" />
              <input value={invDraft.link} onChange={(e) => setInvDraft({ ...invDraft, link: e.target.value })} placeholder="Link (optional)" style={{ borderColor: T.line }} className="border-b text-sm py-1 bg-transparent focus:outline-none" />
              <div className="flex items-center gap-2">
                <span style={{ color: T.sub }} className="text-xs">Replace by</span>
                <input type="date" value={invDraft.replaceBy} onChange={(e) => setInvDraft({ ...invDraft, replaceBy: e.target.value })} style={{ borderColor: T.line, color: T.ink, background: "transparent" }} className="border-b text-sm py-1 focus:outline-none" />
              </div>
              <button onClick={() => { if (!invDraft.name.trim()) return; setShop((s) => ({ ...s, inventory: { ...s.inventory, [invCategory]: [...s.inventory[invCategory], { id: uid(), ...invDraft, name: invDraft.name.trim() }] } })); setInvDraft({ name: "", replaceBy: "", link: "", image: null }); }}
                style={{ background: T.ink, color: T.paper }} className="self-start px-3 rounded-sm text-xs uppercase tracking-widest">Add item</button>
            </div>
          </Card>
        </div>
      )}

    </div>
  );
}

/* ---------------------------- JOURNAL ----------------------------- */
function JournalView({ state, setState }) {
  const [viewingDate, setViewingDate] = useState(todayStr());
  const entryForDate = (date) => state.journal.find((j) => j.date === date);
  const [draft, setDraft] = useState(() => (entryForDate(viewingDate) || {}).text || "");
  const [saved, setSaved] = useState(false);

  const switchDate = (date) => {
    setViewingDate(date);
    setDraft((entryForDate(date) || {}).text || "");
  };

  const save = () => {
    setState((s) => {
      const exists = s.journal.some((j) => j.date === viewingDate);
      const journal = exists
        ? s.journal.map((j) => j.date === viewingDate ? { ...j, text: draft } : j)
        : [{ id: uid(), date: viewingDate, text: draft }, ...s.journal];
      return { ...s, journal };
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const pastEntries = state.journal.filter((j) => j.date !== viewingDate).sort((a, b) => b.date.localeCompare(a.date));
  const isToday = viewingDate === todayStr();

  return (
    <div className="max-w-xl">
      <h1 style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif", color: T.ink }} className="text-3xl mb-1">Journal</h1>
      <div className="flex items-center gap-3 mb-6">
        <input type="date" value={viewingDate} max={todayStr()} onChange={(e) => switchDate(e.target.value)}
          style={{ borderColor: T.line, color: T.ink, background: "transparent" }} className="border-b text-sm py-1 focus:outline-none" />
        {!isToday && <button onClick={() => switchDate(todayStr())} style={{ color: T.brass }} className="text-xs uppercase tracking-widest">Back to today</button>}
      </div>
      <Card className="mb-8">
        <SectionLabel>{isToday ? "Today's Entry" : new Date(viewingDate).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}</SectionLabel>
        <textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={8} placeholder="What happened today. What you noticed. What you're carrying."
          style={{ color: T.ink, fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif" }} className="w-full bg-transparent text-lg focus:outline-none resize-none" />
        <div className="flex justify-end"><button onClick={save} style={{ background: T.ink, color: T.paper }} className="text-xs uppercase tracking-widest px-4 py-2 rounded-sm mt-2 levi-glow-btn">{saved ? "Saved" : "Save entry"}</button></div>
      </Card>
      {pastEntries.length > 0 && (
        <>
          <SectionLabel>Past Entries</SectionLabel>
          <div className="flex flex-col gap-2">
            {pastEntries.map((j) => (
              <button key={j.id} onClick={() => switchDate(j.date)} className="text-left w-full">
                <Card className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div style={{ color: T.sub }} className="text-xs uppercase tracking-wider mb-1">{new Date(j.date).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}</div>
                    <div style={{ color: T.ink }} className="text-sm truncate">{j.text || "—"}</div>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); setState((s) => ({ ...s, journal: s.journal.filter((x) => x.id !== j.id) })); }}><X size={12} color={T.sub} /></button>
                </Card>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* -------------------------- CUSTOM SECTIONS -------------------------- */
function CustomSectionsView({ state, setState }) {
  const [titleDraft, setTitleDraft] = useState("");
  const [typeDraft, setTypeDraft] = useState("notes");
  const add = () => {
    if (!titleDraft.trim()) return;
    setState((s) => ({ ...s, customSections: [...s.customSections, { id: uid(), title: titleDraft.trim(), type: typeDraft, content: "", items: [] }] }));
    setTitleDraft("");
  };
  const remove = (id) => setState((s) => ({ ...s, customSections: s.customSections.filter((c) => c.id !== id) }));
  return (
    <div className="max-w-xl">
      <h1 style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif", color: T.ink }} className="text-3xl mb-1">Add a Section</h1>
      <Card className="mb-8">
        <div className="flex flex-col gap-3">
          <input value={titleDraft} onChange={(e) => setTitleDraft(e.target.value)} placeholder="Section name — e.g. Travel Log, Gratitude, Poems..." style={{ borderColor: T.line, color: T.ink }} className="border-b text-sm py-1 bg-transparent focus:outline-none" />
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => setTypeDraft("notes")} style={{ borderColor: typeDraft === "notes" ? T.ink : T.line, color: typeDraft === "notes" ? T.ink : T.sub }} className="text-[11px] uppercase tracking-widest border rounded-full px-3 py-1.5">Free-write notes</button>
            <button onClick={() => setTypeDraft("checklist")} style={{ borderColor: typeDraft === "checklist" ? T.ink : T.line, color: typeDraft === "checklist" ? T.ink : T.sub }} className="text-[11px] uppercase tracking-widest border rounded-full px-3 py-1.5">Checklist</button>
            <button onClick={() => setTypeDraft("both")} style={{ borderColor: typeDraft === "both" ? T.ink : T.line, color: typeDraft === "both" ? T.ink : T.sub }} className="text-[11px] uppercase tracking-widest border rounded-full px-3 py-1.5">Notes + Checklist</button>
          </div>
          <button onClick={add} style={{ background: T.ink, color: T.paper }} className="self-start px-4 py-2 rounded-sm text-xs uppercase tracking-widest">Create section</button>
        </div>
      </Card>
      {state.customSections.length > 0 && (
        <>
          <SectionLabel>Your custom sections</SectionLabel>
          <div className="flex flex-col gap-2">
            {state.customSections.map((c) => (
              <Card key={c.id} className="flex items-center justify-between">
                <span style={{ color: T.ink }} className="text-sm">{c.title}</span>
                <div className="flex items-center gap-3">
                  <span style={{ color: T.sub }} className="text-xs uppercase tracking-wider">{c.type === "notes" ? "Notes" : c.type === "checklist" ? "Checklist" : "Notes + Checklist"}</span>
                  <button onClick={() => remove(c.id)}><Trash2 size={12} color={T.sub} /></button>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
function CustomSectionView({ section, setState }) {
  const update = (fn) => setState((s) => ({ ...s, customSections: s.customSections.map((c) => c.id === section.id ? fn(c) : c) }));
  const [itemDraft, setItemDraft] = useState("");
  return (
    <div className="max-w-xl">
      <h1 style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif", color: T.ink }} className="text-3xl mb-6">{section.title}</h1>
      {section.type === "notes" ? (
        <Card>
          <textarea value={section.content} onChange={(e) => update((c) => ({ ...c, content: e.target.value }))} rows={12}
            style={{ color: T.ink }} className="w-full bg-transparent text-sm focus:outline-none resize-y" placeholder="Write freely..." />
        </Card>
      ) : section.type === "both" ? (
        <div>
          <Card className="mb-6">
            <textarea value={section.content} onChange={(e) => update((c) => ({ ...c, content: e.target.value }))} rows={6}
              style={{ color: T.ink }} className="w-full bg-transparent text-sm focus:outline-none resize-y" placeholder="Write freely..." />
          </Card>
          <div className="flex flex-col gap-2 mb-4">
            {section.items.map((it) => (
              <Card key={it.id} className="flex items-center gap-3">
                <Checkbox checked={it.done} onClick={() => update((c) => ({ ...c, items: c.items.map((x) => x.id === it.id ? { ...x, done: !x.done } : x) }))} />
                <span style={{ color: it.done ? T.sub : T.ink, textDecoration: it.done ? "line-through" : "none" }} className="text-sm flex-1">{it.text}</span>
                <button onClick={() => update((c) => ({ ...c, items: c.items.filter((x) => x.id !== it.id) }))}><X size={12} color={T.sub} /></button>
              </Card>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={itemDraft} onChange={(e) => setItemDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && itemDraft.trim()) { update((c) => ({ ...c, items: [...c.items, { id: uid(), text: itemDraft.trim(), done: false }] })); setItemDraft(""); } }}
              placeholder="Add checklist item..." style={{ borderColor: T.line }} className="flex-1 border-b text-sm py-1 bg-transparent focus:outline-none" />
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col gap-2 mb-4">
            {section.items.map((it) => (
              <Card key={it.id} className="flex items-center gap-3">
                <Checkbox checked={it.done} onClick={() => update((c) => ({ ...c, items: c.items.map((x) => x.id === it.id ? { ...x, done: !x.done } : x) }))} />
                <span style={{ color: it.done ? T.sub : T.ink, textDecoration: it.done ? "line-through" : "none" }} className="text-sm flex-1">{it.text}</span>
                <button onClick={() => update((c) => ({ ...c, items: c.items.filter((x) => x.id !== it.id) }))}><X size={12} color={T.sub} /></button>
              </Card>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={itemDraft} onChange={(e) => setItemDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && itemDraft.trim()) { update((c) => ({ ...c, items: [...c.items, { id: uid(), text: itemDraft.trim(), done: false }] })); setItemDraft(""); } }}
              placeholder="Add item..." style={{ borderColor: T.line }} className="flex-1 border-b text-sm py-1 bg-transparent focus:outline-none" />
          </div>
        </div>
      )}
    </div>
  );
}

/* ----------------------------- ARCHIVE ----------------------------- */
function ArchiveView({ state }) {
  const rows = [
    { label: "Journal entries", count: state.journal.length },
    { label: "Brain dump items", count: state.brainDump.length },
    { label: "Skills tracked", count: state.skills.length },
    { label: "Days logged", count: state.dailyLog.length },
    { label: "Best streak", count: state.streaks.best },
  ];
  const recentDays = state.dailyLog.slice(0, 14);
  return (
    <div className="max-w-xl">
      <h1 style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif", color: T.ink }} className="text-3xl mb-1">Archive</h1>
      <div className="flex flex-col gap-3 mb-8">
        {rows.map((r) => (<Card key={r.label} className="flex items-center justify-between"><span style={{ color: T.ink }} className="text-sm">{r.label}</span><span style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif", color: T.brass }} className="text-xl">{r.count}</span></Card>))}
      </div>
      {recentDays.length > 0 && (
        <>
          <SectionLabel>Last {recentDays.length} days — consistency, not perfection</SectionLabel>
          <div className="flex gap-1.5 flex-wrap">
            {recentDays.slice().reverse().map((d) => {
              const pct = d.scorecardTotal ? d.scorecardDone / d.scorecardTotal : 0;
              return <div key={d.date} title={`${d.date}: ${d.scorecardDone}/${d.scorecardTotal}`} style={{ background: pct >= 0.6 ? T.olive : pct > 0 ? T.brassSoft : T.line }} className="w-5 h-5 rounded-sm" />;
            })}
          </div>
        </>
      )}
    </div>
  );
}

/* ----------------------------- SETTINGS ----------------------------- */
const THEME_PRESETS = {
  "HUD Black (default)": DEFAULT_THEME,
  "Plum & Olive (warm)": { ink: "#241820", paper: "#EDEAE0", parchment: "#F7F4EC", line: "#DAD3C0", brass: "#7C4B63", brassSoft: "#B98CA0", olive: "#6E7346", sub: "#786F6B", bgImage: null },
  "Ink & Cream (light)": { ink: "#1C1B19", paper: "#F4EFE6", parchment: "#FBF8F2", line: "#DED5C2", brass: "#A9834F", brassSoft: "#C8AD82", olive: "#55684F", sub: "#7A7568", bgImage: null },
};



function ConflictScreen({ sync }) {
  const c = sync.conflict;
  const fmt = (t) => (t ? new Date(t).toLocaleString() : "unknown");
  return (
    <div style={{ background: T.paper, minHeight: "100vh" }} className="w-full flex items-center justify-center p-6">
      <div style={{ ...GLASS(0.6), maxWidth: 420 }} className="w-full rounded-3xl p-7">
        <div style={{ color: T.ink, fontWeight: 300 }} className="text-2xl mb-2">Two copies found</div>
        <p style={{ color: T.sub }} className="text-sm mb-4">Your cloud database already has Levi OS data, and this device has its own. Pick the one to keep — the other gets replaced.</p>
        <div style={{ borderColor: T.line }} className="border rounded-2xl p-3 mb-3">
          <div style={{ color: T.ink }} className="text-sm">Cloud copy</div>
          <div style={{ color: T.sub }} className="text-xs mb-2">last saved {fmt(c.cloudAt)}</div>
          <button onClick={sync.useCloudCopy} style={{ background: T.ink, color: T.paper }} className="text-[10px] uppercase tracking-widest px-4 py-2 rounded-full">Keep the cloud copy</button>
        </div>
        <div style={{ borderColor: T.line }} className="border rounded-2xl p-3 mb-3">
          <div style={{ color: T.ink }} className="text-sm">This device</div>
          <div style={{ color: T.sub }} className="text-xs mb-2">last saved {fmt(c.localAt)}</div>
          <button onClick={sync.useThisDevice} style={{ background: T.ink, color: T.paper }} className="text-[10px] uppercase tracking-widest px-4 py-2 rounded-full">Keep this device</button>
        </div>
        <p style={{ color: T.sub }} className="text-[10px]">Not sure? Choose either one, then open Settings → Backup File on another device first. Nothing is deleted until you choose.</p>
      </div>
    </div>
  );
}

function LoginScreen({ auth }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const go = async () => {
    if (!email.trim() || !pw) return;
    setBusy(true); setErr("");
    const r = await auth.signIn(email.trim(), pw);
    if (r.error) setErr(r.error);
    setBusy(false);
  };
  return (
    <div style={{ background: T.paper, minHeight: "100vh" }} className="w-full flex items-center justify-center p-6">
      <div style={{ ...GLASS(0.6), maxWidth: 380 }} className="w-full rounded-3xl p-7">
        <div style={{ color: T.ink, fontWeight: 300, letterSpacing: "-0.01em" }} className="text-3xl mb-1">Levi OS</div>
        <div style={{ color: T.sub, fontWeight: 300 }} className="text-xs uppercase tracking-[0.2em] mb-6">Sign in</div>
        <input type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" style={{ borderColor: T.line, color: T.ink }} className="w-full border-b bg-transparent text-sm py-2 mb-4 focus:outline-none" />
        <input type="password" autoComplete="current-password" value={pw} onChange={(e) => setPw(e.target.value)} onKeyDown={(e) => e.key === "Enter" && go()} placeholder="Password" style={{ borderColor: T.line, color: T.ink }} className="w-full border-b bg-transparent text-sm py-2 mb-5 focus:outline-none" />
        {err && <p style={{ color: "#FB7185" }} className="text-xs mb-3">{err}</p>}
        <button onClick={go} disabled={busy} style={{ background: HOLO(), color: T.paper, opacity: busy ? 0.6 : 1 }} className="w-full text-xs uppercase tracking-widest py-3 rounded-full">{busy ? "Signing in…" : "Sign in"}</button>
        <p style={{ color: T.sub }} className="text-[10px] mt-4">Your data stays on this device until you sign in, then syncs with your private database.</p>
      </div>
    </div>
  );
}

function SettingsView({ state, setState, sync, auth }) {
  const [key, setKey] = useState(() => getApiKey());
  const [saved, setSaved] = useState(false);
  const [importMsg, setImportMsg] = useState("");
  const [codeInput, setCodeInput] = useState(sync.syncCode);
  const importRef = useRef(null);
  const theme = state.theme;
  const setTheme = (fn) => setState((s) => ({ ...s, theme: fn(s.theme) }));

  const saveKey = () => {
    try {
      if (key.trim()) localStorage.setItem(API_KEY_STORAGE, key.trim()); else localStorage.removeItem(API_KEY_STORAGE);
      setSaved(true); setTimeout(() => setSaved(false), 2000);
    } catch (e) { console.error("Levi OS: could not save API key", e); }
  };

  const applyPreset = (name) => setTheme(() => ({ ...THEME_PRESETS[name] }));

  return (
    <div className="max-w-xl">
      <h1 style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif", color: T.ink }} className="text-3xl mb-1">Settings</h1>
      <p style={{ color: T.sub }} className="text-sm mb-8">Everything here lives only on this device, except sync below.</p>

      <Card className="mb-4">
        <SectionLabel>Anthropic API Key</SectionLabel>
        <p style={{ color: T.sub }} className="text-xs mb-3">
          Optional. Add a key from console.anthropic.com to turn on real AI sorting in Brain Dump, the Education
          AI Study Assistant, and the general AI Assistant. Without a key, Brain Dump still sorts with simple
          built-in rules, and the assistants will let you know a key is needed. Your key is stored only in this
          browser's local storage and is sent directly from your browser to Anthropic — never anywhere else.
        </p>
        <input type="password" value={key} onChange={(e) => setKey(e.target.value)} placeholder="sk-ant-..."
          style={{ borderColor: T.line, color: T.ink }} className="w-full border-b text-sm py-2 bg-transparent focus:outline-none mb-3" />
        <button onClick={saveKey} style={{ background: T.ink, color: T.paper }} className="text-xs uppercase tracking-widest px-4 py-2 rounded-sm levi-glow-btn">{saved ? "Saved" : "Save key"}</button>
      </Card>

      <Card className="mb-4">
        <SectionLabel>Theme</SectionLabel>
        <div className="flex gap-2 mb-4 flex-wrap">
          {Object.keys(THEME_PRESETS).map((name) => (
            <button key={name} onClick={() => applyPreset(name)} style={{ borderColor: T.ink, color: T.ink }} className="text-[11px] uppercase tracking-widest border rounded-full px-3 py-1.5">{name}</button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {[["ink", "Text / Ink"], ["paper", "Background"], ["parchment", "Card surface"], ["brass", "Accent"], ["olive", "Secondary accent"], ["sub", "Muted text"]].map(([key2, label]) => (
            <div key={key2} className="flex items-center gap-3">
              <input type="color" value={theme[key2]} onChange={(e) => setTheme((t) => ({ ...t, [key2]: e.target.value }))} className="w-9 h-9 rounded-sm border-0 cursor-pointer" style={{ background: "transparent" }} />
              <span style={{ color: T.ink }} className="text-xs">{label}</span>
            </div>
          ))}
        </div>
        <SectionLabel>Background Photo</SectionLabel>
        <p style={{ color: T.sub }} className="text-xs mb-3">Give the whole app a personal backdrop — it sits behind everything at low opacity so text stays readable.</p>
        <ImagePicker image={theme.bgImage} onChange={(img) => setTheme((t) => ({ ...t, bgImage: img }))} label="Choose photo" size={90} />
      </Card>

      {auth && auth.configured && (
        <Card className="mb-4" style={{ borderColor: sync.status === "synced" ? `${T.olive}66` : T.line }}>
          <SectionLabel>Your Account</SectionLabel>
          <p style={{ color: T.ink }} className="text-sm mb-1">Signed in as {auth.session && auth.session.user && auth.session.user.email}</p>
          <p style={{ color: sync.status === "error" ? "#FB7185" : T.sub }} className="text-xs mb-3">
            {sync.status === "synced" ? "Synced — your phone, iPad and computer show the same thing." : sync.status === "syncing" ? "Syncing…" : sync.status === "error" ? (sync.lastError || "Sync problem — will retry.") : "Waiting to sync…"}
          </p>
          <div className="flex gap-3 items-center">
            <button onClick={sync.syncNow} style={{ background: T.ink, color: T.paper }} className="text-xs uppercase tracking-widest px-4 py-2 rounded-sm">Sync now</button>
            <button onClick={auth.signOut} style={{ color: T.sub }} className="text-xs uppercase tracking-widest">Sign out</button>
          </div>
        </Card>
      )}

      {!(auth && auth.configured) && (<Card className="mb-4" style={{ borderColor: sync.status === "synced" ? `${T.olive}66` : T.line }}>
        <SectionLabel>Sync Across Your Devices</SectionLabel>
        {!sync.syncCode ? (
          <>
            <p style={{ color: T.sub }} className="text-xs mb-3">
              Turn this on once, then enter the same code on your phone, computer, and iPad — everything you do
              on one shows up on the others within about 20 seconds. This runs on a free, unauthenticated
              storage service (kvdb.io), not a private database: anyone with your exact code could read or
              change your data, so treat the code like a password and don't share it. If you'd rather not use a
              third-party service at all, skip this and use Download/Restore backup below instead.
            </p>
            <button onClick={() => sync.generateNewCode()} style={{ background: T.ink, color: T.paper }} className="text-xs uppercase tracking-widest px-4 py-2 rounded-sm levi-glow-btn mb-3">Generate my sync code</button>
            <div className="flex gap-2 items-center">
              <input value={codeInput} onChange={(e) => setCodeInput(e.target.value)} placeholder="...or paste a code from another device" style={{ borderColor: T.line, color: T.ink }} className="flex-1 border-b text-sm py-1.5 bg-transparent focus:outline-none" />
              <button onClick={() => codeInput.trim() && sync.enableWithCode(codeInput.trim())} style={{ borderColor: T.ink, color: T.ink }} className="text-xs uppercase tracking-widest border rounded-sm px-3 py-1.5">Connect</button>
            </div>
          </>
        ) : (
          <>
            <p style={{ color: T.sub }} className="text-xs mb-2">Your sync code — enter this exact code on your other devices:</p>
            <div style={{ borderColor: T.line, background: T.paper, color: T.brass, fontFamily: "'JetBrains Mono', monospace" }} className="border rounded-sm px-3 py-2 text-sm mb-3 select-all">{sync.syncCode}</div>
            <div className="flex items-center gap-2 mb-3">
              <span style={{
                background: sync.status === "synced" ? T.olive : sync.status === "error" ? "#FF6B9D" : T.brass,
                boxShadow: sync.status === "synced" ? `0 0 6px ${T.olive}` : "none",
              }} className="w-2 h-2 rounded-full" />
              <span style={{ color: T.sub }} className="text-xs">
                {sync.status === "synced" ? "Connected and synced" : sync.status === "error" ? (sync.lastError || "Couldn't reach the sync service") + " — will keep retrying" : "Syncing…"}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={sync.syncNow} style={{ borderColor: T.brass, color: T.ink }} className="text-xs uppercase tracking-widest border rounded-full px-4 py-1.5">Sync now</button>
              <button onClick={sync.disable} style={{ color: T.sub }} className="text-xs uppercase tracking-widest">Turn off sync on this device</button>
            </div>
          </>
        )}
      </Card>)}

      <Card className="mb-4">
        <SectionLabel>Backup File</SectionLabel>
        <p style={{ color: T.sub }} className="text-xs mb-3">
          A manual, no-account safety net — works even without sync turned on. Good for keeping an offline copy,
          or moving data to a device once instead of continuously.
        </p>
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => exportBackup(state)} style={{ background: T.ink, color: T.paper }} className="text-xs uppercase tracking-widest px-4 py-2 rounded-sm levi-glow-btn">Download backup</button>
          <button onClick={() => importRef.current && importRef.current.click()} style={{ borderColor: T.ink, color: T.ink }} className="text-xs uppercase tracking-widest px-4 py-2 rounded-sm border">Restore from backup</button>
        </div>
        {importMsg && <p style={{ color: T.brass }} className="text-xs mt-2">{importMsg}</p>}
        <input ref={importRef} type="file" accept="application/json" className="hidden" onChange={async (e) => {
          const file = e.target.files && e.target.files[0];
          if (!file) return;
          try { await importBackup(file, setState); setImportMsg("Restored — this device now matches that backup file."); }
          catch (err) { setImportMsg("Couldn't read that file — make sure it's a Levi OS backup JSON."); }
          e.target.value = "";
        }} />
        <p style={{ color: T.sub }} className="text-xs mt-2">Restoring replaces everything currently on this device with what's in the file.</p>
      </Card>

      <Card>
        <SectionLabel>Your Data</SectionLabel>
        <p style={{ color: T.sub }} className="text-xs">
          Everything you enter is saved only in this browser's local storage on this device. Clearing your
          browser data or switching browsers/devices will not carry it over. The app also knows today's date —
          your daily tasks, routines, supplements, and evening scorecard reset automatically each day, and each
          day's results are archived so your streaks and consistency stay accurate.
        </p>
      </Card>
    </div>
  );
}

/* ------------------------------- APP -------------------------------- */
function WeekBars({ values, color, height = 56 }) {
  const max = Math.max(1, ...values.map((v) => v.value));
  return (
    <div className="flex items-end gap-1.5" style={{ height }}>
      {values.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div style={{
            height: Math.max(3, (v.value / max) * (height - 16)),
            background: v.value > 0 ? `linear-gradient(180deg, ${color}, ${T.brass})` : T.line,
            boxShadow: v.value > 0 ? `0 0 6px ${color}44` : "none",
            width: "100%",
          }} className="rounded-full" />
          <span style={{ color: T.sub, fontWeight: 300 }} className="text-[8px]">{v.label}</span>
        </div>
      ))}
    </div>
  );
}

const FOCUS_CATEGORIES = ["Deep Work", "Study", "Work", "Create"];
function FocusTimerView({ state, setState }) {
  const [, forceTick] = useState(0);
  const timer = state.focusTimer;
  const today = todayStr();

  useEffect(() => {
    if (!timer) return;
    const iv = setInterval(() => forceTick((n) => n + 1), 1000);
    return () => clearInterval(iv);
  }, [timer]);

  const remainingMs = timer ? Math.max(0, timer.endsAt - Date.now()) : 0;
  const remainingMin = Math.floor(remainingMs / 60000);
  const remainingSec = Math.floor((remainingMs % 60000) / 1000);
  const pct = timer ? 1 - remainingMs / (timer.durationMin * 60000) : 0;

  const [durationMin, setDurationMin] = useState(90);
  const [category, setCategory] = useState("Deep Work");

  const logSession = (minutes, cat) => setState((s) => ({
    ...s,
    focusSessions: [{ id: uid(), date: today, minutes: Math.max(1, Math.round(minutes)), category: cat }, ...s.focusSessions].slice(0, 500),
    focusTimer: null,
    gems: (s.gems || 0) + (minutes >= 25 ? 2 : 0),
  }));

  const start = () => setState((s) => ({ ...s, focusTimer: { startedAt: Date.now(), endsAt: Date.now() + durationMin * 60000, durationMin, category } }));
  const stop = () => {
    if (!timer) return;
    const elapsedMin = (Date.now() - timer.startedAt) / 60000;
    if (elapsedMin >= 1) logSession(elapsedMin, timer.category);
    else setState((s) => ({ ...s, focusTimer: null }));
  };

  // auto-complete when it hits zero
  useEffect(() => {
    if (timer && remainingMs === 0) logSession(timer.durationMin, timer.category);
  }, [timer, remainingMs === 0]);

  const todaySessions = state.focusSessions.filter((f) => f.date === today);
  const todayTotalMin = todaySessions.reduce((sum, f) => sum + f.minutes, 0);
  const fmtTotal = todayTotalMin >= 60 ? `${Math.floor(todayTotalMin / 60)}h ${todayTotalMin % 60}m` : `${todayTotalMin}m`;

  const last7 = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const mins = state.focusSessions.filter((f) => f.date === key).reduce((sum, f) => sum + f.minutes, 0);
    last7.push({ label: ["S","M","T","W","T","F","S"][d.getDay()], value: mins });
  }

  return (
    <div className="max-w-md mx-auto">
      <div style={{ color: T.ink, fontWeight: 300 }} className="text-2xl text-center mb-8">Focus Session</div>

      <div className="flex justify-center mb-6">
        <ProgressRing pct={timer ? pct : 0} size={230} stroke={10}>
          <span style={{ color: T.ink, fontWeight: 200, fontVariantNumeric: "tabular-nums" }} className="text-5xl">
            {timer ? `${remainingMin}:${String(remainingSec).padStart(2, "0")}` : `${durationMin}:00`}
          </span>
          <span style={{ color: T.sub, fontWeight: 300 }} className="text-[10px] uppercase tracking-[0.25em] mt-1">{timer ? timer.category : category}</span>
        </ProgressRing>
      </div>

      {!timer && (
        <>
          <div className="flex justify-center gap-2 mb-4">
            {[25, 45, 60, 90].map((m) => (
              <button key={m} onClick={() => setDurationMin(m)}
                style={{ borderColor: durationMin === m ? T.brass : T.line, color: durationMin === m ? T.ink : T.sub, boxShadow: durationMin === m ? `0 0 8px ${T.brass}44` : "none" }}
                className="border rounded-full px-4 py-1.5 text-xs">{m}m</button>
            ))}
          </div>
          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            {FOCUS_CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCategory(c)}
                style={{ background: category === c ? T.brass : "transparent", borderColor: category === c ? T.brass : T.line, color: category === c ? T.paper : T.sub }}
                className="border rounded-full px-4 py-1.5 text-xs">{c}</button>
            ))}
          </div>
        </>
      )}

      <div className="flex justify-center mb-10">
        {timer ? (
          <button onClick={stop} style={{ borderColor: T.brass, color: T.ink, boxShadow: `0 0 16px ${T.brass}44` }} className="border rounded-full px-10 py-3 text-sm uppercase tracking-[0.2em]">End Session</button>
        ) : (
          <button onClick={start} style={{ background: HOLO(), color: T.paper, boxShadow: `0 0 20px ${T.brass}66` }} className="rounded-full px-12 py-3 text-sm uppercase tracking-[0.2em]">Start</button>
        )}
      </div>

      <div style={{ ...GLASS() }} className="rounded-3xl p-5">
        <div style={{ color: T.sub, fontWeight: 300 }} className="text-[10px] uppercase tracking-[0.2em] mb-3">Sessions Today</div>
        <div className="flex items-baseline justify-between mb-4">
          <div><span style={{ color: T.ink, fontWeight: 200 }} className="text-3xl">{todaySessions.length}</span><span style={{ color: T.sub, fontWeight: 300 }} className="text-xs ml-2">Completed</span></div>
          <div><span style={{ color: T.ink, fontWeight: 200 }} className="text-3xl">{fmtTotal}</span><span style={{ color: T.sub, fontWeight: 300 }} className="text-xs ml-2">Total Focus</span></div>
        </div>
        <WeekBars values={last7} color={T.brass} />
      </div>
    </div>
  );
}

const NAV = [
  { key: "today", label: "Today", icon: Sun },
  { key: "timer", label: "Focus Timer", icon: TimerIcon },
  { key: "identity", label: "Identity", icon: Compass },
  { key: "planning", label: "Planning", icon: Target },
  { key: "dailyos", label: "Operating System", icon: CalendarDays },
  { key: "calendar", label: "Calendar", icon: CalendarDays },
  { key: "braindump", label: "Brain Dump", icon: Brain },
  { key: "education", label: "Education", icon: GraduationCap },
  { key: "skills", label: "Skill Tree", icon: TrendingUp },
  { key: "archeor", label: "ARCHEOR", icon: Sparkles },
  { key: "health", label: "Health", icon: Dumbbell },
  { key: "shopping", label: "Shopping & Inventory", icon: ShoppingBag },
  { key: "journal", label: "Journal", icon: Feather },
  { key: "weekly", label: "Weekly Review", icon: ListChecks },
  { key: "archive", label: "Archive", icon: ArchiveIcon },
  { key: "addsection", label: "Add a Section", icon: FolderPlus },
  { key: "settings", label: "Settings", icon: SettingsIcon },
];

function SplashScreen({ leaving, onDismiss }) {
  const hour = new Date().getHours();
  const greeting = hour < 5 ? "Still up, Levi" : hour < 12 ? "Good morning, Levi" : hour < 18 ? "Good afternoon, Levi" : hour < 22 ? "Good evening, Levi" : "Good night, Levi";
  const dateStr = new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
  return (
    <div
      onClick={onDismiss}
      style={{
        background: `radial-gradient(circle at 50% 38%, ${T.brass}22, ${T.paper} 62%)`,
        opacity: leaving ? 0 : 1,
        transition: "opacity 0.45s ease",
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center cursor-pointer overflow-hidden"
    >
      <style>{`
        @keyframes leviSplashRing { from { transform: scale(0.6); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes leviSplashText { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes leviScan { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
        .levi-splash-ring { animation: leviSplashRing 0.9s cubic-bezier(.2,.8,.2,1) both; }
        .levi-splash-line1 { animation: leviSplashText 0.6s ease 0.5s both; }
        .levi-splash-line2 { animation: leviSplashText 0.6s ease 0.75s both; }
        .levi-splash-line3 { animation: leviSplashText 0.6s ease 1s both; }
        .levi-scanline { animation: leviScan 3.2s linear infinite; }
      `}</style>

      <div className="levi-scanline absolute left-0 right-0 h-24 pointer-events-none" style={{ background: `linear-gradient(${T.brass}00, ${T.brass}0d, ${T.brass}00)` }} />

      <svg width="86" height="86" viewBox="0 0 40 40" fill="none" className="levi-splash-ring mb-6">
        <circle cx="20" cy="20" r="17" stroke={T.line} strokeWidth="1" />
        <circle className="levi-orbit" cx="20" cy="20" r="12.5" stroke={T.brass} strokeWidth="1.2" strokeDasharray="4 10" fill="none" />
        <circle className="levi-orbit-core" cx="20" cy="20" r="4.5" fill={T.brass} style={{ filter: `drop-shadow(0 0 10px ${T.brass})` }} />
      </svg>

      <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif", color: T.ink, letterSpacing: "0.02em" }} className="levi-splash-line1 text-3xl mb-2 text-center px-6">
        {greeting}
      </div>
      <div style={{ color: T.sub }} className="levi-splash-line2 text-sm uppercase tracking-widest">{dateStr}</div>
    </div>
  );
}

function MoreLauncher({ state, go }) {
  const [q, setQ] = useState("");
  const items = [
    ...NAV.filter((n) => n.key !== "today"),
    ...state.customSections.map((c) => ({ key: c.id, label: c.title, icon: FolderPlus })),
  ].filter((n) => n.label.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="max-w-2xl mx-auto">
      <div style={{ color: T.ink, fontWeight: 300 }} className="text-3xl mb-4">Levi OS</div>
      <div style={{ ...GLASS(0.55) }} className="flex items-center gap-2 rounded-2xl px-4 py-3 mb-6">
        <Search size={15} color={T.sub} />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search Levi OS"
          style={{ color: T.ink, fontWeight: 300 }} className="flex-1 bg-transparent text-sm focus:outline-none" />
      </div>
      <div className="grid grid-cols-4 gap-3">
        {items.map((n) => {
          const NIcon = n.icon;
          return (
            <button key={n.key} onClick={() => go(n.key)} style={{ background: `${T.parchment}B3`, border: `1px solid ${T.line}`, backdropFilter: "blur(16px)" }} className="rounded-2xl py-4 px-1 flex flex-col items-center gap-2">
              <NIcon size={19} color={T.brass} strokeWidth={1.5} style={{ filter: `drop-shadow(0 0 5px ${T.brass}55)` }} />
              <span style={{ color: T.ink, fontWeight: 300 }} className="text-[10px] text-center leading-tight">{n.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RewardsSheet({ state, onClose }) {
  return (
    <div onClick={onClose} style={{ background: "#000000CC", backdropFilter: "blur(6px)" }} className="fixed inset-0 z-40 flex items-end sm:items-center justify-center">
      <div onClick={(e) => e.stopPropagation()} style={{ background: T.parchment, border: `1px solid ${T.line}` }} className="rounded-t-3xl sm:rounded-3xl w-full sm:max-w-sm p-7 pb-10">
        <div className="flex flex-col items-center mb-6">
          <GemIcon size={54} />
          <div style={{ color: T.ink, fontWeight: 200 }} className="text-5xl mt-3">{state.gems || 0}</div>
          <div style={{ color: T.sub, fontWeight: 300 }} className="text-[10px] uppercase tracking-[0.25em] mt-1">Gems Earned</div>
        </div>
        <div className="flex flex-col gap-3">
          {[["Complete a Big Three priority", "+1"], ["Finish all three in a day", "+5"], ["Hit 6 bottles of water", "+2"], ["Full evening scorecard", "+3"]].map(([label, amt]) => (
            <div key={label} className="flex items-center justify-between">
              <span style={{ color: T.ink, fontWeight: 300 }} className="text-sm">{label}</span>
              <span style={{ color: T.brass, fontWeight: 400 }} className="text-sm">{amt}</span>
            </div>
          ))}
        </div>
        <div style={{ borderColor: T.line }} className="border-t mt-5 pt-4 flex items-center justify-between">
          <span style={{ color: T.sub, fontWeight: 300 }} className="text-xs">Current streak</span>
          <span style={{ color: T.ink, fontWeight: 300 }} className="text-sm">{state.streaks.current} days</span>
        </div>
      </div>
    </div>
  );
}

// Page background: solid theme color, with optional user photo underlay.
function theme_bg(theme) {
  if (theme && theme.bgImage) {
    return `linear-gradient(${T.paper}E6, ${T.paper}F2), url(${theme.bgImage}) center/cover fixed`;
  }
  return T.paper;
}

// Fixed background layer. iOS Safari ignores background-attachment: fixed,
// so a real <img> in a fixed-position div is the reliable way to show a
// user photo. Without a photo, drifting aurora blobs give the glass panels
// something to blur — glassmorphism is invisible over flat black.
function AmbientBackground({ theme }) {
  const wrap = { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none", background: T.paper };
  const fill = { position: "absolute", top: 0, left: 0, width: "100%", height: "100%" };
  return (
    <div style={wrap}>
      {theme && theme.bgImage ? (
        <>
          <img src={theme.bgImage} alt="" style={{ ...fill, objectFit: "cover" }} />
          <div style={{ ...fill, background: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.75))` }} />
        </>
      ) : (
        <>
          <div className="levi-aurora levi-aurora-a" style={{ background: `radial-gradient(circle, ${T.brass}30, transparent 60%)` }} />
          <div className="levi-aurora levi-aurora-b" style={{ background: `radial-gradient(circle, ${T.olive}22, transparent 60%)` }} />
          <div className="levi-aurora levi-aurora-c" style={{ background: `radial-gradient(circle, ${T.emerald || "#34D399"}1c, transparent 60%)` }} />
        </>
      )}
    </div>
  );
}

export default function LeviOS() {
  const [state, setState, loaded, updatedAtRef, saveError, revRef] = useLeviStorage();
  const [view, setView] = useState("today");
  const [showRewards, setShowRewards] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [splashLeaving, setSplashLeaving] = useState(false);
  useReminderPolling(state, setState);
  const auth = useCloudAuth();
  const sync = useCloudSync(state, setState, updatedAtRef, revRef, auth);

  Object.assign(T, state.theme);

  useEffect(() => {
    const t1 = setTimeout(() => setSplashLeaving(true), 2200);
    const t2 = setTimeout(() => setShowSplash(false), 2650);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  const dismissSplash = () => { setSplashLeaving(true); setTimeout(() => setShowSplash(false), 350); };

  if (!loaded) {
    return <div style={{ background: T.paper, color: T.sub }} className="w-full h-screen flex items-center justify-center text-sm">Loading Levi OS…</div>;
  }
  if (showSplash) {
    return <SplashScreen leaving={splashLeaving} onDismiss={dismissSplash} />;
  }
  if (auth.configured && !auth.session) {
    Object.assign(T, state.theme);
    return <LoginScreen auth={auth} />;
  }
  if (sync.conflict) {
    Object.assign(T, state.theme);
    return <ConflictScreen sync={sync} />;
  }

  const customSection = state.customSections.find((c) => c.id === view);
  const go = (key) => { setView(key); window.scrollTo(0, 0); };

  const views = {
    today: <TodayView state={state} setState={setState} go={go} />,
    timer: <FocusTimerView state={state} setState={setState} />,
    identity: <IdentityView state={state} setState={setState} />,
    planning: <PlanningView state={state} setState={setState} />,
    dailyos: <DailyOSView state={state} setState={setState} />,
    calendar: <CalendarView state={state} setState={setState} />,
    braindump: <BrainDumpView state={state} setState={setState} />,
    education: <EducationView state={state} setState={setState} />,
    skills: <SkillTreeView state={state} setState={setState} />,
    archeor: <ArcheorView state={state} setState={setState} />,
    health: <HealthView state={state} setState={setState} />,
    shopping: <ShoppingView state={state} setState={setState} />,
    journal: <JournalView state={state} setState={setState} />,
    weekly: <WeeklyReviewView state={state} setState={setState} />,
    archive: <ArchiveView state={state} />,
    addsection: <CustomSectionsView state={state} setState={setState} />,
    settings: <SettingsView state={state} setState={setState} sync={sync} auth={auth} />,
    more: <MoreLauncher state={state} go={go} />,
  };

  const activeContent = customSection ? <CustomSectionView section={customSection} setState={setState} /> : views[view];

  const tabs = [
    { key: "today", label: "Home", icon: Sun },
    { key: "calendar", label: "Calendar", icon: CalendarDays },
    { key: "__gem__", label: "", icon: null },
    { key: "health", label: "Health", icon: Dumbbell },
    { key: "more", label: "More", icon: LayoutGrid },
  ];

  return (
    <div
      style={{ minHeight: "100vh", width: "100%", background: "transparent" }}
      className="w-full"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');
        html, body { margin:0; padding:0; width:100%; max-width:100vw; overflow-x:hidden; background:${T.paper}; }
        #root { width:100%; max-width:100vw; overflow-x:hidden; }
        * { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif; box-sizing: border-box; -webkit-font-smoothing: antialiased; }
        ::selection { background: ${T.brassSoft}; color: ${T.paper}; }
        input[type="color"] { -webkit-appearance:none; appearance:none; padding:0; }
        input[type="color"]::-webkit-color-swatch-wrapper { padding:0; }
        input[type="color"]::-webkit-color-swatch { border:1px solid ${T.line}; border-radius:3px; }

        .levi-card { transition: box-shadow 0.25s ease, border-color 0.25s ease; }
        .levi-card:hover { border-color: ${T.brass}40; box-shadow: 0 0 0 1px ${T.brass}18; }

        @keyframes leviFadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .levi-view-enter { animation: leviFadeIn 0.35s ease both; }

        @keyframes leviSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes leviPulse { 0%,100% { opacity: 0.55; } 50% { opacity: 1; } }
        .levi-orbit { animation: leviSpin 14s linear infinite; transform-origin: center; }
        .levi-orbit-core { animation: leviPulse 2.6s ease-in-out infinite; }

        .levi-glow-btn { transition: box-shadow 0.2s ease, transform 0.15s ease; }
        .levi-glow-btn:hover { box-shadow: 0 0 14px ${T.brass}40; transform: translateY(-1px); }

        .levi-aurora { position: absolute; width: 70vmax; height: 70vmax; border-radius: 50%; filter: blur(30px); }
        @keyframes auroraA { 0%,100% { transform: translate(-20%, -25%) scale(1); } 50% { transform: translate(-5%, -12%) scale(1.15); } }
        @keyframes auroraB { 0%,100% { transform: translate(55%, 45%) scale(1.1); } 50% { transform: translate(40%, 60%) scale(0.95); } }
        @keyframes auroraC { 0%,100% { transform: translate(10%, 70%) scale(0.9); } 50% { transform: translate(25%, 50%) scale(1.1); } }
        .levi-aurora-a { top: 0; left: 0; animation: auroraA 26s ease-in-out infinite; }
        .levi-aurora-b { top: 0; right: 0; animation: auroraB 32s ease-in-out infinite; }
        .levi-aurora-c { bottom: 0; left: 0; animation: auroraC 38s ease-in-out infinite; }

        /* --- reward feedback --- */
        @keyframes leviPop { 0% { transform: scale(1); } 40% { transform: scale(1.35); } 100% { transform: scale(1); } }
        .levi-pop { animation: leviPop 0.34s cubic-bezier(.34,1.56,.64,1); }

        @keyframes leviRipple { 0% { transform: scale(0.6); opacity: 0.85; } 100% { transform: scale(3.2); opacity: 0; } }
        .levi-ripple { position:absolute; inset:0; border-radius:999px; pointer-events:none; animation: leviRipple 0.6s ease-out forwards; }

        @keyframes leviFloatUp { 0% { transform: translateY(0) scale(0.8); opacity: 0; } 20% { opacity: 1; transform: translateY(-6px) scale(1); } 100% { transform: translateY(-34px) scale(1); opacity: 0; } }
        .levi-floater { position:absolute; right:0; top:-4px; pointer-events:none; animation: leviFloatUp 1.1s ease-out forwards; white-space:nowrap; }

        @keyframes leviRowFlash { 0% { background: rgba(185,140,255,0.00); } 25% { background: rgba(185,140,255,0.18); } 100% { background: rgba(185,140,255,0.00); } }
        .levi-row-flash { animation: leviRowFlash 0.7s ease-out; }

        /* --- staggered entrance --- */
        @keyframes leviRise { from { opacity:0; transform: translateY(14px); } to { opacity:1; transform: translateY(0); } }
        .levi-rise { animation: leviRise 0.5s cubic-bezier(.22,1,.36,1) both; }

        /* --- shimmer on progress --- */
        @keyframes leviShimmer { 0% { background-position: -180% 0; } 100% { background-position: 280% 0; } }
        .levi-shimmer::after {
          content:""; position:absolute; inset:0; border-radius:999px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent);
          background-size: 60% 100%; background-repeat: no-repeat;
          animation: leviShimmer 2.8s ease-in-out infinite;
        }

        /* --- celebration --- */
        @keyframes leviSpark { 0% { transform: translate(0,0) scale(0); opacity:1; } 100% { transform: translate(var(--dx), var(--dy)) scale(1); opacity:0; } }
        .levi-spark { position:absolute; width:7px; height:7px; border-radius:999px; animation: leviSpark 0.95s ease-out forwards; }

        @keyframes leviBadgeIn { 0% { transform: scale(0.4); opacity:0; } 55% { transform: scale(1.12); opacity:1; } 100% { transform: scale(1); opacity:1; } }
        .levi-badge-in { animation: leviBadgeIn 0.5s cubic-bezier(.34,1.56,.64,1) both; }

        @keyframes leviGlowPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(185,140,255,0.0); } 50% { box-shadow: 0 0 22px 2px rgba(185,140,255,0.35); } }
        .levi-alive { animation: leviGlowPulse 3.2s ease-in-out infinite; }
      `}</style>

      <AmbientBackground theme={state.theme} />

      {saveError && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "#B91C1C", color: "#FFF" }} className="text-xs text-center px-4 py-2">
          {saveError}
        </div>
      )}

      {/* content */}
      <div key={view} className="levi-view-enter relative z-10 px-5 md:px-10 pt-10 pb-32 overflow-x-hidden">
        {activeContent}
      </div>

      {/* rewards sheet */}
      {showRewards && <RewardsSheet state={state} onClose={() => setShowRewards(false)} />}

      {/* bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 z-30 flex justify-center pointer-events-none">
        <div style={{ ...GLASS(0.62) }}
          className="pointer-events-auto flex items-center gap-1 rounded-full px-3 py-2 mb-4 mx-4 shadow-2xl">
          {tabs.map((t) => {
            if (t.key === "__gem__") {
              return (
                <button key="gem" onClick={() => setShowRewards(true)}
                  style={{ background: `radial-gradient(circle, ${T.brass}33, transparent 70%)` }}
                  className="w-14 h-14 -my-4 rounded-full flex items-center justify-center">
                  <GemIcon size={30} />
                </button>
              );
            }
            const TIcon = t.icon;
            const active = view === t.key || (t.key === "more" && (customSection || !["today","calendar","health"].includes(view)));
            return (
              <button key={t.key} onClick={() => go(t.key)} className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-full min-w-[54px]">
                <TIcon size={19} color={active ? T.brass : T.sub} strokeWidth={1.5}
                  style={active ? { filter: `drop-shadow(0 0 6px ${T.brass})` } : undefined} />
                <span style={{ color: active ? T.ink : T.sub, fontWeight: 300 }} className="text-[9px]">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<LeviOS />);
