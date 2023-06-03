import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StorySlide from './StorySlide';

function Story({user}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div>
      <div
        className="w-[1500px] h-[1500px] absolute z-10" 
        onClick={() => setModalIsOpen(true)}
      ></div>
      
      {modalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-30">
            <div className="fixed inset-0 flex items-center justify-center z-30">
              <img className='z-30 inset-0 w-[120px] fixed m-10' src='/instagram_logo_white.png'/>
            <div className="bg-black opacity-80 fixed inset-0" onClick={() => setModalIsOpen(false)} />

            <StorySlide user={user}/>

          </div>

        </div>
      )}
    </div>
  );
}

export default Story;