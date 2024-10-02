import { Header } from "@/components/layout/header";
import { SideBar } from "@/components/layout/Sidebar";
import React from "react";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header></Header>
      <div className="flex">
        <SideBar></SideBar>
        {children}
      </div>
    </div>
  );
}
