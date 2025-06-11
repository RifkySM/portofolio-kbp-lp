"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import axiosClient from "@/lib/axiosClient"
import dayjs from 'dayjs'
import 'dayjs/locale/id'

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
    id: "pumptrack-bike-1",
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

  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosClient.get(`post?category=event&paginate=false&limit=5`)
        setData(res.data.data)
      } catch (error) {
        console.error("Failed to fetch news:", error)
      }
    }
    fetchData()
  }, [])

  return (
    <section id="this-month-event" className="py-10 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
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

        {/* Swiper Slider */}
        <motion.div
          initial={{ opacity: 0, rotateX: 180, y: 100, rotateZ: -50 }}
          animate={
            isInView
              ? { opacity: 1, rotateX: 0, y: 0, rotateZ: 0 }
              : { opacity: 0, rotateX: 180, y: 100, rotateZ: -50 }
          }
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1.0], opacity: { duration: 0.8 } }}
          style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
        >
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {data.map((event) => (
              <SwiperSlide key={event.id}>
                <div className="w-full h-[600px] relative mt-6">
                  <div
                    className="absolute inset-0 rounded-t-full overflow-hidden"
                    style={{
                      backgroundImage: `url(${event.thumbnail})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>

                  <div className="absolute top-1/2 left-0 right-0 min-h-[400px] bg-gray-100 shadow-md rounded-t-3xl px-5">
                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-[#88A740] text-white text-sm font-semibold px-6 py-2 rounded-full whitespace-nowrap">
                      {dayjs(event.created_at).locale('id').format('dddd, D MMMM YYYY')}
                    </div>

                    <div className="mt-12 max-h-[300px] overflow-y-auto"> {/* Increased top margin to prevent overlap */}
                      <h3 className="text-lg text-black font-bold mb-3 line-clamp-2">{event.title}</h3>
                      <div className="mb-3 text-black max-h-[180px] overflow-hidden" dangerouslySetInnerHTML={{ __html: event?.content }}>
                      </div>

                      <div className="flex justify-between items-center mt-3">
                        <Link href={`news/${event.seo_url}`} className="text-[#2374E1] text-xs hover:underline">
                          Detail
                        </Link>
                        <Link
                          href={`news/${event.seo_url}`}
                          className="bg-black text-white w-7 h-7 rounded-full flex items-center justify-center"
                        >
                          <span>→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}
