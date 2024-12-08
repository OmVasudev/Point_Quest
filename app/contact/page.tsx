"use client";

import React, { useState } from "react";
import { z, ZodError } from "zod";
import { addFeedBack } from "../_lib/data-service"; // Adjust the import path as needed

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
  const [loading, setLoading] = useState(false); // To manage loading state

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formValues = {
      name,
      email,
      message,
    };

    try {
      // Validate form data using Zod
      contactFormSchema.parse(formValues);

      // Proceed with database submission if validation passes
      setLoading(true);
      const result = await addFeedBack(formValues);

      if (result) {
        setSuccessMessage(
          "Thank you for your feedback! We will get back to you soon.",
        );
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setSuccessMessage(
          "There was an error saving your feedback. Please try again later.",
        );
      }
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle form validation errors but won't show in the UI anymore
        console.error("Validation failed:", error.errors);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto mb-10 max-w-4xl rounded-xl bg-gray-50 bg-gradient-to-r p-6 text-black shadow-lg">
        <h2 className="mb-6 text-center text-3xl font-semibold">
          We Value Your Feedback
        </h2>
        <p className="mb-6 text-center text-lg">
          Share your thoughts or queries, and we will get back to you as soon as
          possible.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-2 text-lg font-medium">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 text-lg font-medium">
              Your Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter your email address"
              required
            />
          </div>

          {/* Message Field */}
          <div className="flex flex-col">
            <label htmlFor="message" className="mb-2 text-lg font-medium">
              Your Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Share your feedback or questions"
              rows={4}
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Message"}
            </button>
          </div>
        </form>

        {successMessage && (
          <div className="mt-6 text-center font-medium text-green-500">
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
