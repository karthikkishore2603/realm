"use client"; // Add this directive at the top of the file

import Image from "next/image";
import { useRef } from "react";
import { useInView } from "framer-motion";

interface LogoItemProps {
  logo: string;
  name: string;
}

const LogoItem = ({ logo, name }: LogoItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div
      ref={ref}
      className="p-4 sm:p-6 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden"
      style={{
        transform: isInView ? "none" : "translateY(20px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <Image
        src={logo}
        width={150}
        height={80}
        alt={name}
        className="h-7 sm:h-10 w-auto transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-110"
      />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

const logos = [
  {
    id: 1,
    logo: "/t4.png",
    name: "Spotify",
  },
  {
    id: 2,
    logo: "/t3.png",
    name: "Paypal",
  },
  {
    id: 3,
    logo: "/t.png",
    name: "Microsoft",
  },
  {
    id: 4,
    logo: "/t1.png",
    name: "Google",
  },
  {
    id: 5,
    logo: "/t5.webp",
    name: "Amazon",
  },
  {
    id: 6,
    logo: "/t6.png",
    name: "Netflix",
  },
];

const LogoCloudSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white" id="trustedby">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 space-y-16">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex relative">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Trusted by
            </h1>
            {/* <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span> */}
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join Hundereds of satisfied customers who trust our solutions to
            power their business.
          </p>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-blue-100 to-purple-100 opacity-0 group-hover:opacity-100 blur transition-all duration-500"></div>
          <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
            {logos.map((logo) => (
              <LogoItem key={logo.id} {...logo} />
            ))}
          </div>
        </div>

        {/* <div className="flex justify-center">
          <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            See all our partners
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default LogoCloudSection;