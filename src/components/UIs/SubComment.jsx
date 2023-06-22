import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import {users} from '../../data/user';
import { LikeIcon, LikeIconSmall, CommentIcon, SendIcon, MoreIcon, SaveIcon } from '../icons/Icons';
import { timeAgo } from '../../utils/timeAgo';

const SubComment = ({subComment, subCommentUser}) => {

  return (
    <div className='w-full h-auto flex flex-row justify-between items-center text-black'>
      <div className='w-80% h-auto flex flex-row justify-start items-start'> 
      <Link to={`/${subCommentUser.id}`}>
        <div className='rounded-full w-[32px] h-[32px] m-1 relative overflow-hidden border solid'><img className='w-full h-auto absolute' src={`/${subCommentUser.id}.jpg`}/></div>
      </Link>
      <div className='flex flex-col justify-start items-start ml-2'>
      <span><Link to={`/${subCommentUser.id}`}><p className='font-semibold inline-block'>{subCommentUser.id}</p></Link> <p className='text-gray-500 inline-block ml-1'>{timeAgo(subComment.date)}</p></span> 
      <div className='w-[320px] h-auto text-left'>{subComment.userTags.map((taggedUser)=> {
        return <span  className='text-[#00376B] mr-1'>@{taggedUser}</span>
      })}{subComment.content}</div>
      <div className='w-full my-2 flex flex-row justify-start items-start text-xs text-gray-500'>
        {subComment.likes.length !== 0 && <span className='mr-3 cursor-pointer'> {`좋아요  ${subComment.likes.length}개`} </span>}
            <span className='cursor-pointer'>
              답글 달기 
            </span>
      </div>
      </div>
      </div>
    </div>
  )
}

export default SubComment;