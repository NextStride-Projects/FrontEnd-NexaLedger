import React from "react";

const TopBar = () => {
  return (
    <div
      className="bg-primaryColor text-white flex items-center justify-center"
      style={{ width: "100%", height: "40px", position: "fixed", top: 0, left: 0 }}
    >
      <h1 className="font-bold text-lg">NexaLedger</h1>
    </div>
  );
};

export default TopBar;
