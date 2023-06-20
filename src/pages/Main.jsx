import React, { useEffect, useState } from 'react';
import {posts} from '../data/post';
import {users} from '../data/user';
import Post from '../components/Post'
import ShortThumbnail from '../components/ShortThumbnail';
import { stories } from '../data/story';

const Main = () => {
  const [slidePosition, setSlidePosition] = useState(0);

  const slideLeft = () => {
    setSlidePosition((prev) => prev + 100); // 또는 적절한 크기
  };

  const slideRight = () => {
    setSlidePosition((prev) => prev - 100); // 또는 적절한 크기
  };

  useEffect(() => {
    document.title = "Instagram";
  }, []);


  return (
    <div className='mt-[100px]'>
      <div className='h-[100px] w-auto flex flex-row justify-start items-center relative overflow-hidden'>
        {stories.length > 1 && (
          <div className='w-[470px] h-full top-[-10px] absolute flex flex-row justify-between items-center'>
            {slidePosition === 0 ? (
              <div></div>
            ) : (
              <div className='z-10 w-[30px] h-auto mx-2 cursor-pointer opacity-80' onClick={slideLeft}> <img src='/icon_prev.svg'/> </div>
            )}
            {slidePosition > 900 ? (
              <div></div>
            ): (
              <div className='z-10 w-[30px] h-auto  mx-2 cursor-pointer opacity-80' onClick={slideRight}> <img src='/icon_next.svg'/> </div>
            )}
                    </div>
        )}
          <div className='h-[100px] w-auto flex flex-row justify-start items-center absolute transition-all' style={{transform: `translateX(${slidePosition}px)`}}>
          {users.map((e)=> {
            return(
              e.stories.length > 0 ? (
                <ShortThumbnail user={e}/>
              ) : (
                <></>
              )
            )
          
          })}
        </div>
      </div>
      
      <div className='absolute mt-[50px]'>
      {posts.slice(0).reverse().map((e)=> {
        const thisUser = users.find((user)=>e.user === user.id);
        return(
          <Post post={e} user={thisUser}/>
        )
      })}
      </div>
    </div>
  )
}

export default Main;