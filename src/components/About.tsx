"use client";

import { motion } from "framer-motion";
import { FaFingerprint, FaCommentDots, FaBullhorn } from "react-icons/fa";

const services = [
  {
    icon: <FaFingerprint className="text-blue-500 text-4xl" />,
    title: "Brand Identity",
    description: "Crafting a brand presence that feels uniquely yours.",
    bgColor: "bg-blue-100",
  },
  {
    icon: <FaCommentDots className="text-pink-500 text-4xl" />,
    title: "Brand Storytelling",
    description: "Turning your brand's journey into a compelling narrative.",
    bgColor: "bg-pink-100",
    lower: true, // Center card should be slightly down
  },
  {
    icon: <FaBullhorn className="text-yellow-500 text-4xl" />,
    title: "Brand Awareness",
    description: "Connecting you with the right audience, at the right time.",
    bgColor: "bg-yellow-100",
  },
];

export default function BrandCards() {
  return (
    <div className="flex flex-col md:flex-row mt-20 justify-center items-center gap-20 py-12  relative">
      {services.map((service, index) => (
        <motion.div
          key={index}
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className={`w-80 p-6 bg-white rounded-tl-4xl rounded-br-4xl border-3 shadow-xl flex flex-col  hover:shadow-2xl transition-all ${
            service.lower ? "md:mt-10 sm:mt-0" : "mt-0"
          }`}
        >
          <div
            className={`w-16 h-16 flex items-center justify-center rounded-full ${service.bgColor} mb-4`}
          >
            {service.icon}
          </div>
          <h3 className="text-gray-700 mt-3 text-2xl font-semibold">{service.title}</h3>
          <p className="text-gray-600 mb-12 text-lg mt-2">{service.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
