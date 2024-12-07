import React from "react";

const page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="max-w-xl text-center">
        {/* Larger and responsive heading */}
        <h1 className="mb-4 font-primary text-6xl font-bold text-blue-500 md:text-7xl">
          Faculty Portal
        </h1>

        {/* Responsive description */}
        <p className="mb-6 text-base text-gray-600 sm:text-lg">
          Access and manage all student-related details seamlessly in one place.
        </p>

        {/* Responsive button */}
        <button className="rounded-full bg-gradient-to-t from-blue-700 to-cyan-500 px-6 py-2 text-base font-semibold text-white shadow-md hover:from-cyan-500 hover:to-blue-600  sm:px-8 sm:py-3 sm:text-lg">
          View Student Details
        </button>
      </div>
    </div>
  );
};

export default page;
