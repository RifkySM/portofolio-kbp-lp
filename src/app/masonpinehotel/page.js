"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"

export default function MasonPineHotelPage() {
  const [mounted, setMounted] = useState(false)
  const [isBookHovered, setIsBookHovered] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const sliderRef = useRef(null)
  const autoplayRef = useRef(null)
  const interactionTimeoutRef = useRef(null)
  const isInteractingRef = useRef(false)
  
  const sliderImages = [
    { src: "/masonpinehotel/mason-1.png", alt: "Mason Pine Hotel Night View" },
    { src: "/masonpinehotel/mason-2.png", alt: "Family at Playground" },
    { src: "/masonpinehotel/mason-3.png", alt: "Pool Area" }
  ]

  useEffect(() => {
    setMounted(true)
  
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    autoplayRef.current = setInterval(() => {
      if (!isInteractingRef.current) {
        nextSlide()
      }
    }, 5000)
  
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
      if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current)
    }
  }, [])
  
  
  const pauseAutoplay = () => {
    isInteractingRef.current = true
    
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current)
    }
    
    interactionTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false
    }, 5000)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1))
  }

  // Fungsi untuk menangani geser sentuh (swipe)
  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX
    sliderRef.current = touchDown
    pauseAutoplay()
  }

  const handleTouchMove = (e) => {
    if (sliderRef.current === null) {
      return
    }
    
    const touchDown = sliderRef.current
    const currentTouch = e.touches[0].clientX
    const diff = touchDown - currentTouch
    
    // Jika digeser lebih dari 5px, anggap sebagai swipe
    if (diff > 5) {
      nextSlide()
    } else if (diff < -5) {
      prevSlide()
    }
    
    sliderRef.current = null
  }

  const handleNavButtonClick = (direction) => {
    pauseAutoplay()
    direction === 'next' ? nextSlide() : prevSlide()
  }
  
  const handleDotClick = (index) => {
    pauseAutoplay()
    setCurrentSlide(index)
  }

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto pb-14 px-4">
        {/* Mason Pine Logo */}
        <div className="flex flex-col items-center justify-center">
          <Image 
            src="/masonpinehotel/logo-mason.png" 
            alt="Mason Pine Hotel Logo" 
            width={674} 
            height={403} 
            className="w-64 sm:w-96 md:w-[500px] lg:w-[674px]"
          />
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-12 max-w-[1270px] mx-auto">
          {/* Left Image */}
          <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden h-[250px] sm:h-[400px] lg:h-[500px] relative">
              <Image
                  src="/masonpinehotel/mason-1.png"
                  alt="Mason Pine Hotel Night View"
                  fill
                  className="object-cover"
              />
              </div>
          </div>

          {/* Right Images */}
          <div className="lg:col-span-6 grid grid-cols-1 lg:grid-rows-5 gap-3">
              {/* Top Image */}
              <div className="lg:row-span-2 rounded-3xl overflow-hidden relative h-[100px] sm:h-[200px] lg:h-auto">
                  <Image src="/masonpinehotel/mason-2.png" alt="Family at Playground" fill className="object-cover" />
              </div>

              {/* Bottom Image */}
              <div className="lg:row-span-3 hidden lg:grid grid-cols-2 gap-3">
                  {/* Left Image - Pool Area */}
                  <div className="col-span-1 rounded-3xl overflow-hidden relative">
                      <Image src="/masonpinehotel/mason-3.png" alt="Pool Area" fill className="object-cover" />
                  </div>
                  
                  {/* Right Images - 3 Stacked Images */}
                  <div className="col-span-1 grid grid-rows-5 gap-3">
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

          {/* Pool Area Image - Only shown on small screens */}
          <div className="lg:hidden rounded-3xl overflow-hidden h-[200px] sm:h-[250px] relative">
              <Image src="/masonpinehotel/mason-3.png" alt="Pool Area" fill className="object-cover" />
          </div>
        </div>

        {/* Hotel Information */}
        <div className="w-full sm:max-w-md md:max-w-lg lg:max-w-lg mx-auto text-center">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-wide text-[#b08d57] mb-6 lg:mb-8">Mason Pine Hotel</h2>

          {/* Teks deskripsi */}
          <p className="text-gray-700 mb-6 lg:mb-8 text-sm sm:text-md leading-relaxed text-justify">
            Mason Pine Hotel, terletak di kawasan Kota Baru Parahyangan, Bandung, adalah hotel mewah{" "}
            <span className="text-[#b08d57] font-bold">bintang lima</span> yang menawarkan perpaduan sempurna antara
            kenyamanan modern dan keindahan alam. Dikelilingi oleh pemandangan pegunungan yang menakjubkan, hotel ini
            menyediakan fasilitas lengkap seperti{" "}
            <span className="text-[#b08d57] font-bold">
              kolam renang berukuran Olimpiade, Kid&apos;s Club, Gym, hingga Spa.
            </span>
          </p>

          {/* Star Rating  */}
          <div className="flex justify-center mb-6 lg:mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="rgb(230, 176, 59)"
                className="mx-1 w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9"
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
                className="mr-2 w-5 h-5 sm:w-6 sm:h-6"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span className="text-sm sm:text-md font-bold underline">Mason Pine Hotel Maps</span>
            </Link>
          </div>

          {/* Book Now Button */}
          <div className="mt-6 lg:mt-8">
            <a
              href="https://www.masonpinehotel.com/en"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block px-5 sm:px-6 lg:px-7 py-1 rounded-full text-md sm:text-xl font-medium transition-all duration-300 ${
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

        {/* Right Images - 3 Stacked Images - Moved below for mobile/tablet */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 max-w-[1270px] mx-auto">
          {/* Shopping Image */}
          <div className="rounded-3xl overflow-hidden h-[100px] sm:h-[200px] relative">
            <Image src="/masonpinehotel/mason-4.png" alt="Shopping" fill className="object-cover" />
          </div>
          
          {/* Bottom 2 Images */}
          <div className="grid grid-cols-2 gap-3">
              <div className="rounded-3xl overflow-hidden h-[150px] sm:h-[200px] relative">
                  <Image src="/masonpinehotel/mason-5.png" alt="Dining" fill className="object-cover" />
              </div>
              <div className="rounded-3xl overflow-hidden h-[150px] sm:h-[200px] relative">
                  <Image src="/masonpinehotel/mason-6.png" alt="Restaurant" fill className="object-cover" />
              </div>
          </div>
        </div>
        
        {/* Image Slider - only for mobile */}
        <div className="sm:hidden mt-10 relative w-full overflow-hidden">
          {/* Slider Container */}
          <div 
            className="relative w-full h-[400px] overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            {/* Image Slides */}
            <div className="flex transition-transform duration-300 ease-in-out h-full" 
                 style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {sliderImages.map((image, index) => (
                <div key={index} className="min-w-full h-full flex-shrink-0 relative">
                  <Image 
                    src={image.src} 
                    alt={image.alt} 
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
            
            {/* Navigation Buttons */}
            <button 
              onClick={() => handleNavButtonClick('prev')}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 p-2 rounded-full"
              aria-label="Previous slide"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            
            <button 
              onClick={() => handleNavButtonClick('next')}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 p-2 rounded-full"
              aria-label="Next slide"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
          
          {/* Pagination Dots */}
          <div className="flex justify-center mt-3">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2 w-2 mx-1 rounded-full ${
                  currentSlide === index ? "bg-[#b08d57]" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}