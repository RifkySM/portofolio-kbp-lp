import Image from "next/image";
import Link from "next/link";

const { useState, useEffect } = require("react");

const PartnerLogoSection = () => {
    const [partnerLogo, setPartnerLogo] = useState([])

    useEffect(() => {
        fetch('/api/gallery/partner-logo')
            .then((res) => res.json())
            .then((data) => {
                const datas = data?.data || [];
                setPartnerLogo(datas);
            })
            .catch(console.error)
    }, [])

    const chunkArray = (array, size) => {
        const result = []
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size))
        }
        return result
    }

    const groupedLogos = chunkArray(partnerLogo, 3) // 3 logos per row

    return (
        <div className="flex flex-col justify-between items-center gap-x-0 gap-y-1 sm:gap-x-1 sm:gap-y-2 lg:gap-x-3 lg:gap-y-3 mb-6 lg:mb-0 mx-auto w-auto lg:w-auto">
            {groupedLogos.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-x-2">
                    {row.map((logo, i) => (
                        <div key={i} className="flex justify-center items-center">
                            <Link href={logo.title || '/#'}>
                                <div className="relative w-24 h-10 sm:w-20 sm:h-12 lg:w-24 lg:h-14">
                                    <Image
                                        src={logo.file}
                                        alt={logo.title || `Partner ${i + 1}`}
                                        layout="fill"
                                        objectFit="contain"
                                    />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default PartnerLogoSection