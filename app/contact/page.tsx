"use client";

import React, { useState } from "react";
import { z, ZodError } from "zod";

// Define Zod schema for validation
const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  message: z.string().min(1, "Message cannot be empty"),
});

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formValues = {
      name,
      email,
      message,
    };

    try {
      // Validate form data using Zod
      contactFormSchema.parse(formValues);
      
      // Proceed with form submission if validation passes
      setSuccessMessage("Thank you for reaching out! We will get back to you soon.");
      setName("");
      setEmail("");
      setMessage("");
      setErrors({});
    } catch (error) {
      if (error instanceof ZodError) {
        // Format and set validation errors
        const formattedErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          formattedErrors[err.path[0]] = err.message;
        });
        setErrors(formattedErrors);
      }
    }
  };

  return (
    <div className="bg-white">
      <div className="max-w-4xl mb-10 mx-auto p-6 bg-gradient-to-r bg-gray-50 text-black rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">We Value Your Feedback</h2>
        <p className="text-lg text-center mb-6">Share your thoughts or queries, and we'll get back to you as soon as possible.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-lg font-medium mb-2">Your Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? "border-red-500 focus:ring-red-500" : ""
              }`}
              placeholder="Enter your full name"
              required
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg font-medium mb-2">Your Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500 focus:ring-red-500" : ""
              }`}
              placeholder="Enter your email address"
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Message Field */}
          <div className="flex flex-col">
            <label htmlFor="message" className="text-lg font-medium mb-2">Your Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.message ? "border-red-500 focus:ring-red-500" : ""
              }`}
              placeholder="Share your feedback or questions"
              rows="4"
              required
            ></textarea>
            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
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
