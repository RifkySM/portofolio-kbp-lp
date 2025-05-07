"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight, MoreVertical } from "lucide-react"
import Image from "next/image"

export default function VideoCarouselWithRealImages() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b">
        <button className="p-1 hover:bg-gray-100 rounded-full">
          <MoreVertical size={20} />
        </button>
        <h2 className="text-lg font-medium">All Videos</h2>
      </div>

      {/* Video Carousel */}
      <div className="relative">
        {/* Left Scroll Button */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} className="text-blue-600" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 py-4 px-10"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* You can replace these with your actual images */}
          <div className="flex-none w-[500px] h-[300px] snap-start relative rounded-lg overflow-hidden">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DVKdkKwntZNJpaAW5V7XygTrF91Thg.png"
              alt="Video thumbnail"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-none w-[500px] h-[300px] snap-start relative rounded-lg overflow-hidden">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DVKdkKwntZNJpaAW5V7XygTrF91Thg.png"
              alt="Video thumbnail"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-none w-[500px] h-[300px] snap-start relative rounded-lg overflow-hidden">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DVKdkKwntZNJpaAW5V7XygTrF91Thg.png"
              alt="Video thumbnail"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
          aria-label="Scroll right"
        >
          <ChevronRight size={24} className="text-blue-600" />
        </button>
      </div>
    </div>
  )
}
