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
      const studentData = await getStudent(2);
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
        setErrorMessage("Failed to update student data.");
      } else {
        console.log("Student data updated successfully:", result);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating student data:", error);
      setErrorMessage("Failed to update student data.");
    }
  };

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <h1 className="text-5xl text-black absolute top-36 left-1/2 transform -translate-x-1/2">
        Student Profile
      </h1>
      <div className="bg-gradient-to-b from-customBlue1 to-customBlue2 shadow-lg rounded-3xl w-2/4 p-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-start mt-4 mr-2 ml-2">
          {/* Profile Picture and Points Section */}
          <div className="bg-white shadow-lg rounded-3xl flex flex-col md:col-span-2 items-center justify-between p-10">
            <Image
              src="/img/studentProfilePic.jpg"
              alt="Profile"
              width={192}
              height={192}
              className="rounded-full mb-10"
            />
            <div className="bg-blue-400 text-white text-lg p-6 rounded-2xl text-center">
              <p className="text-xl font-medium">
                Total Activity Points Earned
              </p>
              <p className="text-6xl font-bold mt-2">{student.points}</p>
            </div>
          </div>

          {/* Student Info Section */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Full Name Field */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-gray-900 font-normal">Full Name</label>
              <input
                type="text"
                value={`${student.firstName} ${student.lastName}`}
                className={`text-gray-700 rounded-lg p-2 ${
                  isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-gray-200"
                }`}
                readOnly
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-gray-900 font-normal">Email</label>
              <input
                type="email"
                value={student.email}
                className={`text-gray-700 rounded-lg p-2 ${
                  isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-gray-200"
                }`}
                readOnly
              />
            </div>

            {/* USN Field */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-gray-900 font-normal">USN</label>
              <input
                type="text"
                name="USN"
                value={student.USN}
                className="text-gray-700 bg-gray-100 rounded-lg p-2"
                readOnly={!isEditing}
                onChange={handleChange}
              />
            </div>

            {/* Phone Number Field */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-gray-900 font-normal">Phone Number</label>
              <input
                type="text"
                name="phoneNo"
                value={student.phoneNo}
                className="text-gray-700 bg-gray-100 rounded-lg p-2"
                readOnly={!isEditing}
                onChange={handleChange}
              />
            </div>

            {/* Branch Field */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-gray-900 font-normal">Branch</label>
              <input
                type="text"
                value={student.branch}
                className={`text-gray-700 rounded-lg p-2 ${
                  isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-gray-200"
                }`}
                readOnly
              />
            </div>

            {/* Edit/Save Button */}
            <div className="flex justify-end md:col-span-2 mt-4">
              {isEditing ? (
                <button
                  type="submit"
                  className="bg-blue-950 text-white py-2 px-4 rounded-3xl w-full md:w-1/3"
                >
                  Save
                </button>
              ) : (
                <button
                  type="button"
                  className="bg-blue-950 text-white py-2 px-4 rounded-3xl w-full md:w-1/3"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileForm;
