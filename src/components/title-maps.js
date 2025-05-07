"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"

export default function TitleMaps(){
    return(
        <div className="flex justify-center items-center py-8">
            <Image src="/transportation/transportation-logo.png" alt="Kopa yuk Logo" width={180} height={109} />
            <h1 className="text-6xl font-normal text-[#C7C7C7] ml-6">maps</h1>
        </div>
    )
}