"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import TitleMaps from "@/components/title-maps"
import ShuttleInfo from "@/components/transportation/shuttle-info"
import ParallaxMap from "@/components/maps-paralax"
import GetRideSection from "@/components/get-ride"
import { motion } from "framer-motion";
import MapOnly from "@/components/big-maps"
import axiosClient from "@/lib/axiosClient"
import HowToReachKbpa from "@/components/maps/how-to-reach-kbpa"


export default function MapsPage() {

    return (
        <main className="min-h-screen bg-white pb-[10vh]">
            {/* Logo and Title */}
            <TitleMaps />

            {/* Maps Section */}
            <section id="maps" className="w-full relative z-10" style={{ margin: 0, padding: 0 }}>
                <MapOnly />
            </section>

            {/* Spacer */}
            <div className="h-16 w-full"></div>  {/* ini jarak 64px */}

            <div className="w-full relative z-20" style={{ margin: 0, padding: 0 }}>
                <ParallaxMap />
            </div>

            <div className="h-16 w-full"></div>  {/* ini jarak 64px */}

            {/* Shuttle Section - tambahkan marginTop negatif */}
            <section id="shuttle" className="relative z-30 w-full" style={{ marginTop: "-2px" }}>
                <ShuttleInfo />
            </section>

            {/* Dropdown Section */}
            <HowToReachKbpa />

            {/* Get Ride Section */}
            <GetRideSection />
        </main>
    )
}