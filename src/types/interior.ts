export interface MaterialItem {
  name: string;
  category: 'Wall Finish' | 'Wood Tone' | 'Flooring' | 'Upholstery' | 'Lighting' | 'Accents' | 'Window Dressing';
  spec: string;
  indianMarketCode?: string; // e.g. Asian Paints Royale 0427, Greenlam 1084
  colorHex?: string;
  textureHint?: string;
  luxuryWhy: string;
}

export interface SpaceSavingSolution {
  title: string;
  dimensionSpec: string;
  description: string;
  spaceGain: string;
  indianFlatBenefit: string;
  iconName: string;
}

export interface BOQItem {
  component: string;
  scope: string;
  materialUsed: string;
  approxRate: string;
  estimatedCost: number; // in INR
}

export interface SmartMaterialHack {
  luxuryOriginal: string;
  originalCost: string;
  smartIndianHack: string;
  hackCost: string;
  savingsPercent: number;
  designVerdict: string;
}

export interface FurnitureHotspot {
  id: string;
  name: string;
  x: number; // percentage on 3D render
  y: number; // percentage on 3D render
  label: string;
  detail: string;
}

export interface FloorPlanItem {
  id: string;
  name: string;
  dimensions: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  type: 'sofa' | 'tv-unit' | 'dining-table' | 'dining-chair' | 'coffee-table' | 'rug' | 'planter' | 'partition' | 'storage' | 'pooja' | 'light';
  clearanceNote: string;
  spaceSavingTrick: string;
}

export interface Concept {
  id: number;
  title: string;
  subtitle: string;
  theme: string;
  tagline: string;
  renderImage: string;
  renderDescription: string;
  budgetRangeInr: {
    min: number;
    max: number;
    tier: 'Affordable Luxury' | 'Mid-Premium' | 'Signature High-End';
  };
  livingDiningDimensions: {
    lengthFt: number;
    widthFt: number;
    totalSqFt: number;
    ceilingHeightFt: number;
  };
  narrative: {
    conceptPhilosophy: string;
    spacePlanningStrategy: string;
    lightingPhilosophy: string;
    stylingAndMaintenance: string;
  };
  materials: MaterialItem[];
  spaceSavingSolutions: SpaceSavingSolution[];
  smartHacks: SmartMaterialHack[];
  boq: BOQItem[];
  hotspots: FurnitureHotspot[];
  floorPlanItems: FloorPlanItem[];
  colorPalette: {
    name: string;
    hex: string;
    role: string;
  }[];
}
