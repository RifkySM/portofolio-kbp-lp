"use client"

import { useRef } from "react"
import { motion, useTransform, useScroll } from "framer-motion"
import Image from "next/image"

const ParallaxMap = () => {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "70%"])
  
  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden h-[90vh] z-10"
      style={{ marginTop: "-2px", marginBottom: "-2px" }} // Tambahkan marginBottom negatif
    >
      <motion.div
        className="absolute inset-0 w-full h-[calc(100%+200px)]" // Perbesar height agar mencakup atas dan bawah
        style={{ 
          y,
          top: "-350px", // Gunakan style langsung daripada -top-[200px] 
          bottom: "-100px" // Tambahkan bottom negatif
        }}
      >
        <Image
          src="/paralax-maps.png"
          alt="Stasiun Padalarang"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </motion.div>
      
      {/* Konten di atas gambar */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between h-full">
        <div className="w-full md:w-1/2"></div>
        
        <div className="w-full md:w-1/2 text-right p-6 rounded-lg">
          <h2 className="text-5xl md:text-7xl font-bold text-white">
            <span className="text-blue-500">30</span> MENIT
          </h2>
          <p className="text-2xl md:text-4xl font-semibold text-white mt-2">
            dari JAKARTA ke KBPa
          </p>
          <p className="text-xl md:text-2xl font-medium text-white mt-1 italic">
            via Kereta Cepat
          </p>
        </div>
      </div>
    </section>
  )
}

export default ParallaxMap