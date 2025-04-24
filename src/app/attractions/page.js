"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

// Data atrraction
const attractionsCategories = [
  {
    id: 1,
    title: "Splash Now!",
    image: "/attractions/attractions-1.png",
  },
  {
    id: 2,
    title: "Art & Science",
    image: "/attractions/attractions-2.png",
  },
  {
    id: 3,
    title: "Fun & Run",
    image: "/attractions/attractions-3.png",
  },
]

export default function AttractionsPage() {
  const [mounted, setMounted] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-white pb-[100vh]">
      <div className="container mx-auto px-4 py-3">
        {/* Food Logo and Title */}
        <div className="flex flex-col items-center justify-center mb-6">
          {/* Logo */}
          <svg
            preserveAspectRatio="xMidYMid meet"
            data-bbox="30 39.999 140 120.001"
            viewBox="30 39.999 140 120.001"
            height="90"
            width="90"
            xmlns="http://www.w3.org/2000/svg"
            className="mb-4"
            >
                <defs>
                    <style>{`#comp-m54si35a svg [data-color="1"] {fill: #8CB04A;}`}</style>
                </defs>
                <g>
                    <path
                        d="M98.683 155.927a2.886 2.886 0 0 1-2.057-.859L83.26 141.599a2.947 2.947 0 0 1 0-4.147 7.081 7.081 0 0 0 2.062-5.018 7.078 7.078 0 0 0-2.062-5.018c-2.661-2.681-7.298-2.681-9.959 0-1.091 1.1-3.024 1.1-4.115 0l-13.367-13.472a2.947 2.947 0 0 1 0-4.147l68.407-68.938a2.892 2.892 0 0 1 4.115 0l13.365 13.469a2.947 2.947 0 0 1 0 4.147c-2.745 2.767-2.745 7.272 0 10.038a7.01 7.01 0 0 0 9.961 0 2.892 2.892 0 0 1 4.115 0l13.365 13.469c.546.55.853 1.295.853 2.074 0 .779-.307 1.524-.853 2.074l-68.407 68.938a2.887 2.887 0 0 1-2.057.859zm-9.482-16.636l9.482 9.557 64.292-64.791-9.486-9.56c-4.962 3.113-11.583 2.506-15.897-1.836a12.932 12.932 0 0 1-3.768-9.168c0-2.46.676-4.82 1.944-6.856l-9.483-9.557-64.292 64.791 9.483 9.557a12.713 12.713 0 0 1 6.805-1.956c3.436 0 6.666 1.349 9.095 3.798a12.919 12.919 0 0 1 3.767 9.165 12.961 12.961 0 0 1-1.942 6.856z"
                        fill="#8CB04A"
                        data-color="1"
                    />
                    <path
                        d="M111.163 127.062a2.91 2.91 0 0 1-2.427-1.315l-6.018-9.156-11.707.112c-1.124.135-2.177-.647-2.66-1.684a2.95 2.95 0 0 1 .411-3.142l7.218-8.612-4.172-10.989a2.949 2.949 0 0 1 .661-3.122 2.877 2.877 0 0 1 3.098-.664l10.904 4.204 8.545-7.277a2.905 2.905 0 0 1 3.117-.415 2.937 2.937 0 0 1 1.671 2.684l-.111 11.797 9.088 6.063a2.939 2.939 0 0 1 1.276 2.844 2.925 2.925 0 0 1-1.989 2.394l-10.694 3.471-3.441 10.774a2.916 2.916 0 0 1-2.77 2.033zm-6.892-16.351c.975 0 1.887.493 2.427 1.315l3.549 5.399 2.043-6.401a2.92 2.92 0 0 1 1.878-1.893l6.354-2.062-5.36-3.574a2.94 2.94 0 0 1-1.304-2.474l.065-6.997-5.01 4.267a2.88 2.88 0 0 1-2.919.498l-6.424-2.474 2.458 6.473a2.95 2.95 0 0 1-.496 2.941l-4.233 5.049 6.941-.066.031-.001z"
                        fill="#8CB04A"
                        data-color="1"
                    />
                    <path
                        d="M148.752 104.531l-7.755-7.816 4.115-4.147 7.755 7.816-4.115 4.147zm-11.638-11.728l-7.755-7.816 4.115-4.147 7.755 7.816-4.115 4.147zM125.48 81.078l-7.755-7.816 4.115-4.147 7.755 7.816-4.115 4.147zM113.843 69.35l-7.755-7.816 4.115-4.147 7.755 7.816-4.115 4.147z"
                        fill="#8CB04A"
                        data-color="1"
                    />
                    <path
                        d="M73.716 160a2.886 2.886 0 0 1-2.057-.859l-13.365-13.469a2.947 2.947 0 0 1 0-4.147c2.745-2.767 2.745-7.272 0-10.038a7.012 7.012 0 0 0-9.959 0 2.892 2.892 0 0 1-4.115 0l-13.367-13.469a2.942 2.942 0 0 1-.853-2.074c0-.779.307-1.524.853-2.074l62.772-63.262c.56-.564 1.357-.853 2.117-.859a2.905 2.905 0 0 1 2.08.945l4.276 4.674-4.28 3.975-2.221-2.429-58.572 59.029 9.486 9.56a12.808 12.808 0 0 1 15.897 1.836c4.307 4.342 4.914 11.021 1.823 16.021l9.485 9.56 6.698-6.75 4.115 4.147-8.756 8.824a2.887 2.887 0 0 1-2.057.859z"
                        fill="#8CB04A"
                        data-color="1"
                    />
                </g>
            </svg>

          {/* Title and Tagline */}
          <h1 className="text-4xl font-bold text-gray-800 mb-1">ATTRACTIONS</h1>
          <p className="text-xl text-gray-800">Get fun at KBPayuk!</p>
        </div>

        {/* Food Categories */}
        <div className="flex flex-wrap justify-center gap-2">
          {attractionsCategories.map((category, index) => (
            <div
              key={category.id}
              className="relative flex items-center justify-center"
              style={{
                width: "252px",
                height: "400px",
              }}
            >
              <motion.div
                className="relative cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* Container */}
                <motion.div
                  className="relative overflow-hidden"
                  style={{
                    borderTopLeftRadius: "9999px",
                    borderTopRightRadius: "9999px",
                    borderBottomLeftRadius: "0",
                    borderBottomRightRadius: "0",
                  }}
                  animate={{
                    width: hoveredIndex === index ? "216px" : "246px",
                    height: hoveredIndex === index ? "305px" : "345px",
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                >
                  {/* Image */}
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    fill
                    className="object-cover"
                  />

                  {/* Overlay - constant opacity */}
                  {/* <div className="absolute inset-0" /> */}

                  {/* Text */}
                  <div className="absolute bottom-4 left-0 right-0 text-center">
                    <AnimatePresence mode="wait">
                      {hoveredIndex === index ? (
                        <motion.h2
                          key={`small-${category.id}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: 0.2,
                          }}
                          className="text-white text-2xl font-semibold"
                        >
                          {category.title}
                        </motion.h2>
                      ) : (
                        <motion.h2
                          key={`large-${category.id}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0 }}
                          className="text-white text-3xl font-semibold"
                        >
                          {category.title}
                        </motion.h2>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}