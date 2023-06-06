import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { LikeIcon, LikeIconSmall, CommentIcon, SendIcon, MoreIcon, SaveIcon } from './icons/Icons';
import { Link } from 'react-router-dom';
import { stories } from '../data/story';

const Slide = styled.video`
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 1;
  transform: translateX(100%);
  transition: all 0.5s ease-in-out;

  ${({ state }) => state === 'current' && css`
    opacity: 1;
    transform: translateX(0);
  `}

  ${({ state }) => state === 'prev' && css`
    opacity: 1;
    transform: translateX(-100%);
  `}
`;

const SlideImg = styled.img`
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 1;
  transform: translateX(100%);
  transition: all 0.5s ease-in-out;
  z-index: 500;
  pointer-events: none;

  ${({ state }) => state === 'current' && css`
    opacity: 1;
    transform: translateX(0);
  `}

  ${({ state }) => state === 'prev' && css`
    opacity: 1;
    transform: translateX(-100%);
  `}
`;

const StorySlide = ({user, userStories}) => {
  const [ curStory, setCurStory ] = useState(0);
  const userStory = stories.find((story)=> userStories[curStory] === story.id);
  const videoRefs = useRef([]);

  useEffect(() => {
    if (videoRefs.current[curStory]) {
      videoRefs.current[curStory].play();
    }

    if (videoRefs.current[curStory - 1]) {
      videoRefs.current[curStory - 1].pause();
    } else if (videoRefs.current[userStories.length - 1]) {
      videoRefs.current[userStories.length - 1].pause();
    }
  }, [curStory]);

  const goPrev = () => {
    setCurStory((current) => current === 0 ? userStories.length - 1 : current - 1);
  };

  const goNext = () => {
    setCurStory((current) => current === userStories.length - 1 ? 0 : current + 1);
  };

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




  return (
    <div className=" p-6 rounded-2xl shadow-lg relative overflow-hidden z-30 w-[400px] h-[700px]">
      {userStories.length > 1 && (
        <div className='inset-0 w-[400px] h-full absolute flex flex-row justify-between items-center'>
          {curStory === 0 ? (
            <div></div>
          ) : (
            <div className='z-40 w-[30px] h-auto mx-3 cursor-pointer opacity-70 hover:opacity-100' onClick={goPrev}> <img src='/icon_prev.svg'/> </div>
          )}
          {curStory === userStories.length -1 ? (
            <div></div>
          ): (
            <div className='z-40 w-[30px] h-auto mx-3 cursor-pointer opacity-70 hover:opacity-100' onClick={goNext}> <img src='/icon_next.svg'/> </div>
          )}
          
        </div>
      )}
      <div className='w-full h-[58px] flex flex-row justify-between items-center z-30 absolute text-white'>
        <div className='w-full flex flex-row justify-start items-center'>
          <Link to={`/${user.id}`}>
            <div className=' rounded-full w-[35px] h-[35px] relative overflow-hidden flex flex-col justify-center items-center story-active-2'>
                <img className='w-[30px] h-[30px] absolute rounded-full' src={`/${user.id}.jpg`}/>
            </div>
          </Link>
          <div className='w-[80%] h-[32px] flex flex-col justify-center items-start'>
            <div className='w-full h-full flex flex-row justify-start items-center'>
              <Link to={`/${user.id}`}>
                <div className=' ml-2 mr-1 font-semibold'>{user.id}</div>
              </Link>
              <div className=' mx-1 text-gray-200'> • {timeAgo(userStory.date)}</div>
            </div>
            {stories[curStory].location && (
              <div className='w-full h-auto flex flex-row justify-start items-center'>
                <div className=' text-xs mx-2'>{userStory.location}</div>
              </div>
            )}
          </div>
        </div>
        <div className='w-auto h-auto cursor-pointer hover:opacity-60'>
          <MoreIcon/>
        </div>
      </div>
      <div className='absolute flex flex-row justify-start items-start inset-0 top-[0] w-full opacity-80 h-[30%] bg-gradient-to-t from-transparent to-black pointer-events-none z-10'>
        <div className='flex flex-row justify-start items-start absolute inset-0 mx-5'>
          {userStories.map((story, idx)=> {
            if(idx === curStory){
              return(
                <div className={`inset-0 mx-1 h-[2px] mt-5 bg-white rounded-full opacity-80 flex flex-col grow relative z-20 ${story.id}`}></div>
              )
            }
            return(
              <div className={`inset-0 mx-1 h-[2px] mt-5 bg-white rounded-full opacity-30 flex flex-col grow relative z-20 ${story.id}`}></div>
            )

          })}
        </div>
      </div>
      {userStories.map((story, index) => {
          let state = '';
          let thisVideoSrc = stories.find((str)=> str.id === story).vidPath;
          let thisImgSrc = stories.find((str)=> str.id === story).imgPath;

          if (index === curStory) {
            state = 'current';
          } else if (index < curStory) {
            state = 'prev';
          } else {
            state = 'next';
          }
          return (
            <div>
              <Slide autoPlay={curStory === index ? true : false} loop={curStory === index ? true : false} muted={curStory === index ? false : true} controls key={index} src={thisVideoSrc} state={state} ref={(element) => videoRefs.current[index] = element}/>
              <SlideImg key={index} src={thisImgSrc} state={state}/>
            </div>
            );
        })}
    </div>

  )
}

export default StorySlide;

