import React from "react";
import Sidebar from "@/app/components/Sidebar/Sidebar";
import TopBar from "@/app/components/Sidebar/TopBar";
import "@/app/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();

  return (      
    <div>
      <TopBar />
      <div>
        <Sidebar /> 
        <section className="mt-[60px] mb-[20px] mx-[20px] bg-whiteColor p-4 rounded">
          {children}
        </section>
      </div>
    </div>
  );
}
