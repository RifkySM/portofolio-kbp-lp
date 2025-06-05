"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import axiosClient from "@/lib/axiosClient"

export default function WhyKBPa() {
  const [hoverLeft, setHoverLeft] = useState(false)
  const [hoverEasyAccess, setHoverEasyAccess] = useState(false)
  const [hoverHangout, setHoverHangout] = useState(false)
  const [hoverPleasant, setHoverPleasant] = useState(false)

  const [testimonies, setTestimonies] = useState([]);
  const [testimoniesImage, setTestimoniesImage] = useState([]);
  const [getToKnowUsUrl, setGetToKnowUsUrl] = useState(null);

  useEffect(() => {
    const fetchTestimonies = async () => {
      try {
        const response = await axiosClient.get("/testimony/display?type=why-us&limit=3");
        const configs = [
          {
            className: 'absolute -top-8 right-10 bg-[#D89F33] p-6 rounded-[25px] w-[280px] z-10',
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.3 },
          },
          {
            className: 'absolute top-1/2 mt-20 -left-5 bg-[#88A740] p-6 rounded-[25px] w-[280px] z-10',
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.3, delay: 0.1 },
          },
          {
            className: 'absolute bottom-10 -right-5 bg-[#D35F39] p-6 rounded-[25px] w-[280px] z-10',
            initial: { opacity: 0, y: -20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.3, delay: 0.2 },
          },
        ]
        setTestimonies(response.data.data.map((testimony, index) => ({
          name: testimony.name,
          testimony: testimony.testimony,
          config: configs[index],
        })));
      } catch (error) {
        console.error("Error fetching testimonies:", error);
      }
    };
    const fetchTestimonyImages = async () => {
      try {
        const response = (await axiosClient.get("/gallery/feature/why-us?limit=6"))?.data?.data;

        const groupedByTitle = response.reduce((acc, item) => {
          (acc[item.title] = acc[item.title] || []).push(item);
          return acc;
        }, {});

        const result = Object.values(groupedByTitle).map(items => ({
          title: items[0].title,
          description: items[0].description,
          images: items.map(i => i.file),
        }));

        setTestimoniesImage(result);
      } catch (error) {
        console.error("Error fetching testimonies:", error);
      }
    };

    const fetchGetToKnowUs = async () => {
      try {
        const response = await axiosClient.get("/parameter/key/get-to-know-us");
        setGetToKnowUsUrl(response.data.data.content);
      } catch (error) {
        console.error("Error fetching get-to-know-us:", error);
      }
    };
    fetchGetToKnowUs();
    fetchTestimonyImages();
    fetchTestimonies();
  }, []);

  return (
    <section className="pt-28 pb-14">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Panel (Blue) */}
          <motion.div
            className="bg-blue-600 rounded-3xl p-8 flex flex-col justify-center col-span-12 md:col-span-4 h-[840px] relative overflow-visible"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            whileHover={{ x: -5 }}
            onHoverStart={() => setHoverLeft(true)}
            onHoverEnd={() => setHoverLeft(false)}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 10,
              mass: 1.5,
            }}
            viewport={{ once: true }}
          >
            <div className="text-white mb-24">
              <h2 className="text-7xl md:text-8xl font-bold">Why?</h2>
              <h3 className="text-6xl md:text-7xl font-bold mt-4">KBPa</h3>
            </div>

            {/* Yellow Panel */}
            {hoverLeft && testimonies.map((item, index) => (
              <motion.div
                key={index}
                className={item.config.className}
                initial={item.config.initial}
                animate={item.config.animate}
                transition={item.config.transition}
              >
                <p className="text-white text-sm">&quot;{item.testimony}&quot;</p>
                <p className="text-white text-sm font-semibold mt-2">- {item.name}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Side Content */}
          <div className="col-span-12 md:col-span-8 gap-6">
            <div className="grid grid-cols-12 gap-6 mb-4">
              {/* Panel 1 */}
              {testimoniesImage[0] && (
                <motion.div
                  className="relative rounded-3xl overflow-hidden col-span-5 h-[425px]"
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ x: -5 }}
                  onHoverStart={() => setHoverEasyAccess(true)}
                  onHoverEnd={() => setHoverEasyAccess(false)}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                    style={{
                      backgroundImage: `url(${hoverEasyAccess
                        ? testimoniesImage[0].images[1]
                        : testimoniesImage[0].images[0]
                        })`,
                    }}
                  ></div>

                  {!hoverEasyAccess ? (
                    <div className="absolute top-5 left-5">
                      <h3 className="text-white text-3xl md:text-4xl font-bold">
                        {testimoniesImage[0].title}
                      </h3>
                    </div>
                  ) : (
                    <div className="absolute bottom-8 left-5 right-5">
                      <p className="text-white text-justify text-xs font-semibold">
                        {testimoniesImage[0].description}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Panel 2 */}
              {testimoniesImage[1] && (
                <motion.div
                  className="relative rounded-3xl overflow-hidden col-span-7 h-[425px]"
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ x: -5 }}
                  onHoverStart={() => setHoverHangout(true)}
                  onHoverEnd={() => setHoverHangout(false)}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                    style={{
                      backgroundImage: `url(${hoverHangout
                        ? testimoniesImage[1].images[1]
                        : testimoniesImage[1].images[0]
                        })`,
                    }}
                  ></div>

                  {!hoverHangout ? (
                    <div className="absolute bottom-5 left-5">
                      <h3 className="text-white text-3xl md:text-4xl font-bold">
                        {testimoniesImage[1].title}
                      </h3>
                    </div>
                  ) : (
                    <div className="absolute bottom-8 left-5 right-5">
                      <p className="text-white text-justify text-xs font-semibold">
                        {testimoniesImage[1].description}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Panel 3 */}
            {testimoniesImage[2] && (
              <motion.div
                className="relative rounded-3xl overflow-hidden h-[395px]"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                onHoverStart={() => setHoverPleasant(true)}
                onHoverEnd={() => setHoverPleasant(false)}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                  style={{
                    backgroundImage: `url(${hoverPleasant
                      ? testimoniesImage[2].images[1]
                      : testimoniesImage[2].images[0]
                      })`,
                  }}
                ></div>

                {!hoverPleasant ? (
                  <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                    <h3 className="text-white text-3xl md:text-4xl font-bold">
                      {testimoniesImage[2].title}
                    </h3>
                  </div>
                ) : (
                  <div className="absolute bottom-8 left-5 right-5">
                    <p className="text-white text-xs font-semibold">
                      {testimoniesImage[2].description}
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </div>

        </div>
      </div>

      <div className="flex ml-4 pt-20 justify-center items-center gap-10">
        <motion.div
          className="relative flex items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Orange circle behind "Get" */}
          <div className="absolute w-10 h-10 bg-orange-500 rounded-full -left-7 top-1/3 -translate-y-1/2" />

          <h2 className="text-2xl md:text-3xl text-black z-10">
            <span className="font-bold mr-1">Get</span>
            <span className="italic font-normal">to Know Us</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <Link href={getToKnowUsUrl || '#'}>
            <button className="border-2 border-orange-500 text-black font-bold px-5 py-1.5 rounded-full hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-colors">
              Learn More
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
