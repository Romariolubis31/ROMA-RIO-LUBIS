import {
  CERTIFICATIONS,
  EDUCATION,
  ORGANIZATIONS,
  SKILL_GROUPS,
  type Language,
} from '../utils/portfolioData';

interface CredentialsSectionProps {
  lang: Language;
}

export function CredentialsSection({ lang }: CredentialsSectionProps) {
  return (
    <section id="skills" className="border-b border-slate-200 bg-[#F8FAFC] py-14 lg:py-20">
      <div className="mx-auto max-w-6xl px-6 space-y-14">
        {/* Skills Matrix */}
        <div>
          <p className="text-xs font-semibold tracking-wide text-blue-700">
            {lang === 'id' ? '04. Kompetensi Teknis & Profesional' : '04. Technical & Professional Capabilities'}
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl text-balance">
            {lang === 'id'
              ? 'Keahlian Lapangan, Laboratorium & Pemrosesan Digital'
              : 'Fieldwork, Laboratory & Digital Processing Stack'}
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {SKILL_GROUPS.map((group) => (
              <div
                key={group.id}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <h3 className="font-display text-base font-bold text-slate-950">
                  {group.title[lang]}
                </h3>
                <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
                  {group.items[lang].map((skill) => (
                    <li
                      key={skill}
                      className="border-b border-slate-100 pb-2 last:border-b-0 last:pb-0"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Certifications Split */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Education & Organizations */}
          <div className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h3 className="font-display text-xl font-bold text-slate-950">
              {lang === 'id' ? 'Pendidikan & Organisasi' : 'Education & Organizations'}
            </h3>

            <div className="mt-6 space-y-6">
              {EDUCATION.map((edu) => (
                <div key={edu.id} className="border-b border-slate-100 pb-5 last:border-b-0 last:pb-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-base font-bold text-slate-900">
                      {edu.degree[lang]}
                    </span>
                    <span className="font-mono text-xs font-medium text-blue-700">
                      {edu.status[lang]}
                    </span>
                  </div>
                  <div className="mt-1 text-sm font-medium text-slate-700">{edu.institution}</div>
                  {edu.note && (
                    <p className="mt-2 text-xs leading-relaxed text-slate-500">
                      {edu.note[lang]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-slate-200 pt-5">
              <div className="text-xs font-semibold tracking-wide text-slate-500">
                {lang === 'id' ? 'Organisasi & Bahasa' : 'Organizations & Languages'}
              </div>
              <div className="mt-3 space-y-2 text-sm text-slate-700">
                {ORGANIZATIONS.map((org) => (
                  <div key={org.name}>
                    <strong className="font-semibold text-slate-900">{org.name}</strong>
                    <span className="mx-2 text-slate-300" aria-hidden="true">
                      ·
                    </span>
                    <span className="text-slate-600">{org.full[lang]}</span>
                  </div>
                ))}
                <div className="pt-1 text-xs text-slate-500">
                  {lang === 'id'
                    ? 'Bahasa: Indonesia (Penutur Aktif) · Inggris (Profesional)'
                    : 'Languages: Indonesian (Native) · English (Professional Working Proficiency)'}
                </div>
              </div>
            </div>
          </div>

          {/* Certifications & Specialized Training */}
          <div className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h3 className="font-display text-xl font-bold text-slate-950">
              {lang === 'id' ? 'Pelatihan & Sertifikasi Khusus' : 'Specialized Training & Certifications'}
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              {lang === 'id'
                ? 'Kualifikasi operasional untuk akuisisi spasial udara, penyelaman arkeologi maritim, serta konservasi material.'
                : 'Operational credentials for aerial UAV acquisition, underwater maritime surveys, and material conservation.'}
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.id}
                  className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-4"
                >
                  <div className="text-xs font-medium text-blue-700">{cert.category[lang]}</div>
                  <div className="mt-1 font-display text-base font-bold text-slate-950">
                    {cert.name[lang]}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {cert.detail[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
