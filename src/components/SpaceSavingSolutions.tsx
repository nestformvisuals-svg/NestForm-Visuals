import React from 'react';
import { Concept } from '../types/interior';
import { Maximize2, Tv, Utensils, Layout, Sparkles, Sliders, CheckCircle, ShieldCheck } from 'lucide-react';

interface Props {
  concept: Concept;
}

const getSolutionIcon = (iconName: string) => {
  switch (iconName) {
    case 'Tv':
      return <Tv className="w-5 h-5 text-[#c5a059]" />;
    case 'Utensils':
      return <Utensils className="w-5 h-5 text-[#c5a059]" />;
    case 'Layout':
      return <Layout className="w-5 h-5 text-[#c5a059]" />;
    case 'Sparkles':
      return <Sparkles className="w-5 h-5 text-[#c5a059]" />;
    case 'Sliders':
      return <Sliders className="w-5 h-5 text-[#c5a059]" />;
    default:
      return <Maximize2 className="w-5 h-5 text-[#c5a059]" />;
  }
};

export const SpaceSavingSolutions: React.FC<Props> = ({ concept }) => {
  return (
    <div className="bg-[#12161b] rounded-2xl border border-[#2a3038] overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-[#222831] flex flex-wrap items-center justify-between gap-3 bg-[#161c22]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono-cad tracking-wider uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              Space Optimization
            </span>
            <span className="text-xs text-neutral-400 font-mono-cad">
              Tailored for 10 × 16 ft Indian Floorplans
            </span>
          </div>
          <h3 className="text-lg font-serif-luxury font-medium text-neutral-100 mt-1">
            Smart Space-Saving Architectural Engineering
          </h3>
        </div>

        <div className="text-xs font-mono-cad text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-800/40 flex items-center gap-1.5">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>Zero Dead Space | 100% Usable Footprint</span>
        </div>
      </div>

      {/* Solutions Cards Grid */}
      <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        {concept.spaceSavingSolutions.map((sol, index) => (
          <div
            key={index}
            className="bg-[#171d24] rounded-xl border border-[#272e38] p-5 flex flex-col justify-between hover:border-[#c5a059]/50 transition-all hover:shadow-lg shadow-sm"
          >
            <div>
              {/* Header with Icon and Badge */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-[#202732] border border-[#2d3644]">
                  {getSolutionIcon(sol.iconName)}
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-mono-cad bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  {sol.spaceGain}
                </span>
              </div>

              <h4 className="text-base font-semibold text-neutral-100 mb-1">
                {sol.title}
              </h4>

              <div className="text-xs font-mono-cad text-[#d4af37] mb-2.5">
                CAD Spec: {sol.dimensionSpec}
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed font-light mb-3">
                {sol.description}
              </p>
            </div>

            {/* Indian Flat Benefit Callout */}
            <div className="mt-2 p-3 rounded-lg bg-[#0e1216] border border-[#222a36] text-xs text-neutral-300 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-cyan-300">Indian Home Practicality:</strong>{' '}
                {sol.indianFlatBenefit}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
