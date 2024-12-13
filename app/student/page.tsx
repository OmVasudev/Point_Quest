"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session } = useSession();

  // Check if the session data is available
  if (!session || !session.user) {
    // return <p>You need to be logged in to view this content.</p>;

    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <p className="text-center text-4xl font-extrabold uppercase tracking-widest text-red-600">
          You need to be logged in to view this content.
        </p>
      </div>
    );
  }

  // Type assertion for `session.user` to access `id` safely
  const userId = session.user.id;

  // Print the user ID to the console
  console.log("User ID:", userId);

  return (
    // <div>
    //   <h2>Welcome to your Dashboard</h2>
    //   <p>User ID: {userId}</p> {/* Display the ID on the page */}
    // </div>

    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <h2 className="mb-6 font-primary text-7xl font-extrabold text-customBlue1">
        Welcome User
      </h2>
      <p className="text-2xl font-medium text-gray-700">
        User ID:{" "}
        <span className="text-xl font-semibold text-indigo-500">{userId}</span>
      </p>
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
