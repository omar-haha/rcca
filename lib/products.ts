export type Category = 'peptide' | 'misc';

export interface Product {
  id: string;
  name: string;
  cas: string;
  cat: Category;
  price: number;
  unit: string;
  purity: string;
  stock: 'in' | 'low' | 'out';
  bestSeller?: boolean;
}

export const products: Product[] = [
  // PEPTIDES
  { id: 'retatrutide', name: 'Retatrutide',   cas: '2381089-83-2', cat: 'peptide',   price: 149.99, unit: '10mg',  purity: '≥99%', stock: 'in',  bestSeller: true  },
  { id: 'bpc157',      name: 'BPC-157',       cas: '137525-51-0',  cat: 'peptide',   price: 74.99,  unit: '5mg',  purity: '≥98%', stock: 'in',  bestSeller: true  },
  { id: 'tb500',       name: 'TB-500',        cas: '77591-33-4',   cat: 'peptide',   price: 89.99,  unit: '5mg',  purity: '≥98%', stock: 'low', bestSeller: true  },
  { id: 'tirzepatide', name: 'Tirzepatide',   cas: '2023788-19-2', cat: 'peptide',   price: 129.99, unit: '10mg', purity: '≥99%', stock: 'in',  bestSeller: true  },
  { id: 'ghkcu',       name: 'GHK-Cu',        cas: '49557-75-7',   cat: 'peptide',   price: 59.99,  unit: '50mg', purity: '≥99%', stock: 'in'  },
  { id: 'ipamorelin',  name: 'Ipamorelin',    cas: '170851-70-4',  cat: 'peptide',   price: 54.99,  unit: '5mg',  purity: '≥99%', stock: 'in'  },
  { id: 'dsip',        name: 'DSIP',          cas: '62568-57-4',   cat: 'peptide',   price: 49.99,  unit: '5mg',  purity: '≥98%', stock: 'in'  },
  { id: 'cjc1295',     name: 'CJC-1295',      cas: '863288-34-0',  cat: 'peptide',   price: 64.99,  unit: '2mg',  purity: '≥99%', stock: 'out' },
  { id: 'nad',         name: 'NAD+',          cas: '53-84-9',      cat: 'misc',      price: 39.99,  unit: '500mg',purity: '≥99%', stock: 'in'  },
]
