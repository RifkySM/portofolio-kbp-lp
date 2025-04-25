"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"
import ShuttleInfo from "@/components/shuttle-info"

// Data halte
const halteData = [
  { 
    id: "bumi-hejo", 
    name: "HALTE BUMI HEJO", 
    lat: -6.8721, 
    lng: 107.5731, 
    bgColor: "#6e2e91", 
    scheduleImage: "/transportation/halte-bumi-hejo.png", 
    direction: "https://www.google.com/maps/dir/?api=1&destination=Kertajaya%2C%20Padalarang%2C%20West%20Bandung%20Regency%2C%20West%20Java%2C%20Indonesia",
    width: "486", 
    height: "595"
  },
  { 
    id: "sasakirana", 
    name: "HALTE SASAKIRANA", 
    lat: -6.8731, 
    lng: 107.5741, 
    bgColor: "#243e97",
    scheduleImage: "/transportation/halte-sasakirana.png",
    direction: "https://www.google.com/maps/dir/?api=1&destination=Bojonghaleuang%2C%20Batujajar%2C%20West%20Bandung%20Regency%2C%20West%20Java%2040561%2C%20Indonesia",
    width: "315",
    height: "546"
  },
  { 
    id: "wahoo", 
    name: "HALTE WAHOO", 
    lat: -6.8741, 
    lng: 107.5751, 
    bgColor: "#e9741c",
    scheduleImage: "/transportation/halte-wahoo.png",
    direction: "https://www.google.com/maps/dir/?api=1&destination=Kertajaya%2C%20Padalarang%2C%20West%20Bandung%20Regency%2C%20West%20Java%2C%20Indonesia",
    width: "600",
    height: "636"
  },
  { 
    id: "pariwarna", 
    name: "HALTE PARIWARNA", 
    lat: -6.8751, 
    lng: 107.5761, 
    bgColor: "#6e2e91",
    scheduleImage: "/transportation/halte-pariwarna.png",
    direction: "https://www.google.com/maps/dir/?api=1&destination=Kertajaya%2C%20Padalarang%2C%20West%20Bandung%20Regency%2C%20West%20Java%2C%20Indonesia",
    width: "600",
    height: "557"
  },
  { 
    id: "al-irsyad", 
    name: "HALTE AL-IRSYAD", 
    lat: -6.8761, 
    lng: 107.5771, 
    bgColor: "#243e97",
    scheduleImage: "/transportation/halte-al-irsyad.png",
    direction: "https://www.google.com/maps/dir/?api=1&destination=Jl.%20Parahyangan%20Raya%2C%20Cipeundeuy%2C%20Kec.%20Padalarang%2C%20Kabupaten%20Bandung%20Barat%2C%20Jawa%20Barat%2040553%2C%20Indonesia",
    width: "600",
    height: "611"
  },
  { 
    id: "wangsakerta", 
    name: "HALTE WANGSAKERTA", 
    lat: -6.8771, 
    lng: 107.5781,
    bgColor: "#e9741c",
    scheduleImage: "/transportation/halte-wangsakerta.png",
    direction: "https://www.google.com/maps/dir/?api=1&destination=Cipeundeuy%2C%20Padalarang%2C%20West%20Bandung%20Regency%2C%20West%20Java%2C%20Indonesia",
    width: "600",
    height: "680" 
  },
  { 
    id: "mason-pine-hotel", 
    name: "HALTE MASON PINE HOTEL", 
    lat: -6.8781, 
    lng: 107.5791, 
    bgColor: "#6e2e91",
    scheduleImage: "/transportation/halte-mason-pine-hotel.png",
    direction: "https://www.google.com/maps/dir/?api=1&destination=Jl.%20Parahyangan%20Raya%20No.Km%201%2C%20RW.8%2C%20Cipeundeuy%2C%20Kec.%20Padalarang%2C%20Kabupaten%20Bandung%20Barat%2C%20Jawa%20Barat%2040553%2C%20Indonesia",
    width: "308",
    height: "534"
  },
  { 
    id: "pitaloka", 
    name: "HALTE PITALOKA", 
    lat: -6.8791, 
    lng: 107.5801, 
    bgColor: "#243e97",
    scheduleImage: "/transportation/halte-pitaloka.png",
    direction: "https://www.google.com/maps/dir/?api=1&destination=Cipeundeuy%2C%20Padalarang%2C%20West%20Bandung%20Regency%2C%20West%20Java%2C%20Indonesia",
    width: "600",
    height: "559"
  },
  { 
    id: "ratnasasih", 
    name: "HALTE RATNASASIH", 
    lat: -6.8801, 
    lng: 107.5811,
    bgColor: "#e9741c",
    scheduleImage: "/transportation/halte-ratnasasih.png",
    direction: "https://www.google.com/maps/dir/?api=1&destination=4FJ9%2BCGP%2C%20Cipeundeuy%2C%20West%20Bandung%20Regency%2C%20West%20Java%2C%20Indonesia",
    width: "600",
    height: "613" 
  },
  { id: "btd", 
    name: "HALTE BTD", 
    lat: -6.8811, 
    lng: 107.5821, 
    bgColor: "#6e2e91",
    scheduleImage: "/transportation/halte-btd.png",
    direction: "https://www.google.com/maps/dir/?api=1&destination=4FG9%2BX6W%2C%20Cipeundeuy%2C%20West%20Bandung%20Regency%2C%20West%20Java%2C%20Indonesia",
    width: "600",
    height: "558"
  },
]

// Impor Map secara dinamis dengan ssr: false untuk menghindari error window is not defined
const MapWithNoSSR = dynamic(() => import("../../components/map-component"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] bg-gray-200 flex items-center justify-center">
      <p>Loading Map...</p>
    </div>
  ),
})

export default function TransportationPage() {
  const [selectedHalte, setSelectedHalte] = useState(null)
  const [mapCenter, setMapCenter] = useState([-6.8761, 107.5771]) // Default center
  const halteRefs = useRef({})

  const handleHalteClick = (halte) => {
    setSelectedHalte(halte)
    setMapCenter([halte.lat, halte.lng])
  }

  useEffect(() => {
      // Scroll to halte if hash is present in URL
      if (typeof window !== "undefined") {
        const hash = window.location.hash.replace("#", "")
        if (hash && halteRefs.current[hash]) {
          halteRefs.current[hash].scrollIntoView({ behavior: "smooth" })
        }
      }
    }, [])

  return (
    <main className="min-h-screen bg-white pb-[10vh]">
      {/* Logo and Title */}
      <div className="flex justify-center items-center py-8">
        <Image src="/transportation/transportation-logo.png" alt="Kopa yuk Logo" width={150} height={79} />
        <h1 className="text-4xl font-bold text-[#864898] ml-6">transportation</h1>
      </div>

      {/* Map */}
      <div className="mx-auto max-w-4xl px-6 mb-32 relative">
        <div className="h-[330px] bg-gray-100 rounded-lg shadow-md overflow-hidden relative">
          {/* Halte List */}
          <div className="absolute left-0 top-0 bottom-0 w-[300px] bg-white z-10 overflow-y-auto shadow-md">
            <div className="p-4">
              {halteData.map((halte) => (
                <div
                  key={halte.id}
                  className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded"
                  onClick={() => handleHalteClick(halte)}
                >
                  <div className="bg-purple-600 rounded-full p-1 mr-2 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 16c0 .88.39 1.67 1 2.22V20a1 1 0 0 0 2 0v-1h10v1a1 1 0 0 0 2 0v-1.78c.61-.55 1-1.34 1-2.22V6c0-3-2.69-5-6-5H10C6.69 1 4 3 4 6v10zm2-7h12v5H6V9zm0-3c0-1.66 1.79-3 4-3h4c2.21 0 4 1.34 4 3v1H6V6zM7.5 17a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"></path>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-black">{halte.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Map Component */}
          <MapWithNoSSR halteData={halteData} mapCenter={mapCenter} selectedHalte={selectedHalte} />
        </div>
      </div>

      {/* Shuttle Information */}
      <ShuttleInfo />

      {/* Halte Schedule */}
      <div className="mx-auto max-w-full">
        {halteData.map((halte) => (
            <div key={halte.id} id={halte.id} ref={(el) => (halteRefs.current[halte.id] = el)} className="mb-20">
              {/* Title */}
              <div
                  className="w-full py-6 mb-8 text-center text-white text-3xl font-bold"
                  style={{ backgroundColor: halte.bgColor }}
              >
                  {halte.name.split(" ").map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                  ).join(" ")}
              </div>
      
              {/* Schedule Image */}
              <div className="flex flex-col items-center">
                  <div className="w-full max-w-3xl flex justify-center">
                    <Image
                        src={halte.scheduleImage}
                        alt={`Jadwal ${halte.name}`}
                        width={halte.width}
                        height={halte.height}
                    />
                  </div>
              </div>
            </div>
        ))}
      </div>
    </main>
  )
}
