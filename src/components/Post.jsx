import React, { useState } from 'react';
import { LikeIcon, CommentIcon, SendIcon, SaveIcon } from './icons/Icons';
import {users} from '../data/user';
import { totalNumber } from '../utils/totalNumber'
import { whoLikes } from '../utils/whoLikes'
import { isItLong } from '../utils/isItLong';
import UpperPost from './UIs/UpperPost';
import ImageSlide from './UIs/ImageSlide';
import Comment from './UIs/Comment';

const Post = ({post, user}) => {
  const [ open, setOpen ] = useState('line-clamp-2');
  const [ openComments, setOpenComments ] = useState(false);


  return (
    <div className='h-auto w-[470px] text-sm border-b solid'>
      <UpperPost user = {user} post = {post} />
      <ImageSlide imgs = {post.imgPaths}/>

      <div className='w-full h-[50px] flex flex-row justify-between items-center'>
        <div className='w-[110px] h-auto flex flex-row justify-between items-center'>        
          <div className='w-auto h-auto cursor-pointer hover:opacity-60'> <LikeIcon /> </div>
          <div className='w-auto h-auto cursor-pointer hover:opacity-60'> <CommentIcon/> </div>
          <div className='w-auto h-auto cursor-pointer hover:opacity-60'> <SendIcon/> </div>
        </div>
        <div className='w-auto h-auto cursor-pointer hover:opacity-60'> <SaveIcon/> </div>
      </div>
      <div className=' w-full h-auto flex flex-row justify-start items-center flex-wrap '>{whoLikes(post.likes)}</div>
      <div className='w-full flex flex-col justify-start my-2'>
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
        <div className=' w-full flex flex-row justify-start mt-1 items-center text-sm text-gray-500'>
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