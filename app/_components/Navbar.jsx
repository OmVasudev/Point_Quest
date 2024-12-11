// import React from "react";
// import Link from "next/link";
// import Image from "next/image";
// import Logout from "../logout";
// import icon from "@/app/icon.png";
// import { getStudent } from "../_lib/data-service";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route";

// const Navbar = () => {
//   return (
//     <div className="navbar bg-white">
//       <div className="navbar-start">
//         <div className="dropdown">
//           <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h8m-8 6h16"
//               />
//             </svg>
//           </div>
//           <ul
//             tabIndex={0}
//             className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
//           >
//             <li>
//               <Link href="/student/clubs">Clubs</Link>
//             </li>
//             <li>
//               <Link href="/student/studentDashboard">Dashboard</Link>
//             </li>
//             <li>
//               <Link href="/about">About Us</Link>
//             </li>
//             <li>
//               <Link href="/contact">Contact Us</Link>
//             </li>
//           </ul>
//         </div>

//         {/* Logo and Title */}
//         <Link href="/" className="flex items-center space-x-2">
//           <Image
//             src="/logo.png"
//             alt="Project Logo"
//             width={40}
//             height={40}
//             className="h-8 w-8 md:h-10 md:w-10"
//           />
//           <span className="bg-gradient-to-r from-[#0103FF] to-[#01E4FF] bg-clip-text font-secondary text-2xl text-transparent md:mx-6 md:text-3xl">
//             Point Quest
//           </span>
//         </Link>
//       </div>
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1 pt-4">
//           <li>
//             <Link href="/student/clubs">Clubs</Link>
//           </li>
//           <li>
//             <Link href="/student/studentDashboard">Dashboard</Link>
//           </li>
//           <li>
//             <Link href="/about">About Us</Link>
//           </li>
//           <li>
//             <Link href="/contact">Contact Us</Link>
//           </li>
//         </ul>
//       </div>
//       <div className="navbar-end flex items-center space-x-4">
//         {/* Profile Button */}
//         <Link href="/student/profile" className="flex items-center space-x-2">
//           <Image
//             src={icon} // Replace with your profile picture URL or a placeholder image
//             alt="Profile"
//             width={40}
//             height={40}
//             className="rounded-full border border-gray-300"
//           />
//         </Link>
//         <Logout />
//       </div>
//     </div>
//   );
// };

// export default Navbar;

"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logout from "../logout";
import { getStudent } from "../_lib/data-service";
import { getSession } from "next-auth/react"; // Use getSession instead of getServerSession

const Navbar = () => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const session = await getSession(); // Fetch the session client-side
        if (session && session.user) {
          const studentId = session.user.id;
          const studentData = await getStudent(studentId); // Fetch student data using the ID from session
          setStudent(studentData);
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData(); // Trigger the fetch when the component mounts
  }, []); // Empty dependency array ensures this runs once on component mount

  return (
    <div className="navbar bg-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            <li>
              <Link href="/student/clubs">Clubs</Link>
            </li>
            <li>
              <Link href="/student/studentDashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Logo and Title */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="Project Logo"
            width={40}
            height={40}
            className="h-8 w-8 md:h-10 md:w-10"
          />
          <span className="bg-gradient-to-r from-[#0103FF] to-[#01E4FF] bg-clip-text font-secondary text-2xl text-transparent md:mx-6 md:text-3xl">
            Point Quest
          </span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 pt-4">
          <li>
            <Link href="/student/clubs">Clubs</Link>
          </li>
          <li>
            <Link href="/student/studentDashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/about">About Us</Link>
          </li>
          <li>
            <Link href="/contact">Contact Us</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end flex items-center space-x-4">
        {/* Profile Button */}
        <Link href="/student/profile" className="flex items-center space-x-2">
          {/* Render student's profile image */}
          {student ? (
            <img
              src={student.image || "/api/placeholder/400/400"} // Use student's profile image or a placeholder
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full border border-gray-300"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-300"></div> // Placeholder while loading
          )}
        </Link>
        <Logout />
      </div>
    </div>
  );
};

export default Navbar;
