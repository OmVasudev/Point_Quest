import React from "react";
import Link from "next/link";
import Image from "next/image";
// import Logout from "../logout";
// import SignupPage from "../signup/page";

const NavbarLogin = () => {
  return (
    <div className="navbar bg-white ">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {/* <li>
              <Link href="/student/clubs">Clubs</Link>
            </li>
            <li>
              <Link href="/student/studentDashboard">Dashboard</Link>
            </li> */}
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
          <span className="font-secondary md:mx-6 text-2xl md:text-3xl bg-gradient-to-r from-[#0103FF] to-[#01E4FF] bg-clip-text text-transparent">
            Point Quest
          </span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 pt-4">
          <li>
            <Link href="/about">About Us</Link>
          </li>
          <li>
            <Link href="/contact">Contact Us</Link>
          </li>
        </ul>
      </div>
       <div className="navbar-end">
        <div className="hover:underline mr-6">
          <Link href="/login">Login</Link>
        </div>
        <div className="hover:underline mr-2">
          <Link href="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default NavbarLogin;
