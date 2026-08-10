export type Category = 'core' | 'accessory';

// Room/use-case tags for the catalogue filter pills.
export type BenefitTag = 'Kitchen' | 'Lighting' | 'Bedding' | 'Decor' | 'Storage' | 'Outdoor' | 'Bath' | 'Ancillary';

export interface ProductFamily {
  name: string;
  variants: Product[];
  cat: Category;
  tag: BenefitTag;
  minPrice: number;
  bestSeller?: boolean;
}

// The "from $X" on a catalogue card has to be a price someone can actually pay,
// so it is the cheapest *in-stock* variant. Falls back to the whole family when
// every variant is out, so a fully out-of-stock card still shows a price rather
// than Infinity.
//
// Callers that override `stock` with live quantities must recompute this — see
// applyStock() in components/sections/AppleBentoGrid.tsx.
export function familyMinPrice(variants: Product[]): number {
  const available = variants.filter((v) => v.stock !== "out");
  return Math.min(...(available.length > 0 ? available : variants).map((v) => v.price));
}

export function getProductFamilies(): ProductFamily[] {
  const map = new Map<string, Product[]>();
  for (const p of products) {
    const group = map.get(p.name) ?? [];
    group.push(p);
    map.set(p.name, group);
  }
  return Array.from(map.values()).map((variants) => ({
    name: variants[0].name,
    variants,
    cat: variants[0].cat,
    tag: variants[0].tag,
    minPrice: familyMinPrice(variants),
    bestSeller: variants.some((v) => v.bestSeller),
  }));
}

export interface Product {
  id: string;
  name: string;
  cas: string;      // SKU / model code
  cat: Category;
  tag: BenefitTag;
  price: number;
  unit: string;      // size / variant label
  purity: string;    // material / finish
  stock: 'in' | 'low' | 'out';
  bestSeller?: boolean;
  description?: string;
}

const DESC: Record<string, string> = {
  'Ceramic Dinnerware Set':     'Hand-glazed stoneware dinnerware with a soft matte finish. Dishwasher and microwave safe, with a slightly irregular edge that gives each piece a handmade feel.',
  'Stainless Steel Cookware Set': 'Five-ply stainless steel construction for even heat distribution across gas, electric, and induction ranges. Oven-safe to 500°F, with riveted stay-cool handles.',
  'Marble Cutting Board':       'Solid honed marble board that doubles as a serving surface. Naturally cool to the touch, ideal for cheese, pastry, and charcuterie.',
  'Copper Kettle':              'Hand-hammered copper stovetop kettle with a brass handle and whistle spout. Lined with food-grade stainless steel.',
  'Citrus Dish Soap':           'Plant-derived dish soap concentrate in citrus and cedar. Biodegradable formula, cuts grease without leaving residue.',

  'Brass Reading Lamp':         'Solid brass task lamp with an articulating arm and a linen shade. Warm 2700K bulb included, designed for a bedside table or reading nook.',
  'Pendant Light Fixture':      'Blown-glass pendant with an exposed brass fitting. Hardwired or plug-in installation, adjustable drop length.',
  'Lamp & Shade Bundle':        'Ceramic table lamp base paired with a matching linen drum shade. Sold as a set so the proportions are right out of the box.',
  'Adjustable Floor Lamp':      'Powder-coated steel floor lamp with a telescoping pole and rotating shade, built for reading corners and living rooms alike.',
  'Standing Arc Lamp':          'Overarching floor lamp in a matte black finish, designed to light a sofa or reading chair without a side table.',

  'Linen Duvet Cover':          'Stonewashed 100% French flax linen, pre-shrunk and softened for immediate use. Breathable in summer, insulating in winter.',
  'Wool Throw Blanket':         'Woven from undyed merino wool with a herringbone pattern. Naturally temperature-regulating and machine washable on cold.',
  'Blanket & Pillow Bundle':    'The wool throw blanket paired with a matching lumbar pillow cover, sold together at a bundle price.',
  'Weighted Sleep Mask':        'Contoured sleep mask with light glass-bead weighting and a moisture-wicking cover, designed to block light without pressing on the eyes.',
  'Cotton Throw Pillow':        'Brushed cotton pillow cover with a hidden zip closure and a plush insert. Machine washable cover.',

  'Cedar Wood Diffuser':        'Passive reed diffuser housed in a turned cedar block. No flame, no cords — just a slow, consistent scent throw.',
  'Brass Bookend Set':          'Solid cast brass bookends with a weighted base and a brushed finish that resists fingerprints.',
  'Ceramic Vase':               'Wheel-thrown stoneware vase with a reactive glaze, so no two pieces finish exactly alike.',
  'Scented Candle Set':         'Coconut-wax candles in a reusable ceramic vessel, poured with a cotton wick and a clean 40+ hour burn time.',
  'Wall Art Print Set':         'Archival giclée prints on matte cotton paper, sold as a coordinated set for gallery-wall layouts.',
  'Marble Coasters Set':        'Honed marble coasters with a cork backing to protect surfaces, sold in a stacked set.',
  'Woven Wall Hanging':         'Handwoven cotton and jute wall hanging on a natural dowel, undyed fiber throughout.',

  'Modular Shelving Unit':      'Powder-coated steel frame with solid oak shelves that reconfigure without tools. Wall-anchor hardware included.',
  'Stackable Storage Bins':     'Felt storage bins with reinforced rims and leather handles, designed to stack cleanly on a shelf or closet floor.',

  'Terracotta Planter':         'Raw terracotta planter with a drainage hole and saucer, left unglazed so it weathers naturally outdoors.',
  'Outdoor String Lights':      'Weatherproof string lights on a black rubber cable, with shatter-resistant globe bulbs rated for patios and decks.',

  'Aromatherapy Diffuser Set':  'Ultrasonic diffuser paired with a starter set of essential oils, finished in a matte ceramic housing that fits a bathroom shelf.',

  'All-Purpose Glass Cleaner':  'Streak-free glass and mirror cleaner in a refillable glass spray bottle, made without ammonia.',
};

export const products: Product[] = [
  // Ceramic Dinnerware Set
  { id: 'dinnerware-4pc',   name: 'Ceramic Dinnerware Set',       cas: 'LM-DW-004', cat: 'core',      tag: 'Kitchen',  price: 75,  unit: '4-Piece Set',  purity: 'Glazed Stoneware', stock: 'in',  bestSeller: true, description: DESC['Ceramic Dinnerware Set'] },
  { id: 'dinnerware-8pc',   name: 'Ceramic Dinnerware Set',       cas: 'LM-DW-008', cat: 'core',      tag: 'Kitchen',  price: 90,  unit: '8-Piece Set',  purity: 'Glazed Stoneware', stock: 'in',  description: DESC['Ceramic Dinnerware Set'] },
  { id: 'dinnerware-12pc',  name: 'Ceramic Dinnerware Set',       cas: 'LM-DW-012', cat: 'core',      tag: 'Kitchen',  price: 180, unit: '12-Piece Set', purity: 'Glazed Stoneware', stock: 'out', description: DESC['Ceramic Dinnerware Set'] },

  // Stainless Steel Cookware Set
  { id: 'cookware-5pc',     name: 'Stainless Steel Cookware Set', cas: 'LM-CK-005', cat: 'core',      tag: 'Kitchen',  price: 70,  unit: '5-Piece Set',  purity: '5-Ply Stainless',  stock: 'out', description: DESC['Stainless Steel Cookware Set'] },
  { id: 'cookware-8pc',     name: 'Stainless Steel Cookware Set', cas: 'LM-CK-008', cat: 'core',      tag: 'Kitchen',  price: 90,  unit: '8-Piece Set',  purity: '5-Ply Stainless',  stock: 'in',  bestSeller: true, description: DESC['Stainless Steel Cookware Set'] },
  { id: 'cookware-10pc',    name: 'Stainless Steel Cookware Set', cas: 'LM-CK-010', cat: 'core',      tag: 'Kitchen',  price: 150, unit: '10-Piece Set', purity: '5-Ply Stainless',  stock: 'in',  description: DESC['Stainless Steel Cookware Set'] },
  { id: 'cookware-12pc',    name: 'Stainless Steel Cookware Set', cas: 'LM-CK-012', cat: 'core',      tag: 'Kitchen',  price: 190, unit: '12-Piece Set', purity: '5-Ply Stainless',  stock: 'out', description: DESC['Stainless Steel Cookware Set'] },
  { id: 'cookware-14pc',    name: 'Stainless Steel Cookware Set', cas: 'LM-CK-014', cat: 'core',      tag: 'Kitchen',  price: 360, unit: '14-Piece Set', purity: '5-Ply Stainless',  stock: 'out', description: DESC['Stainless Steel Cookware Set'] },

  // Marble Cutting Board
  { id: 'marble-board',     name: 'Marble Cutting Board',         cas: 'LM-MB-001', cat: 'core',      tag: 'Kitchen',  price: 160, unit: 'One Size',     purity: 'Honed Marble',     stock: 'out', description: DESC['Marble Cutting Board'] },

  // Copper Kettle
  { id: 'copper-kettle',    name: 'Copper Kettle',                cas: 'LM-CP-001', cat: 'core',      tag: 'Kitchen',  price: 170, unit: '1.5L',         purity: 'Hammered Copper',  stock: 'out', description: DESC['Copper Kettle'] },

  // Citrus Dish Soap
  { id: 'dish-soap',        name: 'Citrus Dish Soap',             cas: 'LM-DS-001', cat: 'accessory', tag: 'Kitchen',  price: 75,  unit: '500ml',        purity: 'Plant-Derived',    stock: 'out', description: DESC['Citrus Dish Soap'] },

  // Brass Reading Lamp
  { id: 'brass-lamp',       name: 'Brass Reading Lamp',           cas: 'LM-LT-014', cat: 'core',      tag: 'Lighting', price: 150, unit: 'One Size',     purity: 'Solid Brass',      stock: 'in',  description: DESC['Brass Reading Lamp'] },

  // Pendant Light Fixture
  { id: 'pendant-light',    name: 'Pendant Light Fixture',        cas: 'LM-LT-500', cat: 'core',      tag: 'Lighting', price: 120, unit: 'One Size',     purity: 'Blown Glass',      stock: 'in',  description: DESC['Pendant Light Fixture'] },

  // Lamp & Shade Bundle
  { id: 'lamp-shade-set',   name: 'Lamp & Shade Bundle',          cas: 'LM-LT-157', cat: 'core',      tag: 'Lighting', price: 110, unit: 'One Size',     purity: 'Ceramic & Linen',  stock: 'in',  description: DESC['Lamp & Shade Bundle'] },

  // Adjustable Floor Lamp
  { id: 'floor-lamp',       name: 'Adjustable Floor Lamp',        cas: 'LM-LT-070', cat: 'core',      tag: 'Lighting', price: 75,  unit: 'One Size',     purity: 'Powder-Coated Steel', stock: 'out', description: DESC['Adjustable Floor Lamp'] },

  // Standing Arc Lamp
  { id: 'arc-lamp',         name: 'Standing Arc Lamp',            cas: 'LM-LT-029', cat: 'core',      tag: 'Lighting', price: 150, unit: 'One Size',     purity: 'Matte Steel',      stock: 'in',  description: DESC['Standing Arc Lamp'] },

  // Linen Duvet Cover
  { id: 'linen-duvet',      name: 'Linen Duvet Cover',            cas: 'LM-BD-500', cat: 'core',      tag: 'Bedding',  price: 120, unit: 'Queen',        purity: '100% French Flax', stock: 'in',  description: DESC['Linen Duvet Cover'] },

  // Wool Throw Blanket
  { id: 'wool-throw',       name: 'Wool Throw Blanket',           cas: 'LM-BD-157', cat: 'core',      tag: 'Bedding',  price: 55,  unit: 'One Size',     purity: '100% Merino Wool', stock: 'in',  bestSeller: true, description: DESC['Wool Throw Blanket'] },

  // Blanket & Pillow Bundle
  { id: 'blanket-pillow-10', name: 'Blanket & Pillow Bundle',     cas: 'LM-BD-157B', cat: 'core',     tag: 'Bedding',  price: 100, unit: 'Standard Pillow', purity: 'Wool & Cotton',  stock: 'in',  description: DESC['Blanket & Pillow Bundle'] },
  { id: 'blanket-pillow-20', name: 'Blanket & Pillow Bundle',     cas: 'LM-BD-157C', cat: 'core',     tag: 'Bedding',  price: 190, unit: 'Euro Pillow',  purity: 'Wool & Cotton',   stock: 'in',  description: DESC['Blanket & Pillow Bundle'] },

  // Weighted Sleep Mask
  { id: 'sleep-mask',       name: 'Weighted Sleep Mask',          cas: 'LM-BD-062', cat: 'accessory', tag: 'Bedding',  price: 60,  unit: 'One Size',     purity: 'Glass-Bead Weighted', stock: 'out', description: DESC['Weighted Sleep Mask'] },

  // Cotton Throw Pillow
  { id: 'throw-pillow',     name: 'Cotton Throw Pillow',          cas: 'LM-BD-013', cat: 'accessory', tag: 'Bedding',  price: 60,  unit: '18x18 in',     purity: 'Brushed Cotton',   stock: 'out', description: DESC['Cotton Throw Pillow'] },

  // Cedar Wood Diffuser
  { id: 'cedar-diffuser',   name: 'Cedar Wood Diffuser',          cas: 'LM-DC-307', cat: 'accessory', tag: 'Decor',    price: 70,  unit: 'One Size',     purity: 'Solid Cedar',      stock: 'out', description: DESC['Cedar Wood Diffuser'] },

  // Brass Bookend Set
  { id: 'bookends-50mg',    name: 'Brass Bookend Set',            cas: 'LM-DC-049', cat: 'accessory', tag: 'Decor',    price: 40,  unit: 'Small Pair',   purity: 'Cast Brass',       stock: 'in',  description: DESC['Brass Bookend Set'] },
  { id: 'bookends-100mg',   name: 'Brass Bookend Set',            cas: 'LM-DC-050', cat: 'accessory', tag: 'Decor',    price: 60,  unit: 'Large Pair',   purity: 'Cast Brass',       stock: 'in',  description: DESC['Brass Bookend Set'] },

  // Ceramic Vase
  { id: 'ceramic-vase',     name: 'Ceramic Vase',                 cas: 'LM-DC-070', cat: 'accessory', tag: 'Decor',    price: 45,  unit: 'One Size',     purity: 'Reactive Glaze',   stock: 'in',  description: DESC['Ceramic Vase'] },

  // Scented Candle Set
  { id: 'candle-set-50mg',  name: 'Scented Candle Set',           cas: 'LM-DC-140', cat: 'accessory', tag: 'Decor',    price: 140, unit: 'Set of 2',     purity: 'Coconut Wax',      stock: 'in',  description: DESC['Scented Candle Set'] },
  { id: 'candle-set-70mg',  name: 'Scented Candle Set',           cas: 'LM-DC-141', cat: 'accessory', tag: 'Decor',    price: 165, unit: 'Set of 3',     purity: 'Coconut Wax',      stock: 'out', description: DESC['Scented Candle Set'] },

  // Wall Art Print Set
  { id: 'wall-art-10mg',    name: 'Wall Art Print Set',           cas: 'LM-DC-100', cat: 'accessory', tag: 'Decor',    price: 70,  unit: 'Set of 2, A3',  purity: 'Archival Giclée',  stock: 'in',  description: DESC['Wall Art Print Set'] },
  { id: 'wall-art-40mg',    name: 'Wall Art Print Set',           cas: 'LM-DC-101', cat: 'accessory', tag: 'Decor',    price: 200, unit: 'Set of 4, A2',  purity: 'Archival Giclée',  stock: 'out', description: DESC['Wall Art Print Set'] },

  // Marble Coasters Set
  { id: 'marble-coasters',  name: 'Marble Coasters Set',          cas: 'LM-DC-053', cat: 'accessory', tag: 'Decor',    price: 80,  unit: 'Set of 4',     purity: 'Honed Marble',     stock: 'out', description: DESC['Marble Coasters Set'] },

  // Woven Wall Hanging
  { id: 'wall-hanging',     name: 'Woven Wall Hanging',           cas: 'LM-DC-031', cat: 'accessory', tag: 'Decor',    price: 90,  unit: 'One Size',     purity: 'Cotton & Jute',    stock: 'in',  description: DESC['Woven Wall Hanging'] },

  // Modular Shelving Unit
  { id: 'shelving-unit',    name: 'Modular Shelving Unit',        cas: 'LM-ST-129', cat: 'core',      tag: 'Storage',  price: 65,  unit: 'One Size',     purity: 'Steel & Oak',      stock: 'in',  description: DESC['Modular Shelving Unit'] },

  // Stackable Storage Bins
  { id: 'storage-bins',     name: 'Stackable Storage Bins',       cas: 'LM-ST-807', cat: 'accessory', tag: 'Storage',  price: 65,  unit: 'One Size',     purity: 'Felt & Leather',   stock: 'in',  description: DESC['Stackable Storage Bins'] },

  // Terracotta Planter
  { id: 'terracotta-planter', name: 'Terracotta Planter',         cas: 'LM-OD-921', cat: 'accessory', tag: 'Outdoor',  price: 60,  unit: 'One Size',     purity: 'Unglazed Terracotta', stock: 'in', description: DESC['Terracotta Planter'] },

  // Outdoor String Lights
  { id: 'string-lights',    name: 'Outdoor String Lights',        cas: 'LM-OD-062', cat: 'accessory', tag: 'Outdoor',  price: 60,  unit: '48 ft',        purity: 'Weatherproof',     stock: 'in',  description: DESC['Outdoor String Lights'] },

  // Aromatherapy Diffuser Set
  { id: 'aroma-diffuser',   name: 'Aromatherapy Diffuser Set',    cas: 'LM-BT-189', cat: 'accessory', tag: 'Bath',     price: 60,  unit: 'One Size',     purity: 'Matte Ceramic',    stock: 'in',  description: DESC['Aromatherapy Diffuser Set'] },

  // All-Purpose Glass Cleaner
  { id: 'glass-cleaner-3',  name: 'All-Purpose Glass Cleaner',    cas: 'LM-AC-773', cat: 'accessory', tag: 'Ancillary', price: 10, unit: '250ml Refill', purity: 'Ammonia-Free',     stock: 'out', description: DESC['All-Purpose Glass Cleaner'] },
  { id: 'glass-cleaner-10', name: 'All-Purpose Glass Cleaner',    cas: 'LM-AC-774', cat: 'accessory', tag: 'Ancillary', price: 25, unit: '1L Refill',    purity: 'Ammonia-Free',     stock: 'out', description: DESC['All-Purpose Glass Cleaner'] },
];
