import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Concept } from '../types/interior';
import { Sparkles, Send, Bot, User, Loader2, Lightbulb, HelpCircle, ShieldCheck } from 'lucide-react';

interface Props {
  activeConcept: Concept;
}

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

export const AiDesignConsultant: React.FC<Props> = ({ activeConcept }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: `Hello! I am your NestForm AI Interior Architect. I specialize in spatial planning, Vastu considerations, and attainable luxury materials for compact Indian 2BHK apartments.\n\nYou are currently exploring Concept ${activeConcept.id}: "${activeConcept.title}". How can I help you customize this layout, integrate a Mandir, choose child-safe fabrics, or engineer your ₹ INR budget?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sampleQuestions = [
    'How do I add an auspicious Mandir without wasting floor space?',
    'What Asian Paints shade gives the most expensive hotel look?',
    'How to handle toddler food stains and pet claws on bouclé fabric?',
    'Can I fit a 6-seater dining table in a 10x16 ft living room?',
  ];

  const handleSend = async (userQuery?: string) => {
    const textToSend = userQuery || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Check for Gemini API Key in environment
      const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (process as any).env?.GEMINI_API_KEY;

      if (apiKey) {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: textToSend,
          config: {
            systemInstruction: `You are the Lead Spatial Planner and Luxury Interior Designer at NestForm Visuals, India.
You specialize in compact Indian 2BHK apartment spatial planning (typically 10x16 ft living-dining zones).
Currently, the user is reviewing Concept ${activeConcept.id}: "${activeConcept.title}" (${activeConcept.subtitle}).
Theme: ${activeConcept.theme}.
Budget range: ₹${(activeConcept.budgetRangeInr.min / 100000).toFixed(1)}L - ₹${(activeConcept.budgetRangeInr.max / 100000).toFixed(1)}L INR.

Key principles to embody in your answers:
1. Grounded Indian Market Reality: Mention real Indian brands like Asian Paints Royale, Greenlam/Merino laminates, Kajaria/Simpolo vitrified slabs, D'Decor fabrics, and hardware like Blum Tip-on.
2. Space Planning & Ergonomics: Emphasize minimum 36-inch walking clearances, floating cantilever furniture (14" depth) to preserve floor planes, tuck-in chairs, and concealed vertical storage.
3. Lighting Discipline: Emphasize 3000K Warm White indirect lighting / LED profiles over clinical 6500K tubelights.
4. Vastu Alignment: TV on East/South-East, Mandir in North-East alcove with 2700K soft backlight, seating facing East/North.
5. Tone: Sophisticated, architectural, highly practical, warm, and concise (under 250 words per response with bullet points).`,
          },
        });

        const reply = response.text || 'I apologize, could you please rephrase your design query?';
        setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
      } else {
        // High-fidelity architectural canned responses tailored to query
        await new Promise((r) => setTimeout(r, 800));
        let mockReply = '';

        if (textToSend.toLowerCase().includes('contact') || textToSend.toLowerCase().includes('hire') || textToSend.toLowerCase().includes('phone') || textToSend.toLowerCase().includes('whatsapp') || textToSend.toLowerCase().includes('email')) {
          mockReply = `**Get in Touch with NestForm Visuals Studio:**\n\n• **Email:** nestformvisuals@gmail.com\n• **Phone / WhatsApp:** +91 91565 62467\n• **Services:** Custom 2D CAD spatial floor planning, 3D photorealistic architectural renders, and turnkey Indian residential BOQ estimation for compact flats across India.\n\nFeel free to WhatsApp or call us directly with your floor plan!`;
        } else if (textToSend.toLowerCase().includes('mandir') || textToSend.toLowerCase().includes('pooja')) {
          mockReply = `**NestForm Mandir Planning Strategy for Compact Flats:**\n\n1. **Wall-Integrated Alcove:** Never place a bulky floor-standing carved wooden cabinet in a 10ft wide room—it eats 6 sq.ft of precious walking space. Instead, integrate a clean 18" wide niche directly into the floating TV console or the North-East dining wall.\n2. **Material Finish:** Line the alcove with warm teak veneer or back-lit translucent onyx acrylic. Clad the bottom with a 15mm white quartz shelf that wipes clean easily from diya oil and agarbatti ash.\n3. **Sacred Illumination:** Install a concealed 2700K Warm Amber LED strip behind an auspicious bell hanging or CNC jali screen. This gives a serene temple glow without clinical glare.`;
        } else if (textToSend.toLowerCase().includes('paint') || textToSend.toLowerCase().includes('asian paints') || textToSend.toLowerCase().includes('shade')) {
          mockReply = `**Top 3 Asian Paints Royale Luxury Shades for an Expensive Look:**\n\n1. **Royale Luxury 'Daybreak' (L104) / 'Soft Linen':** The gold standard for warm contemporary luxury. Unlike standard builder white, it has warm yellow-beige undertones that catch 3000K ambient LED light softly.\n2. **Royale Matte 'Warm Greige' (0914):** Ideal for Japandi and minimalist concepts. Zero specular glare gives the flat an architectural, powdery wabi-sabi finish.\n3. **Royale 'Charcoal Fab' (8303):** Use strictly on a single vertical accent panel behind the TV or console. High contrast creates visual depth, making the wall seem further back!`;
        } else if (textToSend.toLowerCase().includes('stain') || textToSend.toLowerCase().includes('child') || textToSend.toLowerCase().includes('pet') || textToSend.toLowerCase().includes('toddler')) {
          mockReply = `**Practical Luxury Fabrics for Indian Families:**\n\n1. **Nano-Treated Performance Bouclé:** Look for D'Decor Essentials or Sarom with Teflon / Nano-Guard coating. Liquid curry, tea, or juice beads up on the surface and can be wiped with a damp microfiber cloth before penetrating.\n2. **High Martindale Rub Count:** Always specify upholstery with > 35,000 Martindale rubs so kid jumping and pet friction won't pill the fibers.\n3. **Removable Zipper Cushions:** Ask your carpenter to fabricate seat cushions with concealed rear zippers, lined with washable interlinings.`;
        } else if (textToSend.toLowerCase().includes('6-seater') || textToSend.toLowerCase().includes('table') || textToSend.toLowerCase().includes('dining')) {
          mockReply = `**Can You Fit a 6-Seater in a 10x16 ft Room?**\n\n• **Direct Answer:** A rigid 6-seater rectangular table will choke your room, reducing the corridor to under 24 inches (bruised hips and blocked balcony access).\n• **The Smart Solution:** Use an **Extendable Oak Table** (Concept 4) or an **L-Shaped Storage Banquette Nook** (Concept 2). The built-in wall bench comfortably seats 3 adults + 2 in front chairs, leaving the central 38-inch walking corridor 100% open!`;
        } else {
          mockReply = `**Architectural Recommendation for ${activeConcept.title}:**\n\n• **Vertical Scale:** Always run curtains ceiling-to-floor using recessed ceiling tracks. Never mount curtain rods 4 inches above windows—that cuts the wall visually.\n• **Floor Continuity:** Keep your floating console at least 14 inches off the floor. When the floor tile plane is visible from wall to wall, human eyes register 20-25% more volume.\n• **Lighting Layering:** Replace any 6500K tubelights with 3000K warm profile channels. It instantly turns a standard builder flat into a five-star hotel suite.`;
        }

        setMessages((prev) => [...prev, { role: 'assistant', text: mockReply }]);
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `Here is the architectural advice for ${activeConcept.title}: Focus on three main pillars: (1) 3000K Warm White indirect cove lighting, (2) Floating 14-inch media consoles to preserve floor planes, and (3) Circular 42-inch dining tables with tuck-in chairs to keep walking paths clear.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#12161b] rounded-2xl border border-[#2a3038] overflow-hidden shadow-2xl flex flex-col h-[520px]">
      {/* Header */}
      <div className="p-4 border-b border-[#222831] bg-[#161c22] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#c5a059]/20 border border-[#c5a059]/40 text-[#d4af37]">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-neutral-100 flex items-center gap-1.5">
              <span>NestForm AI Interior Architect</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </h4>
            <p className="text-[11px] text-neutral-400 font-mono-cad">
              Specialized in Indian 2BHK Spatial Planning &amp; Attainable Luxury
            </p>
          </div>
        </div>

        <span className="text-[11px] font-mono-cad text-[#c5a059] bg-[#c5a059]/10 px-2.5 py-1 rounded-full border border-[#c5a059]/30 hidden sm:inline">
          Active: {activeConcept.title}
        </span>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#0e1216]">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-full bg-[#1e2530] border border-[#2d3746] flex items-center justify-center shrink-0 text-[#c5a059] mt-0.5">
                <Bot className="w-3.5 h-3.5" />
              </div>
            )}
            <div
              className={`max-w-[85%] sm:max-w-[75%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-[#c5a059] text-black font-medium rounded-tr-none shadow-md'
                  : 'bg-[#171d24] text-neutral-200 border border-[#272f3a] rounded-tl-none shadow-sm whitespace-pre-line'
              }`}
            >
              {msg.text}
            </div>
            {msg.role === 'user' && (
              <div className="w-7 h-7 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/40 flex items-center justify-center shrink-0 text-[#d4af37] mt-0.5">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-neutral-400 bg-[#171d24] p-3 rounded-2xl w-fit border border-[#272f3a]">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#c5a059]" />
            <span>Consulting spatial layout rules and Indian material catalogs...</span>
          </div>
        )}
      </div>

      {/* Suggested Questions Quick Chips */}
      <div className="p-2.5 bg-[#141920] border-t border-[#222831] overflow-x-auto flex items-center gap-2">
        <span className="text-[10px] font-mono-cad text-neutral-500 uppercase whitespace-nowrap pl-1">
          Quick Ask:
        </span>
        {sampleQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => handleSend(q)}
            className="text-[11px] px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-300 hover:bg-[#c5a059]/20 hover:text-[#d4af37] hover:border-[#c5a059]/40 border border-neutral-700 whitespace-nowrap transition-colors shrink-0"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-[#161c22] border-t border-[#222831] flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask about Vastu, Mandir, budget, fabrics, or layouts for ${activeConcept.title}...`}
          className="flex-1 bg-[#0c0f12] text-xs text-white px-3.5 py-2.5 rounded-xl border border-[#2b333f] focus:outline-none focus:border-[#c5a059] transition-colors"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-2.5 rounded-xl bg-[#c5a059] text-black hover:bg-[#d4af37] disabled:opacity-40 disabled:cursor-not-allowed transition-all font-semibold shadow-md"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
