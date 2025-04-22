"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

export default function MasonPineHotelPage() {
  const [mounted, setMounted] = useState(false)
  const [isBookHovered, setIsBookHovered] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 pb-14">
        {/* Mason Pine Logo */}
        <div className="flex flex-col items-center justify-center">
          <Image src="/masonpinehotel/logo-mason.png" alt="Mason Pine Hotel Logo" width={750} height={550} />
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-12 max-w-[1415px] mx-auto">
        {/* Left Image */}
        <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden h-[550px] relative">
            <Image
                src="/masonpinehotel/mason-1.png"
                alt="Mason Pine Hotel Night View"
                fill
                className="object-cover"
            />
            </div>
        </div>

        {/* Right Images */}
        <div className="lg:col-span-6 grid grid-rows-5 gap-3">
            {/* Top Image */}
            <div className="row-span-2 rounded-3xl overflow-hidden relative">
                <Image src="/masonpinehotel/mason-2.png" alt="Family at Playground" fill className="object-cover" />
            </div>

            {/* Bottom Image */}
            <div className="row-span-3 grid grid-cols-5 gap-3">
                {/* Left Image - Pool Area */}
                <div className="col-span-2 rounded-3xl overflow-hidden relative">
                    <Image src="/masonpinehotel/mason-3.png" alt="Pool Area" fill className="object-cover" />
                </div>
                
                {/* Right Images - 3 Stacked Images */}
                <div className="col-span-3 grid grid-rows-5 gap-3">
                    {/* Top Image */}
                    <div className="row-span-2 rounded-3xl overflow-hidden relative">
                    <Image src="/masonpinehotel/mason-4.png" alt="Shopping" fill className="object-cover" />
                    </div>
                    
                    {/* Bottom 2 Images */}
                    <div className="row-span-3 grid grid-cols-2 gap-3">
                        <div className="rounded-3xl overflow-hidden relative">
                            <Image src="/masonpinehotel/mason-5.png" alt="Dining" fill className="object-cover" />
                        </div>
                        <div className="rounded-3xl overflow-hidden relative">
                            <Image src="/masonpinehotel/mason-6.png" alt="Restaurant" fill className="object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>

        {/* Hotel Information */}
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-6xl font-bold text-[#b08d57] mb-8">Mason Pine Hotel</h2>

          {/* Teks deskripsi */}
          <p className="text-gray-700 mb-8 text-lg leading-relaxed text-justify">
            Mason Pine Hotel, terletak di kawasan Kota Baru Parahyangan, Bandung, adalah hotel mewah{" "}
            <span className="text-[#b08d57] font-bold">bintang lima</span> yang menawarkan perpaduan sempurna antara
            kenyamanan modern dan keindahan alam. Dikelilingi oleh pemandangan pegunungan yang menakjubkan, hotel ini
            menyediakan fasilitas lengkap seperti{" "}
            <span className="text-[#b08d57] font-bold">
              kolam renang berukuran Olimpiade, Kid's Club, Gym, hingga Spa.
            </span>
          </p>

          {/* Star Rating  */}
          <div className="flex justify-center mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="rgb(230, 176, 59)"
                className="mx-1"
              >
                <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
              </svg>
            ))}
          </div>

          {/* Maps Button */}
          <div className="flex justify-center mb-6">
            <Link href="https://maps.app.goo.gl/MTF2RpgYsjeditMP9" target="_blank" className="flex items-center text-gray-800 hover:text-black transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span className="text-xl font-bold underline">Mason Pine Hotel Maps</span>
            </Link>
          </div>

          {/* Book Now Button */}
          <div className="mt-8">
          <a
            href="https://www.masonpinehotel.com/en"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block py-3 px-12 rounded-full text-xl font-medium transition-all duration-300 ${
                isBookHovered
                ? "bg-[#1a2e01] text-white"
                : "bg-[#f4f4f4] text-[#1a2e01]"
            }`}
            onMouseEnter={() => setIsBookHovered(true)}
            onMouseLeave={() => setIsBookHovered(false)}
            >
            Book now
        </a>
          </div>
        </div>
      </div>
    </main>
  )
}
