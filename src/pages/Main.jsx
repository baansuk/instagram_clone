import React from 'react';
import {posts} from '../data/post';
import {users} from '../data/user';
import Post from '../components/Post'
import ShortThumbnail from '../components/ShortThumbnail';
import { stories } from '../data/story';

const Main = () => {
  return (
    <div className='my-[100px]'>
      <div className='h-[100px] w-auto flex flex-row justify-start items-center absolute overflow-hidden'>
      <div className='absolute left-[300px] w-[25%] h-full bg-gradient-to-r from-transparent to-white pointer-events-none z-10'></div>
      <div className='absolute left-[470px] w-full h-full bg-white pointer-events-none z-10'></div>
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
      
      <div className='absolute mt-[120px]'>
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