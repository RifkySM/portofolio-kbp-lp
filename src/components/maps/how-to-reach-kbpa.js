import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import axiosClient from "@/lib/axiosClient";

export default function HowToReachKbpa() {
    const [data, setData] = useState([]);
    const [openIndex, setOpenIndex] = useState(null); // control which route is open

    useEffect(() => {
        fetch('/api/maps/how-to-reach-kbpa')
            .then(response => response.json())
            .then(data => setData(data.data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    const bounceVariants = {
        initial: { opacity: 1, scale: 0 },
        animate: {
            opacity: 1,
            scale: [0.3, 1.1, 0.9, 1.05, 0.95, 1],
            transition: {
                duration: 1.2,
                times: [0, 0.4, 0.6, 0.8, 0.9, 1],
                ease: "easeOut",
            },
        },
    };

    return (
        <div className="max-w-[950px] mx-auto">
            {data.map((route, index) => (
                <div
                    key={route.id}
                    className="relative mb-10"
                    onMouseEnter={() => setOpenIndex(index)}
                    onMouseLeave={() => setOpenIndex(null)}
                >
                    {/* Header - Bouncing Div */}
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

                    {/* Dropdown Options */}
                    <div
                        className={`absolute left-1/2 -translate-x-1/2 w-[90%] transition-all duration-300 overflow-hidden z-10 rounded-3xl ${openIndex === index
                            ? "max-h-[1000px] opacity-100 mt-[-20px] pt-[20px]"
                            : "max-h-0 opacity-0"
                            }`}
                    >
                        {route.options.map((option, optIndex) => {
                            const bgColor = optIndex % 2 === 0 ? "bg-[#E0A43C]" : "bg-[#D16B47]";
                            return (
                                <div
                                    key={option.id}
                                    className={`${bgColor} text-white py-4 px-8 flex justify-between items-center cursor-pointer hover:brightness-105 transition-all rounded-xl`}
                                >
                                    <div className="text-xl font-bold">{option.route_option}</div>
                                    <div className="text-right">{option.route_hint}</div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Image Section */}
                    <div className="w-full flex justify-center mt-6">
                        <div className="w-full max-w-5xl px-4">
                            <Image
                                src={route.image}
                                alt={`Rute Map for ${route.name}`}
                                width={1200}
                                height={800}
                                className="w-full h-auto rounded-xl"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
