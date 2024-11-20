// "use client";
// import { Reddit_Sans } from "next/font/google";
// import React, { useState } from "react";

// const redditSans = Reddit_Sans({
//   subsets: ["latin"],
//   weight: ["400", "500", "700"], // Define weights you need for different text elements
// });

// const Page = () => {
//   // Define state for form fields
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     phoneNo: "",
//     branch: "",
//     usn: "",
//   });

//   // Handle input changes
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // You can log form data or send it to an API
//     console.log("Form Data Submitted: ", formData);
//   };

//   return (
//     <div
//       className={`${redditSans.className} flex flex-col justify-center items-center h-screen bg-white`}
//     >
//       {/* Title outside the card and centered */}
//       <p className="text-5xl text-center text-black mb-8 mt-6">
//         Add Board of Directors
//       </p>

//       {/* Card with form inside */}
//       <div className="bg-gradient-to-b from-customBlue1 to-customBlue2 shadow-2xl rounded-3xl w-2/5 p-10">
//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <div className="flex space-x-4">
//             {/* First Name Field */}
//             <div className="w-1/2">
//               <label className="block text-white ">First Name</label>
//               <input
//                 type="text"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleInputChange}
//                 placeholder="John"
//                 className="w-full p-2 mt-2 bg-white rounded-lg text-black shadow-2xl"
//               />
//             </div>
//             {/* Last Name Field */}
//             <div className="w-1/2">
//               <label className="block text-white">Last Name</label>
//               <input
//                 type="text"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleInputChange}
//                 placeholder="Doe"
//                 className="w-full p-2 mt-2 bg-white rounded-lg text-black"
//               />
//             </div>
//           </div>

//           <div className="flex space-x-4">
//             {/* USN Field */}
//             <div className="w-1/2">
//               <label className="block text-white">USN</label>
//               <input
//                 type="text"
//                 name="usn"
//                 value={formData.usn}
//                 onChange={handleInputChange}
//                 placeholder="2GI21CS000"
//                 className="w-full p-2 mt-2 bg-white rounded-lg text-black"
//               />
//             </div>

//             {/* Branch Field */}
//             <div className="w-1/2">
//               <label className="block text-white">Branch</label>
//               <input
//                 type="text"
//                 name="branch"
//                 value={formData.branch}
//                 onChange={handleInputChange}
//                 placeholder="Computer Science"
//                 className="w-full p-2 mt-2 bg-white rounded-lg text-black"
//               />
//             </div>

//             {/* Phone Number Field */}
//             <div className="w-1/2">
//               <label className="block text-white">Phone No.</label>
//               <input
//                 type="tel"
//                 name="phoneNo"
//                 value={formData.phoneNo}
//                 onChange={handleInputChange}
//                 placeholder="9876543210"
//                 className="w-full p-2 mt-2 bg-white rounded-lg text-black"
//               />
//             </div>
//           </div>

//           <div className="flex space-x-4">
//             {/* Email Field */}
//             <div className="w-1/2">
//               <label className="block text-white">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 placeholder="john@gmail.com"
//                 className="w-full p-2 mt-2 bg-white rounded-lg text-black shadow-2xl"
//               />
//             </div>

//             {/* Password Field */}
//             <div className="w-1/2">
//               <label className="block text-white">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 placeholder="••••••••"
//                 className="w-full p-2 mt-2 bg-white rounded-lg text-black shadow-2xl"
//               />
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-center">
//             <button
//               type="submit"
//               className="md:w-1/4 w-full bg-blue-950 text-white p-2 mt-4 rounded-3xl hover:bg-blue-800 transition"
//             >
//               Add New BOD
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Page;

//om's work space
// BodsPage.tsx
"use client";

import React, { useState, useEffect } from "react";
import { addBod, getBods, updateBod } from "@/app/_lib/data-service";

const BodsPage = () => {
  const [bods, setBods] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formType, setFormType] = useState<"add" | "edit">("add");
  const [selectedBod, setSelectedBod] = useState(null);
  const [bodData, setBodData] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNo: "",
    branch: "",
    USN: "",
    clubId: 0,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchBods();
  }, []);

  const fetchBods = async () => {
    try {
      const data = await getBods();
      setBods(data);
    } catch (error) {
      console.error("Error fetching BODs:", error);
    }
  };

  const handleOpenForm = (type: "add" | "edit", bod = null) => {
    setFormType(type);
    setSelectedBod(bod);
    setFormVisible(true);
    if (bod) {
      setBodData({ ...bod });
    } else {
      setBodData({
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNo: "",
        branch: "",
        USN: "",
        clubId: 0,
      });
    }
  };

  const handleCloseForm = () => {
    setFormVisible(false);
    setMessage("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBodData({ ...bodData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (formType === "add") {
        await addBod(bodData);
        setMessage("BOD added successfully!");
      } else if (formType === "edit") {
        await updateBod(bodData.id, bodData);
        setMessage("BOD updated successfully!");
      }
      await fetchBods();
      handleCloseForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Failed to process the request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
   
      <div className="max-w-7xl mx-auto pt-8 px-4 pb-6">
        <h1 className="text-3xl text-center font-bold mb-4 text-black">BOD Management</h1>

        <button
          className="mb-4 px-4 py-2 bg-gradient-to-t from-blue-700 to-cyan-500 text-white rounded-lg"
          onClick={() => handleOpenForm("add")}
        >
          Add New BOD
        </button>

        {message && <p className="text-center my-4">{message}</p>}

        <table className="text-black w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">First Name</th>
              <th className="border border-gray-300 px-4 py-2">Last Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Password</th>
              <th className="border border-gray-300 px-4 py-2">Phone No</th>
              <th className="border border-gray-300 px-4 py-2">Branch</th>
              <th className="border border-gray-300 px-4 py-2">USN</th>
              <th className="border border-gray-300 px-4 py-2">Club ID</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bods.map((bod) => (
              <tr key={bod.id}>
                <td className="border border-gray-300 px-4 py-2">{bod.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {bod.firstName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {bod.lastName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {bod.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {bod.password}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {bod.phoneNo}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {bod.branch}
                </td>
                <td className="border border-gray-300 px-4 py-2">{bod.USN}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {bod.clubId}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="mr-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    onClick={() => handleOpenForm("edit", bod)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {formVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-120">
              <h2 className="text-xl font-bold mb-4">
                {formType === "add" ? "Add New BOD" : "Edit BOD"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    name="id"
                    value={bodData.id}
                    onChange={handleChange}
                    placeholder="BOD ID"
                    required
                    disabled={formType === "edit"}
                    className="w-full px-3 py-2 border rounded"
                  />
                  <input
                    type="text"
                    name="firstName"
                    value={bodData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                    className="w-full px-3 py-2 border rounded"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={bodData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                    className="w-full px-3 py-2 border rounded"
                  />
                  <input
                    type="email"
                    name="email"
                    value={bodData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="w-full px-3 py-2 border rounded"
                  />
                  <input
                    type="password"
                    name="password"
                    value={bodData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    className="w-full px-3 py-2 border rounded"
                  />
                  <input
                    type="text"
                    name="phoneNo"
                    value={bodData.phoneNo}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    className="w-full px-3 py-2 border rounded"
                  />
                  <input
                    type="text"
                    name="branch"
                    value={bodData.branch}
                    onChange={handleChange}
                    placeholder="Branch"
                    required
                    className="w-full px-3 py-2 border rounded"
                  />
                  <input
                    type="text"
                    name="USN"
                    value={bodData.USN}
                    onChange={handleChange}
                    placeholder="USN"
                    required
                    className="w-full px-3 py-2 border rounded"
                  />
                  <input
                    type="number"
                    name="clubId"
                    value={bodData.clubId}
                    onChange={handleChange}
                    placeholder="Club ID"
                    required
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded"
                  disabled={loading}
                >
                  {loading
                    ? "Submitting..."
                    : formType === "add"
                    ? "Add BOD"
                    : "Update BOD"}
                </button>
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="mt-2 w-full px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    
  );
};

export default BodsPage;
