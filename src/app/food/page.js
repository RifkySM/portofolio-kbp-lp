"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useMediaQuery } from "@/hooks/mobile"

// Data food categories
const foodCategories = [
  {
    id: 1,
    title: "Fine Dine",
    image: "/food/food-1.png",
    items: [
      {
        id: 1,
        image: "/food/fineDine/fineDine-1.png",
        description: "Samara Indonesian Dining",
        bgColor: "#2e2e2e",
        schedule: "11.30 - 14.00, 18.00 - 22.00",
        link: "#",
      },
      {
        id: 2,
        image: "/food/fineDine/fineDine-2.png",
        description: "Casa by Lé Savoye",
        bgColor: "#2e2e2e",
        schedule: "07.00 - 21.00",
        link: "#",
      },
    ],
  },
  {
    id: 2,
    title: "Breakfast",
    image: "/food/food-2.png",
    items: [
      {
        id: 1,
        image: "/food/breakfast/breakfast-1.png",
        description: "Santai - Mason Pine Hotel",
        bgColor: "#2e2e2e",
        schedule: "08.30 - 16.30",
        link: "#",
      },
      {
        id: 2,
        image: "/food/breakfast/breakfast-2.png",
        description: "McDonald's",
        bgColor: "#2e2e2e",
        schedule: "Open 24hr",
        link: "#",
      },
    ],
  },
  {
    id: 3,
    title: "Coffee & Bar",
    image: "/food/food-3.png",
    items: [
      {
        id: 1,
        image: "/food/coffee/coffee-1.png",
        description: "Noah's Barn Coffeenery",
        bgColor: "#5d2101",
        schedule: "07.00 - 21.00",
        link: "#",
      },
      {
        id: 2,
        image: "/food/coffee/coffee-2.png",
        description: "Two Cents Coffee",
        bgColor: "#5d2101",
        schedule: "Open 24hr",
        link: "#",
      },
    ],
  },
  {
    id: 4,
    title: "Nusantara",
    image: "/food/food-4.png",
    items: [
      {
        id: 1,
        image: "/food/nusantara/nusantara-1.png",
        description: "La Pantry",
        bgColor: "#375512",
        schedule: "08.00 - 21.30",
        link: "#",
      },
      {
        id: 2,
        image: "/food/nusantara/nusantara-2.png",
        description: "Kota Baru Foodmarket",
        bgColor: "#375512",
        schedule: "08.00 - 22.00",
        link: "#",
      },
    ],
  },
  {
    id: 5,
    title: "Western",
    image: "/food/food-5.png",
    items: [
      {
        id: 1,
        image: "/food/western/western-1.png",
        description: "Karnivor",
        bgColor: "#324158",
        schedule: "08.00 - 22.00",
        link: "#",
      },
      {
        id: 2,
        image: "/food/western/western-2.png",
        description: "Ambrogio Patisserie",
        bgColor: "#324158",
        schedule: "08.00 - 21.00",
        link: "#",
      },
    ],
  },
]

export default function FoodPage() {
  const [mounted, setMounted] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [selectedAttraction, setSelectedAttraction] = useState(null)
  const [hoveredCard, setHoveredCard] = useState(null)
  const isMobile = useMediaQuery("(max-width: 428px)")
  const itemsSectionRef = useRef(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Scroll to items section when an attraction is selected
    if (selectedAttraction !== null && itemsSectionRef.current) {
      itemsSectionRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [selectedAttraction])

  if (!mounted) return null

  const handleAttractionClick = (index) => {
    setSelectedAttraction(index === selectedAttraction ? null : index)
  }

  // Function to chunk array into pairs (2 items per row)
  const chunkArray = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size))
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-3">
        {/* Food Logo and Title */}
        <div className="flex flex-col items-center justify-center mb-8 sm:mb-12">
          {/* Logo */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={isMobile ? "80" : "110"}
            height={isMobile ? "85" : "115"}
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
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-1">FOOD</h1>
          <p className="text-lg sm:text-xl text-gray-800 sm:block hidden">Get yummy at KBPayuk!</p>
        </div>

        {/* Food Categories */}
        <div className="flex flex-wrap justify-center gap-2">
          {foodCategories.map((category, index) => (
            <div
              key={category.id}
              className="relative flex items-center justify-center"
              style={{
                width: isMobile ? "180px" : "252px",
                height: isMobile ? "300px" : "400px",
              }}
            >
              <motion.div
                className="relative cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleAttractionClick(index)}
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
                    width: hoveredIndex === index ? (isMobile ? "196px" : "216px") : isMobile ? "226px" : "246px",
                    height: hoveredIndex === index ? (isMobile ? "235px" : "305px") : isMobile ? "275px" : "345px",
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
                          className="text-white text-xl sm:text-2xl font-semibold text-shadow-md"
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
                          className="text-white text-2xl sm:text-3xl font-semibold text-shadow-md"
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

        {/* Mobile tagline - appears below food categories */}
        <div className="sm:hidden text-center mt-6">
          <p className="text-lg text-gray-800">Get yummy at KBPayuk!</p>
        </div>

        {/* Food Items Section */}
        <div ref={itemsSectionRef} className="pt-16 mb-20">
          <AnimatePresence>
            {selectedAttraction !== null && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="w-full">
                {/* Group items into rows of 2 */}
                {chunkArray(foodCategories[selectedAttraction].items, 2).map((row, rowIndex) => (
                  <div key={`row-${rowIndex}`} className="flex flex-wrap justify-center gap-8 mb-8">
                    {row.map((item, index) => {
                      const itemIndex = rowIndex * 2 + index
                      const isEven = itemIndex % 2 === 0

                      return (
                        <motion.div
                          key={item.id}
                          className="relative overflow-hidden rounded-3xl shadow-lg"
                          style={{ width: isMobile ? "300px" : "450px", height: isMobile ? "240px" : "340px" }}
                          initial={{
                            opacity: 0,
                            rotate: isEven ? 20 : -20,
                            scale: 0.9,
                          }}
                          animate={{
                            opacity: 1,
                            rotate: 0,
                            scale: 1,
                          }}
                          transition={{
                            duration: 0.8,
                            delay: 0.1 + (itemIndex * 0.3),
                            type: "spring",
                            stiffness: 70,
                            damping: 15,
                          }}
                          onMouseEnter={() => setHoveredCard(itemIndex)}
                          onMouseLeave={() => setHoveredCard(null)}
                        >
                          {/* Top part with image */}
                          <div className="relative h-3/5 w-full">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={foodCategories[selectedAttraction].title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute top-6 left-4">
                              <AnimatePresence mode="wait">
                                {hoveredCard === itemIndex ? (
                                  <motion.p
                                    key={`schedule-${item.id}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-white text-md sm:text-xl font-semibold text-shadow-md"
                                  >
                                    {item.schedule}
                                  </motion.p>
                                ) : (
                                  <motion.p
                                    key={`title-${item.id}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-white text-md sm:text-xl font-semibold text-shadow-md"
                                  >
                                    {foodCategories[selectedAttraction].title}
                                  </motion.p>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>

                          {/* Bottom part with logo and description */}
                          <div className="h-2/5 w-full flex" style={{ backgroundColor: item.bgColor }}>
                            <div className="w-full flex flex-col justify-center p-4 h-full">
                              <p className="text-white text-center font-semibold text-sm sm:text-xl mb-2">
                                {item.description}
                              </p>

                              <div className="flex justify-center">
                                <Link href={item.link || "#"}>
                                  <button className="bg-white px-6 py-1.5 rounded-full text-[8px] sm:text-xs 
                                    text-gray-800 hover:bg-transparent hover:text-white hover:backdrop-brightness-90 transition-all duration-300">
                                    view more
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
}
