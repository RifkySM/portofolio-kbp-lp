"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import axiosClient from "@/lib/axiosClient"
import dayjs from 'dayjs'
import 'dayjs/locale/id'

export default function NewsPage() {
  const [mounted, setMounted] = useState(false)
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({})
  const [page, setPage] = useState(1)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosClient.get(`post?category=news&paginate=true&page=${page}&limit=9`)
        setData(res.data.data.data)
        setPagination(res.data.data.pagination)
      } catch (error) {
        console.error("Failed to fetch news:", error)
      }
    }

    fetchData()
  }, [page])

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
            {data.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center space-x-4 pb-10">
          <button
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={!pagination.previousPage}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 text-black"
          >
            Prev
          </button>
          <span className="px-4 py-2 text-gray-700">Page {pagination.currentPage} of {pagination.totalPage}</span>
          <button
            onClick={() => setPage(prev => prev + 1)}
            disabled={!pagination.nextPage}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 text-black"
          >
            Next
          </button>
        </div>
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
        backgroundImage: `url(${news.thumbnail})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute inset-0 py-8 px-6 flex flex-col justify-between"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.41)" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Date and Read Time */}
        <div className="text-white-100 text-[11px]">
          <span>{dayjs(news.created_at).locale('id').format('dddd, D MMMM YYYY')}</span>
        </div>

        {/* Card Title */}
        <div className="mt-auto">
          <Link href={`/news/${news.seo_url}`} className="block">
            <h2 className={`text-xl sm:text-sm font-bold transition-colors ${isHovered ? "text-[#e86c32]" : "text-white"}`}>
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
              <span className="text-white text-sm">{news.comment_count}</span>
            </div>

            <Link href="#" className="flex items-center space-x-2 group">
              {/* Likes */}
              <span className="text-white text-sm">{news.total_likes}</span>
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
