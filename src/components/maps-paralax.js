"use client"
import { useRef, useEffect, useState } from "react"
import Image from "next/image"

export default function ParallaxSection() {
    const [offset, setOffset] = useState(0)
    const [hasMounted, setHasMounted] = useState(false)
    const parallaxRef = useRef(null)
    
    useEffect(() => {
        setHasMounted(true)
    }, [])
    
    useEffect(() => {
        const handleScroll = () => {
            if (!parallaxRef.current) return
            
            const rect = parallaxRef.current.getBoundingClientRect()
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const distanceFromCenter = rect.top - window.innerHeight / 2
                setOffset(distanceFromCenter / 1)
            }
        }
        
        window.addEventListener("scroll", handleScroll)
        handleScroll()
        
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])
    
    if (!hasMounted) return null

    return (
        <section 
            ref={parallaxRef} 
            className="relative w-full h-[600px] overflow-hidden flex items-center justify-center"
            style={{ margin: 0, padding: 0 }}
        >
            <div
                className="absolute w-full h-[1000px] top-0 left-0 will-change-transform"
                style={{
                    transform: `translateY(${offset}px)`,
                    transition: "transform 0.1s ease-out",
                }}
            >
                <Image
                    src="/paralax-maps.png"
                    alt="Parallax Maps"
                    fill
                    priority
                    className="object-cover pointer-events-none"
                />
            </div>
            
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
                <div className="w-full md:w-1/2"></div>
                
                <div className="w-full md:w-1/2 text-right p-6 rounded-lg">
                    <h2 className="text-5xl md:text-7xl font-bold text-white">
                        <span className="text-blue-500">30</span> MENIT
                    </h2>
                    <p className="text-2xl md:text-4xl font-semibold text-white mt-2">dari JAKARTA ke KBPa</p>
                    <p className="text-xl md:text-2xl font-medium text-white mt-1 italic">via Kereta Cepat</p>
                </div>
            </div>
        </section>
    )
}