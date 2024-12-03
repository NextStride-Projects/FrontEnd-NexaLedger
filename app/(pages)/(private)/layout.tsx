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
        <section>
        {/* mt-[30px] ml-[40px] */}
          {children}
        </section>
      </div>
    </div>
  );
}
