"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    name: "Finequs",
    text: "Realm delivered a sleek and high-performing website that perfectly aligned with our fintech needs. Their expertise in UX/UI made all the difference!",
    image: "/te1.png",
  },
  {
    name: "Coventry Road Dental Care",
    text: "Thanks to Realm, our dental practice now has a modern, user-friendly website that makes booking appointments effortless for our patients!.",
    image: "/te1.png",
  },
  {
    name: "The Green House Barbecue",
    text: "Realm created a stunning website that truly captures the essence of our barbecue restaurant. The online menu and ordering system work flawlessly!",
    image: "/te1.png",
  },
  {
    name: "V5 Digital",
    text: "Partnering with Realm was a game-changer! Their web development skills brought our digital marketing agency's site to life with speed and style.",
    image: "/te1.png",
  },
  {
    name: "ZGuard",
    text: "Security is our priority, and Realm built us a robust, professional website that reflects our brand’s reliability and trustworthiness.",
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
      <p className="text-gray-500 mt-2 max-w-lg md:max-w-3xl mx-auto text-sm md:text-base">
      Real stories from our satisfied customers—see what they have to say!
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
