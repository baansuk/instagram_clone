import { ReactNode, createContext, useState } from "react";
import Header from "./Header";

const Layout = (props) => {
  return (
    <>
        <div className=" w-full min-h-[70vh] flex flex-col items-center">
          <div className="w-[470px]">
          <Header />
          {props.children}
          </div>
        </div>
    </>
  );
};

export default Layout;