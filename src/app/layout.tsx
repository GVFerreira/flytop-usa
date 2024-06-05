import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "Fly Top Travels",
  description: "Fly Top",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className="text-sky-900 flex flex-col min-h-screen">
        {children}
        <Toaster />
      </body>
    </html>
  )
}
