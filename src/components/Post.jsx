import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { LikeIcon, LikeIconSmall, CommentIcon, SendIcon, MoreIcon, SaveIcon } from './icons/Icons';
import {users} from '../data/user';
import Comment from './Comment';
import ImageSlide from './ImageSlide';

const Post = ({post, user}) => {
  const [ open, setOpen ] = useState('line-clamp-2');
  const [ openComments, setOpenComments ] = useState(false);
  const [ storyOrNot, setStoryOrNot ] = useState('')

  useEffect(()=> {
    if(user.stories.length === 0) {
      return
    }
    return setStoryOrNot('story-active-2')

  },[])

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
            <img className='w-full' src={`/${likeuser.id}.jpg`}/>
          </div>
          <p className='font-semibold'>{likes[0]}</p>님이 좋아합니다.
        </span>
      )
    } else {
      return (
        <span className=' flex flex-row justify-start items-center  text-sm h-[14px]'>
          <div className=' rounded-full w-[14px] h-[14px] relative overflow-hidden border solid mr-2'>
            <img className='w-full' src={`/${likeuser.id}.jpg`}/>
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

function totalNumber (comments) {
  let number = 0;
  for(let i = 0; i < comments.length; i++){
    number += comments[i].subComments.length
  };
  const commentAmount = comments.length;
  return commentAmount + number;
}

  return (
    <div className='h-auto w-[470px] text-sm border-b solid'>
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

      <ImageSlide imgs = {post.imgPaths}/>

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
          <span className='whitespace-pre-wrap'>{post.content}</span>
          <br/>
          <div className='flex flex-row justify-start items-start flex-wrap'>
          {post.tags.map((tag)=> {
            return (
              <span className='text-[#00376B]'>#{tag}</span>
            )
          })}
          </div>
        </div>
        <div className=' w-full flex flex-row justify-start items-center text-sm text-gray-500'>
          {isItLong() ? (
            open === 'line-clamp-2' &&
            <div className=' cursor-pointer mb-2 ' onClick={()=> {
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
             댓글 {totalNumber(post.comments)}개 모두 보기
            </div> ) : (
              <div className='my-3 w-full'>
                {post.comments.map((comment)=> {
                  const commentUser = users.find((user)=> comment.user === user.id)
                  return (
                    <Comment comment={comment} commentUser={commentUser}/>
                  )
                })}
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