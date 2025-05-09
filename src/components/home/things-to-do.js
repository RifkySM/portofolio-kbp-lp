"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"

// Data untuk Things To Do
const thingsToDoItems = [
  {
    id: "foodtalk",
    number: "01",
    title: "KBPa FoodTalk",
    description:
      "Bingung mau makan kemana? Bosen makanannya itu itu aja? Di foodtalk ini kamu bisa explore makanan dari berbagai restoran cafe KBPa. Rasakan cita rasa baru dari belahan penjuru dunia! Indonesian Food? Banyak. Korean Food? Pasti ada. Chinese Food? Ada juga. Thai Food? So pasti. Western? Dimana mana. Kalau kamu, sudah coba yang mana?",
    link: "/kbpa-foodtalk",
  },
  {
    id: "vacay",
    number: "02",
    title: "KBPa Vacay Mode",
    description:
      "Vacay mode ON! KBPa wajib masuk bucket list untuk pilihan destinasi wisata dan liburan seru keluargamu! Kamu bisa menikmati wisata air di Wahoo Waterworld, bersantai sambil santai di Bumi Hejo, golf bareng bestie-mu di Parahyangan Golf, piknik seru di Tepi Danau, dan masih banyak lagi. Segera rencanakan liburan keluargamu bersama Kota Baru Parahyangan!",
    link: "/kbp-vacay-mode",
  },
  {
    id: "stay",
    number: "03",
    title: "Enjoy Your Stay at KBPa",
    description:
      "Staycation untuk menghilangkan penat dari hiruk pikuknya kota dapat kamu nikmati disini. Salah satu alternatif untuk kamu dan keluarga untuk menghabiskan menikmati menjelajahi berkualitas sekaligus menikmati keindahan alam sekitar Kota Baru Parahyangan. Hanya di Mason Pine liburan keluarga menjadi semakin menyenangkan.",
    link: "/enjoy-your-stay-kbp",
  },
  {
    id: "shopping",
    number: "04",
    title: "Find It, Love It, Buy It",
    description:
      "Temukan semua yang kamu inginkan disini! Perabotan rumah tangga, fashion, hingga kebutuhan sehari-hari untuk melengkapi dapur dan meja makanmu dapat dengan mudah kamu temukan.",
    link: "/find-it-love-it-buy-it",
  },
]

export default function ThingsToDo() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="things-to-do" className="py-16 bg-[#f8f7f1]" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="flex flex-col items-center justify-center mb-10"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
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
          <div className="w-1/4 pr-12">
            {/* Teks 1 */}
            <div className="mb-28">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              >
                <div className="text-lg text-black font-bold">{thingsToDoItems[0].number}</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                <h3 className="text-3xl text-black tracking-wide mt-1">{thingsToDoItems[0].title}</h3>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              >
                <p className="mt-3 text-xs text-black text-justify leading-relaxed">{thingsToDoItems[0].description}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="mt-4"
              >
                <Link href={thingsToDoItems[0].link}>
                  <span className="text-xs bg-white py-1 px-4 rounded-full text-black font-medium hover:bg-[#ED7A21] hover:text-white transition-color duration-100">View More</span>
                </Link>
              </motion.div>
            </div>

            {/* Teks 2 */}
            <div className="mb-28">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              >
                <div className="text-lg text-black font-bold">{thingsToDoItems[1].number}</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                <h3 className="text-3xl text-black tracking-wide mt-1">{thingsToDoItems[1].title}</h3>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              >
                <p className="mt-3 text-xs text-black text-justify leading-relaxed">{thingsToDoItems[1].description}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="mt-4"
              >
                <Link href={thingsToDoItems[1].link}>
                  <span className="text-xs bg-white py-1 px-4 rounded-full text-black font-medium hover:bg-[#ED7A21] hover:text-white transition-color duration-100">View More</span>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Gambar */}
          <div className="w-1/3 flex justify-center items-center relative">
            <motion.div
              className="relative w-[309px] h-[303px] -mr-44 z-20 -mt-[27rem]"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
              <Image src="/home/image-1.png" alt="People enjoying at balcony" fill className="object-cover" />
            </motion.div>
            <motion.div
              className="relative w-[379px] h-[575px]"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
              <Image src="/home/image-2.png" alt="People at shopping area" fill className="object-cover" />
            </motion.div>
          </div>

          <div className="w-1/4 pl-12">
            {/* Teks 3 */}
            <div className="mb-28">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              >
                <div className="text-lg text-black font-bold">{thingsToDoItems[2].number}</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                <h3 className="text-3xl text-black tracking-wide mt-1">{thingsToDoItems[2].title}</h3>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              >
                <p className="mt-3 text-xs text-black text-justify leading-relaxed">{thingsToDoItems[2].description}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="mt-4"
              >
                <Link href={thingsToDoItems[2].link}>
                  <span className="text-xs bg-white py-1 px-4 rounded-full text-black font-medium hover:bg-[#ED7A21] hover:text-white transition-color duration-100">View More</span>
                </Link>
              </motion.div>
            </div>

            {/* Teks 4 */}
            <div className="mb-28">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              >
                <div className="text-lg text-black font-bold">{thingsToDoItems[3].number}</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                <h3 className="text-3xl text-black tracking-wide mt-1">{thingsToDoItems[3].title}</h3>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              >
                <p className="mt-3 text-xs text-black text-justify leading-relaxed">{thingsToDoItems[3].description}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="mt-4"
              >
                <Link href={thingsToDoItems[3].link}>
                  <span className="text-xs bg-white py-1 px-4 rounded-full text-black font-medium hover:bg-[#ED7A21] hover:text-white transition-color duration-100">View More</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
