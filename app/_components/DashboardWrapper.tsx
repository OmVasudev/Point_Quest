// components/DashboardWrapper.tsx

"use client";

import { SessionProvider } from "next-auth/react";
import Dashboard from "../_components/Dashboard"; // Adjust the path if needed

const DashboardWrapper = () => {
  return (
    <SessionProvider>
      <Dashboard />
    </SessionProvider>
  );
};

export default DashboardWrapper;
