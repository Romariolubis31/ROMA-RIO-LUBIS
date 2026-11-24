import { useMemo, useState } from 'react';
import { ArrowUpRight, Compass, MapPin } from 'lucide-react';
import {
  HERITAGE_SITES,
  PROJECTS,
  getProjectsForSite,
  projectGeoToMap,
  type Language,
  type ProjectItem,
} from '../utils/portfolioData';

interface SiteAtlasSectionProps {
  lang: Language;
  onSelectProject: (project: ProjectItem) => void;
}

// Simplified authentic lat/lon coastlines for Sumatra, Bangka-Belitung, and Java
const SUMATRA_COORDS: Array<[number, number]> = [
  [5.55, 95.32],
  [5.20, 96.80],
  [4.15, 98.20],
  [3.35, 99.45],
  [2.10, 100.80],
  [1.15, 102.25],
  [0.50, 103.40],
  [-0.55, 104.25],
  [-1.25, 104.45],
  [-2.15, 104.95],
  [-3.20, 105.90],
  [-4.45, 105.85],
  [-5.75, 105.78],
  [-5.90, 104.60],
  [-5.15, 103.85],
  [-4.20, 102.60],
  [-3.75, 102.22],
  [-2.60, 101.08],
  [-1.30, 100.40],
  [-0.20, 99.85],
  [1.20, 98.75],
  [2.50, 97.60],
  [3.90, 96.45],
  [4.95, 95.38],
];

const BANGKA_COORDS: Array<[number, number]> = [
  [-1.50, 105.75],
  [-2.10, 106.25],
  [-2.95, 106.75],
  [-3.05, 106.10],
  [-2.35, 105.25],
  [-1.70, 105.35],
];

const JAVA_COORDS: Array<[number, number]> = [
  [-6.05, 105.88],
  [-6.00, 106.85],
  [-6.25, 107.80],
  [-6.72, 108.60],
  [-6.90, 110.40],
  [-6.65, 111.55],
  [-7.10, 112.75],
  [-7.75, 114.20],
  [-8.35, 114.40],
  [-8.45, 113.10],
  [-8.20, 111.75],
  [-7.90, 110.20],
  [-7.68, 108.80],
  [-7.45, 107.20],
  [-6.95, 106.25],
  [-6.55, 105.65],
];

const BALI_COORDS: Array<[number, number]> = [
  [-8.10, 114.45],
  [-8.25, 115.60],
  [-8.75, 115.45],
  [-8.50, 114.55],
];

function coordsToPath(coords: Array<[number, number]>): string {
  return (
    coords
      .map(([lat, lon], idx) => {
        const pt = projectGeoToMap(lat, lon);
        return `${idx === 0 ? 'M' : 'L'}${pt.x},${pt.y}`;
      })
      .join(' ') + ' Z'
  );
}

export function SiteAtlasSection({ lang, onSelectProject }: SiteAtlasSectionProps) {
  const [selectedSiteId, setSelectedSiteId] = useState<string>('gunung-padang');

  const selectedSite = useMemo(
    () => HERITAGE_SITES.find((s) => s.id === selectedSiteId) ?? HERITAGE_SITES[0],
    [selectedSiteId]
  );

  const siteProjects = useMemo(
    () => getProjectsForSite(selectedSite.id, PROJECTS),
    [selectedSite.id]
  );

  const mapPaths = useMemo(
    () => ({
      sumatra: coordsToPath(SUMATRA_COORDS),
      bangka: coordsToPath(BANGKA_COORDS),
      java: coordsToPath(JAVA_COORDS),
      bali: coordsToPath(BALI_COORDS),
    }),
    []
  );

  const graticuleLons = [96, 100, 104, 108, 112];
  const graticuleLats = [4, 0, -4, -8];

  return (
    <section id="site-map" className="border-b border-slate-200 bg-[#F8FAFC] py-14 lg:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold tracking-wide text-blue-700">
              {lang === 'id' ? '02. Atlas Sebaran Situs Lapangan' : '02. Fieldwork Spatial Atlas'}
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl text-balance">
              {lang === 'id'
                ? 'Jejak Survei & Pelestarian di Sumatera dan Jawa'
                : 'Survey & Preservation Footprint Across Sumatra and Java'}
            </h2>
          </div>
          <p className="max-w-md text-sm text-slate-600">
            {lang === 'id'
              ? 'Klik penanda situs pada peta GIS untuk memeriksa koordinat, era arkeologis, dan daftar proyek yang pernah dilaksanakan.'
              : 'Select any site marker on the GIS map to inspect coordinates, archaeological period, and associated fieldwork.'}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Interactive GIS SVG Map Container */}
          <div className="lg:col-span-7 flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3 text-xs text-slate-500">
              <span className="font-mono">WGS84 · Sumatra &amp; Java Heritage Corridor</span>
              <span className="font-mono tabular-nums">
                {HERITAGE_SITES.length} {lang === 'id' ? 'Titik Situs' : 'Site Locations'}
              </span>
            </div>

            <div className="relative w-full aspect-[920/440] bg-[#EEF2F7]">
              <svg
                viewBox="0 0 920 440"
                className="h-full w-full block"
                role="img"
                aria-label={
                  lang === 'id'
                    ? 'Peta sebaran 17 situs arkeologi dan cagar budaya di Sumatera dan Jawa'
                    : 'Distribution map of 17 archaeological and heritage sites across Sumatra and Java'
                }
              >
                {/* Graticule Grid */}
                {graticuleLons.map((lon) => {
                  const x = projectGeoToMap(0, lon).x;
                  return (
                    <g key={`lon-${lon}`}>
                      <line
                        x1={x}
                        y1={0}
                        x2={x}
                        y2={440}
                        stroke="#CBD5E1"
                        strokeWidth={0.75}
                        strokeDasharray="3 4"
                      />
                      <text
                        x={x + 4}
                        y={16}
                        fontSize={10}
                        fill="#64748B"
                        fontFamily="JetBrains Mono, monospace"
                      >
                        {lon}°E
                      </text>
                    </g>
                  );
                })}

                {graticuleLats.map((lat) => {
                  const y = projectGeoToMap(lat, 100).y;
                  return (
                    <g key={`lat-${lat}`}>
                      <line
                        x1={0}
                        y1={y}
                        x2={920}
                        y2={y}
                        stroke="#CBD5E1"
                        strokeWidth={0.75}
                        strokeDasharray="3 4"
                      />
                      <text
                        x={8}
                        y={y - 4}
                        fontSize={10}
                        fill="#64748B"
                        fontFamily="JetBrains Mono, monospace"
                      >
                        {lat === 0 ? '0°' : `${Math.abs(lat)}°${lat > 0 ? 'N' : 'S'}`}
                      </text>
                    </g>
                  );
                })}

                {/* Landmasses */}
                <path
                  d={mapPaths.sumatra}
                  fill="#FFFFFF"
                  stroke="#94A3B8"
                  strokeWidth={1.25}
                  strokeLinejoin="round"
                />
                <path
                  d={mapPaths.bangka}
                  fill="#FFFFFF"
                  stroke="#94A3B8"
                  strokeWidth={1.15}
                  strokeLinejoin="round"
                />
                <path
                  d={mapPaths.java}
                  fill="#FFFFFF"
                  stroke="#94A3B8"
                  strokeWidth={1.25}
                  strokeLinejoin="round"
                />
                <path
                  d={mapPaths.bali}
                  fill="#FFFFFF"
                  stroke="#94A3B8"
                  strokeWidth={1.15}
                  strokeLinejoin="round"
                />

                {/* Subtle Island Labels */}
                <text
                  x={290}
                  y={145}
                  fontSize={11}
                  fill="#94A3B8"
                  letterSpacing={3}
                  fontWeight={600}
                >
                  SUMATERA
                </text>
                <text
                  x={645}
                  y={368}
                  fontSize={11}
                  fill="#94A3B8"
                  letterSpacing={3}
                  fontWeight={600}
                >
                  JAWA
                </text>
              </svg>

              {/* Accessible Interactive Site Pins */}
              {HERITAGE_SITES.map((site) => {
                const pos = projectGeoToMap(site.lat, site.lon);
                const leftPct = (pos.x / 920) * 100;
                const topPct = (pos.y / 440) * 100;
                const isSelected = site.id === selectedSite.id;

                return (
                  <button
                    key={site.id}
                    type="button"
                    onClick={() => setSelectedSiteId(site.id)}
                    aria-label={`${lang === 'id' ? 'Pilih situs' : 'Select site'} ${site.name}`}
                    aria-pressed={isSelected}
                    title={`${site.name} (${site.province})`}
                    style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-transform duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1 cursor-pointer ${
                      isSelected
                        ? 'z-20 h-5 w-5 bg-blue-700 ring-4 ring-blue-600/25 scale-110'
                        : 'z-10 h-3.5 w-3.5 bg-slate-800 hover:bg-blue-600 hover:scale-125 ring-2 ring-white'
                    }`}
                  >
                    <span className="sr-only">{site.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Site Selector Strip */}
            <div className="border-t border-slate-200 bg-white px-4 py-3">
              <div className="flex flex-wrap gap-1.5">
                {HERITAGE_SITES.map((site) => {
                  const active = site.id === selectedSite.id;
                  return (
                    <button
                      key={site.id}
                      type="button"
                      onClick={() => setSelectedSiteId(site.id)}
                      className={`rounded-md px-2 py-1 text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        active
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {site.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Site Inspector Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6">
            <div>
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <p className="text-xs font-medium text-blue-700">
                    <span>{selectedSite.province}</span>
                    <span className="mx-2 text-slate-300" aria-hidden="true">
                      ·
                    </span>
                    <span>{selectedSite.era[lang]}</span>
                  </p>
                  <h3 className="mt-1.5 font-display text-xl font-bold text-slate-950">
                    {selectedSite.name}
                  </h3>
                </div>
                <MapPin className="h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
              </div>

              <div className="mt-4 flex items-center gap-2 font-mono text-xs text-slate-500 tabular-nums">
                <Compass className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                <span>
                  {Math.abs(selectedSite.lat).toFixed(2)}°{selectedSite.lat < 0 ? 'S' : 'N'},{' '}
                  {selectedSite.lon.toFixed(2)}°E
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                {selectedSite.description[lang]}
              </p>

              <div className="mt-6">
                <h4 className="text-xs font-semibold tracking-wide text-slate-500">
                  {lang === 'id' ? 'Proyek Terkait di Situs Ini' : 'Related Projects at This Site'}
                </h4>
                <div className="mt-3 flex flex-col gap-2.5">
                  {siteProjects.map((proj) => (
                    <button
                      key={proj.id}
                      type="button"
                      onClick={() => onSelectProject(proj)}
                      className="group flex items-start justify-between gap-3 rounded-xl border border-slate-200 bg-[#F8FAFC] p-3.5 text-left transition-colors duration-150 hover:border-blue-600 hover:bg-blue-50/40 cursor-pointer"
                    >
                      <div>
                        <div className="text-xs font-mono text-slate-500 tabular-nums">
                          {proj.year} · {proj.location}
                        </div>
                        <div className="mt-1 text-sm font-semibold text-slate-900 group-hover:text-blue-800">
                          {proj.title[lang]}
                        </div>
                      </div>
                      <ArrowUpRight
                        className="mt-0.5 h-4 w-4 shrink-0 text-slate-400 group-hover:text-blue-700"
                        aria-hidden="true"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-slate-100 pt-4 text-xs text-slate-500">
              {lang === 'id'
                ? 'Menampilkan cakupan wilayah kerja aktual dari riwayat proyek 2019–2026.'
                : 'Reflects actual field survey & conservation coverage from 2019–2026.'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
