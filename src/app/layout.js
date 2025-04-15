import Topbar from "@/components/topbar"
import { Inter } from "next/font/google"
import "./globals.css"

// Opsional: Gunakan font system atau custom font
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Nama Website Anda",
  description: "Deskripsi website Anda",
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
