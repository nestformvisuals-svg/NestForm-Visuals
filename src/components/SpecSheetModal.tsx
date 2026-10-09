import React, { useState } from 'react';
import { Concept } from '../types/interior';
import { X, Printer, Compass, CheckCircle2, IndianRupee, Download, FileText, Check, AlertCircle } from 'lucide-react';

interface Props {
  concept: Concept;
  onClose: () => void;
}

export const SpecSheetModal: React.FC<Props> = ({ concept, onClose }) => {
  const [downloadingDoc, setDownloadingDoc] = useState(false);
  const [downloadingImage, setDownloadingImage] = useState(false);
  const [docDownloaded, setDocDownloaded] = useState(false);
  const [imgDownloaded, setImgDownloaded] = useState(false);
  const [printNotice, setPrintNotice] = useState<string | null>(null);

  const totalCost = concept.boq.reduce((acc, item) => acc + item.estimatedCost, 0);

  // Convert render image to blob & trigger direct download
  const handleDownloadRender = async () => {
    try {
      setDownloadingImage(true);
      const res = await fetch(concept.renderImage);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `NestForm_Concept_0${concept.id}_3D_Render.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 10000);
      setImgDownloaded(true);
      setTimeout(() => setImgDownloaded(false), 3000);
    } catch (e) {
      // Canvas fallback
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
          const a = document.createElement('a');
          a.href = dataUrl;
          a.download = `NestForm_Concept_0${concept.id}_3D_Render.jpg`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setImgDownloaded(true);
          setTimeout(() => setImgDownloaded(false), 3000);
        }
      };
      img.src = concept.renderImage;
    } finally {
      setDownloadingImage(false);
    }
  };

  // Generate and download a standalone, high-res HTML/PDF-ready spec sheet
  const handleDownloadSpecSheet = () => {
    try {
      setDownloadingDoc(true);

      const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>NestForm Visuals — Spec Sheet Concept 0${concept.id}: ${concept.title}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');
    body {
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      margin: 0;
      padding: 32px;
      color: #111827;
      background: #ffffff;
      line-height: 1.5;
    }
    .header {
      border-bottom: 2px solid #c5a059;
      padding-bottom: 16px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .brand-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 24px;
      font-weight: 700;
      color: #111827;
      margin: 0;
    }
    .brand-sub {
      font-size: 11px;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 4px;
    }
    .project-meta {
      text-align: right;
      font-size: 11px;
      color: #4b5563;
      font-family: monospace;
    }
    .concept-hero {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .concept-title {
      font-family: 'Playfair Display', serif;
      font-size: 20px;
      font-weight: 700;
      margin: 0;
      color: #1f2937;
    }
    .concept-sub {
      font-size: 12px;
      color: #4b5563;
      margin-top: 4px;
    }
    .budget-pill {
      background: #ecfdf5;
      border: 1px solid #a7f3d0;
      color: #065f46;
      padding: 8px 16px;
      border-radius: 8px;
      font-weight: 700;
      font-size: 15px;
      text-align: right;
    }
    .render-container {
      margin-bottom: 24px;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #e5e7eb;
    }
    .render-img {
      width: 100%;
      height: auto;
      display: block;
    }
    .section-title {
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #374151;
      margin: 24px 0 12px 0;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 6px;
    }
    .grid-5 {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 12px;
      margin-bottom: 20px;
    }
    .swatch-card {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 10px;
      background: #fafafa;
    }
    .swatch-color {
      height: 36px;
      border-radius: 4px;
      margin-bottom: 8px;
      border: 1px solid rgba(0,0,0,0.1);
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 20px;
    }
    .clearance-card {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 12px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
      margin-bottom: 24px;
    }
    th {
      background: #f3f4f6;
      border-bottom: 2px solid #d1d5db;
      text-align: left;
      padding: 8px 12px;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 11px;
    }
    td {
      padding: 8px 12px;
      border-bottom: 1px solid #e5e7eb;
    }
    .total-row {
      font-weight: 700;
      background: #f9fafb;
      border-top: 2px solid #c5a059;
    }
    .footer {
      border-top: 1px solid #e5e7eb;
      padding-top: 16px;
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      color: #6b7280;
    }
    @media print {
      body { padding: 16px; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="brand-title">NESTFORM VISUALS</div>
      <div class="brand-sub">Architectural Spatial Planning & Attainable Luxury | Indian Residential Standard</div>
    </div>
    <div class="project-meta">
      <div>ROOM: 10'0" × 16'0" (160 sq.ft)</div>
      <div>APARTMENT TYPE: Compact Indian 2BHK</div>
      <div>DATE: ${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
    </div>
  </div>

  <div class="concept-hero">
    <div>
      <div style="font-size: 11px; text-transform: uppercase; color: #c5a059; font-weight: 700;">CONCEPT 0${concept.id}</div>
      <div class="concept-title">${concept.title}</div>
      <div class="concept-sub">${concept.subtitle}</div>
    </div>
    <div class="budget-pill">
      <div style="font-size: 10px; text-transform: uppercase; color: #047857;">Est. Turnkey Budget</div>
      ₹${(concept.budgetRangeInr.min / 100000).toFixed(1)}L – ₹${(concept.budgetRangeInr.max / 100000).toFixed(1)}L
    </div>
  </div>

  <div class="render-container">
    <img src="${concept.renderImage}" alt="${concept.title}" class="render-img" />
  </div>

  <div class="section-title">1. Color Palette & Asian Paints Codes</div>
  <div class="grid-5">
    ${concept.colorPalette.map((col) => `
      <div class="swatch-card">
        <div class="swatch-color" style="background-color: ${col.hex};"></div>
        <div style="font-weight: 600; font-size: 11px;">${col.name}</div>
        <div style="font-size: 10px; color: #6b7280;">${col.role}</div>
        <div style="font-family: monospace; font-size: 10px; color: #b45309; margin-top: 4px;">${col.hex}</div>
      </div>
    `).join('')}
  </div>

  <div class="section-title">2. Space-Saving Execution Clearances (Carpenter & Contractor Guide)</div>
  <div class="grid-2">
    ${concept.spaceSavingSolutions.map((sol) => `
      <div class="clearance-card">
        <div style="font-weight: 600; font-size: 12px; color: #1f2937;">${sol.title}</div>
        <div style="font-family: monospace; font-size: 11px; color: #b45309; margin-top: 2px;">Spec: ${sol.dimensionSpec}</div>
        <div style="font-size: 11px; color: #4b5563; margin-top: 4px;">${sol.description}</div>
        <div style="font-size: 11px; color: #059669; font-weight: 600; margin-top: 4px;">★ ${sol.spaceGain}</div>
      </div>
    `).join('')}
  </div>

  <div class="section-title">3. Itemized Bill of Quantities (BOQ - INR ₹)</div>
  <table>
    <thead>
      <tr>
        <th>Scope Item</th>
        <th>Description & Materials</th>
        <th style="text-align: right;">Est. Cost (₹)</th>
      </tr>
    </thead>
    <tbody>
      ${concept.boq.map((row) => `
        <tr>
          <td style="font-weight: 600;">${row.component}</td>
          <td style="color: #4b5563;">${row.scope} <em>(${row.materialUsed})</em></td>
          <td style="text-align: right; font-family: monospace; font-weight: 600;">₹${row.estimatedCost.toLocaleString('en-IN')}</td>
        </tr>
      `).join('')}
      <tr class="total-row">
        <td colspan="2" style="font-size: 13px;">TOTAL ESTIMATED TURNKEY COST</td>
        <td style="text-align: right; font-size: 14px; font-family: monospace; color: #b45309;">₹${totalCost.toLocaleString('en-IN')}</td>
      </tr>
    </tbody>
  </table>

  <div class="footer">
    <div>Architect Signoff: NestForm Visuals | nestformvisuals@gmail.com</div>
    <div>Circulation: 38" Unimpeded Corridor | 3000K Warm Lighting</div>
  </div>

  <script>
    // Prompt print/save-to-PDF when opened in browser
    window.addEventListener('load', function() {
      setTimeout(function() {
        window.print();
      }, 600);
    });
  </script>
</body>
</html>`;

      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `NestForm_SpecSheet_Concept_0${concept.id}_${concept.title.replace(/\s+/g, '_')}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 10000);

      setDocDownloaded(true);
      setTimeout(() => setDocDownloaded(false), 4000);
    } catch (e) {
      console.error('Download error:', e);
    } finally {
      setDownloadingDoc(false);
    }
  };

  const handlePrint = () => {
    try {
      window.print();
    } catch (e) {
      // If blocked by iframe sandbox, automatically trigger file download
      setPrintNotice('Direct print is restricted inside the preview iframe. Downloading standalone PDF-ready Spec Sheet now...');
      handleDownloadSpecSheet();
      setTimeout(() => setPrintNotice(null), 5000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#141920] border border-[#2e3745] rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl text-neutral-100">
        {/* Header with Clear Download Actions */}
        <div className="p-4 sm:p-5 border-b border-[#262e3a] bg-[#18202a] flex flex-wrap items-center justify-between gap-3 no-print">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#d4af37]" />
            <div>
              <h3 className="text-base font-serif-luxury font-bold">
                NestForm Contractor &amp; Interior Specification Sheet
              </h3>
              <p className="text-xs text-neutral-400 font-mono-cad">
                Concept 0{concept.id} — {concept.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Download Spec Sheet HTML / PDF Button */}
            <button
              onClick={handleDownloadSpecSheet}
              disabled={downloadingDoc}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-black font-semibold text-xs flex items-center gap-1.5 hover:brightness-110 shadow-md transition-all"
            >
              {docDownloaded ? (
                <>
                  <Check className="w-4 h-4 text-black" />
                  <span>Spec Sheet Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Spec Sheet (.html / PDF)</span>
                </>
              )}
            </button>

            {/* Download 3D Render Image Button */}
            <button
              onClick={handleDownloadRender}
              disabled={downloadingImage}
              className="px-3.5 py-1.5 rounded-xl bg-[#202834] hover:bg-[#2c3746] text-[#f4d17c] border border-[#3b4759] font-medium text-xs flex items-center gap-1.5 transition-all"
            >
              {imgDownloaded ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Render Saved!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download 3D Render (.jpg)</span>
                </>
              )}
            </button>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl text-neutral-300 hover:text-white bg-neutral-800 transition-colors"
              title="Print Page"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-neutral-400 hover:text-white bg-neutral-800 transition-colors"
              title="Close Modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notice alert if any */}
        {printNotice && (
          <div className="px-5 py-2.5 bg-amber-950/60 border-b border-amber-900/80 text-amber-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{printNotice}</span>
          </div>
        )}

        {/* Printable Document Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 bg-[#101419] print:bg-white print:text-black">
          {/* Document Header Stamp */}
          <div className="border-b border-[#2e3846] print:border-black pb-4 flex justify-between items-start">
            <div>
              <div className="text-xl font-serif-luxury font-bold text-white print:text-black">
                NESTFORM VISUALS
              </div>
              <div className="text-xs text-neutral-400 print:text-neutral-600 font-mono-cad mt-0.5">
                Luxury Spatial Planning &amp; Attainable Execution | Indian Residential Standard
              </div>
            </div>
            <div className="text-right text-xs font-mono-cad text-neutral-400 print:text-neutral-600">
              <div>PROJECT: Compact 2BHK Renovation</div>
              <div>ROOM: Living-Dining (10&apos;0&quot; × 16&apos;0&quot; | 160 sq.ft)</div>
              <div>DATE: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
            </div>
          </div>

          {/* Concept Profile Card with 3D Image Preview */}
          <div className="bg-[#171e27] print:bg-neutral-100 p-4 rounded-xl border border-[#2b3543] print:border-neutral-300 flex flex-col md:flex-row items-center gap-4">
            <div className="w-full md:w-56 aspect-video rounded-lg overflow-hidden shrink-0 border border-white/10">
              <img
                src={concept.renderImage}
                alt={concept.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 w-full flex justify-between items-start">
              <div>
                <span className="text-xs font-mono-cad text-[#c5a059] print:text-amber-800 uppercase font-semibold">
                  Theme 0{concept.id}
                </span>
                <h4 className="text-lg font-serif-luxury font-bold text-white print:text-black">
                  {concept.title}
                </h4>
                <p className="text-xs text-neutral-300 print:text-neutral-700 mt-1">
                  {concept.subtitle}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={handleDownloadRender}
                    className="text-xs font-mono-cad px-2.5 py-1 rounded bg-[#c5a059]/20 text-[#d4af37] border border-[#c5a059]/40 hover:bg-[#c5a059]/30 flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download This Render (.jpg)</span>
                  </button>
                </div>
              </div>
              <div className="text-right font-mono-cad shrink-0">
                <div className="text-[11px] text-neutral-400 print:text-neutral-600 uppercase">Estimated Budget</div>
                <div className="text-base font-bold text-emerald-400 print:text-emerald-700">
                  ₹{(concept.budgetRangeInr.min / 100000).toFixed(1)}L – ₹{(concept.budgetRangeInr.max / 100000).toFixed(1)}L
                </div>
              </div>
            </div>
          </div>

          {/* Color & Material Specification */}
          <div>
            <h5 className="text-xs uppercase font-mono-cad font-semibold text-neutral-300 print:text-black mb-3">
              1. Color Palette &amp; Paint Codes
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {concept.colorPalette.map((col, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-[#182029] print:bg-neutral-50 border border-[#2b3543] print:border-neutral-300">
                  <div style={{ backgroundColor: col.hex }} className="w-full h-8 rounded mb-2 border border-white/20 print:border-black/20" />
                  <div className="text-xs font-semibold text-white print:text-black leading-tight">{col.name}</div>
                  <div className="text-[10px] text-neutral-400 print:text-neutral-600 mt-0.5">{col.role}</div>
                  <div className="text-[10px] font-mono-cad text-[#c5a059] print:text-amber-700 mt-1">{col.hex}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Carpentry & Space Saving Clearances */}
          <div>
            <h5 className="text-xs uppercase font-mono-cad font-semibold text-neutral-300 print:text-black mb-3">
              2. Critical Execution Clearances (For Carpenter &amp; Fabricator)
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {concept.spaceSavingSolutions.map((sol, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[#182029] print:bg-neutral-50 border border-[#2b3543] print:border-neutral-300">
                  <div className="font-semibold text-neutral-200 print:text-black">{sol.title}</div>
                  <div className="text-[11px] font-mono-cad text-[#c5a059] print:text-amber-700 mt-0.5">{sol.dimensionSpec}</div>
                  <div className="text-[11px] text-neutral-400 print:text-neutral-600 mt-1">{sol.description}</div>
                  <div className="text-[10px] text-emerald-400 print:text-emerald-700 font-medium mt-1">★ {sol.spaceGain}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Itemized Bill of Quantities (BOQ) */}
          <div>
            <h5 className="text-xs uppercase font-mono-cad font-semibold text-neutral-300 print:text-black mb-3">
              3. Itemized Bill of Quantities (INR ₹)
            </h5>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#2e3745] print:border-black text-[11px] font-mono-cad text-neutral-400 print:text-neutral-700 uppercase">
                  <th className="py-2 px-2">Component</th>
                  <th className="py-2 px-2">Scope &amp; Materials</th>
                  <th className="py-2 px-2 text-right">Approx (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#242c38] print:divide-neutral-300">
                {concept.boq.map((row, i) => (
                  <tr key={i}>
                    <td className="py-2 px-2 font-medium text-neutral-200 print:text-black">{row.component}</td>
                    <td className="py-2 px-2 text-neutral-400 print:text-neutral-700">{row.scope} ({row.materialUsed})</td>
                    <td className="py-2 px-2 font-mono-cad text-right text-neutral-200 print:text-black whitespace-nowrap">
                      ₹{row.estimatedCost.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-[#c5a059] print:border-black font-bold">
                  <td colSpan={2} className="py-2.5 px-2 text-neutral-200 print:text-black uppercase font-mono-cad">
                    Total Estimated Living-Dining Execution
                  </td>
                  <td className="py-2.5 px-2 text-right font-mono-cad text-sm text-[#f4d17c] print:text-black">
                    ₹{totalCost.toLocaleString('en-IN')}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Signoff Footer */}
          <div className="pt-6 border-t border-[#2e3846] print:border-black flex justify-between items-end text-[11px] font-mono-cad text-neutral-400 print:text-neutral-600">
            <div>
              <div>Site Verification: _______________________</div>
              <div className="mt-1">Architect Signoff: NestForm Visuals</div>
            </div>
            <div className="text-right">
              <div>Vastu Check: Passed</div>
              <div>Circulation Corridor: 38&quot; Clear</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
