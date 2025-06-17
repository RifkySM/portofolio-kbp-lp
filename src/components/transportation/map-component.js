"use client"

import { useEffect, useState } from "react"
import axiosClient from "@/lib/axiosClient"

export default function MapHalte() {
  const [mapLink, setMapLink] = useState("")

  useEffect(() => {
    fetch('/api/parameter/big-map')
      .then(response => response.json())
      .then(data => setMapLink(data))
      .catch(error => console.error("Error fetching paralax-image:", error));
  }, [])

  if (!mapLink) {
    return (
      <div className="h-full w-full bg-gray-200 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="text-black">Loading Map...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full" style={{ lineHeight: 0 }}>
      <iframe
        src={mapLink}
        width="100%"
        height="500"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}
