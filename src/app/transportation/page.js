"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"
import ShuttleInfo from "@/components/transportation/shuttle-info"
import MapHalte from "@/components/transportation/map-component"
import axiosClient from "@/lib/axiosClient"
import Link from "next/link"

const halteData = [
  {
    id: "bumi-hejo",
    name: "HALTE BUMI HEJO",
    lat: -6.8770427,
    lng: 107.4842087,
    bgColor: "#6e2e91",
    scheduleImage: "/transportation/halte-bumi-hejo.png",
    direction: "https://www.google.com/maps/dir/?api=1&destination=Kertajaya%2C%20Padalarang%2C%20West%20Bandung%20Regency%2C%20West%20Java%2C%20Indonesia",
    width: "486",
    height: "595"
  },
  {
    id: "sasakirana",
    name: "HALTE SASAKIRANA",
    lat: -6.8786009,
    lng: 107.4231839,
    bgColor: "#243e97",
    scheduleImage: "/transportation/halte-sasakirana.png",
    direction: "https://www.google.com/maps/dir/?api=1&destination=Bojonghaleuang%2C%20Batujajar%2C%20West%20Bandung%20Regency%2C%20West%20Java%2040561%2C%20Indonesia",
    width: "315",
    height: "546"
  },
  {
    id: "wahoo",
    name: "HALTE WAHOO",
    lat: -6.877619,
    lng: 107.4618959,
    bgColor: "#e9741c",
    scheduleImage: "/transportation/halte-wahoo.png",
    direction: "https://www.google.com/maps/dir/?api=1&destination=Kertajaya%2C%20Padalarang%2C%20West%20Bandung%20Regency%2C%20West%20Java%2C%20Indonesia",
    width: "600",
    height: "636"
  },
  {
    id: "pariwarna",
    name: "HALTE PARIWARNA",
    lat: -6.877619,
    lng: 107.4618959,
    bgColor: "#6e2e91",
    scheduleImage: "/transportation/halte-pariwarna.png",
    direction: "https://www.google.com/maps/dir/?api=1&destination=Kertajaya%2C%20Padalarang%2C%20West%20Bandung%20Regency%2C%20West%20Java%2C%20Indonesia",
    width: "600",
    height: "557"
  },
  {
    id: "al-irsyad",
    name: "HALTE AL-IRSYAD",
    lat: -6.8761979,
    lng: 107.4380832,
    bgColor: "#243e97",
    scheduleImage: "/transportation/halte-al-irsyad.png",
    direction: "https://www.google.com/maps/dir/?api=1&destination=Jl.%20Parahyangan%20Raya%2C%20Cipeundeuy%2C%20Kec.%20Padalarang%2C%20Kabupaten%20Bandung%20Barat%2C%20Jawa%20Barat%2040553%2C%20Indonesia",
    width: "600",
    height: "611"
  },
  {
    id: "wangsakerta",
    name: "HALTE WANGSAKERTA",
    lat: -6.877619,
    lng: 107.4485743,
    bgColor: "#e9741c",
    scheduleImage: "/transportation/halte-wangsakerta.png",
    direction: "https://www.google.com/maps/dir/?api=1&destination=Cipeundeuy%2C%20Padalarang%2C%20West%20Bandung%20Regency%2C%20West%20Java%2C%20Indonesia",
    width: "600",
    height: "680"
  },
  {
    id: "mason-pine-hotel",
    name: "HALTE MASON PINE HOTEL",
    lat: -6.877619,
    lng: 107.4564531,
    bgColor: "#6e2e91",
    scheduleImage: "/transportation/halte-mason-pine-hotel.png",
    direction: "https://www.google.com/maps/dir/?api=1&destination=Jl.%20Parahyangan%20Raya%20No.Km%201%2C%20RW.8%2C%20Cipeundeuy%2C%20Kec.%20Padalarang%2C%20Kabupaten%20Bandung%20Barat%2C%20Jawa%20Barat%2040553%2C%20Indonesia",
    width: "308",
    height: "534"
  },
  {
    id: "pitaloka",
    name: "HALTE PITALOKA",
    lat: -6.877619,
    lng: 107.4485743,
    bgColor: "#243e97",
    scheduleImage: "/transportation/halte-pitaloka.png",
    direction: "https://www.google.com/maps/dir/?api=1&destination=Cipeundeuy%2C%20Padalarang%2C%20West%20Bandung%20Regency%2C%20West%20Java%2C%20Indonesia",
    width: "600",
    height: "559"
  },
  {
    id: "ratnasasih",
    name: "HALTE RATNASASIH",
    lat: -6.877619,
    lng: 107.4507544,
    bgColor: "#e9741c",
    scheduleImage: "/transportation/halte-ratnasasih.png",
    direction: "https://www.google.com/maps/dir/?api=1&destination=4FJ9%2BCGP%2C%20Cipeundeuy%2C%20West%20Bandung%20Regency%2C%20West%20Java%2C%20Indonesia",
    width: "600",
    height: "613"
  },
  {
    id: "btd",
    name: "HALTE BTD",
    lat: -6.877619,
    lng: 107.4504027,
    bgColor: "#6e2e91",
    scheduleImage: "/transportation/halte-btd.png",
    direction: "https://www.google.com/maps/dir/?api=1&destination=4FG9%2BX6W%2C%20Cipeundeuy%2C%20West%20Bandung%20Regency%2C%20West%20Java%2C%20Indonesia",
    width: "600",
    height: "558"
  },
]


export default function TransportationPage() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get('shuttle-schedule/display')
        setData(response.data.data)
      } catch (error) {
        console.error('Error fetching halte data:', error)
      }
    }
    fetchData()
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
              style={{ '--bg-color': ['#6e2e91', '#243e97', '#e9741c'][Math.floor(Math.random() * 3)] }}
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
                      {Number(routine.interval) > 0 && (
                        <div className="text-sm italic">
                          *Departure interval every {routine.interval} minutes
                        </div>
                      )}
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
