"use client";
import { useState } from "react";
import Image from "next/image";
export default function Footer() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    
    <div className="fixed z-50 bg-white w-full  py-0 text-black">
      <div className="container mx-auto mt-1 mb-1 flex flex-wrap items-center justify-between px-6">
        
        {/* Logo */}
        <div className="text-2xl font-bold md:pl-20">
          <Image src="/lg.png" alt="Logo" width={150} height={40} />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-lg">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Our Services</a>
          <a href="#" className="hover:underline">Insights</a>
          <a href="#" className="bg-black text-white px-6 py-2 rounded-full font-semibold">
            Contact Us
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-16 6h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden mt-4 text-center p-4 flex flex-col space-y-2">
          <a href="#" className="py-2  text-2xl text-black hover:text-gray-400">Home</a>
          <a href="#" className="py-2  text-2xl text-black hover:text-gray-400">Our Services</a>
          <a href="#" className="py-2  text-2xl text-black hover:text-gray-400">Insights</a>
          <a href="#" className="mt-4  text-2xl px-6 py-2 bg-black text-white rounded-full">Contact Us</a>
        </div>
      )}
    </div>
  );
}
