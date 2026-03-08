import React from "react";
import Sidebar from "./sidebar";

const LayoutAdmin = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Sidebar />
      <div className="ml-64 p-5">{children}</div>
    </div>
  );
};

export default LayoutAdmin;
