"use client"

import { useState } from "react"
import Link from "next/link"
import dayjs from "dayjs"
import "dayjs/locale/id"

export default function NewsCard({ news }) {
    const [isHovered, setIsHovered] = useState(false)
    const [isCommentHovered, setIsCommentHovered] = useState(false)

    return (
        <div
            className="relative h-[292px] overflow-hidden"
            style={{
                backgroundImage: `url(${news.thumbnail})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div
                className="absolute inset-0 py-8 px-6 flex flex-col justify-between"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.41)" }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Date and Read Time */}
                <div className="text-white text-[11px]">
                    <span>{dayjs(news.created_at).locale("id").format("dddd, D MMMM YYYY")}</span>
                </div>

                {/* Card Title */}
                <div className="mt-auto">
                    <Link href={`/news/${news.seo_url}`} className="block">
                        <h2
                            className={`text-xl sm:text-sm font-bold transition-colors ${isHovered ? "text-[#e86c32]" : "text-white"
                                }`}
                        >
                            {news.title}
                        </h2>
                        <div className="border-t-2 border-white my-3"></div>
                    </Link>

                    {/* Comments and Likes */}
                    <div className="flex justify-between items-center mt-4">
                        <div
                            className="flex items-center space-x-2"
                            onMouseEnter={() => setIsCommentHovered(true)}
                            onMouseLeave={() => setIsCommentHovered(false)}
                        >
                            {/* Comments */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={`transition-colors duration-300 ${isCommentHovered ? "text-[#e86c32]" : "text-white"
                                    }`}
                            >
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                            <span className="text-white text-sm">{news.comment_count}</span>
                        </div>

                        {/* Likes */}
                        <Link href="#" className="flex items-center space-x-2 group">
                            <span className="text-white text-sm">{news.total_likes}</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-red-500 transition-colors duration-300"
                            >
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
