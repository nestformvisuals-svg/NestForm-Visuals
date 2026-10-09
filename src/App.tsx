/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CONCEPTS } from './data/conceptsData';
import { Concept } from './types/interior';
import { Header } from './components/Header';
import { ConceptSelector } from './components/ConceptSelector';
import { FloorPlanViewer } from './components/FloorPlanViewer';
import { RenderViewer } from './components/RenderViewer';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { MaterialPalette } from './components/MaterialPalette';
import { SpaceSavingSolutions } from './components/SpaceSavingSolutions';
import { BudgetBOQ } from './components/BudgetBOQ';
import { RoomDimensionPlanner } from './components/RoomDimensionPlanner';
import { AiDesignConsultant } from './components/AiDesignConsultant';
import { SpecSheetModal } from './components/SpecSheetModal';
import {
  Sparkles,
  Layers,
  Eye,
  Maximize2,
  Columns,
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  TrendingDown,
  Ruler,
  HelpCircle,
  Home,
  Sliders,
  DollarSign,
  Palette
} from 'lucide-react';

export default function App() {
  const [activeConceptId, setActiveConceptId] = useState<number>(1);
  const [activeNavTab, setActiveNavTab] = useState<string>('showcase');
  const [viewMode, setViewMode] = useState<'3d' | '2d' | 'dual'>('3d');
  const [isSpecSheetOpen, setIsSpecSheetOpen] = useState<boolean>(false);

  const activeConcept: Concept = CONCEPTS.find((c) => c.id === activeConceptId) || CONCEPTS[0];

  return (
    <div className="min-h-screen bg-[#0c0f13] text-[#e8eaed] flex flex-col selection:bg-[#c5a059] selection:text-black">
      {/* Brand Navigation Header */}
      <Header
        onOpenSpecSheet={() => setIsSpecSheetOpen(true)}
        activeTab={activeNavTab}
        setActiveTab={setActiveNavTab}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* HERO TITLE & ARCHITECTURAL BENCHMARK */}
        <section className="bg-gradient-to-b from-[#141920] to-[#0f1318] rounded-3xl border border-[#232a35] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle Decorative Architectural Grid */}
          <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-mono-cad uppercase bg-[#c5a059]/20 text-[#d4af37] border border-[#c5a059]/40 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                NestForm Visuals Design Guide
              </span>
              <span className="text-xs text-neutral-400 font-mono-cad">
                Standard Benchmark: 10 × 16 ft Living-Dining (160 sq.ft)
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold tracking-tight text-white leading-[1.15]">
              5 Ways to Make a Compact Indian 2BHK Look Expensive
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-3xl">
              Intelligent space planning, 3000K indirect cove lighting, authentic Indian materials,
              and space-saving architectural furniture that turn a small Mumbai, Bengaluru, or Delhi
              flat into an attainable luxury haven without an unrealistic budget.
            </p>

            {/* Quick Metrics Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-6 text-xs font-mono-cad text-neutral-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>38&quot; Clear Walking Spine</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>3000K Warm Indirect Glow</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#c5a059]" />
                <span>₹2.4L – ₹4.4L Turnkey BOQ</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Vastu Aligned Spatial Flow</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5 CONCEPTS SELECTOR STRIP */}
        <ConceptSelector
          activeConceptId={activeConceptId}
          onSelectConcept={setActiveConceptId}
        />

        {/* ACTIVE TAB VIEWS */}
        {activeNavTab === 'showcase' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* VIEW MODE TOGGLE (3D Render vs 2D CAD Floor Plan vs Dual Split View) */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#13171e] p-3 rounded-2xl border border-[#222832]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono-cad text-neutral-400 uppercase pl-1">
                  Visualization Layout:
                </span>
                <div className="bg-[#0c0f13] p-1 rounded-xl border border-[#202631] flex items-center gap-1 text-xs">
                  <button
                    onClick={() => setViewMode('3d')}
                    className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
                      viewMode === '3d'
                        ? 'bg-[#c5a059] text-black font-semibold shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>3D Perspective Render</span>
                  </button>

                  <button
                    onClick={() => setViewMode('2d')}
                    className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
                      viewMode === '2d'
                        ? 'bg-[#c5a059] text-black font-semibold shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>2D Architectural Floor Plan</span>
                  </button>

                  <button
                    onClick={() => setViewMode('dual')}
                    className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
                      viewMode === 'dual'
                        ? 'bg-[#c5a059] text-black font-semibold shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Columns className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Dual Synchronized View</span>
                    <span className="sm:hidden">Dual</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono-cad text-neutral-400">
                <span className="text-[#f4d17c] font-semibold">
                  Theme 0{activeConcept.id}: {activeConcept.title}
                </span>
                <span className="hidden md:inline text-neutral-600">|</span>
                <span className="hidden md:inline text-emerald-400">
                  ₹{(activeConcept.budgetRangeInr.min / 100000).toFixed(1)}L – ₹{(activeConcept.budgetRangeInr.max / 100000).toFixed(1)}L
                </span>
              </div>
            </div>

            {/* VISUALIZATION CANVAS (3D / 2D / Dual) */}
            <div className="w-full">
              {viewMode === '3d' && <RenderViewer concept={activeConcept} />}
              {viewMode === '2d' && <FloorPlanViewer concept={activeConcept} />}
              {viewMode === 'dual' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                  <RenderViewer concept={activeConcept} />
                  <FloorPlanViewer concept={activeConcept} />
                </div>
              )}
            </div>

            {/* ARCHITECTURAL CONCEPT NARRATIVE */}
            <section className="bg-[#12161b] rounded-2xl border border-[#2a3038] p-6 sm:p-7 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded text-xs font-mono-cad tracking-wider uppercase bg-[#c5a059]/20 text-[#d4af37] border border-[#c5a059]/40">
                  Architectural Narrative
                </span>
                <span className="text-xs text-neutral-400 font-mono-cad">
                  Space Planning &amp; Design Philosophy
                </span>
              </div>

              <h3 className="text-xl font-serif-luxury font-bold text-white mb-4">
                {activeConcept.subtitle}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                <div className="space-y-4">
                  <div className="bg-[#171d25] p-4 rounded-xl border border-[#262f3a]">
                    <h4 className="text-xs font-semibold text-neutral-100 uppercase font-mono-cad text-[#f4d17c] mb-1">
                      Design Philosophy
                    </h4>
                    <p>{activeConcept.narrative.conceptPhilosophy}</p>
                  </div>

                  <div className="bg-[#171d25] p-4 rounded-xl border border-[#262f3a]">
                    <h4 className="text-xs font-semibold text-neutral-100 uppercase font-mono-cad text-emerald-400 mb-1">
                      Space Planning &amp; Circulation Strategy
                    </h4>
                    <p>{activeConcept.narrative.spacePlanningStrategy}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-[#171d25] p-4 rounded-xl border border-[#262f3a]">
                    <h4 className="text-xs font-semibold text-neutral-100 uppercase font-mono-cad text-amber-300 mb-1">
                      Lighting &amp; Temperature Calibration
                    </h4>
                    <p>{activeConcept.narrative.lightingPhilosophy}</p>
                  </div>

                  <div className="bg-[#171d25] p-4 rounded-xl border border-[#262f3a]">
                    <h4 className="text-xs font-semibold text-neutral-100 uppercase font-mono-cad text-cyan-300 mb-1">
                      Indian Family Durability &amp; Maintenance
                    </h4>
                    <p>{activeConcept.narrative.stylingAndMaintenance}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* MATERIAL & COLOR PALETTE */}
            <MaterialPalette concept={activeConcept} />

            {/* SMART SPACE-SAVING SOLUTIONS */}
            <SpaceSavingSolutions concept={activeConcept} />

            {/* BUDGET CONSCIOUS LUXURY & BILL OF QUANTITIES (BOQ) */}
            <BudgetBOQ concept={activeConcept} />

            {/* BEFORE & AFTER TRANSFORMATION SLIDER (Directly linked) */}
            <BeforeAfterSlider concept={activeConcept} />

            {/* TWO-COLUMN ASSISTIVE TOOLS: ROOM CALCULATOR & AI INTERIOR CONSULTANT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7">
                <RoomDimensionPlanner />
              </div>
              <div className="lg:col-span-5">
                <AiDesignConsultant activeConcept={activeConcept} />
              </div>
            </div>
          </div>
        )}

        {/* TRANSFORMATION TAB (Dedicated Before & After) */}
        {activeNavTab === 'transformation' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <BeforeAfterSlider concept={activeConcept} />
            <div className="bg-[#12161b] rounded-2xl border border-[#2a3038] p-6 shadow-xl">
              <h3 className="text-base font-serif-luxury font-bold text-white mb-2">
                Why Ordinary Compact Indian Flats Feel Small
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed max-w-3xl mb-4 font-light">
                Over 80% of Indian 2BHK apartments in cities like Mumbai, Bengaluru, and Pune suffer
                from the same 3 structural issues: (1) Dark furniture resting directly on the floor
                that chops the continuous tile sightlines, (2) Cool 6500K fluorescent tube lighting
                that exposes every imperfection and creates clinical glare, and (3) Sharp rectangular
                dining tables jutting into the main entrance circulation walkway.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono-cad">
                <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-emerald-300">
                  ✓ Floating joinery preserves 100% of the floor tile plane.
                </div>
                <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/40 text-amber-300">
                  ✓ 3000K Warm White LEDs soften concrete walls and create depth.
                </div>
                <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-cyan-300">
                  ✓ Curved or banquette dining frees 15 sq.ft of walk corridor.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ROOM PLANNER TAB */}
        {activeNavTab === 'planner' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <RoomDimensionPlanner />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-12">
                <AiDesignConsultant activeConcept={activeConcept} />
              </div>
            </div>
          </div>
        )}
        {/* STUDIO CONTACT & CONSULTATION BANNER */}
        <section className="bg-gradient-to-r from-[#171d26] via-[#1c232f] to-[#171d26] rounded-3xl border border-[#2a3442] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono-cad uppercase text-[#d4af37] tracking-wider font-semibold">
                  Get In Touch With NestForm Visuals
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-white">
                Planning Your Compact Indian Home Renovation?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                Whether you have a 10×16 ft living-dining room or an irregular builder layout in Mumbai, Bengaluru, Pune, Delhi NCR, or Hyderabad, we provide custom 2D spatial layouts, 3D photorealistic visualizations, and transparent Indian market BOQ execution estimates.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <a
                href="https://wa.me/919156562467?text=Hi%20NestForm%20Visuals%2C%20I%20am%20interested%20in%20renovating%20my%20compact%20apartment%20living-dining%20space."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:brightness-110 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition-all"
              >
                <span className="text-base">💬</span>
                <span>Chat on WhatsApp (+91 91565 62467)</span>
              </a>

              <div className="flex items-center gap-2">
                <a
                  href="mailto:nestformvisuals@gmail.com"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#212a36] hover:bg-[#2b3746] text-neutral-200 border border-[#344154] text-xs font-mono-cad flex items-center justify-center gap-2 transition-all"
                >
                  <span>✉</span>
                  <span>nestformvisuals@gmail.com</span>
                </a>

                <a
                  href="tel:+919156562467"
                  className="px-4 py-2.5 rounded-xl bg-[#212a36] hover:bg-[#2b3746] text-[#f4d17c] border border-[#344154] text-xs font-mono-cad flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>📞</span>
                  <span>Call Us</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#1e242d] bg-[#0a0d11] py-8 mt-12 text-xs text-neutral-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#1b212a]">
            <div>
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#c5a059]" />
                <span className="font-serif-luxury font-bold text-base text-white">
                  NestForm Visuals
                </span>
                <span className="text-neutral-600">|</span>
                <span className="text-neutral-300">Intelligent Space Planning &amp; Attainable Luxury</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-1 max-w-xl">
                Specialized architectural 2D floor plans, photorealistic 3D visualization, and realistic Indian market interior estimates for compact residential apartments.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs font-mono-cad text-neutral-300">
              <a href="mailto:nestformvisuals@gmail.com" className="hover:text-[#c5a059] flex items-center gap-1.5">
                <span>✉ nestformvisuals@gmail.com</span>
              </a>
              <span className="hidden sm:inline text-neutral-600">•</span>
              <a href="tel:+919156562467" className="hover:text-[#c5a059] flex items-center gap-1.5">
                <span>📞 +91 91565 62467</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-neutral-500 font-mono-cad text-[11px]">
            <div>
              © {new Date().getFullYear()} NestForm Visuals. All rights reserved.
            </div>
            <div className="flex items-center gap-3">
              <span>10×16 FT Baseline</span>
              <span>•</span>
              <span>Vastu &amp; Ergonomics Compliant</span>
              <span>•</span>
              <span>Realistic Indian Market BOQ</span>
            </div>
          </div>
        </div>
      </footer>

      {/* SPEC SHEET MODAL */}
      {isSpecSheetOpen && (
        <SpecSheetModal
          concept={activeConcept}
          onClose={() => setIsSpecSheetOpen(false)}
        />
      )}
    </div>
  );
}
