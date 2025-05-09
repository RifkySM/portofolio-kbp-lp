"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight, MoreVertical } from "lucide-react"
import Image from "next/image"

export default function VideoCarouselWithRealImages() {
  const scrollContainerRef = useRef(null)

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
        <button className="p-1 hover:bg-gray-100 rounded-full border border-transparent group">
            <MoreVertical size={20} className="text-black group-hover:text-gray-500" />
        </button>
        <h2 className="text-lg font-medium !text-black">All Videos</h2>
      </div>

      {/* Video Carousel */}
      <div className="relative">
        {/* Left Scroll Button */}
        <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-transparent hover:bg-transparent rounded-full p-2"
            aria-label="Scroll left"
        >
            <ChevronLeft
                size={24}
                className="text-white hover:text-grey transition-colors duration-200"
            />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 py-4 px-10"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* You can replace these with your actual images */}
          <div className="flex-none w-[500px] min-w-[500px] h-[300px] snap-start relative rounded-lg overflow-hidden">
            <Image
              src="/paralax-event.png"
              alt="Video thumbnail"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-none w-[500px] min-w-[500px] h-[300px] snap-start relative rounded-lg overflow-hidden">
            <Image
              src="/paralax-event.png"
              alt="Video thumbnail"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-none w-[500px] min-w-[500px] h-[300px] snap-start relative rounded-lg overflow-hidden">
            <Image
              src="/paralax-event.png"
              alt="Video thumbnail"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-none w-[500px] min-w-[500px] h-[300px] snap-start relative rounded-lg overflow-hidden">
            <Image
              src="/paralax-event.png"
              alt="Video thumbnail"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-none w-[500px] min-w-[500px] h-[300px] snap-start relative rounded-lg overflow-hidden">
            <Image
              src="/paralax-event.png"
              alt="Video thumbnail"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Scroll Button */}
        <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-transparent hover:bg-transparent rounded-full p-2"
            aria-label="Scroll right"
        >
            <ChevronRight
                size={24}
                className="text-white hover:text-grey transition-colors duration-200"
            />
        </button>
      </div>
    </div>
  )
}
