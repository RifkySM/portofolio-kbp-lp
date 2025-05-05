"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import ExperienceModal from "./experience-modal"

// Data untuk banner slider
const bannerImages = [
  {
    id: 1,
    src: "/event/experience/banner-1.png",
    alt: "Banner 1",
  },
  {
    id: 2,
    src: "/event/experience/banner-2.png",
    alt: "Banner 2",
  },
  {
    id: 3,
    src: "/event/experience/banner-3.png",
    alt: "Banner 3",
  },
  {
    id: 4,
    src: "/event/experience/banner-4.png",
    alt: "Banner 4",
  },
  {
    id: 5,
    src: "/event/experience/banner-5.png",
    alt: "Banner 5",
  },
  {
    id: 6,
    src: "/event/experience/banner-6.png",
    alt: "Banner 6",
  },
  {
    id: 7,
    src: "/event/experience/banner-7.png",
    alt: "Banner 7",
  },
]

// Data untuk testimonial
const testimonials = [
  {
    id: 1,
    name: "Mirella",
    image: "/event/experience/profile.png",
    text: "KBP itu the definition of slow living! It's serene yet zesty at the same time.",
  },
  {
    id: 2,
    name: "Mirella",
    image: "/event/experience/profile.png",
    text: "KBP itu the definition of slow living! Serene yet zesty at the same time.",
  },
  {
    id: 3,
    name: "Anthony Eden",
    image: "/event/experience/profile.png",
    text: "KBP is a phenomenal place. You can found everything here. Love the vibes!",
  },
  {
    id: 4,
    name: "Aldito Tagor",
    image: "/event/experience/profile.png",
    text: "KBP itu tempat yang asik banget buat nongki. Pilihannya spotnya beragam, anti macet, dan parkirnya gratis!",
  },
]

export default function Experience() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const testimonialRef = useRef(null)
  const isInView = useInView(testimonialRef, { once: true, amount: 0.2 })

  // Auto slide untuk banner
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === bannerImages.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === bannerImages.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? bannerImages.length - 1 : prev - 1))
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const truncateText = (text) => {
    if (text.length > 100) {
      return text.substring(0, 100) + "..."
    }
    return text
  }

  return (
    <section className="w-full">
      {/* Banner Slider */}
      <div className="relative w-full h-[430px] overflow-hidden">
        {bannerImages.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 z-10"
          onClick={prevSlide}
        >
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
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 z-10"
          onClick={nextSlide}
        >
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
          >
            <polyline points="9 18 15 12 9 6"></polyline>
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
      <div className="container mx-auto pl-28 py-6 text-left text-xs font-semibold italic text-black">
        Keseluruhan validasi mengenai informasi promo discount merupakan tanggung jawab masing masing tenant yang
        memberikan benefit tersebut.
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
        {/* Left Quote SVG */}
        <div className="absolute left-36 -top-24 text-[#cb6140] w-[180px] h-[180px] z-20">
          <svg viewBox="0 0 200 200" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M84.463 44.235c2.428 4.024 4.786 8.047 7.352 12.348-1.179.694-2.358 1.457-3.537 2.081-9.294 5.411-18.242 11.169-25.525 19.355-7.422 8.325-11.028 18.037-12.069 29.344.971 0 1.942-.069 2.913 0 5.757.416 11.653.139 17.202 1.457 13.109 3.052 18.103 13.111 17.202 25.39-.902 11.724-10.612 21.159-22.126 21.713-8.462.416-16.577-.763-23.236-6.59-6.034-5.272-8.74-12.418-10.474-19.979-4.995-22.337 1.456-41.414 16.577-57.994 7.63-8.325 16.508-15.123 26.08-21.02 3.121-1.942 6.104-4.024 9.225-6.105h.416z"></path>
            <path d="M162.148 44c2.428 4.024 4.786 8.047 7.352 12.348-1.179.694-2.358 1.457-3.537 2.081-9.294 5.411-18.242 11.169-25.525 19.355-7.422 8.325-11.028 18.037-12.069 29.344.971 0 1.942-.069 2.913 0 5.757.416 11.653.139 17.202 1.457 13.109 3.052 18.103 13.111 17.202 25.39-.902 11.724-10.612 21.159-22.126 21.713-8.462.416-16.577-.763-23.236-6.59-6.034-5.272-8.74-12.418-10.474-19.979-4.994-22.338 1.457-41.415 16.577-57.995 7.63-8.325 16.508-15.123 26.08-21.02 3.121-1.942 6.104-4.024 9.225-6.105l.416.001z"></path>
          </svg>
        </div>

        {/* Testimonial Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-12 max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-[#2374E1] text-white p-4 rounded-[50px] relative flex flex-col items-center h-[210px]"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden mb-2">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <p className="text-center text-xs mb-2">{truncateText(testimonial.text)}</p>
              <h3 className="font-bold text-lg">{testimonial.name}</h3>
            </div>
          ))}
        </motion.div>

        {/* Right Quote SVG */}
        <div className="absolute right-36 -bottom-12 text-[#cb6140] w-[180px] h-[180px] transform rotate-180">
          <svg viewBox="0 0 200 200" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M84.463 44.235c2.428 4.024 4.786 8.047 7.352 12.348-1.179.694-2.358 1.457-3.537 2.081-9.294 5.411-18.242 11.169-25.525 19.355-7.422 8.325-11.028 18.037-12.069 29.344.971 0 1.942-.069 2.913 0 5.757.416 11.653.139 17.202 1.457 13.109 3.052 18.103 13.111 17.202 25.39-.902 11.724-10.612 21.159-22.126 21.713-8.462.416-16.577-.763-23.236-6.59-6.034-5.272-8.74-12.418-10.474-19.979-4.995-22.337 1.456-41.414 16.577-57.994 7.63-8.325 16.508-15.123 26.08-21.02 3.121-1.942 6.104-4.024 9.225-6.105h.416z"></path>
            <path d="M162.148 44c2.428 4.024 4.786 8.047 7.352 12.348-1.179.694-2.358 1.457-3.537 2.081-9.294 5.411-18.242 11.169-25.525 19.355-7.422 8.325-11.028 18.037-12.069 29.344.971 0 1.942-.069 2.913 0 5.757.416 11.653.139 17.202 1.457 13.109 3.052 18.103 13.111 17.202 25.39-.902 11.724-10.612 21.159-22.126 21.713-8.462.416-16.577-.763-23.236-6.59-6.034-5.272-8.74-12.418-10.474-19.979-4.994-22.338 1.457-41.415 16.577-57.995 7.63-8.325 16.508-15.123 26.08-21.02 3.121-1.942 6.104-4.024 9.225-6.105l.416.001z"></path>
          </svg>
        </div>
      </div>

      <div className="container mx-auto pt-12 pb-10 px-4 text-center">
        <button className="bg-[#cce0ff] hover:bg-white border border-[#cce0ff] hover:border-gray-600 text-[#324158] hover:text-gray-600 text-md font-bold tracking-wide py-1 px-6 rounded-full transition-colors duration-300">
          view more
        </button>
      </div>

      {/* Modal untuk testimonial */}
      <ExperienceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}
