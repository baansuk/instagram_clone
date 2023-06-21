import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import {posts} from '../data/post';
import {users} from '../data/user';
import { AddFriendIcon, PostsIcon, TagIcon } from '../components/icons/Icons';
import ProfileStoryCluster from '../components/ProfileStoryClusters';
import { totalNumber } from '../utils/totalNumber';
import { ModalContext } from '../layout/Layout';
import { whoFollows } from '../utils/whoFollows';

const ProfilePage = () => {
  const { modalOpen, setModalOpen } = useContext(ModalContext);
  const { userId } = useParams();
  const user = users.find((e)=> userId === e.id);
  const [ storyOrNot, setStoryOrNot ] = useState(' border solid w-[130px] h-[130px] ')
  const [ tabStatus, setTabStatus ] = useState('posts');
  const follower = whoFollows(user.id);

  useEffect(()=> {
    if(user.stories.length === 0) {
      return
    }
    return setStoryOrNot('story-active-8')

  },[])

  useEffect(() => {
    document.title = `${user.name}(@${user.id}) | Instagram`;
  }, []);

  return (
    <div className='mt-[80px] h-[2000px] flex flex-col justify-start items-start'>
      <div className='w-full h-[150px] flex flex-row justify-start items-center'>
        <div className={`rounded-full relative overflow-hidden mr-5 flex justify-center items-center ${storyOrNot}`}>
          <img className='w-[130px] h-[130px] absolute rounded-full' src={`/${user.id}.jpg`}/>
        </div>
        <div className='w-[300px] h-[130px] flex flex-row justify-around items-center'>
          <div className='flex flex-col justify-center items-center'><p className='font-semibold'>{user.posts.length}</p><p>게시물</p></div>
          <div className='flex flex-col justify-center items-center cursor-pointer' onClick={()=> setModalOpen({type:'팔로워', content: follower})}><p className='font-semibold'>{follower.length}</p><p>팔로워</p></div>
          <div className='flex flex-col justify-center items-center cursor-pointer' onClick={()=> setModalOpen({type:'팔로잉', content: user.following})}><p className='font-semibold'>{user.following.length}</p><p>팔로잉</p></div>
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
      {user.stories.length >= 1 && (
        <div className=' w-full h-[120px] flex flex-row justify-start items-center border-b solid'>
          {user.stories.map((e)=> {
            return(
              <ProfileStoryCluster user={user} story={e}/>
            )
          })}
        </div>
      ) }
        { tabStatus === 'posts' ? (
          <div className=' w-full h-[60px] flex flex-row justify-around items-center pb-2'>
            <div className=' w-[50%] h-full flex flex-row justify-center items-center cursor-pointer border-t solid border-black' onClick={()=> setTabStatus('posts')}>
              <PostsIcon fill='rgb(0,0,0)' size={15}/> <div className='text-sm ml-2 font-semibold text-[rgb(0,0,0)]'> 게시물 </div>
            </div>
            <div className=' w-[50%] h-full flex flex-row justify-center items-center cursor-pointer' onClick={()=> setTabStatus('tagged')}>
              <TagIcon fill='rgb(115,115,115)' size={15}/> <div className='text-sm ml-2 font-semibold text-[rgb(115,115,115)]'> 태그됨 </div>
            </div>
          </div>
          ):(
          <div className=' w-full h-[60px] flex flex-row justify-around items-center pb-2'>
            <div className=' w-[50%] h-full flex flex-row justify-center items-center cursor-pointer' onClick={()=> setTabStatus('posts')}>
              <PostsIcon fill='rgb(115,115,115)' size={15}/> <div className='text-sm ml-2 font-semibold text-[rgb(115,115,115)]'> 게시물 </div>
            </div>
            <div className=' w-[50%] h-full flex flex-row justify-center items-center border-t solid border-black cursor-pointer' onClick={()=> setTabStatus('tagged')}>
              <TagIcon fill='rgb(0,0,0)' size={15}/> <div className='text-sm ml-2 font-semibold text-[rgb(0,0,0)]'> 태그됨 </div>
            </div>
          </div>
        )}

      {tabStatus === 'posts' ? (
        <div className='w-full h-auto flex flex-row justify-start flex-wrap items-start'>
        {user.posts.map((postId)=> {
          const post = posts.find((p)=> p.id === postId)
          return (
            <Link to={`/p/${post.id}`}>
              <div className='w-[156px] h-[156px] relative overflow-hidden flex flex-col justify-center items-center border border-white solid'>
                <img className='w-full h-full object-cover object-center absolute' src={post.imgPaths[0]}/>
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
      ):(
        <div className='w-full h-auto flex flex-row justify-start flex-wrap items-start'>
        {posts.map((post)=> {
          if(post.userTags.find((tag)=> tag === user.id)) {
            return (
              <Link to={`/p/${post.id}`}>
                <div className='w-[156px] h-[156px] relative overflow-hidden flex flex-col justify-center items-center border border-white solid'>
                  <img className='w-full h-full object-cover object-center absolute' src={post.imgPaths[0]}/>
                  <div className=' cursor-pointer z-20 w-full h-full opacity-0 hover:opacity-100 text-white font-semibold absolute flex flex-col justify-center items-center'>
                    <div className=' cursor-pointer w-full h-full opacity-30 bg-black absolute'>
                    </div>
                    <p className='z-20'>{post.likes.length}</p>
                    <p className='z-20'>{totalNumber(post.comments)}</p>
                  </div>
                </div>
              </Link>
            )
          } else {
            return
          }

        })}
        </div>
      )}


    </div>
  )
}

export default ProfilePage;