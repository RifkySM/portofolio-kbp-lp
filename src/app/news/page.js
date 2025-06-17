'use client'

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import 'dayjs/locale/id'
import NewsCard from "@/components/news/news-card"

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
        const res = await fetch(`/api/news?page=${page}`)
        const json = await res.json()
        setData(json.data.data)
        setPagination(json.data.pagination)
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
              <span className="text-[#000000]">What&apos;s On </span>
              <span className="text-[#e86c32]">KBPa</span>
            </motion.h1>
          </div>
        </div>

        {/* News Grid */}
        <div className="py-9 max-w-[920px] mx-auto pb-6">
          <div className="grid grid-cols-1 px-4 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.length > 0 ? (
              data.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-10">
                Belum ada berita yang tersedia.
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        {data.length > 0 && (
          <div className="flex justify-center space-x-4 pb-10">
            <button
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
              disabled={!pagination.previousPage}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 text-black"
            >
              Prev
            </button>
            <span className="px-4 py-2 text-gray-700">
              Page {pagination.currentPage} of {pagination.totalPage}
            </span>
            <button
              onClick={() => setPage(prev => prev + 1)}
              disabled={!pagination.nextPage}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 text-black"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
