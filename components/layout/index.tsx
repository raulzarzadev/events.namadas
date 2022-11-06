import Breadcrumb from "@comps/Breadcrumb";
import React from "react";
import Nav from "./nav";
export interface LayoutProps {
  children: React.ReactNode;
}
function Layout({ children }: LayoutProps) {
  
  return (
    <div>
      <Nav />
      <div className="sticky top-0 bg-base-100 z-10">
      <Breadcrumb/>
      </div>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
