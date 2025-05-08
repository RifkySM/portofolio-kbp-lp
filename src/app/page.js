"use client"

import { useEffect } from "react"
import ImageSlider from "@/components/event/image-slider"
import WhyKBPa from "@/components/event/why-kbpa"
import ThingsToDo from "@/components/event/things-to-do"
import ThisMonthEvent from "@/components/event/this-month-event"
import Experience from "@/components/event/experience"

export default function KBPayukEvent() {
  // useEffect(() => {
  //   // Fungsi scroll kustom
  //   const smoothScrollTo = (element, duration = 2000) => {
  //     if (!element) return

  //     const startPosition = window.pageYOffset
  //     const targetPosition = element.getBoundingClientRect().top + window.pageYOffset
  //     const distance = targetPosition - startPosition
  //     let startTime = null

  //     const easeInOutQuad = (t) => {
  //       return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  //     }

  //     const animation = (currentTime) => {
  //       if (startTime === null) startTime = currentTime
  //       const timeElapsed = currentTime - startTime
  //       const progress = Math.min(timeElapsed / duration, 1)
  //       const ease = easeInOutQuad(progress)

  //       window.scrollTo(0, startPosition + distance * ease)

  //       if (timeElapsed < duration) {
  //         requestAnimationFrame(animation)
  //       }
  //     }

  //     requestAnimationFrame(animation)
  //   }

  //   const scrollToThisMonthEvent = () => {
  //     const thisMonthEventSection = document.getElementById("this-month-event")
  //     if (thisMonthEventSection) {
  //       setTimeout(() => {
  //         smoothScrollTo(thisMonthEventSection, 2000)
  //       }, 1000)
  //     }
  //   }

  //   scrollToThisMonthEvent()
  // }, [])

  return (
    <main className="min-h-screen bg-white">
      <ImageSlider />
      <WhyKBPa />
      <ThingsToDo />
      <ThisMonthEvent />
      <Experience />
    </main>
  )
}
