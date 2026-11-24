import { useEffect, useMemo, useRef, useState } from 'react';
import { Pause, Play, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import {
  SURVEY_MODELS,
  generateSitePointCloud,
  projectPoint3D,
  type RenderMode,
  type SurveyModelId,
} from '../utils/pointCloudMath';
import type { Language } from '../utils/portfolioData';

interface PointCloudShowcaseProps {
  lang: Language;
}

function getElevationColor(elevation: number, mode: RenderMode): string {
  if (mode === 'wireframe-grid') {
    const shade = Math.round(145 + elevation * 95);
    return `rgb(${Math.round(shade * 0.55)}, ${Math.round(shade * 0.78)}, ${shade})`;
  }
  if (mode === 'dem-elevation') {
    // Cartographic hypsometric tint: deep slate-blue -> cyan-teal -> warm amber -> peak cream
    if (elevation < 0.3) return '#2563EB';
    if (elevation < 0.55) return '#0EA5E9';
    if (elevation < 0.78) return '#10B981';
    return '#F59E0B';
  }
  // point-cloud: natural basalt / stone / survey white
  const lum = Math.round(160 + elevation * 85);
  return `rgb(${lum}, ${Math.min(255, lum + 5)}, ${Math.min(255, lum + 12)})`;
}

export function PointCloudShowcase({ lang }: PointCloudShowcaseProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedModel, setSelectedModel] = useState<SurveyModelId>('gunung-padang');
  const [renderMode, setRenderMode] = useState<RenderMode>('dem-elevation');
  const [autoRotate, setAutoRotate] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return false;
    }
    return true;
  });
  const [zoom, setZoom] = useState(1);

  const rotationRef = useRef({ yaw: 0.62, pitch: 0.48 });
  const dragRef = useRef<{ active: boolean; lastX: number; lastY: number }>({
    active: false,
    lastX: 0,
    lastY: 0,
  });

  const points = useMemo(() => generateSitePointCloud(selectedModel), [selectedModel]);
  const activeMeta = useMemo(
    () => SURVEY_MODELS.find((m) => m.id === selectedModel) ?? SURVEY_MODELS[0],
    [selectedModel]
  );

  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new IntersectionObserver(
      (entries) => {
        isVisibleRef.current = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  const renderScene = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const cssW = Math.max(320, Math.floor(rect.width));
    const cssH = Math.max(260, Math.floor(rect.height));

    if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
      canvas.width = cssW * dpr;
      canvas.height = cssH * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Clean dark blueprint survey background
    ctx.fillStyle = '#0B1120';
    ctx.fillRect(0, 0, cssW, cssH);

    // Subtle cartographic grid lines
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.08)';
    ctx.lineWidth = 1;
    const step = 36;
    ctx.beginPath();
    for (let gx = step; gx < cssW; gx += step) {
      ctx.moveTo(gx, 0);
      ctx.lineTo(gx, cssH);
    }
    for (let gy = step; gy < cssH; gy += step) {
      ctx.moveTo(0, gy);
      ctx.lineTo(cssW, gy);
    }
    ctx.stroke();

    const projected = points
      .map((pt) =>
        projectPoint3D(
          pt,
          rotationRef.current.yaw,
          rotationRef.current.pitch,
          cssW,
          cssH,
          zoom
        )
      )
      .filter((p) => p.visible);

    projected.sort((a, b) => b.depth - a.depth);

    if (renderMode === 'wireframe-grid') {
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.lineWidth = 0.75;
      ctx.beginPath();
      for (let i = 0; i < projected.length - 1; i += 2) {
        const a = projected[i];
        const b = projected[i + 1];
        const dist = Math.hypot(a.sx - b.sx, a.sy - b.sy);
        if (dist < 26) {
          ctx.moveTo(a.sx, a.sy);
          ctx.lineTo(b.sx, b.sy);
        }
      }
      ctx.stroke();
    }

    const size = renderMode === 'dem-elevation' ? 3.5 : 2.8;
    const half = size / 2;
    for (const p of projected) {
      ctx.fillStyle = getElevationColor(p.elevation, renderMode);
      ctx.fillRect(p.sx - half, p.sy - half, size, size);
    }

    ctx.restore();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initial immediate render
    renderScene(canvas, ctx);

    if (!autoRotate) return;

    let animId = 0;
    let lastDraw = performance.now();

    const tick = (now: number) => {
      animId = requestAnimationFrame(tick);
      if (!isVisibleRef.current || dragRef.current.active) return;
      const elapsed = now - lastDraw;
      if (elapsed < 42) return; // ~24fps smooth survey rotation
      lastDraw = now;
      rotationRef.current.yaw += (elapsed / 1000) * 0.28;
      renderScene(canvas, ctx);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [points, renderMode, autoRotate, zoom]);

  const redrawOnce = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    renderScene(canvas, ctx);
  };

  const resetCamera = () => {
    rotationRef.current = { yaw: 0.62, pitch: 0.48 };
    setZoom(1);
    if (!autoRotate) redrawOnce();
  };

  const modeLabels: Record<RenderMode, { id: string; en: string }> = {
    'dem-elevation': { id: 'DEM Elevasi', en: 'DEM Elevation' },
    'point-cloud': { id: 'Point Cloud', en: 'Point Cloud' },
    'wireframe-grid': { id: 'Mesh Topografi', en: 'Topo Mesh' },
  };

  return (
    <section className="border-b border-slate-200 bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold tracking-wide text-blue-700">
              {lang === 'id' ? '01. Simulasi Dokumentasi Spasial 3D' : '01. Interactive 3D Spatial Preview'}
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl text-balance">
              {lang === 'id'
                ? 'Dari Akuisisi Lapangan Menjadi Kembaran Digital 3D'
                : 'From Field Acquisition to 3D Heritage Models'}
            </h2>
          </div>
          <p className="max-w-md text-sm text-slate-600">
            {lang === 'id'
              ? 'Pratinjau interaktif representasi geometri point cloud dan elevasi DEM hasil alur kerja fotogrametri & pemindaian laser 3D. Seret kanvas untuk memutar sudut pandang.'
              : 'Interactive preview illustrating point-cloud geometry and DEM elevation outputs from photogrammetry & laser scanning workflows. Drag canvas to orbit.'}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Interactive 3D Canvas Viewport */}
          <div className="lg:col-span-8 flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-[#0B1120]">
            {/* Top Viewport Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 px-4 py-3 text-xs text-slate-300">
              <div className="flex items-center gap-2 font-mono tabular-nums">
                <span className="font-semibold text-white">{activeMeta.site}</span>
                <span className="text-slate-600" aria-hidden="true">
                  ·
                </span>
                <span className="text-slate-400">{activeMeta.resolutionLabel}</span>
              </div>

              <div className="flex items-center gap-1.5">
                {(['dem-elevation', 'point-cloud', 'wireframe-grid'] as RenderMode[]).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setRenderMode(mode)}
                    aria-pressed={renderMode === mode}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      renderMode === mode
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {modeLabels[mode][lang]}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative h-[340px] sm:h-[390px] w-full">
              <canvas
                ref={canvasRef}
                data-testid="point-cloud-canvas"
                aria-label={
                  lang === 'id'
                    ? `Visualisasi 3D interaktif untuk ${activeMeta.site}`
                    : `Interactive 3D visualization for ${activeMeta.site}`
                }
                onPointerDown={(e) => {
                  dragRef.current = { active: true, lastX: e.clientX, lastY: e.clientY };
                  e.currentTarget.setPointerCapture(e.pointerId);
                }}
                onPointerMove={(e) => {
                  if (!dragRef.current.active) return;
                  const dx = e.clientX - dragRef.current.lastX;
                  const dy = e.clientY - dragRef.current.lastY;
                  dragRef.current.lastX = e.clientX;
                  dragRef.current.lastY = e.clientY;
                  rotationRef.current.yaw += dx * 0.01;
                  rotationRef.current.pitch = Math.max(
                    -1.15,
                    Math.min(1.15, rotationRef.current.pitch + dy * 0.01)
                  );
                  if (!autoRotate) redrawOnce();
                }}
                onPointerUp={(e) => {
                  dragRef.current.active = false;
                  if (e.currentTarget.hasPointerCapture(e.pointerId)) {
                    e.currentTarget.releasePointerCapture(e.pointerId);
                  }
                }}
                className="h-full w-full cursor-grab active:cursor-grabbing touch-none"
              />

              {/* Bottom Controls Overlay */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-3">
                <div className="pointer-events-auto flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-900/90 p-1">
                  <button
                    type="button"
                    onClick={() => setAutoRotate((prev) => !prev)}
                    aria-label={
                      autoRotate
                        ? lang === 'id'
                          ? 'Jeda rotasi otomatis'
                          : 'Pause auto rotation'
                        : lang === 'id'
                          ? 'Putar otomatis'
                          : 'Resume auto rotation'
                    }
                    className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-slate-200 hover:bg-slate-800 cursor-pointer"
                  >
                    {autoRotate ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                    <span>{autoRotate ? (lang === 'id' ? 'Jeda' : 'Pause') : lang === 'id' ? 'Putar' : 'Rotate'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoom((z) => Math.min(1.5, Number((z + 0.15).toFixed(2))))}
                    aria-label={lang === 'id' ? 'Perbesar tampilan 3D' : 'Zoom in 3D view'}
                    className="rounded-md p-1.5 text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer"
                  >
                    <ZoomIn className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoom((z) => Math.max(0.7, Number((z - 0.15).toFixed(2))))}
                    aria-label={lang === 'id' ? 'Perkecil tampilan 3D' : 'Zoom out 3D view'}
                    className="rounded-md p-1.5 text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer"
                  >
                    <ZoomOut className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={resetCamera}
                    aria-label={lang === 'id' ? 'Reset sudut kamera 3D' : 'Reset 3D camera'}
                    className="rounded-md p-1.5 text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="hidden sm:block font-mono text-[11px] text-slate-400 tabular-nums">
                  {activeMeta.pointCountLabel} · {modeLabels[renderMode][lang]}
                </div>
              </div>
            </div>
          </div>

          {/* Right Model Selector & Workflow Column */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                {lang === 'id' ? 'Pilih Model Referensi Situs' : 'Select Site Reference Model'}
              </h3>
              <div className="mt-3 flex flex-col gap-2.5">
                {SURVEY_MODELS.map((model) => {
                  const isActive = model.id === selectedModel;
                  return (
                    <button
                      key={model.id}
                      type="button"
                      onClick={() => setSelectedModel(model.id)}
                      aria-pressed={isActive}
                      className={`w-full rounded-xl border p-4 text-left transition-colors duration-150 cursor-pointer ${
                        isActive
                          ? 'border-blue-600 bg-blue-50/70'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-sm font-semibold text-slate-900">{model.title[lang]}</div>
                      <div className="mt-1 text-xs text-slate-600">{model.site}</div>
                      <div className="mt-1.5 font-mono text-[11px] text-slate-500">{model.instrument}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-5">
              <h3 className="text-sm font-semibold text-slate-900">
                {lang === 'id' ? 'Standar Keluaran Teknis' : 'Technical Output Standards'}
              </h3>
              <ul className="mt-3 space-y-2 text-xs leading-relaxed text-slate-600">
                <li>
                  <strong className="font-semibold text-slate-800">Orthomosaic & DEM/DSM:</strong>{' '}
                  {lang === 'id'
                    ? 'Pengolahan foto udara UAV via Agisoft Metashape untuk peta ortorektifikasi.'
                    : 'Aerial UAV processing in Agisoft Metashape for orthorectified surface maps.'}
                </li>
                <li>
                  <strong className="font-semibold text-slate-800">Point Cloud & Mesh 3D:</strong>{' '}
                  {lang === 'id'
                    ? 'Integrasi pemindaian laser Leica BLK360 dan kontrol kualitas geometri.'
                    : 'Leica BLK360 terrestrial laser scanning with strict geometric QC.'}
                </li>
                <li>
                  <strong className="font-semibold text-slate-800">QGIS & ArcGIS:</strong>{' '}
                  {lang === 'id'
                    ? 'Analisis spasial, peta tematik sebaran CB/ODCB, dan zonasi kawasan.'
                    : 'Spatial analysis, CB/ODCB distribution cartography, and preservation zoning.'}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
