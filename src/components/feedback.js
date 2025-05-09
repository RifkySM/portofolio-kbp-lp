"use client"

import { useState, useRef, useEffect } from "react"

export default function Feedback(){
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        suggestion: "",
      })
    
      const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }))
      }
    
      const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Form submitted:", formData)
        // Here you would typically send the data to your backend
      }
    
      return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-black text-left mb-2">
                    Send us your feedback!
                </h1>
                <p className="text-left text-black">
                    Got any suggestion for us? Type it below.
                </p>
            </div>

    
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-blue-100/50 text-black rounded-3xl border border-black focus:ring-2 focus:ring-blue-200"
                />
              </div>
    
              <div className="md:row-start-2 space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-blue-100/50 text-black rounded-3xl border border-black focus:ring-2 focus:ring-blue-200"
                />
              </div>
    
              <div className="md:row-start-3 space-y-2">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  required
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-blue-100/50 text-black rounded-3xl border border-black focus:ring-2 focus:ring-blue-200"
                />
              </div>
    
              <div className="md:row-span-3 space-y-2">
                <label htmlFor="suggestion" className="block text-sm font-medium text-gray-700">
                  Suggestion <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="suggestion"
                  name="suggestion"
                  required
                  value={formData.suggestion}
                  onChange={handleChange}
                  rows={8}
                  className="w-full px-3 py-2 bg-blue-100/50 text-black rounded-3xl border border-black focus:ring-2 focus:ring-blue-200 resize-none"
                />
              </div>
            </div>
    
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 px-4 border border-orange-400 text-black font-medium rounded-3xl hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )
}