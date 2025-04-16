import Topbar from "@/components/topbar"
import Footer from "@/components/footer"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "KBPayuk | Kota Baru Parahyangan",
  description: "KBPayuk Website",
  icons: {
    icon: '/logo-kbpayuk.png',
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <Topbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
