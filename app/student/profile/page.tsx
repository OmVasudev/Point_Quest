// import React from "react";
// import Image from "next/image"; // Use Image from Next.js
// import { Reddit_Sans } from "next/font/google";
// import { getStudent } from "@/app/_lib/data-service";

// interface StudentProfileProps {
//   name: string;
//   email: string;
//   usn: string;
//   phoneNumber: string;
//   branch: string;
//   totalPoints: number;
// }
// const redditSans = Reddit_Sans({
//   subsets: ["latin"],
//   weight: ["400", "500", "700"], // Define weights you need for different text elements
// });

// const async StudentProfile: React.FC<StudentProfileProps> = ({
//   name,
//   email,
//   usn,
//   phoneNumber,
//   branch,
//   totalPoints,
// }) => {
//   const student = getStudent(1);
//   console.log(student);
//   return (
//     <div
//       className={`${redditSans.className} bg-white min-h-screen flex items-center justify-center`}
//     >
//       <h1 className="text-5xl  text-black absolute top-36 left-1/2 transform -translate-x-1/2">
//         Student Profile
//       </h1>
//       <div className="bg-gradient-to-b from-customBlue1 to-customBlue2 shadow-lg rounded-3xl w-2/4 p-10">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-start mt-4 mr-2 ml-2">
//           {/* Profile Picture and Points Section */}
//           <div className="bg-white shadow-lg rounded-3xl flex flex-col md:col-span-2 items-center justify-between p-10 ">
//             <Image
//               src="/img/studentProfilePic.jpg"
//               alt="Profile"
//               width={192} // equivalent to w-48 (192px)
//               height={192} // equivalent to h-48 (192px)
//               className="rounded-full mb-10"
//             />
//             <div className="bg-blue-400 text-white  text-lg p-6 rounded-2xl text-center">
//               <p className="text-xl font-medium">
//                 Total Activity Points Earned
//               </p>
//               <p className="text-6xl font-bold mt-2">{totalPoints}20</p>
//             </div>
//           </div>

//           {/* Student Info Section */}
//           <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* Full Name Field */}
//             <div className="flex flex-col md:col-span-2">
//               <label className="text-gray-900 font-normal">Full Name</label>
//               <input
//                 type="text"
//                 value={name}
//                 className="text-gray-700 bg-gray-100 rounded-lg p-2"
//                 readOnly
//               />
//             </div>

//             {/* Email Field */}
//             <div className="flex flex-col md:col-span-2">
//               <label className="text-gray-900 font-normal">Email</label>
//               <input
//                 type="email"
//                 value={email}
//                 className="text-gray-700 bg-gray-100 rounded-lg p-2"
//                 readOnly
//               />
//             </div>

//             {/* USN Field */}
//             <div className="flex flex-col md:col-span-2">
//               <label className="text-gray-900 font-normal">USN</label>
//               <input
//                 type="text"
//                 value={usn}
//                 className="text-gray-700 bg-gray-100 rounded-lg p-2"
//                 readOnly
//               />
//             </div>

//             {/* Phone Number Field */}
//             <div className="flex flex-col md:col-span-2">
//               <label className="text-gray-900 font-normal">Phone Number</label>
//               <input
//                 type="text"
//                 value={phoneNumber}
//                 className="text-gray-700 bg-gray-100 rounded-lg p-2"
//                 readOnly
//               />
//             </div>

//             {/* Branch Field */}
//             <div className="flex flex-col md:col-span-2">
//               <label className="text-gray-900 font-normal">Branch</label>
//               <input
//                 type="text"
//                 value={branch}
//                 className="text-gray-700 bg-gray-100 rounded-lg p-2"
//                 readOnly
//               />
//             </div>

//             {/* Edit Button */}
//             <div className="flex justify-end md:col-span-2 mt-4">
//               <button className="bg-blue-950 text-white py-2 px-4 rounded-3xl w-full md:w-1/3">
//                 Edit
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentProfile;

import React from "react";
import Image from "next/image";
import { Reddit_Sans } from "next/font/google";
import { getStudent } from "@/app/_lib/data-service";

const redditSans = Reddit_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default async function StudentProfile() {
  const student = await getStudent(1);
  console.log(student);

  return (
    <div
      className={`${redditSans.className} bg-white min-h-screen flex items-center justify-center p-5`}
    >
      <h1 className="text-3xl md:text-5xl text-black absolute top-24 md:top-36 left-1/2 transform -translate-x-1/2">
        Student Profile
      </h1>

      {/* Profile Component */}
      <div
        className="relative bg-white bg-opacity-10 shadow-lg rounded-3xl w-11/12 md:w-2/3 lg:w-1/2 p-8 md:p-10 mt-24 backdrop-blur-2xl"
        style={{
          backgroundImage: 'url("https://image.lexica.art/full_webp/32593f1f-8fcf-47be-bda7-08350213ac3f")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          {/* Profile Picture and Points Section */}
          <div className="bg-white bg-opacity-40 shadow-lg rounded-3xl flex flex-col items-center justify-between p-6 md:p-10 md:col-span-2 backdrop-blur-md">
            <Image
              src="/img/studentProfilePic.jpg"
              alt="Profile"
              width={192}
              height={192}
              className="rounded-full mb-6 md:mb-10"
            />
            <div className=" border-gray-900 shadow-2xl text-black text-lg  p-4 md:p-6 rounded-2xl text-center">
              <p className="text-xl font-extrabold">
                Total Activity Points Earned
              </p>
              <p className="text-5xl md:text-6xl font-bold mt-2">
                {student.points}
              </p>
            </div>
          </div>

          {/* Student Info Section */}
          <div className="md:col-span-2 grid grid-cols-1 gap-4">
            {/* Full Name Field */}
            <div className="flex flex-col">
              <label className="text-white font-normal">Full Name</label>
              <input
                type="text"
                value={student.firstName + " " + student.lastName}
                className="text-gray-700 bg-gray-100 rounded-lg p-2"
                readOnly
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col">
              <label className="text-white font-normal">Email</label>
              <input
                type="email"
                value={student.email}
                className="text-gray-700 bg-gray-100 rounded-lg p-2"
                readOnly
              />
            </div>

            {/* USN Field */}
            <div className="flex flex-col">
              <label className="text-white font-normal">USN</label>
              <input
                type="text"
                value={student.USN}
                className="text-gray-700 bg-gray-100 rounded-lg p-2"
                readOnly
              />
            </div>

            {/* Phone Number Field */}
            <div className="flex flex-col">
              <label className="text-white font-normal">Phone Number</label>
              <input
                type="text"
                value={student.phoneNo}
                className="text-gray-700 bg-gray-100 rounded-lg p-2"
                readOnly
              />
            </div>

            {/* Branch Field */}
            <div className="flex flex-col">
              <label className="text-white font-normal">Branch</label>
              <input
                type="text"
                value={student.branch}
                className="text-gray-700 bg-gray-100 rounded-lg p-2"
                readOnly
              />
            </div>

            {/* Edit Button */}
            <div className="flex justify-end mt-4">
              <button className="border-2 border-gray-200 bg-primary-800 text-white py-2 px-4 rounded-3xl w-full md:w-1/3 hover:bg-primary-800">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
