export type Product = {
  id: string
  name: string
  cas: string
  cat: 'peptide' | 'sarm' | 'nootropic' | 'misc'
  price: number
  unit: string
  purity: string
  stock: 'in' | 'low' | 'out'
}

export const PRODUCTS: Product[] = [
  { id: 'bpc157',    name: 'BPC-157',       cas: '137525-51-0',  cat: 'peptide',   price: 74.99, unit: '5mg',   purity: '≥98%', stock: 'in'  },
  { id: 'tb500',     name: 'TB-500',        cas: '77591-33-4',   cat: 'peptide',   price: 89.99, unit: '5mg',   purity: '≥98%', stock: 'out' },
  { id: 'ghrp6',     name: 'GHRP-6',        cas: '87616-84-0',   cat: 'peptide',   price: 54.99, unit: '5mg',   purity: '≥99%', stock: 'in'  },
  { id: 'ghrp2',     name: 'GHRP-2',        cas: '158861-67-7',  cat: 'peptide',   price: 58.99, unit: '5mg',   purity: '≥99%', stock: 'in'  },
  { id: 'cjc1295',   name: 'CJC-1295 DAC',  cas: '863288-34-0',  cat: 'peptide',   price: 92.99, unit: '2mg',   purity: '≥98%', stock: 'low' },
  { id: 'ipamorelin',name: 'Ipamorelin',    cas: '170851-70-4',  cat: 'peptide',   price: 62.99, unit: '5mg',   purity: '≥99%', stock: 'out' },
  { id: 'mk677',     name: 'MK-677',        cas: '159634-47-6',  cat: 'sarm',      price: 49.99, unit: '100mg', purity: '≥99%', stock: 'in'  },
  { id: 'rad140',    name: 'RAD-140',       cas: '1182367-47-0', cat: 'sarm',      price: 54.99, unit: '100mg', purity: '≥99%', stock: 'in'  },
  { id: 'lgd4033',   name: 'LGD-4033',      cas: '1165910-22-4', cat: 'sarm',      price: 48.99, unit: '100mg', purity: '≥99%', stock: 'out' },
  { id: 'semax',     name: 'Semax',         cas: '80714-61-0',   cat: 'nootropic', price: 44.99, unit: '30mg',  purity: '≥98%', stock: 'in'  },
  { id: 'selank',    name: 'Selank',        cas: '129954-34-3',  cat: 'nootropic', price: 42.99, unit: '30mg',  purity: '≥98%', stock: 'low' },
  { id: 'nad',       name: 'NAD+',          cas: '53-84-9',      cat: 'misc',      price: 39.99, unit: '500mg', purity: '≥99%', stock: 'in'  },
]
