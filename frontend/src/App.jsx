import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { toggleTheme } from "./features/theme/themeSlice";
import { logout } from "./features/auth/authSlice";
import FootBall from "./pages/FootBall";
import AuthPage from "./pages/AuthPage";
import AlphabetQuiz from "./pages/AlphabetQuiz";
import SquareQuiz from "./pages/SquareQuiz";
import StateCapitalQuiz from "./pages/StateCapitalQuiz";
import WorldCapitalQuiz from "./pages/WorldCapitalQuiz";
import CubeQuiz from "./pages/CubeQuiz";
import PeriodicTableQuiz from "./pages/PeriodicTableQuiz";
import MultiplicationQuiz from "./pages/MultiplicationQuiz";
import ReverseAlphabetQuiz from "./pages/ReverseAlphabetQuiz";
import PrimeQuiz from "./pages/PrimeQuiz";
import RomanQuiz from "./pages/RomanQuiz";
import CountryCurrencyQuiz from "./pages/CountryCurrencyQuiz";
import ElementSymbolQuiz from "./pages/ElementSymbolQuiz";
import OneWordSubstitutionQuiz from "./pages/OneWordSubstitutionQuiz";
import IndianPresidentQuiz from "./pages/IndianPresidentQuiz";
import IndianVicePresidentQuiz from "./pages/IndianVicePresidentQuiz";
import NationalOfficialsQuiz from "./pages/NationalOfficialsQuiz";
import StateOfficialsQuiz from "./pages/StateOfficialsQuiz";
import DiseaseCauseQuiz from "./pages/DiseaseCauseQuiz";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Leaderboard from "./pages/Leaderboard";
import {
  MODE_LABELS,
  getLeaderboard,
  getTimeAgo,
} from "./utils/leaderboard";

const GAME_MODES = [
  {
    id: "nationalOfficials",
    path: "/national-officials",
    title: "National Officials",
    badge: "General Knowledge",
    category: "General Knowledge",
    hero: "GOV",
    intro: "Who currently holds this important national office?",
    rules: "<1s = 12pts · <2s = 8pts · <3s = 4pts · wrong = over",
    reference: "Current Indian constitutional and national officials.",
    accent: "#f59e0b",
    summary: "Who is the...",
    details: "Important office holders in India.",
  },
  {
    id: "stateOfficials",
    path: "/state-officials",
    title: "State Chief Ministers",
    badge: "General Knowledge",
    category: "General Knowledge",
    hero: "CM",
    intro: "Who is the current Chief Minister of this state?",
    rules: "<1s = 12pts · <2s = 8pts · <3s = 4pts · wrong = over",
    reference: "Current Chief Ministers of all 28 states.",
    accent: "#ef4444",
    summary: "Who is the Chief Minister of...",
    details: "Match the state to its current CM.",
  },
  {
    id: "diseaseCause",
    path: "/disease-cause",
    title: "Disease → Cause",
    badge: "Biology",
    category: "Biology",
    hero: "🦠",
    intro: "What causes this disease — virus, bacteria, fungus, or protozoa?",
    rules: "<1s = 12pts · <2s = 8pts · <3s = 4pts · wrong = over",
    reference: "50 important diseases and their causative organisms.",
    accent: "#10b981",
    summary: "What causes...",
    details: "Match diseases to their causative organisms.",
  },
  {
    id: "alphabet",
    path: "/alphabet",
    title: "Alphabet Quiz",
    badge: "Memory",
    category: "Memory & Logic",
    hero: "A→Z",
    intro: "Identify letter positions instantly.",
    rules: "<1s = 12pts · <2s = 8pts · <3s = 4pts · wrong = over",
    reference: "A·B·C·D·E·F·G·H·I·J·K·L·M·N·O·P·Q·R·S·T·U·V·W·X·Y·Z",
    accent: "#f0e040",
    summary: "What position is the letter?",
    details: "A fast recall drill built around alphabet position memory.",
  },
  {
    id: "square",
    path: "/square",
    title: "Square Quiz",
    badge: "Quant",
    category: "Mathematics",
    hero: "X²",
    intro: "Squares of numbers from 1 to 100.",
    rules: "<1.5s = 12pts · <3s = 8pts · <5s = 4pts · wrong = over",
    reference: "Practice squares of numbers from 1 to 100.",
    accent: "#40e0f0",
    summary: "What is the square of the number?",
    details: "A quick mental math mode with a cyan arcade accent.",
  },
  {
    id: "cube",
    path: "/cube",
    title: "Cube Quiz",
    badge: "Quant",
    category: "Mathematics",
    hero: "X³",
    intro: "Cubes of numbers from 1 to 30.",
    rules: "wrong = game over",
    reference: "Practice cubes of numbers from 1 to 30.",
    accent: "#a78bfa",
    summary: "What is the cube of the number?",
    details:
      "A challenging cube calculations mode with a purple arcade accent.",
  },
  {
    id: "stateCapital",
    path: "/state-capital",
    title: "State Capital Quiz",
    badge: "GK Memory",
    category: "General Knowledge",
    hero: "IND",
    intro: "Indian state capitals at exam speed.",
    rules: "<1s = 12pts · <2s = 8pts · <3s = 4pts · wrong = over",
    reference: "Covers the 28 Indian states only, not union territories.",
    accent: "#fb7185",
    summary: "Find the capital of the state. ",
    details: "A general knowledge memory test with a pink accent.",
  },
  {
    id: "worldCapital",
    path: "/world-capital",
    title: "World Capital Quiz",
    badge: "🌍 World GK",
    category: "General Knowledge",
    hero: "🌍",
    intro: "All 195 countries — test your world knowledge.",
    rules: "wrong = game over",
    reference: "All 195 countries — from Afghanistan to Zimbabwe.",
    accent: "#34d399",
    summary: "Name the capital of every country on Earth.",
    details: "A comprehensive world geography quiz with an emerald accent.",
  },
  {
    id: "periodicTable",
    path: "/periodic-table",
    title: "Element → (Atomic Number, Atomic Weight)",
    badge: "Chemistry",
    category: "Chemistry",
    hero: "Z|W",
    intro: "Match each element to its atomic number and atomic weight.",
    rules: "wrong = game over",
    reference: "Elements 1-118 with rounded atomic weights.",
    accent: "#f59e0b",
    summary: "Pick the correct atomic number and atomic weight.",
    details: "A chemistry recall drill — element to (Z, W) pairs.",
  },
  {
    id: "multiplication",
    path: "/multiplication",
    title: "Multiplication Quiz",
    badge: "Quant",
    category: "Mathematics",
    hero: "A×B",
    intro: "Times tables from 2 to 15 — speed counts.",
    rules: "<1s = 12pts · <2s = 8pts · <3s = 4pts · wrong = over",
    reference: "Products of two numbers between 2 and 15.",
    accent: "#22d3ee",
    summary: "What is the product?",
    details: "A fast times-table drill with a cyan accent.",
  },
  {
    id: "reverseAlphabet",
    path: "/reverse-alphabet",
    title: "Reverse Alphabet Quiz",
    badge: "Memory",
    category: "Memory & Logic",
    hero: "Z←A",
    intro: "Given a position, name the letter.",
    rules: "<1s = 12pts · <2s = 8pts · <3s = 4pts · wrong = over",
    reference: "A=1 · B=2 · … · Z=26",
    accent: "#e879f9",
    summary: "Which letter is at this position?",
    details: "The flip side of Alpha Quiz — position to letter recall.",
  },
  {
    id: "prime",
    path: "/prime",
    title: "Prime Number Quiz",
    badge: "Quant",
    category: "Mathematics",
    hero: "P#",
    intro: "Spot the prime among four numbers.",
    rules: "wrong = game over",
    reference: "Primes between 2 and 100.",
    accent: "#f97316",
    summary: "Pick the only prime number.",
    details: "A number theory challenge with an orange accent.",
  },
  {
    id: "roman",
    path: "/roman",
    title: "Roman Numerals Quiz",
    badge: "Classics",
    category: "Miscellaneous",
    hero: "IV",
    intro: "Convert Roman numerals to decimal values.",
    rules: "wrong = game over",
    reference: "Numbers 1–100 in standard Roman notation.",
    accent: "#84cc16",
    summary: "What is the value of the numeral?",
    details: "Decode numerals from I to C with a lime accent.",
  },
  {
    id: "countryCurrency",
    path: "/country-currency",
    title: "Country → Currency",
    badge: "🌍 World GK",
    category: "General Knowledge",
    hero: "💱",
    intro: "Match each country to its official currency.",
    rules: "wrong = game over",
    reference: "All 195 countries — from Afghanistan to Zimbabwe.",
    accent: "#2dd4bf",
    summary: "What currency does this country use?",
    details: "A world economics and geography quiz with a teal accent.",
  },
  {
    id: "elementSymbol",
    path: "/element-symbol",
    title: "Element Name → Element Symbol",
    badge: "Chemistry",
    category: "Chemistry",
    hero: "C·Fe",
    intro: "Match each element name to its chemical symbol.",
    rules: "wrong = game over",
    reference: "Elements 1-118 — from H to Og.",
    accent: "#eab308",
    summary: "What is the symbol for this element?",
    details: "Name to symbol recall — C, Fe, Au, and all 118 elements.",
  },
  {
    id: "oneWordSub",
    path: "/one-word-sub",
    title: "One Word Substitution",
    badge: "Vocabulary",
    category: "English",
    hero: "OWS",
    intro: "One word for the given phrase.",
    rules: "<1s = 12pts · <2s = 8pts · <3s = 4pts · wrong = over",
    reference: "100 common one-word substitutions.",
    accent: "#c084fc",
    summary: "Pick the one-word substitution for the phrase.",
    details: "A vocabulary quiz covering 100 common OWS entries.",
  },
  {
    id: "indianPresident",
    path: "/indian-president",
    title: "Indian Presidents",
    badge: "India GK",
    category: "General Knowledge",
    hero: "IND",
    intro: "Order → President name.",
    rules: "<1s = 12pts · <2s = 8pts · <3s = 4pts · wrong = over",
    reference: "1st to 15th President of India.",
    accent: "#f97316",
    summary: "Who was the Nth President of India?",
    details: "From Rajendra Prasad (1st) to Droupadi Murmu (15th).",
  },
  {
    id: "indianVicePresident",
    path: "/indian-vice-president",
    title: "Indian Vice Presidents",
    badge: "India GK",
    category: "General Knowledge",
    hero: "IVP",
    intro: "Order → Vice President name.",
    rules: "<1s = 12pts · <2s = 8pts · <3s = 4pts · wrong = over",
    reference: "1st to 14th Vice President of India.",
    accent: "#fb7185",
    summary: "Who was the Nth Vice President of India?",
    details: "From S. Radhakrishnan (1st) to Jagdeep Dhankhar (14th).",
  },
];

function ArcadeBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(64,224,240,0.07),_transparent_50%),radial-gradient(ellipse_at_bottom_right,_rgba(139,92,246,0.06),_transparent_50%),linear-gradient(180deg,_#080812,_#0a0a0f)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(64,224,240,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(64,224,240,0.02)_1px,transparent_1px)] bg-[size:48px_48px] opacity-60" />
    </div>
  );
}

const DIFF_TABS = [
  { key: "beginner", label: "Beginner", icon: "🌱" },
  { key: "intermediate", label: "Intermediate", icon: "⚡" },
  { key: "advanced", label: "Advanced", icon: "🔥" },
];

function AllGameLeaderboards() {
  const leaderboard = getLeaderboard();
  const [activeDiff, setActiveDiff] = useState("intermediate");

  return (
    <section className="mt-8 sm:mt-10">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#f0e040]/90">
            Leaderboards
          </p>
          <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
            Top 20 scores for every quiz
          </h2>
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Best per player
        </p>
      </div>

      {/* Difficulty tabs */}
      <div className="mb-5 flex gap-2">
        {DIFF_TABS.map((d) => (
          <button
            key={d.key}
            onClick={() => setActiveDiff(d.key)}
            className={`rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] transition ${
              activeDiff === d.key
                ? "border-[#f0e040]/60 bg-[#f0e040]/10 text-[#f0e040]"
                : "border-white/10 bg-white/5 text-slate-400 hover:bg-white/10"
            }`}
          >
            {d.icon} {d.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {GAME_MODES.map((game) => {
          const entries = leaderboard
            .filter((e) => e.mode === game.id && e.difficulty === activeDiff)
            .sort((a, b) => b.score - a.score)
            .slice(0, 20);

          return (
            <div
              key={game.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.18)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.25em]"
                    style={{ color: game.accent }}
                  >
                    {MODE_LABELS[game.id] || game.title}
                  </p>
                  <h3 className="mt-1 text-lg font-black text-white">
                    {game.title}
                  </h3>
                </div>
                <Link
                  to={game.path}
                  className="shrink-0 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300 transition hover:bg-white/10"
                >
                  Play
                </Link>
              </div>

              <div className="mt-3 max-h-72 overflow-y-auto space-y-1.5 pr-1">
                {entries.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-white/10 bg-black/10 px-3 py-4 text-center text-xs uppercase tracking-[0.18em] text-slate-500">
                    No scores yet
                  </div>
                ) : (
                  entries.map((entry, index) => (
                    <div
                      key={`${entry.name}-${entry.timestamp}-${index}`}
                      className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-3 py-2"
                    >
                      <span
                        className="w-6 text-center text-sm font-black"
                        style={{
                          color:
                            index === 0
                              ? "#ffd700"
                              : index === 1
                                ? "#c0c0c0"
                                : index === 2
                                  ? "#cd7f32"
                                  : game.accent,
                        }}
                      >
                        {index === 0
                          ? "🥇"
                          : index === 1
                            ? "🥈"
                            : index === 2
                              ? "🥉"
                              : index + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-bold text-white">
                          {entry.name}
                        </div>
                        <div className="truncate text-[10px] uppercase tracking-[0.16em] text-slate-500">
                          {entry.questions || "?"}Q ·{" "}
                          {getTimeAgo(entry.timestamp)}
                        </div>
                      </div>
                      <div
                        className="text-lg font-black"
                        style={{ color: game.accent }}
                      >
                        {entry.score}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const CATEGORIES = [
  { label: "All", icon: "🎯" },
  { label: "Mathematics", icon: "📐" },
  { label: "Biology", icon: "🧬" },
  { label: "Chemistry", icon: "⚗️" },
  { label: "General Knowledge", icon: "📚" },
  { label: "Memory & Logic", icon: "🧠" },
  { label: "English", icon: "✍️" },
  { label: "Miscellaneous", icon: "🎲" },
];

function getStudyStats() {
  try {
    const lb = JSON.parse(localStorage.getItem('arcade_leaderboard') || '[]');
    const today = new Date().toDateString();
    const todayCount = lb.filter(e => new Date(e.timestamp).toDateString() === today).length;
    return { totalGames: lb.length, todayGames: todayCount, quizCount: GAME_MODES.length };
  } catch {
    return { totalGames: 0, todayGames: 0, quizCount: GAME_MODES.length };
  }
}

function getPersonalBest(gameId) {
  try {
    const hs = JSON.parse(localStorage.getItem('arcade_high_scores') || '{}');
    for (const user of Object.values(hs)) {
      for (const key of Object.keys(user)) {
        if (key.startsWith(gameId + '__')) return user[key];
      }
    }
    return 0;
  } catch {
    return 0;
  }
}

function HomePage({ currentUser }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const stats = getStudyStats();

  const filteredGames = activeCategory === "All" 
    ? GAME_MODES 
    : GAME_MODES.filter(game => game.category === activeCategory);

  return (
    <main className="mx-auto max-w-7xl px-3 pb-12 pt-6 sm:px-6 sm:pb-16 sm:pt-8 lg:px-8">
      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr] xl:gap-10">
        <div className="space-y-6">
          {/* Hero */}
          <div className="animate-fade-in-up">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#40e0f0]/20 bg-[#40e0f0]/5 px-4 py-1.5 text-xs font-semibold tracking-[0.15em] text-[#40e0f0]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#40e0f0] shadow-[0_0_8px_rgba(64,224,240,0.8)]" />
              {GAME_MODES.length} quizzes available
            </div>
            <h1 className="max-w-xl text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl">
              Master Every
              <span className="bg-gradient-to-r from-[#40e0f0] to-[#a78bfa] bg-clip-text text-transparent"> Topic</span>
            </h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-slate-400 sm:text-lg">
              Practice daily. Track your progress. Ace your exams.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.label)}
                className={`rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all duration-200 ${
                  activeCategory === cat.label
                    ? "border-[#40e0f0]/40 bg-[#40e0f0]/10 text-[#40e0f0] shadow-[0_0_16px_rgba(64,224,240,0.08)]"
                    : "border-white/8 bg-white/3 text-slate-400 hover:border-white/15 hover:bg-white/6 hover:text-slate-200"
                }`}
              >
                <span className="mr-1.5">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Game Cards */}
          {filteredGames.length === 0 ? (
            <div className="animate-fade-in rounded-2xl border border-dashed border-white/10 bg-white/3 p-10 text-center">
              <div className="text-4xl mb-3">🚀</div>
              <p className="text-lg font-bold text-white mb-1">Coming Soon!</p>
              <p className="text-sm text-slate-400">We're adding {activeCategory} quizzes. Stay tuned.</p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {filteredGames.map((game, i) => {
                const best = getPersonalBest(game.id);
                return (
                  <Link
                    key={game.id}
                    to={game.path}
                    className={`card-hover group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-5 text-left animate-fade-in-up delay-${Math.min(i + 1, 8)}`}
                    style={{ animationDelay: `${0.05 * (i + 1)}s` }}
                  >
                    {/* Left accent bar */}
                    <div
                      className="absolute left-0 top-0 h-full w-1 rounded-l-2xl transition-all duration-300 group-hover:w-1.5"
                      style={{ background: `linear-gradient(180deg, ${game.accent}, ${game.accent}44)` }}
                    />
                    <div className="pl-3">
                      <div className="flex items-center justify-between">
                        <span
                          className="inline-flex rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em]"
                          style={{
                            color: game.accent,
                            background: `${game.accent}12`,
                          }}
                        >
                          {game.badge}
                        </span>
                        {best > 0 && (
                          <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500">
                            Best: <span className="text-white">{best}</span>
                          </span>
                        )}
                      </div>
                      <h2 className="mt-2.5 text-base font-extrabold tracking-tight text-white sm:text-lg">
                        {game.title}
                      </h2>
                      <p className="mt-1.5 text-xs leading-5 text-slate-500">
                        {game.summary}
                      </p>
                      <span
                        className="mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.2em] opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1"
                        style={{ color: game.accent }}
                      >
                        Play <span className="text-sm">→</span>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          {/* Study Stats */}
          <div className="glass rounded-2xl p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#40e0f0]/80">
              Study Dashboard
            </p>
            <h2 className="mt-2 text-xl font-extrabold text-white">
              {currentUser ? `Welcome, ${currentUser.name}` : 'Start Practicing'}
            </h2>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { label: "Today", value: stats.todayGames, accent: "#40e0f0" },
                { label: "Total", value: stats.totalGames, accent: "#a78bfa" },
                { label: "Quizzes", value: stats.quizCount, accent: "#f59e0b" },
              ].map(s => (
                <div key={s.label} className="rounded-xl border border-white/6 bg-white/3 p-3 text-center">
                  <div className="text-2xl font-black" style={{ color: s.accent }}>{s.value}</div>
                  <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Auth Card */}
          {currentUser ? (
            <div className="glass rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-lg">
                  ✅
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{currentUser.name}</p>
                  <p className="text-xs text-slate-500">Logged in · scores saved locally</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass rounded-2xl p-5">
              <p className="text-sm font-bold text-white">Track your progress</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Create an account to save scores and compete on the leaderboard.
              </p>
              <div className="mt-4 flex gap-2">
                <Link
                  to="/login"
                  className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="rounded-lg border border-[#40e0f0]/30 bg-[#40e0f0]/8 px-4 py-2 text-xs font-semibold text-[#40e0f0] transition hover:bg-[#40e0f0]/15"
                >
                  Sign up
                </Link>
              </div>
            </div>
          )}

          {/* Quick Tips */}
          <div className="glass rounded-2xl p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#f59e0b]/70">💡 Study Tip</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Play each quiz on <span className="font-bold text-white">Advanced (3s)</span> difficulty to simulate real exam pressure. Speed + accuracy wins!
            </p>
          </div>
        </aside>
      </section>
      <AllGameLeaderboards />
    </main>
  );
}

function ArcadeLayout() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    if (currentUser) {
      window.localStorage.setItem(
        "games-auth-user",
        JSON.stringify(currentUser),
      );
    } else {
      window.localStorage.removeItem("games-auth-user");
    }
  }, [currentUser]);

  if (location.pathname === "/football") {
    return <FootBall />;
  }

  return (
    <div className="min-h-screen overflow-x-hidden text-slate-100">
      <ArcadeBackground />
      <div className="relative z-10">
        <Navbar
          currentUser={currentUser}
          location={location}
          onToggleTheme={() => dispatch(toggleTheme())}
          onLogout={() => dispatch(logout())}
        />

        <Routes>
          <Route
            path="/"
            element={
              <HomePage currentUser={currentUser} />
            }
          />
          <Route path="/alphabet" element={<AlphabetQuiz />} />
          <Route path="/square" element={<SquareQuiz />} />
          <Route path="/cube" element={<CubeQuiz />} />
          <Route path="/state-capital" element={<StateCapitalQuiz />} />
          <Route path="/world-capital" element={<WorldCapitalQuiz />} />
          <Route path="/periodic-table" element={<PeriodicTableQuiz />} />
          <Route path="/multiplication" element={<MultiplicationQuiz />} />
          <Route path="/reverse-alphabet" element={<ReverseAlphabetQuiz />} />
          <Route path="/prime" element={<PrimeQuiz />} />
          <Route path="/roman" element={<RomanQuiz />} />
          <Route path="/country-currency" element={<CountryCurrencyQuiz />} />
          <Route path="/element-symbol" element={<ElementSymbolQuiz />} />
          <Route path="/one-word-sub" element={<OneWordSubstitutionQuiz />} />
          <Route path="/indian-president" element={<IndianPresidentQuiz />} />
          <Route path="/national-officials" element={<NationalOfficialsQuiz />} />
          <Route path="/state-officials" element={<StateOfficialsQuiz />} />
          <Route path="/disease-cause" element={<DiseaseCauseQuiz />} />

          <Route
            path="/indian-vice-president"
            element={<IndianVicePresidentQuiz />}
          />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route
            path="*"
            element={<HomePage currentUser={currentUser} />}
          />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/signup" element={<AuthPage mode="signup" />} />
        <Route path="/*" element={<ArcadeLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
