'use client'; // ← ini WAJIB kalau kamu pakai Framer Motion di Next.js App Router

import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-blue-500">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center p-8 bg-white rounded-2xl shadow-2xl"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to My Next.js App 🚀
        </h1>
        <p className="text-lg text-gray-600">
          Built with Tailwind CSS and Framer Motion
        </p>
      </motion.div>
    </div>
  )
}