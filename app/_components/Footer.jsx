import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <div>
      <footer className="footer bg-gray-100 text-black p-10">
        <aside>
          <h1 className="text-4xl bg-gradient-to-r from-[#0103FF] to-[#01E4FF] bg-clip-text text-transparent">
            Point Quest
          </h1>
          <h3 className="text-2xl">Engage, Track, Achieve!</h3>
          <p className="mt-2 text-sm">
            Point Quest helps students and clubs seamlessly manage activities,
            events, and engagement with ease.
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Features</h6>
          <a className="link link-hover">Event Management</a>
          <a className="link link-hover">Club Collaboration</a>
          <a className="link link-hover">Activity Tracking</a>
        </nav>
        <nav>
          <h6 className="footer-title">Resources</h6>
          <a className="link link-hover">User Guide</a>
          <a className="link link-hover">Support</a>
          <a className="link link-hover">FAQs</a>
        </nav>
        <nav>
          <h6 className="footer-title">Connect</h6>
          <a className="link link-hover">About Us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Feedback</a>
        </nav>
      </footer>
      <div className="bg-base-200 text-center py-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Point Quest. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
