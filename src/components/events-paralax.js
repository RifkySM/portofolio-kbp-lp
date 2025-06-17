"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useTransform, useScroll } from "framer-motion"
import Image from "next/image"

const ParallaxMap = () => {
  const [parallaxImage, setParallaxImage] = useState(null)
  const containerRef = useRef(null)
  useEffect(() => {
    fetch('/api/parameter/paralax-image')
      .then(response => response.json())
      .then(data => setParallaxImage(data))
      .catch(error => console.error("Error fetching paralax-image:", error));
  }, [])
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "70%"])

  return (
    parallaxImage ? (
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
            src={parallaxImage}
            alt={"Parallax Image"}
            fill
            className="object-cover object-top"
            priority
            sizes="100vw"
          />
        </motion.div>
      </section>
    ) : null
  )
}

export default ParallaxMap
