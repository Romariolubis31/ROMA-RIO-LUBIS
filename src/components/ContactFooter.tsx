import { useState, type FormEvent } from 'react';
import { Check, Copy, FileText, Mail, MapPin, Phone, Send } from 'lucide-react';
import { PROFILE, type Language } from '../utils/portfolioData';

interface ContactFooterProps {
  lang: Language;
  onOpenCvModal: () => void;
}

export function ContactFooter({ lang, onOpenCvModal }: ContactFooterProps) {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [topic, setTopic] = useState('fotogrametri');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedSummary, setSubmittedSummary] = useState<{
    name: string;
    organization: string;
    topicLabel: string;
    message: string;
  } | null>(null);

  const topicOptions = [
    {
      value: 'fotogrametri',
      label: lang === 'id' ? 'Dokumentasi 3D, Laser Scan & Fotogrametri' : '3D Documentation, Laser Scan & Photogrammetry',
    },
    {
      value: 'gis-inventarisasi',
      label: lang === 'id' ? 'Pemetaan GIS & Inventarisasi CB/ODCB' : 'GIS Mapping & Heritage Inventory',
    },
    {
      value: 'ekskavasi-rescue',
      label: lang === 'id' ? 'Survei Lapangan & Rescue Archaeology' : 'Field Survey & Rescue Archaeology',
    },
    {
      value: 'kajian-pelestarian',
      label: lang === 'id' ? 'Kajian Teknis & Rencana Pelestarian' : 'Technical Conservation & Masterplan Studies',
    },
  ];

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedMsg = message.trim();

    if (!trimmedName) {
      setFormError(
        lang === 'id' ? 'Mohon isi nama lengkap Anda.' : 'Please enter your full name.'
      );
      return;
    }
    if (trimmedMsg.length < 10) {
      setFormError(
        lang === 'id'
          ? 'Mohon tulis ringkasan kebutuhan proyek minimal 10 karakter.'
          : 'Please provide a brief project description (at least 10 characters).'
      );
      return;
    }

    setFormError(null);
    const chosenTopic = topicOptions.find((t) => t.value === topic)?.label ?? topic;
    setSubmittedSummary({
      name: trimmedName,
      organization: organization.trim() || (lang === 'id' ? 'Individu / Independen' : 'Independent'),
      topicLabel: chosenTopic,
      message: trimmedMsg,
    });
  };

  const mailtoHref = submittedSummary
    ? `mailto:${PROFILE.email}?subject=${encodeURIComponent(
        `[Portofolio] ${submittedSummary.topicLabel} — ${submittedSummary.name}`
      )}&body=${encodeURIComponent(
        `Nama: ${submittedSummary.name}\nInstansi: ${submittedSummary.organization}\n\n${submittedSummary.message}`
      )}`
    : `mailto:${PROFILE.email}`;

  return (
    <footer id="contact" className="bg-white pt-14 pb-10 lg:pt-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Direct Contact Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold tracking-wide text-blue-700">
                {lang === 'id' ? '05. Kontak & Kolaborasi' : '05. Contact & Collaboration'}
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl text-balance">
                {lang === 'id'
                  ? 'Siap Berkolaborasi dalam Proyek Riset & Pelestarian'
                  : 'Available for Heritage Research & Digital Survey Projects'}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {lang === 'id'
                  ? 'Terbuka untuk kolaborasi bersama Balai Pelestarian Kebudayaan, proyek infrastruktur (rescue archaeology), perguruan tinggi, maupun riset dokumentasi digital warisan budaya.'
                  : 'Open to collaborations with preservation agencies, infrastructure rescue archaeology teams, academic institutions, and digital heritage initiatives.'}
              </p>

              <div className="mt-7 space-y-4 text-sm">
                <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 py-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <Mail className="h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="truncate font-mono text-xs sm:text-sm font-medium text-slate-900 hover:text-blue-700"
                    >
                      {PROFILE.email}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label={lang === 'id' ? 'Salin alamat email' : 'Copy email address'}
                    className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span>{lang === 'id' ? 'Disalin' : 'Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>{lang === 'id' ? 'Salin' : 'Copy'}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 py-3">
                  <Phone className="h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
                  <a
                    href={`tel:${PROFILE.phone}`}
                    className="font-mono text-xs sm:text-sm font-medium text-slate-900 tabular-nums hover:text-blue-700"
                  >
                    {PROFILE.phone}
                  </a>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 py-3">
                  <MapPin className="h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
                  <span className="text-sm text-slate-800">{PROFILE.location}</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={onOpenCvModal}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-800 hover:border-slate-400 hover:bg-slate-50 cursor-pointer"
              >
                <FileText className="h-4 w-4 text-slate-600" aria-hidden="true" />
                <span>{lang === 'id' ? 'Buka & Unduh CV PDF Asli' : 'Open & Download Original CV PDF'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Inquiry Form */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 sm:p-8">
            <h3 className="font-display text-lg font-bold text-slate-950">
              {lang === 'id' ? 'Kirim Ringkasan Kebutuhan Proyek' : 'Send a Project Inquiry'}
            </h3>

            {submittedSummary ? (
              <div className="mt-5 rounded-xl border border-slate-200 bg-white p-6 space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                  <Check className="h-4 w-4" aria-hidden="true" />
                  <span>
                    {lang === 'id'
                      ? 'Draf pesan siap dikirim melalui aplikasi email Anda'
                      : 'Inquiry draft ready to send via your email client'}
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div>
                    <strong className="text-slate-900">{lang === 'id' ? 'Pengirim:' : 'From:'}</strong>{' '}
                    {submittedSummary.name} ({submittedSummary.organization})
                  </div>
                  <div>
                    <strong className="text-slate-900">{lang === 'id' ? 'Fokus Layanan:' : 'Scope:'}</strong>{' '}
                    {submittedSummary.topicLabel}
                  </div>
                  <p className="pt-2 text-sm text-slate-700">{submittedSummary.message}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={mailtoHref}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-800"
                  >
                    <Send className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{lang === 'id' ? 'Buka di Aplikasi Email' : 'Open in Email Client'}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedSummary(null);
                      setMessage('');
                    }}
                    className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    {lang === 'id' ? 'Buat Pesan Baru' : 'Write Another Inquiry'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
                {formError && (
                  <div
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-medium text-red-700"
                  >
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-slate-700"
                    >
                      {lang === 'id' ? 'Nama Lengkap *' : 'Full Name *'}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={lang === 'id' ? 'Contoh: Dr. Andi Wijaya' : 'e.g. Dr. Andi Wijaya'}
                      className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-org"
                      className="block text-xs font-semibold text-slate-700"
                    >
                      {lang === 'id' ? 'Instansi / Lembaga' : 'Institution / Organization'}
                    </label>
                    <input
                      id="contact-org"
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder={
                        lang === 'id'
                          ? 'BPK / Universitas / Konsultan'
                          : 'Heritage Office / University / Firm'
                      }
                      className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-topic"
                    className="block text-xs font-semibold text-slate-700"
                  >
                    {lang === 'id' ? 'Bidang Kebutuhan' : 'Project Focus'}
                  </label>
                  <select
                    id="contact-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                  >
                    {topicOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-slate-700"
                  >
                    {lang === 'id' ? 'Ringkasan Proyek atau Situs *' : 'Project or Site Brief *'}
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                      lang === 'id'
                        ? 'Jelaskan lokasi situs, ruang lingkup dokumentasi/kajian, serta jadwal pelaksanaan...'
                        : 'Describe the heritage site, documentation/study scope, and expected timeline...'
                    }
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-blue-700 cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{lang === 'id' ? 'Siapkan Pesan Kolaborasi' : 'Prepare Inquiry'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Quiet Editorial Footer */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center">
          <div>© 2026 Romario Lubis · {lang === 'id' ? 'Portofolio Arkeologi & Dokumentasi Digital' : 'Archaeology & Digital Documentation Portfolio'}</div>
          <div className="flex items-center gap-5">
            <a href="#profile" className="hover:text-slate-900">
              {lang === 'id' ? 'Profil' : 'Profile'}
            </a>
            <a href="#projects" className="hover:text-slate-900">
              {lang === 'id' ? 'Proyek' : 'Projects'}
            </a>
            <a href="#site-map" className="hover:text-slate-900">
              {lang === 'id' ? 'Peta Situs' : 'Site Map'}
            </a>
            <a
              href={PROFILE.cvPdfPath}
              download="CV_Romario_Lubis.pdf"
              className="font-medium text-blue-700 hover:text-blue-900"
            >
              {lang === 'id' ? 'Unduh CV PDF' : 'Download CV PDF'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
