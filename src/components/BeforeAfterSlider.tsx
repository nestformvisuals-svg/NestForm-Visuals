import React, { useState, useRef, useCallback } from 'react';
import { Concept } from '../types/interior';
import { beforeImage } from '../data/conceptsData';
import { ArrowLeftRight, Sparkles, Check, AlertTriangle, Lightbulb, Maximize2, ShieldAlert, Award } from 'lucide-react';

interface Props {
  concept: Concept;
}

export const BeforeAfterSlider: React.FC<Props> = ({ concept }) => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className="bg-[#12161b] rounded-2xl border border-[#2a3038] overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-[#222831] flex flex-wrap items-center justify-between gap-3 bg-[#161c22]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono-cad tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
              Interactive Transformation
            </span>
            <span className="text-xs text-neutral-400 font-mono-cad">
              Slide horizontally to compare
            </span>
          </div>
          <h3 className="text-lg font-serif-luxury font-medium text-neutral-100 mt-1">
            Before vs. After: The Luxury Metamorphosis
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono-cad">
          <span className="text-rose-400 bg-rose-950/40 px-2 py-1 rounded border border-rose-800/40">
            Before: Typical Cluttered Flat
          </span>
          <ArrowLeftRight className="w-3.5 h-3.5 text-neutral-500" />
          <span className="text-emerald-400 bg-emerald-950/40 px-2 py-1 rounded border border-emerald-800/40">
            After: NestForm Luxury Concept
          </span>
        </div>
      </div>

      {/* Interactive Split Slider Canvas */}
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative aspect-video w-full select-none cursor-ew-resize overflow-hidden group"
      >
        {/* AFTER IMAGE (Underneath, full size) */}
        <img
          src={concept.renderImage}
          alt={`After: ${concept.title}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-emerald-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-emerald-500/40 text-xs font-mono-cad font-semibold text-emerald-300 flex items-center gap-1.5 z-10 pointer-events-none">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AFTER: {concept.title}</span>
        </div>

        {/* BEFORE IMAGE (Clipped on top based on sliderPosition) */}
        <div
          style={{ width: `${sliderPosition}%` }}
          className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.6)]"
        >
          {/* We lock the inner image width to 100vw of container to avoid squishing */}
          <div
            style={{
              width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
              height: '100%',
            }}
            className="relative"
          >
            <img
              src={beforeImage}
              alt="Before Renovation - Typical Compact Indian 2BHK"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Dark desaturate hint on before */}
            <div className="absolute inset-0 bg-black/10" />
          </div>

          <div className="absolute top-4 left-4 bg-neutral-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-rose-500/40 text-xs font-mono-cad font-semibold text-rose-300 flex items-center gap-1.5 z-10 pointer-events-none">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>BEFORE: Typical Builder 2BHK</span>
          </div>
        </div>

        {/* Center Drag Handle */}
        <div
          style={{ left: `${sliderPosition}%` }}
          className="absolute inset-y-0 -translate-x-1/2 flex items-center justify-center pointer-events-none z-20"
        >
          <div className="w-9 h-9 rounded-full bg-[#161c22] border-2 border-[#d4af37] text-[#d4af37] shadow-2xl flex items-center justify-center">
            <ArrowLeftRight className="w-4 h-4" />
          </div>
        </div>

        {/* Instructions banner on bottom of slider */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md px-4 py-1 rounded-full border border-white/10 text-[11px] font-mono-cad text-neutral-300 pointer-events-none">
          Drag slider left or right to reveal transformation
        </div>
      </div>

      {/* 4 Architectural Transformation Levers Breakdown */}
      <div className="p-4 sm:p-6 bg-[#141920] border-t border-[#222831]">
        <h4 className="text-sm font-semibold text-neutral-200 tracking-wider uppercase font-mono-cad mb-4 flex items-center gap-2">
          <Award className="w-4 h-4 text-[#c5a059]" />
          4 Key Design Interventions That Make The Space Look Expensive
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Lighting */}
          <div className="bg-[#1b222c] p-4 rounded-xl border border-[#2e3744]">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-2">
              <Lightbulb className="w-4 h-4" />
              <span>1. Lighting Temperature</span>
            </div>
            <div className="text-xs space-y-2">
              <div className="p-2 rounded bg-rose-950/30 border border-rose-900/40 text-rose-300">
                <strong>Before:</strong> Harsh 6500K clinical tubelight washing out textures and exposing surface flaws.
              </div>
              <div className="p-2 rounded bg-emerald-950/30 border border-emerald-900/40 text-emerald-300">
                <strong>After:</strong> 3000K warm indirect cove + wall-grazing LED profiles that create depth and five-star coziness.
              </div>
            </div>
          </div>

          {/* 2. Furniture Clearance */}
          <div className="bg-[#1b222c] p-4 rounded-xl border border-[#2e3744]">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm mb-2">
              <Maximize2 className="w-4 h-4" />
              <span>2. Floor Continuity</span>
            </div>
            <div className="text-xs space-y-2">
              <div className="p-2 rounded bg-rose-950/30 border border-rose-900/40 text-rose-300">
                <strong>Before:</strong> Heavy bulky floor cabinet resting on floor; visible dirt behind and zero walk room.
              </div>
              <div className="p-2 rounded bg-emerald-950/30 border border-emerald-900/40 text-emerald-300">
                <strong>After:</strong> Floating console cantilevered 14&quot; above floor; visible tile planes make room feel 25% larger.
              </div>
            </div>
          </div>

          {/* 3. Wire & Clutter Control */}
          <div className="bg-[#1b222c] p-4 rounded-xl border border-[#2e3744]">
            <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm mb-2">
              <ShieldAlert className="w-4 h-4" />
              <span>3. Wire Concealment</span>
            </div>
            <div className="text-xs space-y-2">
              <div className="p-2 rounded bg-rose-950/30 border border-rose-900/40 text-rose-300">
                <strong>Before:</strong> Tangled nest of TV cables, set-top boxes, and exposed spike busters on the floor.
              </div>
              <div className="p-2 rounded bg-emerald-950/30 border border-emerald-900/40 text-emerald-300">
                <strong>After:</strong> 100% concealed in a false panel cavity with magnetic hatch and recessed power boxes.
              </div>
            </div>
          </div>

          {/* 4. Dining Clearance */}
          <div className="bg-[#1b222c] p-4 rounded-xl border border-[#2e3744]">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-2">
              <Sparkles className="w-4 h-4" />
              <span>4. Dining Circulation</span>
            </div>
            <div className="text-xs space-y-2">
              <div className="p-2 rounded bg-rose-950/30 border border-rose-900/40 text-rose-300">
                <strong>Before:</strong> Sharp rectangular glass table with plastic chairs protruding directly into the walk corridor.
              </div>
              <div className="p-2 rounded bg-emerald-950/30 border border-emerald-900/40 text-emerald-300">
                <strong>After:</strong> Rounded or built-in storage bench layout preserving a clean 38-inch walkway from entry to balcony.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
