"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";

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
      <h2>Welcome to your Dashboard</h2>
      <p>User ID: {userId}</p> {/* Display the ID on the page */}
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
