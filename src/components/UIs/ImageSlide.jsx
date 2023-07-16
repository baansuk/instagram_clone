import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

const Slide = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 1;
  transform: translateX(100%);
  transition: all 0.5s ease-in-out;

  ${({ state }) =>
    state === "current" &&
    css`
      opacity: 1;
      transform: translateX(0);
    `}

  ${({ state }) =>
    state === "prev" &&
    css`
      opacity: 1;
      transform: translateX(-100%);
    `}
`;

const ImageSlide = ({ imgs }) => {
  const [curImg, setCurImg] = useState(0);

  const goPrev = () => {
    setCurImg((current) => (current === 0 ? imgs.length - 1 : current - 1));
  };

  const goNext = () => {
    setCurImg((current) => (current === imgs.length - 1 ? 0 : current + 1));
  };

  return (
    <div className="w-[470px]  h-[600px] min-h-[470px] rounded-md border solid flex flex-row flex-nowrap overflow-hidden justify-start items-center relative">
      {imgs.length > 1 && (
        <div className="w-[470px] h-full absolute flex flex-row justify-between items-center">
          {curImg === 0 ? (
            <div></div>
          ) : (
            <div
              className="z-10 w-[30px] h-auto mx-2 cursor-pointer opacity-70"
              onClick={goPrev}
            >
              {" "}
              <img src="/icon_prev.svg" />{" "}
            </div>
          )}
          {curImg === imgs.length - 1 ? (
            <div></div>
          ) : (
            <div
              className="z-10 w-[30px] h-auto  mx-2 cursor-pointer opacity-70"
              onClick={goNext}
            >
              {" "}
              <img src="/icon_next.svg" />{" "}
            </div>
          )}
        </div>
      )}
      {imgs.map((src, index) => {
        let state = "";
        if (index === curImg) {
          state = "current";
        } else if (index < curImg) {
          state = "prev";
        } else {
          state = "next";
        }
        return <Slide key={index} src={src} state={state} />;
      })}
    </div>
  );
};

export default ImageSlide;
