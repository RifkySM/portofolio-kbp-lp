"use client"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function ShuttleInfo() {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch('/api/maps/free-shuttle-car?limit=5')
      .then(response => response.json())
      .then(data => setData(data.data))
      .catch(error => console.error("Error fetching data:", error));
  }, [])
  return (
    <div className="mx-auto max-w-7xl px-4 mb-20">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col lg:flex-row ml-0 md:ml-0 lg:ml-[100px] mb-20">
          {/* Left Side */}
          <div className="w-full lg:w-2/5 relative flex justify-center lg:block">
            {/* Shuttle Bus Image */}
            <div className="absolute top-[70px] md:top-[-110px] right-[-300px] left-0 md:right-[-50px] md:left-auto z-20 flex justify-center md:block">
              <Image
                src="/transportation/shuttle-bus.png"
                alt="Wahoo Shuttle"
                width={240}
                height={240}
                className="object-contain
                w-[240px] h-[240px]
                md:w-[340px] md:h-[340px]"
              />
            </div>

            {/* Orange Section - Hidden on mobile */}
            <div
              className="hidden md:block bg-[#cb6140] h-[339px] w-[384px] relative z-10 px-10 pt-24"
              style={{
                borderRadius: "30px",
                marginBottom: "-50px", // This makes it overlap the blue section
              }}
            >
              <div className="text-right text-white pr-24 pt-4">
                <p className="text-8xl font-bold">FREE</p>
                <p className="text-5xl font-bold">SHUTTLE</p>
                <p className="text-5xl font-bold">CAR</p>
              </div>

              <div className="absolute right-8 top-1/2 transform -translate-y-1/2 mt-20 right-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  data-bbox="19.5 47.5 161 105.001"
                  viewBox="19.5 47.5 161 105.001"
                  height={58}
                  width={88}
                  data-type="shape"
                  role="presentation"
                  aria-hidden="true"
                  aria-label=""
                  style={{ transform: 'rotate(90deg)', fill: 'white' }}
                >
                  <g>
                    <path d="M100 52.558c5.054 0 10.111 1.912 13.944 5.735l55.772 55.611c7.668 7.646 7.668 20.158 0 27.804-3.833 3.823-8.887 5.735-13.944 5.735-5.054 0-10.108-1.912-13.941-5.735L100 100l-41.829 41.707c-3.835 3.823-8.889 5.735-13.944 5.735s-10.111-1.912-13.944-5.735c-7.668-7.646-7.668-20.158 0-27.804l55.772-55.61v-.001c3.834-3.823 8.891-5.734 13.945-5.734m0-5.058c-6.619 0-12.831 2.558-17.487 7.202l-55.772 55.611c-4.668 4.656-7.241 10.868-7.241 17.493 0 6.625 2.573 12.838 7.241 17.493 4.656 4.644 10.868 7.202 17.487 7.202s12.831-2.558 17.487-7.202L100 107.124l38.288 38.175c4.656 4.644 10.868 7.202 17.484 7.202 6.619 0 12.831-2.558 17.487-7.202 4.668-4.655 7.241-10.868 7.241-17.493s-2.573-12.838-7.241-17.493l-55.772-55.611C112.831 50.058 106.619 47.5 100 47.5z" />
                  </g>
                </svg>
              </div>
            </div>
            {/* Blue Section */}
            <div
              className="bg-[#1d67cd] h-[180px] md:h-[283px] w-[280px] md:w-[384px] flex flex-col items-center justify-center text-white pt-8 mt-40 md:mt-0"
              style={{
                borderRadius: "30px", // Rounded on all sides for mobile
                borderBottomLeftRadius: "30px",
                borderBottomRightRadius: "30px",
              }}
            >
              <h3 className="text-xl md:text-3xl font-bold mb-1 md:mb-2 text-center px-4">{item.point_a}</h3>
              <div className="flex items-center justify-center">
                <span style={{ transform: 'rotate(90deg)' }} className="text-2xl md:text-4xl">⇄</span>
              </div>
              <h3 className="text-xl md:text-3xl font-bold mt-1 md:mt-2 text-center px-4">{item.point_b}</h3>
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full lg:w-3/5 flex justify-center lg:justify-start mt-10 lg:mt-0">
            <Image
              src={item.image}
              alt="Shuttle Schedule"
              width={688}
              height={697}
              className="object-contain w-full lg:w-auto"
            />
          </div>
        </div>
      ))}
    </div>
  )
}