"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

export default function MapOnly({ halteData = [], mapCenter = [-6.8722, 107.5286] }) {
    const [isMounted, setIsMounted] = useState(false)
  
    useEffect(() => {
      setIsMounted(true)
  
      // Perbaiki icon Leaflet default (jika ingin menggunakan marker default)
      delete L.Icon.Default.prototype._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
      })
    }, [])
  
    if (!isMounted) {
      return (
        <div className="h-full w-full bg-gray-200 flex items-center justify-center">
          <p>Loading Map...</p>
        </div>
      )
    }
  
    return (
      <MapContainer center={mapCenter} zoom={15} style={{ height: "900px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {halteData.map((halte) => (
          <Marker key={halte.id} position={[halte.lat, halte.lng]} />
        ))}
      </MapContainer>
    )
  }