// import type { Metadata } from "next";
// // import localFont from "next/font/local";
// import "./globals.css";
// import Navbar from "./_components/Navbar";
// import Footer from "./_components/Footer";
// import { getServerSession } from "next-auth";
// import LoginPage from "./login/page";
// import NavbarLogin from "./_components/NavbarLogin";

// export const metadata: Metadata = {
//   title: "Point Quest",
//   description: "Centralized Platform of College Club Activities",
// };

// export default async function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const session = await getServerSession();

//   return (
//     <html lang="en">
//       <head></head>
//       <body>
//         {session ? (
//           <>
//             <Navbar />
//             {children}
//             <Footer />
//           </>
//         ) : (
//           <>
//           <NavbarLogin/>
//           <LoginPage />
//           <Footer/>
//           </>
//         )}
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import NavbarLogin from "./_components/NavbarLogin";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Point Quest",
  description: "Centralized Platform of College Club Activities",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession();

  
  if (!session) {
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

  return (
    <html lang="en">
      <head></head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

