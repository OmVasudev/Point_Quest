// import type { Metadata } from "next";
// import "./globals.css";
// import Navbar from "./_components/Navbar";
// import Footer from "./_components/Footer";
// import NavbarLogin from "./_components/NavbarLogin";
// import { getServerSession } from "next-auth";

// export const metadata: Metadata = {
//   title: "Point Quest",
//   description: "Centralized Platform of College Club Activities",
// };

// export default async function RootLayout({
//   children,
// }: Readonly<{ children: React.ReactNode }>) {
//   const session = await getServerSession();

//   if (!session) {
//     return (
//       <html lang="en">
//         <head></head>
//         <body>
//           <NavbarLogin />
//           {children}
//           <Footer />
//         </body>
//       </html>
//     );
//   }

//   return (
//     <html lang="en">
//       <head></head>
//       <body>
//         <Navbar />
//         {children}
//         <Footer />
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import NavbarLogin from "./_components/NavbarLogin";
import NavbarBOD from "./_components/NavbarBOD"; // Import Navbar for BOD
import NavbarAdmin from "./_components/NavbarAdmin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Import your auth options for server session

export const metadata: Metadata = {
  title: "Point Quest",
  description: "Centralized Platform of College Club Activities",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.role) {
    return (
      <html lang="en">
        <head></head>
        <body>
          <NavbarLogin />
          {children}
          <Footer />
        </body>
      </html>
    );
  }

  // Safely handle the role property
  const renderNavbar = () => {
    if (session.user.role === "bod") {
      return <NavbarBOD />; // Navbar for BOD
    } else if (session.user.role === "admin") {
      return <NavbarAdmin />; // Navbar for Admin
    } else {
      return <Navbar />; // Default Navbar for other roles, e.g. student
    }
  };

  return (
    <html lang="en">
      <head></head>
      <body>
        {renderNavbar()}
        {children}
        <Footer />
      </body>
    </html>
  );
}
