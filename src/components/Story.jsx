import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import StorySlide from './StorySlide';
import { ModalContext } from '../layout/Layout';

function Story({param}) {
  const { shortOpen, setShortOpen } = useContext(ModalContext);

  return (
    <div>
        <div className="fixed inset-0 flex items-center justify-center z-30">
            <div className="fixed inset-0 flex items-center justify-center z-30">
              <img className='z-30 inset-0 w-[120px] fixed m-10' src='/instagram_logo_white.png'/>
            <div className="bg-black opacity-80 fixed inset-0" onClick={() => setShortOpen(undefined)} />
            <StorySlide user={param[0]} userStories={param[1]}/>
          </div>
        </div>
    </div>
  );
}

export default Story;