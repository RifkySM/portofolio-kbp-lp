import ImageSlider from "@/components/event/image-slider"
import WhyKBPa from "@/components/event/why-kbpa"
import ThingsToDo from "@/components/event/things-to-do"
import ThisMonthEvent from "@/components/event/this-month-event"
import Experience from "@/components/event/experience"

export default function KBPayukEvent() {
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
