import { useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { PROFILE, type Language } from '../utils/portfolioData';

interface CvPreviewModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
}

export function CvPreviewModal({ isOpen, lang, onClose }: CvPreviewModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-6 py-4">
          <div>
            <h3 id="cv-modal-title" className="font-display text-lg font-bold text-slate-950">
              {lang === 'id' ? 'Pratinjau Dokumen CV — Romario Lubis' : 'CV Document Preview — Romario Lubis'}
            </h3>
            <p className="text-xs text-slate-500">
              {lang === 'id' ? 'Dokumen PDF asli (10 halaman)' : 'Original PDF Document (10 pages)'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={PROFILE.cvPdfPath}
              download="CV_Romario_Lubis.pdf"
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-700 px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-800 whitespace-nowrap shrink-0"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{lang === 'id' ? 'Unduh PDF' : 'Download PDF'}</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              aria-label={lang === 'id' ? 'Tutup pratinjau CV' : 'Close CV preview'}
              className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 bg-slate-100">
          <iframe
            src={PROFILE.cvPdfPath}
            title="CV Romario Lubis PDF"
            className="h-full w-full border-0"
          />
        </div>
      </div>
    </div>
  );
}
