"use client"; // Ensures this is a client-side component

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

export default Dashboard;
