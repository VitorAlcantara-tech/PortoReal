"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { AuthModal } from "./auth-modal"
import { TrendingDown, BarChart3, Zap } from "lucide-react"

export function LandingPage() {
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")

  const handleLoginClick = () => {
    setAuthMode("login")
    setShowAuth(true)
  }

  const handleSignupClick = () => {
    setAuthMode("signup")
    setShowAuth(true)
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-background to-background">
        {/* Header */}
        <header className="border-b border-border sticky top-0 z-40 bg-background/95 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex justify-between items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingDown className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-foreground">PortoReal</span>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <Button
                variant="outline"
                onClick={handleLoginClick}
                size="sm"
                className="text-xs sm:text-sm bg-transparent"
              >
                Entrar
              </Button>
              <Button onClick={handleSignupClick} size="sm" className="text-xs sm:text-sm">
                Cadastrar
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main>
          <section className="max-w-7xl mx-auto px-4 py-8 sm:py-12 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
              <div className="space-y-4 sm:space-y-6">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight text-balance">
                  Monitore preços de <span className="text-primary">ponta a ponta</span>
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground text-balance leading-relaxed">
                  Acompanhe os melhores preços de temperos, chás, molhos, pimentas, farinhas e grãos em diversos
                  distribuidores. Tome decisões inteligentes com dados em tempo real.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button size="lg" onClick={handleSignupClick} className="w-full sm:w-auto">
                    Comece agora
                  </Button>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                    Saiba mais
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-4 sm:p-6 lg:p-8 border border-primary/20">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between bg-card rounded-lg p-3 sm:p-4 border border-border">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">Canela em Pó</p>
                        <p className="text-lg sm:text-2xl font-bold text-foreground">R$ 12,90</p>
                      </div>
                      <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-primary/50 flex-shrink-0 ml-2" />
                    </div>
                    <div className="flex items-center justify-between bg-card rounded-lg p-3 sm:p-4 border border-border">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">Chá Verde Premium</p>
                        <p className="text-lg sm:text-2xl font-bold text-foreground">R$ 18,50</p>
                      </div>
                      <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-primary/50 flex-shrink-0 ml-2" />
                    </div>
                    <div className="flex items-center justify-between bg-card rounded-lg p-3 sm:p-4 border border-border">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">Pimenta do Reino</p>
                        <p className="text-lg sm:text-2xl font-bold text-foreground">R$ 24,00</p>
                      </div>
                      <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-primary/50 flex-shrink-0 ml-2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="bg-primary/5 py-8 sm:py-12 lg:py-20">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Por que escolher PortoReal?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <TrendingDown className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">Preços Atualizados</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Acompanhe variações de preços em tempo real de múltiplos fornecedores.
                  </p>
                </div>
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <BarChart3 className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">Análises Detalhadas</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Veja histórico de preços com gráficos comparativos e tendências.
                  </p>
                </div>
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
                  <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">Decisões Rápidas</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Encontre os melhores fornecedores com links diretos para compra.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {showAuth && (
        <AuthModal mode={authMode} onClose={() => setShowAuth(false)} onModeChange={(mode) => setAuthMode(mode)} />
      )}
    </>
  )
}
