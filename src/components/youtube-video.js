"use client"

import { useEffect, useState } from "react"

export default function YouTubeVideo({ videoId, playlistId }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Periksa saat komponen dimuat
    checkMobile()
    
    // Tambahkan event listener untuk window resize
    window.addEventListener("resize", checkMobile)
    
    // Cleanup event listener saat komponen unmount
    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Tentukan ukuran video berdasarkan layar
  const videoWidth = isMobile ? "100%" : "800px"
  const videoHeight = isMobile ? "240px" : "450px"

  // Buat URL untuk video YouTube dengan playlistId (jika ada)
  const embedUrl = playlistId 
    ? `https://www.youtube.com/embed/${videoId}?list=${playlistId}&rel=0`
    : `https://www.youtube.com/embed/${videoId}?rel=0`

  return (
    <div className="w-full py-12 bg-white items-center">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="rounded-lg overflow-hidden shadow-xl" style={{ maxWidth: videoWidth }}>
            <iframe
              width={videoWidth}
              height={videoHeight}
              src={embedUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}