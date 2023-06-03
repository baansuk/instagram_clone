import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import {users} from '../data/user';
import Comment from './Comment';
import Story from './Story';

const ShortThumbnail = ({user}) => {
  const [ shortOpen, setShortOpen ] = useState(false);
  const [ openComments, setOpenComments ] = useState(false);
  const [ curImg, setCurImg ] = useState(1);

  return (
    <div className='w-[80px] h-auto flex flex-col justify-center items-center mx-1'>
      <div className='h-[70px] w-[70px] rounded-full mr-3 relative overflow-hidden cursor-pointer story-active-5' onClick={()=>{
        setShortOpen(true);
      }}>
        <Story user={user}/>
        <img className="w-[62px] h-auto absolute rounded-full" src={`/${user.id}.jpg`}/>
      </div>
      <div className='w-[70px] text-xs text-center mt-1 mr-3 font-light'>
        {user.id}
      </div>
      {shortOpen === 'true' &&
        <Story user={user}/>
      }
    </div>

  )
}

export default ShortThumbnail;