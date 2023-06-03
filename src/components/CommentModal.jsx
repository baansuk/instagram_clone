import React, { useState } from 'react';
import { LikeIcon, CommentIcon, SendIcon, MoreIcon, SaveIcon } from './icons/Icons';
import {users} from '../data/user';

const Post = ({post, user}) => {
  const [ open, setOpen ] = useState('line-clamp-2');
  const [ openComments, setOpenComments ] = useState(false);

  function timeAgo(pastDate) {
    const diffInMilliseconds = new Date().getTime() - pastDate.getTime();
    const diffInSeconds = diffInMilliseconds / 1000;
    
    const diffInMinutes = diffInSeconds / 60;
    if (diffInMinutes < 60) {
      return `${Math.floor(diffInMinutes)}분`;
    }
    
    const diffInHours = diffInMinutes / 60;
    if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}시간`;
    }
  
    const diffInDays = diffInHours / 24;
    if (diffInDays < 7) {
      return `${Math.floor(diffInDays)}일`;
    }
  
    const diffInWeeks = diffInDays / 7;
      return `${Math.floor(diffInWeeks)}주`;
  }

function whoLikes (likes) {
  const likeuser = users.find((pl) => likes[0] === pl.id);
  if(likes.length === 0) {
    return
  } else if (likes.length === 1) {
    return (
      <span className=' flex flex-row justify-start items-center text-sm h-[14px]'>
        <div className=' rounded-full w-[14px] h-[14px] relative overflow-hidden border solid mr-2'>
          <img className='w-full' src={likeuser.imgPath}/>
        </div>
        <p className='font-semibold'>{likes[0]}</p>님이 좋아합니다.
      </span>
    )
  } else {
    return (
      <span className=' flex flex-row justify-start items-center  text-sm h-[14px]'>
        <div className=' rounded-full w-[14px] h-[14px] relative overflow-hidden border solid mr-2'>
          <img className='w-full' src={likeuser.imgPath}/>
        </div>
        <p className='font-semibold'>{likes[0]}</p>님 <p className='font-semibold ml-1'>외 {likes.length - 1}명</p>이 좋아합니다.
      </span>
    )
  }
}

function isItLong () {
  const textElement = document.querySelector('.line-clamp-2');
  if (textElement){
    if (textElement.scrollHeight > textElement.clientHeight) {
  return true
  } else {
  return false
  }
} else return true
}

  return (
    <div className='h-auto w-[470px] text-sm'>
      <div className='w-full h-[58px] flex flex-row justify-between items-center'>
        <div className='flex flex-row justify-start items-center'>
        <div className=' rounded-full w-[32px] h-[32px] relative overflow-hidden border solid flex flex-col justify-center items-center'>
            <img className='w-full' src={user.imgPath}/>
        </div>
        <div className='w-full h-[32px] flex flex-col justify-center items-start'>
          <div className='w-full h-full flex flex-row justify-start items-center'>
            <div className=' ml-2 mr-1 font-semibold'>{user.id}</div>
            <div className=' mx-1 text-gray-500'> • {timeAgo(post.date)}</div>
          </div>
            {post.location && (
              <div className='w-full h-auto flex flex-row justify-start items-center'>
                <div className=' text-xs mx-2'>{post.location}</div>
              </div>
            )}
        </div>
      </div>
      <div>
        <MoreIcon/>
      </div>

      </div>
      <div className='w-[470px] h-auto rounded-md border solid flex flex-row flex-nowrap overflow-hidden justify-start items-center relative'>
        {post.imgPaths.map((p)=>{
          return (
            <img className='inset-0 w-[470px] h-auto' src={p}/>
          )
        })}

      </div>
      <div className='w-full h-[50px] flex flex-row justify-between items-center'>
        <div className='w-[110px] h-auto flex flex-row justify-between items-center'>        
          <div className='w-auto h-auto cursor-pointer hover:opacity-60'> <LikeIcon /> </div>
          <div className='w-auto h-auto cursor-pointer hover:opacity-60'> <CommentIcon/> </div>
          <div className='w-auto h-auto cursor-pointer hover:opacity-60'> <SendIcon/> </div>
        </div>
        <div className='w-auto h-auto cursor-pointer hover:opacity-60'> <SaveIcon/> </div>
      </div>
      <div className=' w-full h-[20px] flex flex-row justify-start items-center flex-wrap '>{whoLikes(post.likes)}</div>
      <div className='w-full flex flex-col justify-start my-3'>
        <div className={`w-full text-sm text-left ${open}`}>
          <span className='h-[19px] w-auto font-semibold mr-1'>{user.id}</span>
          <span>{post.content}</span>
          <br/>
          {post.tags.map((tag)=> {
            return (
              <span className='text-[#00376B]'>#{tag}</span>
            )
          })}
        </div>
        <div className=' w-full flex flex-row justify-start items-center text-sm text-gray-500'>
          {isItLong() ? (
            open === 'line-clamp-2' &&
            <div className=' cursor-pointer ' onClick={()=> {
              setOpen('');
              }
            }>
             더보기
            </div> 
          ) : ( 
            <>
            </>
          )}
        </div>
        <div className=' w-full flex flex-row justify-start items-center text-sm text-gray-500'>
          {post.comments.length > 0 ? (
            openComments === false ? (
            <div className=' cursor-pointer ' onClick={()=> {
              setOpenComments(true);
              }
            }>
             댓글 {post.comments.length}개 모두 보기
            </div> ) : (
              <div>
                댓글이당
              </div>
            )
          ) : ( 
            <>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Post;