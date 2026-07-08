export default function Footer() {
  return (
    <footer className="border-t border-white/6 bg-[#070d18] py-8">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 text-sm font-bold tracking-[0.15em] text-white/50">
          <span className="text-[#40e0f0]/70">STUDY</span>
          <span>arcade</span>
        </div>
        <p className="mt-2 text-xs tracking-[0.2em] text-slate-600">
          Practice makes permanent ✦ Built for exam warriors
        </p>
        <p className="mt-3 text-[10px] tracking-[0.15em] text-slate-700">
          © {new Date().getFullYear()} StudyArcade
        </p>
      </div>
    </footer>
  );
}
