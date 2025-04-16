import Topbar from "@/components/topbar"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "KBPayuk",
  description: "KBPayuk Website",
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <Topbar />
        {children}
      </body>
    </html>
  )
}
