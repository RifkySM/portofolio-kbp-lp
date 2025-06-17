"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import ShuttleInfo from "@/components/transportation/shuttle-info"
import MapHalte from "@/components/transportation/map-component"
import Link from "next/link"

export default function TransportationPage() {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch(`api/transportation/shuttle-schedule`)
      .then(res => res.json())
      .then(json => setData(json.data))
      .catch(error => console.error("Failed to fetch dara:", error))
  }, [])

  return (
    <main className="min-h-screen bg-white pb-[10vh]">
      {/* Logo and Title */}
      <div className="flex justify-center items-center py-8">
        <Image src="/transportation/transportation-logo.png" alt="Kopa yuk Logo" width={150} height={79} />
        <h1 className="text-4xl font-bold text-[#864898] ml-6">transportation</h1>
      </div>

      {/* Map */}
      <div className="mx-auto max-w-4xl px-6 mb-32 relative">
        <div className="h-[330px] bg-gray-100 rounded-lg shadow-md overflow-hidden relative">
          <MapHalte />
        </div>
      </div>

      {/* Shuttle Information */}
      <ShuttleInfo />

      {/* Halte Schedule */}
      <div className="mx-auto max-w-full">
        {data.map((data) => (
          <div key={data.shuttle_stop_id} id={data.shuttle_stop_id} className="mb-20">
            {/* Title */}
            <div
              className="w-full py-3 md:py-4 lg:py-6 mb-3 md:mb-6 lg:mb-8 text-center text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold"
              style={{ '--bg-color': data.shuttle_stop_color }}
            >
              <div
                style={{ backgroundColor: 'var(--bg-color)' }}
                className="p-4"
              >
                {data.shuttle_stop_name}
                <Link href={data.shuttle_maps_link}>
                  <span className="ml-2 px-3 py-1 bg-white text-black rounded-full text-sm border border-transparent transition-all duration-200 hover:bg-[var(--bg-color)] hover:text-white hover:border-white">
                    View More
                  </span>
                </Link>
              </div>
            </div>

            {data.transportation.map((transportation) => (
              <div key={transportation.transportation_id} className="flex flex-col items-center">
                <div className="relative w-[300px] h-[100px]"> {/* Adjust size */}
                  <Image
                    src={transportation.transportation_image}
                    alt={`Transportation schedule ${transportation.transportation_id}`}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="mt-4 text-center text-black text-lg sm:text-xl md:text-2xl font-bold">
                  {transportation.transportation_name}
                </div>
                <div className="flex flex-wrap justify-center gap-6 my-5">
                  {transportation.schedules_by_day_type.slice(0, 2).map((schedule, index) => {
                    const colors = ['#6e2e91', '#243e97', '#e9741c'];
                    const randomColor = colors[Math.floor(Math.random() * colors.length)];
                    const gradient = `linear-gradient(to bottom, ${randomColor}, ${randomColor})`;

                    return (
                      <div key={index} className="w-full sm:w-[300px]">
                        <div
                          className="rounded-xl p-4 text-white text-center shadow-lg"
                          style={{ background: gradient }}
                        >
                          <div className="text-xl font-bold mb-4">{schedule.day_type}</div>
                          <div className="flex flex-wrap justify-center">
                            {schedule.schedules.map((item, idx) => (
                              <div
                                key={idx}
                                className="w-[30%] flex flex-col items-center mb-5"
                              >
                                <div className="text-xl font-bold">{item.time.slice(0, 5)}</div>
                                <div className="text-sm">{item.day}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            ))}

            <div className="flex flex-wrap justify-center gap-6 my-5">
              {data.routine_schedule && data.routine_schedule.map((routine, index) => (
                <div key={index} className="flex flex-col items-center w-full sm:w-[300px]">
                  <div className="relative w-[300px] h-[100px]">
                    <Image
                      src={routine.transportation.image}
                      alt={`Transportation schedule ${routine.transportation.name}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="mt-4 text-center text-black text-lg sm:text-xl md:text-2xl font-bold">
                    {routine.transportation.name}
                  </div>
                  <div className="w-full mt-5">
                    <div
                      className="rounded-xl p-4 text-white text-center shadow-lg"
                      style={{ background: '#6e2e91' }}
                    >
                      <div className="text-2xl font-bold mb-4 mt-5">
                        {routine.time_start} - {routine.time_end}
                      </div>
                      <div className="text-sm italic">
                        {routine.note}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>


          </div>
        ))}
      </div>
    </main>
  )
}
