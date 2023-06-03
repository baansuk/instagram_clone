import React from 'react';
import { Link } from 'react-router-dom';
import { LikeIcon, SendIcon } from '../components/icons/Icons'

const Header = () => {
  return (
    <div>
      <div className='t-[0] h-[80px] w-[470px] flex flex-row justify-between items-center pb-2 fixed solid bg-white z-30'>
        <Link to="/"><img className='w-[100px]' src='/Instagram_logo.png'/></Link>
        <div className='w-[70px] flex flex-row justify-between items-center'>
          <LikeIcon/>
          <SendIcon/>
        </div>
      </div>
    </div>
  )
}

export default Header;