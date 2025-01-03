
import React from "react";
import "@/app/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();

  return (
    <html>
      <body>
        <div className="antialiased bg-gray-200 flex flex-col min-h-screen">
          <div className="flex">
            <main className="flex-1 ">
              {children}
            </main>
          </div>
          <footer className="bg-primaryColor text-white text-center py-2 mt-auto" style={{ width: "100%" }}>
            <p style={{ fontSize: "13px" }}>
              &copy; {currentYear} NexaLedger. All rights reserved.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
