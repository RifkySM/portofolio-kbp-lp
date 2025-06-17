"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import axiosClient from "@/lib/axiosClient"
import ExperienceModal from "./experience-modal"

export default function Experience() {
  const [testimonies, setTestimonies] = useState([])
  const [bannerImages, setBannerImages] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const testimonialRef = useRef(null)
  const isInView = useInView(testimonialRef, { once: true, amount: 0.2 })

  useEffect(() => {
    fetch("/api/gallery/image-slider")
      .then(res => res.json())
      .then(json => setBannerImages(json.data.map((item, index) => ({
        id: index,
        title: item.title,
        description: item.description,
        src: item.file,
        alt: item.title || `Banner ${index + 1}`,
      }))))
      .catch(error => console.error("Failed to fetch image slider:", error))

    fetch('/api/home/testimony?type=testimony&limit10')
      .then(res => res.json())
      .then(res => {
        const mappedTestimonies = res.data.map((testimony, index) => ({
          id: index,
          name: testimony.name,
          text: testimony.testimony,
          image: testimony.image,
        }))
        setTestimonies(mappedTestimonies)
      })
      .catch(error => console.error("Failed to fetch testimony:", error))
  }, [])

  useEffect(() => {
    if (bannerImages.length === 0) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === bannerImages.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [bannerImages])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === bannerImages.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? bannerImages.length - 1 : prev - 1))
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const truncateText = (text) => (text.length > 100 ? text.substring(0, 100) + "..." : text)

  return (
    <section className="w-full">
      {/* Banner Slider */}
      <div className="relative w-full h-[600px] overflow-hidden">
        {bannerImages.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-contain md:object-contain"
              priority={index === 0}
            />
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 z-10"
          onClick={prevSlide}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 z-10"
          onClick={nextSlide}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Disclaimer Text */}
      <div className="flex justify-center mx-auto py-6 text-xs font-semibold italic text-black">
        Keseluruhan validasi mengenai informasi promo discount merupakan tanggung jawab masing-masing tenant yang memberikan benefit tersebut.
      </div>

      {/* Share Experience Section */}
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-xl tracking-wide text-black font-bold mb-4">
          Share your best experience at <span className="text-[#2374E1]">KBP!</span>
        </h2>
        <button
          className="bg-[#F3771E] hover:bg-white border border-[#F3771E] hover:border-gray-600 text-white hover:text-gray-600 text-md tracking-wide font-semibold py-1 px-4 rounded-full transition-colors duration-300"
          onClick={() => setIsModalOpen(true)}
        >
          Share your testimonial
        </button>
      </div>

      {/* Testimonials Section */}
      <div className="container mx-auto px-4 pb-8 relative" ref={testimonialRef}>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {testimonies.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-[#2374E1] text-white p-6 rounded-3xl flex flex-col items-center h-[260px] shadow-lg"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-4 border-white">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-center text-sm mb-3 italic">{truncateText(testimonial.text)}</p>
              <h3 className="font-bold text-lg">{testimonial.name}</h3>
            </div>
          ))}
        </motion.div>
      </div>

      {/* View More Button */}
      <div className="container mx-auto pt-12 pb-10 px-4 text-center">
        <button className="bg-[#cce0ff] hover:bg-white border border-[#cce0ff] hover:border-gray-600 text-[#324158] hover:text-gray-600 text-md font-bold tracking-wide py-1 px-6 rounded-full transition-colors duration-300">
          view more
        </button>
      </div>

      {/* Modal */}
      <ExperienceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}
