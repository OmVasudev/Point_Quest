"use client";
import React from "react";
import Image from "next/image";

// Define the type for the logo objects
interface Logo {
  src: string;
  alt: string;
}

export default function Home() {
  const logos: Logo[] = [
    { src: "/img/ace.png", alt: "ACE Logo" },
    { src: "/img/acm.png", alt: "ACM Logo" },
    { src: "/img/astronomy.png", alt: "Astronomy Logo" },
    { src: "/img/cms.png", alt: "CMS Logo" },
    { src: "/img/csi.png", alt: "CSI Logo" },
    { src: "/img/ieee.png", alt: "IEEE Logo" },
    { src: "/img/iste.png", alt: "ISTE Logo" },
    { src: "/img/nss.png", alt: "NSS Logo" },
    { src: "/img/photography.png", alt: "Photography Logo" },
    { src: "/img/quiz.png", alt: "QUIZ Logo" },
    { src: "/img/rise.png", alt: "RISE Logo" },
    { src: "/img/rotaract.png", alt: "Rotaract Logo" },
    { src: "/img/uipath.png", alt: "UIPATH Logo" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Heading Section */}
      <div className="text-center px-4 py-16 mt-20 mb-36">
        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl bg-clip-text text-transparent bg-gradient-to-r from-[#0103FF] to-[#01E4FF]">
          Point Quest
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium mt-4 text-black">
          Engage, Track, Earn!
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mt-4 text-black">
          Stay updated on all club activities in one place. <br />
          Easily manage events and track updates on any device.
        </p>
      </div>

      {/* Logos Carousel Section */}
      <div
        className="slider w-full h-24 sm:h-28 md:h-32 lg:h-36 relative overflow-hidden"
        style={
          {
            "--width": "106px",
            "--quantity": logos.length.toString(),
          } as React.CSSProperties
        }
      >
        <div className="list flex">
          {logos.concat(logos).map((logo, index) => (
            <div
              key={index}
              className="item flex-shrink-0 w-24 sm:w-28 md:w-32 lg:w-36 h-24 sm:h-28 md:h-32 lg:h-36"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={96}
                height={96}
                className="rounded-full object-contain mx-auto border-2 border-black"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Additional Styling */}
      <style jsx>{`
        .slider {
          overflow: hidden;
          position: relative;
        }
        .slider .list {
          display: flex;
          gap: 10px;
          animation: scroll 10s linear infinite;
          min-width: calc(var(--width) * var(--quantity) * 2);
        }
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(var(--width) * -1 * var(--quantity)));
          }
        }
      `}</style>
    </div>
  );
}




// import React from "react";
// import Image from "next/image";
// import { Redressed, Reddit_Sans } from "next/font/google";

// // Define the type for the logo objects
// interface Logo {
//   src: string;
//   alt: string;
// }

// // Importing Google fonts with optimized Next.js font loading
// const redressed = Redressed({
//   subsets: ["latin"],
//   weight: ["400"], // Redressed is usually single-weight, so 400 is safe
// });

// // const redditSans = Reddit_Sans({
// //   subsets: ["latin"],
// //   weight: ["400", "500", "700"], // Define weights you need for different text elements
// // });

// export default function Home() {
//   // Array of logo objects with explicit types
//   const logos: Logo[] = [
//     { src: "/img/iste.png", alt: "ISTE Logo" },
//     { src: "/img/rise.png", alt: "Rise Logo" },
//     { src: "/img/rotaract.png", alt: "Rotaract Logo" },
//     { src: "/img/ieee.png", alt: "IEEE Logo" },
//     { src: "/img/rotaract.png", alt: "Rotaract Logo" }, // Duplicate for carousel
//     { src: "/img/iste.png", alt: "ISTE Logo" }, // Duplicate for carousel
//     { src: "/img/rotaract.png", alt: "Rotaract Logo" }, // Duplicate for carousel
//   ];

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen relative bg-white">
//       {/* Heading Section */}
//       <div className="text-center m-32 z-10 relative">
//         <h1
//           className={`text-9xl bg-clip-text text-transparent bg-gradient-to-r from-[#0103FF] to-[#01E4FF]`}
//         >
//           Point Quest
//         </h1>
//         <h2 className={` text-4xl font-medium mt-4 text-black`}>
//           Engage, Track, Earn!
//         </h2>
//         <p className={`$ p-6 text-3xl mt-2 text-black`}>
//           Stay updated on all club activities in one place. <br />
//           Easily manage events and track updates on any device.
//         </p>
//       </div>

//       {/* Logos Carousel Section */}
//       <div className="mt-40 overflow-hidden w-full z-10 relative">
//         <div className="flex animate-scroll space-x-40">
//           {/* Map over logos array */}
//           {logos.map((logo, index) => (
//             <div key={index} className="flex-shrink-0">
//               <Image
//                 src={logo.src}
//                 alt={logo.alt}
//                 width={100}
//                 height={100}
//                 className="rounded-full object-contain" // Keep the logos contained
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



