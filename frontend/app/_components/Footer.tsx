'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950/30 py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>© {currentYear} Central IoT Platform. All rights reserved.</p>
        <div className="flex gap-6">
          <span className="hover:text-slate-400 transition-colors">Documentation</span>
          <span className="hover:text-slate-400 transition-colors">GitHub</span>
        </div>
      </div>
    </footer>
  );
}