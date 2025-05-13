"use client"

import { useEffect } from "react"
import ImageSlider from "@/components/event/image-slider"
import WhyKBPa from "@/components/event/why-kbpa"
import ThingsToDo from "@/components/home/things-to-do"
import Experience from "@/components/event/experience"
import ParallaxSection from "@/components/events-paralax"
import GetRideSection from "@/components/get-ride"
import TitleMaps from "@/components/title-maps"
import dynamic from "next/dynamic"
import Feedback from "@/components/feedback"
import AllVideo from "@/components/all-video"
import YouTubeVideo from "@/components/youtube-video"

export default function KBPayukEvent() {
  const videoId = "n2EHqFSqFPA"
  const playlistId = "PLPJVmS5Z-UUkS7AeK4bQVmdCSRJYwqRP0"

  const MapWithNoSSR = dynamic(() => import("@/components/big-maps"), {
    ssr: false,
    loading: () => (
      <div className="h-[900px] w-full bg-gray-200 flex items-center justify-center">
        <p>Loading Map...</p>
      </div>
    ),
  })

  useEffect(() => {
    // Fungsi scroll kustom
    const smoothScrollTo = (element, duration = 2000) => {
      if (!element) return

      const startPosition = window.pageYOffset
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset
      const distance = targetPosition - startPosition
      let startTime = null

      const easeInOutQuad = (t) => {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      }

      const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / duration, 1)
        const ease = easeInOutQuad(progress)

        window.scrollTo(0, startPosition + distance * ease)

        if (timeElapsed < duration) {
          requestAnimationFrame(animation)
        }
      }

      requestAnimationFrame(animation)
    }

    const scrollToThisMonthEvent = () => {
      const thisMonthEventSection = document.getElementById("things-to-do")
      if (thisMonthEventSection) {
        setTimeout(() => {
          smoothScrollTo(thisMonthEventSection, 2000)
        }, 1000)
      }
    }

    scrollToThisMonthEvent()
  }, [])

  return (
    <main className="min-h-screen bg-white">
      <ImageSlider />
      <WhyKBPa />
      <ThingsToDo />
      <Experience />
      {/* Paralax Section */}
      <GetRideSection />
      <ParallaxSection />
      <TitleMaps />
      <section id="maps" className="w-full" style={{ margin: 0, padding: 0 }}>
        <MapWithNoSSR />
      </section>
      <section id="maps" className="w-full" style={{ marginTop: 40, padding: 0 }}>
        <Feedback />
      </section>
      <section id="maps" className="w-full" style={{ marginTop: 40, padding: 0 }}>
        <AllVideo />
      </section>
      <section id="maps" className="w-full" style={{ marginTop: 40, padding: 0 }}>
        <YouTubeVideo videoId={videoId} playlistId={playlistId} />
      </section>
    </main>
  )
}
