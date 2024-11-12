"use client";
import React from "react";
import ClubCard from "../../_components/ClubCard";
import logo from "@/app/icon.png";
import Link from "next/link";

const clubsData = [
  {
    name: "Point Quest",
    tagline: "Centralized Platform for College Club Activities",
    logo: { logo }, // You can replace with your image path
  },
  {
    name: "Tech Innovators",
    tagline: "Bringing Tomorrow's Tech Today, We Innovate",
    logo: { logo }, // You can replace with your image path
  },
  {
    name: "Creative Minds",
    tagline: "Design, Create, Inspire, Let's Change the World!",
    logo: { logo }, // You can replace with your image path
  },
];

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative bg-white">
      <div className="grid grid-cols-3 gap-10 mb-9">
        {clubsData.map((club, index) => (
          <Link key={index} href="/student/clubs/club">
            <ClubCard key={index} club={club} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
