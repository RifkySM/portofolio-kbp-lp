"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import axiosClient from "@/lib/axiosClient"

// Main Home Page Component
export default function HomePage() {
  const [sliderData, setSliderData] = useState([])

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await fetch('/api/home/slider')
        const json = await response.json()
        setSliderData(json?.data?.map((slider) => ({
          id: slider.id,
          image: slider.banner,
          title: slider.title,
          logo: slider.site_logo,
          link: slider.link,
        })) || [])
      } catch (error) {
        console.error("Error fetching slider data:", error)
        setSliderData([])
      }
    }

    fetchSliders()
  }, [])

  return (
    <main>
      <EventSlider sliderData={sliderData} />
    </main>
  )
}

// Event Slider Component
function EventSlider({ sliderData }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Function to move to next slide
  const nextSlide = useCallback(() => {
    if (sliderData.length === 0) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev + 1) % sliderData.length)
    setTimeout(() => setIsAnimating(false), 1000)
  }, [sliderData])

  // Interval for automatic slide
  useEffect(() => {
    if (sliderData.length === 0) return

    const interval = setInterval(() => {
      if (!isAnimating) {
        nextSlide()
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isAnimating, nextSlide, sliderData.length])

  if (sliderData.length === 0) return null

  return (
    <div className="relative w-full h-full">
      {/* Background Images */}
      <div className="min-h-[980px] overflow-hidden relative">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={`image-${currentSlide}`}
            className="absolute inset-0 w-full h-full"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <Image
              src={sliderData[currentSlide]?.image || "/placeholder.svg"}
              alt={`Slide ${currentSlide + 1}`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/10" />
          </motion.div>
        </AnimatePresence>

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col justify-end pb-24 items-start px-8 sm:px-16 md:px-24 lg:px-72">
          {/* Title Animation */}
          <div className="mb-4">
            <AnimatePresence mode="wait">
              <div className="flex flex-wrap gap-x-3">
                <motion.div
                  key={`title-${currentSlide}`}
                  className="text-white text-5xl sm:text-6xl md:text-6xl lg:text-7xl mb-2"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  dangerouslySetInnerHTML={{ __html: sliderData[currentSlide]?.title || '' }}
                />
              </div>
            </AnimatePresence>
          </div>

          {/* "only at" text */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`only-at-${currentSlide}`}
              className="text-white text-xl sm:text-2xl mb-4"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              only at
            </motion.p>
          </AnimatePresence>

          {/* Logo */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`logo-${currentSlide}`}
              className="w-48 sm:w-56 md:w-64 h-24 sm:h-28 md:h-32 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link href={sliderData[currentSlide]?.link || "#"}>
                <Image
                  src={sliderData[currentSlide]?.logo || "/placeholder.svg"}
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Explore Bar */}
      <div className="relative z-10 -mt-[4vh]">
        <div
          className="bg-white rounded-full mx-6 md:mx-auto max-w-4xl flex items-center justify-between px-8 md:px-12 py-4 md:py-10"
          style={{
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25), 0 6px 10px rgba(0, 0, 0, 0.22)"
          }}
        >
          <p className="text-sm md:text-3xl text-black font-normal">Explore KBPa with us!</p>
          <Link href="#">
            <motion.button
              className="bg-orange-500 hover:bg-[#4743C5] text-white text-sm md:text-2xl px-8 py-2 md:py-4 rounded-full font-bold transition-colors duration-300"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 8,
              }}
            >
              Start Here
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  )
}
