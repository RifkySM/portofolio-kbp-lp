"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axiosClient";

export default function GetRideSection() {
    const [getRideLink, setGetRideLink] = useState({})

    useEffect(() => {
        const fetchGetRideLink = async () => {
            try {
                const response = await axiosClient.get("/parameter/key/get-ride-link")
                setGetRideLink(response?.data?.data)
            } catch (error) {
                console.error("Error fetching get ride link:", error)
                setGetRideLink(null)
            }
        }
        fetchGetRideLink()
    }, [])

    // Animation Get ride
    const textVariants = {
        hidden: {
            opacity: 0,
            y: 50
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };
    // Animation view more
    const buttonVariants = {
        hidden: {
            opacity: 0,
            y: 30
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
                delay: 0.2
            }
        }
    };
    // Animation for bus image
    const busImageVariants = {
        hidden: {
            opacity: 0,
            y: -100 // Start position from above
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                delay: 0.4 // Delayed after text animation
            }
        }
    };

    return (
        <section className="bg-[#f9f7f2] py-12 px-4">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
                {/* Header text with orange circle */}
                <motion.div
                    className="text-center mb-1 relative"
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                >
                    <div className="flex items-center justify-center">
                        <div className="bg-[#f7941d] rounded-full w-16 h-16 flex items-center justify-center">
                            <h2 className="text-3xl font-bold text-black">Get</h2>
                        </div>
                        <h2 className="text-3xl font-normal italic ml-2 text-black">ride!</h2>
                    </div>
                    <p className="text-lg mt-1 text-black font-bold">with</p>
                </motion.div>

                {/* Logo and transportation text */}
                <div className="flex flex-col md:flex-row justify-center items-center w-[80%] gap-4 md:gap-6">
                    <Image src="/transportation/transportation-logo.png" alt="Kopa yuk Logo" width={150} height={79} />
                    <h1 className="text-[#8e4c9e] text-5xl font-bold">transportation</h1>
                </div>

                {/* Vehicles */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 mb-1">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={busImageVariants}
                    >
                        <Image
                            src="/bus.png"
                            alt="Bus KBPA"
                            width={700}
                            height={629}
                        />
                    </motion.div>
                </div>

                {/* View more button */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={buttonVariants}
                >
                    <Link href={getRideLink?.content || ''} className="bg-[#8abb2a] text-white px-8 py-1 rounded-full hover:bg-[#7aa625] transition-colors">
                        view more
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}