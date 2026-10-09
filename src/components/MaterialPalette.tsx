import React, { useState } from 'react';
import { Concept, MaterialItem } from '../types/interior';
import { Palette, Sparkles, Check, Info, ShieldCheck, ThermometerSun } from 'lucide-react';

interface Props {
  concept: Concept;
}

export const MaterialPalette: React.FC<Props> = ({ concept }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Wall Finish', 'Wood Tone', 'Flooring', 'Upholstery', 'Lighting', 'Window Dressing', 'Accents'];

  const filteredMaterials = selectedCategory === 'All'
    ? concept.materials
    : concept.materials.filter((m) => m.category === selectedCategory);

  return (
    <div className="bg-[#12161b] rounded-2xl border border-[#2a3038] overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-[#222831] flex flex-wrap items-center justify-between gap-3 bg-[#161c22]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono-cad tracking-wider uppercase bg-[#c5a059]/20 text-[#d4af37] border border-[#c5a059]/40">
              Palette &amp; Finishes
            </span>
            <span className="text-xs text-neutral-400 font-mono-cad">
              Authentic Indian Market Specifications
            </span>
          </div>
          <h3 className="text-lg font-serif-luxury font-medium text-neutral-100 mt-1">
            Material Palette &amp; Architectural Color Scheme
          </h3>
        </div>

        {/* Color Swatch Strip */}
        <div className="flex items-center gap-2 bg-[#0d1115] p-2 rounded-xl border border-[#252b33]">
          {concept.colorPalette.map((col, idx) => (
            <div key={idx} className="group relative">
              <div
                style={{ backgroundColor: col.hex }}
                className="w-7 h-7 rounded-lg border border-white/20 shadow-sm cursor-pointer transition-transform group-hover:scale-110"
              />
              <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-[#1b222c] border border-[#2e3744] rounded-lg shadow-xl text-[11px] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-30">
                <p className="font-semibold text-white">{col.name}</p>
                <p className="text-neutral-400">{col.role}</p>
                <p className="font-mono text-[#c5a059] mt-0.5">{col.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lighting Kelvin Guide Banner */}
      <div className="px-5 py-3.5 bg-gradient-to-r from-amber-950/30 via-[#181f28] to-amber-950/30 border-b border-[#222831] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-neutral-300">
          <ThermometerSun className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong className="text-amber-300">Designer Rule:</strong> Standard builder 6500K cool white creates cold institutional glare. We calibrate to <strong>3000K Warm White (CRI &gt; 90)</strong> for cove profiles and <strong>2700K Soft Amber</strong> for dining drop pendants.
          </span>
        </div>
        <span className="font-mono-cad text-[#c5a059] shrink-0 font-medium">Warmth = Luxury</span>
      </div>

      {/* Category Tabs */}
      <div className="p-4 sm:px-6 sm:py-3 bg-[#141920] border-b border-[#222831] flex items-center gap-2 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-[#c5a059] text-black font-semibold shadow-md'
                : 'bg-neutral-800/80 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700/60'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Material Specification Cards Grid */}
      <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMaterials.map((mat, i) => (
          <div
            key={i}
            className="bg-[#171d24] rounded-xl border border-[#272e38] p-4 flex flex-col justify-between hover:border-[#c5a059]/50 transition-colors shadow-sm group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono-cad uppercase bg-neutral-800 text-neutral-300 border border-neutral-700">
                  {mat.category}
                </span>
                {mat.colorHex && (
                  <div
                    style={{ backgroundColor: mat.colorHex }}
                    className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                    title={mat.colorHex}
                  />
                )}
              </div>

              <h4 className="text-sm font-semibold text-neutral-100 group-hover:text-[#f4d17c] transition-colors leading-snug">
                {mat.name}
              </h4>

              <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed font-light">
                {mat.spec}
              </p>

              {mat.indianMarketCode && (
                <div className="mt-2.5 p-2 rounded-lg bg-[#0e1216] border border-[#202731] text-[11px] font-mono-cad text-emerald-400 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Market Code: {mat.indianMarketCode}</span>
                </div>
              )}
            </div>

            <div className="mt-3 pt-3 border-t border-[#222831]">
              <div className="text-[11px] text-amber-200/90 bg-amber-950/20 p-2 rounded-lg border border-amber-900/30 flex items-start gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#c5a059] shrink-0 mt-0.5" />
                <span>
                  <strong>Why It Looks Expensive:</strong> {mat.luxuryWhy}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
