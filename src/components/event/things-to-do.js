"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"

export default function ThingsToDo() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [thingsToDoItems, setThingsToDoItems] = useState([])
  const [images, setImages] = useState([])

  useEffect(() => {
    fetch('/api/home/things-to-do')
      .then((res) => res.json())
      .then((data) => {
        const items = data?.data?.map((item) => ({
          id: item.id,
          number: item.order_num,
          title: item.name,
          link: item.link,
        })) || []
        setThingsToDoItems(items)
      })
      .catch(console.error)

    fetch('/api/gallery/things-to-do')
      .then((res) => res.json())
      .then((data) => {
        const datas = data?.data || [];
        setImages(datas);
      })
      .catch(console.error)
  }, [])

  return (
    <section className="py-16 bg-[#f8f7f1]" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col items-center justify-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-6xl font-bold text-black text-center">Things To Do</h2>
          <div className="flex items-center mt-4">
            <span className="text-5xl font-bold text-black mr-3 -mt-20">at</span>
            <div className="relative h-32 w-64">
              <Image
                src="/event/things-to-do/logo.png"
                alt="Kooba yuk logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </motion.div>

        {/* Items */}
        <div className="flex flex-col items-center space-y-8">
          {[0, 2].map((rowStart) => (
            <div key={rowStart} className="flex flex-col md:flex-row justify-center items-center w-full space-y-6 md:space-y-0">
              {[0, 1].map((i) => (
                <ThingsToDoItem
                  key={rowStart + i}
                  item={thingsToDoItems[rowStart + i]}
                  delay={0.1 * (rowStart + i + 1)}
                  isInView={isInView}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Images */}
        <div className="flex justify-center relative mt-10">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`relative ${index === 0
                ? "w-[404px] h-[268px] -mr-10 mt-16 z-10"
                : "w-[404px] h-[268px] -mr-10 mt-16 z-10"
                }`}
            >
              <Image
                src={image.file}
                alt={image.title || `Gallery image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ThingsToDoItem({ item, delay, isInView }) {
  if (!item?.title) return null

  return (
    <div className="relative md:mx-16 w-full md:w-auto">
      <div className="bg-[#2374E1] text-white rounded-full py-4 pl-8 pr-10 inline-flex items-center w-full justify-between md:justify-start">
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay, ease: "easeOut" }}
        >
          <span className="text-md font-bold mr-4">{item.number}</span>
          <span className="text-md md:text-3xl font-bold">{item.title}</span>
        </motion.div>
      </div>
      <Link
        href={item.link}
        className="absolute right-4 md:-right-20 top-1/2 transform -translate-y-1/2"
      >
        <div className="bg-white text-[#E6B03B] text-sm font-medium py-1.5 px-4 rounded-full border-2 border-[#E6B03B] hover:bg-[#C64700] hover:text-white hover:border-[#C64700] duration-200">
          View More
        </div>
      </Link>
    </div>
  )
}
