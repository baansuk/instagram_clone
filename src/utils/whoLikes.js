import {users} from '../data/user';

export function whoLikes (likes) {
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