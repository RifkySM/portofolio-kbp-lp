"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

const menuItems = [
  {
    title: "Discover KBPayuk",
    href: "#",
    dropdownItems: [
      { title: "Attractions", href: "#attractions" },
      { title: "Food", href: "#food" },
      { title: "Shopping", href: "#shopping" },
      { title: "Wellness", href: "#wellness" },
    ],
  },
  {
    title: "What's On",
    href: "#",
    dropdownItems: [
      { title: "KBPayuk Event", href: "#kbpayuk-event" },
      { title: "News", href: "#news" },
    ],
  },
  {
    title: "Enjoy Your Stay",
    href: "#",
    dropdownItems: [{ title: "Mason Pine Hotel", href: "#hotel" }],
  },
  {
    title: "Get Explore",
    href: "#",
    dropdownItems: [
      { title: "KBPa Maps", href: "#maps" },
      { title: "KBPa Transportation", href: "#transportation" },
    ],
  },
]

export default function Topbar() {
  const [activeDropdown, setActiveDropdown] = useState(null)

  const handleMouseEnter = (index) => {
    setActiveDropdown(index)
  }

  const handleMouseLeave = () => {
    setActiveDropdown(null)
  }

  return (
    <div className="relative">
      <div 
        className="bg-[#0a4c81] text-white py-7 relative"
        style={{
          boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.5)"
        }}
      >
        <div className="max-w-7xl mx-48 px-4 flex justify-between items-center">
          <div className="flex-shrink-0 ml-[10%]">
            <Link href="/">
              <Image
                src="/kbpayuk-event/logo.png"
                alt="Kopa.yuk Logo"
                width={160}
                height={70}
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Sosial Media Icons (Left Side) */}
          <div className="fixed left-[78px] top-[152px] flex flex-col space-y-5">
            <Link href="#" aria-label="YouTube" className="text-black">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </Link>
            <Link href="#" aria-label="Facebook" className="text-black">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </Link>
            <Link href="#" aria-label="Instagram" className="text-black">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex space-x-5 mr-[2%]">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Menu utama */}
                <div className="relative z-20">
                  <Link
                    href={item.href}
                    className="px-10 py-3 rounded-2xl text-white text-lg font-sans font-bold bg-[#2b6ca3] hover:bg-[#5a9dd0] transition-colors duration-300 block"
                  >
                    {item.title}
                  </Link>
                </div>

                {/* Dropdown Menu */}
                {item.dropdownItems && (
                  <AnimatePresence>
                    {activeDropdown === index && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ 
                          opacity: { duration: 0.3, ease: "easeInOut" }
                        }}
                        className="absolute left-0 w-full bg-white rounded-xl shadow-lg z-10"
                        style={{
                          marginTop: "-15px", // Sedikit overlap dengan tombol utama
                          paddingTop: "15px", // Ruang di bagian atas untuk overlap
                          width: "120%",
                          left: "-10%",
                        }}
                      >
                        <div className="py-2">
                          {item.dropdownItems.map((dropdownItem, idx) => (
                            <Link
                              key={idx}
                              href={dropdownItem.href}
                              className="block px-6 py-3 text-md text-gray-800 hover:font-bold transition-all duration-300 text-center"
                            >
                              {dropdownItem.title}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
