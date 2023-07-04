import React, { useState, useRef, useEffect, useContext } from 'react';
import styled, { css } from 'styled-components';
import { LikeIcon, LikeIconSmall, CommentIcon, SendIcon, MoreIcon, SaveIcon } from './icons/Icons';
import { Link } from 'react-router-dom';
import users from '../data/user.json';
import { ModalContext } from '../layout/Layout';

const UserList = ({type, userList}) => {
  const { modalOpen, setModalOpen } = useContext(ModalContext);
  return (
    <div className=" rounded-2xl shadow-lg bg-white relative overflow-hidden z-30 w-[400px] h-[500px] flex flex-col justify-start items-center">
      <div className='w-full h-[50px] border-b solid font-semibold text-lg flex flex-col justify-center items-center'>{type}</div>
      <div className='w-full h-full px-3 relative overflow-auto flex flex-col justify-start items-center'> 
      {userList.map((user)=> {
        const thisUser = users.find((e)=> e.id === user)
        return (
          <div className='w-full h-[58px] my-2 flex flex-row justify-between items-center'>
            <div className='w-full flex flex-row justify-start items-center'>
              <Link to={`/${thisUser.id}`} onClick={() => setModalOpen(undefined)}>
                <div className={` w-[50px] h-[50px]  rounded-full relative overflow-hidden  flex flex-col justify-center items-center`}>
                    <img className='w-full h-full border solid absolute rounded-full' src={`/${thisUser.id}.jpg`}/>
                </div>
              </Link>
            <div className='w-[80%] h-[32px] flex ml-2 flex-col justify-center items-start'>
              <div className='w-full h-full flex flex-row justify-start items-center'>
                <Link to={`/${thisUser.id}`} onClick={() => setModalOpen(undefined)}>
                  <div className=' ml-2 mr-1 font-semibold'>{thisUser.id}</div>
                </Link>
              </div>
              {thisUser.name !== '' && (
                <div className='w-full h-auto flex flex-row justify-start items-center'>
                  <div className=' text-sm text-gray-500 mx-2'>{thisUser.name}</div>
                </div>
              )}
            </div>
          </div>
          <div className='w-auto h-auto cursor-pointer hover:opacity-60'>
  
          </div>
        </div>)
      })}
      </div>
      

    </div>

  )
}

export default UserList;

