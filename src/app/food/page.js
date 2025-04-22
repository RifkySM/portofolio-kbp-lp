"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

// Data food categories
const foodCategories = [
  {
    id: 1,
    title: "Fine Dine",
    image: "/food/food-1.png",
  },
  {
    id: 2,
    title: "Breakfast",
    image: "/food/food-2.png",
  },
  {
    id: 3,
    title: "Coffee & Bar",
    image: "/food/food-3.png",
  },
  {
    id: 4,
    title: "Nusantara",
    image: "/food/food-4.png",
  },
  {
    id: 5,
    title: "Western",
    image: "/food/food-5.png",
  },
]

export default function FoodPage() {
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
        <div className="flex flex-col items-center justify-center mb-16">
          {/* Logo */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="125"
            height="125"
            viewBox="0 0 200 200"
            fill="none"
            stroke="currentColor"
            className="text-purple-700"
          >
            <path
              d="M171.936 91.577h-5.453a3.35 3.35 0 0 0-.68-.928c-2.591-2.441-4.019-5.696-4.021-9.161-.002-3.475 1.427-6.74 4.021-9.194 3.953-3.725 6.131-8.713 6.135-14.045.003-5.34-2.174-10.34-6.135-14.085-2.591-2.441-4.018-5.695-4.021-9.161-.003-3.474 1.426-6.74 4.025-9.197a3.352 3.352 0 0 0 .12-4.76 3.398 3.398 0 0 0-4.787-.119c-3.958 3.742-6.134 8.743-6.131 14.082.004 5.33 2.183 10.317 6.131 14.039 2.598 2.457 4.027 5.722 4.025 9.197-.002 3.466-1.431 6.719-4.025 9.165-3.958 3.741-6.134 8.741-6.131 14.081.003 3.62 1.03 7.07 2.912 10.086h-4.979a3.35 3.35 0 0 0-.68-.928c-2.591-2.441-4.019-5.696-4.021-9.161-.002-3.475 1.427-6.74 4.021-9.194 3.953-3.725 6.131-8.713 6.135-14.045.003-5.34-2.174-10.34-6.135-14.085-2.591-2.441-4.018-5.695-4.021-9.161-.003-3.474 1.426-6.74 4.025-9.197a3.352 3.352 0 0 0 .12-4.76 3.398 3.398 0 0 0-4.787-.119c-3.958 3.742-6.134 8.743-6.131 14.082.004 5.33 2.183 10.317 6.131 14.039 2.598 2.457 4.027 5.722 4.025 9.197-.002 3.466-1.431 6.719-4.025 9.165-3.958 3.741-6.134 8.741-6.131 14.081.003 3.62 1.03 7.07 2.912 10.086h-4.978a3.35 3.35 0 0 0-.68-.928c-2.591-2.441-4.019-5.696-4.021-9.161-.002-3.475 1.427-6.74 4.021-9.194 3.952-3.725 6.13-8.713 6.134-14.045.004-5.34-2.174-10.34-6.134-14.085-2.591-2.441-4.018-5.695-4.021-9.161-.003-3.474 1.426-6.74 4.025-9.197a3.352 3.352 0 0 0 .12-4.76 3.398 3.398 0 0 0-4.787-.119c-3.958 3.742-6.134 8.743-6.131 14.082.004 5.33 2.183 10.317 6.131 14.039 2.598 2.456 4.027 5.722 4.024 9.197-.002 3.466-1.431 6.719-4.024 9.165-3.958 3.741-6.134 8.741-6.131 14.081.003 3.62 1.03 7.07 2.912 10.086h-9.706c-.554-22.275-18.926-40.229-41.445-40.229S38.798 69.305 38.243 91.58H28.062a3.378 3.378 0 0 0-3.387 3.368c0 29.551 17.284 55.154 42.316 67.35v14.335c0 1.859 1.516 3.367 3.387 3.367h57.55c1.87 0 3.387-1.508 3.387-3.367v-13.55c25.94-11.85 44.009-37.925 44.009-68.135a3.38 3.38 0 0 0-3.388-3.371zm-92.25-33.495c18.785 0 34.12 14.934 34.672 33.494h-6.768c-.548-14.845-12.851-26.756-27.904-26.756S52.331 76.73 51.783 91.576h-6.768c.552-18.561 15.887-33.494 34.671-33.494zm14.337 33.495c-.535-7.41-6.752-13.282-14.336-13.282S65.886 84.166 65.35 91.577h-6.767c.547-11.128 9.788-20.021 21.103-20.021 11.316 0 20.557 8.893 21.104 20.021h-6.767zm-6.8 0H72.15c.508-3.692 3.69-6.547 7.536-6.547s7.028 2.855 7.537 6.547zm37.317 81.684H73.764v-8.068a75.284 75.284 0 0 0 26.235 4.698 75.277 75.277 0 0 0 24.541-4.107v7.477zm-24.542-10.107c-36.664 0-66.698-28.79-68.469-64.843h136.937c-1.77 36.053-31.804 64.843-68.468 64.843z"
              fill="#7e3fa3"
              stroke="none"
            />
          </svg>

          {/* Title and Tagline */}
          <h1 className="text-5xl font-bold text-gray-800 mb-1">FOOD</h1>
          <p className="text-2xl text-gray-800">Get yummy at KBPayuk!</p>
        </div>

        {/* Food Categories */}
        <div className="flex flex-wrap justify-center gap-2">
          {foodCategories.map((category, index) => (
            <div
              key={category.id}
              className="relative flex items-center justify-center"
              style={{
                width: "280px",
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
                    width: hoveredIndex === index ? "241px" : "271px",
                    height: hoveredIndex === index ? "340px" : "380px",
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
                          className="text-white text-3xl font-semibold"
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
                          className="text-white text-4xl font-semibold"
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