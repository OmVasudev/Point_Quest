// "use client";
// import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
// import Image from "next/image";
// import { updateStudent } from "../../_lib/data-service";
// import { getStudent } from "../../_lib/data-service";

// interface StudentProfileFormProps {
//   studentEmail: string;
// }

// interface StudentData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   USN: string;
//   phoneNo: string;
//   branch: string;
//   points: number;
// }

// const StudentProfileForm: React.FC<StudentProfileFormProps> = ({
//   studentEmail,
// }) => {
//   const [student, setStudent] = useState<StudentData | null>(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [errorMessage, setErrorMessage] = useState<string>("");

//   useEffect(() => {
//     const fetchStudentData = async () => {
//       try {
//         const data = await getStudentByEmail(studentEmail);
//         if (data) {
//           setStudent(data);
//         } else {
//           setErrorMessage("Failed to fetch student data.");
//         }
//       } catch (error) {
//         console.error("Error fetching student data:", error);
//         setErrorMessage("Error fetching student data.");
//       }
//     };

//     fetchStudentData();
//   }, [studentEmail]);

//   const getStudentByEmail = async (email: string) => {
//     try {
//       const studentData = await getStudent(2);
//       return studentData;
//     } catch (error) {
//       console.error("Error fetching student by email:", error);
//       return null;
//     }
//   };

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (!student) return;
//     const { name, value } = e.target;
//     setStudent({ ...student, [name]: value });
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setErrorMessage("");

//     if (!student) return;

//     const updatedData = {
//       USN: student.USN,
//       phoneNo: student.phoneNo,
//     };

//     try {
//       const result = await updateStudent(student.email, updatedData);

//       if (!result) {
//         setErrorMessage("Failed to update student data.");
//       } else {
//         console.log("Student data updated successfully:", result);
//         setIsEditing(false);
//       }
//     } catch (error) {
//       console.error("Error updating student data:", error);
//       setErrorMessage("Failed to update student data.");
//     }
//   };

//   if (!student) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="bg-white min-h-screen flex items-center justify-center">
//       <h1 className="text-5xl text-black absolute top-36 left-1/2 transform -translate-x-1/2">
//         Student Profile
//       </h1>
//       <div className="bg-gradient-to-b from-customBlue1 to-customBlue2 shadow-lg rounded-3xl w-2/4 p-10">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-start mt-4 mr-2 ml-2">
//           {/* Profile Picture and Points Section */}
//           <div className="bg-white shadow-lg rounded-3xl flex flex-col md:col-span-2 items-center justify-between p-10">
//             <Image
//               src="/img/studentProfilePic.jpg"
//               alt="Profile"
//               width={192}
//               height={192}
//               className="rounded-full mb-10"
//             />
//             <div className="bg-blue-400 text-white text-lg p-6 rounded-2xl text-center">
//               <p className="text-xl font-medium">
//                 Total Activity Points Earned
//               </p>
//               <p className="text-6xl font-bold mt-2">{student.points}</p>
//             </div>
//           </div>

//           {/* Student Info Section */}
//           <form
//             onSubmit={handleSubmit}
//             className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4"
//           >
//             {/* Full Name Field */}
//             <div className="flex flex-col md:col-span-2">
//               <label className="text-gray-900 font-normal">Full Name</label>
//               <input
//                 type="text"
//                 value={`${student.firstName} ${student.lastName}`}
//                 className={`text-gray-700 rounded-lg p-2 ${
//                   isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-gray-200"
//                 }`}
//                 readOnly
//               />
//             </div>

//             {/* Email Field */}
//             <div className="flex flex-col md:col-span-2">
//               <label className="text-gray-900 font-normal">Email</label>
//               <input
//                 type="email"
//                 value={student.email}
//                 className={`text-gray-700 rounded-lg p-2 ${
//                   isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-gray-200"
//                 }`}
//                 readOnly
//               />
//             </div>

//             {/* USN Field */}
//             <div className="flex flex-col md:col-span-2">
//               <label className="text-gray-900 font-normal">USN</label>
//               <input
//                 type="text"
//                 name="USN"
//                 value={student.USN}
//                 className="text-gray-700 bg-gray-100 rounded-lg p-2"
//                 readOnly={!isEditing}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Phone Number Field */}
//             <div className="flex flex-col md:col-span-2">
//               <label className="text-gray-900 font-normal">Phone Number</label>
//               <input
//                 type="text"
//                 name="phoneNo"
//                 value={student.phoneNo}
//                 className="text-gray-700 bg-gray-100 rounded-lg p-2"
//                 readOnly={!isEditing}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Branch Field */}
//             <div className="flex flex-col md:col-span-2">
//               <label className="text-gray-900 font-normal">Branch</label>
//               <input
//                 type="text"
//                 value={student.branch}
//                 className={`text-gray-700 rounded-lg p-2 ${
//                   isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-gray-200"
//                 }`}
//                 readOnly
//               />
//             </div>

//             {/* Edit/Save Button */}
//             <div className="flex justify-end md:col-span-2 mt-4">
//               {isEditing ? (
//                 <button
//                   type="submit"
//                   className="bg-blue-950 text-white py-2 px-4 rounded-3xl w-full md:w-1/3"
//                 >
//                   Save
//                 </button>
//               ) : (
//                 <button
//                   type="button"
//                   className="bg-blue-950 text-white py-2 px-4 rounded-3xl w-full md:w-1/3"
//                   onClick={() => setIsEditing(true)}
//                 >
//                   Edit
//                 </button>
//               )}
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentProfileForm;

// //-------------------------------------------------------------------------------------
"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { updateStudent } from "../../_lib/data-service";
import { getStudent } from "../../_lib/data-service";

interface StudentProfileFormProps {
  studentEmail: string;
}

interface StudentData {
  firstName: string;
  lastName: string;
  email: string;
  USN: string;
  phoneNo: string;
  branch: string;
  points: number;
}

const StudentProfileForm: React.FC<StudentProfileFormProps> = ({
  studentEmail,
}) => {
  const [student, setStudent] = useState<StudentData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const data = await getStudentByEmail(studentEmail);
        if (data) {
          setStudent(data);
        } else {
          setErrorMessage("Failed to fetch student data.");
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
        setErrorMessage("Error fetching student data.");
      }
    };

    fetchStudentData();
  }, [studentEmail]);

  const getStudentByEmail = async (email: string) => {
    try {
      const studentData = await getStudent(2); // Dummy call for now
      return studentData;
    } catch (error) {
      console.error("Error fetching student by email:", error);
      return null;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!student) return;
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!student) return;

    const updatedData = {
      USN: student.USN,
      phoneNo: student.phoneNo,
    };

    try {
      const result = await updateStudent(student.email, updatedData);

      if (!result) {
        setErrorMessage("Failed to update Student data.");
      } else {
        console.log("Student data updated successfully:", result);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating student data:", error);
      setErrorMessage("Failed to Update student data.");
    }
  };

  if (!student) {
    return <div className="py-20 text-center">Loading...</div>;
  }

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

export default StudentProfileForm;
