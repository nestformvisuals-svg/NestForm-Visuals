import React from 'react';
import { Concept } from '../types/interior';
import { CONCEPTS } from '../data/conceptsData';
import { Sparkles, IndianRupee, Layers, Download } from 'lucide-react';

interface Props {
  activeConceptId: number;
  onSelectConcept: (id: number) => void;
}

export const ConceptSelector: React.FC<Props> = ({ activeConceptId, onSelectConcept }) => {
  const handleDirectDownload = async (e: React.MouseEvent, c: Concept) => {
    e.stopPropagation();
    try {
      const res = await fetch(c.renderImage);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `NestForm_Concept_0${c.id}_${c.title.replace(/\s+/g, '_')}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch {
      const a = document.createElement('a');
      a.href = c.renderImage;
      a.download = `NestForm_Concept_0${c.id}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#c5a059]" />
          <h3 className="text-xs font-mono-cad tracking-wider uppercase text-neutral-400 font-semibold">
            5 Design Concepts For Compact Indian 2BHK
          </h3>
        </div>
        <span className="text-xs font-mono-cad text-[#c5a059] hidden sm:inline">
          Click any concept to view or hover over thumbnail to download 3D render
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {CONCEPTS.map((c) => {
          const isActive = c.id === activeConceptId;
          return (
            <div
              key={c.id}
              onClick={() => onSelectConcept(c.id)}
              className={`group text-left rounded-xl p-2.5 transition-all relative overflow-hidden border cursor-pointer ${
                isActive
                  ? 'bg-[#1a212b] border-[#d4af37] ring-1 ring-[#d4af37]/40 shadow-xl'
                  : 'bg-[#12161b] border-[#222831] hover:border-[#384250] hover:bg-[#161c23]'
              }`}
            >
              {/* Active Golden Bar */}
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c5a059] to-[#f4d17c]" />
              )}

              {/* Thumbnail Container */}
              <div className="relative aspect-video rounded-lg overflow-hidden mb-2 bg-black/40">
                <img
                  src={c.renderImage}
                  alt={c.title}
                  className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                    isActive ? 'scale-105' : 'opacity-80 group-hover:opacity-100'
                  }`}
                />
                <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[10px] font-mono-cad bg-black/80 backdrop-blur-md text-[#d4af37] border border-white/10 font-bold">
                  0{c.id}
                </span>

                {/* Quick Download Button on Hover */}
                <button
                  onClick={(e) => handleDirectDownload(e, c)}
                  className="absolute bottom-1.5 right-1.5 p-1 rounded-md bg-black/80 hover:bg-[#c5a059] text-white hover:text-black border border-white/20 transition-all opacity-80 group-hover:opacity-100"
                  title="Download this 3D render image directly"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Title & Subtitle */}
              <h4 className={`text-xs font-semibold leading-tight line-clamp-1 ${
                isActive ? 'text-[#f4d17c]' : 'text-neutral-200 group-hover:text-white'
              }`}>
                {c.title}
              </h4>

              <div className="mt-1 flex items-center justify-between text-[10px] text-neutral-400 font-mono-cad">
                <span>10×16 FT</span>
                <span className="text-emerald-400 font-medium">
                  ₹{(c.budgetRangeInr.min / 100000).toFixed(1)}L–{(c.budgetRangeInr.max / 100000).toFixed(1)}L
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
