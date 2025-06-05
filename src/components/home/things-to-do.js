"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import axiosClient from "@/lib/axiosClient"

export default function ThingsToDo() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const [currentItem, setCurrentItem] = useState([])
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = (await axiosClient.get('/things-to-do/display'))?.data?.data
        setCurrentItem(response.map((item, index) => ({
          id: item.id,
          number: item.order,
          title: item.name,
          description: item.description,
          link: item.link,
        })))
      } catch (error) {
        console.log(error)
      }
    }
    fetchItems()
  })

  return (
    <section id="things-to-do" className="py-16 bg-[#f8f7f1]" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="flex flex-col items-center justify-center mb-10"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-6xl font-bold text-black text-center">Things To Do</h2>
          <div className="flex items-center mt-4">
            <span className="text-5xl font-bold text-black mr-3 -mt-20">at</span>
            <div className="relative h-32 w-64">
              <Image
                src="/event/things-to-do/logo.png"
                alt="Kooba yuk logo"
                width={260}
                height={128}
                className="object-contain"
              />
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex justify-center">
          <div className="w-1/4 pr-12 flex flex-col">
            {currentItem.slice(0, 2).map((item, index) => (
              <motion.div key={item.id} className="mb-28"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.3, ease: "easeOut" }}
              >
                <div className="text-lg text-black font-bold">{item.number}</div>
                <h3 className="text-3xl text-black tracking-wide mt-1">{item.title}</h3>
                <p className="mt-3 text-xs text-black text-justify leading-relaxed">{item.description}</p>
                <div className="mt-4">
                  <Link href={item.link}>
                    <span className="text-xs bg-white py-1 px-4 rounded-full text-black font-medium hover:bg-[#ED7A21] hover:text-white transition-colors duration-100">View More</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Gambar */}
          <div className="w-1/3 flex justify-center items-center relative">
            <motion.div
              className="relative w-[309px] h-[303px] -mr-44 z-20 -mt-[27rem]"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
              <Image src="/home/image-1.png" alt="People enjoying at balcony" fill className="object-cover" />
            </motion.div>
            <motion.div
              className="relative w-[379px] h-[575px]"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
              <Image src="/home/image-2.png" alt="People at shopping area" fill className="object-cover" />
            </motion.div>
          </div>

          <div className="w-1/4 pl-12 flex flex-col">
            {currentItem.slice(2, 4).map((item, index) => (
              <motion.div key={item.id} className="mb-28"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.3, ease: "easeOut" }}
              >
                <div className="text-lg text-black font-bold">{item.number}</div>
                <h3 className="text-3xl text-black tracking-wide mt-1">{item.title}</h3>
                <p className="mt-3 text-xs text-black text-justify leading-relaxed">{item.description}</p>
                <div className="mt-4">
                  <Link href={item.link}>
                    <span className="text-xs bg-white py-1 px-4 rounded-full text-black font-medium hover:bg-[#ED7A21] hover:text-white transition-colors duration-100">View More</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
