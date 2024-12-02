"use client";

import React from "react";
import "@/app/globals.css";
import TopBar from "@/app/components/Sidebar/TopBar";
import Sidebar from "@/app/components/Sidebar/Sidebar";

export default function BussinessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* TopBar */}
      <TopBar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Contenido principal */}
        <div
          className="flex-1 ml-[20px] mr-[18px] md:ml-[40px] mt-[40px] p-3"
          // style={{ overflowX: "auto" }}
        >
          <main className="bg-whiteColor p-4 rounded-lg shadow-md">{children}</main>
        </div>
      </div>
    </div>
  );
}
