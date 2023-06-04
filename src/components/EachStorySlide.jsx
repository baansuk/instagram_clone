import React from 'react';
import styled, { css } from 'styled-components';

const Slide = styled.video`
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 1;
  transform: translateX(100%);
  transition: all 0.5s ease-in-out;

  ${({ state }) => state === 'current' && css`
    opacity: 1;
    transform: translateX(0);
  `}

  ${({ state }) => state === 'prev' && css`
    opacity: 1;
    transform: translateX(-100%);
  `}
`;

const SlideImg = styled.img`
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 1;
  transform: translateX(100%);
  transition: all 0.5s ease-in-out;
  z-index: 500;
  pointer-events: none;

  ${({ state }) => state === 'current' && css`
    opacity: 1;
    transform: translateX(0);
  `}

  ${({ state }) => state === 'prev' && css`
    opacity: 1;
    transform: translateX(-100%);
  `}
`;

const EachStorySlide = ({thisImgSrc, thisVideoSrc, index, state, videoRef}) => {

  return (
    <div>
      <Slide loop controls key={index} src={thisVideoSrc} state={state} ref={videoRef} />
      <SlideImg key={index} src={thisImgSrc} state={state}  />
    </div>
  )
}

export default EachStorySlide;