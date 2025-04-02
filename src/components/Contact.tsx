"use client";
import { useState } from "react";
import Image from "next/image";
import { supabase } from "../utils/supabaseClient";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    remarks: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.from("Realm_Contact").insert([formData]);
    console.log("Data submitted:", data); // Log the data to the console
    if (error) {
      setMessage("Failed to send message.");
      console.error(error);
    } else {
      setMessage("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", website: "", remarks: "" });
    }

    setLoading(false);
  };

  return (
    <section className="flex flex-col lg:flex-row items-center justify-between py-12 px-6 md:px-20" id="contact">
      {/* Left Content */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <div className="relative flex items-center justify-center md:justify-start">
          <div className="absolute -top-16 left-[-20px] -z-10">
            <Image src="/c1.png" width={400} height={60} alt="Paper Plane" />
          </div>
          <div className="ml-3 mr-3 mt-15 md:ml-70">
            <h2 className="text-4xl font-semibold text-gray-900">
              Want to <span className="text-black">WOW</span> Your <br /> Customers
            </h2>
            <p className="text-gray-500 mt-15 text-lg">
              Text us for fast support to this number.
            </p>
            <p className="text-3xl text-gray-900 mt-3">70927 00022</p>
          </div>
        </div>
      </div>

      {/* Right Content - Contact Form */}
      <div className="w-full md:w-1/2 bg-transparent">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name*"
              required
              className="w-full border-b-2 border-gray-400 outline-none p-2 text-black bg-transparent focus:border-gray-800"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email*"
              required
              className="w-full border-b-2 border-gray-400 outline-none p-2 text-black bg-transparent focus:border-gray-800"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full border-b-2 border-gray-400 outline-none p-2 text-black bg-transparent focus:border-gray-800"
            />
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="Website*"
              required
              className="w-full border-b-2 border-gray-400 outline-none p-2 text-black bg-transparent focus:border-gray-800"
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              placeholder="Remarks"
              className="w-full border-b-2 border-gray-400 outline-none p-2 text-black bg-transparent focus:border-gray-800"
            />
          </div>
          <button
            type="submit"
            className="mt-4 border border-gray-800 text-gray-800 font-medium py-2 px-6 rounded-full hover:bg-gray-800 hover:text-white transition"
            disabled={loading}
          >
            {loading ? "Sending..." : "SEND MESSAGE"}
          </button>
        </form>
        {message && <p className="mt-3 text-gray-700">{message}</p>}
      </div>
    </section>
  );
}
