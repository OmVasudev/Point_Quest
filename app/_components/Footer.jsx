import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <div>
      <footer className="footer bg-gray-100 p-10 text-black">
        <aside>
          <h1 className="bg-gradient-to-r from-[#0103FF] to-[#01E4FF] bg-clip-text text-4xl text-transparent">
            Point Quest
          </h1>
          <h3 className="text-2xl">Engage, Track, Achieve!</h3>
          <p className="mt-2 text-sm">
            Point Quest helps students and clubs seamlessly manage activities,
            events, and engagement with ease.
          </p>
        </aside>
        <nav>
          <h6 className="font-bold">Features</h6>
          <a className="link-hover link">Event Management</a>
          <a className="link-hover link">Club Collaboration</a>
          <a className="link-hover link">Activity Tracking</a>
        </nav>
        <nav>
          <h6 className="font-bold">Resources</h6>
          <a className="link-hover link">User Guide</a>
          <a className="link-hover link">Support</a>
          <a className="link-hover link">FAQs</a>
        </nav>
        <nav>
          <h6 className="font-bold">Connect</h6>
          <a className="link-hover link">About Us</a>
          <a className="link-hover link">Contact</a>
          <a className="link-hover link">Feedback</a>
        </nav>
      </footer>
      <div className="bg-blue-950 py-4 text-center">
        <p className="text-sm text-white">
          &copy; {new Date().getFullYear()} Point Quest. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
