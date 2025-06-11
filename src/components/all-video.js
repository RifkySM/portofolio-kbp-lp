"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, MoreVertical, X } from "lucide-react"
import axiosClient from "@/lib/axiosClient"

export default function VideoGallery() {
  const scrollContainerRef = useRef(null)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const videoRefs = useRef([])
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosClient.get("gallery/feature/video-slider?limit=10")
      setData(res.data.data.map((item) => item.file))
    }
    fetchData()
  }, [])

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -600, behavior: "smooth" })
  }

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 600, behavior: "smooth" })
  }

  const handleVideoClick = (index, url) => {
    videoRefs.current.forEach((video, i) => {
      if (video && i !== index) video.pause()
    })
    setSelectedVideo(url)
  }

  return (
    <div className="w-full mt-10">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b">
        <button className="p-1 hover:bg-gray-100 rounded-full border border-transparent group">
          <MoreVertical size={20} className="text-black group-hover:text-gray-500" />
        </button>
        <h2 className="text-lg font-medium text-black">All Videos</h2>
      </div>

      {/* Video Carousel */}
      <div className="relative">
        {/* Left Button */}
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 rounded-full p-2"
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} className="text-white" />
        </button>

        {/* Scrollable Video List */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 py-4 px-6 md:px-10"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {data.map((videoUrl, index) => (
            <div
              key={index}
              className="flex-none w-full sm:w-[85%] md:w-[620px] md:min-w-[620px] h-[240px] sm:h-[320px] md:h-[420px] snap-start relative rounded-xl overflow-hidden bg-black"
              onClick={() => handleVideoClick(index, videoUrl)}
            >
              <video
                ref={(el) => {
                  videoRefs.current[index] = el
                }}
                src={videoUrl}
                className="w-full h-full object-cover"
                muted
                loop
                autoPlay
              />
              <div className="absolute inset-0 bg-black/30 hover:bg-black/10 transition-colors cursor-pointer" />
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 rounded-full p-2"
          aria-label="Scroll right"
        >
          <ChevronRight size={24} className="text-white" />
        </button>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="relative w-full max-w-5xl bg-black rounded-xl overflow-hidden max-h-[90vh] aspect-video">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-2 right-2 bg-white text-black rounded-full p-1 hover:bg-gray-200 z-10"
            >
              <X size={20} />
            </button>
            <video
              src={selectedVideo}
              className="w-full h-full"
              controls
              autoPlay
            />
          </div>
        </div>
      )}
    </div>
  )
}
