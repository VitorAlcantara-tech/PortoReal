"use client"

import { Card } from "@/components/ui/card"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { TrendingDown, TrendingUp, Package } from "lucide-react"

const priceData = [
  { name: "Jan", prices: 15.2 },
  { name: "Fev", prices: 14.8 },
  { name: "Mar", prices: 16.1 },
  { name: "Abr", prices: 15.9 },
  { name: "Mai", prices: 17.2 },
  { name: "Jun", prices: 16.8 },
]

const topProducts = [
  { name: "Pimenta Preta Em Grão", category: "Temperos", change: -5.2, price: 48.95 },
  { name: "Páprica Defumada", category: "Temperos", change: 3.1, price: 12.6 },
  { name: "Erva Doce", category: "Chás", change: -2.8, price: 22.52 },
  { name: "Farinha de Uva", category: "Farinhas", change: 1.5, price: 25.51 },
]

export function DashboardTab() {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-4 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-muted-foreground mb-1">Produtos Monitorados</p>
              <p className="text-2xl sm:text-3xl font-bold">10</p>
            </div>
            <Package className="w-6 h-6 sm:w-8 sm:h-8 text-primary/50 flex-shrink-0" />
          </div>
        </Card>
        <Card className="p-4 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-muted-foreground mb-1">Economia Média</p>
              <p className="text-2xl sm:text-3xl font-bold">12.5%</p>
            </div>
            <TrendingDown className="w-6 h-6 sm:w-8 sm:h-8 text-primary/50 flex-shrink-0" />
          </div>
        </Card>
        <Card className="p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-muted-foreground mb-1">Distribuidores</p>
              <p className="text-2xl sm:text-3xl font-bold">2</p>
            </div>
            <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-primary/50 flex-shrink-0" />
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-4">Tendência de Preços (últimos 6 meses)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={priceData} margin={{ left: -20, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-muted-foreground)" tick={{ fontSize: 12 }} />
              <YAxis stroke="var(--color-muted-foreground)" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Line
                type="monotone"
                dataKey="prices"
                stroke="var(--color-primary)"
                strokeWidth={2}
                dot={{ fill: "var(--color-primary)", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-4">Produtos em Alta e Baixa</h3>
          <div className="space-y-2 sm:space-y-3">
            {topProducts.map((product) => (
              <div
                key={product.name}
                className="flex items-center justify-between p-2 sm:p-3 bg-muted/50 rounded-lg gap-2"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-xs sm:text-sm truncate">{product.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{product.category}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-semibold text-xs sm:text-sm">R$ {product.price.toFixed(2)}</p>
                  <p className={`text-xs font-semibold ${product.change < 0 ? "text-green-600" : "text-red-600"}`}>
                    {product.change > 0 ? "+" : ""}
                    {product.change}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
