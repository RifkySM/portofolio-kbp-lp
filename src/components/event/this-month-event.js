"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import dayjs from "dayjs"
import "dayjs/locale/id"

export default function ThisMonthEvent() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2, margin: "0px 0px -100px 0px" })

  const [data, setData] = useState([])

  useEffect(() => {
    fetch("/api/home/event?limit=10")
      .then(res => res.json())
      .then(json => setData(json.data))
      .catch(error => console.error("Failed to fetch news:", error))
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
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 1000, disableOnInteraction: false }}
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
                  {/* Image Background */}
                  <div
                    className="absolute inset-0 rounded-t-full overflow-hidden"
                    style={{
                      backgroundImage: `url(${event.thumbnail})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>

                  {/* Content Box */}
                  <div className="absolute top-1/2 left-0 right-0 min-h-[400px] bg-gray-100 shadow-md rounded-t-3xl px-5 pb-5">
                    {/* Date Badge */}
                    {(event.date_start || event.date_end) && (
                      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-[#88A740] text-white text-sm font-semibold px-6 py-2 rounded-full whitespace-nowrap">
                        {event.date_end
                          ? `${dayjs(event.date_start).locale("id").format("D MMMM")} - ${dayjs(event.date_end).locale("id").format("D MMMM YYYY")}`
                          : dayjs(event.date_start).locale("id").format("dddd, D MMMM YYYY")
                        }
                      </div>
                    )}

                    {/* Content */}
                    <div className="mt-14 flex flex-col justify-between h-[calc(100%-3.5rem)]">
                      <div>
                        <h3 className="text-xl text-black font-bold mb-2 line-clamp-2">{event.title}</h3>
                        <div
                          className="text-sm text-gray-700 leading-relaxed mb-4 overflow-hidden max-h-32"
                          dangerouslySetInnerHTML={{ __html: event?.content }}
                        />
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t">
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
