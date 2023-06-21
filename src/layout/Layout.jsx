import React, { ReactNode, createContext, useState } from "react";
import Header from "./Header";
import Modal from "../components/Modal";

export const ModalContext = createContext(undefined);

const Layout = (props) => {
  const [ modalOpen, setModalOpen ] = useState(undefined);
  return (
    <>
        <div className=" w-full min-h-[70vh] mb-[200px] flex flex-col items-center">
          <ModalContext.Provider value={{ modalOpen, setModalOpen }}>
            <div className="w-[470px]">
              <Header />
              {modalOpen === undefined ? (
                <div></div>
              ):(
                <Modal type={modalOpen.type} param={modalOpen.content}/>
              )}
              {props.children}
            </div>
          </ModalContext.Provider>
        </div>
    </>
  );
};

export default Layout;