'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import PartnerLogoSection from './partner-logo';

export default function footer() {
    const [footerLogo, setFooterLogo] = useState("")
    useEffect(() => {
        fetch('/api/parameter/footer_logo')
            .then(response => response.json())
            .then(data => setFooterLogo(data))
            .catch(error => console.error("Error fetching paralax-image:", error));

    }, [])
    return (
        <footer className="h-auto bg-[rgb(24,80,126)] text-white py-5 px-4 md:px-12">
            <div className="container mx-auto text-center">
                {/* Main footer content */}
                <div className="flex flex-col lg:flex-row justify-between items-center">
                    {/* Left side - Main logo */}
                    <div className="mb-6 lg:mb-0 pl-4 lg:pl-11 mx-auto lg:mx-0">
                        <Link href="/">
                            <div className="relative w-60 h-32 lg:w-80 lg:h-44">
                                {footerLogo && (
                                    <Image
                                        src={footerLogo}
                                        alt="Kota Baru Parahyangan Logo"
                                        layout="fill"
                                        objectFit="contain"
                                    />
                                )}
                            </div>
                        </Link>
                    </div>

                    <PartnerLogoSection />

                    {/* Right side - Contact information */}
                    <div className="text-xs font-bold pt-10 lg:pt-0 px-4 text-center lg:text-left flex flex-col items-center lg:items-start w-full lg:w-auto mx-auto">
                        <p className="font-bold">Discover KBPayuk</p>
                        <p className="mb-1">What&apos;s On</p>
                        <p className="mb-1">KBPa Maps</p>
                        <p className="mb-1">KBPa Transportation</p>

                        <div className="border-t border-gray-300 mb-3 w-2/5 mx-auto lg:mx-0"></div>

                        <p className="font-bold">Marketing Gallery</p>
                        <p className="mb-1">Bumi Indropasta - Home & Living Center</p>
                        <p className="mb-1">Jl. Panyawangan Kav. 5-B No.8</p>
                        <p className="mb-4">Kota Baru Parahyangan, Padalarang, Bandung Barat 40553</p>

                        <p className="mb-1">P. +62 22 680 3888</p>
                        <p className="mb-1">W. +62 811-1000-5008</p>
                        <p className="mb-1">E. marketing@kotabaruparahyangan.com</p>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-300 my-6 w-3/4 mx-auto"></div>

                {/* Copyright text */}
                <div className="text-center">
                    <p className="text-xs font-bold">© 2025 by Kota Baru Parahyangan. All right reserved.</p>
                </div>
            </div>

            {/* Scroll to top button */}
            <div className="fixed bottom-6 right-6">
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="bg-gray-600 rounded-full p-3 opacity-75 hover:opacity-100 transition-opacity"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                </button>
            </div>
        </footer>
    )
}