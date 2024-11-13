"use client";
import { Reddit_Sans } from "next/font/google";
import React, { useState } from "react";

const redditSans = Reddit_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Define weights you need for different text elements
});

const Page = () => {
  // Define state for form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    branch: "",
    usn: "",
    passingYear: "",
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can log form data or send it to an API
    console.log("Form Data Submitted: ", formData);
  };

  return (
    <div
      className={`${redditSans.className} flex flex-col justify-center items-center h-screen bg-white`}
    >
      {/* Title outside the card and centered */}
      <p className="text-5xl text-center text-black mb-8 mt-6">
        Student Registration
      </p>

      {/* Card with form inside */}
      <div className="bg-gradient-to-b from-customBlue1 to-customBlue2 shadow-lg rounded-3xl w-2/5 p-10">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex space-x-4">
            {/* First Name Field */}
            <div className="w-1/2">
              <label className="block text-white">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="John"
                className="w-full p-2 mt-2 bg-white rounded-lg text-black"
              />
            </div>
            {/* Last Name Field */}
            <div className="w-1/2">
              <label className="block text-white">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Doe"
                className="w-full p-2 mt-2 bg-white rounded-lg text-black"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            {/* USN Field */}
            <div className="w-1/2">
              <label className="block text-white">USN</label>
              <input
                type="text"
                name="usn"
                value={formData.usn}
                onChange={handleInputChange}
                placeholder="2GI21CS000"
                className="w-full p-2 mt-2 bg-white rounded-lg text-black"
              />
            </div>

            {/* Branch Field */}
            <div className="w-1/2">
              <label className="block text-white">Branch</label>
              <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleInputChange}
                placeholder="Computer Science"
                className="w-full p-2 mt-2 bg-white rounded-lg text-black"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            {/* Passing Year Field */}
            <div className="w-1/2">
              <label className="block text-white">Passing Year</label>
              <input
                type="number"
                name="passingYear"
                value={formData.passingYear}
                onChange={handleInputChange}
                placeholder="2025"
                className="w-full p-2 mt-2 bg-white rounded-lg text-black"
              />
            </div>

            {/* Phone Number Field */}
            <div className="w-1/2">
              <label className="block text-white">Phone No.</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="9876543210"
                className="w-full p-2 mt-2 bg-white rounded-lg text-black"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            {/* Email Field */}
            <div className="w-1/2">
              <label className="block text-white">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@gmail.com"
                className="w-full p-2 mt-2 bg-white rounded-lg text-black"
              />
            </div>
            {/* Password Field */}
            <div className="w-1/2">
              <label className="block text-white">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full p-2 mt-2 bg-white rounded-lg text-black"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className=" md:w-1/4 w-full bg-blue-950 text-white p-2 mt-4 rounded-3xl hover:bg-blue-800 transition"
            >
              Register as Student
            </button>
          </div>

          {/* Sign In Link */}
          <p className="text-center text-gray-600 mt-4">
            Already Have An Account?{" "}
            <a href="#" className="text-blue-500 underline">
              Sign In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Page;
