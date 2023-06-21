import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import StorySlide from './StorySlide';
import { ModalContext } from '../layout/Layout';
import UserList from './UserList';

function Modal({type, param}) {
  const { modalOpen, setModalOpen } = useContext(ModalContext);

  return (
    <div>
        <div className="fixed inset-0 flex items-center justify-center z-30">
            <div className="fixed inset-0 flex items-center justify-center z-30">
            {type === 'story' && <img className='z-30 inset-0 w-[120px] fixed m-10' src='/instagram_logo_white.png'/> }
            {type === 'story' ? <div className="bg-black opacity-90 fixed inset-0" onClick={() => setModalOpen(undefined)} /> : 
            <div className="bg-black opacity-80 fixed inset-0" onClick={() => setModalOpen(undefined)} /> }
            {type === 'story' ? <StorySlide user={param[0]} userStories={param[1]}/> 
            : type === '팔로잉' || type === '팔로워' || type === '좋아요' ? <UserList type={type} userList={param}/> 
            : <></>
            }
            
          </div>
        </div>
    </div>
  );
}

export default Modal;