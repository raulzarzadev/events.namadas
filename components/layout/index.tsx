import Breadcrumb from '@comps/Breadcrumb';
import React from 'react';
import Nav from './nav';
export interface LayoutProps {
  children: React.ReactNode;
}
function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Nav />
      <div className="sticky -top-1 bg-base-100 z-10 ml-1 pl-1">
        <Breadcrumb />
      </div>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
