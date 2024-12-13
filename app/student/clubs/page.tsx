import React from "react";
import ClubCard from "../../_components/ClubCard";

import { getClubs } from "@/app/_lib/data-service";
// import { getClub } from "@/app/_lib/data-service";

// const clubsData = [
//   {
//     name: "Point Quest",
//     tagline: "Centralized Platform for College Club Activities",
//     logo: { logo }, // You can replace with your image path
//   },
//   {
//     name: "Tech Innovators",
//     tagline: "Bringing Tomorrow's Tech Today, We Innovate",
//     logo: { logo }, // You can replace with your image path
//   },
//   {
//     name: "Creative Minds",
//     tagline: "Design, Create, Inspire, Let's Change the World!",
//     logo: { logo }, // You can replace with your image path
//   },
// ];

export default async function Page() {
  const clubs = await getClubs();
  // console.log("om v");
  console.log(clubs);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative bg-white">
      <h1 className="text-5xl text-black font-primary font-semibold py-4 m-6">
        Clubs
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-9">
        {clubs.map((club, index) => (
          <ClubCard key={index} club={club} />
        ))}
      </div>
    </div>
  );
}
