"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

const stayData = [
  {
    id: 1,
    title: "Grand Opening Pasar Parahyangan Kota Baru Parahyangan",
    kota: "Kota Baru Parahyangan",
    image: "/find-it-love-it-buy-it/image-1.png",
    views: 47,
    likes: 1,
    href: "#",
  },
  {
    id: 2,
    title: "Grand Opening Yogya Junction Kota Baru Parahyangan",
    kota: "Kota Baru Parahyangan",
    image: "/find-it-love-it-buy-it/image-2.png",
    views: 58,
    likes: 2,
    href: "#",
  },
  {
    id: 3,
    title: "Foto Otomatis FOTOBAS di IKEA KBPa",
    kota: "Kota Baru Parahyangan",
    image: "/find-it-love-it-buy-it/image-3.png",
    views: 11,
    likes: 1,
    href: "#",
  },
]

export default function NewsPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto">
        {/* Title */}
        <div className="text-center py-14">
            <div>
                <motion.h1
                    className="text-3xl sm:text-5xl font-semibold block"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        duration: 1,
                        ease: [0.33, 1, 0.68, 1],
                        delay: 0.2,
                    }}
                >
                    <span className="text-[#000000]">Find It, Love It, Buy It</span>
                </motion.h1>
            </div>
        </div>

        {/* News Grid */}
        <div className="pb-9 max-w-[950px] mx-auto pb-6">
          <div className="grid grid-cols-1 px-4 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {stayData.map((stay) => (
              <StayCard key={stay.id} stay={stay} />
            ))}
          </div>
        </div>

        {/* Mobile tagline - appears below news */}
        {/* <div className="sm:hidden text-center text-3xl font-semibold pb-10">
          <span className="text-[#000000]">What's On </span> <span className="text-[#e86c32]">KBPa</span>
        </div> */}
      </div>
    </main>
  )
}

function StayCard({ stay }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isCommentHovered, setIsCommentHovered] = useState(false)

  return (
    <div
      className="relative h-[292px] overflow-hidden"
      style={{
        backgroundImage: `url(${stay.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 py-8 px-6 flex flex-col justify-between" style={{ backgroundColor: "rgba(0, 0, 0, 0.55)" }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        {/* Kota */}
        <div className="text-white">
          <div className="text-xs font-semibold">{stay.kota}</div>
        </div>

        {/* Card Title */}
        <div className="mt-auto">
          <Link
            href={stay.href}
            className="block"
          >
            <h2
              className={`text-xl sm:text-[16px] leading-snug font-bold transition-colors ${
                isHovered ? "text-[#818cf8]" : "text-white"
              }`}
            >
              {stay.title}
            </h2>

            <div className="border-t-2 border-white my-3"></div>
          </Link>

          {/* views and Likes */}
          <div className="flex justify-between items-center mt-4">
            <div
              className="flex items-center space-x-2"
              onMouseEnter={() => setIsCommentHovered(true)}
              onMouseLeave={() => setIsCommentHovered(false)}
            >
              {/* views */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-colors duration-300 ${isCommentHovered ? "text-[#e86c32]" : "text-white"}`}
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <span className="text-white text-sm">{stay.views}</span>
            </div>
            <Link href="#" className="flex items-center space-x-2 group">
              {/* Like */}
              <span className="text-white text-sm">{stay.likes}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-red-500 transition-colors duration-300"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
