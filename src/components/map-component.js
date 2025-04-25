"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Komponen untuk mengubah posisi peta
function ChangeMapView({ center }) {
  const map = useMap()
  map.setView(center, 15)
  return null
}

export default function MapComponent({ halteData, mapCenter, selectedHalte }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Fix for Leaflet icon issue
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    })
  }, [])

  // Custom bus icon for markers
  const busIcon = L.divIcon({
    className: "custom-bus-icon",
    html: `<div style="background-color: #7e22ce; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 16c0 .88.39 1.67 1 2.22V20a1 1 0 0 0 2 0v-1h10v1a1 1 0 0 0 2 0v-1.78c.61-.55 1-1.34 1-2.22V6c0-3-2.69-5-6-5H10C6.69 1 4 3 4 6v10zm2-7h12v5H6V9zm0-3c0-1.66 1.79-3 4-3h4c2.21 0 4 1.34 4 3v1H6V6zM7.5 17a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"></path>
      </svg>
    </div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  })

  if (!isMounted) {
    return (
      <div className="h-full w-full bg-gray-200 flex items-center justify-center">
        <p>Loading Map...</p>
      </div>
    )
  }

  return (
    <MapContainer center={mapCenter} zoom={15} style={{ height: "100%", width: "100%" }} className="z-0">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {halteData.map((halte) => (
        <Marker key={halte.id} position={[halte.lat, halte.lng]} icon={busIcon}>
          <Popup>
            <div className="p-2">
              <h3 className="font-bold">{halte.name}</h3>
              <p className="text-sm mt-1">• SHUTTLE KBPa ⇄ KCIC ST. PADALARANG</p>
              <div className="mt-2">
                <a
                  href={`#${halte.id}`}
                  target="_blank"
                  className="text-purple-600 underline text-sm font-medium"
                  // onClick={(e) => {
                  //   e.preventDefault();
                  //   document.getElementById(halte.id).scrollIntoView({ 
                  //     behavior: 'smooth' 
                  //   });
                  // }}
                >
                  Check schedule here
                </a>
              </div>
              <button
                className="mt-2 bg-white border border-gray-300 rounded-md px-3 py-1 text-sm"
                onClick={(e) => {
                  e.preventDefault()
                  window.open(halte.direction, "_blank")
                }}
              >
                Get Directions
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
      <ChangeMapView center={mapCenter} />
    </MapContainer>
  )
}
