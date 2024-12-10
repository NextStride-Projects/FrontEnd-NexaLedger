"use client";

import React from "react";
import { HiLogout } from "react-icons/hi";
import { useRouter } from "next/navigation";
import Button from "../Button/Button";

const TopBar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout");
    router.push("/login");
  };

  return (
    <div
      className="bg-primaryColor text-white flex items-center"
      style={{
        width: "100%",
        height: "50px",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <div className="justify-between flex w-full px-5 ml-[40px]">
        <h1 className="font-bold text-lg">NexaLedger</h1>

        <Button
          className="font-bold py-1 px-3 flex border-none items-center gap-2"
          onClick={handleLogout}
          label={<HiLogout className="text-xl" />}
          variant="primary"
        />
      </div>
    </div>
  );
};

export default TopBar;
