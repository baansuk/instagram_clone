import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {posts} from '../data/post';
import {users} from '../data/user';
import { AddFriendIcon, LikeIcon, LikeIconSmall, CommentIcon, SendIcon, MoreIcon, SaveIcon } from '../components/icons/Icons';

const ProfilePage = () => {
  const { userId } = useParams();
  const user = users.find((e)=> userId === e.id);
  const [ storyOrNot, setStoryOrNot ] = useState(' border solid w-[130px] h-[130px] ')

  useEffect(()=> {
    if(user.stories.length === 0) {
      return
    }
    return setStoryOrNot('story-active-8')

  },[])


  function totalNumber (comments) {
    let number = 0;
    for(let i = 0; i < comments.length; i++){
      number += comments[i].subComments.length
    };
    const commentAmount = comments.length;
    return commentAmount + number;
  }

  return (
    <div className='mt-[80px] h-[2000px] flex flex-col justify-start items-start'>
      <div className='w-full h-[150px] flex flex-row justify-start items-center'>
        <div className={`rounded-full relative overflow-hidden mr-5 flex justify-center items-center ${storyOrNot}`}>
          <img className='w-[130px] h-auto absolute rounded-full' src={`/${user.id}.jpg`}/>
        </div>
        <div className='w-[300px] h-[130px] flex flex-row justify-around items-center'>
          <div className='flex flex-col justify-center items-center'><p className='font-semibold'>{user.posts.length}</p><p>게시물</p></div>
          <div className='flex flex-col justify-center items-center'><p className='font-semibold'>{user.follower.length}</p><p>팔로워</p></div>
          <div className='flex flex-col justify-center items-center'><p className='font-semibold'>{user.following.length}</p><p>팔로잉</p></div>
        </div>
      </div>
      <div className=' w-full h-auto flex flex-col justify-start items-start'>
        <div className='font-semibold'>{user.name}</div>
        <div className='text-left whitespace-pre-wrap'>{user.intro}</div>
      </div>
      <div className=' w-full h-[80px] flex flex-row justify-between items-center'>
        <div className='cursor-pointer hover:bg-gray-300 flex flex-col justify-center items-center w-[42%] h-[35px] rounded-xl font-semibold bg-gray-200 px-3'>팔로잉</div>
        <div className='cursor-pointer hover:bg-gray-300 flex flex-col justify-center items-center w-[42%] h-[35px] rounded-xl font-semibold bg-gray-200 px-3'>메시지</div>
        <div className='cursor-pointer hover:bg-gray-300 flex flex-col justify-center items-center w-[8%] h-[35px] rounded-xl font-semibold bg-gray-200 px-3'><AddFriendIcon/></div>
      </div >
      <div className=' w-full h-[80px] flex flex-row justify-between items-center border-b solid'>

      </div>
      <div className='w-full h-auto flex flex-row justify-start flex-wrap items-start'>
        {user.posts.map((postId)=> {
          const post = posts.find((p)=> p.id === postId)
          return (
            <Link to={`/posts/${post.id}`}>
            <div className='w-[156px] h-[160px] relative overflow-hidden flex flex-col justify-center items-center border solid'>
              <img src={post.imgPaths[0]}/>
              <div className=' cursor-pointer z-20 w-full h-full opacity-0 hover:opacity-100 text-white font-semibold absolute flex flex-col justify-center items-center'>
                <div className=' cursor-pointer w-full h-full opacity-30 bg-black absolute'>
                </div>
                <p className='z-20'>{post.likes.length}</p>
                <p className='z-20'>{totalNumber(post.comments)}</p>
              </div>
              
            </div>
            </Link>
          )

        })}
      </div>

    </div>
  )
}

export default ProfilePage;