"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { MiniAuthButton, AuthButton } from "./auth-btn"

export default function Topbar({ menuItems }) {
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedMobileDropdown, setExpandedMobileDropdown] = useState(null)
  const pathname = usePathname()

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleMouseEnter = (index) => {
    setActiveDropdown(index)
  }

  const handleMouseLeave = () => {
    setActiveDropdown(null)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleMobileDropdown = (index) => {
    setExpandedMobileDropdown(expandedMobileDropdown === index ? null : index)
  }

  return (
    <div className="w-full bg-[#0a4c81]">
      <div
        className="max-h-24 text-white py-5 relative"
        style={{
          boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center px-4 sm:px-6 lg:px-28 lg:justify-between justify-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 8,
                }}
              >
                <Image src="/topbar/logo.png" alt="kbpayuk Logo" width={89} height={45} className="h-12 w-auto" />
              </motion.div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex space-x-4 items-center">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Main menu */}
                <div className="relative z-40">
                  <Link
                    href={item.href}
                    className="px-5 py-2.5 rounded-2xl text-white text-base font-semibold tracking-wider bg-[#2b6ca3] hover:bg-[#5a9dd0] transition-colors duration-300 block"
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
                          opacity: { duration: 0.3, ease: "easeInOut" },
                        }}
                        className="absolute bg-white rounded-xl shadow-lg z-30"
                        style={{
                          marginTop: "-15px",
                          paddingTop: "15px",
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

            {/* Login Button */}
            <AuthButton />
          </nav>

          {/* Burger Menu Button */}
          <button
            className="lg:hidden absolute right-4 flex flex-col justify-center items-center w-10 h-10 space-y-1.5 z-50"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-6 h-0.5 bg-white block"
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-6 h-0.5 bg-white block"
            />
            <motion.span
              animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-6 h-0.5 bg-white block"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "tween", duration: 0.5 }}
              className="flex items-center justify-center h-full w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col space-y-6 w-4/5 max-w-sm">
                {menuItems.map((item, index) => (
                  <div key={index} className="border-b border-gray-500/50 pb-4">
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleMobileDropdown(index)}
                    >
                      <span className="text-white font-semibold text-lg">{item.title}</span>
                      {item.dropdownItems && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-5 w-5 text-white transition-transform duration-300 ${expandedMobileDropdown === index ? "rotate-180" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </div>

                    {item.dropdownItems && (
                      <AnimatePresence>
                        {expandedMobileDropdown === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-3 flex flex-col space-y-3">
                              {item.dropdownItems.map((dropdownItem, idx) => (
                                <Link
                                  key={idx}
                                  href={dropdownItem.href}
                                  className="text-white text-center hover:text-[#5a9dd0] transition-colors duration-300"
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

                {/* Login button moved here */}
                <MiniAuthButton />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>




      {/* Social Media Icons */}
      <div className="fixed left-4 sm:left-8 md:left-12 lg:left-16 top-36 z-50 hidden md:flex flex-col space-y-5 bg-white rounded-full p-4 shadow-lg">
        <Link href="#" aria-label="YouTube" className="text-black hover:text-gray-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
          </svg>
        </Link>
        <Link href="#" aria-label="Facebook" className="text-black hover:text-gray-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
          </svg>
        </Link>
        <Link href="#" aria-label="Instagram" className="text-black hover:text-gray-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </Link>
      </div>
    </div>
  )
}