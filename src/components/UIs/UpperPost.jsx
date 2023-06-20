import React, { useEffect, useState } from "react";
import { timeAgo } from "../../utils/timeAgo";
import { Link } from "react-router-dom";
import { MoreIcon } from "../icons/Icons";

const UpperPost = ({user, post}) => {
  const [ storyOrNot, setStoryOrNot ] = useState('')

  useEffect(()=> {
    if(user.stories.length === 0) {
      return
    }
    return setStoryOrNot('story-active-2')

  },[])

  return (
    <div className='w-full h-[58px] flex flex-row justify-between items-center'>
    <div className='w-full flex flex-row justify-start items-center'>
      <Link to={`/${user.id}`}>
        <div className={` w-[35px] h-[35px]  rounded-full relative overflow-hidden  flex flex-col justify-center items-center ${storyOrNot}`}>
            <img className='w-[90%] h-[90%] border solid absolute rounded-full' src={`/${user.id}.jpg`}/>
        </div>
      </Link>
      <div className='w-[80%] h-[32px] flex flex-col justify-center items-start'>
        <div className='w-full h-full flex flex-row justify-start items-center'>
          <Link to={`/${user.id}`}>
            <div className=' ml-2 mr-1 font-semibold'>{user.id}</div>
          </Link>
          <div className=' mx-1 text-gray-500'> • {timeAgo(post.date)}</div>
        </div>
        {post.location && (
          <div className='w-full h-auto flex flex-row justify-start items-center'>
            <div className=' text-xs mx-2'>{post.location}</div>
          </div>
        )}
      </div>
    </div>
    <div className='w-auto h-auto cursor-pointer hover:opacity-60'>
      <MoreIcon/>
    </div>
  </div>
  )
}

export default UpperPost;