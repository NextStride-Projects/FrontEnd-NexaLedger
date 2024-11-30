"use client";

import React from "react";
import "@/app/globals.css";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <main className="flex-1 max-w-md bg-white p-6 rounded shadow-md">
        {children}
      </main>
    </div>
  );
}