import React, { useState } from 'react';
import { Compass, Sparkles, Printer, FileText, ArrowRight, Share2, Check, Phone, Mail, MessageSquare } from 'lucide-react';

interface Props {
  onOpenSpecSheet: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<Props> = ({ onOpenSpecSheet, activeTab, setActiveTab }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <header className="border-b border-[#222831] bg-[#0c1015]/95 backdrop-blur-md sticky top-0 z-40">
      {/* Top Contact Strip */}
      <div className="bg-[#10141a] border-b border-[#1f2631] px-4 sm:px-6 lg:px-8 py-1.5 text-[11px] font-mono-cad text-neutral-300 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-neutral-400">Interior Consultation Available:</span>
          <span className="text-white font-medium">Pan-India Compact Flat Planning</span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <a
            href="mailto:nestformvisuals@gmail.com"
            className="flex items-center gap-1.5 text-neutral-300 hover:text-[#f4d17c] transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>nestformvisuals@gmail.com</span>
          </a>

          <a
            href="tel:+919156562467"
            className="flex items-center gap-1.5 text-neutral-300 hover:text-[#f4d17c] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>+91 91565 62467</span>
          </a>

          <a
            href="https://wa.me/919156562467?text=Hi%20NestForm%20Visuals%2C%20I%20am%20interested%20in%20renovating%20my%20compact%202BHK."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 hover:bg-emerald-900/80 transition-all font-medium"
          >
            <MessageSquare className="w-3 h-3 text-emerald-400" />
            <span>WhatsApp Us</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c5a059] to-[#8c6b29] p-0.5 shadow-lg shadow-[#c5a059]/20 flex items-center justify-center">
            <div className="w-full h-full bg-[#10141a] rounded-[10px] flex items-center justify-center">
              <Compass className="w-5 h-5 text-[#d4af37]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-serif-luxury font-bold tracking-tight text-neutral-100">
                NESTFORM VISUALS
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono-cad tracking-wider uppercase bg-[#c5a059]/20 text-[#d4af37] border border-[#c5a059]/40 hidden sm:inline">
                Spatial Planning &amp; Attainable Luxury
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 font-mono-cad hidden sm:block">
              5 Ways to Make a Compact Indian 2BHK Look Expensive (10 × 16 ft Living-Dining)
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Navigation Pill Filters */}
          <div className="bg-[#141920] p-1 rounded-xl border border-[#242c37] flex items-center gap-1 text-xs">
            <button
              onClick={() => setActiveTab('showcase')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'showcase'
                  ? 'bg-[#c5a059] text-black font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              5 Concepts
            </button>
            <button
              onClick={() => setActiveTab('transformation')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'transformation'
                  ? 'bg-[#c5a059] text-black font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Before &amp; After
            </button>
            <button
              onClick={() => setActiveTab('planner')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'planner'
                  ? 'bg-[#c5a059] text-black font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Room Calculator
            </button>
          </div>

          {/* Share Live Link Button */}
          <button
            onClick={handleCopyLink}
            className="px-3 py-1.5 rounded-xl bg-[#171e27] hover:bg-[#202936] text-neutral-300 border border-[#2c3746] text-xs font-mono-cad flex items-center gap-1.5 transition-all"
            title="Copy Public Live URL to Share"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#c5a059]" />
                <span className="hidden md:inline">Share Link</span>
              </>
            )}
          </button>

          {/* Export Spec Sheet Button */}
          <button
            onClick={onOpenSpecSheet}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#dfb867] text-black font-semibold text-xs flex items-center gap-1.5 hover:brightness-110 shadow-lg shadow-[#c5a059]/20 transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Print / Export</span>
            <span>Spec Sheet</span>
          </button>
        </div>
      </div>
    </header>
  );
};
