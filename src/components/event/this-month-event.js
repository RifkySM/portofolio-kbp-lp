"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"

// Data untuk event
const eventData = [
  {
    id: "sayur-keliling",
    title: "MC Sayur Keliling",
    date: "25 Apr 2025",
    image: "/event/this-month-event/image-1.png",
    description: ["Belanja sayur dan buah jadi makin seru di Pasar Parahyangan! 🛒🏪"],
    time: "09:00 - Selesai",
    location: "Pasar Parahyangan",
    link: "#",
  },
  {
    id: "pumptrack-bike",
    title: "Pumptrack Bike Competition",
    date: "26 Apr 2025",
    image: "/event/this-month-event/image-2.png",
    description: [
      "Kategori:",
      "✅ Pushbike (Boys 2017, 2018, 2019, 2020 & Girls 2019,2020)",
      "✅ BMX (Boys Junior 8th, 9th, 10th)",
      "✅ MTB (Open, Master A 30-35th, Master B 30-40th)",
    ],
    time: "08:00 AM - selesai",
    location: "Bala Pare",
    link: "#",
  },
]

export default function ThisMonthEvent() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2, margin: "0px 0px -100px 0px" })

  return (
    <section id="this-month-event" className="py-10 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header with logo and text */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="relative w-52 h-32">
            <Image
              src="/event/things-to-do/logo.png"
              alt="Kooba yuk logo"
              width={213}
              height={114}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col items-start -mt-8">
            <div className="text-[#cb6140] text-4xl font-bold -ml-2">this</div>
            <div className="text-[#2b6ca3] text-4xl font-bold ml-6 -mt-2">month</div>
            <div className="text-[#8cb04a] text-4xl font-bold ml-20 -mt-2">event</div>
          </div>
          <Link href="#" className="mt-4">
            <button className="bg-[#6A2383] text-white font-semibold py-2 px-4 rounded-full hover:bg-[#4F7D89] duration-300">
              E-Flyer Download Here
            </button>
          </Link>
        </div>

        {/* Event cards */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 perspective-[1200px]"
          initial={{
            opacity: 0,
            rotateX: 180,
            y: 100,
            rotateZ: -50,
            transformOrigin: "center bottom",
          }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  rotateX: 0,
                  y: 0,
                  rotateZ: 0,
                }
              : {
                  opacity: 0,
                  rotateX: 180,
                  y: 100,
                  rotateZ: -50,
                }
          }
          transition={{
            duration: 1.5,
            ease: [0.25, 0.1, 0.25, 1.0],
            opacity: { duration: 0.8 },
          }}
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
        >
          {eventData.map((event) => {
            return (
              <div key={event.id} className="w-full md:w-[300px] h-[600px] relative">
                {/* Background image */}
                <div
                  className="absolute inset-0 rounded-t-full overflow-hidden"
                  style={{
                    backgroundImage: `url(${event.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>

                {/* Content */}
                <div
                  className="absolute top-1/2 left-0 right-0 min-h-[400px] bg-white rounded-t-3xl px-5 shadow-[0_-10px_10px_-3px_rgba(0,0,0,0.1)]"
                  style={{
                    minHeight: "50%",
                  }}
                >
                  {/* Date badge */}
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-[#88A740] text-white text-sm font-semibold px-6 py-2 rounded-full">
                    {event.date}
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg text-black font-bold mb-3">{event.title}</h3>

                    {/* Deskripsi */}
                    <div className="mb-3">
                      {event.description.map((item, idx) => (
                        <div key={idx} className="flex items-start mb-2">
                          <span className="text-xs font-semibold text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center mb-2">
                      <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                        <span className="text-xs">⏱️</span>
                      </div>
                      <span className="text-xs text-gray-700 font-semibold">{event.time}</span>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      <Link href={event.link} className="text-[#2374E1] text-xs hover:underline">
                        {event.location}
                      </Link>
                      <Link
                        href={event.link}
                        className="bg-black text-white w-7 h-7 rounded-full flex items-center justify-center"
                      >
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </motion.div>

        {/* Navigation arrows */}
        <div className="flex justify-center text-gray-800 mt-12 gap-4">
          <button className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            <span>←</span>
          </button>
          <button className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  )
}
