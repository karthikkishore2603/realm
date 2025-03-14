"use client";
import Link from "next/link";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          
          {/* Contact Us Section */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p className="mt-2 text-gray-400">empower@rookhq.com</p>
            <p className="text-gray-400">For Partnerships, please fill up our enquiry form.</p>
            <div className="flex justify-center gap-4 mt-4">
              <Link href="#">
                <FaInstagram className="text-white text-2xl hover:text-gray-400 transition" />
              </Link>
              <Link href="#">
                <FaFacebookF className="text-white text-2xl hover:text-gray-400 transition" />
              </Link>
              <Link href="#">
                <FaLinkedinIn className="text-white text-2xl hover:text-gray-400 transition" />
              </Link>
            </div>
          </div>

          {/* Solutions Section */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold">Solutions</h3>
            <ul className="mt-2 space-y-1 text-gray-400">
              <li>Social Media Management</li>
              <li>Search Engine Marketing</li>
              <li>Website Development</li>
              <li>Marketing Automation</li>
              <li>
                <Link href="#" className="font-semibold text-white underline">
                  Find us on maps
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="mt-2 space-y-1 text-gray-400">
              <li>News and Events</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600 mt-6"></div>

        {/* Copyright Text */}
        <p className="text-center text-gray-400 text-sm mt-4">
          <strong>© All rights reserved by Realm by Rook 2024 - 2025</strong>
        </p>
      </div>
    </footer>
  );
}
