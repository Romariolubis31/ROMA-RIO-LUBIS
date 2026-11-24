import { useMemo, useState } from 'react';
import {
  HERITAGE_SITES,
  PROJECTS,
  computePortfolioMetrics,
  type Language,
  type ProjectItem,
} from './utils/portfolioData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PointCloudShowcase } from './components/PointCloudShowcase';
import { SiteAtlasSection } from './components/SiteAtlasSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CredentialsSection } from './components/CredentialsSection';
import { ContactFooter } from './components/ContactFooter';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { CvPreviewModal } from './components/CvPreviewModal';

export default function App() {
  const [lang, setLang] = useState<Language>('id');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [cvModalOpen, setCvModalOpen] = useState(false);

  const metrics = useMemo(
    () => computePortfolioMetrics(PROJECTS, HERITAGE_SITES),
    []
  );

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="top" className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <Navbar lang={lang} onContactClick={scrollToContact} />

      <main>
        <HeroSection
          lang={lang}
          onLanguageChange={setLang}
          onOpenCvModal={() => setCvModalOpen(true)}
          metrics={metrics}
        />

        <PointCloudShowcase lang={lang} />

        <SiteAtlasSection
          lang={lang}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        <ProjectsSection
          lang={lang}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        <CredentialsSection lang={lang} />
      </main>

      <ContactFooter
        lang={lang}
        onOpenCvModal={() => setCvModalOpen(true)}
      />

      <ProjectDetailModal
        project={selectedProject}
        lang={lang}
        onClose={() => setSelectedProject(null)}
      />

      <CvPreviewModal
        isOpen={cvModalOpen}
        lang={lang}
        onClose={() => setCvModalOpen(false)}
      />
    </div>
  );
}
