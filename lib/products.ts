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
  description?: string;
}

const DESC: Record<string, string> = {
  'Tirzepatide':       'Dual GIP/GLP-1 receptor agonist investigated for metabolic regulation, appetite suppression, and body weight reduction. Research highlights robust effects on glucose homeostasis and visceral adipose tissue across multiple clinical models.',
  'Retatrutide':       'Triple GIP/GLP-1/glucagon receptor agonist under active clinical investigation for obesity and metabolic syndrome. Preclinical and early-phase data demonstrate significant reductions in body weight and improvements in lipid profiles.',
  'Tesamorelin':       'Synthetic analog of growth hormone-releasing hormone (GHRH) that stimulates endogenous GH secretion. Research focuses on its effects on lean body mass preservation, visceral fat reduction, and IGF-1 modulation.',
  'TB-500':            'Synthetic version of Thymosin Beta-4, an actin-sequestering peptide involved in cell migration and tissue homeostasis. Research areas include wound healing mechanisms, angiogenesis, and inflammatory pathway modulation.',
  'BPC-157':           'Pentadecapeptide fragment derived from human gastric juice with pleiotropic tissue-protective properties. Extensively studied across tendon, ligament, muscle, gastrointestinal, and neurological tissue repair models.',
  'BPC-157 + TB-500':  'Synergistic combination of BPC-157 and TB-500 formulated for research exploring complementary tissue repair pathways. Studies suggest additive effects on healing rates compared to either peptide administered alone.',
  'BAC Water':         'Bacteriostatic water containing 0.9% benzyl alcohol for inhibiting microbial growth. USP-grade standard used in research settings for reconstituting lyophilized peptides and other research compounds.',
  'Cagrilintide':      'Long-acting amylin analog designed for once-weekly administration. Research examines its role in satiety signalling, gastric emptying regulation, and synergistic weight reduction when combined with GLP-1 receptor agonists.',
  'CJC-1295 no DAC':   'Modified GHRH analog (without Drug Affinity Complex) with a shorter half-life that produces pulsatile GH release. Used in research to study physiological growth hormone secretion patterns and downstream IGF-1 effects.',
  'CJC + Ipamorelin':  'Combination of CJC-1295 (no DAC) and Ipamorelin targeting both GHRH and ghrelin receptors for synergistic GH release. Research indicates a more pronounced and sustained GH pulse compared to either compound alone.',
  'DSIP':              'Delta Sleep-Inducing Peptide is a neuropeptide involved in sleep regulation and stress response modulation. Research investigates its effects on sleep architecture, cortisol patterns, and neuroprotective mechanisms.',
  'Epithalon':         'Synthetic tetrapeptide and pineal gland derivative studied for its effects on telomerase activation and telomere elongation. Research focus includes longevity biomarkers, circadian rhythm regulation, and oxidative stress reduction.',
  'GHK-Cu':            'Copper-binding tripeptide naturally occurring in human plasma with declining concentrations with age. Research demonstrates roles in collagen synthesis stimulation, antioxidant gene expression, and wound contraction signalling.',
  'Glutathione':       'Master endogenous antioxidant tripeptide involved in cellular detoxification, immune function, and oxidative stress defence. Research examines its role in mitochondrial protection, heavy metal chelation, and inflammatory cascade regulation.',
  'Glow':              'Proprietary blend formulated for research into skin quality, melanin regulation, and antioxidant biomarker improvement. Combines select peptide fractions studied for synergistic effects on dermal collagen architecture.',
  'Ipamorelin':        'Selective growth hormone secretagogue and ghrelin receptor agonist with high GH specificity and minimal cortisol or prolactin interference. Research focuses on GH pulse amplification, lean mass support, and GH axis modelling.',
  'Klow80':            'Proprietary research formulation under investigation for appetite regulation and metabolic efficiency pathways. Designed for studies examining alternative mechanisms of weight management beyond standard GLP-1 receptor engagement.',
  'KPV':               'C-terminal tripeptide of alpha-melanocyte stimulating hormone with selective anti-inflammatory properties. Research focuses on gut inflammation modulation, cytokine suppression, and mucosal barrier integrity in colitis models.',
  'Lemon Bottle':      'Research formulation studied for localised adipocyte disruption mechanisms via phospholipase-based pathways. Used in preclinical models examining non-surgical approaches to focal adipose tissue reduction.',
  'Melanotan 1':       'Linear analog of alpha-MSH that activates melanocortin receptors to stimulate melanin production. Research focus includes photoprotection mechanisms, immune modulation, and the relationship between MC1R activation and skin pigmentation.',
  'Melanotan 2':       'Cyclic analog of alpha-MSH with activity across multiple melanocortin receptor subtypes (MC1R, MC3R, MC4R). Studied for melanogenesis stimulation, appetite suppression, and CNS effects including libido and energy regulation.',
  'MOTS-C':            'Mitochondria-derived peptide encoded within the 12S rRNA gene with roles in metabolic homeostasis and cellular stress response. Research highlights its effects on AMPK activation, insulin sensitivity, and exercise-mimicking metabolic shifts.',
  'NAD+':              'Essential coenzyme central to cellular energy metabolism, DNA repair, and sirtuin activation. Research examines supplemental NAD+ effects on mitochondrial biogenesis, age-related NAD+ decline, and neurological protection.',
  'PT-141':            'Melanocortin receptor agonist (MC3R/MC4R) developed from Melanotan II with CNS-mediated effects on sexual arousal pathways. Research focuses on its action through hypothalamic dopaminergic circuits rather than vascular mechanisms.',
  'SS-31':             'Mitochondria-targeting tetrapeptide (Szeto-Schiller peptide) that concentrates at the inner mitochondrial membrane. Research examines its protective effects on cardiolipin integrity, ATP production, and ROS generation under cellular stress.',
  'Selank':            'Synthetic heptapeptide analog of tuftsin with anxiolytic and nootropic properties. Research investigates its modulation of GABAergic tone, BDNF expression, and cytokine balance in stress and anxiety models.',
  'Semax':             'ACTH(4-7) analog with potent nootropic and neuroprotective properties. Research focus includes BDNF upregulation, VEGF expression in ischaemic models, and cognitive enhancement through monoaminergic pathway modulation.',
  'Sermorelin':        'Synthetic 29-amino acid analog of GHRH that stimulates pituitary GH release through endogenous regulatory pathways. Research explores its utility in GH deficiency models, muscle anabolism, and maintaining intact hypothalamic-pituitary feedback.',
};

export const products: Product[] = [
  // Tirzepatide
  { id: 'tirzepatide-20mg',      name: 'Tirzepatide',        cas: '2023788-19-2',  cat: 'peptide', tag: 'Weight Loss',   price: 75,  unit: '20mg',  purity: '≥99%',      stock: 'in',  bestSeller: true, description: DESC['Tirzepatide'] },
  { id: 'tirzepatide-30mg',      name: 'Tirzepatide',        cas: '2023788-19-2',  cat: 'peptide', tag: 'Weight Loss',   price: 90,  unit: '30mg',  purity: '≥99%',      stock: 'in',  description: DESC['Tirzepatide'] },
  { id: 'tirzepatide-60mg',      name: 'Tirzepatide',        cas: '2023788-19-2',  cat: 'peptide', tag: 'Weight Loss',   price: 180, unit: '60mg',  purity: '≥99%',      stock: 'out', description: DESC['Tirzepatide'] },

  // Retatrutide
  { id: 'retatrutide-5mg',       name: 'Retatrutide',        cas: '2381089-83-2',  cat: 'peptide', tag: 'Weight Loss',   price: 70,  unit: '5mg',   purity: '≥99%',      stock: 'out', description: DESC['Retatrutide'] },
  { id: 'retatrutide-10mg',      name: 'Retatrutide',        cas: '2381089-83-2',  cat: 'peptide', tag: 'Weight Loss',   price: 90,  unit: '10mg',  purity: '≥99%',      stock: 'in',  bestSeller: true, description: DESC['Retatrutide'] },
  { id: 'retatrutide-20mg',      name: 'Retatrutide',        cas: '2381089-83-2',  cat: 'peptide', tag: 'Weight Loss',   price: 150, unit: '20mg',  purity: '≥99%',      stock: 'in',  description: DESC['Retatrutide'] },
  { id: 'retatrutide-30mg',      name: 'Retatrutide',        cas: '2381089-83-2',  cat: 'peptide', tag: 'Weight Loss',   price: 190, unit: '30mg',  purity: '≥99%',      stock: 'out', description: DESC['Retatrutide'] },
  { id: 'retatrutide-60mg',      name: 'Retatrutide',        cas: '2381089-83-2',  cat: 'peptide', tag: 'Weight Loss',   price: 360, unit: '60mg',  purity: '≥99%',      stock: 'out', description: DESC['Retatrutide'] },

  // Tesamorelin
  { id: 'tesamorelin',           name: 'Tesamorelin',        cas: '218949-48-5',   cat: 'peptide', tag: 'Muscle Growth', price: 150, unit: '10mg',  purity: '≥98%',      stock: 'in',  description: DESC['Tesamorelin'] },

  // TB-500
  { id: 'tb500',                 name: 'TB-500',             cas: '77591-33-4',    cat: 'peptide', tag: 'Recovery',      price: 120, unit: '10mg',  purity: '≥98%',      stock: 'in',  description: DESC['TB-500'] },

  // BPC-157
  { id: 'bpc157',                name: 'BPC-157',            cas: '137525-51-0',   cat: 'peptide', tag: 'Recovery',      price: 55,  unit: '10mg',  purity: '≥99%',      stock: 'in',  bestSeller: true, description: DESC['BPC-157'] },

  // BPC-157 + TB-500 combo
  { id: 'bpc157-tb500-10mg',     name: 'BPC-157 + TB-500',  cas: 'N/A',           cat: 'peptide', tag: 'Recovery',      price: 100, unit: '10mg',  purity: '≥98%',      stock: 'in',  description: DESC['BPC-157 + TB-500'] },
  { id: 'bpc157-tb500-20mg',     name: 'BPC-157 + TB-500',  cas: 'N/A',           cat: 'peptide', tag: 'Recovery',      price: 190, unit: '20mg',  purity: '≥98%',      stock: 'in',  description: DESC['BPC-157 + TB-500'] },

  // BAC Water
  { id: 'bac-water-3ml',         name: 'BAC Water',          cas: '7732-18-5',     cat: 'misc',    tag: 'Ancillary',     price: 10,  unit: '3ml',   purity: 'USP Grade', stock: 'out', description: DESC['BAC Water'] },
  { id: 'bac-water-10ml',        name: 'BAC Water',          cas: '7732-18-5',     cat: 'misc',    tag: 'Ancillary',     price: 25,  unit: '10ml',  purity: 'USP Grade', stock: 'out', description: DESC['BAC Water'] },

  // Cagrilintide
  { id: 'cagrilintide',          name: 'Cagrilintide',       cas: 'N/A',           cat: 'peptide', tag: 'Weight Loss',   price: 160, unit: '10mg',  purity: '≥99%',      stock: 'out', description: DESC['Cagrilintide'] },

  // CJC-1295 no DAC
  { id: 'cjc1295-nodac',         name: 'CJC-1295 no DAC',   cas: '863288-34-0',   cat: 'peptide', tag: 'Muscle Growth', price: 130, unit: '10mg',  purity: '≥99%',      stock: 'out', description: DESC['CJC-1295 no DAC'] },

  // CJC no DAC + Ipamorelin
  { id: 'cjc-ipa',               name: 'CJC + Ipamorelin',  cas: 'N/A',           cat: 'peptide', tag: 'Muscle Growth', price: 110, unit: '10mg',  purity: '≥98%',      stock: 'in',  description: DESC['CJC + Ipamorelin'] },

  // DSIP
  { id: 'dsip',                  name: 'DSIP',               cas: '62568-57-4',    cat: 'peptide', tag: 'Recovery',      price: 60,  unit: '5mg',   purity: '≥99%',      stock: 'out', description: DESC['DSIP'] },

  // Epithalon
  { id: 'epithalon',             name: 'Epithalon',          cas: '307297-39-8',   cat: 'peptide', tag: 'Anti-Aging',    price: 70,  unit: '10mg',  purity: '≥99%',      stock: 'out', description: DESC['Epithalon'] },

  // GHK-Cu
  { id: 'ghkcu-50mg',            name: 'GHK-Cu',             cas: '49557-75-7',    cat: 'peptide', tag: 'Anti-Aging',    price: 40,  unit: '50mg',  purity: '≥99%',      stock: 'in',  description: DESC['GHK-Cu'] },
  { id: 'ghkcu-100mg',           name: 'GHK-Cu',             cas: '49557-75-7',    cat: 'peptide', tag: 'Anti-Aging',    price: 60,  unit: '100mg', purity: '≥99%',      stock: 'in',  description: DESC['GHK-Cu'] },

  // Glutathione
  { id: 'glutathione',           name: 'Glutathione',        cas: '70-18-8',       cat: 'misc',    tag: 'Anti-Aging',    price: 45,  unit: '600mg', purity: '≥99%',      stock: 'in',  description: DESC['Glutathione'] },

  // Glow
  { id: 'glow-50mg',             name: 'Glow',               cas: 'N/A',           cat: 'misc',    tag: 'Anti-Aging',    price: 140, unit: '50mg',  purity: '≥98%',      stock: 'in',  description: DESC['Glow'] },
  { id: 'glow-70mg',             name: 'Glow',               cas: 'N/A',           cat: 'misc',    tag: 'Anti-Aging',    price: 165, unit: '70mg',  purity: '≥98%',      stock: 'out', description: DESC['Glow'] },

  // Ipamorelin
  { id: 'ipamorelin',            name: 'Ipamorelin',         cas: '170851-70-4',   cat: 'peptide', tag: 'Muscle Growth', price: 75,  unit: '10mg',  purity: '≥99%',      stock: 'out', description: DESC['Ipamorelin'] },

  // Klow80
  { id: 'klow80',                name: 'Klow80',             cas: 'N/A',           cat: 'misc',    tag: 'Weight Loss',   price: 170, unit: '80mg',  purity: '≥98%',      stock: 'out', description: DESC['Klow80'] },

  // KPV
  { id: 'kpv',                   name: 'KPV',                cas: '13358-08-4',    cat: 'peptide', tag: 'Recovery',      price: 60,  unit: '10mg',  purity: '≥99%',      stock: 'out', description: DESC['KPV'] },

  // Lemon Bottle
  { id: 'lemon-bottle',          name: 'Lemon Bottle',       cas: 'N/A',           cat: 'misc',    tag: 'Weight Loss',   price: 75,  unit: '10mg',  purity: '≥98%',      stock: 'out', description: DESC['Lemon Bottle'] },

  // Melanotan 1
  { id: 'melanotan1',            name: 'Melanotan 1',        cas: '75921-69-6',    cat: 'peptide', tag: 'Tanning',       price: 60,  unit: '10mg',  purity: '≥99%',      stock: 'in',  description: DESC['Melanotan 1'] },

  // Melanotan 2
  { id: 'melanotan2',            name: 'Melanotan 2',        cas: '121062-08-6',   cat: 'peptide', tag: 'Tanning',       price: 60,  unit: '10mg',  purity: '≥99%',      stock: 'in',  description: DESC['Melanotan 2'] },

  // MOTS-C
  { id: 'motsc-10mg',            name: 'MOTS-C',             cas: 'N/A',           cat: 'misc',    tag: 'Anti-Aging',    price: 70,  unit: '10mg',  purity: '≥98%',      stock: 'in',  description: DESC['MOTS-C'] },
  { id: 'motsc-40mg',            name: 'MOTS-C',             cas: 'N/A',           cat: 'misc',    tag: 'Anti-Aging',    price: 200, unit: '40mg',  purity: '≥98%',      stock: 'out', description: DESC['MOTS-C'] },

  // NAD+
  { id: 'nad',                   name: 'NAD+',               cas: '53-84-9',       cat: 'misc',    tag: 'Anti-Aging',    price: 80,  unit: '500mg', purity: '≥99%',      stock: 'out', description: DESC['NAD+'] },

  // PT-141
  { id: 'pt141',                 name: 'PT-141',             cas: '189691-06-3',   cat: 'peptide', tag: 'Libido',        price: 60,  unit: '10mg',  purity: '≥99%',      stock: 'in',  description: DESC['PT-141'] },

  // SS-31
  { id: 'ss31',                  name: 'SS-31',              cas: '736992-21-5',   cat: 'peptide', tag: 'Anti-Aging',    price: 90,  unit: '10mg',  purity: '≥99%',      stock: 'in',  description: DESC['SS-31'] },

  // Selank
  { id: 'selank',                name: 'Selank',             cas: '129954-34-3',   cat: 'peptide', tag: 'Cognitive',     price: 65,  unit: '10mg',  purity: '≥99%',      stock: 'in',  description: DESC['Selank'] },

  // Semax
  { id: 'semax',                 name: 'Semax',              cas: '80714-61-0',    cat: 'peptide', tag: 'Cognitive',     price: 65,  unit: '10mg',  purity: '≥99%',      stock: 'in',  description: DESC['Semax'] },

  // Sermorelin
  { id: 'sermorelin',            name: 'Sermorelin',         cas: '86168-78-7',    cat: 'peptide', tag: 'Muscle Growth', price: 150, unit: '10mg',  purity: '≥99%',      stock: 'in',  description: DESC['Sermorelin'] },
];
