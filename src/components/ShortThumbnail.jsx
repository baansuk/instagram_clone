import React, { useContext } from 'react';
import { ModalContext } from '../layout/Layout';


const ShortThumbnail = ({user}) => {
  const { shortOpen, setShortOpen } = useContext(ModalContext);
  const userStories = user.stories.map((story)=> story.story).flat();

  return (
    <div className='w-[88px] h-auto flex flex-col justify-center items-center mx-1'>
      <div className='h-[80px] w-[80px] rounded-full mr-3 relative overflow-hidden cursor-pointer story-active-5' onClick={()=>{
        setShortOpen([user, userStories]);
      }}>
        <img className="w-[72px] h-auto absolute rounded-full" src={`/${user.id}.jpg`}/>
      </div>
      <div className='w-[82px] text-xs text-center mt-1 mr-3 font-light'>
        {user.id}
      </div>
    </div>

  )
}

export default ShortThumbnail;