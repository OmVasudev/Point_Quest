// "use client";

// import React, { useState, useEffect } from "react";
// import { addBod, getBods, updateBod } from "@/app/_lib/data-service";

// const BodsPage = () => {
//   const [bods, setBods] = useState([]);
//   const [formVisible, setFormVisible] = useState(false);
//   const [formType, setFormType] = useState<"add" | "edit">("add");
//   const [selectedBod, setSelectedBod] = useState(null);
//   const [bodData, setBodData] = useState({
//     id: 0,
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     phoneNo: "",
//     branch: "",
//     USN: "",
//     clubId: 0,
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     fetchBods();
//   }, []);

//   const fetchBods = async () => {
//     try {
//       const data = await getBods();
//       setBods(data);
//     } catch (error) {
//       console.error("Error fetching BODs:", error);
//     }
//   };

//   const handleOpenForm = (type: "add" | "edit", bod = null) => {
//     setFormType(type);
//     setSelectedBod(bod);
//     setFormVisible(true);
//     if (bod) {
//       setBodData({ ...bod });
//     } else {
//       setBodData({
//         id: 0,
//         firstName: "",
//         lastName: "",
//         email: "",
//         password: "",
//         phoneNo: "",
//         branch: "",
//         USN: "",
//         clubId: 0,
//       });
//     }
//   };

//   const handleCloseForm = () => {
//     setFormVisible(false);
//     setMessage("");
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setBodData({ ...bodData, [name]: value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       if (formType === "add") {
//         await addBod(bodData);
//         setMessage("BOD added successfully!");
//       } else if (formType === "edit") {
//         await updateBod(bodData.id, bodData);
//         setMessage("BOD updated successfully!");
//       }
//       await fetchBods();
//       handleCloseForm();
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       setMessage("Failed to process the request. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mx-auto max-w-7xl px-4 pb-6 pt-8">
//       <h1 className="mb-4 text-center text-3xl font-bold text-black">
//         BOD Management
//       </h1>

//       <button
//         className="mb-4 rounded-lg bg-gradient-to-t from-blue-700 to-cyan-500 px-4 py-2 text-white"
//         onClick={() => handleOpenForm("add")}
//       >
//         Add New BOD
//       </button>

//       {message && <p className="my-4 text-center">{message}</p>}

//       <table className="w-full border-collapse border border-gray-300 text-black">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border border-gray-300 px-4 py-2">ID</th>
//             <th className="border border-gray-300 px-4 py-2">First Name</th>
//             <th className="border border-gray-300 px-4 py-2">Last Name</th>
//             <th className="border border-gray-300 px-4 py-2">Email</th>
//             <th className="border border-gray-300 px-4 py-2">Password</th>
//             <th className="border border-gray-300 px-4 py-2">Phone No</th>
//             <th className="border border-gray-300 px-4 py-2">Branch</th>
//             <th className="border border-gray-300 px-4 py-2">USN</th>
//             <th className="border border-gray-300 px-4 py-2">Club ID</th>
//             <th className="border border-gray-300 px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bods.map((bod) => (
//             <tr key={bod.id}>
//               <td className="border border-gray-300 px-4 py-2">{bod.id}</td>
//               <td className="border border-gray-300 px-4 py-2">
//                 {bod.firstName}
//               </td>
//               <td className="border border-gray-300 px-4 py-2">
//                 {bod.lastName}
//               </td>
//               <td className="border border-gray-300 px-4 py-2">{bod.email}</td>
//               <td className="border border-gray-300 px-4 py-2">
//                 {bod.password}
//               </td>
//               <td className="border border-gray-300 px-4 py-2">
//                 {bod.phoneNo}
//               </td>
//               <td className="border border-gray-300 px-4 py-2">{bod.branch}</td>
//               <td className="border border-gray-300 px-4 py-2">{bod.USN}</td>
//               <td className="border border-gray-300 px-4 py-2">{bod.clubId}</td>
//               <td className="border border-gray-300 px-4 py-2">
//                 <button
//                   className="mr-2 rounded-lg bg-blue-600 px-3 py-1 text-white transition hover:bg-blue-700"
//                   onClick={() => handleOpenForm("edit", bod)}
//                 >
//                   Edit
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {formVisible && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="w-120 rounded-lg bg-white p-6 shadow-lg">
//             <h2 className="mb-4 text-xl font-bold">
//               {formType === "add" ? "Add New BOD" : "Edit BOD"}
//             </h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <input
//                   type="number"
//                   name="id"
//                   value={bodData.id}
//                   onChange={handleChange}
//                   placeholder="BOD ID"
//                   required
//                   disabled={formType === "edit"}
//                   className="w-full rounded border px-3 py-2"
//                 />
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={bodData.firstName}
//                   onChange={handleChange}
//                   placeholder="First Name"
//                   required
//                   className="w-full rounded border px-3 py-2"
//                 />
//                 <input
//                   type="text"
//                   name="lastName"
//                   value={bodData.lastName}
//                   onChange={handleChange}
//                   placeholder="Last Name"
//                   required
//                   className="w-full rounded border px-3 py-2"
//                 />
//                 <input
//                   type="email"
//                   name="email"
//                   value={bodData.email}
//                   onChange={handleChange}
//                   placeholder="Email"
//                   required
//                   className="w-full rounded border px-3 py-2"
//                 />
//                 <input
//                   type="password"
//                   name="password"
//                   value={bodData.password}
//                   onChange={handleChange}
//                   placeholder="Password"
//                   required
//                   className="w-full rounded border px-3 py-2"
//                 />
//                 <input
//                   type="text"
//                   name="phoneNo"
//                   value={bodData.phoneNo}
//                   onChange={handleChange}
//                   placeholder="Phone Number"
//                   required
//                   className="w-full rounded border px-3 py-2"
//                 />
//                 <input
//                   type="text"
//                   name="branch"
//                   value={bodData.branch}
//                   onChange={handleChange}
//                   placeholder="Branch"
//                   required
//                   className="w-full rounded border px-3 py-2"
//                 />
//                 <input
//                   type="text"
//                   name="USN"
//                   value={bodData.USN}
//                   onChange={handleChange}
//                   placeholder="USN"
//                   required
//                   className="w-full rounded border px-3 py-2"
//                 />
//                 <input
//                   type="number"
//                   name="clubId"
//                   value={bodData.clubId}
//                   onChange={handleChange}
//                   placeholder="Club ID"
//                   required
//                   className="w-full rounded border px-3 py-2"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="w-full rounded bg-blue-600 px-4 py-2 text-white"
//                 disabled={loading}
//               >
//                 {loading
//                   ? "Submitting..."
//                   : formType === "add"
//                     ? "Add BOD"
//                     : "Update BOD"}
//               </button>
//               <button
//                 type="button"
//                 onClick={handleCloseForm}
//                 className="mt-2 w-full rounded bg-gray-500 px-4 py-2 text-white"
//               >
//                 Cancel
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BodsPage;

"use client";

import React, { useState, useEffect } from "react";
import {
  addBod,
  getBods,
  updateBod,
  getClubNames,
} from "@/app/_lib/data-service";

const BodsPage = () => {
  const [bods, setBods] = useState([]);
  const [clubNames, setClubNames] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formType, setFormType] = useState<"add" | "edit">("add");
  const [selectedBod, setSelectedBod] = useState(null);
  const [bodData, setBodData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNo: "",
    branch: "",
    USN: "",
    clubId: 0,
    passingYear: "", // Add passingYear field here
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchBods();
    fetchClubNames();
  }, []);

  const fetchBods = async () => {
    try {
      const data = await getBods();
      const bodsWithClubNames = await Promise.all(
        data.map(async (bod) => {
          const clubData = await getClubNames();
          const clubName =
            clubData.find((club) => club.id === bod.clubId)?.name || "Unknown";
          return { ...bod, clubName };
        }),
      );
      setBods(bodsWithClubNames);
    } catch (error) {
      console.error("Error fetching BODs:", error);
    }
  };

  const fetchClubNames = async () => {
    try {
      const data = await getClubNames();
      setClubNames(data);
    } catch (error) {
      console.error("Error fetching clubs:", error);
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
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNo: "",
        branch: "",
        USN: "",
        clubId: 0,
        passingYear: "", // Reset passingYear field
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

  const handleClubChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClubId = parseInt(e.target.value);
    setBodData({ ...bodData, clubId: selectedClubId });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Call the API route to hash the password
      const response = await fetch(`/api/auth/hash-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: bodData.password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error hashing password:", errorData.message);
        setMessage("Error hashing password. Please try again.");
        return;
      }

      const { hashedPassword } = await response.json();

      // Prepare the data to submit with the hashed password
      const dataToSubmit = { ...bodData, password: hashedPassword };

      if (formType === "add") {
        await addBod(dataToSubmit); // Add new BOD with hashed password
        setMessage("BOD added successfully!");
      } else if (formType === "edit") {
        await updateBod(dataToSubmit.id, {
          firstName: dataToSubmit.firstName,
          lastName: dataToSubmit.lastName,
          email: dataToSubmit.email,
          phoneNo: dataToSubmit.phoneNo,
          branch: dataToSubmit.branch,
          USN: dataToSubmit.USN,
          clubId: dataToSubmit.clubId,
          password: dataToSubmit.password,
          passingYear: dataToSubmit.passingYear, // Include passingYear when updating
        });
        setMessage("BOD updated successfully!");
      }

      await fetchBods();
      handleCloseForm();
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setMessage("Failed to process the request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-6 pt-8">
      <h1 className="mb-4 text-center text-3xl font-bold text-black">
        BOD Management
      </h1>

      <button
        className="mb-4 rounded-lg bg-gradient-to-t from-blue-700 to-cyan-500 px-4 py-2 text-white"
        onClick={() => handleOpenForm("add")}
      >
        Add New BOD
      </button>

      {message && <p className="my-4 text-center">{message}</p>}

      <table className="w-full border-collapse border border-gray-300 text-black">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">First Name</th>
            <th className="border border-gray-300 px-4 py-2">Last Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Phone No</th>
            <th className="border border-gray-300 px-4 py-2">Branch</th>
            <th className="border border-gray-300 px-4 py-2">USN</th>
            <th className="border border-gray-300 px-4 py-2">Club Name</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bods.map((bod) => (
            <tr key={bod.id}>
              <td className="border border-gray-300 px-4 py-2">
                {bod.firstName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {bod.lastName}
              </td>
              <td className="border border-gray-300 px-4 py-2">{bod.email}</td>
              <td className="border border-gray-300 px-4 py-2">
                {bod.phoneNo}
              </td>
              <td className="border border-gray-300 px-4 py-2">{bod.branch}</td>
              <td className="border border-gray-300 px-4 py-2">{bod.USN}</td>
              <td className="border border-gray-300 px-4 py-2">
                {bod.clubName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="mr-2 rounded-lg bg-blue-600 px-3 py-1 text-white transition hover:bg-blue-700"
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
          <div className="w-120 rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">
              {formType === "add" ? "Add New BOD" : "Edit BOD"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  value={bodData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  required
                  className="w-full rounded border px-3 py-2"
                />
                <input
                  type="text"
                  name="lastName"
                  value={bodData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  required
                  className="w-full rounded border px-3 py-2"
                />
                <input
                  type="email"
                  name="email"
                  value={bodData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="w-full rounded border px-3 py-2"
                />
                <input
                  type="password"
                  name="password"
                  value={bodData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  className="w-full rounded border px-3 py-2"
                />
                <input
                  type="text"
                  name="phoneNo"
                  value={bodData.phoneNo}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                  className="w-full rounded border px-3 py-2"
                />
                <input
                  type="text"
                  name="branch"
                  value={bodData.branch}
                  onChange={handleChange}
                  placeholder="Branch"
                  required
                  className="w-full rounded border px-3 py-2"
                />
                <input
                  type="text"
                  name="USN"
                  value={bodData.USN}
                  onChange={handleChange}
                  placeholder="USN"
                  required
                  className="w-full rounded border px-3 py-2"
                />
                <input
                  type="text"
                  name="passingYear"
                  value={bodData.passingYear}
                  onChange={handleChange}
                  placeholder="Passing Year"
                  required
                  className="w-full rounded border px-3 py-2"
                />
                {/* Dropdown for selecting the club */}
                <select
                  name="clubId"
                  value={bodData.clubId}
                  onChange={handleClubChange}
                  required
                  className="w-full rounded border px-3 py-2"
                >
                  <option value={0}>Select a Club</option>
                  {clubNames.map((club) => (
                    <option key={club.id} value={club.id}>
                      {club.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full rounded bg-blue-600 px-4 py-2 text-white"
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
                className="mt-2 w-full rounded bg-gray-500 px-4 py-2 text-white"
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
