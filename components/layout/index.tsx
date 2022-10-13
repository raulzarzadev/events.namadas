import { authStateChanged } from "@firebase/Users/main";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthState } from "store/slices/authSlice";
import Nav from "./nav";
export interface LayoutProps {
  children: React.ReactNode;
}
function Layout({ children }: LayoutProps) {
    const dispatch = useDispatch();
    useEffect(() => {
      authStateChanged((res: any) => {
        dispatch(setAuthState(res));
      });
    }, []);
  return (
    <div>
      <Nav />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
