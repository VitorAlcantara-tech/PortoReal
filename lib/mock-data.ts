import rawProducts from "../python/products-normalized.json"

export interface Supplier {
  name: string
  location: string
  price: number
  url: string
}

export interface Product {
  id: string
  name: string
  category: string
  minPrice: number
  maxPrice: number
  avgPrice: number
  priceChange: number
  suppliers: Supplier[]
}

interface NormalizedProductFromPython {
  id: string
  name: string
  suppliers: Supplier[]
}

const productsFromPython = rawProducts as NormalizedProductFromPython[]

function getCategory(name: string): string {
  const n = name.toLowerCase()

  if (n.includes("pimenta")) return "Temperos"
  if (n.includes("páprica")) return "Temperos"
  if (n.includes("farinha")) return "Farinhas"
  if (n.includes("feijão")) return "Grãos"
  if (n.includes("canjica")) return "Grãos"
  if (n.includes("chá")) return "Chás"

  return "Outros"
}

function calcPriceStats(suppliers: Supplier[]) {
  const prices = suppliers.map((s) => s.price)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  const avgPrice = prices.reduce((sum, p) => sum + p, 0) / prices.length

  return { minPrice, maxPrice, avgPrice }
}

export const MOCK_PRODUCTS: Product[] = productsFromPython.map((p, index) => {
  const { minPrice, maxPrice, avgPrice } = calcPriceStats(p.suppliers)

  return {
    id: String(index + 1),
    name: p.name,
    category: getCategory(p.name),
    minPrice,
    maxPrice,
    avgPrice,
    priceChange: 0,
    suppliers: p.suppliers,
  }
})
