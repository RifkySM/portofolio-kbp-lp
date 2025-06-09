"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useTransform, useScroll } from "framer-motion"
import Image from "next/image"
import axiosClient from "@/lib/axiosClient" // fix: axiosClient import

const ParallaxMap = () => {
  const [parallaxImage, setParallaxImage] = useState(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const fetchParallaxImage = async () => {
      try {
        const response = await axiosClient.get("/parameter/key/paralax-image")
        setParallaxImage(response?.data?.data)
      } catch (error) {
        console.error("Error fetching parallax image:", error)
        setParallaxImage(null)
      }
    }
    fetchParallaxImage()
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "70%"])

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden h-[50vh] md:h-[80vh] z-10"
      style={{ marginTop: "-2px", marginBottom: "-2px" }}
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
          src={parallaxImage?.content || "/paralax-event.png"}
          alt={parallaxImage?.key || "Parallax Image"}
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
