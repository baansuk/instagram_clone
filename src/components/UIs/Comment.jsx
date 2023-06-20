import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import {users} from '../../data/user';
import { LikeIcon, LikeIconSmall, CommentIcon, SendIcon, MoreIcon, SaveIcon } from '../icons/Icons';
import SubComment from './SubComment';
import { timeAgo } from '../../utils/timeAgo';

const Comment = ({comment, commentUser}) => {
  const [subComments, setSubComments] = useState(false);

  return (
    <div className='w-full h-auto flex flex-row justify-between items-center text-black'>
      <div className='w-full h-auto flex flex-row justify-start items-start'> 
        <Link to={`/${commentUser.id}`}>
          <div className='flex flex-col justify-center items-center rounded-full w-[32px] h-[32px] m-1 relative overflow-hidden border solid'><img className='w-full h-auto absolute' src={`/${commentUser.id}.jpg`}/></div>
        </Link>
        <div className='w-[90%] flex flex-col justify-start items-start ml-2'>
          <div className='w-full flex flex-row justify-between items-center'>
            <div className='flex flex-col justify-start items-start ml-2'>
            <span><Link to={`/${commentUser.id}`}><p className='font-semibold inline-block'>{commentUser.id}</p></Link> <p className='text-gray-500 inline-block ml-1'>{timeAgo(comment.date)}</p></span> 
            <div className='w-[370px] h-auto text-left'>{comment.content}</div>
            </div>                      
            <LikeIconSmall/>
          </div>
          <div className='w-full my-2 flex flex-row justify-start items-start text-xs text-gray-500'>
            <span className='mr-3 cursor-pointer'>
              {comment.likes.length !== 0 && `좋아요 ${comment.likes.length}개`}
            </span>
            <span className='cursor-pointer'>
              답글 달기 
            </span>
          </div>
          {comment.subComments.length === 0 ? ( <></> ) : (
            <div className='mb-2'>
            {subComments === true ? (
              <span className='text-gray-600 text-xs cursor-pointer  my-3' onClick={()=> {
                setSubComments(!subComments)
              }}><span className='w-[50px] h-[10px] line-through'>&nbsp;&nbsp;&nbsp;&nbsp;</span> <span>답글 숨기기</span></span>
            ): (
              <span className='text-gray-600 text-xs cursor-pointer my-3' onClick={()=> {
                setSubComments(!subComments)
              }}><span className='w-[50px] h-[10px] line-through '>&nbsp;&nbsp;&nbsp;&nbsp;</span> <span>답글 {comment.subComments.length}개 보기</span></span>
            )}
            </div>
          )}

          {subComments && (
            <div>
              {comment.subComments.map((subComment)=> {
                const subCommentUser = users.find((user)=> subComment.user === user.id)
                return (
                  <SubComment subComment={subComment} subCommentUser={subCommentUser}/>
                )
              })
              }
              
            </div>
          )}
          
        </div>
      </div>
    </div>
  )
}

export default Comment;