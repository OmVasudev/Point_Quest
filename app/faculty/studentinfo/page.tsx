"use client";
import React, { useState } from "react";

const Page = () => {
  // Sample data for students
  const [students, setStudents] = useState([
    {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phoneNo: 9876543210,
      branch: "CSE",
      USN: "2GI21CS001",
      points: 90,
      passingYear: 2025,
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      phoneNo: 9123456789,
      branch: "ECE",
      USN: "2GI21CS002",
      points: 85,
      passingYear: 2024,
    },
  ]);

  const eventsWithClubs = [
    {
      club: { name: "Robotics Club" },
      event: {
        name: "Robotics Workshop",
        date: "2024-11-12",
        points: 10,
        link: "https://example.com",
      },
    },
    {
      club: { name: "Cultural Club" },
      event: {
        name: "Cultural Fest",
        date: "2024-09-21",
        points: 15,
        link: "https://example.com",
      },
    },
  ];

  // Modal state
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Modal close function
  const closeModal = () => setSelectedStudent(null);

  return (
    <div className="container mx-auto min-h-screen rounded-lg bg-zinc-50 px-8 py-8 shadow-md">
      {/* Title */}
      <h1 className="mb-2 text-center font-primary text-4xl font-bold text-black">
        Student Information
      </h1>

      {/* Line for separation */}
      <div className="mb-6 border-b-2 border-gray-300"></div>

      {/* Search and filter section */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
        <input
          type="text"
          placeholder="Search by USN"
          className="w-full max-w-md rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <select className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option value="">Select Year</option>
          <option value="2023">2020</option>
          <option value="2024">2021</option>
          <option value="2025">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
        <button className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2 text-white shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none">
          Search
        </button>
      </div>

      {/* Student table */}
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-lg bg-white shadow-md">
          <thead>
            <tr className="bg-gradient-to-r from-gray-200 to-gray-300 text-center text-base font-semibold uppercase tracking-wide text-gray-800">
              <th className="px-4 py-3">First Name</th>
              <th className="px-4 py-3">Last Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone No</th>
              <th className="px-4 py-3">Branch</th>
              <th className="px-4 py-3">USN</th>
              <th className="px-4 py-3">Points</th>
              <th className="px-4 py-3">Passing Year</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr
                key={index}
                className="text-center text-base text-gray-600 odd:bg-white even:bg-gray-100"
              >
                <td className="px-4 py-3">{student.firstName}</td>
                <td className="px-4 py-3">{student.lastName}</td>
                <td className="px-4 py-3">{student.email}</td>
                <td className="px-4 py-3">{student.phoneNo}</td>
                <td className="px-4 py-3">{student.branch}</td>
                <td className="px-4 py-3 font-semibold text-blue-600">
                  {student.USN}
                </td>
                <td className="px-4 py-3">{student.points}</td>
                <td className="px-4 py-3">{student.passingYear}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => setSelectedStudent(student)}
                    className="rounded-lg bg-gradient-to-r from-blue-400 to-blue-500 px-4 py-2 text-white shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for displaying student details */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="relative w-full max-w-5xl rounded-lg bg-white p-10 shadow-xl">
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 text-2xl text-gray-700"
            >
              &times;
            </button>

            {/* Student Info Section - Spanning entire modal */}
            <div className="mb-8 w-full rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 font-primary text-lg font-semibold text-black md:text-2xl lg:text-3xl">
                Student Details:
              </h3>

              <table className="min-w-full table-auto text-lg text-gray-700">
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-semibold">Name:</td>
                    <td className="px-4 py-3">
                      {selectedStudent.firstName +
                        " " +
                        selectedStudent.lastName}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-semibold">USN:</td>
                    <td className="px-4 py-3">{selectedStudent.USN}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-semibold">
                      Year of Passing:
                    </td>
                    <td className="px-4 py-3">{selectedStudent.passingYear}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-semibold">Branch:</td>
                    <td className="px-4 py-3">{selectedStudent.branch}</td>
                  </tr>
                  {/* Integrated Total Points Earned */}
                  <tr className="border-b">
                    <td className="px-4 py-3 font-semibold">
                      Total Points Earned:
                    </td>
                    <td className="px-4 py-3">{selectedStudent.points}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Bottom Table with Events - Smaller section */}
            <div className="rounded-lg bg-white p-6 shadow-md lg:p-10">
              <h3 className="mb-6 text-xl font-semibold text-black md:text-2xl lg:text-3xl">
                Participated Events:
              </h3>
              <div className="overflow-x-auto rounded-lg">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-blue-900 text-center text-white">
                      <th className="px-4 py-3 text-sm font-semibold md:py-4 md:text-base">
                        Club Name
                      </th>
                      <th className="px-4 py-3 text-sm font-semibold md:py-4 md:text-base">
                        Activity Name
                      </th>
                      <th className="px-4 py-3 text-sm font-semibold md:py-4 md:text-base">
                        Date
                      </th>
                      <th className="px-4 py-3 text-sm font-semibold md:py-4 md:text-base">
                        Points
                      </th>
                      <th className="px-4 py-3 text-sm font-semibold md:py-4 md:text-base">
                        Certificate
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventsWithClubs.map((item, index) =>
                      item && item.event ? (
                        <tr
                          key={index}
                          className="border-t text-center odd:bg-gray-100 even:bg-white"
                        >
                          <td className="px-4 py-3 font-medium text-black md:px-5 md:py-4">
                            {item.club ? item.club.name : "Club not found"}
                          </td>
                          <td className="px-4 py-3 text-black md:px-5 md:py-4">
                            {item.event.name}
                          </td>
                          <td className="px-4 py-3 text-black md:px-5 md:py-4">
                            {item.event.date}
                          </td>
                          <td className="px-4 py-3 text-black md:px-5 md:py-4">
                            {item.event.points}
                          </td>
                          <td className="px-4 py-3 text-black md:px-5 md:py-4">
                            <a
                              href={item.event.link}
                              className="rounded-xl bg-blue-500 px-3 py-1 text-white transition hover:bg-blue-700 md:px-3 md:py-2"
                            >
                              Download
                            </a>
                          </td>
                        </tr>
                      ) : (
                        <tr key={index}>
                          <td
                            colSpan={5}
                            className="px-4 py-3 text-center text-sm md:text-base"
                          >
                            Event data not found
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
