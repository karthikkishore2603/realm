"use client";

import Image from "next/image";

const brands = [
  { src: "/t4.png", alt: "Coventry Road Dental Care" },
  { src: "/t3.png", alt: "Capital Engineering Consultancy" },
  { src: "/t2.png", alt: "InstaPR" },
  { src: "/t1.png", alt: "The Greenhouse Barbecue" },
];

export default function TrustedBy() {
  return (
    <div className="py-6 mt-20">
      <div className="container mx-auto flex flex-col md:flex-row flex-wrap justify-center items-center gap-6 md:gap-8">
        <h2 className="text-4xl font-semibold text-gray-900 mb-4 md:mb-0">Trusted By</h2>
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
          {brands.map((brand, index) => (
            <div key={index} className="relative w-60 h-24">
              <Image
                src={brand.src}
                alt={brand.alt}
                layout="fill"
                objectFit="contain"
                className="transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
