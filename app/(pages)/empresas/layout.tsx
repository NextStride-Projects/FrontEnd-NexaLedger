"use client";

import React from "react";
import "@/app/globals.css";
import TopBar from "@/app/components/Sidebar/TopBar";
import Sidebar from "@/app/components/Sidebar/Sidebar";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <TopBar />
      {/* // <div className="flex"> */}
        <Sidebar />
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <main className="flex-1 max-w-md bg-white p-6 rounded shadow-md">
        {children}
      </main>
    </div>
    </>
  );
}