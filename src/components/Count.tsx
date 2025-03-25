"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

interface CounterProps {
  end: number;
  prefix?: string;
  suffix?: string;
  isVisible: boolean;
}

const Counter = ({ end, prefix = "", suffix = "", isVisible }: CounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 2000; // Animation duration in ms
    const interval = 30; // Update interval in ms
    const step = (end / duration) * interval;

    const counter = setInterval(() => {
      start += step;
      if (start >= end) {
        clearInterval(counter);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, interval);

    return () => clearInterval(counter);
  }, [isVisible, end]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 1 }}
      className="text-7xl font-semibold text-gray-900"
    >
      {prefix}
      {count}
      {suffix}
    </motion.span>
  );
};

export default function StatsSection() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          controls.start({ opacity: 1, y: 0 });
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [controls]);

  return (
    <motion.div
      ref={ref}
      
      
    >
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-50 py-10">
      {/* Conversion Rate Increased */}
      <div className="text-center">
        <Counter end={150} prefix="+" suffix="%" isVisible={isVisible} />
        <p className="text-gray-600 text-xl">Conversion Rate Increased</p>
      </div>

      {/* Increased Return of Investment */}
      <div className="text-center">
        <Counter end={87} prefix="+" suffix="K" isVisible={isVisible} />
        <p className="text-gray-600 text-xl">Increased Return of Investment</p>
      </div>

      {/* Successful Campaigns */}
      <div className="text-center">
        <Counter end={50} suffix="+" isVisible={isVisible} />
        <p className="text-gray-600 text-xl">Successful Campaigns</p>
      </div></div>
    </motion.div>
  );
}
