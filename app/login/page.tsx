"use client";

import Form from "./form";

// import React, { useState } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// type Credentials = {
//   usn: string;
//   password: string;
// };

// const LoginPage: React.FC = () => {
//   const [credentials, setCredentials] = useState<Credentials>({
//     usn: "",
//     password: "",
//   });
//   const [error, setError] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);

//   const router = useRouter();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     const { name, value } = e.target;
//     setCredentials({ ...credentials, [name]: value });
//   };

//   const handleLogin = async (e: React.FormEvent): Promise<void> => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     const { usn, password } = credentials;

//     if (!usn || !password) {
//       setError("Please fill in all fields.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const result = await signIn("credentials", {
//         redirect: false, // Prevent automatic redirection
//         usn,
//         password,
//       });

//       if (result?.error) {
//         setError("Invalid USN or Password.");
//       } else {
//         alert("Login successful!");
//         router.push("/"); // Redirect on success
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
//           Login
//         </h1>
//         {error && (
//           <p className="text-center text-red-500 font-semibold mb-4">{error}</p>
//         )}
//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label
//               htmlFor="usn"
//               className="block text-gray-700 font-medium mb-2"
//             >
//               USN
//             </label>
//             <input
//               type="text"
//               id="usn"
//               name="usn"
//               value={credentials.usn}
//               onChange={handleChange}
//               placeholder="Enter your USN"
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               required
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="password"
//               className="block text-gray-700 font-medium mb-2"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={credentials.password}
//               onChange={handleChange}
//               placeholder="Enter your password"
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full px-4 py-2 text-white font-bold rounded-lg ${
//               loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
//             } transition`}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//         <p className="text-center text-gray-600 mt-4">
//           Don’t have an account?{" "}
//           <Link href="/signup" className="text-blue-500 hover:underline">
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

export default function LoginPage() {
  return <Form />;
}
