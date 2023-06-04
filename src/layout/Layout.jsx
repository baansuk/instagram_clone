import React, { ReactNode, createContext, useState } from "react";
import Header from "./Header";
import Story from "../components/Story";

export const ModalContext = createContext(undefined);

const Layout = (props) => {
  const [ shortOpen, setShortOpen ] = useState(undefined);
  return (
    <>
        <div className=" w-full min-h-[70vh] mb-[200px] flex flex-col items-center">
          <ModalContext.Provider value={{ shortOpen, setShortOpen }}>
            <div className="w-[470px]">
              <Header />
              {shortOpen === undefined ? (
                <div></div>
              ):(
                <Story user={shortOpen}/>
              )}
              {props.children}
            </div>
          </ModalContext.Provider>
        </div>
    </>
  );
};

export default Layout;