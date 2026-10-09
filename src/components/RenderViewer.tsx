import React, { useState } from 'react';
import { Concept, FurnitureHotspot } from '../types/interior';
import { Sparkles, Sun, Moon, Maximize2, X, CheckCircle2, ShieldCheck, Download } from 'lucide-react';

interface Props {
  concept: Concept;
}

export const RenderViewer: React.FC<Props> = ({ concept }) => {
  const [activeHotspot, setActiveHotspot] = useState<FurnitureHotspot | null>(null);
  const [lightingMode, setLightingMode] = useState<'day' | 'evening'>('evening');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadImage = async () => {
    try {
      setIsDownloading(true);
      const response = await fetch(concept.renderImage);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `NestForm_Concept_0${concept.id}_${concept.title.replace(/\s+/g, '_')}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      // Fallback using HTML Image and Canvas
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || 1920;
        canvas.height = img.naturalHeight || 1080;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = `NestForm_Concept_0${concept.id}_${concept.title.replace(/\s+/g, '_')}.jpg`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setDownloadSuccess(true);
          setTimeout(() => setDownloadSuccess(false), 3000);
        }
      };
      img.src = concept.renderImage;
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="bg-[#12161b] rounded-2xl border border-[#2a3038] overflow-hidden shadow-2xl flex flex-col">
      {/* Header Bar */}
      <div className="p-4 sm:p-5 border-b border-[#222831] flex flex-wrap items-center justify-between gap-3 bg-[#161c22]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono-cad tracking-wider uppercase bg-[#c5a059]/20 text-[#d4af37] border border-[#c5a059]/40">
              Photorealistic 3D Render
            </span>
            <span className="text-xs text-neutral-400 font-mono-cad">
              Eye-Level Living to Dining Perspective
            </span>
          </div>
          <h3 className="text-lg font-serif-luxury font-medium text-neutral-100 mt-1">
            {concept.title} — 3D Spatial Visualization
          </h3>
        </div>

        {/* Ambient Lighting Mode Switcher */}
        <div className="flex items-center gap-2">
          <div className="bg-[#0e1216] p-1 rounded-xl border border-[#262c35] flex items-center gap-1">
            <button
              onClick={() => setLightingMode('day')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                lightingMode === 'day'
                  ? 'bg-amber-400/20 text-amber-200 border border-amber-400/40 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Daylight</span>
            </button>
            <button
              onClick={() => setLightingMode('evening')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                lightingMode === 'evening'
                  ? 'bg-[#c5a059]/25 text-[#f4d17c] border border-[#c5a059]/50 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>3000K Cove Warmth</span>
            </button>
          </div>

          <button
            onClick={handleDownloadImage}
            disabled={isDownloading}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-black font-semibold hover:brightness-110 transition-all flex items-center gap-1.5 text-xs font-mono-cad shadow-md disabled:opacity-50"
            title="Download High-Res 3D Render Image"
          >
            {isDownloading ? (
              <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : downloadSuccess ? (
              <CheckCircle2 className="w-4 h-4 text-black" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>{downloadSuccess ? 'Downloaded!' : isDownloading ? 'Downloading...' : 'Download 3D Render'}</span>
          </button>

          <button
            onClick={() => setIsFullscreen(true)}
            className="p-2 rounded-xl bg-[#1a2129] hover:bg-[#252e3a] border border-[#2e3744] text-neutral-300 transition-colors"
            title="Expand Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Render Display Area */}
      <div className="relative aspect-video w-full bg-black overflow-hidden group">
        {/* The 3D Render Image */}
        <img
          src={concept.renderImage}
          alt={concept.title}
          className={`w-full h-full object-cover transition-all duration-700 ${
            lightingMode === 'evening'
              ? 'brightness-95 contrast-105 saturate-110 filter sepia-[0.12]'
              : 'brightness-105 contrast-100 saturate-95'
          }`}
        />

        {/* Lighting Atmosphere Gradient Overlay */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
            lightingMode === 'evening'
              ? 'bg-gradient-to-t from-black/60 via-amber-950/15 to-transparent opacity-90'
              : 'bg-gradient-to-b from-sky-400/5 via-transparent to-black/30 opacity-70'
          }`}
        />

        {/* Brand Stamp */}
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono-cad tracking-wider text-neutral-300 flex items-center gap-1.5 pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
          <span>NESTFORM VISUALS</span>
          <span className="text-neutral-500">|</span>
          <span className="text-[#c5a059]">10×16 FT APARTMENT</span>
        </div>

        {/* Interactive Hotspots */}
        {concept.hotspots.map((hs) => {
          const isActive = activeHotspot?.id === hs.id;
          return (
            <div
              key={hs.id}
              style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <button
                onClick={() => setActiveHotspot(isActive ? null : hs)}
                className={`relative group/btn p-2 rounded-full transition-transform duration-300 hover:scale-125 focus:outline-none ${
                  isActive ? 'scale-125' : ''
                }`}
              >
                {/* Pulse Ring */}
                <span className="absolute inset-0 rounded-full bg-[#d4af37] opacity-60 animate-ping duration-1000" />
                {/* Core Dot */}
                <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-black/80 border-2 border-[#d4af37] text-white shadow-lg text-xs font-bold">
                  <Sparkles className="w-3 h-3 text-[#d4af37]" />
                </span>
              </button>

              {/* Hover/Active Tooltip */}
              {isActive && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-3.5 bg-[#12161b]/95 backdrop-blur-xl border border-[#c5a059]/60 rounded-xl shadow-2xl z-30 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#2a3038] mb-1.5">
                    <span className="text-xs font-semibold text-[#f4d17c] flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                      {hs.label}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveHotspot(null);
                      }}
                      className="text-neutral-400 hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-xs text-neutral-200 leading-relaxed">{hs.detail}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Narrative & Visual Context */}
      <div className="p-4 sm:p-5 bg-[#141920] border-t border-[#222831]">
        <p className="text-sm text-neutral-300 leading-relaxed font-light">
          <strong className="font-semibold text-neutral-100">{concept.subtitle}:</strong>{' '}
          {concept.renderDescription}
        </p>

        {/* Quick Highlights Bar */}
        <div className="mt-4 pt-3 border-t border-[#222831] flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-400">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Full Floor Continuity Under Floating Media Unit</span>
            </span>
            <span className="flex items-center gap-1.5 text-neutral-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>No Sharp Corners on Dining Clearance Path</span>
            </span>
            <span className="flex items-center gap-1.5 text-neutral-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ceiling Recessed Tracks for 11ft Visual Height</span>
            </span>
          </div>

          <span className="font-mono-cad text-[#c5a059]">
            {lightingMode === 'evening' ? '★ 3000K Layered Cove Active' : '☀ Daylight Active'}
          </span>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-neutral-900 border border-neutral-700 text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-6xl w-full max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl border border-neutral-800">
            <img
              src={concept.renderImage}
              alt={concept.title}
              className={`w-full h-full object-contain ${
                lightingMode === 'evening'
                  ? 'brightness-95 contrast-105 saturate-110 filter sepia-[0.12]'
                  : ''
              }`}
            />
          </div>
          <div className="mt-4 text-center">
            <h4 className="text-lg font-serif-luxury text-white">{concept.title}</h4>
            <p className="text-xs text-neutral-400 mt-1 max-w-xl">
              Photorealistic 3D visualization showing seamless living-dining zoning in a compact 10×16 ft Indian apartment.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
