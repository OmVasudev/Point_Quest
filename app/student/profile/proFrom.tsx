"use client";

import React, { useState } from "react";
import Image from "next/image";

const StudentProfileContent = ({ initialStudent }) => {
  console.log("studentinitialStudent", initialStudent);
  const [student, setStudent] = useState(initialStudent);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation example
    if (!student.phoneNo.match(/^\d{10}$/)) {
      setErrorMessage("Please enter a valid 10-digit phone number");
      return;
    }

    try {
      // Here you would typically send the updated student data to your backend
      // For example: await updateStudent(student);
      console.log("Saving student data:", student);
      setIsEditing(false);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Failed to update student profile");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 px-4 py-12">
      <h1 className="mb-8 text-5xl text-gray-900">Student Profile</h1>
      <div className="w-full max-w-4xl rounded-xl bg-white p-8 shadow-lg">
        <div className="flex flex-col items-center gap-6 md:flex-row md:gap-10">
          {/* Profile Picture Section */}
          <div className="flex w-full flex-col items-center md:w-1/3">
            <div className="relative">
              <Image
                src="/img/studentProfilePic.jpg"
                alt="Profile"
                width={210}
                height={210}
                className="rounded-full border-4 border-white shadow-lg"
              />
              <div className="absolute bottom-2 right-3 rounded-full border border-white bg-black p-2 text-center text-sm text-white shadow-md hover:bg-gray-500">
                Edit
              </div>
            </div>

            <div className="mt-8 w-full rounded-xl border-2 border-white bg-gradient-to-bl from-blue-500 via-blue-600 to-blue-500 px-6 py-4 text-center text-white shadow-xl">
              <p className="text-xl font-medium">Total Activity Points</p>
              <p className="font-secondary text-4xl font-bold">
                {student.points}
              </p>
            </div>
          </div>

          {/* Student Info Form */}
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-1 flex-col gap-6"
          >
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                value={`${student.firstName} ${student.lastName}`}
                className="block w-full cursor-not-allowed rounded-lg border bg-gray-100 p-2 text-gray-700"
                readOnly
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                value={student.email}
                className="block w-full cursor-not-allowed rounded-lg border bg-gray-100 p-2 text-gray-700"
                readOnly
              />
            </div>

            {/* USN */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                USN
              </label>
              <input
                type="text"
                name="USN"
                value={student.USN}
                className="block w-full rounded-lg border bg-gray-100 p-2 text-gray-700"
                readOnly={!isEditing}
                onChange={handleChange}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNo"
                value={student.phoneNo}
                className="block w-full rounded-lg border bg-gray-100 p-2 text-gray-700"
                readOnly={!isEditing}
                onChange={handleChange}
              />
            </div>

            {/* Branch */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Branch
              </label>
              <input
                type="text"
                value={student.branch}
                className="block w-full cursor-not-allowed rounded-lg border bg-gray-100 p-2 text-gray-700"
                readOnly
              />
            </div>

            {/* Buttons */}
            <div className="mt-4 flex justify-end gap-4">
              {isEditing ? (
                <button
                  type="submit"
                  className="rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
                >
                  Save
                </button>
              ) : (
                <button
                  type="button"
                  className="rounded-xl bg-accent-500 px-8 py-2 font-semibold text-white transition hover:bg-accent-400"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {errorMessage && (
        <p className="mt-4 text-center text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default StudentProfileContent;
