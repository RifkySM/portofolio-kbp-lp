"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function WhyKBPa() {
  const [hoverLeft, setHoverLeft] = useState(false)
  const [hoverEasyAccess, setHoverEasyAccess] = useState(false)
  const [hoverHangout, setHoverHangout] = useState(false)
  const [hoverPleasant, setHoverPleasant] = useState(false)

  return (
    <section className="pt-28 pb-14">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Panel (Blue) */}
          <motion.div
            className="bg-blue-600 rounded-3xl p-8 flex flex-col justify-center col-span-12 md:col-span-4 h-[840px] relative overflow-visible"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            whileHover={{ x: -5 }}
            onHoverStart={() => setHoverLeft(true)}
            onHoverEnd={() => setHoverLeft(false)}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 10,
              mass: 1.5,
            }}
            viewport={{ once: true }}
          >
            <div className="text-white mb-24">
              <h2 className="text-7xl md:text-8xl font-bold">Why?</h2>
              <h3 className="text-6xl md:text-7xl font-bold mt-4">KBPa</h3>
            </div>

            {/* Yellow Panel */}
            {hoverLeft && (
              <motion.div
                className="absolute -top-8 right-10 bg-[#D89F33] p-6 rounded-[25px] w-[280px] z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-white text-sm">" Cukup sejuk hawanya enak buat gowes santuyy. "</p>
                <p className="text-white text-sm font-semibold mt-2">- Srie Monah</p>
              </motion.div>
            )}

            {/* Green Panel */}
            {hoverLeft && (
              <motion.div
                className="absolute top-1/2 mt-20 -left-5 bg-[#88A740] p-6 rounded-[25px] w-[280px] z-10"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <p className="text-white text-sm">" Secara keseluruhan, tempat ini luar biasa! "</p>
                <p className="text-white text-ssm font-semibold mt-2">- 江伟雄</p>
              </motion.div>
            )}

            {/* Red Panel */}
            {hoverLeft && (
              <motion.div
                className="absolute bottom-10 -right-5 bg-[#D35F39] p-6 rounded-[25px] w-[280px] z-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <p className="text-white text-sm">
                  " Lokasi strategis, keluar/masuk tol Padalarang langsung. Fasilitas lengkap "
                </p>
                <p className="text-white text-sm font-semibold mt-2">- Widi Budi Nugraha</p>
              </motion.div>
            )}
          </motion.div>

          {/* Right Side Content */}
          <div className="col-span-12 md:col-span-8 gap-6">
            <div className="grid grid-cols-12 gap-6 mb-4">
              {/* Easy Access Panel */}
              <motion.div
                className="relative rounded-3xl overflow-hidden col-span-5 h-[425px]"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ x: -5 }}
                onHoverStart={() => setHoverEasyAccess(true)}
                onHoverEnd={() => setHoverEasyAccess(false)}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                  style={{
                    backgroundImage: hoverEasyAccess
                      ? "url(/event/why-kbp/easy-access-2.png)"
                      : "url(/event/why-kbp/easy-access.png)",
                  }}
                ></div>
                {!hoverEasyAccess ? (
                  <div className="absolute top-5 left-5">
                    <h3 className="text-white text-3xl md:text-4xl font-bold">
                      Easy
                      <br />
                      Access
                    </h3>
                  </div>
                ) : (
                  <div className="absolute bottom-8 left-5 right-5">
                    <p className="text-white text-justify text-xs font-semibold">
                      Akses yang mudah membawamu lebih cepat untuk datang ke KBPa! Cukup 30 menit saja dari Jakarta
                      dengan Whoosh atau dapat diakses dengan tol Cipularang.
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Hangout Places Panel */}
              <motion.div
                className="relative rounded-3xl overflow-hidden col-span-7 h-[425px]"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ x: -5 }}
                onHoverStart={() => setHoverHangout(true)}
                onHoverEnd={() => setHoverHangout(false)}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                  style={{
                    backgroundImage: hoverHangout
                      ? "url(/event/why-kbp/hangout-places-2.png"
                      : "url(/event/why-kbp/hangout-places.png)",
                  }}
                ></div>
                {!hoverHangout ? (
                  <div className="absolute bottom-5 left-5">
                    <h3 className="text-white text-3xl md:text-4xl font-bold">
                      Hangout
                      <br />
                      Places
                    </h3>
                  </div>
                ) : (
                  <div className="absolute bottom-8 left-5 right-5">
                    <p className="text-white text-justify text-xs font-semibold">
                      Halo! Ni Hao! Sawatdee! Annyeong haseyo! Assalamualaikum! Bonjour! Nikmati berbagai hidangan khas
                      dari seluruh penjuru dunia. Selain makan kamu juga bisa ngopi, belanja sampai perawatan kecantikan
                      bareng bestie kamu hanya di KBPa.
                    </p>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Pleasant View Panel */}
            <motion.div
              className="relative rounded-3xl overflow-hidden h-[395px]"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              onHoverStart={() => setHoverPleasant(true)}
              onHoverEnd={() => setHoverPleasant(false)}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                style={{
                  backgroundImage: hoverPleasant
                    ? "url(/event/why-kbp/pleasant-view-2.png)"
                    : "url(/event/why-kbp/pleasant-view.png)",
                }}
              ></div>
              {!hoverPleasant ? (
                <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                  <h3 className="text-white text-3xl md:text-4xl font-bold">
                    Pleasant
                    <br />
                    View
                  </h3>
                </div>
              ) : (
                <div className="absolute bottom-8 left-5 right-5">
                  <p className="text-white text-xs font-semibold">
                    <span className="block">Butuh healing yang hijau-hijau?</span>
                    <span className="block">Sepadaan/jogging dengan view yang memanjakan?</span>
                    <span className="block">Secara bersamaan, kamu bisa dapatkan semua itu hanya di KBPa.</span>
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="w-full pt-20 flex justify-center items-center gap-10">
        <motion.div
          className="relative flex items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Orange circle behind "Get" */}
          <div className="absolute w-10 h-10 bg-orange-500 rounded-full -left-7 top-1/3 -translate-y-1/2" />

          <h2 className="text-2xl md:text-3xl text-black z-10">
            <span className="font-bold mr-1">Get</span>
            <span className="italic font-normal">to Know Us</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <Link href="#">
            <button className="border-2 border-orange-500 text-black font-bold px-5 py-1.5 rounded-full hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-colors">
              Learn More
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
