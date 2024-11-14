import React from "react";
import Image from "next/image"; // Use Image from Next.js
import { Reddit_Sans } from "next/font/google";

interface StudentProfileProps {
  name: string;
  email: string;
  usn: string;
  phoneNumber: string;
  branch: string;
  totalPoints: number;
}
const redditSans = Reddit_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Define weights you need for different text elements
});

const StudentProfile: React.FC<StudentProfileProps> = ({
  name,
  email,
  usn,
  phoneNumber,
  branch,
  totalPoints,
}) => {
  return (
    <div
      className={`${redditSans.className} bg-white min-h-screen flex items-center justify-center`}
    >
      <h1 className="text-5xl  text-black absolute top-36 left-1/2 transform -translate-x-1/2">
        Student Profile
      </h1>

      <div className="bg-gradient-to-b from-customBlue1 to-customBlue2 shadow-lg rounded-3xl w-2/4 p-10">
      
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-start mt-4 mr-2 ml-2">
          {/* Profile Picture and Points Section */}
          <div className="bg-white shadow-lg rounded-3xl flex flex-col md:col-span-2 items-center justify-between p-10 ">
            <Image
              src="/img/studentProfilePic.jpg"
              alt="Profile"
              width={192} // equivalent to w-48 (192px)
              height={192} // equivalent to h-48 (192px)
              className="rounded-full mb-10"
            />
            <div className="bg-blue-400 text-white  text-lg p-6 rounded-2xl text-center">
              <p className="text-xl font-medium">
                Total Activity Points Earned
              </p>
              <p className="text-6xl font-bold mt-2">{totalPoints}20</p>
            </div>
          </div>

          {/* Student Info Section */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name Field */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-gray-900 font-normal">Full Name</label>
              <input
                type="text"
                value={name}
                className="text-gray-700 bg-gray-100 rounded-lg p-2"
                readOnly
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-gray-900 font-normal">Email</label>
              <input
                type="email"
                value={email}
                className="text-gray-700 bg-gray-100 rounded-lg p-2"
                readOnly
              />
            </div>

            {/* USN Field */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-gray-900 font-normal">USN</label>
              <input
                type="text"
                value={usn}
                className="text-gray-700 bg-gray-100 rounded-lg p-2"
                readOnly
              />
            </div>

            {/* Phone Number Field */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-gray-900 font-normal">Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                className="text-gray-700 bg-gray-100 rounded-lg p-2"
                readOnly
              />
            </div>

            {/* Branch Field */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-gray-900 font-normal">Branch</label>
              <input
                type="text"
                value={branch}
                className="text-gray-700 bg-gray-100 rounded-lg p-2"
                readOnly
              />
            </div>

            {/* Edit Button */}
            <div className="flex justify-end md:col-span-2 mt-4">
              <button className="bg-blue-950 text-white py-2 px-4 rounded-3xl w-full md:w-1/3">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
