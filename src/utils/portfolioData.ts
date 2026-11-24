export type Language = 'id' | 'en';

export type ProjectCategory =
  | 'all'
  | 'photogrammetry-3d'
  | 'rescue-excavation'
  | 'preservation-study'
  | 'inventory-gis'
  | 'maritime-underwater';

export interface LocalizedText {
  id: string;
  en: string;
}

export interface ProjectItem {
  id: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  year: string;
  sortYear: number;
  location: string;
  siteIds: string[];
  category: Exclude<ProjectCategory, 'all'>;
  featured?: boolean;
  tools: string[];
  deliverables: LocalizedText;
  summary: LocalizedText;
  highlights: {
    id: string[];
    en: string[];
  };
}

export interface HeritageSite {
  id: string;
  name: string;
  province: string;
  lat: number;
  lon: number;
  era: LocalizedText;
  description: LocalizedText;
}

export interface EducationItem {
  id: string;
  degree: LocalizedText;
  institution: string;
  status: LocalizedText;
  note?: LocalizedText;
  tier: 'higher' | 'foundation';
}

export interface CertificationItem {
  id: string;
  name: LocalizedText;
  category: LocalizedText;
  detail: LocalizedText;
}

export const PROFILE = {
  name: 'Romario Lubis',
  role: {
    id: 'Arkeolog & Spesialis Dokumentasi Digital Warisan Budaya',
    en: 'Archaeologist & Cultural Heritage Digital Documentation Specialist',
  },
  location: 'Jakarta, Indonesia',
  phone: '085788266069',
  email: 'romario.lubis@ui.ac.id',
  cvPdfPath: '/assets/aistudio/CV._Romario_Lubis_cdcf4a85.pdf',
  portraitPath: '/assets/romario-portrait.jpg',
  heroHeadline: {
    id: 'Mendokumentasikan Warisan Budaya Lewat Presisi Spasial & 3D',
    en: 'Documenting Cultural Heritage Through Spatial & 3D Precision',
  },
  heroLead: {
    id: 'Lulusan Sarjana Arkeologi Universitas Jambi (Cumlaude) dan mahasiswa Magister Arkeologi Universitas Indonesia. Berpengalaman dalam survei lapangan, rescue archaeology, pemetaan GIS & UAV (drone), fotogrametri digital, hingga pemindaian laser 3D untuk pelestarian situs cagar budaya di Indonesia.',
    en: 'Cumlaude Archaeology graduate from Universitas Jambi and current Master of Archaeology candidate at Universitas Indonesia. Experienced in field surveys, rescue archaeology, GIS & UAV (drone) mapping, digital photogrammetry, and 3D laser scanning for Indonesian heritage preservation.',
  },
  aboutParagraph: {
    id: 'Saya pernah terlibat dalam berbagai proyek strategis bersama Balai Pelestarian Kebudayaan, instansi pemerintah, dan perguruan tinggi—mulai dari dokumentasi pra pemugaran Gunung Padang, penyelamatan tinggalan arkeologi jalur MRT Jakarta, inventarisasi bawah air Pulau Tikus, hingga penyusunan Rencana Induk Pelestarian Kawasan Cagar Budaya Nasional Trowulan. Terbiasa bekerja di kondisi lapangan darat maupun bawah air, mengolah data spasial dan model 3D, serta menyusun kajian teknis dan laporan ilmiah.',
    en: 'I have contributed to strategic heritage initiatives alongside the Cultural Preservation Office (BPK), government agencies, and universities—spanning pre-restoration documentation at Gunung Padang, rescue archaeology along the Jakarta MRT corridor, underwater surveys at Pulau Tikus, and the Trowulan National Heritage Preservation Masterplan. Comfortable across terrestrial and underwater fieldwork, spatial modeling, and technical conservation reporting.',
  },
};

export const CATEGORY_LABELS: Record<ProjectCategory, LocalizedText> = {
  all: { id: 'Semua Proyek', en: 'All Projects' },
  'photogrammetry-3d': { id: '3D & Fotogrametri', en: '3D & Photogrammetry' },
  'rescue-excavation': { id: 'Ekskavasi & Rescue', en: 'Excavation & Rescue' },
  'preservation-study': { id: 'Pelestarian & Kajian', en: 'Preservation Studies' },
  'inventory-gis': { id: 'Inventarisasi & GIS', en: 'Inventory & GIS' },
  'maritime-underwater': { id: 'Maritim & Bawah Air', en: 'Maritime & Underwater' },
};

export const HERITAGE_SITES: HeritageSite[] = [
  {
    id: 'rambahan',
    name: 'Situs Rambahan',
    province: 'Sumatera Barat',
    lat: -1.03,
    lon: 101.47,
    era: { id: 'Klasik / Arkeologi Sumatera', en: 'Classical Sumatran Archaeology' },
    description: {
      id: 'Lokasi ekskavasi arkeologi stratigrafi bersama Balai Arkeologi Sumatera Utara (2019 & 2021).',
      en: 'Stratigraphic archaeological excavation site with Balai Arkeologi Sumatera Utara (2019 & 2021).',
    },
  },
  {
    id: 'lambur',
    name: 'Situs Perahu Kuno Lambur',
    province: 'Jambi',
    lat: -1.21,
    lon: 104.08,
    era: { id: 'Arkeologi Maritim Kuno', en: 'Ancient Maritime Archaeology' },
    description: {
      id: 'Ekskavasi sisa perahu kuno dan konteks maritim di Tanjung Jabung Timur, Jambi.',
      en: 'Excavation of ancient wooden vessel remains and maritime context in East Tanjung Jabung, Jambi.',
    },
  },
  {
    id: 'muaro-jambi',
    name: 'Kawasan Percandian Muaro Jambi',
    province: 'Jambi',
    lat: -1.47,
    lon: 103.67,
    era: { id: 'Abad VII–XIII M', en: '7th–13th Century CE' },
    description: {
      id: 'Survei lapangan dan wawancara sosial-budaya untuk penyusunan Masterplan Kawasan Percandian Muaro Jambi.',
      en: 'Field survey and socio-cultural interviews supporting the Muaro Jambi Temple Complex Masterplan.',
    },
  },
  {
    id: 'benteng-anna',
    name: 'Benteng Anna',
    province: 'Bengkulu (Mukomuko)',
    lat: -2.58,
    lon: 101.12,
    era: { id: 'Kolonial Abad XVIII', en: '18th-Century Colonial' },
    description: {
      id: 'Studi pra pemugaran, pengukuran struktur, dan dokumentasi fotogrametri bangunan benteng.',
      en: 'Pre-restoration structural survey, measurements, and photogrammetric documentation.',
    },
  },
  {
    id: 'lebong',
    name: 'Kabupaten Lebong',
    province: 'Bengkulu',
    lat: -3.12,
    lon: 102.21,
    era: { id: 'CB & ODCB Daerah', en: 'Regional Heritage Inventory' },
    description: {
      id: 'Survei, identifikasi, pemetaan sebaran, dan penyusunan basis data CB serta ODCB Kabupaten Lebong.',
      en: 'Field survey, distribution mapping, and database compilation of heritage assets in Lebong.',
    },
  },
  {
    id: 'napal-putih',
    name: 'Rumah Bersejarah Napal Putih',
    province: 'Bengkulu Utara',
    lat: -3.28,
    lon: 101.85,
    era: { id: 'Arsitektur Bersejarah', en: 'Historic Architecture' },
    description: {
      id: 'Studi teknis kondisi arsitektur, pengukuran elemen bersejarah, dan rekomendasi konservasi bangunan.',
      en: 'Technical assessment of historic architectural elements and building conservation recommendations.',
    },
  },
  {
    id: 'rejang-lebong',
    name: 'Kabupaten Rejang Lebong',
    province: 'Bengkulu',
    lat: -3.47,
    lon: 102.52,
    era: { id: 'CB & ODCB Daerah', en: 'Regional Heritage Inventory' },
    description: {
      id: 'Inventarisasi, pemetaan kondisi fisik situs, serta koordinasi validasi data cagar budaya bersama pemda.',
      en: 'Heritage inventory, physical condition mapping, and stakeholder data validation.',
    },
  },
  {
    id: 'bengkulu-kota',
    name: 'Benteng Marlborough, Jitra & Thomas Parr',
    province: 'Kota Bengkulu',
    lat: -3.78,
    lon: 102.25,
    era: { id: 'Kolonial Inggris (Abad XVIII–XIX)', en: 'British Colonial (18th–19th C.)' },
    description: {
      id: 'Klaster studi teknis & kelayakan pelestarian Benteng Marlborough, Makam Inggris Jitra, dan Monumen Thomas Parr.',
      en: 'Technical & feasibility preservation studies for Fort Marlborough, Jitra British Cemetery, and Thomas Parr Monument.',
    },
  },
  {
    id: 'pulau-tikus',
    name: 'Perairan Pulau Tikus',
    province: 'Bengkulu',
    lat: -3.84,
    lon: 102.18,
    era: { id: 'Arkeologi Bawah Air', en: 'Underwater Archaeology' },
    description: {
      id: 'Survei dan dokumentasi fotogrametri bawah air untuk menghasilkan model 3D tinggalan arkeologi maritim.',
      en: 'Underwater archaeological survey and photogrammetry generating 3D maritime heritage models.',
    },
  },
  {
    id: 'benteng-linau',
    name: 'Benteng Linau',
    province: 'Bengkulu (Kaur)',
    lat: -4.77,
    lon: 103.38,
    era: { id: 'Benteng Pesisir Kolonial', en: 'Colonial Coastal Fort' },
    description: {
      id: 'Studi pra pemugaran mencakup identifikasi material, tingkat kerusakan struktur, dan dokumentasi fotogrametri.',
      en: 'Pre-restoration study covering material assessment, structural decay mapping, and photogrammetry.',
    },
  },
  {
    id: 'batu-berak',
    name: 'Situs Megalitik Batu Berak',
    province: 'Lampung Barat',
    lat: -5.01,
    lon: 104.23,
    era: { id: 'Tradisi Megalitik', en: 'Megalithic Tradition' },
    description: {
      id: 'Studi penataan lingkungan situs, inventarisasi fitur arkeologis, dan pemetaan lanskap konservasi.',
      en: 'Site environment planning study, archaeological feature inventory, and conservation landscape mapping.',
    },
  },
  {
    id: 'pugung-raharjo',
    name: 'Situs Pugung Raharjo',
    province: 'Lampung Timur',
    lat: -5.30,
    lon: 105.57,
    era: { id: 'Megalitik – Klasik', en: 'Megalithic – Classical' },
    description: {
      id: 'Studi teknis penataan lingkungan menggunakan pemetaan topografi, UAV drone, dan fotogrametri.',
      en: 'Technical site planning using topographic mapping, UAV drone acquisition, and photogrammetry.',
    },
  },
  {
    id: 'bandar-lampung',
    name: 'Kota Bandar Lampung & Makam Raden Inten',
    province: 'Lampung',
    lat: -5.45,
    lon: 105.27,
    era: { id: 'Sejarah & Cagar Budaya', en: 'Historical & Heritage Assets' },
    description: {
      id: 'Inventarisasi CB/ODCB Kota Bandar Lampung serta studi pelestarian Situs Makam Raden Inten di Lampung Selatan.',
      en: 'Bandar Lampung heritage asset inventory and conservation study of the Raden Inten Tomb complex.',
    },
  },
  {
    id: 'banten',
    name: 'Situs Kaibon, Surosowan & Lab Puslit Arkenas',
    province: 'Banten',
    lat: -6.04,
    lon: 106.15,
    era: { id: 'Kesultanan Banten & Riset Artefak', en: 'Banten Sultanate & Artifact Lab' },
    description: {
      id: 'Perekaman fotogrametri Situs Kaibon & Surosowan (2026) serta klasifikasi keramik di Laboratorium Puslit Arkenas (2021).',
      en: 'Photogrammetric capture at Kaibon & Surosowan (2026) and ceramic artifact classification at Puslit Arkenas Lab (2021).',
    },
  },
  {
    id: 'jakarta-mrt',
    name: 'Koridor Jalur MRT Jakarta',
    province: 'DKI Jakarta',
    lat: -6.17,
    lon: 106.82,
    era: { id: 'Rescue Archaeology Perkotaan', en: 'Urban Rescue Archaeology' },
    description: {
      id: 'Penyelamatan tinggalan arkeologi terdampak pembangunan jalur MRT Jakarta melalui ekskavasi dan fotogrametri.',
      en: 'Rescue archaeology along the Jakarta MRT construction corridor through controlled excavation and photogrammetry.',
    },
  },
  {
    id: 'gunung-padang',
    name: 'SCBN Gunung Padang',
    province: 'Cianjur, Jawa Barat',
    lat: -6.99,
    lon: 107.06,
    era: { id: 'Punden Berundak Megalitik', en: 'Stepped Megalithic Sanctuary' },
    description: {
      id: 'Dokumentasi pra pemugaran (2025) dan akuisisi fotogrametri drone, laser scanner 3D, orthomosaic, serta DEM/DSM (2026).',
      en: 'Pre-restoration documentation (2025) and UAV photogrammetry, 3D laser scanning, orthomosaic, and DEM/DSM modeling (2026).',
    },
  },
  {
    id: 'trowulan',
    name: 'KCBN Trowulan',
    province: 'Mojokerto, Jawa Timur',
    lat: -7.56,
    lon: 112.38,
    era: { id: 'Klasik Majapahit (Abad XIII–XV)', en: 'Majapahit Classical Era (13th–15th C.)' },
    description: {
      id: 'Penyusunan Rencana Induk Pelestarian Kawasan Cagar Budaya Nasional Trowulan (2026).',
      en: 'Formulation of the National Heritage Preservation Masterplan for the Trowulan Archaeological Area (2026).',
    },
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'fotogrametri-kaibon-surosowan-gunung-padang-2026',
    title: {
      id: 'Perekaman & Pengolahan Data Fotogrametri Situs Cagar Budaya',
      en: 'Cultural Heritage Photogrammetric Acquisition & 3D Processing',
    },
    subtitle: {
      id: 'Situs Kaibon, Situs Surosowan & SCBN Gunung Padang',
      en: 'Kaibon, Surosowan & Gunung Padang National Heritage Sites',
    },
    year: '2026',
    sortYear: 2026,
    location: 'Banten & Jawa Barat',
    siteIds: ['banten', 'gunung-padang'],
    category: 'photogrammetry-3d',
    featured: true,
    tools: ['UAV (Drone)', 'Kamera Digital', 'Agisoft Metashape', 'Orthomosaic', 'DEM / DSM', 'Point Cloud'],
    deliverables: {
      id: 'Orthomosaic, DEM, DSM, Point Cloud, Mesh, Model 3D & Basis Data Digital',
      en: 'Orthomosaic, DEM, DSM, Point Cloud, Mesh, 3D Models & Digital Archive',
    },
    summary: {
      id: 'Akuisisi dan pengolahan data fotogrametri presisi tinggi untuk menghasilkan kembaran digital (orthomosaic, DEM/DSM, point cloud, dan mesh 3D) yang terverifikasi kontrol kualitas geometri dan teksturnya.',
      en: 'High-precision photogrammetric data acquisition and processing delivering quality-controlled orthomosaics, DEM/DSM surfaces, point clouds, and textured 3D meshes.',
    },
    highlights: {
      id: [
        'Melaksanakan akuisisi data fotogrametri pada Situs Kaibon, Situs Surosowan, dan Situs Cagar Budaya Nasional Gunung Padang menggunakan UAV (drone) dan kamera digital.',
        'Menyusun rencana pengambilan data serta memastikan cakupan dokumentasi sesuai standar dokumentasi cagar budaya.',
        'Mengolah data fotogrametri menggunakan Agisoft Metashape untuk menghasilkan orthomosaic, Digital Elevation Model (DEM), Digital Surface Model (DSM), point cloud, mesh, dan model 3D.',
        'Melakukan kontrol kualitas (quality control) terhadap hasil pemodelan tiga dimensi untuk memastikan akurasi geometri dan tekstur.',
        'Menyusun dokumentasi teknis dan basis data digital sebagai pendukung kegiatan pelestarian, penelitian, dan pengelolaan cagar budaya.',
      ],
      en: [
        'Executed UAV (drone) and digital camera photogrammetric acquisition across Kaibon, Surosowan, and Gunung Padang National Heritage Sites.',
        'Designed flight and capture plans ensuring full documentation coverage under heritage preservation standards.',
        'Processed datasets in Agisoft Metashape to generate orthomosaics, DEM, DSM, dense point clouds, meshes, and 3D models.',
        'Performed geometric and texture quality control across 3D deliverables.',
        'Compiled technical documentation and digital repositories supporting long-term heritage management.',
      ],
    },
  },
  {
    id: 'rencana-induk-trowulan-2026',
    title: {
      id: 'Penyusunan Rencana Induk Pelestarian KCBN Trowulan',
      en: 'Trowulan National Heritage Preservation Masterplan',
    },
    subtitle: {
      id: 'Kawasan Cagar Budaya Nasional Trowulan',
      en: 'Trowulan National Cultural Heritage Area',
    },
    year: '2026',
    sortYear: 2026,
    location: 'Jawa Timur',
    siteIds: ['trowulan'],
    category: 'preservation-study',
    featured: true,
    tools: ['Survei Lapangan', 'GIS Spasial', 'Inventarisasi Kawasan', 'Zonasi'],
    deliverables: {
      id: 'Kajian Teknis & Dokumen Strategi Pelindungan Kawasan',
      en: 'Technical Assessment & Area Preservation Strategy Document',
    },
    summary: {
      id: 'Kontribusi survei arkeologi, inventarisasi kondisi kawasan, serta integrasi data historis, spasial, dan lingkungan untuk perumusan strategi pelindungan, pengembangan, dan pemanfaatan KCBN Trowulan.',
      en: 'Archaeological field survey, asset condition inventory, and spatial-environmental synthesis informing protection and sustainable development strategies for Trowulan.',
    },
    highlights: {
      id: [
        'Berpartisipasi dalam kegiatan survei dan pengumpulan data sebagai bagian dari penyusunan Rencana Induk Pelestarian Kawasan Cagar Budaya Nasional Trowulan.',
        'Melakukan inventarisasi dan pendokumentasian tinggalan arkeologi serta kondisi kawasan cagar budaya.',
        'Mengumpulkan dan mengolah data arkeologi, historis, spasial, dan lingkungan sebagai dasar penyusunan rencana induk.',
        'Berkontribusi dalam penyusunan kajian teknis dan rekomendasi strategi pelindungan, pengembangan, dan pemanfaatan kawasan.',
        'Berkoordinasi dengan tim multidisiplin dalam penyusunan dokumen Rencana Induk Pelestarian sesuai prinsip pelestarian cagar budaya.',
      ],
      en: [
        'Conducted field surveys and baseline data collection for the Trowulan National Heritage Preservation Masterplan.',
        'Inventoried and documented archaeological remains and site conservation conditions.',
        'Integrated archaeological, historical, spatial, and environmental datasets as masterplan foundations.',
        'Contributed technical analyses and strategic recommendations for protection, development, and utilization.',
        'Collaborated within a multidisciplinary team adhering to cultural heritage conservation principles.',
      ],
    },
  },
  {
    id: 'pra-pemugaran-gunung-padang-2025',
    title: {
      id: 'Kegiatan Pra Pemugaran Situs Cagar Budaya Nasional Gunung Padang',
      en: 'Pre-Restoration Documentation of Gunung Padang Heritage Site',
    },
    subtitle: {
      id: 'Akuisisi 3D Laser Scanner, UAV & Fotogrametri',
      en: '3D Laser Scanning, UAV & Photogrammetry Acquisition',
    },
    year: '2025',
    sortYear: 2025,
    location: 'Cianjur, Jawa Barat',
    siteIds: ['gunung-padang'],
    category: 'photogrammetry-3d',
    featured: true,
    tools: ['Leica BLK360', 'UAV (Drone)', 'Fotogrametri', 'Data Spasial 3D'],
    deliverables: {
      id: 'Model 3D Eksisting, Data Spasial & Laporan Teknis Pra Pemugaran',
      en: 'Existing 3D Condition Model, Spatial Data & Pre-Restoration Technical Report',
    },
    summary: {
      id: 'Dokumentasi arkeologi komprehensif kondisi eksisting situs punden berundak Gunung Padang menggunakan gabungan pemindaian laser 3D, drone, dan fotogrametri sebagai dasar analisis teknis pemugaran.',
      en: 'Comprehensive pre-restoration recording of Gunung Padang combining 3D laser scanning, UAV flights, and photogrammetry to establish baseline restoration models.',
    },
    highlights: {
      id: [
        'Melaksanakan dokumentasi arkeologi sebagai bagian dari kegiatan pra pemugaran Situs Cagar Budaya Nasional Gunung Padang.',
        'Melakukan akuisisi data menggunakan fotogrametri, UAV (drone), dan laser scanner 3D untuk mendukung dokumentasi kondisi eksisting situs.',
        'Mengolah data spasial dan model tiga dimensi (3D) sebagai dasar analisis teknis dan perencanaan pemugaran.',
        'Berpartisipasi dalam survei lapangan, pemetaan, serta verifikasi data arkeologi sesuai standar pelestarian cagar budaya.',
        'Menyusun dokumentasi teknis dan mendukung penyusunan laporan hasil kegiatan pra pemugaran.',
      ],
      en: [
        'Executed archaeological documentation for pre-restoration works at Gunung Padang National Heritage Site.',
        'Acquired existing site geometry via photogrammetry, UAV (drone), and 3D laser scanning.',
        'Processed spatial datasets and 3D models supporting engineering analysis and restoration planning.',
        'Participated in field verification and heritage-standard archaeological mapping.',
        'Prepared technical documentation and contributed to pre-restoration project reports.',
      ],
    },
  },
  {
    id: 'mrt-jakarta-rescue-2025',
    title: {
      id: 'Proyek MRT Jakarta — Penyelamatan Tinggalan Arkeologi',
      en: 'Jakarta MRT Corridor — Archaeological Rescue Project',
    },
    subtitle: {
      id: 'Rescue Archaeology Terdampak Pembangunan Jalur MRT',
      en: 'Urban Rescue Archaeology Along MRT Alignment',
    },
    year: '2025',
    sortYear: 2025,
    location: 'DKI Jakarta',
    siteIds: ['jakarta-mrt'],
    category: 'rescue-excavation',
    featured: true,
    tools: ['Rescue Archaeology', 'Ekskavasi', 'Fotogrametri', 'Pemetaan Digital'],
    deliverables: {
      id: 'Data Ekskavasi, Dokumentasi 3D Temuan & Laporan Teknis Penyelamatan',
      en: 'Excavation Records, 3D Find Documentation & Rescue Technical Report',
    },
    summary: {
      id: 'Operasi penyelamatan arkeologi (rescue archaeology) pada area terdampak konstruksi jalur MRT Jakarta—menyeimbangkan standar pelestarian cagar budaya dengan jadwal pembangunan infrastruktur perkotaan.',
      en: 'Urban rescue archaeology along the Jakarta MRT construction corridor—balancing cultural heritage preservation protocols with major transit infrastructure timelines.',
    },
    highlights: {
      id: [
        'Melaksanakan survei dan identifikasi tinggalan arkeologi pada area terdampak pembangunan jalur MRT.',
        'Berpartisipasi dalam kegiatan penyelamatan (rescue archaeology) melalui dokumentasi, ekskavasi, dan pencatatan temuan arkeologi.',
        'Melakukan pendokumentasian menggunakan fotogrametri, pemetaan, dan teknologi digital untuk mendukung pelestarian data arkeologi.',
        'Mengolah dan menganalisis data hasil ekskavasi sebagai dasar penyusunan laporan teknis.',
        'Berkoordinasi dengan tim multidisiplin untuk memastikan kegiatan penyelamatan arkeologi berjalan sesuai standar pelestarian cagar budaya dan kebutuhan pembangunan infrastruktur.',
      ],
      en: [
        'Surveyed and identified archaeological remains across zones impacted by MRT rail construction.',
        'Conducted rescue archaeology through controlled excavation, recording, and artifact cataloging.',
        'Documented exposed contexts using photogrammetry, digital mapping, and rapid recording workflows.',
        'Analyzed excavation datasets to compile technical rescue reports.',
        'Coordinated with multidisciplinary engineering and heritage teams to align preservation compliance with infrastructure schedules.',
      ],
    },
  },
  {
    id: 'bawah-air-pulau-tikus-2025',
    title: {
      id: 'Inventarisasi Tinggalan Arkeologi Bawah Air Pulau Tikus',
      en: 'Underwater Archaeological Inventory at Pulau Tikus',
    },
    subtitle: {
      id: 'Arkeologi Maritim & Fotogrametri Bawah Air',
      en: 'Maritime Archaeology & Underwater Photogrammetry',
    },
    year: '2025',
    sortYear: 2025,
    location: 'Bengkulu',
    siteIds: ['pulau-tikus'],
    category: 'maritime-underwater',
    featured: true,
    tools: ['Selam A1/A2', 'Fotografi Bawah Air', 'Fotogrametri 3D', 'Data Spasial Maritim'],
    deliverables: {
      id: 'Model Digital 3D Bawah Air, Basis Data & Laporan Arkeologi Maritim',
      en: 'Underwater 3D Digital Models, Inventory Database & Maritime Report',
    },
    summary: {
      id: 'Survei, identifikasi, dan dokumentasi fotogrametri bawah air di perairan Pulau Tikus sesuai kaidah arkeologi maritim untuk membangun model 3D serta basis data pelestarian warisan budaya bawah air.',
      en: 'Underwater survey and photogrammetric recording at Pulau Tikus following maritime archaeology standards to produce 3D digital models and conservation inventories.',
    },
    highlights: {
      id: [
        'Melaksanakan survei dan inventarisasi tinggalan arkeologi bawah air di kawasan Pulau Tikus, Bengkulu.',
        'Melakukan identifikasi, pendokumentasian, dan pencatatan tinggalan arkeologi bawah air sesuai kaidah arkeologi maritim.',
        'Melaksanakan dokumentasi bawah air menggunakan fotografi dan fotogrametri untuk menghasilkan model digital 3D.',
        'Mengolah data spasial dan hasil dokumentasi sebagai dasar inventarisasi dan analisis arkeologi.',
        'Menyusun laporan teknis dan basis data inventarisasi sebagai pendukung pelestarian warisan budaya bawah air.',
      ],
      en: [
        'Conducted underwater archaeological surveys and inventories around Pulau Tikus, Bengkulu.',
        'Identified and recorded submerged cultural remains following maritime archaeology protocols.',
        'Captured underwater imagery and photogrammetry to generate 3D digital models.',
        'Processed spatial datasets and visual records for archaeological analysis.',
        'Prepared technical reports and underwater heritage inventory databases.',
      ],
    },
  },
  {
    id: 'bpk-wilayah-vii-2023-2025',
    title: {
      id: 'Balai Pelestarian Kebudayaan Wilayah VII',
      en: 'Cultural Preservation Office Region VII (BPK VII)',
    },
    subtitle: {
      id: 'Pelestarian & Dokumentasi Digital Provinsi Bengkulu dan Lampung',
      en: 'Heritage Preservation & Digital Documentation — Bengkulu & Lampung',
    },
    year: '2023–2025',
    sortYear: 2025,
    location: 'Bengkulu & Lampung',
    siteIds: ['bengkulu-kota', 'bandar-lampung'],
    category: 'photogrammetry-3d',
    featured: true,
    tools: ['Leica BLK360', 'UAV Drone', 'Kamera 360°', 'QGIS', 'ArcGIS', 'Agisoft Metashape'],
    deliverables: {
      id: 'Peta GIS, Model 3D, Virtual Tour 360° & Kajian Teknis Cagar Budaya',
      en: 'GIS Maps, 3D Models, 360° Virtual Tours & Technical Heritage Studies',
    },
    summary: {
      id: 'Peran berkelanjutan selama 2023–2025 dalam survei, inventarisasi, akuisisi 3D (drone, fotogrametri, laser scanner, kamera 360°), pemetaan GIS, dan koordinasi lintas pemangku kepentingan di Provinsi Bengkulu dan Lampung.',
      en: 'Multi-year role (2023–2025) executing heritage surveys, 3D digital recording (UAV, photogrammetry, laser scanner, 360° camera), GIS cartography, and multi-stakeholder coordination across Bengkulu and Lampung.',
    },
    highlights: {
      id: [
        'Melaksanakan survei, identifikasi, dan inventarisasi cagar budaya.',
        'Melakukan dokumentasi digital menggunakan drone, fotogrametri, laser scanner 3D, dan kamera 360°.',
        'Mengolah data spasial serta menyusun peta menggunakan QGIS, ArcGIS, dan Agisoft Metashape.',
        'Menyusun kajian teknis, laporan survei, dan rekomendasi pelestarian cagar budaya.',
        'Berkoordinasi dengan pemerintah daerah, akademisi, dan masyarakat dalam kegiatan pelestarian cagar budaya.',
      ],
      en: [
        'Conducted systematic surveys, identification, and inventories of cultural heritage assets.',
        'Captured digital documentation via UAV drones, photogrammetry, 3D laser scanners, and 360° cameras.',
        'Processed spatial datasets and produced thematic maps in QGIS, ArcGIS, and Agisoft Metashape.',
        'Authored technical studies, survey reports, and heritage conservation recommendations.',
        'Coordinated with regional governments, academics, and local communities on preservation programs.',
      ],
    },
  },
  {
    id: 'inventarisasi-bandar-lampung-2025',
    title: {
      id: 'Inventarisasi CB dan ODCB Kota Bandar Lampung',
      en: 'Heritage Asset Inventory — Bandar Lampung City',
    },
    subtitle: {
      id: 'Cagar Budaya (CB) & Objek Diduga Cagar Budaya (ODCB)',
      en: 'Registered Heritage (CB) & Suspected Heritage Objects (ODCB)',
    },
    year: '2025',
    sortYear: 2025,
    location: 'Kota Bandar Lampung',
    siteIds: ['bandar-lampung'],
    category: 'inventory-gis',
    tools: ['QGIS / ArcGIS', 'Fotografi Lapangan', 'Pemetaan Sebaran', 'Basis Data CB/ODCB'],
    deliverables: {
      id: 'Basis Data, Peta Sebaran & Laporan Teknis Validasi',
      en: 'Heritage Database, Distribution Map & Technical Validation Report',
    },
    summary: {
      id: 'Survei, identifikasi, dan validasi data Cagar Budaya serta ODCB di Kota Bandar Lampung sebagai dasar pelindungan hukum dan pengelolaan tata ruang heritage perkotaan.',
      en: 'Survey, identification, and stakeholder validation of heritage and suspected heritage assets in Bandar Lampung to support legal designation and urban management.',
    },
    highlights: {
      id: [
        'Melaksanakan survei, identifikasi, dan inventarisasi Cagar Budaya (CB) serta Objek Diduga Cagar Budaya (ODCB) di Kota Bandar Lampung.',
        'Melakukan pendokumentasian objek melalui fotografi, pemetaan, dan pencatatan kondisi fisik serta lingkungan situs.',
        'Mengumpulkan dan mengolah data arkeologi, historis, dan spasial sebagai dasar penyusunan inventarisasi.',
        'Menyusun basis data, peta sebaran, serta laporan teknis untuk mendukung pelindungan dan pengelolaan cagar budaya.',
        'Berkoordinasi dengan pemerintah daerah dan pemangku kepentingan dalam proses inventarisasi dan validasi data cagar budaya.',
      ],
      en: [
        'Surveyed and inventoried CB and ODCB heritage assets across Bandar Lampung.',
        'Documented physical condition and surrounding site context via photography and mapping.',
        'Compiled archaeological, historical, and spatial datasets for inventory synthesis.',
        'Produced distribution maps, structured databases, and technical reports.',
        'Coordinated with municipal authorities and stakeholders for data verification and validation.',
      ],
    },
  },
  {
    id: 'inventarisasi-lebong-2025',
    title: {
      id: 'Inventarisasi CB dan ODCB Kabupaten Lebong',
      en: 'Heritage Asset Inventory — Lebong Regency',
    },
    subtitle: {
      id: 'Pemetaan Sebaran & Rekomendasi Penetapan Cagar Budaya',
      en: 'Distribution Mapping & Designation Recommendations',
    },
    year: '2025',
    sortYear: 2025,
    location: 'Kabupaten Lebong, Bengkulu',
    siteIds: ['lebong'],
    category: 'inventory-gis',
    tools: ['Pemetaan GIS', 'Survei Lapangan', 'Fotografi', 'Basis Data Spasial'],
    deliverables: {
      id: 'Peta Sebaran CB/ODCB & Rekomendasi Penetapan',
      en: 'CB/ODCB Distribution Maps & Heritage Designation Recommendations',
    },
    summary: {
      id: 'Pendataan dan pemetaan spasial tinggalan budaya di wilayah Kabupaten Lebong sebagai landasan rekomendasi pelindungan dan penetapan resmi cagar budaya.',
      en: 'Field recording and spatial mapping of cultural heritage across Lebong Regency supporting official protection and designation recommendations.',
    },
    highlights: {
      id: [
        'Melaksanakan survei, identifikasi, dan inventarisasi Cagar Budaya (CB) serta Objek Diduga Cagar Budaya (ODCB) di Kabupaten Lebong, Bengkulu.',
        'Melakukan pendokumentasian tinggalan budaya melalui fotografi, pemetaan, dan pencatatan kondisi objek di lapangan.',
        'Mengumpulkan data arkeologi, historis, dan spasial sebagai dasar penyusunan inventarisasi cagar budaya.',
        'Mengolah data hasil survei serta menyusun basis data dan peta sebaran CB dan ODCB.',
        'Menyusun laporan teknis dan rekomendasi sebagai bahan pendukung pelindungan dan penetapan cagar budaya.',
      ],
      en: [
        'Conducted field surveys and heritage inventories across Lebong Regency, Bengkulu.',
        'Recorded physical condition, spatial coordinates, and photographic evidence on site.',
        'Integrated historical, archaeological, and geospatial records.',
        'Built structured databases and distribution maps of CB and ODCB assets.',
        'Authored technical reports and designation recommendations for heritage protection.',
      ],
    },
  },
  {
    id: 'inventarisasi-rejang-lebong-2025',
    title: {
      id: 'Inventarisasi CB dan ODCB Kabupaten Rejang Lebong',
      en: 'Heritage Asset Inventory — Rejang Lebong Regency',
    },
    subtitle: {
      id: 'Pengukuran, Pemetaan & Validasi Pemangku Kepentingan',
      en: 'Measurement, Mapping & Stakeholder Validation',
    },
    year: '2025',
    sortYear: 2025,
    location: 'Kabupaten Rejang Lebong, Bengkulu',
    siteIds: ['rejang-lebong'],
    category: 'inventory-gis',
    tools: ['Pengukuran Lapangan', 'GIS', 'Fotografi', 'Validasi Data'],
    deliverables: {
      id: 'Basis Data Spasial, Peta Sebaran & Laporan Teknis',
      en: 'Spatial Database, Distribution Map & Technical Report',
    },
    summary: {
      id: 'Inventarisasi menyeluruh serta verifikasi data CB dan ODCB di Kabupaten Rejang Lebong bersama pemerintah daerah, pemilik objek, dan pemangku kepentingan lokal.',
      en: 'Comprehensive inventory and field verification of CB and ODCB assets in Rejang Lebong in partnership with local government and custodians.',
    },
    highlights: {
      id: [
        'Melaksanakan survei, identifikasi, dan inventarisasi Cagar Budaya (CB) serta Objek Diduga Cagar Budaya (ODCB) di Kabupaten Rejang Lebong.',
        'Melakukan pendokumentasian objek melalui fotografi, pengukuran, pemetaan, dan pencatatan kondisi fisik serta lingkungan situs.',
        'Mengumpulkan dan mengolah data arkeologi, historis, dan spasial sebagai dasar penyusunan inventarisasi cagar budaya.',
        'Menyusun basis data, peta sebaran, dan laporan teknis sebagai bahan pendukung pelindungan, pengelolaan, dan pelestarian cagar budaya.',
        'Berkoordinasi dengan pemerintah daerah, pemilik objek, dan pemangku kepentingan dalam proses verifikasi serta validasi data cagar budaya.',
      ],
      en: [
        'Inventoried CB and ODCB assets across Rejang Lebong Regency.',
        'Performed photographic documentation, dimensional measurements, and environmental condition logging.',
        'Processed archaeological, historical, and spatial datasets.',
        'Compiled databases, distribution maps, and technical preservation reports.',
        'Coordinated data verification and validation with local authorities and asset owners.',
      ],
    },
  },
  {
    id: 'studi-pra-pemugaran-benteng-anna-2024',
    title: {
      id: 'Studi Pra Pemugaran Benteng Anna',
      en: 'Pre-Restoration Study of Fort Anna',
    },
    subtitle: {
      id: 'Survei Struktur Kolonial & Dokumentasi Fotogrametri',
      en: 'Colonial Structure Survey & Photogrammetric Documentation',
    },
    year: '2024',
    sortYear: 2024,
    location: 'Mukomuko, Bengkulu',
    siteIds: ['benteng-anna'],
    category: 'photogrammetry-3d',
    tools: ['Fotogrametri', 'Pengukuran Struktur', 'Pemetaan Arsitektural', 'Fotografi'],
    deliverables: {
      id: 'Kajian Teknis Pemugaran & Rekomendasi Pelestarian Benteng Anna',
      en: 'Restoration Technical Study & Conservation Guidelines for Fort Anna',
    },
    summary: {
      id: 'Identifikasi elemen arkeologis-arsitektural, pengukuran struktur, serta dokumentasi fotogrametri kondisi eksisting Benteng Anna sebagai acuan teknis pelaksanaan pemugaran.',
      en: 'Architectural-archaeological recording, structural measurement, and photogrammetric modeling of Fort Anna guiding conservation and restoration works.',
    },
    highlights: {
      id: [
        'Melaksanakan survei dan pendokumentasian kondisi eksisting Benteng Anna sebagai bagian dari kegiatan studi pra pemugaran.',
        'Melakukan identifikasi, pengukuran, dan pencatatan kondisi struktur serta elemen arkeologis bangunan benteng.',
        'Mengumpulkan data arkeologi, historis, arsitektural, dan spasial sebagai dasar penyusunan kajian teknis pemugaran.',
        'Melakukan dokumentasi digital menggunakan fotografi, fotogrametri, dan pemetaan untuk mendukung analisis kondisi bangunan.',
        'Berpartisipasi dalam penyusunan kajian teknis dan rekomendasi pelestarian sebagai acuan pelaksanaan pemugaran Benteng Anna.',
      ],
      en: [
        'Surveyed and documented the existing condition of Fort Anna for pre-restoration assessment.',
        'Measured and logged structural integrity and archaeological architectural elements.',
        'Synthesized historical, architectural, and spatial records for restoration engineering.',
        'Captured digital photography, photogrammetry, and site plans supporting structural diagnostics.',
        'Co-authored technical studies and preservation recommendations guiding restoration execution.',
      ],
    },
  },
  {
    id: 'studi-pra-pemugaran-benteng-linau',
    title: {
      id: 'Studi Pra Pemugaran Benteng Linau',
      en: 'Pre-Restoration Study of Fort Linau',
    },
    subtitle: {
      id: 'Identifikasi Material, Tingkat Kerusakan & Fotogrametri',
      en: 'Material Diagnostics, Decay Assessment & Photogrammetry',
    },
    year: '2023–2025',
    sortYear: 2024,
    location: 'Kaur, Bengkulu',
    siteIds: ['benteng-linau'],
    category: 'preservation-study',
    tools: ['Fotogrametri', 'Pemetaan Kerusakan', 'Survei Arsitektural'],
    deliverables: {
      id: 'Kajian Teknis & Acuan Pemugaran Benteng Linau',
      en: 'Technical Study & Restoration Reference for Fort Linau',
    },
    summary: {
      id: 'Kajian pra pemugaran Benteng Linau dengan fokus pencatatan kondisi material, pemetaan tingkat kerusakan struktur bangunan benteng, dan dokumentasi fotogrametri.',
      en: 'Pre-restoration study of Fort Linau evaluating material pathology, structural damage levels, and photogrammetric documentation.',
    },
    highlights: {
      id: [
        'Melaksanakan survei dan pendokumentasian kondisi eksisting Benteng Linau sebagai bagian dari kegiatan studi pra pemugaran.',
        'Melakukan identifikasi, pengukuran, dan pencatatan kondisi struktur, material, serta tingkat kerusakan bangunan benteng.',
        'Mengumpulkan data arkeologi, historis, arsitektural, dan spasial sebagai dasar penyusunan kajian teknis pemugaran.',
        'Melakukan dokumentasi digital menggunakan fotografi, fotogrametri, dan pemetaan untuk mendukung analisis kondisi bangunan.',
        'Berpartisipasi dalam penyusunan kajian teknis dan rekomendasi pelestarian sebagai acuan pelaksanaan pemugaran Benteng Linau.',
      ],
      en: [
        'Documented existing site conditions at Fort Linau as part of pre-restoration planning.',
        'Measured and assessed structural stability, masonry materials, and decay severity.',
        'Compiled archaeological, historical, architectural, and spatial datasets.',
        'Executed photographic, photogrammetric, and spatial mapping workflows.',
        'Contributed technical recommendations as reference for Fort Linau restoration.',
      ],
    },
  },
  {
    id: 'studi-penataan-batu-berak',
    title: {
      id: 'Studi Penataan Lingkungan Situs Batu Berak',
      en: 'Environmental Site Planning Study — Batu Berak',
    },
    subtitle: {
      id: 'Konservasi Lanskap & Fitur Megalitik',
      en: 'Landscape Conservation & Megalithic Features',
    },
    year: '2023–2025',
    sortYear: 2024,
    location: 'Lampung Barat',
    siteIds: ['batu-berak'],
    category: 'preservation-study',
    tools: ['Pemetaan Lanskap', 'Dokumentasi Digital', 'Pengukuran Fitur'],
    deliverables: {
      id: 'Kajian & Rekomendasi Penataan Kawasan Situs Batu Berak',
      en: 'Site Environmental Planning Study & Conservation Guidelines',
    },
    summary: {
      id: 'Inventarisasi fitur arkeologis dan analisis lanskap sekitar Situs Batu Berak untuk menyusun rekomendasi penataan kawasan berbasis nilai penting dan konservasi.',
      en: 'Inventory of megalithic features and landscape context at Batu Berak to formulate conservation-led spatial planning recommendations.',
    },
    highlights: {
      id: [
        'Melaksanakan survei dan identifikasi kondisi eksisting kawasan Situs Batu Berak sebagai dasar penataan lingkungan situs.',
        'Melakukan inventarisasi elemen cagar budaya, fitur arkeologis, dan kondisi lanskap di sekitar situs.',
        'Mengumpulkan data arkeologi, spasial, dan lingkungan melalui pemetaan, pengukuran, serta dokumentasi digital.',
        'Berpartisipasi dalam penyusunan kajian penataan lingkungan untuk mendukung pelindungan, pemanfaatan, dan pelestarian situs.',
        'Menyusun rekomendasi penataan kawasan berdasarkan nilai penting cagar budaya, aspek konservasi, dan karakteristik lanskap situs.',
      ],
      en: [
        'Surveyed baseline environmental conditions around the Batu Berak megalithic complex.',
        'Inventoried cultural heritage elements, archaeological features, and surrounding landscape patterns.',
        'Collected archaeological, spatial, and environmental records through mapping and digital documentation.',
        'Contributed to environmental planning studies balancing protection and public utilization.',
        'Drafted spatial recommendations grounded in heritage significance and conservation ecology.',
      ],
    },
  },
  {
    id: 'studi-teknis-pugung-raharjo',
    title: {
      id: 'Studi Teknis Penataan Lingkungan Situs Pugung Raharjo',
      en: 'Technical Site Planning Study — Pugung Raharjo',
    },
    subtitle: {
      id: 'Pemetaan Topografi, Drone UAV & Fotogrametri Kawasan',
      en: 'Topographic Mapping, UAV Drone & Site Photogrammetry',
    },
    year: '2023–2025',
    sortYear: 2024,
    location: 'Lampung Timur',
    siteIds: ['pugung-raharjo'],
    category: 'photogrammetry-3d',
    tools: ['UAV Drone', 'Fotogrametri', 'Pemetaan Topografi', 'Analisis Lanskap'],
    deliverables: {
      id: 'Peta Topografi, Dokumentasi Drone & Rencana Penataan Berkelanjutan',
      en: 'Topographic Maps, Drone Imagery & Sustainable Site Plan',
    },
    summary: {
      id: 'Pemetaan topografi dan akuisisi drone-fotogrametri kawasan Situs Pugung Raharjo guna merumuskan rencana teknis penataan lingkungan dan pengelolaan situs berkelanjutan.',
      en: 'Topographic surveying and UAV photogrammetric acquisition at Pugung Raharjo supporting sustainable environmental planning and heritage management.',
    },
    highlights: {
      id: [
        'Melaksanakan survei teknis dan identifikasi kondisi eksisting kawasan Situs Pugung Raharjo sebagai dasar penyusunan rencana penataan lingkungan.',
        'Melakukan inventarisasi elemen cagar budaya, fitur arkeologis, serta kondisi lanskap dan lingkungan situs.',
        'Mengumpulkan data arkeologi, spasial, dan topografi melalui pemetaan, pengukuran, serta dokumentasi digital menggunakan drone dan fotogrametri.',
        'Berpartisipasi dalam penyusunan kajian teknis penataan lingkungan untuk mendukung pelindungan, pengembangan, dan pemanfaatan Situs Cagar Budaya Pugung Raharjo.',
        'Menyusun rekomendasi penataan kawasan berdasarkan prinsip pelestarian cagar budaya, karakteristik lanskap, dan kebutuhan pengelolaan situs secara berkelanjutan.',
      ],
      en: [
        'Conducted technical field surveys across the Pugung Raharjo archaeological landscape.',
        'Inventoried heritage structures, archaeological features, and environmental zones.',
        'Collected spatial and topographic data using drone flights and photogrammetry.',
        'Co-authored technical site planning studies for sustainable protection and public access.',
        'Formulated landscape-sensitive conservation and management recommendations.',
      ],
    },
  },
  {
    id: 'studi-pelestarian-raden-inten',
    title: {
      id: 'Studi Pelestarian Situs Makam Raden Inten',
      en: 'Conservation Study — Raden Inten Tomb Site',
    },
    subtitle: {
      id: 'Analisis Potensi, Ancaman & Konservasi Berkelanjutan',
      en: 'Threat Assessment & Sustainable Heritage Conservation',
    },
    year: '2023–2025',
    sortYear: 2024,
    location: 'Lampung Selatan',
    siteIds: ['bandar-lampung'],
    category: 'preservation-study',
    tools: ['Observasi Lapangan', 'Pemetaan Spasial', 'Penilaian Kondisi', 'Dokumentasi Digital'],
    deliverables: {
      id: 'Kajian Pelestarian & Rekomendasi Pengelolaan Situs',
      en: 'Preservation Assessment & Sustainable Management Recommendations',
    },
    summary: {
      id: 'Penilaian kondisi tinggalan, analisis potensi serta ancaman kerusakan, dan penyusunan rekomendasi teknis pelestarian Situs Makam Raden Inten.',
      en: 'Condition evaluation, threat and potential analysis, and technical preservation planning for the Raden Inten Tomb heritage complex.',
    },
    highlights: {
      id: [
        'Melaksanakan survei dan identifikasi kondisi eksisting Situs Makam Raden Inten sebagai dasar penyusunan kajian pelestarian.',
        'Melakukan inventarisasi, pendokumentasian, dan penilaian kondisi tinggalan cagar budaya beserta lingkungan situs.',
        'Mengumpulkan data arkeologi, historis, arsitektural, dan spasial melalui observasi lapangan, pemetaan, dan dokumentasi digital.',
        'Berpartisipasi dalam analisis potensi, ancaman, dan kebutuhan pelestarian situs sesuai prinsip konservasi cagar budaya.',
        'Menyusun rekomendasi teknis pelestarian untuk mendukung pelindungan, pengelolaan, dan pemanfaatan Situs Makam Raden Inten secara berkelanjutan.',
      ],
      en: [
        'Surveyed existing conditions at the Raden Inten Tomb complex.',
        'Inventoried, documented, and graded the physical state of heritage remains and site grounds.',
        'Collected archaeological, historical, architectural, and spatial datasets.',
        'Analyzed conservation risks, visitor pressures, and preservation priorities.',
        'Delivered sustainable protection and management recommendations.',
      ],
    },
  },
  {
    id: 'studi-rumah-napal-putih',
    title: {
      id: 'Studi Teknis Rumah Bersejarah Napal Putih',
      en: 'Technical Study — Napal Putih Historic House',
    },
    subtitle: {
      id: 'Konservasi Arsitektur Bangunan Cagar Budaya',
      en: 'Historic Architectural Conservation Assessment',
    },
    year: '2023–2025',
    sortYear: 2024,
    location: 'Bengkulu Utara',
    siteIds: ['napal-putih'],
    category: 'preservation-study',
    tools: ['Pengukuran Arsitektural', 'Pemetaan', 'Fotografi', 'Dokumentasi Digital'],
    deliverables: {
      id: 'Kajian Teknis Arsitektur & Rekomendasi Penanganan Konservasi',
      en: 'Architectural Technical Study & Conservation Treatment Plan',
    },
    summary: {
      id: 'Penilaian kondisi arsitektur serta elemen bersejarah Rumah Bersejarah Napal Putih untuk menetapkan pedoman penanganan konservasi bangunan cagar budaya.',
      en: 'Architectural condition assessment and historical documentation of Napal Putih Historic House guiding conservation interventions.',
    },
    highlights: {
      id: [
        'Melaksanakan survei teknis dan identifikasi kondisi eksisting Rumah Bersejarah Napal Putih.',
        'Melakukan inventarisasi, pendokumentasian, dan penilaian kondisi arsitektur serta elemen bersejarah bangunan.',
        'Mengumpulkan data historis, arsitektural, dan spasial melalui pengukuran, pemetaan, fotografi, dan dokumentasi digital.',
        'Berpartisipasi dalam penyusunan kajian teknis sebagai dasar pelindungan, pelestarian, dan pemanfaatan rumah bersejarah.',
        'Menyusun rekomendasi teknis penanganan dan pelestarian sesuai prinsip konservasi bangunan cagar budaya.',
      ],
      en: [
        'Performed technical field survey of Napal Putih Historic House.',
        'Documented and evaluated structural woodwork, architectural details, and historical fabric.',
        'Measured, mapped, and photographed architectural and spatial layouts.',
        'Contributed to technical conservation studies supporting heritage protection and reuse.',
        'Formulated conservation treatment guidelines aligned with architectural heritage principles.',
      ],
    },
  },
  {
    id: 'studi-makam-inggris-jitra',
    title: {
      id: 'Studi Teknis Pelestarian Makam Inggris Jitra',
      en: 'Technical Preservation Study — Jitra British Cemetery',
    },
    subtitle: {
      id: 'Inventarisasi & Konservasi Tinggalan Kolonial',
      en: 'Colonial Funerary Heritage Inventory & Conservation',
    },
    year: '2023–2025',
    sortYear: 2024,
    location: 'Kota Bengkulu',
    siteIds: ['bengkulu-kota'],
    category: 'preservation-study',
    tools: ['Pengukuran', 'Pemetaan', 'Fotografi', 'Dokumentasi Digital'],
    deliverables: {
      id: 'Kajian Teknis Pelestarian & Rencana Pengelolaan Situs',
      en: 'Technical Conservation Study & Site Management Plan',
    },
    summary: {
      id: 'Survei teknis, pencatatan elemen penyusun nisan dan struktur, serta penyusunan kajian pelestarian kawasan Makam Inggris Jitra di Kota Bengkulu.',
      en: 'Technical survey and element-by-element condition inventory supporting sustainable preservation of the historic Jitra British Cemetery.',
    },
    highlights: {
      id: [
        'Melaksanakan survei teknis dan identifikasi kondisi eksisting Makam Inggris Jitra.',
        'Melakukan inventarisasi, pendokumentasian, dan penilaian kondisi tinggalan cagar budaya beserta elemen penyusunnya.',
        'Mengumpulkan data arkeologi, historis, arsitektural, dan spasial melalui pengukuran, pemetaan, fotografi, serta dokumentasi digital.',
        'Berpartisipasi dalam penyusunan kajian teknis sebagai dasar pelindungan, pelestarian, dan pengelolaan situs.',
        'Menyusun rekomendasi teknis pelestarian sesuai prinsip konservasi cagar budaya dan kebutuhan pengelolaan situs secara berkelanjutan.',
      ],
      en: [
        'Executed technical field surveys at Jitra British Cemetery.',
        'Inventoried and graded funerary monuments and structural components.',
        'Collected historical, architectural, and spatial datasets via measurement and digital photography.',
        'Co-authored technical documentation for statutory protection and site stewardship.',
        'Prepared sustainable conservation and site management recommendations.',
      ],
    },
  },
  {
    id: 'studi-monumen-thomas-parr',
    title: {
      id: 'Studi Teknis Pelestarian Monumen Thomas Parr',
      en: 'Technical Preservation Study — Thomas Parr Monument',
    },
    subtitle: {
      id: 'Kajian Kondisi Struktur & Elemen Cagar Budaya',
      en: 'Structural Condition Assessment & Heritage Conservation',
    },
    year: '2023–2025',
    sortYear: 2024,
    location: 'Kota Bengkulu',
    siteIds: ['bengkulu-kota'],
    category: 'preservation-study',
    tools: ['Pengukuran Struktur', 'Pemetaan', 'Fotografi', 'Dokumentasi Digital'],
    deliverables: {
      id: 'Kajian Teknis & Rekomendasi Pemanfaatan Berkelanjutan',
      en: 'Technical Conservation Study & Sustainable Utilization Plan',
    },
    summary: {
      id: 'Pendokumentasian arsitektural dan penilaian kondisi struktur Monumen Thomas Parr guna mendukung pelindungan dan pemanfaatan monumen bersejarah secara berkelanjutan.',
      en: 'Architectural recording and structural condition assessment of the Thomas Parr Monument guiding long-term conservation and public stewardship.',
    },
    highlights: {
      id: [
        'Melaksanakan survei teknis dan identifikasi kondisi eksisting Monumen Thomas Parr.',
        'Melakukan inventarisasi, pendokumentasian, dan penilaian kondisi struktur serta elemen cagar budaya.',
        'Mengumpulkan data historis, arkeologis, arsitektural, dan spasial melalui pengukuran, pemetaan, fotografi, serta dokumentasi digital.',
        'Berpartisipasi dalam penyusunan kajian teknis sebagai dasar pelindungan, pelestarian, dan pengelolaan monumen.',
        'Menyusun rekomendasi teknis pelestarian berdasarkan prinsip konservasi cagar budaya untuk mendukung pemanfaatan monumen secara berkelanjutan.',
      ],
      en: [
        'Conducted technical condition surveys at the Thomas Parr Monument.',
        'Assessed masonry structure, decorative elements, and preservation state.',
        'Recorded historical, architectural, and spatial data through mapping and photography.',
        'Contributed technical conservation studies supporting heritage management.',
        'Developed sustainable conservation and public interpretation recommendations.',
      ],
    },
  },
  {
    id: 'studi-benteng-marlborough',
    title: {
      id: 'Studi Kelayakan & Teknis Benteng Marlborough',
      en: 'Feasibility & Technical Study — Fort Marlborough',
    },
    subtitle: {
      id: 'Kajian Pelindungan, Pemugaran & Pengelolaan Kawasan',
      en: 'Preservation, Restoration & Site Management Feasibility',
    },
    year: '2023–2025',
    sortYear: 2024,
    location: 'Kota Bengkulu',
    siteIds: ['bengkulu-kota'],
    category: 'preservation-study',
    tools: ['Survei Struktur & Material', 'Pemetaan Spasial', 'Dokumentasi Digital'],
    deliverables: {
      id: 'Kajian Kelayakan & Kajian Teknis Pemugaran Benteng Marlborough',
      en: 'Feasibility Study & Technical Restoration Framework',
    },
    summary: {
      id: 'Studi kelayakan dan kajian teknis berskala kawasan pada Benteng Marlborough meliputi evaluasi material, struktur benteng, serta kerangka acuan pemugaran dan pemanfaatan berkelanjutan.',
      en: 'Site-wide feasibility and technical evaluation of Fort Marlborough covering masonry diagnostics, structural assessment, and restoration planning.',
    },
    highlights: {
      id: [
        'Melaksanakan survei teknis dan identifikasi kondisi eksisting Benteng Marlborough sebagai dasar studi kelayakan dan pelestarian.',
        'Melakukan inventarisasi, pendokumentasian, serta penilaian kondisi struktur, material, dan elemen cagar budaya.',
        'Mengumpulkan data arkeologis, historis, arsitektural, dan spasial melalui pengukuran, pemetaan, fotografi, dan dokumentasi digital.',
        'Berpartisipasi dalam penyusunan kajian kelayakan dan kajian teknis untuk mendukung pelindungan, pemugaran, serta pengelolaan Benteng Marlborough.',
        'Menyusun rekomendasi teknis sesuai prinsip konservasi cagar budaya sebagai acuan pelestarian dan pemanfaatan kawasan secara berkelanjutan.',
      ],
      en: [
        'Conducted technical baseline surveys at Fort Marlborough.',
        'Evaluated bastion structures, masonry materials, and heritage components.',
        'Compiled archaeological, historical, architectural, and geospatial documentation.',
        'Contributed to feasibility and technical studies guiding restoration and management.',
        'Drafted conservation-compliant recommendations for sustainable regional heritage stewardship.',
      ],
    },
  },
  {
    id: 'masterplan-muaro-jambi-2022',
    title: {
      id: 'Penyusunan Masterplan Kawasan Percandian Muaro Jambi',
      en: 'Masterplan Formulation — Muaro Jambi Temple Complex',
    },
    subtitle: {
      id: 'Survei Lapangan, Data Sosial-Budaya & Basis Data Kawasan',
      en: 'Field Survey, Socio-Cultural Research & Regional Database',
    },
    year: '2022',
    sortYear: 2022,
    location: 'Jambi',
    siteIds: ['muaro-jambi'],
    category: 'inventory-gis',
    featured: false,
    tools: ['Survei Lapangan', 'Wawancara Komunitas', 'Basis Data Riset', 'Validasi Lapangan'],
    deliverables: {
      id: 'Basis Data & Laporan Hasil Survei Masterplan Muaro Jambi',
      en: 'Survey Database & Socio-Spatial Report for Muaro Jambi Masterplan',
    },
    summary: {
      id: 'Survei lapangan dan wawancara masyarakat sekitar Kawasan Percandian Muaro Jambi untuk memetakan aspek sosial, budaya, dan pola pemanfaatan kawasan dalam dokumen masterplan.',
      en: 'Field surveys and community interviews around the Muaro Jambi Temple Complex capturing socio-cultural and land-use data for the area masterplan.',
    },
    highlights: {
      id: [
        'Melaksanakan survei lapangan dan wawancara dengan masyarakat di sekitar Kawasan Percandian Muaro Jambi sebagai bagian dari pengumpulan data masterplan.',
        'Mengumpulkan data sosial, budaya, dan pemanfaatan kawasan untuk mendukung penyusunan masterplan pengelolaan situs.',
        'Melakukan verifikasi, pencatatan, dan pengolahan data hasil survei sesuai metodologi penelitian.',
        'Berkoordinasi dengan tim peneliti dalam pelaksanaan pengumpulan data dan validasi informasi di lapangan.',
        'Mendukung penyusunan basis data dan laporan hasil survei sebagai bahan penyusunan Masterplan Kawasan Percandian Muaro Jambi.',
      ],
      en: [
        'Conducted field surveys and community interviews across the Muaro Jambi Temple Complex buffer zones.',
        'Gathered socio-cultural and site utilization metrics informing management planning.',
        'Verified, logged, and processed field survey data under research protocols.',
        'Coordinated with lead researchers during field validation campaigns.',
        'Supported compilation of the survey database and report for the Muaro Jambi Masterplan.',
      ],
    },
  },
  {
    id: 'ekskavasi-rambahan-2019-2021',
    title: {
      id: 'Ekskavasi Situs Rambahan — Balai Arkeologi Sumatera Utara',
      en: 'Situs Rambahan Excavation — Balai Arkeologi Sumatera Utara',
    },
    subtitle: {
      id: 'Pembukaan Kotak Ekskavasi, Stratigrafi & Pencatatan Artefak',
      en: 'Trench Excavation, Stratigraphy & Artifact Recording',
    },
    year: '2019 & 2021',
    sortYear: 2021,
    location: 'Sumatera Barat',
    siteIds: ['rambahan'],
    category: 'rescue-excavation',
    tools: ['Ekskavasi Stratigrafi', 'Pemetaan Lapangan', 'Analisis Artefak & Ekofak'],
    deliverables: {
      id: 'Dokumentasi Stratigrafi, Inventaris Artefak & Laporan Penelitian',
      en: 'Stratigraphic Records, Artifact Logs & Research Report Contribution',
    },
    summary: {
      id: 'Ekskavasi ilmiah multi-musim (2019 & 2021) di Situs Rambahan bersama tim peneliti Balai Arkeologi Sumatera Utara, mencakup penggalian stratigrafi hingga interpretasi data temuan.',
      en: 'Multi-season scientific excavation (2019 & 2021) at Situs Rambahan with Balai Arkeologi Sumatera Utara, covering stratigraphic digging and artifact analysis.',
    },
    highlights: {
      id: [
        'Berpartisipasi dalam kegiatan ekskavasi arkeologi di Situs Rambahan bersama tim Balai Arkeologi Sumatera Utara.',
        'Melaksanakan survei, pembukaan kotak ekskavasi, penggalian stratigrafi, serta pendokumentasian konteks arkeologi sesuai metode ekskavasi ilmiah.',
        'Melakukan identifikasi awal, pencatatan, pengukuran, dan dokumentasi artefak, ekofak, serta fitur arkeologi yang ditemukan selama ekskavasi.',
        'Membantu pengolahan data lapangan, pemetaan, dan penyusunan dokumentasi teknis sebagai bagian dari laporan penelitian arkeologi.',
        'Berkolaborasi dengan tim peneliti dalam analisis dan interpretasi data untuk mendukung penelitian Situs Rambahan.',
      ],
      en: [
        'Participated in archaeological excavations at Situs Rambahan with Balai Arkeologi Sumatera Utara.',
        'Executed site surveys, test-pit layout, stratigraphic excavation, and contextual recording.',
        'Performed preliminary identification, measurement, and logging of artifacts, ecofacts, and features.',
        'Processed field records, site plans, and technical documentation for research reporting.',
        'Collaborated with researchers on archaeological data interpretation.',
      ],
    },
  },
  {
    id: 'klasifikasi-keramik-arkenas-2021',
    title: {
      id: 'Klasifikasi Keramik di Laboratorium Puslit Arkenas',
      en: 'Ceramic Artifact Classification — Puslit Arkenas Lab',
    },
    subtitle: {
      id: 'Analisis Tipologi, Teknik Pembuatan, Hiasan & Kronologi',
      en: 'Typology, Manufacturing Technique, Decoration & Chronology',
    },
    year: '2021',
    sortYear: 2021,
    location: 'Banten',
    siteIds: ['banten'],
    category: 'rescue-excavation',
    tools: ['Analisis Keramik', 'Tipologi Artefak', 'Katalogisasi Lab'],
    deliverables: {
      id: 'Katalog Klasifikasi Fragmen Keramik & Dokumentasi Teknis',
      en: 'Ceramic Sherd Classification Catalog & Technical Documentation',
    },
    summary: {
      id: 'Penelitian laboratorium berupa pengelompokan dan analisis kronologis fragmen keramik di gudang laboratorium Pusat Penelitian Arkeologi Nasional, Banten.',
      en: 'Laboratory research classifying ceramic sherd assemblages by form, paste, firing technique, glaze, and chronological indicators at Puslit Arkenas, Banten.',
    },
    highlights: {
      id: [
        'Berpartisipasi dalam kegiatan penelitian arkeologi berupa klasifikasi keramik di gudang laboratorium Pusat Penelitian Arkeologi Nasional, Banten.',
        'Melakukan identifikasi awal, pengelompokan, dan klasifikasi fragmen keramik berdasarkan bentuk, bahan, teknik pembuatan, hiasan, dan indikasi kronologi.',
        'Melaksanakan pencatatan, pengukuran, dan dokumentasi temuan keramik sesuai prosedur penelitian laboratorium.',
        'Membantu pengolahan data hasil klasifikasi serta penyusunan dokumentasi teknis sebagai bagian dari laporan penelitian.',
        'Berkolaborasi dengan tim peneliti dalam analisis dan interpretasi data keramik untuk mendukung kajian arkeologi.',
      ],
      en: [
        'Conducted ceramic classification research at the National Archaeological Research Center (Puslit Arkenas) storage lab in Banten.',
        'Sorted and classified ceramic fragments by vessel form, clay fabric, production technique, motif, and chronology.',
        'Measured, cataloged, and photographed specimens under laboratory protocols.',
        'Compiled classification datasets and technical documentation for research publications.',
        'Collaborated with senior researchers on ceramic trade and chronological interpretation.',
      ],
    },
  },
  {
    id: 'magang-puslit-arkenas-2021',
    title: {
      id: 'Magang Arkeologi — Pusat Penelitian Arkeologi Nasional',
      en: 'Archaeology Internship — National Research Center (Puslit Arkenas)',
    },
    subtitle: {
      id: 'Riset Koleksi Laboratorium & Dukungan Ekskavasi Lapangan',
      en: 'Laboratory Collection Research & Field Excavation Support',
    },
    year: '2021',
    sortYear: 2021,
    location: 'Banten & Jakarta',
    siteIds: ['banten', 'jakarta-mrt'],
    category: 'rescue-excavation',
    tools: ['Inventarisasi Koleksi', 'Analisis Artefak', 'Survei & Ekskavasi'],
    deliverables: {
      id: 'Inventarisasi Koleksi & Dokumentasi Teknis Penelitian',
      en: 'Collection Inventory & Research Technical Documentation',
    },
    summary: {
      id: 'Program magang riset di Pusat Penelitian Arkeologi Nasional yang memadukan kerja laboratorium (klasifikasi artefak dan inventarisasi koleksi) dengan dukungan survei dan ekskavasi lapangan.',
      en: 'Research internship at Puslit Arkenas bridging laboratory collection management and ceramic analysis with archaeological field surveys and excavations.',
    },
    highlights: {
      id: [
        'Mendukung pelaksanaan kegiatan penelitian arkeologi di laboratorium dan lapangan.',
        'Melakukan identifikasi, klasifikasi, dan pendokumentasian artefak, khususnya fragmen keramik, sebagai bagian dari pengolahan koleksi penelitian.',
        'Membantu pengolahan data penelitian, inventarisasi koleksi, serta penyusunan dokumentasi teknis dan laporan penelitian.',
        'Berpartisipasi dalam survei, ekskavasi, dan kegiatan penelitian arkeologi sesuai kebutuhan proyek.',
        'Berkolaborasi dengan peneliti dan tenaga teknis dalam mendukung pelaksanaan penelitian serta pengelolaan data arkeologi.',
      ],
      en: [
        'Supported archaeological research initiatives across laboratory and field environments.',
        'Identified, classified, and documented artifacts—particularly ceramic sherds—within research collections.',
        'Processed research data, curated collection inventories, and drafted technical documentation.',
        'Joined field surveys and excavations as project requirements demanded.',
        'Worked alongside researchers and technical specialists in archaeological data management.',
      ],
    },
  },
  {
    id: 'ekskavasi-perahu-kuno-lambur-2019',
    title: {
      id: 'Penelitian Ekskavasi Situs Perahu Kuno Lambur',
      en: 'Excavation Research — Lambur Ancient Boat Site',
    },
    subtitle: {
      id: 'Arkeologi Maritim & Ekskavasi Sisa Perahu Kuno Jambi',
      en: 'Maritime Archaeology & Ancient Vessel Excavation in Jambi',
    },
    year: '2019',
    sortYear: 2019,
    location: 'Tanjung Jabung Timur, Jambi',
    siteIds: ['lambur'],
    category: 'maritime-underwater',
    featured: false,
    tools: ['Ekskavasi Maritim', 'Stratigrafi Basah', 'Pemetaan Temuan', 'Dokumentasi Kayu Kuno'],
    deliverables: {
      id: 'Peta Konteks Perahu Kuno & Kajian Arkeologi Maritim',
      en: 'Ancient Boat Context Maps & Maritime Archaeology Study',
    },
    summary: {
      id: 'Ekskavasi arkeologi maritim terhadap sisa struktur perahu kuno dan artefak asosiatifnya di Situs Lambur, Jambi—menjadi fondasi keahlian arkeologi maritim.',
      en: 'Maritime archaeological excavation of ancient wooden vessel remains and associated artifacts at Situs Lambur, Jambi.',
    },
    highlights: {
      id: [
        'Berpartisipasi dalam kegiatan ekskavasi arkeologi di Situs Perahu Kuno Lambur, Jambi.',
        'Melaksanakan pembukaan kotak ekskavasi, penggalian stratigrafi, serta pendokumentasian konteks temuan sesuai metode ekskavasi arkeologi.',
        'Melakukan identifikasi awal, pencatatan, pengukuran, dan dokumentasi artefak, fitur, serta sisa perahu kuno yang ditemukan selama penelitian.',
        'Membantu pengolahan data lapangan, pemetaan, dan penyusunan dokumentasi teknis sebagai bagian dari laporan penelitian.',
        'Berkolaborasi dengan tim peneliti dalam analisis dan interpretasi data untuk mendukung kajian arkeologi maritim dan pelestarian Situs Perahu Kuno Lambur.',
      ],
      en: [
        'Participated in archaeological excavation at the Lambur Ancient Boat Site, Jambi.',
        'Conducted trench layout, stratigraphic excavation, and contextual recording.',
        'Identified, measured, and documented artifacts, features, and ancient wooden hull remains.',
        'Assisted with spatial mapping and technical report compilation.',
        'Collaborated with research teams to advance maritime archaeology interpretation and site preservation.',
      ],
    },
  },
];

export const EDUCATION: EducationItem[] = [
  {
    id: 'ui-magister',
    degree: {
      id: 'Magister Arkeologi',
      en: 'Master of Archaeology (M.Hum.)',
    },
    institution: 'Universitas Indonesia',
    status: {
      id: 'Sedang Berjalan (On Going)',
      en: 'In Progress (On Going)',
    },
    note: {
      id: 'Fokus penelitian pelestarian warisan budaya dan pemanfaatan teknologi dokumentasi digital & spasial.',
      en: 'Focusing on cultural heritage preservation, spatial GIS analysis, and digital 3D documentation.',
    },
    tier: 'higher',
  },
  {
    id: 'unja-sarjana',
    degree: {
      id: 'Sarjana Arkeologi',
      en: 'Bachelor of Archaeology (S.Hum.)',
    },
    institution: 'Universitas Jambi',
    status: {
      id: 'Lulus — Predikat Cumlaude',
      en: 'Graduated — Cumlaude',
    },
    note: {
      id: 'Aktif dalam riset ekskavasi maritim (Situs Lambur), survei lapangan, serta organisasi kemahasiswaan (HMI & PRAJA UNJA).',
      en: 'Active in maritime excavation research (Lambur Site), field surveys, and student leadership (HMI & PRAJA UNJA).',
    },
    tier: 'higher',
  },
  {
    id: 'smk-batanghari',
    degree: {
      id: 'SMK — Jurusan Teknik Sepeda Motor',
      en: 'Vocational High School — Automotive Engineering',
    },
    institution: 'SMK Batanghari',
    status: {
      id: 'Pendidikan Menengah',
      en: 'Secondary Education',
    },
    tier: 'foundation',
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'cert-selam-a1',
    name: { id: 'Sertifikasi Selam A1', en: 'A1 Diving Certification' },
    category: { id: 'Arkeologi Bawah Air', en: 'Underwater Archaeology' },
    detail: {
      id: 'Kualifikasi dasar penyelaman ilmiah untuk survei dan dokumentasi tinggalan arkeologi bawah air.',
      en: 'Foundational diving qualification for underwater archaeological surveys and documentation.',
    },
  },
  {
    id: 'cert-selam-a2',
    name: { id: 'Sertifikasi Selam A2', en: 'A2 Diving Certification' },
    category: { id: 'Arkeologi Bawah Air', en: 'Underwater Archaeology' },
    detail: {
      id: 'Kualifikasi penyelaman lanjutan mendukung akuisisi fotogrametri bawah air dan inventarisasi situs maritim.',
      en: 'Advanced diving credential supporting underwater photogrammetry and maritime site inventory.',
    },
  },
  {
    id: 'cert-drone',
    name: { id: 'Sertifikasi Pilot Drone (UAV)', en: 'UAV / Drone Pilot Certification' },
    category: { id: 'Akuisisi Spasial Udara', en: 'Aerial Spatial Acquisition' },
    detail: {
      id: 'Sertifikasi pengoperasian wahana udara nirawak untuk pemetaan fotogrametri, orthomosaic, dan DEM/DSM.',
      en: 'Certified UAV operation for heritage photogrammetry, orthomosaic mapping, and DEM/DSM generation.',
    },
  },
  {
    id: 'cert-konservasi-logam',
    name: { id: 'Pelatihan Konservasi Logam', en: 'Metal Conservation Training' },
    category: { id: 'Konservasi Artefak', en: 'Artifact Conservation' },
    detail: {
      id: 'Pelatihan teknis penanganan, stabilisasi, dan konservasi artefak berbahan logam hasil temuan arkeologi.',
      en: 'Technical training in stabilization and conservation treatment of archaeological metal artifacts.',
    },
  },
];

export const SKILL_GROUPS = [
  {
    id: 'digital-spatial',
    title: { id: 'Dokumentasi Digital, GIS & 3D', en: 'Digital Documentation, GIS & 3D' },
    items: {
      id: [
        'Fotogrametri Digital (Agisoft Metashape)',
        'Laser Scanning 3D (Leica BLK360)',
        'Pemetaan UAV / Drone (Orthomosaic, DEM, DSM)',
        'Geographic Information System (QGIS & ArcGIS)',
        'Pengolahan Model 3D & Point Cloud',
        'Virtual Tour 360° & Analisis Data Spasial',
        'Pemetaan Topografi & Zonasi Cagar Budaya',
      ],
      en: [
        'Digital Photogrammetry (Agisoft Metashape)',
        '3D Laser Scanning (Leica BLK360)',
        'UAV / Drone Mapping (Orthomosaic, DEM, DSM)',
        'Geographic Information System (QGIS & ArcGIS)',
        '3D Mesh & Point Cloud Processing',
        '360° Virtual Tours & Spatial Data Analysis',
        'Topographic Mapping & Heritage Zoning',
      ],
    },
  },
  {
    id: 'field-archaeology',
    title: { id: 'Metode Lapangan & Konservasi', en: 'Field Methods & Conservation' },
    items: {
      id: [
        'Survei Arkeologi & Ekskavasi Stratigrafi',
        'Inventarisasi CB & ODCB',
        'Rescue Archaeology (Penyelamatan Tinggalan)',
        'Arkeologi Maritim & Dokumentasi Bawah Air',
        'Analisis Artefak & Klasifikasi Keramik',
        'Penyusunan Kajian Teknis Pelestarian',
        'Penyusunan Laporan Teknis & Ilmiah',
      ],
      en: [
        'Archaeological Survey & Stratigraphic Excavation',
        'Heritage (CB & ODCB) Inventory',
        'Urban Rescue Archaeology',
        'Maritime Archaeology & Underwater Documentation',
        'Artifact Analysis & Ceramic Classification',
        'Technical Heritage Conservation Studies',
        'Scientific & Technical Report Writing',
      ],
    },
  },
  {
    id: 'leadership-soft',
    title: { id: 'Manajemen Proyek & Kolaborasi', en: 'Project Management & Collaboration' },
    items: {
      id: [
        'Manajemen Proyek Pelestarian Cagar Budaya',
        'Koordinasi Pemerintah, Akademisi & Masyarakat',
        'Pengumpulan Data Lapangan (Survei & Wawancara)',
        'Analytical & Critical Thinking',
        'Leadership, Teamwork & Public Speaking',
        'Bahasa: Indonesia (Aktif) & Inggris (Profesional)',
      ],
      en: [
        'Heritage Preservation Project Management',
        'Government, Academic & Community Coordination',
        'Field Data Collection (Survey & Interviews)',
        'Analytical & Critical Thinking',
        'Leadership, Teamwork & Public Speaking',
        'Languages: Indonesian (Native) & English (Professional)',
      ],
    },
  },
];

export const ORGANIZATIONS = [
  { name: 'HMI', full: { id: 'Himpunan Mahasiswa Islam', en: 'Islamic Students Association (HMI)' } },
  { name: 'PRAJA UNJA', full: { id: 'Organisasi Mahasiswa Arkeologi Universitas Jambi', en: 'Universitas Jambi Archaeology Student Association' } },
];

export function filterProjects(
  projects: ProjectItem[],
  category: ProjectCategory,
  searchQuery: string
): ProjectItem[] {
  const normalized = searchQuery.trim().toLowerCase();
  return projects.filter((project) => {
    const matchesCategory = category === 'all' || project.category === category;
    if (!matchesCategory) return false;
    if (!normalized) return true;

    const searchableFields = [
      project.title.id,
      project.title.en,
      project.subtitle.id,
      project.subtitle.en,
      project.location,
      project.year,
      project.summary.id,
      project.summary.en,
      ...project.tools,
    ];
    return searchableFields.some((field) => field.toLowerCase().includes(normalized));
  });
}

export function computePortfolioMetrics(projects: ProjectItem[], sites: HeritageSite[]) {
  const uniqueLocations = new Set(sites.map((s) => s.province));
  return {
    totalProjects: projects.length,
    totalSites: sites.length,
    totalProvinces: uniqueLocations.size,
    yearSpan: '2019–2026',
    certificationsCount: CERTIFICATIONS.length,
  };
}

export function getProjectsForSite(siteId: string, projects: ProjectItem[]): ProjectItem[] {
  return projects.filter((p) => p.siteIds.includes(siteId));
}

/**
 * Projects geographic coordinates (Sumatra & Java viewport: lon 95..115, lat +6..-9)
 * onto an SVG viewBox of 920 x 440.
 */
export function projectGeoToMap(lat: number, lon: number): { x: number; y: number } {
  const minLon = 95.0;
  const maxLon = 115.0;
  const maxLat = 5.8;
  const minLat = -8.8;

  const width = 920;
  const height = 440;
  const padX = 48;
  const padY = 36;

  const nx = (lon - minLon) / (maxLon - minLon);
  const ny = (maxLat - lat) / (maxLat - minLat);

  return {
    x: Number((padX + nx * (width - padX * 2)).toFixed(1)),
    y: Number((padY + ny * (height - padY * 2)).toFixed(1)),
  };
}
