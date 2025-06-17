"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

// Component untuk menangkap frame awal sebagai thumbnail
function VideoWithPoster({ src, onClick }) {
  const videoRef = useRef(null)
  const [posterUrl, setPosterUrl] = useState("/video-thumbnail.jpg") // fallback
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    const canvas = document.createElement("canvas")

    const capturePoster = () => {
      if (!video || !video.videoWidth || !video.videoHeight) {
        setLoading(false)
        return
      }

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext("2d")

      try {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        const dataURL = canvas.toDataURL("image/jpeg")
        setPosterUrl(dataURL)
      } catch (error) {
        console.warn("Failed to capture poster:", error)
        // fallback poster tetap digunakan
      } finally {
        setLoading(false)
      }
    }

    const onLoadedMetadata = () => {
      video.currentTime = 0.1
    }

    const onSeeked = () => {
      capturePoster()
    }

    if (video) {
      setLoading(true)
      video.addEventListener("loadedmetadata", onLoadedMetadata)
      video.addEventListener("seeked", onSeeked)
    }

    // Timeout untuk jaga-jaga kalau gagal sepenuhnya
    const timeoutId = setTimeout(() => setLoading(false), 4000)

    return () => {
      if (video) {
        video.removeEventListener("loadedmetadata", onLoadedMetadata)
        video.removeEventListener("seeked", onSeeked)
      }
      clearTimeout(timeoutId)
    }
  }, [src])

  return (
    <div className="relative w-full h-full">
      {/* Play Icon in the center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <div className="bg-black/60 rounded-full p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M6.271 5.055A.5.5 0 0 0 5.5 5.5v5a.5.5 0 0 0 .77.424l4.5-2.5a.5.5 0 0 0 0-.848l-4.5-2.5z" />
          </svg>
        </div>
      </div>

      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <video
        ref={videoRef}
        src={src}
        poster={posterUrl}
        className="w-full h-full object-cover"
        preload="metadata"
        muted
        onClick={onClick}
      />
    </div>
  )
}

export default function VideoGallery() {
  const scrollContainerRef = useRef(null)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [data, setData] = useState([])

  useEffect(() => {
    fetch("/api/gallery/video-slider?limit=10")
      .then((res) => res.json())
      .then((data) => {
        const datas = data?.data || []
        setData(datas.map((item) => item.file))
      })
      .catch(console.error)
  }, [])

  const scrollLeft = () => {
    if (!scrollContainerRef.current) return
    const scrollAmount = scrollContainerRef.current.offsetWidth * 0.8
    scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
  }

  const scrollRight = () => {
    if (!scrollContainerRef.current) return
    const scrollAmount = scrollContainerRef.current.offsetWidth * 0.8
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
  }


  return (
    <div className="w-full mt-10">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b">
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
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 py-4 px-6 pl-5 md:px-10"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {data.map((videoUrl, index) => (
            <div
              key={index}
              className="flex-none w-full sm:w-[85%] md:w-[620px] md:min-w-[620px] h-[240px] sm:h-[320px] md:h-[420px] snap-start relative rounded-xl overflow-hidden bg-black cursor-pointer group"
              onClick={() => setSelectedVideo(videoUrl)}
            >
              <VideoWithPoster src={videoUrl} onClick={() => setSelectedVideo(videoUrl)} />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
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
