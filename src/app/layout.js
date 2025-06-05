import Topbar from "@/components/topbar"
import Footer from "@/components/footer"
import "./globals.css"
import { Poppins } from 'next/font/google'
import { generateMenu } from "@/util/generateMenu"

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

export default async function RootLayout({ children }) {
  const menuItems = await generateMenu()
  return (
    <html lang="id" className={poppins.variable}>
      <body className={`font-poppins ${poppins.className}`}>
        <Topbar menuItems={menuItems} />
        {children}
        <Footer />
      </body>
    </html>
  )
}
