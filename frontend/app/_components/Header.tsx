'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link 
          href="/" 
          className="text-xl font-bold tracking-wider text-teal-400 hover:opacity-80 transition-opacity"
        >
          ⚡ CENTRAL IoT PLATFORM
        </Link>
        
        <div className="flex items-center gap-4">
          <Link 
            href="/setup" 
            className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
              pathname === '/setup' 
                ? 'bg-teal-950/50 text-teal-300 border-teal-800' 
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
          >
            Setup Wizard
          </Link>
          <span className="text-xs bg-slate-800 px-3 py-1.5 rounded-full text-slate-400 border border-slate-700">
            LAN Mode
          </span>
        </div>
      </div>
    </header>
  );
}