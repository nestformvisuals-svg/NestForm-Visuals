import React, { useState } from 'react';
import { Ruler, CheckCircle2, AlertTriangle, ArrowRight, Sparkles, Compass, ShieldCheck } from 'lucide-react';

export const RoomDimensionPlanner: React.FC = () => {
  const [lengthFt, setLengthFt] = useState<number>(16);
  const [widthFt, setWidthFt] = useState<number>(10);
  const [ceilingFt, setCeilingFt] = useState<number>(9.5);

  const totalSqFt = lengthFt * widthFt;

  // Ergonomic calculations
  const tvConsoleDepthInches = 14;
  const sofaDepthInches = 34;
  const remainingWalkwayInches = (widthFt * 12) - tvConsoleDepthInches - sofaDepthInches;
  const walkwayFeet = (remainingWalkwayInches / 12).toFixed(1);

  // Clearance safety score
  const isWalkwayGenerous = remainingWalkwayInches >= 36;
  const isWalkwayTight = remainingWalkwayInches < 30;

  // TV size recommendation based on viewing distance
  const viewingDistFeet = (widthFt - 3).toFixed(1);
  const recommendedTvSize = widthFt <= 10 ? '50" – 55" 4K TV' : '55" – 65" 4K TV';

  // Dining recommendation
  const recommendedDining = widthFt <= 10
    ? '42" Round Pedestal Table OR Corner L-Banquette Nook (Saves 15 sq.ft)'
    : '4\'6" Rectangular Slim Quartz Table (Tuck-in Chairs)';

  return (
    <div className="bg-[#12161b] rounded-2xl border border-[#2a3038] overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-[#222831] flex flex-wrap items-center justify-between gap-3 bg-[#161c22]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono-cad tracking-wider uppercase bg-purple-500/20 text-purple-300 border border-purple-500/40">
              Interactive Space Planner
            </span>
            <span className="text-xs text-neutral-400 font-mono-cad">
              Instant Ergonomic Feasibility Check
            </span>
          </div>
          <h3 className="text-lg font-serif-luxury font-medium text-neutral-100 mt-1">
            Indian 2BHK Room Dimension Evaluator
          </h3>
        </div>

        <div className="text-xs font-mono-cad text-[#d4af37] bg-amber-950/30 px-3 py-1.5 rounded-lg border border-amber-900/40">
          Standard Benchmark: 10 × 16 ft (160 sq.ft)
        </div>
      </div>

      <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders Input Panel */}
        <div className="lg:col-span-5 space-y-5 bg-[#171d25] p-5 rounded-xl border border-[#262d38]">
          <h4 className="text-xs font-semibold text-neutral-200 uppercase font-mono-cad tracking-wider flex items-center gap-2">
            <Ruler className="w-4 h-4 text-[#c5a059]" />
            Adjust Your Living-Dining Room Dimensions
          </h4>

          {/* Length Slider */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-neutral-300">Room Length (Spine from Entry to Balcony)</span>
              <span className="font-mono-cad font-bold text-[#c5a059]">{lengthFt} Feet</span>
            </div>
            <input
              type="range"
              min="12"
              max="22"
              step="0.5"
              value={lengthFt}
              onChange={(e) => setLengthFt(parseFloat(e.target.value))}
              className="w-full accent-[#c5a059] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-neutral-500 font-mono-cad mt-0.5">
              <span>12 ft (Tight)</span>
              <span>16 ft (Standard)</span>
              <span>22 ft (Large)</span>
            </div>
          </div>

          {/* Width Slider */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-neutral-300">Room Width (TV to Sofa Wall)</span>
              <span className="font-mono-cad font-bold text-[#c5a059]">{widthFt} Feet</span>
            </div>
            <input
              type="range"
              min="8.5"
              max="14"
              step="0.5"
              value={widthFt}
              onChange={(e) => setWidthFt(parseFloat(e.target.value))}
              className="w-full accent-[#c5a059] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-neutral-500 font-mono-cad mt-0.5">
              <span>8.5 ft (Narrow)</span>
              <span>10.0 ft (Standard)</span>
              <span>14.0 ft (Wide)</span>
            </div>
          </div>

          {/* Ceiling Height */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-neutral-300">Clear Ceiling Height</span>
              <span className="font-mono-cad font-bold text-[#c5a059]">{ceilingFt} Feet</span>
            </div>
            <input
              type="range"
              min="8.5"
              max="11"
              step="0.25"
              value={ceilingFt}
              onChange={(e) => setCeilingFt(parseFloat(e.target.value))}
              className="w-full accent-[#c5a059] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-neutral-500 font-mono-cad mt-0.5">
              <span>8.5 ft (Avoid drop ceiling)</span>
              <span>9.5 ft (Typical flat)</span>
              <span>11 ft (Loft)</span>
            </div>
          </div>

          <div className="pt-3 border-t border-[#252c36] flex items-center justify-between text-xs font-mono-cad text-neutral-400">
            <span>Total Floor Area:</span>
            <span className="text-white font-bold text-sm">{totalSqFt} sq.ft ({(totalSqFt * 0.0929).toFixed(1)} m²)</span>
          </div>
        </div>

        {/* Real-Time Architectural Diagnostics */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Walkway Clearance Status */}
            <div className={`p-4 rounded-xl border ${
              isWalkwayTight
                ? 'bg-rose-950/20 border-rose-800/40 text-rose-200'
                : isWalkwayGenerous
                ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-200'
                : 'bg-amber-950/20 border-amber-800/40 text-amber-200'
            }`}>
              <div className="text-[11px] font-mono-cad uppercase text-neutral-400">Corridor Walkway Clearance</div>
              <div className="text-xl font-bold font-mono-cad mt-1">
                {remainingWalkwayInches}&quot; ({walkwayFeet} ft)
              </div>
              <div className="text-xs mt-1 flex items-center gap-1.5">
                {isWalkwayTight ? (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>Critically narrow! Must use 12&quot; slim TV console and 30&quot; sofa.</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Meets luxury hospitality standard (&gt; 36&quot; clear walking spine).</span>
                  </>
                )}
              </div>
            </div>

            {/* Ceiling Strategy Recommendation */}
            <div className="bg-[#171d25] p-4 rounded-xl border border-[#272f3a]">
              <div className="text-[11px] font-mono-cad uppercase text-neutral-400">Ceiling Strategy</div>
              <div className="text-base font-bold text-white mt-1">
                {ceilingFt <= 9.0 ? 'Perimeter Profile Cove Only' : 'Perimeter False Pocket (6" Drop)'}
              </div>
              <p className="text-xs text-neutral-300 mt-1">
                {ceilingFt <= 9.0
                  ? 'Avoid a full false ceiling drop! It will make the room feel claustrophobic. Use ceiling-recessed LED profiles or magnetic surface tracks.'
                  : 'Sufficient height for a sleek perimeter drywall cove with hidden curtain pelmets and 3000K indirect lighting.'}
              </p>
            </div>
          </div>

          {/* Recommended Furniture Geometries */}
          <div className="bg-[#171d25] p-4 rounded-xl border border-[#272f3a] space-y-3">
            <h5 className="text-xs font-semibold text-neutral-200 uppercase font-mono-cad flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
              Tailored Layout Recommendations for {lengthFt} × {widthFt} ft Space
            </h5>

            <div className="text-xs text-neutral-300 space-y-2">
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] mt-1.5 shrink-0" />
                <span>
                  <strong>Optimal TV Setup:</strong> Wall-mounted <strong>{recommendedTvSize}</strong> over a floating console. Viewing distance of ~{viewingDistFeet} ft provides ideal 4K viewing angle.
                </span>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] mt-1.5 shrink-0" />
                <span>
                  <strong>Dining Geometry:</strong> <strong>{recommendedDining}</strong>. Avoid rigid 4-leg square tables that trap circulation in the entry pathway.
                </span>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] mt-1.5 shrink-0" />
                <span>
                  <strong>Curtain Hanging Trick:</strong> Hang sheer linen curtains from ceiling to floor across the entire window wall. This creates a continuous soft drape that visually widens the room by at least 25%.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
