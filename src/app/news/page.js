"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

const newsData = [
  {
    id: 1,
    title: "Bumi Pancasona : 🏋🏻 NOVEMBER BOOST",
    date: "Nov 11, 2024",
    readTime: "2 min read",
    image: "/news/news-1.png",
    comments: 0,
    likes: 1,
    href: "#",
  },
  {
    id: 2,
    title: "Bumi Hejo : Nite Owl Market Hadir Kembali!",
    date: "Oct 8, 2024",
    readTime: "2 min read",
    image: "/news/news-2.png",
    comments: 0,
    likes: 2,
    href: "#",
  },
  {
    id: 3,
    title: "Bumi Pancasona : A Journey to Find Balance",
    date: "Sep 30, 2024",
    readTime: "1 min read",
    image: "/news/news-3.png",
    comments: 0,
    likes: 1,
    href: "#",
  },
  {
    id: 4,
    title: "Wahoo Waterworld : Sunset Vibes",
    date: "Sep 26, 2024",
    readTime: "1 min read",
    image: "/news/news-4.png",
    comments: 0,
    likes: 1,
    href: "#",
  },
  {
    id: 5,
    title: "Bumi Hejo : ACC Carnival Bandung 2024",
    date: "Sep 20, 2024",
    readTime: "1 min read",
    image: "/news/news-5.png",
    comments: 0,
    likes: 0,
    href: "#",
  },
  {
    id: 6,
    title: "Bumi Pancasona : SEPTEMBER FREE TRIAL CLASS",
    date: "Sep 6, 2024",
    readTime: "1 min read",
    image: "/news/news-6.png",
    comments: 0,
    likes: 0,
    href: "#",
  },
  {
    id: 7,
    title: "Bumi Play Park : SEMARAK LOMBA 17AN",
    date: "Aug 9, 2024",
    readTime: "1 min read",
    image: "/news/news-7.png",
    comments: 0,
    likes: 0,
    href: "#",
  },
  {
    id: 8,
    title: "Bumi Pancasona Special Class : Zedfit Merdeka Dance",
    date: "Aug 8, 2024",
    readTime: "1 min read",
    image: "/news/news-8.png",
    comments: 0,
    likes: 0,
    href: "#",
  },
  {
    id: 9,
    title: "Kota Baru Parahyangan Persembahkan Tempat Bermain Baru: Bumi Skate Park...",
    date: "Jul 30, 2024",
    readTime: "3 min read",
    image: "/news/news-9.png",
    comments: 0,
    likes: 0,
    href: "#",
  },
  {
    id: 10,
    title: "KULINERAN DI PASAR",
    date: "Jul 23, 2024",
    readTime: "1 min read",
    image: "/news/news-10.png",
    comments: 0,
    likes: 3,
    href: "#",
  },
  {
    id: 11,
    title: "Serunya Bermain Air Bersama Keluarga di Wahoo Waterland",
    date: "Jul 5, 2024",
    readTime: "3 min read",
    image: "/news/news-11.png",
    comments: 0,
    likes: 2,
    href: "#",
  },
  {
    id: 12,
    title: "Santai Asyik Bareng Keluarga di Tepi Danau",
    date: "Jul 4, 2024",
    readTime: "2 min read",
    image: "/news/news-12.png",
    comments: 0,
    likes: 2,
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
        <div className="text-center pt-10">
            <div className="overflow-hidden">
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
                    <span className="text-[#000000]">What&apos;s On </span> <span className="text-[#e86c32]">KBPa</span>
                </motion.h1>
            </div>
        </div>

        {/* News Grid */}
        <div className="py-9 max-w-[920px] mx-auto pb-6">
          <div className="grid grid-cols-1 px-4 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsData.map((news) => (
              <NewsCard key={news.id} news={news} />
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

function NewsCard({ news }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isCommentHovered, setIsCommentHovered] = useState(false)

  return (
    <div
      className="relative h-[292px] overflow-hidden"
      style={{
        backgroundImage: `url(${news.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 py-8 px-6 flex flex-col justify-between" style={{ backgroundColor: "rgba(0, 0, 0, 0.41)" }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        {/* Date and Read Time */}
        <div className="text-white-100 text-[11px]">
          <span>{news.date}</span>
          <span className="mx-2">•</span>
          <span>{news.readTime}</span>
        </div>

        {/* Card Title */}
        <div className="mt-auto">
          <Link
            href={news.href}
            className="block"
          >
            <h2
              className={`text-xl sm:text-sm font-bold transition-colors ${
                isHovered ? "text-[#e86c32]" : "text-white"
              }`}
            >
              {news.title}
            </h2>

            <div className="border-t-2 border-white my-3"></div>
          </Link>

          {/* Comments and Likes */}
          <div className="flex justify-between items-center mt-4">
            <div
              className="flex items-center space-x-2"
              onMouseEnter={() => setIsCommentHovered(true)}
              onMouseLeave={() => setIsCommentHovered(false)}
            >
              {/* Comments */}
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
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span className="text-white text-sm">{news.comments}</span>
            </div>
            <Link href="#" className="flex items-center space-x-2 group">
              {/* Like */}
              <span className="text-white text-sm">{news.likes}</span>
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
