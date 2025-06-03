"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"

// Data untuk Things To Do
const thingsToDoItems = [
  {
    id: "attraction",
    number: "01",
    title: "Attraction",
    link: "/attractions",
  },
  {
    id: "foodtalk",
    number: "02",
    title: "KBPa Foodtalk",
    link: "/food",
  },
  {
    id: "shopping",
    number: "03",
    title: "Find it, Love it, Buy it",
    link: "#",
  },
  {
    id: "wellness",
    number: "04",
    title: "Wellness",
    link: "#",
  },
]

export default function ThingsToDo() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section className="py-16 bg-[#f8f7f1]" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col items-center justify-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
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

        {/* Things to do items */}
        <div className="flex flex-col items-center">
          {/* Wrapper Baris Pertama */}
          <div className="flex flex-col md:flex-row justify-center items-center w-full mb-8 space-y-6 md:space-y-0">
            {/* Item 1 */}
            <div className="relative md:mx-16 w-full md:w-auto">
              <div className="bg-[#2374E1] text-white rounded-full py-4 pl-8 pr-10 inline-flex items-center w-full justify-between md:justify-start">
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                >
                  <span className="text-md font-bold mr-4">{thingsToDoItems[0].number}</span>
                  <span className="text-md md:text-3xl font-bold">{thingsToDoItems[0].title}</span>
                </motion.div>
              </div>
              <Link
                href={thingsToDoItems[0].link}
                className="absolute right-4 md:-right-20 top-1/2 transform -translate-y-1/2"
              >
                <div className="bg-white text-[#E6B03B] text-sm font-medium py-1.5 px-4 rounded-full border-2 border-[#E6B03B] hover:bg-[#C64700] hover:text-white hover:border-[#C64700] duration-200">
                  View More
                </div>
              </Link>
            </div>

            {/* Item 2 */}
            <div className="relative md:mx-16 w-full md:w-auto">
              <div className="bg-[#2374E1] text-white rounded-full py-4 pl-8 pr-10 inline-flex items-center w-full justify-between md:justify-start">
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                >
                  <span className="text-md font-bold mr-4">{thingsToDoItems[1].number}</span>
                  <span className="text-md md:text-3xl font-bold">{thingsToDoItems[1].title}</span>
                </motion.div>
              </div>
              <Link
                href={thingsToDoItems[1].link}
                className="absolute right-4 md:-right-20 top-1/2 transform -translate-y-1/2"
              >
                <div className="bg-white text-[#E6B03B] text-sm font-medium py-1.5 px-4 rounded-full border-2 border-[#E6B03B] hover:bg-[#C64700] hover:text-white hover:border-[#C64700] duration-200">
                  View More
                </div>
              </Link>
            </div>
          </div>

          {/* Wrapper Baris Kedua */}
          <div className="flex flex-col md:flex-row justify-center items-center w-full mb-8 space-y-6 md:space-y-0">
            {/* Item 3 */}
            <div className="relative md:mx-16 w-full md:w-auto">
              <div className="bg-[#2374E1] text-white rounded-full py-4 pl-8 pr-10 inline-flex items-center w-full justify-between md:justify-start">
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                >
                  <span className="text-md font-bold mr-4">{thingsToDoItems[2].number}</span>
                  <span className="text-md md:text-3xl font-bold">{thingsToDoItems[2].title}</span>
                </motion.div>
              </div>
              <Link
                href={thingsToDoItems[2].link}
                className="absolute right-4 md:-right-20 top-1/2 transform -translate-y-1/2"
              >
                <div className="bg-white text-[#E6B03B] text-sm font-medium py-1.5 px-4 rounded-full border-2 border-[#E6B03B] hover:bg-[#C64700] hover:text-white hover:border-[#C64700] duration-200">
                  View More
                </div>
              </Link>
            </div>

            {/* Item 4 */}
            <div className="relative md:mx-16 w-full md:w-auto">
              <div className="bg-[#2374E1] text-white rounded-full py-4 pl-8 pr-10 inline-flex items-center w-full justify-between md:justify-start">
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                >
                  <span className="text-md font-bold mr-4">{thingsToDoItems[3].number}</span>
                  <span className="text-md md:text-3xl font-bold">{thingsToDoItems[3].title}</span>
                </motion.div>
              </div>
              <Link
                href={thingsToDoItems[3].link}
                className="absolute right-4 md:-right-20 top-1/2 transform -translate-y-1/2"
              >
                <div className="bg-white text-[#E6B03B] text-sm font-medium py-1.5 px-4 rounded-full border-2 border-[#E6B03B] hover:bg-[#C64700] hover:text-white hover:border-[#C64700] duration-200">
                  View More
                </div>
              </Link>
            </div>
          </div>
        </div>


        {/* Images section */}
        <div className="flex justify-center relative">
          <div className="relative w-[404px] h-[268px] -mr-10 mt-16 z-10">
            <Image src="/event/things-to-do/image-1.png" alt="Shopping exterior" fill className="object-cover" />
          </div>
          <div className="relative w-[269px] h-[406px]">
            <Image src="/event/things-to-do/image-2.png" alt="Pasar Parahyangan" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}