import { useEffect } from 'react';
import { X } from 'lucide-react';
import { CATEGORY_LABELS, type Language, type ProjectItem } from '../utils/portfolioData';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  lang: Language;
  onClose: () => void;
}

export function ProjectDetailModal({ project, lang, onClose }: ProjectDetailModalProps) {
  useEffect(() => {
    if (!project) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="font-mono font-semibold text-slate-900 tabular-nums">
                {project.year}
              </span>
              <span aria-hidden="true">·</span>
              <span>{project.location}</span>
              <span aria-hidden="true">·</span>
              <span className="font-medium text-blue-700">
                {CATEGORY_LABELS[project.category][lang]}
              </span>
            </div>
            <h3
              id="project-modal-title"
              className="mt-2 font-display text-xl font-bold text-slate-950 sm:text-2xl"
            >
              {project.title[lang]}
            </h3>
            <p className="mt-1 text-sm text-slate-600">{project.subtitle[lang]}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={lang === 'id' ? 'Tutup detail proyek' : 'Close project details'}
            className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 cursor-pointer shrink-0"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 space-y-6">
          <div>
            <h4 className="text-xs font-semibold tracking-wide text-slate-500">
              {lang === 'id' ? 'Ringkasan Kegiatan' : 'Project Overview'}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              {project.summary[lang]}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-wide text-slate-500">
              {lang === 'id' ? 'Tanggung Jawab & Lingkup Kerja' : 'Scope & Key Responsibilities'}
            </h4>
            <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-slate-700">
              {project.highlights[lang].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-700" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-[#F8FAFC] p-4 sm:grid-cols-2">
            <div>
              <div className="text-xs font-semibold text-slate-500">
                {lang === 'id' ? 'Perangkat & Metodologi' : 'Tools & Methodology'}
              </div>
              <div className="mt-1.5 text-xs leading-relaxed text-slate-800">
                {project.tools.join(' · ')}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500">
                {lang === 'id' ? 'Keluaran Utama' : 'Key Deliverables'}
              </div>
              <div className="mt-1.5 text-xs leading-relaxed text-slate-800">
                {project.deliverables[lang]}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 cursor-pointer"
          >
            {lang === 'id' ? 'Tutup' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
