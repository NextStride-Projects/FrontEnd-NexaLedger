"use client";

import React from "react";
import "@/app/globals.css";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <main className="">
        {children}
      </main>
    </div>
  );
}