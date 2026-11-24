import { useMemo, useState } from 'react';
import { ArrowUpRight, Search, X } from 'lucide-react';
import {
  CATEGORY_LABELS,
  PROJECTS,
  filterProjects,
  type Language,
  type ProjectCategory,
  type ProjectItem,
} from '../utils/portfolioData';

interface ProjectsSectionProps {
  lang: Language;
  onSelectProject: (project: ProjectItem) => void;
}

const CATEGORY_ORDER: ProjectCategory[] = [
  'all',
  'photogrammetry-3d',
  'rescue-excavation',
  'preservation-study',
  'inventory-gis',
  'maritime-underwater',
];

export function ProjectsSection({ lang, onSelectProject }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(
    () => filterProjects(PROJECTS, activeCategory, searchQuery),
    [activeCategory, searchQuery]
  );

  const resetFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
  };

  return (
    <section id="projects" className="border-b border-slate-200 bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold tracking-wide text-blue-700">
              {lang === 'id' ? '03. Rekam Jejak Proyek & Penelitian' : '03. Project & Research Archive'}
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl text-balance">
              {lang === 'id'
                ? 'Pengalaman Lapangan, Pemetaan & Pelestarian Cagar Budaya'
                : 'Fieldwork, Spatial Mapping & Heritage Conservation Experience'}
            </h2>
          </div>

          <div className="font-mono text-xs text-slate-500 tabular-nums">
            {lang === 'id' ? 'Menampilkan' : 'Showing'} <strong className="text-slate-900">{filtered.length}</strong>{' '}
            {lang === 'id' ? 'dari' : 'of'} {PROJECTS.length} {lang === 'id' ? 'proyek' : 'projects'}
          </div>
        </div>

        {/* Interactive Filter & Search Controls */}
        <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="tablist"
            aria-label={lang === 'id' ? 'Filter kategori proyek' : 'Project category filter'}
            className="flex flex-wrap items-center gap-1 rounded-xl bg-slate-100 p-1"
          >
            {CATEGORY_ORDER.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-white text-slate-950 shadow-sm'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  {CATEGORY_LABELS[cat][lang]}
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-64 shrink-0">
            <label htmlFor="project-search" className="sr-only">
              {lang === 'id' ? 'Cari proyek atau situs' : 'Search projects or sites'}
            </label>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              id="project-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === 'id' ? 'Cari situs, metode, tahun...' : 'Search site, method, year...'
              }
              className="w-full rounded-lg border border-slate-200 bg-[#F8FAFC] py-2 pl-9 pr-9 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label={lang === 'id' ? 'Hapus pencarian' : 'Clear search'}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Results Grid or Empty State */}
        {filtered.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-12 text-center">
            <p className="font-display text-lg font-semibold text-slate-900">
              {lang === 'id' ? 'Tidak ada proyek yang sesuai filter' : 'No matching projects found'}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              {lang === 'id'
                ? 'Coba kata kunci lain seperti Gunung Padang, MRT, Bengkulu, atau atur ulang filter kategori.'
                : 'Try another keyword such as Gunung Padang, MRT, Bengkulu, or reset the category filter.'}
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 cursor-pointer"
            >
              {lang === 'id' ? 'Atur Ulang Filter' : 'Reset Filters'}
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, idx) => {
              const isWide =
                activeCategory === 'all' && !searchQuery && idx === 0;
              return (
                <article
                  key={project.id}
                  className={`group flex flex-col justify-between rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 transition-colors duration-150 hover:border-slate-300 hover:bg-white ${
                    isWide ? 'lg:col-span-2' : ''
                  }`}
                >
                  <div>
                    {/* Unboxed Typographic Metadata */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="font-mono font-semibold text-slate-800 tabular-nums">
                        {project.year}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{project.location}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-blue-700 font-medium">
                        {CATEGORY_LABELS[project.category][lang]}
                      </span>
                    </div>

                    <h3 className="mt-3 font-display text-lg font-bold leading-snug text-slate-950">
                      {project.title[lang]}
                    </h3>

                    <p className="mt-1 text-xs font-medium text-slate-500">
                      {project.subtitle[lang]}
                    </p>

                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {project.summary[lang]}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-slate-200/80 pt-4">
                    <div className="text-xs text-slate-500">
                      <span className="font-semibold text-slate-700">
                        {lang === 'id' ? 'Instrumen & Metode:' : 'Instruments & Methods:'}
                      </span>{' '}
                      <span>{project.tools.join(' · ')}</span>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-4">
                      <span className="truncate text-xs text-slate-500">
                        {project.deliverables[lang]}
                      </span>
                      <button
                        type="button"
                        onClick={() => onSelectProject(project)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-900 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
                      >
                        <span>{lang === 'id' ? 'Lihat Detail' : 'View Details'}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
