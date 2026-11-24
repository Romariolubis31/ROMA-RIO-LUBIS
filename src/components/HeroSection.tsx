import { useState } from 'react';
import { ArrowDownRight, FileText } from 'lucide-react';
import { PROFILE, type Language } from '../utils/portfolioData';

interface HeroSectionProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenCvModal: () => void;
  metrics: {
    totalProjects: number;
    totalSites: number;
    totalProvinces: number;
    yearSpan: string;
    certificationsCount: number;
  };
}

export function HeroSection({
  lang,
  onLanguageChange,
  onOpenCvModal,
  metrics,
}: HeroSectionProps) {
  const [imgError, setImgError] = useState(false);

  const kpis = [
    {
      value: `${metrics.totalProjects}`,
      label: lang === 'id' ? 'Proyek & Riset Lapangan' : 'Field & Research Projects',
      meta: `${metrics.yearSpan} · ${lang === 'id' ? 'Darat & Bawah Air' : 'Terrestrial & Maritime'}`,
    },
    {
      value: `${metrics.totalSites}`,
      label: lang === 'id' ? 'Situs & Kawasan Cagar Budaya' : 'Heritage Sites & Zones',
      meta: lang === 'id' ? 'Sumatera hingga Jawa Timur' : 'Sumatra to East Java',
    },
    {
      value: `${metrics.certificationsCount}`,
      label: lang === 'id' ? 'Sertifikasi & Pelatihan Teknis' : 'Technical Certifications',
      meta: lang === 'id' ? 'Selam A1/A2 · Pilot Drone · Logam' : 'Diving A1/A2 · UAV · Metalwork',
    },
    {
      value: '3D / GIS',
      label: lang === 'id' ? 'Alur Kerja Dokumentasi Digital' : 'Digital Documentation Pipeline',
      meta: 'Leica BLK360 · Metashape · QGIS',
    },
  ];

  return (
    <section id="profile" className="border-b border-slate-200 bg-[#F8FAFC]">
      <div className="mx-auto max-w-6xl px-6 pt-10 pb-12 lg:pt-14 lg:pb-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch">
          {/* Left Typographic Column */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs font-medium text-slate-600">
                  <span>{PROFILE.location}</span>
                  <span className="mx-2 text-slate-300" aria-hidden="true">
                    ·
                  </span>
                  <span>{PROFILE.role[lang]}</span>
                </p>

                {/* Language Segmented Control */}
                <div
                  role="group"
                  aria-label={lang === 'id' ? 'Pilihan bahasa' : 'Language selector'}
                  className="inline-flex items-center rounded-lg border border-slate-200 bg-white p-0.5"
                >
                  <button
                    type="button"
                    onClick={() => onLanguageChange('id')}
                    aria-pressed={lang === 'id'}
                    className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      lang === 'id'
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    ID
                  </button>
                  <button
                    type="button"
                    onClick={() => onLanguageChange('en')}
                    aria-pressed={lang === 'en'}
                    className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      lang === 'en'
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>

              <h1 className="mt-6 font-display text-[clamp(2.15rem,4vw,3.45rem)] font-bold leading-[1.08] tracking-tight text-slate-950 text-balance">
                {PROFILE.heroHeadline[lang]}
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600">
                {PROFILE.heroLead[lang]}
              </p>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-500">
                {PROFILE.aboutParagraph[lang]}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 whitespace-nowrap shrink-0"
              >
                <span>{lang === 'id' ? 'Jelajahi Portofolio Proyek' : 'Explore Project Archive'}</span>
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={onOpenCvModal}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-colors duration-150 hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <FileText className="h-4 w-4 text-slate-600" aria-hidden="true" />
                <span>{lang === 'id' ? 'Pratinjau & Unduh CV (PDF)' : 'View & Download CV (PDF)'}</span>
              </button>
            </div>
          </div>

          {/* Right Portrait Visual Anchor */}
          <div className="lg:col-span-5 flex">
            <figure className="relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 min-h-[360px] lg:min-h-full">
              {!imgError ? (
                <img
                  src={PROFILE.portraitPath}
                  alt={
                    lang === 'id'
                      ? 'Potret Romario Lubis, Arkeolog dan Spesialis Dokumentasi Digital'
                      : 'Portrait of Romario Lubis, Archaeologist and Digital Documentation Specialist'
                  }
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover object-[41%_12%] origin-[42%_18%] scale-[1.12] transition-transform duration-300"
                />
              ) : (
                <div className="flex h-full min-h-[360px] flex-col items-center justify-center bg-slate-900 p-8 text-center text-white">
                  <span className="font-display text-4xl font-bold tracking-tight">RL</span>
                  <span className="mt-2 text-sm text-slate-300">{PROFILE.name}</span>
                </div>
              )}

              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/55 to-transparent p-6 pt-16 text-white">
                <p className="font-display text-lg font-semibold tracking-tight">{PROFILE.name}</p>
                <p className="mt-1 text-xs text-slate-200">
                  <span>{lang === 'id' ? 'Magister Arkeologi UI (On Going)' : 'M.Hum. Candidate, Universitas Indonesia'}</span>
                  <span className="mx-2 text-slate-400" aria-hidden="true">
                    ·
                  </span>
                  <span>{lang === 'id' ? 'S.Hum. Cumlaude UNJA' : 'B.A. Cumlaude, Universitas Jambi'}</span>
                </p>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Full-Width 4-Column Quantitative Strip */}
        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="bg-white px-6 py-5">
              <div className="font-mono text-2xl font-semibold tracking-tight text-slate-950 tabular-nums">
                {kpi.value}
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-800">{kpi.label}</div>
              <div className="mt-1 text-xs text-slate-500">{kpi.meta}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
