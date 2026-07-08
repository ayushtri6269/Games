import { Link } from "react-router-dom";

export default function Navbar({
  currentUser,
  location,
  onToggleTheme,
  onLogout,
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/8 bg-[#0a0a0f]/80 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="group inline-flex items-center gap-2.5">
          <span className="flex h-9 items-center rounded-xl border border-[#40e0f0]/25 bg-[#40e0f0]/8 px-3 text-xs font-black tracking-[0.35em] text-[#40e0f0] shadow-[0_0_20px_rgba(64,224,240,0.1)] transition-all duration-300 group-hover:border-[#40e0f0]/50 group-hover:shadow-[0_0_28px_rgba(64,224,240,0.2)]">
            STUDY
          </span>
          <span className="text-sm font-bold tracking-[0.15em] text-white/70 transition group-hover:text-white">
            arcade
          </span>
        </Link>

        {/* Center nav */}
        <nav className="hidden items-center gap-1 sm:flex">
          <Link
            to="/"
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              location.pathname === "/"
                ? "bg-white/10 text-white"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            Home
          </Link>
          <Link
            to="/leaderboard"
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              location.pathname === "/leaderboard"
                ? "bg-white/10 text-white"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            Leaderboard
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {currentUser ? (
            <div className="hidden items-center gap-2.5 rounded-lg bg-white/5 px-3.5 py-2 text-sm text-slate-200 sm:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
              {currentUser.name}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="rounded-lg border border-[#40e0f0]/30 bg-[#40e0f0]/8 px-3.5 py-2 text-sm font-semibold text-[#40e0f0] transition hover:bg-[#40e0f0]/15"
              >
                Sign up
              </Link>
            </>
          )}
          <button
            onClick={onToggleTheme}
            className="rounded-lg p-2 text-lg transition hover:bg-white/5"
            title="Toggle theme"
          >
            ☀️
          </button>
          {currentUser && (
            <button
              onClick={onLogout}
              className="rounded-lg px-3 py-2 text-sm font-medium text-rose-300 transition hover:bg-rose-500/10"
            >
              Logout
            </button>
          )}

          {/* Mobile nav */}
          <div className="flex items-center gap-1 sm:hidden">
            <Link
              to="/"
              className={`rounded-lg p-2 text-xs font-semibold transition ${
                location.pathname === "/" ? "text-white" : "text-slate-400"
              }`}
            >
              Home
            </Link>
            <Link
              to="/leaderboard"
              className={`rounded-lg p-2 text-xs font-semibold transition ${
                location.pathname === "/leaderboard" ? "text-white" : "text-slate-400"
              }`}
            >
              🏆
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
