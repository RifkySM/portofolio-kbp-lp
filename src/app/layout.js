import Topbar from "@/components/topbar"
import "./globals.css"
import { Poppins } from 'next/font/google'

const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700'], // Berbagai ketebalan font yang dibutuhkan
  subsets: ['latin'],                          // Subset karakter
  display: 'swap',                             // Strategi loading font
  variable: '--font-poppins',                  // Nama variabel CSS
})

export const metadata = {
  title: "KBPayuk | Kota Baru Parahyangan",
  description: "KBPayuk Website",
  icons: {
    icon: '/logo-kbpayuk.png',
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={poppins.variable}>
      <body className={`font-poppins ${poppins.className}`}>
        <Topbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
