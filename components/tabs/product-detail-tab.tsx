"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, ExternalLink, TrendingDown, TrendingUp } from "lucide-react"
import { MOCK_PRODUCTS } from "@/lib/mock-data"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

interface ProductDetailTabProps {
  productId: string
  onBack: () => void
}

export function ProductDetailTab({ productId, onBack }: ProductDetailTabProps) {
  const product = MOCK_PRODUCTS.find((p) => p.id === productId)

  if (!product) {
    return (
      <div className="text-center py-8 sm:py-12">
        <p className="text-sm sm:text-base text-muted-foreground mb-4">Produto não encontrado</p>
        <Button onClick={onBack}>Voltar</Button>
      </div>
    )
  }

  const priceHistory = [
    { date: "01/11", price: product.minPrice + 2 },
    { date: "02/11", price: product.minPrice + 1.5 },
    { date: "03/11", price: product.minPrice + 1 },
    { date: "04/11", price: product.minPrice + 0.5 },
    { date: "05/11", price: product.minPrice },
  ]

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
        <Button variant="outline" size="sm" onClick={onBack} className="text-xs sm:text-sm bg-transparent">
          <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          Voltar
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{product.name}</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">{product.category}</p>
        </div>
      </div>

      {/* Price Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        <Card className="p-3 sm:p-4">
          <p className="text-xs text-muted-foreground mb-1">Melhor Preço</p>
          <p className="text-lg sm:text-2xl font-bold text-primary">R$ {product.minPrice.toFixed(2)}</p>
        </Card>
        <Card className="p-3 sm:p-4">
          <p className="text-xs text-muted-foreground mb-1">Preço Máximo</p>
          <p className="text-lg sm:text-2xl font-bold">R$ {product.maxPrice.toFixed(2)}</p>
        </Card>
        <Card className="p-3 sm:p-4">
          <p className="text-xs text-muted-foreground mb-1">Preço Médio</p>
          <p className="text-lg sm:text-2xl font-bold">R$ {product.avgPrice.toFixed(2)}</p>
        </Card>
        <Card className="p-3 sm:p-4">
          <p className="text-xs text-muted-foreground mb-1">Variação 30d</p>
          <div className="flex items-center gap-2">
            <p className="text-lg sm:text-2xl font-bold">{product.priceChange}%</p>
            {product.priceChange < 0 ? (
              <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            ) : (
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
            )}
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="p-3 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-4">Histórico de Preços</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={priceHistory} margin={{ left: -20, right: 10, top: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="date" stroke="var(--color-muted-foreground)" tick={{ fontSize: 11 }} />
              <YAxis stroke="var(--color-muted-foreground)" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                  fontSize: "11px",
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="var(--color-primary)"
                strokeWidth={2}
                dot={{ fill: "var(--color-primary)", r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-3 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-4">Preços por Fornecedor</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={product.suppliers} margin={{ left: -20, right: 10, top: 5, bottom: 50 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis
                dataKey="name"
                stroke="var(--color-muted-foreground)"
                tick={{ fontSize: 11 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="var(--color-muted-foreground)" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                  fontSize: "11px",
                }}
              />
              <Bar dataKey="price" fill="var(--color-primary)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Suppliers */}
      <Card className="p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold mb-4">
          Disponível em {product.suppliers.length} Fornecedores
        </h3>
        <div className="space-y-2 sm:space-y-3">
          {product.suppliers.map((supplier, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 sm:p-4 bg-muted/50 rounded-lg border border-border hover:border-primary/50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm sm:text-base text-foreground">{supplier.name}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{supplier.location}</p>
              </div>
              <div className="flex items-center justify-between gap-2 w-full sm:w-auto">
                <p className="text-lg sm:text-2xl font-bold text-primary">R$ {supplier.price.toFixed(2)}</p>
                <a
                  href={supplier.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2 sm:px-4 py-1.5 sm:py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-xs sm:text-sm flex-shrink-0"
                >
                  Visitar
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
