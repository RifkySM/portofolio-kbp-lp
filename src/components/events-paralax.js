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
      className="relative w-full overflow-hidden h-[50vh] md:h-[80vh] z-10"
      style={{ marginTop: "-2px", marginBottom: "-2px" }} // Tambahkan marginBottom negatif
    >
      <motion.div
        className="absolute inset-0 w-full h-[calc(100%+200px)]"
        style={{
          y,
          top: "-350px",
          bottom: "-50px"
        }}
      >
        <Image
          src="/paralax-event.png"
          alt="Stasiun Padalarang"
          fill
          className="object-cover object-top"
          priority
          sizes="100vw"
        />
      </motion.div>
    </section>
  )
}

export default ParallaxMap