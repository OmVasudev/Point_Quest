// "use client";
// import React, { useState, useEffect } from "react";
// import { getStudent, updateStudent } from "@/app/_lib/data-service";

// const UserIcon = (props) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     {...props}
//   >
//     <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
//     <circle cx="12" cy="7" r="4" />
//   </svg>
// );

// const EditIcon = (props) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     {...props}
//   >
//     <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
//     <path d="m15 5 4 4" />
//   </svg>
// );

// const StudentProfileContent = ({ userId }) => {
//   const [profile, setProfile] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [updatedProfile, setUpdatedProfile] = useState({});
//   const [isSaving, setIsSaving] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchStudentProfile = async () => {
//       try {
//         const studentId = userId;
//         const data = await getStudent(studentId);
//         setProfile(data);
//         setUpdatedProfile(data);
//       } catch (error) {
//         console.error("Error fetching student profile:", error);
//         setError("Failed to load student profile");
//       }
//     };

//     fetchStudentProfile();
//   }, [userId]);

//   const handleEditToggle = () => {
//     setIsEditing(!isEditing);
//     setError(null); // Clear any previous errors
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedProfile((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleUpdate = async () => {
//     setIsSaving(true);
//     setError(null);
//     try {
//       // Validate required fields
//       if (
//         !updatedProfile.firstName ||
//         !updatedProfile.lastName ||
//         !updatedProfile.phoneNo
//       ) {
//         throw new Error("First Name, Last Name, and Phone Number are required");
//       }

//       const updatedData = await updateStudent(userId, updatedProfile);

//       setProfile(updatedData);
//       setUpdatedProfile(updatedData);
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       setError(error.message || "Failed to update profile");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   if (!profile) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         <div className="animate-pulse text-xl text-gray-500">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
//       <div className="flex w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl">
//         {/* Profile Image Section */}
//         <div className="relative flex w-1/3 flex-col items-center justify-center bg-gradient-to-br from-blue-700 to-cyan-500 p-8">
//           <div className="mb-6 h-48 w-48 overflow-hidden rounded-full border-4 border-white shadow-lg">
//             <img
//               src={profile.profileImage || "/api/placeholder/400/400"}
//               alt="Profile"
//               className="h-full w-full object-cover"
//             />
//           </div>
//         </div>

//         {/* Profile Details Section */}
//         <div className="w-2/3 p-8">
//           <div className="mb-6 flex items-center justify-between">
//             <h2 className="text-3xl font-bold text-gray-800">
//               Student Profile
//             </h2>
//             <UserIcon className="h-10 w-10 text-blue-500" />
//           </div>

//           {/* Error Message */}
//           {error && (
//             <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">
//               {error}
//             </div>
//           )}

//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//             {[
//               { label: "First Name", name: "firstName" },
//               { label: "Last Name", name: "lastName" },
//               { label: "Email", name: "email", readOnly: true },
//               { label: "Phone", name: "phoneNo" },
//               { label: "Branch", name: "branch", readOnly: true },
//               {
//                 label: "Points",
//                 name: "points",
//                 readOnly: true,
//                 type: "number",
//               },
//             ].map(({ label, name, readOnly, type = "text" }) => (
//               <div key={name} className="relative">
//                 <label
//                   htmlFor={name}
//                   className="mb-2 block text-sm font-medium text-gray-700"
//                 >
//                   {label}
//                 </label>
//                 {isEditing && !readOnly ? (
//                   <input
//                     type={type}
//                     id={name}
//                     name={name}
//                     value={updatedProfile[name] || ""}
//                     onChange={handleChange}
//                     className="w-full rounded-lg border border-gray-300 px-4 py-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 ) : (
//                   <div className="w-full rounded-lg bg-gray-100 px-4 py-2 text-gray-800">
//                     {profile[name]}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="mt-8 flex space-x-4">
//             {isEditing ? (
//               <>
//                 <button
//                   onClick={handleUpdate}
//                   disabled={isSaving}
//                   className="flex items-center space-x-2 rounded-lg bg-green-500 px-6 py-2 text-white transition-colors duration-300 hover:bg-green-600 disabled:opacity-50"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="h-5 w-5"
//                   >
//                     <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
//                     <polyline points="17 21 17 13 7 13 7 21" />
//                     <polyline points="7 3 7 8 15 8" />
//                   </svg>
//                   <span>{isSaving ? "Saving..." : "Save"}</span>
//                 </button>
//                 <button
//                   onClick={handleEditToggle}
//                   className="flex items-center space-x-2 rounded-lg border border-gray-300 px-6 py-2 text-gray-700 transition-colors duration-300 hover:bg-gray-100"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="h-5 w-5"
//                   >
//                     <line x1="18" y1="6" x2="6" y2="18" />
//                     <line x1="6" y1="6" x2="18" y2="18" />
//                   </svg>
//                   <span>Cancel</span>
//                 </button>
//               </>
//             ) : (
//               <button
//                 onClick={handleEditToggle}
//                 className="flex items-center space-x-2 rounded-lg bg-blue-500 px-6 py-2 text-white transition-colors duration-300 hover:bg-blue-600"
//               >
//                 <EditIcon className="h-5 w-5" />
//                 <span>Edit Profile</span>
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentProfileContent;

"use client";
import React, { useState, useEffect } from "react";
import { getStudent, updateStudent } from "@/app/_lib/data-service";

const EditIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    <path d="m15 5 4 4" />
  </svg>
);

const StudentProfileContent = ({ userId }) => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        const studentId = userId;
        const data = await getStudent(studentId);
        setProfile(data);
        setUpdatedProfile(data);
      } catch (error) {
        console.error("Error fetching student profile:", error);
        setError("Failed to load student profile");
      }
    };

    fetchStudentProfile();
  }, [userId]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setError(null); // Clear any previous errors
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    setIsSaving(true);
    setError(null);
    try {
      // Validate required fields
      if (
        !updatedProfile.firstName ||
        !updatedProfile.lastName ||
        !updatedProfile.phoneNo
      ) {
        throw new Error("First Name, Last Name, and Phone Number are required");
      }

      const updatedData = await updateStudent(userId, updatedProfile);

      setProfile(updatedData);
      setUpdatedProfile(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (!profile) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-pulse text-xl text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Profile Image Section */}
        <div className="relative flex w-1/3 flex-col items-center justify-center bg-gradient-to-br from-blue-700 to-cyan-500 p-8">
          <div className="mb-6 h-48 w-48 overflow-hidden rounded-full border-4 border-white shadow-lg">
            {/* Display student's image here */}
            <img
              src={profile.image || "/api/placeholder/400/400"} // Fallback to placeholder if image not available
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Profile Details Section */}
        <div className="w-2/3 p-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-800">
              Student Profile
            </h2>
            {/* Replace UserIcon with student's image */}
            <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-blue-500">
              <img
                src={profile.image || "/api/placeholder/400/400"}
                alt="Student"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              { label: "First Name", name: "firstName" },
              { label: "Last Name", name: "lastName" },
              { label: "Email", name: "email", readOnly: true },
              { label: "Phone", name: "phoneNo" },
              { label: "Branch", name: "branch", readOnly: true },
              {
                label: "Points",
                name: "points",
                readOnly: true,
                type: "number",
              },
            ].map(({ label, name, readOnly, type = "text" }) => (
              <div key={name} className="relative">
                <label
                  htmlFor={name}
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  {label}
                </label>
                {isEditing && !readOnly ? (
                  <input
                    type={type}
                    id={name}
                    name={name}
                    value={updatedProfile[name] || ""}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="w-full rounded-lg bg-gray-100 px-4 py-2 text-gray-800">
                    {profile[name]}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 flex space-x-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleUpdate}
                  disabled={isSaving}
                  className="flex items-center space-x-2 rounded-lg bg-green-500 px-6 py-2 text-white transition-colors duration-300 hover:bg-green-600 disabled:opacity-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                    <polyline points="7 3 7 8 15 8" />
                  </svg>
                  <span>{isSaving ? "Saving..." : "Save"}</span>
                </button>
                <button
                  onClick={handleEditToggle}
                  className="flex items-center space-x-2 rounded-lg border border-gray-300 px-6 py-2 text-gray-700 transition-colors duration-300 hover:bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  <span>Cancel</span>
                </button>
              </>
            ) : (
              <button
                onClick={handleEditToggle}
                className="flex items-center space-x-2 rounded-lg bg-blue-500 px-6 py-2 text-white transition-colors duration-300 hover:bg-blue-600"
              >
                <EditIcon className="h-5 w-5" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileContent;
