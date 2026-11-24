import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { Language } from '../utils/portfolioData';

interface NavbarProps {
  lang: Language;
  onContactClick: () => void;
}

export function Navbar({ lang, onContactClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#profile', label: lang === 'id' ? 'Profil' : 'Profile' },
    { href: '#projects', label: lang === 'id' ? 'Proyek' : 'Projects' },
    { href: '#site-map', label: lang === 'id' ? 'Peta Situs' : 'Site Map' },
    { href: '#skills', label: lang === 'id' ? 'Keahlian' : 'Skills' },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-[#F8FAFC]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single-line Wordmark */}
        <a
          href="#top"
          className="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
        >
          Romario Lubis
        </a>

        {/* Zone 2: 4 Single-line Nav Links */}
        <nav
          aria-label={lang === 'id' ? 'Navigasi utama' : 'Primary navigation'}
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 py-1 text-slate-600 transition-colors duration-150 hover:text-slate-950 hover:underline hover:underline-offset-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onContactClick}
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 whitespace-nowrap shrink-0 cursor-pointer"
          >
            {lang === 'id' ? 'Hubungi Saya' : 'Contact Me'}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={
              mobileMenuOpen
                ? lang === 'id'
                  ? 'Tutup menu navigasi'
                  : 'Close navigation menu'
                : lang === 'id'
                  ? 'Buka menu navigasi'
                  : 'Open navigation menu'
            }
            className="inline-flex md:hidden items-center justify-center rounded-lg border border-slate-200 bg-white p-2.5 text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-2" aria-label={lang === 'id' ? 'Menu seluler' : 'Mobile menu'}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-950"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onContactClick();
              }}
              className="mt-2 w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 cursor-pointer"
            >
              {lang === 'id' ? 'Hubungi Saya' : 'Contact Me'}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
