"use client";

import { FaBullhorn, FaSearch, FaChartLine, FaChartBar, FaDatabase, FaCommentDots } from "react-icons/fa";

const services = [
  {
    icon: <FaCommentDots className="text-black text-3xl" />,
    title: "Social Media Management",
    description: "Expand your reach and drive engagement with tailored content strategies.",
  },
  {
    icon: <FaChartBar className="text-black text-3xl" />,
    title: "Website Development",
    description: "Create high-performing, visually stunning websites that convert visitors into customers.",
  },
  {
    icon: <FaBullhorn className="text-black text-3xl" />,
    title: "Marketing Automation",
    description: "Save time and increase efficiency with automated marketing workflows.",
  },
  {
    icon: <FaDatabase className="text-black text-3xl" />,
    title: "Analytics & Data Driven Marketing",
    description: "Leverage analytics and insights to optimize your marketing strategies.",
  },
  {
    icon: <FaSearch className="text-black text-3xl" />,
    title: "Search Engine Optimization",
    description: "Boost your search rankings and attract organic traffic with proven SEO tactics.",
  },
  {
    icon: <FaChartLine className="text-black text-3xl" />,
    title: "Search Engine Marketing",
    description: "Maximize visibility and generate quality leads through targeted ad campaigns.",
  },
];

export default function ServicesSection() {
  return (
    <div className="mt-20 py-12 px-4">
      <div className="container mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">
          Personalized Solutions for Your Unique Needs
        </h2>

        {/* Service Flexbox */}
        <div className="flex flex-wrap justify-center gap-6 items-center">
          {services.map((service, index) => (
            <div
              key={index}
              className="w-full md:w-[30%] lg:w-[30%] p-6 flex flex-col  border border-gray-300 shadow-sm rounded-[40px] rounded-tl-none rounded-br-none hover:shadow-md transition"
            >
              {/* Center the icon */}
              <div className="flex mb-4">{service.icon}</div>
              <h3 className="text-lg font-bold text-gray-900">{service.title}</h3>
              <p className="text-gray-500 text-sm mt-2">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
