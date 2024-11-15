import React from "react";
import Image from "next/image";
import { Redressed, Reddit_Sans } from "next/font/google";

// Define the type for the logo objects
interface Logo {
  src: string;
  alt: string;
}

// Importing Google fonts with optimized Next.js font loading
const redressed = Redressed({
  subsets: ["latin"],
  weight: ["400"], // Redressed is usually single-weight, so 400 is safe
});

// const redditSans = Reddit_Sans({
//   subsets: ["latin"],
//   weight: ["400", "500", "700"], // Define weights you need for different text elements
// });

export default function Home() {
  // Array of logo objects with explicit types
  const logos: Logo[] = [
    { src: "/img/iste.png", alt: "ISTE Logo" },
    { src: "/img/rise.png", alt: "Rise Logo" },
    { src: "/img/rotaract.png", alt: "Rotaract Logo" },
    { src: "/img/ieee.png", alt: "IEEE Logo" },
    { src: "/img/rotaract.png", alt: "Rotaract Logo" }, // Duplicate for carousel
    { src: "/img/iste.png", alt: "ISTE Logo" }, // Duplicate for carousel
    { src: "/img/rotaract.png", alt: "Rotaract Logo" }, // Duplicate for carousel
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative bg-white">
      {/* Heading Section */}
      <div className="text-center m-32 z-10 relative">
        <h1
          className={`text-9xl bg-clip-text text-transparent bg-gradient-to-r from-[#0103FF] to-[#01E4FF]`}
        >
          Point Quest
        </h1>
        <h2 className={` text-4xl font-medium mt-4 text-black`}>
          Engage, Track, Earn!
        </h2>
        <p className={`$ p-6 text-3xl mt-2 text-black`}>
          Stay updated on all club activities in one place. <br />
          Easily manage events and track updates on any device.
        </p>
      </div>

      {/* Logos Carousel Section */}
      <div className="mt-40 overflow-hidden w-full z-10 relative">
        <div className="flex animate-scroll space-x-40">
          {/* Map over logos array */}
          {logos.map((logo, index) => (
            <div key={index} className="flex-shrink-0">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={100}
                height={100}
                className="rounded-full object-contain" // Keep the logos contained
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
