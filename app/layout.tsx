import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ClientLayout } from "./ClientLayout"

const _geist = { subsets: ["latin"] }
const _geistMono = { subsets: ["latin"] }

export const metadata: Metadata = {
  title: "PortoReal - Monitor de Preços",
  description: "Monitore preços de ponta a ponta",
  generator: "v0.app",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className="light"
      style={{ colorScheme: "light" }}
    >
      <body className="font-sans antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}

