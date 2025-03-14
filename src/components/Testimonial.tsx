"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    name: "CEO of 1",
    text: "Company was very helpful, helping me to connect with potential prospects and expand my reach significantly.",
    image: "/te1.png",
  },
  {
    name: "CEO of 2",
    text: "Great experience! This platform helped me find the right people and expand my reach significantly.",
    image: "/te1.png",
  },
  {
    name: "CEO of 3",
    text: "Very useful service! It helped us scale our business and reach new markets.",
    image: "/te1.png",
  },
  {
    name: "CEO of 4",
    text: "An amazing solution! We streamlined our operations and grew faster than ever before.",
    image: "/te1.png",
  },
  {
    name: "CEO of 5",
    text: "The best service for expanding your network and growing your business!",
    image: "/te1.png",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 text-center">
      <h2 className="text-3xl md:text-4xl text-black font-bold">
        Hear Their Experience
      </h2>
      <p className="text-gray-500 mt-2 max-w-lg md:max-w-2xl mx-auto text-sm md:text-base">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>

      <div className="relative flex justify-center items-center mt-10 h-72 md:h-96 overflow-hidden">
        <AnimatePresence>
          {testimonials.map((testimonial, i) => {
            if (
              i !== index && // Not Center
              i !== (index + 1) % testimonials.length && // Not Right
              i !== (index - 1 + testimonials.length) % testimonials.length // Not Left
            ) {
              return null; // Hide other testimonials
            }

            let position =
              "scale-105 md:scale-110 translate-x-0 opacity-100 z-20 max-w-sm sm:max-w-md md:max-w-lg"; // Center card
            if (i === (index + 1) % testimonials.length) {
              position =
                "translate-x-[120%] scale-90 opacity-60 max-w-sm md:max-w-md"; // Right
            } else if (i === (index - 1 + testimonials.length) % testimonials.length) {
              position = "-translate-x-[120%] scale-90 opacity-60 max-w-sm sm:max-w-md"; // Left
            }

            return (
              <motion.div
                key={i}
                className={`absolute w-64 sm:w-72 md:w-96 p-6 md:p-8 bg-white rounded-xl shadow-lg transition-all duration-700 ease-in-out ${position}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 h-16 sm:h-20 border-4 border-white rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
                <p className="mt-10 sm:mt-12 text-black text-sm sm:text-base">
                  {testimonial.text}
                </p>
                <p className="mt-4 font-bold text-blue-600 text-lg sm:text-xl">
                  {testimonial.name}
                </p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
