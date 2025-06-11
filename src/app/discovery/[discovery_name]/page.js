"use client"

import { useMediaQuery } from "@/hooks/mobile"
import axiosClient from "@/lib/axiosClient"
import { AnimatePresence, motion } from "framer-motion"
import { useParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function Page() {
    const params = useParams()
    const discovery_name = params.discovery_name
    const [discovery, setDiscovery] = useState([])
    const isMobile = useMediaQuery("(max-width: 428px)")
    const [mounted, setMounted] = useState(false)
    const [hoveredCard, setHoveredCard] = useState(null)
    const [hoveredIndex, setHoveredIndex] = useState(null)
    const [selectedAttraction, setSelectedAttraction] = useState(null)
    const [attractionsCategories, setAttractionsCategories] = useState([])
    const [categories, setCategories] = useState([])
    const itemsSectionRef = useRef(null)
    const [placeToDiscover, setPlaceToDiscover] = useState([])

    useEffect(() => {
        setMounted(true)
    }, [])

    // Move fetchPlacesToDiscover outside useEffect to make it accessible globally
    const fetchPlacesToDiscover = async (category_id) => {
        if (!category_id) return []

        try {
            const response = await axiosClient.get(`place-to-discover/display?category_id=${category_id}`)
            const data = response.data.data

            return data.map(item => ({
                id: item.id,
                image: item.image,
                title: item.name,
                logo: item.logo,
                bgColor: `#${Math.floor(Math.random() * 14777215).toString(16)}`,
                schedule: item.operation_hours,
                link: item.link,
                is_favorite: item.is_favorite,
                is_main_facility: item.is_main_facility,
            }))
        } catch (error) {
            console.error("Error fetching places to discover:", error)
            return []
        }
    }


    useEffect(() => {
        const fetchDiscovery = async () => {
            try {
                const response = await axiosClient.get(`/discovery/title/${discovery_name}`)
                const data = response.data.data

                setDiscovery(data)

                const categoriesWithItems = await Promise.all(
                    data.categories.map(async (category) => {
                        const items = category.id
                            ? await fetchPlacesToDiscover(category.id)
                            : []

                        return {
                            id: category.id,
                            title: category.name,
                            image: category.image,
                            items,
                        }
                    })
                )

                // Set ke dua state sekaligus
                setCategories(categoriesWithItems)
                setAttractionsCategories(categoriesWithItems)

            } catch (error) {
                console.error("Error fetching discovery:", error)
            }
        }

        if (discovery_name) {
            fetchDiscovery()
        }

        // Cleanup
        return () => {
            setDiscovery([])
            setPlaceToDiscover([])
            setCategories([])
            setAttractionsCategories([])
        }
    }, [discovery_name])



    if (!mounted) return null

    // Function to chunk array into pairs (2 items per row)
    const chunkArray = (array, size) => {
        const result = []
        // return result
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size))
        }
        return result
    }

    const handleAttractionClick = (index) => {
        setSelectedAttraction(index)
        setTimeout(async () => {
            if (itemsSectionRef.current) {
                const category = attractionsCategories
                await fetchPlacesToDiscover(category.id)
                console.log(category[index].items)
                itemsSectionRef.current.scrollIntoView({ behavior: "smooth" })
            }
        }, 100)
    }


    return (
        <main className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-3">
                <div className="flex flex-col items-center justify-center mb-6 sm:mb-8">
                    {/* Logo */}
                    <svg
                        preserveAspectRatio="xMidYMid meet"
                        data-bbox="30 39.999 140 120.001"
                        viewBox="30 39.999 140 120.001"
                        width={isMobile ? "70" : "90"}
                        height={isMobile ? "70" : "90"}
                        xmlns="http://www.w3.org/2000/svg"
                        className="mb-4"
                    >
                        <defs>
                            <style>{`#comp-m54si35a svg [data-color="1"] {fill: #8CB04A;}`}</style>
                        </defs>
                        <g>
                            <path
                                d="M98.683 155.927a2.886 2.886 0 0 1-2.057-.859L83.26 141.599a2.947 2.947 0 0 1 0-4.147 7.081 7.081 0 0 0 2.062-5.018 7.078 7.078 0 0 0-2.062-5.018c-2.661-2.681-7.298-2.681-9.959 0-1.091 1.1-3.024 1.1-4.115 0l-13.367-13.472a2.947 2.947 0 0 1 0-4.147l68.407-68.938a2.892 2.892 0 0 1 4.115 0l13.365 13.469a2.947 2.947 0 0 1 0 4.147c-2.745 2.767-2.745 7.272 0 10.038a7.01 7.01 0 0 0 9.961 0 2.892 2.892 0 0 1 4.115 0l13.365 13.469c.546.55.853 1.295.853 2.074 0 .779-.307 1.524-.853 2.074l-68.407 68.938a2.887 2.887 0 0 1-2.057.859zm-9.482-16.636l9.482 9.557 64.292-64.791-9.486-9.56c-4.962 3.113-11.583 2.506-15.897-1.836a12.932 12.932 0 0 1-3.768-9.168c0-2.46.676-4.82 1.944-6.856l-9.483-9.557-64.292 64.791 9.483 9.557a12.713 12.713 0 0 1 6.805-1.956c3.436 0 6.666 1.349 9.095 3.798a12.919 12.919 0 0 1 3.767 9.165 12.961 12.961 0 0 1-1.942 6.856z"
                                fill="#8CB04A"
                                data-color="1"
                            />
                            <path
                                d="M111.163 127.062a2.91 2.91 0 0 1-2.427-1.315l-6.018-9.156-11.707.112c-1.124.135-2.177-.647-2.66-1.684a2.95 2.95 0 0 1 .411-3.142l7.218-8.612-4.172-10.989a2.949 2.949 0 0 1 .661-3.122 2.877 2.877 0 0 1 3.098-.664l10.904 4.204 8.545-7.277a2.905 2.905 0 0 1 3.117-.415 2.937 2.937 0 0 1 1.671 2.684l-.111 11.797 9.088 6.063a2.939 2.939 0 0 1 1.276 2.844 2.925 2.925 0 0 1-1.989 2.394l-10.694 3.471-3.441 10.774a2.916 2.916 0 0 1-2.77 2.033zm-6.892-16.351c.975 0 1.887.493 2.427 1.315l3.549 5.399 2.043-6.401a2.92 2.92 0 0 1 1.878-1.893l6.354-2.062-5.36-3.574a2.94 2.94 0 0 1-1.304-2.474l.065-6.997-5.01 4.267a2.88 2.88 0 0 1-2.919.498l-6.424-2.474 2.458 6.473a2.95 2.95 0 0 1-.496 2.941l-4.233 5.049 6.941-.066.031-.001z"
                                fill="#8CB04A"
                                data-color="1"
                            />
                            <path
                                d="M148.752 104.531l-7.755-7.816 4.115-4.147 7.755 7.816-4.115 4.147zm-11.638-11.728l-7.755-7.816 4.115-4.147 7.755 7.816-4.115 4.147zM125.48 81.078l-7.755-7.816 4.115-4.147 7.755 7.816-4.115 4.147zM113.843 69.35l-7.755-7.816 4.115-4.147 7.755 7.816-4.115 4.147z"
                                fill="#8CB04A"
                                data-color="1"
                            />
                            <path
                                d="M73.716 160a2.886 2.886 0 0 1-2.057-.859l-13.365-13.469a2.947 2.947 0 0 1 0-4.147c2.745-2.767 2.745-7.272 0-10.038a7.012 7.012 0 0 0-9.959 0 2.892 2.892 0 0 1-4.115 0l-13.367-13.469a2.942 2.942 0 0 1-.853-2.074c0-.779.307-1.524.853-2.074l62.772-63.262c.56-.564 1.357-.853 2.117-.859a2.905 2.905 0 0 1 2.08.945l4.276 4.674-4.28 3.975-2.221-2.429-58.572 59.029 9.486 9.56a12.808 12.808 0 0 1 15.897 1.836c4.307 4.342 4.914 11.021 1.823 16.021l9.485 9.56 6.698-6.75 4.115 4.147-8.756 8.824a2.887 2.887 0 0 1-2.057.859z"
                                fill="#8CB04A"
                                data-color="1"
                            />
                        </g>
                    </svg>

                    {/* Title and Tagline */}
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-1">{discovery.title}</h1>
                    <p className="text-lg sm:text-xl text-gray-800 sm:block hidden">Get fun at KBPayuk!</p>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-2">
                    {categories.map((category, index) => (
                        <div
                            key={category.id}
                            className="relative flex items-center justify-center"
                            style={{
                                width: isMobile ? "180px" : "252px",
                                height: isMobile ? "300px" : "400px",
                            }}
                        >
                            <motion.div
                                className="relative cursor-pointer"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onClick={() => handleAttractionClick(index)}
                            >
                                <motion.div
                                    className="relative overflow-hidden"
                                    style={{
                                        borderTopLeftRadius: "9999px",
                                        borderTopRightRadius: "9999px",
                                        borderBottomLeftRadius: "0",
                                        borderBottomRightRadius: "0",
                                    }}
                                    animate={{
                                        width: hoveredIndex === index ? (isMobile ? "196px" : "216px") : isMobile ? "226px" : "246px",
                                        height: hoveredIndex === index ? (isMobile ? "235px" : "305px") : isMobile ? "275px" : "345px",
                                    }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                >
                                    <Image
                                        src={category.image || "/placeholder.svg"}
                                        alt={category.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute bottom-4 left-0 right-0 text-center">
                                        <AnimatePresence mode="wait">
                                            {hoveredIndex === index ? (
                                                <motion.h2
                                                    key={`small-${category.id}`}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="text-white text-xl sm:text-2xl font-semibold text-shadow-md"
                                                >
                                                    {category.title}
                                                </motion.h2>
                                            ) : (
                                                <motion.h2
                                                    key={`large-${category.id}`}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0 }}
                                                    className="text-white text-2xl sm:text-3xl font-semibold text-shadow-md"
                                                >
                                                    {category.title}
                                                </motion.h2>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    ))}
                </div>

                {/* Selected Attraction Items */}
                <div ref={itemsSectionRef} className="pt-16 mb-20">
                    <AnimatePresence>
                        {selectedAttraction !== null && attractionsCategories[selectedAttraction] && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8 }}
                                className="w-full"
                            >
                                {chunkArray(attractionsCategories[selectedAttraction].items, 2).map((row, rowIndex) => (
                                    <div key={`row-${rowIndex}`} className="flex flex-wrap justify-center gap-20 mb-12">
                                        {row.map((item, index) => {
                                            const itemIndex = rowIndex * 2 + index
                                            const isEven = itemIndex % 2 === 0

                                            return (
                                                <motion.div
                                                    key={item.id}
                                                    className="relative overflow-hidden rounded-3xl shadow-lg"
                                                    style={{ width: isMobile ? "300px" : "450px", height: isMobile ? "240px" : "340px" }}
                                                    initial={{
                                                        opacity: 0,
                                                        rotate: isEven ? 20 : -20,
                                                        scale: 0.9,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        rotate: 0,
                                                        scale: 1,
                                                    }}
                                                    transition={{
                                                        duration: 0.8,
                                                        delay: 0.1 + (itemIndex * 0.3),
                                                        type: "spring",
                                                        stiffness: 70,
                                                        damping: 15,
                                                    }}
                                                    onMouseEnter={() => setHoveredCard(itemIndex)}
                                                    onMouseLeave={() => setHoveredCard(null)}
                                                >
                                                    {/* Top part with image */}
                                                    <div className="relative h-3/5 w-full">
                                                        <Image
                                                            src={item.image || "/placeholder.svg"}
                                                            alt={item.title}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                        <div className="absolute top-6 left-4">
                                                            <AnimatePresence mode="wait">
                                                                {hoveredCard === itemIndex ? (
                                                                    <motion.p
                                                                        key={`schedule-${item.id}`}
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        exit={{ opacity: 0 }}
                                                                        transition={{ duration: 0.2 }}
                                                                        className="text-white text-md sm:text-xl font-semibold text-shadow-md"
                                                                    >
                                                                        {item.schedule}
                                                                    </motion.p>
                                                                ) : (
                                                                    <motion.p
                                                                        key={`title-${item.id}`}
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        exit={{ opacity: 0 }}
                                                                        transition={{ duration: 0.2 }}
                                                                        className="text-white text-md sm:text-xl font-semibold text-shadow-md"
                                                                    >
                                                                        {item.title}
                                                                    </motion.p>
                                                                )}
                                                            </AnimatePresence>
                                                        </div>
                                                    </div>

                                                    {/* Bottom part with logo and description */}
                                                    <div className="h-2/5 w-full flex" style={{ backgroundColor: item.bgColor }}>
                                                        {/* Left side */}
                                                        {item.logo && item.logo !== '' && (
                                                            <div className="flex items-center justify-center w-1/3 sm:w-2/3">
                                                                <div className="w-full sm:w-40 ml-2 sm:ml-0 h-full relative">
                                                                    <Image
                                                                        src={item.logo}
                                                                        alt={`${item.title} logo`}
                                                                        fill
                                                                        className="object-contain"
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Right side */}
                                                        <div className={`${item.logo && item.logo !== '' ? 'w-2/3' : 'w-full'} flex flex-col justify-center p-4 h-full`}>
                                                            {/* Description text */}
                                                            <p className="text-white text-center font-semibold text-sm sm:text-xl mb-2">
                                                                {item.title}
                                                            </p>

                                                            <div className="flex justify-center">
                                                                <Link href={item.link || "#"} className="
                                                                        bg-white px-6 py-1.5 rounded-full text-[8px] sm:text-xs 
                                                                        text-gray-800 hover:bg-transparent hover:text-white 
                                                                        hover:backdrop-brightness-90 border border-transparent hover:border-white 
                                                                        transition-all duration-300
                                                                        text-center
                                                                    ">
                                                                    view more
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </motion.div>
                                            )
                                        })}
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </main>
    )
}
