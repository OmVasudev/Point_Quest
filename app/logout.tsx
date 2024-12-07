"use client";

import { signOut } from "next-auth/react";

export default function Logout() {
  return (
<span
  className="relative inline-block px-3 py-1 text-red-500 font-medium cursor-pointer group no-underline"
  onClick={() => {
    signOut();
  }}
>
  <span className="absolute inset-0 transition-transform transform scale-x-0 bg-gray-200 rounded-lg group-hover:scale-x-100 group-hover:opacity-70 duration-300"></span>
  <span className="relative">Logout</span>
</span>



  );
}
