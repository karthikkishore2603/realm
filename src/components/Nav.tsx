"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed z-50 w-full transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-2" : "bg-white py-4"}`}>
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="z-50">
          <div className="relative w-32 h-10 md:w-40 md:h-12 transition-all duration-300 hover:opacity-90">
            <Image 
              src="/lg.png" 
              alt="Company Logo" 
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/services">Our Services</NavLink>
          <NavLink href="/Insights">Insights</NavLink>
          <NavLink href="/impactstudies">Impact Studies</NavLink>
          <div className="ml-4">
            <ContactButton />
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden z-50">
  <button 
    onClick={() => setMenuOpen(!menuOpen)} 
    className="p-2 focus:outline-none transition-all duration-300 text-black"
    aria-label="Toggle menu"
  >
    {menuOpen ? (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ) : (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    )}
  </button>
</div>

        {/* Mobile Navigation */}
        <div className={`md:hidden fixed inset-0 bg-white z-40 transition-all duration-300 ease-in-out transform ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex flex-col items-center justify-center h-full space-y-8 px-4">
            <MobileNavLink href="/" onClick={() => setMenuOpen(false)}>Home</MobileNavLink>
            <MobileNavLink href="/services" onClick={() => setMenuOpen(false)}>Our Services</MobileNavLink>
            <MobileNavLink href="/insights" onClick={() => setMenuOpen(false)}>Insights</MobileNavLink>
            <MobileNavLink href="/impact-studies" onClick={() => setMenuOpen(false)}>Impact Studies</MobileNavLink>
            <div className="mt-8 w-full max-w-xs">
              <ContactButton fullWidth />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// Reusable NavLink component
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} passHref>
      <div className="px-4 py-2 text-gray-700 hover:text-black transition-colors duration-300 font-medium text-sm uppercase tracking-wider relative group">
        {children}
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-3/4"></span>
      </div>
    </Link>
  );
}

// Reusable MobileNavLink component
function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link href={href} passHref>
      <div 
        onClick={onClick}
        className="text-2xl font-light text-gray-800 hover:text-black transition-colors duration-300 py-2"
      >
        {children}
      </div>
    </Link>
  );
}

// Reusable ContactButton component
function ContactButton({ fullWidth = false }) {
  return (
    <button 
      className={`bg-gradient-to-r from-black to-gray-800 text-white px-6 py-3 rounded-full font-medium text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:scale-105 transform ${fullWidth ? "w-full" : ""}`}
    >
      Contact Us
    </button>
  );
}