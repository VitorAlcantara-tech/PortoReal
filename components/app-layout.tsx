"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { DashboardTab } from "./tabs/dashboard-tab"
import { PricesTab } from "./tabs/prices-tab"
import { ProductDetailTab } from "./tabs/product-detail-tab"
import { Button } from "@/components/ui/button"
import { LogOut, BarChart3 } from "lucide-react"

export function AppLayout() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState<"dashboard" | "prices" | "product-detail">("dashboard")
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)

  const handleSelectProduct = (productId: string) => {
    setSelectedProduct(productId)
    setActiveTab("product-detail")
  }

  const handleBackToPrices = () => {
    setActiveTab("prices")
    setSelectedProduct(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex justify-between items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="min-w-0">
              <span className="text-base sm:text-lg font-bold text-foreground block">PortoReal</span>
              <span className="text-xs text-muted-foreground truncate block">{user?.email}</span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            className="text-xs sm:text-sm flex-shrink-0 bg-transparent"
          >
            <LogOut className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Sair</span>
            <span className="sm:hidden">Sair</span>
          </Button>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 flex gap-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-3 sm:px-4 py-2 sm:py-3 font-medium text-xs sm:text-sm border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "dashboard"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("prices")}
            className={`px-3 sm:px-4 py-2 sm:py-3 font-medium text-xs sm:text-sm border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "prices"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Preços
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        {activeTab === "dashboard" && <DashboardTab />}
        {activeTab === "prices" && <PricesTab onSelectProduct={handleSelectProduct} />}
        {activeTab === "product-detail" && selectedProduct && (
          <ProductDetailTab productId={selectedProduct} onBack={handleBackToPrices} />
        )}
      </main>
    </div>
  )
}
