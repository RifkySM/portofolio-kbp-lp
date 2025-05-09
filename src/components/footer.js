'use client';

import { motion } from "framer-motion";
import Image from 'next/image';
import Link from 'next/link';

export default function footer() {
    return(
        <footer className="h-auto bg-[rgb(24,80,126)] text-white py-2 px-4 md:px-12">
            <div className="container mx-auto text-center">
                {/* Main footer content */}
                <div className="flex flex-col lg:flex-row justify-between items-center">
                    {/* Left side - Main logo */}
                    <div className="mb-6 lg:mb-0 pl-4 lg:pl-11 mx-auto lg:mx-0">
                        <Link href="/">
                            <div className="relative w-60 h-32 lg:w-80 lg:h-44">
                                <Image
                                    src="/logo_footer/kotbar_parahyangan.png"
                                    alt="Kota Baru Parahyangan Logo"
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Center - Partner logos */}
                    <div className="grid grid-cols-3 gap-x-0 gap-y-1 sm:gap-x-1 sm:gap-y-2 lg:gap-x-3 lg:gap-y-3 mb-6 lg:mb-0 mx-auto w-auto lg:w-auto">
                        {/* First row of logos */}
                        <div className="flex justify-center items-center">
                            <Link href="/mason-pine">
                                <div className="relative w-24 h-10 sm:w-32 sm:h-12 lg:w-40 lg:h-16">
                                    <Image src="/logo_footer/masonpine_hotel.png" alt="Mason Pine Hotel" layout="fill" objectFit="contain" />
                                </div>
                            </Link>
                        </div>
                        
                        <div className="flex justify-center items-center">
                            {/* Kolom kosong untuk menjaga grid 3x4 */}
                        </div>
                        
                        <div className="flex justify-center items-center">
                            <Link href="/parahyangan-golf">
                                <div className="relative w-28 h-12 sm:w-36 sm:h-16 lg:w-44 lg:h-20 pl-2 lg:pl-4">
                                    <Image src="/logo_footer/golf_parahyangan.png" alt="Parahyangan Golf" layout="fill" objectFit="contain" />
                                </div>
                            </Link>
                        </div>
                        
                        {/* Second row of logos */}
                        <div className="flex justify-center items-center">
                            <Link href="/wahoo">
                                <div className="relative w-16 h-10 sm:w-20 sm:h-12 lg:w-24 lg:h-14">
                                    <Image src="/logo_footer/wahoo.png" alt="Wahoo" layout="fill" objectFit="contain" />
                                </div>
                            </Link>
                        </div>
                        
                        <div className="flex justify-center items-center">
                            <Link href="/bumi-hejo">
                                <div className="relative w-14 h-8 sm:w-16 sm:h-10 lg:w-20 lg:h-12">
                                    <Image src="/logo_footer/bumihejo.png" alt="Bumi Hejo" layout="fill" objectFit="contain" />
                                </div>
                            </Link>
                        </div>

                        <div className="flex justify-center items-center">
                            <Link href="/bumi-pancasona">
                                <div className="relative w-24 h-16 sm:w-32 sm:h-20 lg:w-40 lg:h-24">
                                    <Image src="/logo_footer/pancasona.png" alt="Bumi Pancasona" layout="fill" objectFit="contain" />
                                </div>
                            </Link>
                        </div>
                        
                        {/* Third row of logos */}
                        <div className="flex justify-center items-center">
                            <Link href="/pasir-parahyangan">
                                <div className="relative w-14 h-8 sm:w-16 sm:h-10 lg:w-20 lg:h-11">
                                    <Image src="/logo_footer/pasar.png" alt="Pasir Parahyangan" layout="fill" objectFit="contain" />
                                </div>
                            </Link>
                        </div>
                        
                        <div className="flex justify-center items-center">
                            <Link href="/bumi-skatepark">
                                <div className="relative w-16 h-8 sm:w-20 sm:h-10 lg:w-24 lg:h-12">
                                    <Image src="/logo_footer/skatepark.png" alt="Bumi Skatepark" layout="fill" objectFit="contain" />
                                </div>
                            </Link>
                        </div>

                        <div className="flex justify-center items-center">
                            <Link href="/bumi-playpark">
                                <div className="relative w-16 h-8 sm:w-20 sm:h-10 lg:w-24 lg:h-12">
                                    <Image src="/logo_footer/playpark.png" alt="Bumi Playpark" layout="fill" objectFit="contain" />
                                </div>
                            </Link>
                        </div>
                        
                        {/* Fourth row of logos */}
                        <div className="flex justify-center items-center">
                            <Link href="/baleseni">
                                <div className="relative w-20 h-10 sm:w-24 sm:h-12 lg:w-32 lg:h-16">
                                    <Image src="/logo_footer/baleseni.png" alt="Baleseni" layout="fill" objectFit="contain" />
                                </div>
                            </Link>
                        </div>
                        
                        <div className="flex justify-center items-center">
                            <Link href="/the_biggest">
                                <div className="relative w-20 h-10 sm:w-24 sm:h-12 lg:w-32 lg:h-16">
                                    <Image src="/logo_footer/biggest.png" alt="The Biggest" layout="fill" objectFit="contain" />
                                </div>
                            </Link>
                        </div>
                        
                        <div className="flex justify-center items-center">
                            <Link href="/bale-pare">
                                <div className="relative w-20 h-10 sm:w-24 sm:h-12 lg:w-32 lg:h-16">
                                    <Image src="/logo_footer/balepare.png" alt="Bale Pare" layout="fill" objectFit="contain" />
                                </div>
                            </Link>
                        </div>
                    </div>

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