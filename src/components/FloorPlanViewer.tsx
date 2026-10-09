import React, { useState } from 'react';
import { Concept, FloorPlanItem } from '../types/interior';
import { Eye, Layers, Compass, Maximize, Lightbulb, Navigation, Info } from 'lucide-react';

interface Props {
  concept: Concept;
}

export const FloorPlanViewer: React.FC<Props> = ({ concept }) => {
  const [showCirculation, setShowCirculation] = useState(true);
  const [showLighting, setShowLighting] = useState(true);
  const [showDimensions, setShowDimensions] = useState(true);
  const [selectedItem, setSelectedItem] = useState<FloorPlanItem | null>(null);

  return (
    <div className="bg-[#12161b] rounded-2xl border border-[#2a3038] overflow-hidden shadow-2xl">
      {/* Header Bar */}
      <div className="p-4 sm:p-5 border-b border-[#222831] flex flex-wrap items-center justify-between gap-3 bg-[#161c22]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono-cad tracking-wider uppercase bg-[#c5a059]/20 text-[#d4af37] border border-[#c5a059]/40">
              Architectural CAD View
            </span>
            <span className="text-xs text-neutral-400 font-mono-cad">
              Scale 1:50 | Room 10&apos;0&quot; × 16&apos;0&quot; (160 sq.ft)
            </span>
          </div>
          <h3 className="text-lg font-serif-luxury font-medium text-neutral-100 mt-1">
            2D Spatial Floor Plan &amp; Circulation Layout
          </h3>
        </div>

        {/* Layer Controls */}
        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={() => setShowCirculation(!showCirculation)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              showCirculation
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-neutral-800 text-neutral-400 border border-neutral-700 hover:text-neutral-200'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Circulation Spine</span>
          </button>

          <button
            onClick={() => setShowLighting(!showLighting)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              showLighting
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-neutral-800 text-neutral-400 border border-neutral-700 hover:text-neutral-200'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Electrical &amp; 3000K LEDs</span>
          </button>

          <button
            onClick={() => setShowDimensions(!showDimensions)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              showDimensions
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'bg-neutral-800 text-neutral-400 border border-neutral-700 hover:text-neutral-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>CAD Dimensions</span>
          </button>
        </div>
      </div>

      {/* Main Floor Plan Canvas */}
      <div className="relative p-3 sm:p-6 bg-[#0a0d10] blueprint-grid flex justify-center items-center overflow-x-auto min-h-[460px]">
        {/* Vastu Compass Overlay */}
        <div className="absolute top-4 right-4 bg-[#141a21]/90 backdrop-blur-md p-2 rounded-xl border border-[#2a3038] flex items-center gap-2 pointer-events-none z-10 text-xs font-mono-cad text-neutral-300">
          <Compass className="w-4 h-4 text-[#d4af37]" />
          <span>North ↑ (Balcony East)</span>
        </div>

        {/* SVG Drawing Canvas */}
        <svg
          viewBox="0 0 740 440"
          className="w-full max-w-[700px] h-auto drop-shadow-2xl select-none"
        >
          <defs>
            {/* Structural Wall Hatch */}
            <pattern id="wallHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="8" stroke="#374151" strokeWidth="1.5" />
            </pattern>
            {/* Tile Floor Grid Pattern */}
            <pattern id="tileGrid" width="40" height="20" patternUnits="userSpaceOnUse">
              <rect width="40" height="20" fill="#101419" stroke="#1c232d" strokeWidth="0.7" />
            </pattern>
            {/* Area Rug Texture */}
            <pattern id="rugTexture" width="6" height="6" patternUnits="userSpaceOnUse">
              <path d="M 0 3 L 6 3 M 3 0 L 3 6" stroke="#2e3744" strokeWidth="0.8" />
            </pattern>
          </defs>

          {/* Background Room Floor Plate (10ft x 16ft representation, 1ft ~ 36px) */}
          {/* Main living dining: 16ft length = 576px, 10ft width = 360px */}
          <rect x="70" y="40" width="580" height="340" fill="url(#tileGrid)" rx="2" />

          {/* External Walls with 9-inch Hatch & Concrete Columns */}
          {/* Top Wall (TV Feature Wall Side, 16ft span) */}
          <rect x="50" y="24" width="620" height="16" fill="url(#wallHatch)" stroke="#4b5563" strokeWidth="1.5" />
          {/* Bottom Wall (Sofa & Dining Wall Side) */}
          <rect x="50" y="380" width="440" height="16" fill="url(#wallHatch)" stroke="#4b5563" strokeWidth="1.5" />
          {/* Kitchen / Passage Opening on Bottom Right (100px wide passage) */}
          <rect x="590" y="380" width="80" height="16" fill="url(#wallHatch)" stroke="#4b5563" strokeWidth="1.5" />

          {/* Left Wall (Balcony Opening with 8ft sliding glass door) */}
          <rect x="50" y="24" width="20" height="70" fill="url(#wallHatch)" stroke="#4b5563" strokeWidth="1.5" />
          {/* Balcony Glass Sliding Track */}
          <g>
            <rect x="54" y="94" width="12" height="230" fill="#0d2438" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="6 3" />
            {/* Balcony glass panes */}
            <line x1="57" y1="94" x2="57" y2="210" stroke="#7dd3fc" strokeWidth="2.5" />
            <line x1="63" y1="180" x2="63" y2="324" stroke="#7dd3fc" strokeWidth="2.5" />
            {/* Arrow to Balcony */}
            <text x="32" y="215" fill="#38bdf8" fontSize="10" fontFamily="Space Grotesk" transform="rotate(-90 32 215)" textAnchor="middle">
              BALCONY (5&apos;0&quot; × 10&apos;0&quot;)
            </text>
          </g>
          <rect x="50" y="324" width="20" height="72" fill="url(#wallHatch)" stroke="#4b5563" strokeWidth="1.5" />

          {/* Right Wall (Entrance Foyer & Passage to Bedrooms) */}
          <rect x="650" y="24" width="20" height="120" fill="url(#wallHatch)" stroke="#4b5563" strokeWidth="1.5" />
          {/* Main Entrance Door (3ft Door Swing Arc) */}
          <g>
            <line x1="650" y1="144" x2="650" y2="230" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* Door Leaf */}
            <line x1="650" y1="144" x2="585" y2="144" stroke="#e2e8f0" strokeWidth="2.5" />
            {/* Swing Arc */}
            <path d="M 585 144 A 65 65 0 0 1 650 209" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="4 3" />
            <text x="680" y="190" fill="#94a3b8" fontSize="9" fontFamily="Space Grotesk">
              MAIN DOOR
            </text>
          </g>
          <rect x="650" y="230" width="20" height="166" fill="url(#wallHatch)" stroke="#4b5563" strokeWidth="1.5" />

          {/* Concrete RCC Columns (Structural Pillars in typical Indian Flats) */}
          <rect x="48" y="22" width="24" height="24" fill="#6b7280" stroke="#d1d5db" strokeWidth="1" />
          <rect x="48" y="376" width="24" height="24" fill="#6b7280" stroke="#d1d5db" strokeWidth="1" />
          <rect x="648" y="22" width="24" height="24" fill="#6b7280" stroke="#d1d5db" strokeWidth="1" />
          <rect x="648" y="376" width="24" height="24" fill="#6b7280" stroke="#d1d5db" strokeWidth="1" />

          {/* Passages labels */}
          <text x="545" y="415" fill="#64748b" fontSize="9" fontFamily="Space Grotesk" textAnchor="middle">
            TO KITCHEN &amp; BEDROOMS ↓
          </text>

          {/* AREA RUG */}
          <rect
            x="110"
            y="170"
            width="250"
            height="180"
            fill="url(#rugTexture)"
            stroke="#475569"
            strokeWidth="1.2"
            strokeDasharray="4 2"
            rx="4"
          />
          <text x="235" y="265" fill="#64748b" fontSize="9" fontFamily="Space Grotesk" textAnchor="middle" opacity="0.6">
            AREA RUG (5&apos;0&quot; × 7&apos;0&quot;)
          </text>

          {/* CIRCULATION LAYER (Shows walking corridors and clearances) */}
          {showCirculation && (
            <g className="transition-opacity duration-300">
              {/* Primary Spine Path from Door to Balcony */}
              <path
                d="M 620 180 L 390 180 L 390 270 L 70 270"
                fill="none"
                stroke="#10b981"
                strokeWidth="28"
                strokeOpacity="0.12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 620 180 L 390 180 L 390 270 L 70 270"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                strokeDasharray="8 6"
              />
              {/* Circulation Badges */}
              <rect x="400" y="152" width="130" height="20" rx="4" fill="#064e3b" stroke="#059669" strokeWidth="1" />
              <text x="465" y="166" fill="#6ee7b7" fontSize="9" fontFamily="Space Grotesk" textAnchor="middle" fontWeight="bold">
                ✓ 38&quot; UNIMPEDED SPINE
              </text>

              <rect x="170" y="280" width="130" height="20" rx="4" fill="#064e3b" stroke="#059669" strokeWidth="1" />
              <text x="235" y="294" fill="#6ee7b7" fontSize="9" fontFamily="Space Grotesk" textAnchor="middle" fontWeight="bold">
                ✓ 36&quot; BALCONY CORRIDOR
              </text>
            </g>
          )}

          {/* LIGHTING & ELECTRICAL CAD LAYER */}
          {showLighting && (
            <g className="transition-opacity duration-300">
              {/* TV Accent Wall LED Profile (Continuous 3000K Strip) */}
              <line x1="110" y1="44" x2="350" y2="44" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />
              <line x1="110" y1="44" x2="350" y2="44" stroke="#fef3c7" strokeWidth="1.5" />
              {/* Lighting Badge */}
              <rect x="180" y="48" width="105" height="16" rx="3" fill="#451a03" stroke="#b45309" strokeWidth="1" />
              <text x="232" y="60" fill="#fde68a" fontSize="8" fontFamily="Space Grotesk" textAnchor="middle">
                ★ 3000K INDIRECT COVE
              </text>

              {/* Ceiling Recessed Anti-Glare Spotlights */}
              {[150, 240, 330, 440, 520].map((spotX, i) => (
                <g key={`spot-${i}`}>
                  <circle cx={spotX} cy="110" r="7" fill="#fbbf24" fillOpacity="0.25" stroke="#f59e0b" strokeWidth="1.5" />
                  <circle cx={spotX} cy="110" r="2.5" fill="#ffffff" />
                  <line x1={spotX - 10} y1="110" x2={spotX + 10} y2="110" stroke="#f59e0b" strokeWidth="0.6" strokeDasharray="2 2" />
                </g>
              ))}

              {/* Dining Pendant Drop Center */}
              <g>
                <circle cx="510" cy="235" r="22" fill="#d97706" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
                <circle cx="510" cy="235" r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1" />
                <text x="510" y="270" fill="#fcd34d" fontSize="8" fontFamily="Space Grotesk" textAnchor="middle">
                  PENDANT DROP
                </text>
              </g>
            </g>
          )}

          {/* FURNITURE ELEMENTS (Tailored to Concept) */}
          {/* 1. TV Unit & Accent Feature Wall */}
          <g
            className="cursor-pointer group"
            onClick={() =>
              setSelectedItem({
                id: 'tv-console',
                name: 'Floating Wall-Mounted TV Console',
                dimensions: '7\'0" × 1\'2" (Mounted 14" high)',
                x: 110,
                y: 40,
                width: 240,
                height: 25,
                type: 'tv-unit',
                clearanceNote: 'Consumes only 14 inches of room depth, leaving 8\'10" clear depth for walking.',
                spaceSavingTrick: 'Floating 14" clearance makes floor completely visible, creating spacious illusion.',
              })
            }
          >
            {/* Backing Feature Wall Panel */}
            <rect x="100" y="40" width="260" height="8" fill="#523925" stroke="#c5a059" strokeWidth="1.2" />
            {/* TV Screen representation */}
            <rect x="145" y="42" width="170" height="4" fill="#000000" stroke="#9ca3af" strokeWidth="1" />
            {/* Console Body */}
            <rect
              x="110"
              y="48"
              width="240"
              height="25"
              fill="#2c221a"
              stroke="#d4af37"
              strokeWidth="1.5"
              rx="2"
              className="group-hover:stroke-yellow-300 transition-colors"
            />
            <text x="230" y="65" fill="#f3f4f6" fontSize="9" fontFamily="Space Grotesk" textAnchor="middle" fontWeight="bold">
              FLOATING TV CONSOLE (7&apos;0&quot; × 1&apos;2&quot;)
            </text>
          </g>

          {/* 2. Sofa Unit (Living Lounge) */}
          <g
            className="cursor-pointer group"
            onClick={() =>
              setSelectedItem({
                id: 'sofa-main',
                name: concept.id === 3 ? 'Curved Bouclé Designer Sofa' : 'Tailored 3-Seater Low-Profile Sofa',
                dimensions: '6\'6" × 2\'10" (Depth 34")',
                x: 120,
                y: 300,
                width: 220,
                height: 60,
                type: 'sofa',
                clearanceNote: 'Placed against bottom wall with 4" curtain setback; leaves 42" clear lounge walk zone.',
                spaceSavingTrick: 'Slim 3.5" track arms maximize usable sitting width without expanding overall width.',
              })
            }
          >
            {/* Sofa Backrest */}
            <rect
              x="120"
              y="340"
              width="220"
              height="20"
              fill="#252b33"
              stroke="#64748b"
              strokeWidth="1.2"
              rx="4"
            />
            {/* Sofa Seat Cushion (3 distinct cushions) */}
            <rect x="124" y="300" width="70" height="40" fill="#323a46" stroke="#475569" strokeWidth="1" rx="2" />
            <rect x="196" y="300" width="68" height="40" fill="#323a46" stroke="#475569" strokeWidth="1" rx="2" />
            <rect x="266" y="300" width="70" height="40" fill="#323a46" stroke="#475569" strokeWidth="1" rx="2" />
            {/* Armrests */}
            <rect x="116" y="298" width="10" height="58" fill="#1e232a" stroke="#64748b" strokeWidth="1" rx="2" />
            <rect x="334" y="298" width="10" height="58" fill="#1e232a" stroke="#64748b" strokeWidth="1" rx="2" />
            <text x="230" y="325" fill="#e2e8f0" fontSize="9" fontFamily="Space Grotesk" textAnchor="middle">
              3-SEATER SOFA (6&apos;6&quot; × 2&apos;10&quot;)
            </text>
          </g>

          {/* 3. Coffee Table */}
          <g
            className="cursor-pointer group"
            onClick={() =>
              setSelectedItem({
                id: 'coffee-table',
                name: 'Organic Pedestal Coffee Table',
                dimensions: '2\'4" Diameter',
                x: 200,
                y: 225,
                width: 50,
                height: 50,
                type: 'coffee-table',
                clearanceNote: 'Provides 16" knee clearance from sofa seat edge.',
                spaceSavingTrick: 'Pedestal base has no sharp corner legs, eliminating knee bumps.',
              })
            }
          >
            <circle cx="230" cy="240" r="24" fill="#3b322a" stroke="#c5a059" strokeWidth="1.5" />
            <circle cx="230" cy="240" r="8" fill="#201a14" stroke="#a3823f" strokeWidth="1" />
            <text x="230" y="243" fill="#fef3c7" fontSize="7" fontFamily="Space Grotesk" textAnchor="middle">
              COFFEE
            </text>
          </g>

          {/* 4. Dining Arrangement (Dynamic based on concept) */}
          {concept.id === 2 ? (
            /* Concept 2: Built-in L-Banquette Nook */
            <g
              className="cursor-pointer group"
              onClick={() =>
                setSelectedItem({
                  id: 'dining-banquette',
                  name: 'L-Shaped Storage Banquette Nook',
                  dimensions: '5\'0" × 4\'0" Corner Unit',
                  x: 460,
                  y: 190,
                  width: 120,
                  height: 100,
                  type: 'storage',
                  clearanceNote: 'Hugs the corner wall with zero clearance required behind backrest.',
                  spaceSavingTrick: 'Saves 16 sq.ft of floor space compared to loose chairs; stores 18 cu.ft underneath.',
                })
              }
            >
              {/* L-shaped bench fixed against corner */}
              <path
                d="M 440 280 L 590 280 L 590 170 L 550 170 L 550 250 L 440 250 Z"
                fill="#423120"
                stroke="#c5a059"
                strokeWidth="1.5"
              />
              {/* Cane backrest pattern */}
              <text x="515" y="270" fill="#fde68a" fontSize="8" fontFamily="Space Grotesk" textAnchor="middle">
                BUILT-IN CANE STORAGE BENCH
              </text>
              {/* 36" Round Dining Table */}
              <circle cx="495" cy="210" r="32" fill="#594029" stroke="#d4af37" strokeWidth="1.5" />
              <text x="495" y="213" fill="#ffffff" fontSize="8" fontFamily="Space Grotesk" textAnchor="middle">
                36&quot; TABLE
              </text>
              {/* 2 Outer Chairs */}
              <rect x="430" y="195" width="20" height="20" rx="3" fill="#362516" stroke="#c5a059" strokeWidth="1" />
              <rect x="485" y="150" width="20" height="20" rx="3" fill="#362516" stroke="#c5a059" strokeWidth="1" />
            </g>
          ) : concept.id === 4 ? (
            /* Concept 4: Japandi Flush Storage Wall + Extendable Table */
            <g
              className="cursor-pointer group"
              onClick={() =>
                setSelectedItem({
                  id: 'japandi-dining',
                  name: 'Flush Push-to-Open Storage + Extendable Table',
                  dimensions: 'Cabinet: 7\'0" × 1\'3" | Table: 4\'0" × 2\'8"',
                  x: 440,
                  y: 40,
                  width: 150,
                  height: 180,
                  type: 'storage',
                  clearanceNote: 'Cabinet is recessed to 15" depth; table expands only when hosting.',
                  spaceSavingTrick: 'Zero visual handles; hides vacuum, shoes, and crockery invisibly.',
                })
              }
            >
              {/* Full height flush storage wall on top */}
              <rect x="410" y="40" width="200" height="26" fill="#332c25" stroke="#b49360" strokeWidth="1.5" />
              <line x1="460" y1="40" x2="460" y2="66" stroke="#483d33" strokeWidth="1" />
              <line x1="510" y1="40" x2="510" y2="66" stroke="#483d33" strokeWidth="1" />
              <line x1="560" y1="40" x2="560" y2="66" stroke="#483d33" strokeWidth="1" />
              <text x="510" y="56" fill="#fde68a" fontSize="8" fontFamily="Space Grotesk" textAnchor="middle">
                CONCEALED FLUSH STORAGE (65 CU.FT)
              </text>
              {/* Oak Slat Foyer Divider */}
              <rect x="630" y="40" width="6" height="60" fill="#c5a059" stroke="#927334" strokeWidth="1" />
              <text x="618" y="80" fill="#c5a059" fontSize="7" fontFamily="Space Grotesk" transform="rotate(-90 618 80)">
                SLAT SCREEN
              </text>
              {/* Extendable Dining Table */}
              <rect x="460" y="200" width="85" height="50" rx="3" fill="#4d3e2f" stroke="#c5a059" strokeWidth="1.5" />
              <text x="502" y="230" fill="#ffffff" fontSize="8" fontFamily="Space Grotesk" textAnchor="middle">
                EXTENDABLE OAK
              </text>
              {/* 4 Chairs */}
              <circle cx="480" cy="185" r="10" fill="#332c25" stroke="#c5a059" strokeWidth="1" />
              <circle cx="525" cy="185" r="10" fill="#332c25" stroke="#c5a059" strokeWidth="1" />
              <circle cx="480" cy="265" r="10" fill="#332c25" stroke="#c5a059" strokeWidth="1" />
              <circle cx="525" cy="265" r="10" fill="#332c25" stroke="#c5a059" strokeWidth="1" />
            </g>
          ) : (
            /* Concept 1, 3, 5: Round Pedestal / Slim Quartz Table */
            <g
              className="cursor-pointer group"
              onClick={() =>
                setSelectedItem({
                  id: 'dining-round',
                  name: concept.id === 3 ? 'Slim Quartz Dining Suite (Brushed Brass)' : '42" Circular Dining Suite (Tuck-in Chairs)',
                  dimensions: concept.id === 3 ? '4\'6" × 2\'8"' : '3\'6" Diameter',
                  x: 470,
                  y: 195,
                  width: 90,
                  height: 90,
                  type: 'dining-table',
                  clearanceNote: 'Round shape allows smooth 360-degree circulation; chairs slide 80% underneath.',
                  spaceSavingTrick: 'Eliminates dead corners; frees up 14 inches compared to boxy tables.',
                })
              }
            >
              {/* Mirror wall indicator on side for concept 3 */}
              {concept.id === 3 && (
                <rect x="644" y="150" width="4" height="150" fill="#38bdf8" stroke="#0284c7" strokeWidth="1" />
              )}
              {/* Round Table Top */}
              <circle cx="510" cy="235" r="38" fill="#3d2f24" stroke="#c5a059" strokeWidth="1.8" />
              <circle cx="510" cy="235" r="12" fill="#291f17" stroke="#94743c" strokeWidth="1" />
              <text x="510" y="238" fill="#ffffff" fontSize="8" fontFamily="Space Grotesk" textAnchor="middle" fontWeight="bold">
                {concept.id === 3 ? 'QUARTZ DINING' : '42" ROUND'}
              </text>
              {/* 4 Curved Tuck-in Chairs */}
              <path d="M 470 235 A 15 15 0 0 1 470 205" fill="none" stroke="#d4af37" strokeWidth="5" strokeLinecap="round" />
              <path d="M 550 235 A 15 15 0 0 1 550 265" fill="none" stroke="#d4af37" strokeWidth="5" strokeLinecap="round" />
              <path d="M 495 195 A 15 15 0 0 1 525 195" fill="none" stroke="#d4af37" strokeWidth="5" strokeLinecap="round" />
              <path d="M 495 275 A 15 15 0 0 1 525 275" fill="none" stroke="#d4af37" strokeWidth="5" strokeLinecap="round" />
            </g>
          )}

          {/* Plant Accents */}
          <g>
            <circle cx="85" cy="75" r="14" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
            <circle cx="85" cy="75" r="4" fill="#34d399" />
            <text x="85" y="98" fill="#6ee7b7" fontSize="7" fontFamily="Space Grotesk" textAnchor="middle">
              FIDDLE FIG
            </text>
          </g>

          {/* CAD DIMENSION STRINGS */}
          {showDimensions && (
            <g className="transition-opacity duration-300">
              {/* Overall Length Dimension (Top String: 16'0" / 4880mm) */}
              <line x1="70" y1="14" x2="650" y2="14" stroke="#38bdf8" strokeWidth="1" />
              <line x1="70" y1="8" x2="70" y2="20" stroke="#38bdf8" strokeWidth="1" />
              <line x1="650" y1="8" x2="650" y2="20" stroke="#38bdf8" strokeWidth="1" />
              <rect x="320" y="5" width="80" height="18" rx="2" fill="#082f49" stroke="#0284c7" strokeWidth="0.8" />
              <text x="360" y="17" fill="#7dd3fc" fontSize="9" fontFamily="Space Grotesk" textAnchor="middle" fontWeight="bold">
                16&apos;0&quot; (4880 mm)
              </text>

              {/* Overall Width Dimension (Left String: 10'0" / 3050mm) */}
              <line x1="30" y1="40" x2="30" y2="380" stroke="#38bdf8" strokeWidth="1" />
              <line x1="24" y1="40" x2="36" y2="40" stroke="#38bdf8" strokeWidth="1" />
              <line x1="24" y1="380" x2="36" y2="380" stroke="#38bdf8" strokeWidth="1" />
              <rect x="5" y="195" width="70" height="18" rx="2" fill="#082f49" stroke="#0284c7" strokeWidth="0.8" />
              <text x="40" y="207" fill="#7dd3fc" fontSize="9" fontFamily="Space Grotesk" textAnchor="middle" fontWeight="bold">
                10&apos;0&quot; (3050 mm)
              </text>

              {/* Living Area Zone Tag */}
              <text x="230" y="150" fill="#94a3b8" fontSize="11" fontFamily="Space Grotesk" textAnchor="middle" letterSpacing="2">
                LIVING ZONE (10&apos; × 10&apos;)
              </text>
              {/* Dining Area Zone Tag */}
              <text x="510" y="150" fill="#94a3b8" fontSize="11" fontFamily="Space Grotesk" textAnchor="middle" letterSpacing="2">
                DINING ZONE (6&apos; × 10&apos;)
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Selected Item Inspection Banner / Quick Tips */}
      <div className="p-4 sm:p-5 bg-[#141920] border-t border-[#222831]">
        {selectedItem ? (
          <div className="bg-[#1b222c] p-4 rounded-xl border border-[#c5a059]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in fade-in duration-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-mono-cad bg-[#c5a059]/20 text-[#d4af37]">
                  {selectedItem.dimensions}
                </span>
                <h4 className="text-sm font-semibold text-neutral-100">{selectedItem.name}</h4>
              </div>
              <p className="text-xs text-neutral-300 mt-1">{selectedItem.clearanceNote}</p>
              <p className="text-xs text-emerald-400 mt-0.5 font-medium">
                ★ Space Trick: {selectedItem.spaceSavingTrick}
              </p>
            </div>
            <button
              onClick={() => setSelectedItem(null)}
              className="px-3 py-1 text-xs text-neutral-400 hover:text-white bg-neutral-800 rounded-lg shrink-0"
            >
              Close Info
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-[#c5a059]" />
              <span>
                Tip: Click any furniture element (TV console, sofa, dining table) on the plan to inspect architectural dimensions and space-saving clearances.
              </span>
            </div>
            <span className="font-mono-cad text-neutral-500 hidden sm:inline">Vastu Aligned | 0% Dead Space</span>
          </div>
        )}
      </div>
    </div>
  );
};
