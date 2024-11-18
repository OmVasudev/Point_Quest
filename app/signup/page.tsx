"use client";

import React, { useState } from "react";
import { addStudent } from "@/app/_lib/data-service"; // Adjust the path as necessary

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNo: "",
    branch: "",
    USN: "",
    points: 0,
    passingYear: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addStudent({
        ...formData,
        phoneNo: parseFloat(formData.phoneNo),
        points: parseInt(formData.points, 10),
        passingYear: parseInt(formData.passingYear, 10),
      });
      setMessage("Student signup successful!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNo: "",
        branch: "",
        USN: "",
        points: 0,
        passingYear: "",
      });
    } catch (error) {
      console.error("Error during signup:", error);
      setMessage("An error occurred while signing up. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md mt-[-50px] rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Student Signup
        </h1>
        {message && (
          <p
            className={`text-center ${
              message.includes("successful") ? "text-green-600" : "text-red-600"
            } mb-4`}
          >
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
              className="w-1/2 px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
              className="w-1/2 px-4 py-2 border rounded-lg"
            />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="tel"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            placeholder="Branch"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            name="USN"
            value={formData.USN}
            onChange={handleChange}
            placeholder="USN"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="number"
            name="points"
            value={formData.points}
            onChange={handleChange}
            placeholder="Points (e.g., 0)"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="number"
            name="passingYear"
            value={formData.passingYear}
            onChange={handleChange}
            placeholder="Passing Year"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
