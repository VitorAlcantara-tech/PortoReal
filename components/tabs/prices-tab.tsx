"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { MOCK_PRODUCTS } from "@/lib/mock-data"

interface PricesTabProps {
  onSelectProduct: (productId: string) => void
}

export function PricesTab({ onSelectProduct }: PricesTabProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = ["all", "temperos", "chás", "molhos", "pimentas", "farinhas", "grãos"]

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" || product.category.toLowerCase() === selectedCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Search and Filter */}
      <div className="space-y-3 sm:space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 sm:top-3 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
          <Input
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 text-sm"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:px-0 sm:flex-wrap sm:gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-xs sm:text-sm transition-colors flex-shrink-0 sm:flex-shrink-1 whitespace-nowrap ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {category === "all" ? "Todos" : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="p-3 sm:p-4 hover:shadow-lg transition-shadow cursor-pointer flex flex-col"
            onClick={() => onSelectProduct(product.id)}
          >
            <div className="flex flex-col gap-3 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm sm:text-base text-foreground truncate">{product.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{product.category}</p>
                </div>
                <span className="bg-secondary text-secondary-foreground text-xs font-semibold px-2 py-1 rounded flex-shrink-0">
                  {product.category.substring(0, 3)}
                </span>
              </div>

              <div className="flex items-end justify-between gap-2">
                <div className="flex-1">
                  <p className="text-xl sm:text-2xl font-bold text-primary">R$ {product.minPrice.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">Melhor preço</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-muted-foreground">{product.suppliers.length} forn.</p>
                  <span
                    className={`text-xs font-semibold ${product.priceChange < 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {product.priceChange > 0 ? "+" : ""}
                    {product.priceChange}%
                  </span>
                </div>
              </div>

              <Button
                className="w-full bg-transparent text-xs sm:text-sm mt-auto"
                variant="outline"
                onClick={() => onSelectProduct(product.id)}
              >
                Ver Detalhes
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <p className="text-sm sm:text-base text-muted-foreground">Nenhum produto encontrado</p>
        </div>
      )}
    </div>
  )
}
