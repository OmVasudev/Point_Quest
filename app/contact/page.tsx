"use client";
import React, { useState } from "react";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Example of handling form submission
    // Here you can send the data to your backend or email service

    setSuccessMessage(
      "Thank you for reaching out! We will get back to you soon."
    );
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="bg-white">
      <div className="max-w-4xl mb-10 mx-auto p-6 bg-gradient-to-r bg-gray-50 text-black rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">
          We Value Your Feedback
        </h2>
        <p className="text-lg text-center mb-6">
          Share your thoughts or queries, and we'll get back to you as soon as
          possible.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-lg font-medium mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg font-medium mb-2">
              Your Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
              placeholder="Enter your email address"
              required
            />
          </div>

          {/* Message Field */}
          <div className="flex flex-col">
            <label htmlFor="message" className="text-lg font-medium mb-2">
              Your Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
              placeholder="Share your feedback or questions"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit Message
            </button>
          </div>
        </form>

        {successMessage && (
          <div className="mt-6 text-center text-green-300 font-medium">
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
