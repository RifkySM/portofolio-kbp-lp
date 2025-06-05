"use client"

import useAxios from "@/hooks/useAxios"
import { useState } from "react"

export default function Feedback() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    feedback: "",
  })

  const { data, loading, error, fetchData } = useAxios({
    method: "POST",
    url: "/feedback",
    immediate: false
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)

    // Kirim data
    await fetchData({ data: formData })

    // Jika sukses, reset form
    if (!error) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        feedback: "",
      })
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
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
          {/* Name */}
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

          {/* Email */}
          <div className="space-y-2">
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

          {/* Phone */}
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-blue-100/50 text-black rounded-3xl border border-black focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Feedback */}
          <div className="md:col-span-2 space-y-2">
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
              Suggestion <span className="text-red-500">*</span>
            </label>
            <textarea
              id="feedback"
              name="feedback"
              required
              value={formData.feedback}
              onChange={handleChange}
              rows={6}
              className="w-full px-3 py-2 bg-blue-100/50 text-black rounded-3xl border border-black focus:ring-2 focus:ring-blue-200 resize-none"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 border border-orange-400 text-black font-medium rounded-3xl hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>

      {error && <p className="text-red-500 mt-4">Error: Please Try Again Later</p>}
      {data && <p className="text-green-600 mt-4">Thank You! Feedback sent successfully!</p>}
    </div>
  )
}
