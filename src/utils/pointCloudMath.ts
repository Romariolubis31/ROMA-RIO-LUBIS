export type SurveyModelId = 'gunung-padang' | 'benteng-marlborough' | 'lambur-vessel';
export type RenderMode = 'point-cloud' | 'dem-elevation' | 'wireframe-grid';

export interface Point3D {
  x: number;
  y: number;
  z: number;
  elevation: number; // normalized 0..1 for DEM coloring
  layer: number;
}

export interface ProjectedPoint {
  sx: number;
  sy: number;
  depth: number;
  elevation: number;
  layer: number;
  visible: boolean;
}

export interface SurveyModelMeta {
  id: SurveyModelId;
  title: { id: string; en: string };
  site: string;
  instrument: string;
  pointCountLabel: string;
  resolutionLabel: string;
}

export const SURVEY_MODELS: SurveyModelMeta[] = [
  {
    id: 'gunung-padang',
    title: {
      id: 'Punden Berundak (Teras 1–5)',
      en: 'Stepped Megalithic Terraces (1–5)',
    },
    site: 'SCBN Gunung Padang · Cianjur',
    instrument: 'UAV Photogrammetry + Leica BLK360',
    pointCountLabel: '1,420 pts (preview)',
    resolutionLabel: 'GSD 1.8 cm/px · DEM',
  },
  {
    id: 'benteng-marlborough',
    title: {
      id: 'Struktur Bastion & Parapet',
      en: 'Bastion Fortress & Parapet Geometry',
    },
    site: 'Benteng Marlborough · Bengkulu',
    instrument: 'Laser Scanner 3D + Agisoft Metashape',
    pointCountLabel: '1,360 pts (preview)',
    resolutionLabel: '±4 mm Point Accuracy',
  },
  {
    id: 'lambur-vessel',
    title: {
      id: 'Konteks Lambung Perahu & Dasar Laut',
      en: 'Ancient Vessel Hull & Seabed Trench',
    },
    site: 'Situs Lambur & Pulau Tikus',
    instrument: 'Fotogrametri Bawah Air + Stratigrafi',
    pointCountLabel: '1,180 pts (preview)',
    resolutionLabel: '3D Maritime Reconstruction',
  },
];

// Deterministic pseudo-random helper so unit tests & renders stay consistent
function hash01(seed: number): number {
  const s = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return s - Math.floor(s);
}

export function generateSitePointCloud(modelId: SurveyModelId): Point3D[] {
  const points: Point3D[] = [];

  if (modelId === 'gunung-padang') {
    // 5 stepped terraces rising in Z/Y with basalt column perimeter markers
    const terraces = [
      { w: 1.55, d: 1.05, y: -0.45, h: 0.16, step: 0.11 },
      { w: 1.28, d: 0.88, y: -0.22, h: 0.28, step: 0.10 },
      { w: 1.02, d: 0.72, y: 0.0, h: 0.44, step: 0.095 },
      { w: 0.78, d: 0.56, y: 0.22, h: 0.62, step: 0.09 },
      { w: 0.54, d: 0.42, y: 0.44, h: 0.82, step: 0.085 },
    ];

    let idx = 1;
    terraces.forEach((t, tIdx) => {
      for (let x = -t.w; x <= t.w + 0.001; x += t.step) {
        for (let z = -t.d; z <= t.d + 0.001; z += t.step) {
          idx += 1;
          const isEdge =
            Math.abs(x) > t.w - t.step * 1.3 || Math.abs(z) > t.d - t.step * 1.3;
          const jitter = (hash01(idx) - 0.5) * 0.035;
          const pillarBoost = isEdge && hash01(idx * 3) > 0.58 ? 0.09 : 0;
          const yVal = -0.35 + t.h + pillarBoost + jitter;
          const elev = Math.min(1, Math.max(0, t.h + pillarBoost));
          points.push({
            x: x * 0.85,
            y: yVal,
            z: z * 0.85 + t.y * 0.35,
            elevation: elev,
            layer: tIdx,
          });
        }
      }
    });
    return points;
  }

  if (modelId === 'benteng-marlborough') {
    // Square bastion fort with protruding diamond corner bastions and central courtyard
    let idx = 100;
    const gridStep = 0.095;
    for (let x = -1.35; x <= 1.35; x += gridStep) {
      for (let z = -1.35; z <= 1.35; z += gridStep) {
        idx += 1;
        const ax = Math.abs(x);
        const az = Math.abs(z);
        const inMainWall =
          (ax >= 0.65 && ax <= 0.92 && az <= 0.92) ||
          (az >= 0.65 && az <= 0.92 && ax <= 0.92);
        const inCornerBastion =
          ax >= 0.72 && az >= 0.72 && ax + az <= 2.28;
        const inCourtyard = ax < 0.62 && az < 0.62;

        if (!inMainWall && !inCornerBastion && !inCourtyard) continue;

        let height = 0.12;
        let layer = 0;
        if (inMainWall) {
          height = 0.68 + (hash01(idx) - 0.5) * 0.04;
          layer = 2;
        } else if (inCornerBastion) {
          height = 0.76 + (hash01(idx * 2) - 0.5) * 0.05;
          layer = 3;
        } else {
          height = 0.14 + (hash01(idx) - 0.5) * 0.025;
          layer = 1;
        }
        points.push({
          x: x * 0.9,
          y: -0.32 + height,
          z: z * 0.9,
          elevation: Math.min(1, height),
          layer,
        });
      }
    }
    return points;
  }

  // lambur-vessel: Seabed terrain contour + curved ancient wooden boat hull ribs
  let idx = 500;
  for (let x = -1.3; x <= 1.3; x += 0.11) {
    for (let z = -0.85; z <= 0.85; z += 0.11) {
      idx += 1;
      const wave = Math.sin(x * 2.2) * 0.05 + Math.cos(z * 3.0) * 0.04;
      const seabedY = -0.38 + wave + (hash01(idx) - 0.5) * 0.025;
      points.push({
        x,
        y: seabedY,
        z,
        elevation: 0.18 + wave * 2,
        layer: 0,
      });
    }
  }

  // Curved hull planking & ribs
  for (let u = -1.05; u <= 1.05; u += 0.065) {
    const halfBeam = Math.max(0.06, 0.44 * (1 - (u / 1.12) ** 2));
    for (let v = -1; v <= 1; v += 0.14) {
      idx += 1;
      const z = v * halfBeam;
      const keelCurve = (v * v) * 0.24 + (u * u) * 0.12;
      const y = -0.22 + keelCurve + (hash01(idx) - 0.5) * 0.015;
      points.push({
        x: u,
        y,
        z,
        elevation: Math.min(1, 0.45 + keelCurve * 1.4),
        layer: Math.abs(v) > 0.75 ? 2 : 1,
      });
    }
  }

  return points;
}

export function projectPoint3D(
  pt: Point3D,
  yawRad: number,
  pitchRad: number,
  width: number,
  height: number,
  zoom = 1
): ProjectedPoint {
  const cosY = Math.cos(yawRad);
  const sinY = Math.sin(yawRad);
  const cosP = Math.cos(pitchRad);
  const sinP = Math.sin(pitchRad);

  // Rotate around Y (yaw)
  const rx = pt.x * cosY - pt.z * sinY;
  const rz1 = pt.x * sinY + pt.z * cosY;

  // Rotate around X (pitch)
  const ry = pt.y * cosP - rz1 * sinP;
  const rz = pt.y * sinP + rz1 * cosP;

  const cameraDist = 3.2;
  const depth = cameraDist + rz;
  if (depth <= 0.35) {
    return { sx: 0, sy: 0, depth, elevation: pt.elevation, layer: pt.layer, visible: false };
  }

  const scale = (Math.min(width, height) * 0.98 * zoom) / depth;
  return {
    sx: width / 2 + rx * scale,
    sy: height / 2 - ry * scale,
    depth,
    elevation: pt.elevation,
    layer: pt.layer,
    visible: true,
  };
}
