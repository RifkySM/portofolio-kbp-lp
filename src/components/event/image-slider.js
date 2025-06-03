"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

// Data untuk slider
const sliderData = [
  {
    id: 1,
    image: "/event/image-slider/wahoo.png",
    title: [
      { text: "create your", isBold: false },
      { text: "bold & fun", isBold: true },
      { text: "water experience", isBold: false },
    ],
    logo: "/attractions/splash/logo-1.png",
  },
  {
    id: 2,
    image: "/event/image-slider/mason-pine-hotel.png",
    title: [
      { text: "spend your", isBold: false },
      { text: "luxury holiday", isBold: true },
      { text: "with our ★★★★★ hotel,", isBold: false },
    ],
    logo: "/attractions/splash/logo-3.png",
  },
  {
    id: 3,
    image: "/event/image-slider/parahyangan-golf.png",
    title: [
      { text: "connect with", isBold: false },
      { text: "nature", isBold: true },
      { text: "guide your ultimate golfing experience", isBold: false },
    ],
    logo: "/attractions/fun/logo-1.png",
  },
  {
    id: 4,
    image: "/event/image-slider/bumi-pancasona.png",
    title: [
      { text: "get fit &", isBold: true },
      { text: "go further", isBold: true },
    ],
    logo: "/attractions/fun/logo-2.png",
  },
  {
    id: 5,
    image: "/event/image-slider/bumi-hejo.png",
    title: [
      { text: "taste the", isBold: false },
      { text: "sweetness", isBold: true },
      { text: "or lifestyle in nature", isBold: false },
    ],
    logo: "/attractions/fun/logo-3.png",
  },
  {
    id: 6,
    image: "/event/image-slider/pasar-parahyangan.png",
    title: [
      { text: "shop", isBold: false },
      { text: "your needs", isBold: true },
      { text: "with Curated Local Market", isBold: false },
    ],
    logo: "/event/image-slider/logo-pasar-parahyangan.png",
  },
  {
    id: 7,
    image: "/event/image-slider/bumi-skatepark.png",
    title: [
      { text: "find your flow", isBold: false },
      { text: "on the pump,", isBold: true },
      { text: "ramp & bowl", isBold: false },
    ],
    logo: "/attractions/fun/logo-5.png",
  },
  {
    id: 8,
    image: "/event/image-slider/bumi-playpark.png",
    title: [
      { text: "slide,", isBold: true },
      { text: "swing,", isBold: true },
      { text: "explore", isBold: false },
      { text: "& fun awaits", isBold: false },
    ],
    logo: "/attractions/fun/logo-4.png",
  },
  {
    id: 9,
    image: "/event/image-slider/balepare.png",
    title: [
      { text: "savor", isBold: false },
      { text: "nature's", isBold: true },
      { text: "flavors", isBold: true },
      { text: "dine & gather", isBold: false },
    ],
    logo: "/attractions/fun/logo-6.png",
  },
  {
    id: 10,
    image: "/event/image-slider/sundial.png",
    title: [
      { text: "discover the", isBold: false },
      { text: "wonder", isBold: true },
      { text: "of science in motion", isBold: false },
    ],
    logo: "/attractions/art/logo-1.png",
  },
  {
    id: 11,
    image: "/event/image-slider/baleseni.png",
    title: [
      { text: "unleash your", isBold: false },
      { text: "creativity", isBold: true },
      { text: "explore the arts,", isBold: false },
    ],
    logo: "/attractions/art/logo-2.png",
  },
  {
    id: 12,
    image: "/event/image-slider/ikea-store.png",
    title: [
      { text: "beautiful your", isBold: false },
      { text: "home decor", isBold: true },
      { text: "with limitless shopping", isBold: false },
    ],
    logo: "/event/image-slider/logo-ikea-store.png",
  },
]

export default function HomePage() {
  return (
    <main>
      <EventSlider />
    </main>
  )
}

// Event Slider Component
function EventSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true)
        setCurrentSlide((prev) => (prev + 1) % sliderData.length)
        setTimeout(() => setIsAnimating(false), 1000)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isAnimating])

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
              src={sliderData[currentSlide].image || "/placeholder.svg"}
              alt={`Slide ${currentSlide + 1}`}
              fill
              className="object-cover"
              priority
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/10" />
          </motion.div>
        </AnimatePresence>

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col justify-end pb-24 items-start px-8 sm:px-16 md:px-24 lg:px-72">
          {/* Description Image */}
          <div className="mb-4">
            <AnimatePresence mode="wait">
              {sliderData[currentSlide].title.map((part, index) => (
                <motion.div
                  key={`title-${currentSlide}-${index}`}
                  className="overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: "-100%" }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.h1
                    className={`text-white ${part.isBold
                      ? "text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-bold"
                      : "text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-normal"
                      } mb-2`}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    {part.text}
                  </motion.h1>
                </motion.div>
              ))}
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
              <Link href="#">
                <Image
                  src={sliderData[currentSlide].logo || "/placeholder.svg"}
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
          style={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25), 0 6px 10px rgba(0, 0, 0, 0.22)" }}
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
