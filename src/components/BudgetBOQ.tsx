import React, { useState } from 'react';
import { Concept } from '../types/interior';
import { IndianRupee, TrendingDown, DollarSign, Calculator, CheckCircle2, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface Props {
  concept: Concept;
}

export const BudgetBOQ: React.FC<Props> = ({ concept }) => {
  const [selectedTier, setSelectedTier] = useState<'Value' | 'Signature' | 'Ultra'>('Signature');

  // Multiplier for tier customizer
  const multiplier = selectedTier === 'Value' ? 0.82 : selectedTier === 'Signature' ? 1.0 : 1.25;

  const totalEstimatedCost = Math.round(
    concept.boq.reduce((acc, item) => acc + item.estimatedCost, 0) * multiplier
  );

  return (
    <div className="bg-[#12161b] rounded-2xl border border-[#2a3038] overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-[#222831] flex flex-wrap items-center justify-between gap-3 bg-[#161c22]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono-cad tracking-wider uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              Transparent Indian BOQ
            </span>
            <span className="text-xs text-neutral-400 font-mono-cad">
              Bill of Quantities &amp; Value Engineering
            </span>
          </div>
          <h3 className="text-lg font-serif-luxury font-medium text-neutral-100 mt-1">
            Budget-Conscious Luxury: Real Indian Market Estimates
          </h3>
        </div>

        {/* Indicative Range Pill */}
        <div className="bg-[#0e1216] px-4 py-2 rounded-xl border border-[#242b36] flex items-center gap-2">
          <div className="text-xs text-neutral-400 text-right">
            <div>Indicative Living-Dining Turnkey</div>
            <div className="text-emerald-400 font-bold font-mono-cad text-sm">
              ₹{(concept.budgetRangeInr.min / 100000).toFixed(1)}L – ₹{(concept.budgetRangeInr.max / 100000).toFixed(1)}L
            </div>
          </div>
        </div>
      </div>

      {/* Tier Switcher Controls */}
      <div className="p-4 sm:px-6 py-3.5 bg-[#161c23] border-b border-[#242b35] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-xs text-neutral-300 flex items-center gap-2">
          <Calculator className="w-4 h-4 text-[#c5a059]" />
          <span>Select Finish &amp; Execution Tier:</span>
        </div>

        <div className="flex items-center gap-2 bg-[#0e1216] p-1 rounded-xl border border-[#272e3a]">
          <button
            onClick={() => setSelectedTier('Value')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedTier === 'Value'
                ? 'bg-neutral-700 text-white shadow-sm font-semibold'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Value Luxury (~₹{Math.round(totalEstimatedCost * 0.82 / 1000)}k)
          </button>

          <button
            onClick={() => setSelectedTier('Signature')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedTier === 'Signature'
                ? 'bg-[#c5a059] text-black shadow-sm font-semibold'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Signature Designer (~₹{Math.round(totalEstimatedCost / 1000)}k)
          </button>

          <button
            onClick={() => setSelectedTier('Ultra')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedTier === 'Ultra'
                ? 'bg-purple-600 text-white shadow-sm font-semibold'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Ultra Luxe (~₹{Math.round(totalEstimatedCost * 1.25 / 1000)}k)
          </button>
        </div>
      </div>

      {/* Smart Material Hacks Section: "What Looks Expensive vs Indian Hack" */}
      <div className="p-4 sm:p-6 border-b border-[#222831] bg-[#14181e]">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold text-neutral-200 uppercase font-mono-cad tracking-wider flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-emerald-400" />
            Smart Material Hacks: How We Save 70%+ Without Losing Luxury
          </h4>
          <span className="text-xs text-emerald-400 font-mono-cad hidden sm:inline">
            Smart Procurement Guide
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {concept.smartHacks.map((hack, idx) => (
            <div
              key={idx}
              className="bg-[#19202a] rounded-xl border border-[#2b3442] p-4 flex flex-col justify-between"
            >
              <div>
                {/* Traditional expensive way */}
                <div className="mb-2 pb-2 border-b border-[#262f3c]">
                  <span className="text-[10px] font-mono-cad text-rose-400 uppercase">Original Luxury Spec</span>
                  <div className="text-xs text-neutral-400 line-through mt-0.5">{hack.luxuryOriginal}</div>
                  <div className="text-xs font-mono-cad text-neutral-500">{hack.originalCost}</div>
                </div>

                {/* Smart Indian Market Hack */}
                <div className="mb-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono-cad text-emerald-400 uppercase">Smart Indian Hack</span>
                    <span className="text-[10px] font-mono-cad px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                      SAVE {hack.savingsPercent}%
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-neutral-100 mt-1">{hack.smartIndianHack}</div>
                  <div className="text-sm font-mono-cad font-bold text-emerald-400 mt-0.5">{hack.hackCost}</div>
                </div>
              </div>

              <div className="mt-2 text-[11px] text-neutral-300 bg-[#0e1216] p-2 rounded border border-[#202731]">
                <strong>Verdict:</strong> {hack.designVerdict}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Itemized Bill of Quantities (BOQ) Table */}
      <div className="p-4 sm:p-6 overflow-x-auto">
        <h4 className="text-sm font-semibold text-neutral-200 uppercase font-mono-cad tracking-wider mb-4 flex items-center gap-2">
          <IndianRupee className="w-4 h-4 text-[#c5a059]" />
          Itemized Bill of Quantities ({selectedTier} Tier)
        </h4>

        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[#2a3038] text-neutral-400 font-mono-cad uppercase text-[11px]">
              <th className="py-2.5 px-3">Scope Item</th>
              <th className="py-2.5 px-3">Description &amp; Specifications</th>
              <th className="py-2.5 px-3">Materials &amp; Brands</th>
              <th className="py-2.5 px-3">Standard Indian Rate</th>
              <th className="py-2.5 px-3 text-right">Est. Cost (₹)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#202630]">
            {concept.boq.map((row, i) => {
              const adjustedCost = Math.round(row.estimatedCost * multiplier);
              return (
                <tr key={i} className="hover:bg-[#181f27] transition-colors">
                  <td className="py-3 px-3 font-semibold text-neutral-100 whitespace-nowrap">
                    {row.component}
                  </td>
                  <td className="py-3 px-3 text-neutral-300 max-w-xs">{row.scope}</td>
                  <td className="py-3 px-3 text-neutral-400">{row.materialUsed}</td>
                  <td className="py-3 px-3 font-mono-cad text-neutral-400 whitespace-nowrap">{row.approxRate}</td>
                  <td className="py-3 px-3 font-mono-cad font-semibold text-neutral-100 text-right whitespace-nowrap">
                    ₹{adjustedCost.toLocaleString('en-IN')}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-[#c5a059]/40 bg-[#171e27]">
              <td colSpan={4} className="py-3.5 px-3 font-semibold text-sm text-neutral-200 uppercase font-mono-cad">
                Total Turnkey Living-Dining Cost ({selectedTier} Tier)
              </td>
              <td className="py-3.5 px-3 text-right font-mono-cad text-base font-bold text-[#f4d17c] whitespace-nowrap">
                ₹{totalEstimatedCost.toLocaleString('en-IN')}*
              </td>
            </tr>
          </tfoot>
        </table>

        <div className="mt-3 text-[11px] text-neutral-400 flex flex-wrap items-center justify-between gap-2">
          <span>*Indicative contractor &amp; procurement rates in Tier 1 Indian metros (Mumbai, Bengaluru, Delhi NCR, Hyderabad, Pune).</span>
          <span className="text-emerald-400 font-mono-cad">Zero Hidden Charges | Realistic Execution Feasibility</span>
        </div>
      </div>
    </div>
  );
};
