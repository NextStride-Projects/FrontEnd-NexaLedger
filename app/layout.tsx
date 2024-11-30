"use client";

import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import TopBar from "./components/Sidebar/TopBar";
import "@/app/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const currentYear = new Date().getFullYear();

  return (
    <html lang="en">
      <body className="antialiased bg-gray-200 flex flex-col min-h-screen">
        <TopBar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 mt-[30px] ml-[40px]">
            {children}
          </main>
        </div>
        <footer className="bg-primaryColor text-white text-center py-4 mt-auto" style={{ width: "100%" }}>
          <p>&copy; {currentYear} Your Company. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
