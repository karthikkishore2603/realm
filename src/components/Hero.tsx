'use client';

import Image from 'next/image';

export default function BrandingPage() {
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between min-h-screen bg-white px-6 pt-40 md:px-40 py-10">
      {/* Left Section - Text Content */}
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-4xl md:text-7xl font-bold text-gray-900 leading-tight">
          Become the <br/><span className="text-black font-extrabold">Top 1% </span> Brand
        </h1>
        <p className="text-2xl text-gray-600">
          We build your brand while you focus on your business.
        </p>
        <button className="mt-6 px-6 py-3 text-white bg-black rounded-full font-semibold shadow-md hover:bg-gray-800 transition">
          GET STARTED
        </button>
      </div>
      
      {/* Right Section - Images & Visual Elements */}
      <div className="relative md:w-1/2 mt-20 md:mt-0  flex items-center justify-center">
        {/* Background Line Design */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
          <Image src="/bg_line.png" alt="Background Line" width={400} height={400} style={{ maxWidth: '450px' }}/>
        </div>

        {/* Floating Image Cards */}
        <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
          <div className="absolute -top-10 left-5 w-32 h-32 md:w-40 md:h-40 rounded-xl shadow-lg" style={{ height: '170px' }}>
            <Image src="/p1.png" alt="Person 1" width={160} height={500} style={{ height: '172px' }} className="rounded-xl" />
          </div>
          <div className="absolute bottom-5 -left-10 w-32 h-32 md:w-40 md:h-40 rounded-xl shadow-lg">
            <Image src="/p2.png" alt="Person 2" width={160} height={160} style={{ height: '170px' }} className="rounded-xl" />
          </div>
          <div className="absolute -right-10 top-20 w-32 h-32 md:w-40 md:h-40 rounded-xl shadow-lg">
            <Image src="/p3.png" alt="Person 3" width={160} height={160} style={{ height: '170px' }} className="rounded-xl" />
          </div>
        </div>

        {/* Floating Lamp Effect */}
        <div className="absolute -top-16 right-0 opacity-80">
          <Image src="/lamp.png" alt="Lamp" width={70} height={120} />
        </div>
      </div>
    </div>
  );
}
