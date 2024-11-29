import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { getServerSession } from "next-auth";
import Link from "next/link";
import LoginPage from "./login/page";

export const metadata: Metadata = {
  title: "Point Quest",
  description: "Centralized Platform of College Club Activities",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <head></head>
      <body>
        {session ? (
          <>
            <Navbar />
            {children}
            <Footer />
          </>
        ) : (
          <LoginPage />
        )}
      </body>
    </html>
  );
}
