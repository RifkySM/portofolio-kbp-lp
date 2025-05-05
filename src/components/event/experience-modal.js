"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function TestimonialModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <motion.div
      className="fixed inset-0 backdrop-blur-2xl bg-white/70 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white overflow-hidden max-w-2xl w-full p-4 relative"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        {/* Close button */}
        <button className="absolute top-4 right-4 text-gray-800 z-20" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Modal content */}
        <div className="relative">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <Image src="/event/experience/modal-bg.png" alt="KBP Aerial View" fill className="object-cover" />
          </div>

          <div className="relative z-10 p-6 pt-10 pb-16">
            <div className="text-center mb-8">
              <h2 className="text-5xl text-black font-bold mb-1">Share your story!</h2>
              <p className="text-black text-xl font-semibold tracking-wide">post your testimonial discovering KBP.</p>
            </div>

            <form className="space-y-4 max-w-md mx-auto">
              {/* Name input */}
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full px-4 py-3 border-2 border-black bg-white text-black text-sm font-semibold rounded-full focus:outline-none"
              />

              {/* KBP itu textarea */}
              <textarea
                name="testimonial"
                placeholder="KBP itu"
                className="w-full px-4 py-3 border-2 border-black bg-white text-black text-sm font-semibold rounded-xl focus:outline-none"
                rows={1}
              ></textarea>

              {/* Email input */}
              <input
                type="email"
                name="email"
                placeholder="e-mail"
                className="w-full px-4 py-3 border-2 border-black bg-white text-black text-sm font-semibold rounded-full focus:outline-none"
              />

              {/* Phone input */}
              <input
                type="tel"
                name="phone"
                placeholder="No Handphone"
                className="w-full px-4 py-3 border-2 border-black bg-white text-black text-sm font-semibold rounded-full focus:outline-none"
              />

              {/* Upload photo button */}
              <div className="flex justify-center mt-4">
                <label className="flex items-center gap-2 bg-white rounded-full px-8 py-2 cursor-pointer hover:bg-gray-50">
                  <span className="text-black text-sm font-bold">+</span>
                  <span className="text-black text-sm font-semibold">Upload your profile photo</span>
                  <input type="file" accept="image/*" className="hidden" />
                </label>
              </div>

              {/* Submit button */}
              <div className="flex justify-center mt-6">
                <button
                  type="button"
                  className="bg-[#cb6140] hover:bg-white border border-[#cb6140] hover:border-gray-800 text-white hover:text-gray-800 text-md font-semibold tracking-widest py-2 px-10 rounded-full transition-colors duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
