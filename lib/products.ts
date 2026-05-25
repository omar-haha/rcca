export type Category = 'peptide' | 'misc';
export type BenefitTag = 'Weight Loss' | 'Muscle Growth' | 'Recovery' | 'Anti-Aging' | 'Cognitive' | 'Tanning' | 'Libido' | 'Ancillary';

export interface ProductFamily {
  name: string;
  variants: Product[];
  cat: Category;
  tag: BenefitTag;
  minPrice: number;
  bestSeller?: boolean;
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
    minPrice: Math.min(...variants.map((v) => v.price)),
    bestSeller: variants.some((v) => v.bestSeller),
  }));
}

export interface Product {
  id: string;
  name: string;
  cas: string;
  cat: Category;
  tag: BenefitTag;
  price: number;
  unit: string;
  purity: string;
  stock: 'in' | 'low' | 'out';
  bestSeller?: boolean;
}

export const products: Product[] = [
  // Tirzepatide
  { id: 'tirzepatide-20mg',      name: 'Tirzepatide',        cas: '2023788-19-2',  cat: 'peptide', tag: 'Weight Loss',   price: 75,  unit: '20mg',  purity: '≥99%',      stock: 'in', bestSeller: true },
  { id: 'tirzepatide-30mg',      name: 'Tirzepatide',        cas: '2023788-19-2',  cat: 'peptide', tag: 'Weight Loss',   price: 90,  unit: '30mg',  purity: '≥99%',      stock: 'in' },
  { id: 'tirzepatide-60mg',      name: 'Tirzepatide',        cas: '2023788-19-2',  cat: 'peptide', tag: 'Weight Loss',   price: 180, unit: '60mg',  purity: '≥99%',      stock: 'in' },

  // Retatrutide
  { id: 'retatrutide-5mg',       name: 'Retatrutide',        cas: '2381089-83-2',  cat: 'peptide', tag: 'Weight Loss',   price: 70,  unit: '5mg',   purity: '≥99%',      stock: 'in' },
  { id: 'retatrutide-10mg',      name: 'Retatrutide',        cas: '2381089-83-2',  cat: 'peptide', tag: 'Weight Loss',   price: 90,  unit: '10mg',  purity: '≥99%',      stock: 'in', bestSeller: true },
  { id: 'retatrutide-20mg',      name: 'Retatrutide',        cas: '2381089-83-2',  cat: 'peptide', tag: 'Weight Loss',   price: 150, unit: '20mg',  purity: '≥99%',      stock: 'in' },
  { id: 'retatrutide-30mg',      name: 'Retatrutide',        cas: '2381089-83-2',  cat: 'peptide', tag: 'Weight Loss',   price: 190, unit: '30mg',  purity: '≥99%',      stock: 'in' },
  { id: 'retatrutide-60mg',      name: 'Retatrutide',        cas: '2381089-83-2',  cat: 'peptide', tag: 'Weight Loss',   price: 360, unit: '60mg',  purity: '≥99%',      stock: 'in' },

  // Tesamorelin
  { id: 'tesamorelin',           name: 'Tesamorelin',        cas: '218949-48-5',   cat: 'peptide', tag: 'Muscle Growth', price: 150, unit: '10mg',  purity: '≥98%',      stock: 'in' },

  // TB-500
  { id: 'tb500',                 name: 'TB-500',             cas: '77591-33-4',    cat: 'peptide', tag: 'Recovery',      price: 120, unit: '10mg',  purity: '≥98%',      stock: 'in' },

  // BPC-157
  { id: 'bpc157',                name: 'BPC-157',            cas: '137525-51-0',   cat: 'peptide', tag: 'Recovery',      price: 55,  unit: '10mg',  purity: '≥99%',      stock: 'in', bestSeller: true },

  // BPC-157 + TB-500 combo
  { id: 'bpc157-tb500-10mg',     name: 'BPC-157 + TB-500',  cas: 'N/A',           cat: 'peptide', tag: 'Recovery',      price: 100, unit: '10mg',  purity: '≥98%',      stock: 'in' },
  { id: 'bpc157-tb500-20mg',     name: 'BPC-157 + TB-500',  cas: 'N/A',           cat: 'peptide', tag: 'Recovery',      price: 190, unit: '20mg',  purity: '≥98%',      stock: 'in' },

  // BAC Water
  { id: 'bac-water-3ml',         name: 'BAC Water',          cas: '7732-18-5',     cat: 'misc',    tag: 'Ancillary',     price: 10,  unit: '3ml',   purity: 'USP Grade', stock: 'in' },
  { id: 'bac-water-10ml',        name: 'BAC Water',          cas: '7732-18-5',     cat: 'misc',    tag: 'Ancillary',     price: 25,  unit: '10ml',  purity: 'USP Grade', stock: 'in' },

  // Cagrilintide
  { id: 'cagrilintide',          name: 'Cagrilintide',       cas: 'N/A',           cat: 'peptide', tag: 'Weight Loss',   price: 160, unit: '10mg',  purity: '≥99%',      stock: 'in' },

  // CJC-1295 no DAC
  { id: 'cjc1295-nodac',         name: 'CJC-1295 no DAC',   cas: '863288-34-0',   cat: 'peptide', tag: 'Muscle Growth', price: 130, unit: '10mg',  purity: '≥99%',      stock: 'in' },

  // CJC no DAC + Ipamorelin
  { id: 'cjc-ipa',               name: 'CJC + Ipamorelin',  cas: 'N/A',           cat: 'peptide', tag: 'Muscle Growth', price: 110, unit: '10mg',  purity: '≥98%',      stock: 'in' },

  // DSIP
  { id: 'dsip',                  name: 'DSIP',               cas: '62568-57-4',    cat: 'peptide', tag: 'Recovery',      price: 60,  unit: '5mg',   purity: '≥99%',      stock: 'in' },

  // Epithalon
  { id: 'epithalon',             name: 'Epithalon',          cas: '307297-39-8',   cat: 'peptide', tag: 'Anti-Aging',    price: 70,  unit: '10mg',  purity: '≥99%',      stock: 'in' },

  // GHK-Cu
  { id: 'ghkcu-50mg',            name: 'GHK-Cu',             cas: '49557-75-7',    cat: 'peptide', tag: 'Anti-Aging',    price: 40,  unit: '50mg',  purity: '≥99%',      stock: 'in' },
  { id: 'ghkcu-100mg',           name: 'GHK-Cu',             cas: '49557-75-7',    cat: 'peptide', tag: 'Anti-Aging',    price: 60,  unit: '100mg', purity: '≥99%',      stock: 'in' },

  // Glutathione
  { id: 'glutathione',           name: 'Glutathione',        cas: '70-18-8',       cat: 'misc',    tag: 'Anti-Aging',    price: 45,  unit: '600mg', purity: '≥99%',      stock: 'in' },

  // Glow
  { id: 'glow-50mg',             name: 'Glow',               cas: 'N/A',           cat: 'misc',    tag: 'Anti-Aging',    price: 140, unit: '50mg',  purity: '≥98%',      stock: 'in' },
  { id: 'glow-70mg',             name: 'Glow',               cas: 'N/A',           cat: 'misc',    tag: 'Anti-Aging',    price: 165, unit: '70mg',  purity: '≥98%',      stock: 'in' },

  // Ipamorelin
  { id: 'ipamorelin',            name: 'Ipamorelin',         cas: '170851-70-4',   cat: 'peptide', tag: 'Muscle Growth', price: 75,  unit: '10mg',  purity: '≥99%',      stock: 'in' },

  // Klow80
  { id: 'klow80',                name: 'Klow80',             cas: 'N/A',           cat: 'misc',    tag: 'Weight Loss',   price: 170, unit: '80mg',  purity: '≥98%',      stock: 'in' },

  // KPV
  { id: 'kpv',                   name: 'KPV',                cas: '13358-08-4',    cat: 'peptide', tag: 'Recovery',      price: 60,  unit: '10mg',  purity: '≥99%',      stock: 'in' },

  // Lemon Bottle
  { id: 'lemon-bottle',          name: 'Lemon Bottle',       cas: 'N/A',           cat: 'misc',    tag: 'Weight Loss',   price: 75,  unit: '10mg',  purity: '≥98%',      stock: 'in' },

  // Melanotan 1
  { id: 'melanotan1',            name: 'Melanotan 1',        cas: '75921-69-6',    cat: 'peptide', tag: 'Tanning',       price: 60,  unit: '10mg',  purity: '≥99%',      stock: 'in' },

  // Melanotan 2
  { id: 'melanotan2',            name: 'Melanotan 2',        cas: '121062-08-6',   cat: 'peptide', tag: 'Tanning',       price: 60,  unit: '10mg',  purity: '≥99%',      stock: 'in' },

  // MOTS-C
  { id: 'motsc-10mg',            name: 'MOTS-C',             cas: 'N/A',           cat: 'misc',    tag: 'Anti-Aging',    price: 70,  unit: '10mg',  purity: '≥98%',      stock: 'in' },
  { id: 'motsc-40mg',            name: 'MOTS-C',             cas: 'N/A',           cat: 'misc',    tag: 'Anti-Aging',    price: 200, unit: '40mg',  purity: '≥98%',      stock: 'in' },

  // NAD+
  { id: 'nad',                   name: 'NAD+',               cas: '53-84-9',       cat: 'misc',    tag: 'Anti-Aging',    price: 80,  unit: '500mg', purity: '≥99%',      stock: 'in' },

  // PT-141
  { id: 'pt141',                 name: 'PT-141',             cas: '189691-06-3',   cat: 'peptide', tag: 'Libido',        price: 60,  unit: '10mg',  purity: '≥99%',      stock: 'in' },

  // SS-31
  { id: 'ss31',                  name: 'SS-31',              cas: '736992-21-5',   cat: 'peptide', tag: 'Anti-Aging',    price: 90,  unit: '10mg',  purity: '≥99%',      stock: 'in' },

  // Selank
  { id: 'selank',                name: 'Selank',             cas: '129954-34-3',   cat: 'peptide', tag: 'Cognitive',     price: 65,  unit: '10mg',  purity: '≥99%',      stock: 'in' },

  // Semax
  { id: 'semax',                 name: 'Semax',              cas: '80714-61-0',    cat: 'peptide', tag: 'Cognitive',     price: 65,  unit: '10mg',  purity: '≥99%',      stock: 'in' },

  // Sermorelin
  { id: 'sermorelin',            name: 'Sermorelin',         cas: '86168-78-7',    cat: 'peptide', tag: 'Muscle Growth', price: 150, unit: '10mg',  purity: '≥99%',      stock: 'in' },
];
