"use client";
import React, { useState, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
// import StudentProfileForm from "./useid";

import { getStudent } from "@/app/_lib/data-service";
import StudentProfileContent from "./proFrom";

const StudentProfileForm = ({ userId }) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch student data on component mount
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const studentData = await getStudent(userId);
        setStudent(studentData);
      } catch (err) {
        setError("Failed to fetch student data");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchStudentData();
    }
  }, [userId]); // Only re-fetch when userId changes

  // If data is still loading, show loading message
  if (loading) {
    return <p>Loading student profile...</p>;
  }

  // If there is an error fetching data, display error message
  if (error) {
    return <p>{error}</p>;
  }

  return student ? <StudentProfileContent initialStudent={student} /> : null;
};

const Dashboard = () => {
  const { data: session } = useSession();

  // Check if the session data is available
  if (!session || !session.user) {
    return <p>You need to be logged in to view this content.</p>;
  }

  // Type assertion for `session.user` to access `id` safely
  const userId = session.user.id;

  // Print the user ID to the console
  console.log("User ID:", userId);

  return (
    <div>
      <StudentProfileForm userId={Number(userId)} />{" "}
    </div>
  );
};

const DashboardWrapper = () => {
  return (
    <SessionProvider>
      <Dashboard />
    </SessionProvider>
  );
};

export default DashboardWrapper;

// import React from "react";

// export default function page() {
//   return (
//     <div>
//       <h1>profile in progressn</h1>
//     </div>
//   );
// }
