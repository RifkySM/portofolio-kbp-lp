"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"
import TitleMaps from "@/components/title-maps"
import ShuttleInfo from "@/components/transportation/shuttle-info"
import ParallaxMap from "@/components/maps-paralax"
import GetRideSection from "@/components/get-ride"
import { motion } from "framer-motion";


export default function MapsPage() {
    const [isOpen, setIsOpen] = useState(false)

    const transportOptions = [
        {
          name: "by Whoosh",
          description: "30 Menit, St. KCIC Halim ⇄ KBPa",
          color: "bg-[#E0A43C]",
        },
        {
          name: "by Tol Cipularang",
          description: "ext. Tol Padalarang",
          subDescription: "120 km dari JAKARTA",
          color: "bg-[#D16B47]",
        },
        {
          name: "by Damri",
          description: "12 km dari BANDUNG via Tol Pasteur ext. Tol Padalarang",
          color: "bg-[#E0A43C]",
        },
        {
          name: "by Bus MJT",
          description: "Alun alun Bandung ⇄ KBPa (Jalur Nasional)",
          color: "bg-[#D16B47]",
        },
        {
          name: "by KA Lokal",
          description: "30 menit dari BANDUNG St. Bandung ⇄ St. Padalarang",
          color: "bg-[#E0A43C]",
        },
      ]

    const MapWithNoSSR = dynamic(() => import("@/components/big-maps"), {
        ssr: false,
        loading: () => (
            <div className="h-[900px] w-full bg-gray-200 flex items-center justify-center">
            <p>Loading Map...</p>
            </div>
        ),
    })

        // Animation for the bouncing effect
        const bounceVariants = {
            initial: {
                opacity: 1,
                scale: 0,
            },
            animate: {
              opacity: 1,
              scale: [0.3, 1.1, 0.9, 1.05, 0.95, 1],
              transition: {
                duration: 1.2,
                times: [0, 0.4, 0.6, 0.8, 0.9, 1],
                ease: "easeOut"
              }
            }
        };


    return (
        <main className="min-h-screen bg-white pb-[10vh]">
            {/* Logo and Title */}
            <TitleMaps />
            
            {/* Maps Section */}
            <section id="maps" className="w-full relative z-10" style={{ margin: 0, padding: 0 }}>
                <MapWithNoSSR />
            </section>

            {/* Parallax Section */}
            <div className="w-full relative z-20" style={{ margin: 0, padding: 0 }}>
                <ParallaxMap />
            </div>

            {/* Shuttle Section - tambahkan marginTop negatif */}
            <section id="shuttle" className="relative z-30 w-full" style={{ marginTop: "-2px" }}>
                <ShuttleInfo />
            </section>

            {/* Dropdown Section */}
            <div
                className="max-w-[950px] mx-auto relative"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            >
                {/* Header - Div Hijau */}
                <motion.div 
                className="bg-[#8CB23E] text-white py-10 px-12 rounded-full flex items-center justify-center cursor-pointer relative z-20"
                initial="initial"
                animate="animate"
                variants={bounceVariants}
                >
                    <div className="flex items-center">
                        <div className="text-5xl font-bold mr-2 text-white">?</div>
                        <div>
                        <div className="text-3xl font-bold">How to</div>
                        <div className="text-3xl font-bold">Reach</div>
                        </div>
                        <div className="text-5xl font-bold ml-2 text-black">KBPa</div>
                    </div>
                </motion.div>

                {/* Dropdown Items */}
                <div
                    className={`absolute left-1/2 -translate-x-1/2 w-[90%] transition-all duration-300 overflow-hidden z-10 rounded-3xl ${
                    isOpen ? "max-h-[1000px] opacity-100 mt-[-20px] pt-[20px]" : "max-h-0 opacity-0"
                    }`}
                >
                    {transportOptions.map((option, index) => (
                    <div
                    key={index}
                    className={`${option.color} text-white py-4 px-8 flex justify-between items-center cursor-pointer hover:brightness-105 transition-all rounded-xl`}
                    >
                        <div className="text-xl font-bold">{option.name}</div>
                            <div className="text-right">
                                {option.subDescription ? (
                                    <>
                                    <div>{option.description}</div>
                                    <div>{option.subDescription}</div>
                                    </>
                                ) : (
                                    <div>{option.description}</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Rute Section */}
            <div className="w-full flex justify-center mt-6">
                <div className="w-full max-w-5xl px-4">
                <Image
                    src="/rute-maps.png"
                    alt="Rute Maps"
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                />
                </div>
            </div>

            {/* Get Ride Section */}
            <GetRideSection />
        </main>
    )
}