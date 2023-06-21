import React, { useContext } from 'react';
import Story from './Modal';
import { ModalContext } from '../layout/Layout';



const ProfileStoryCluster = ({user, story}) => {
  const { modalOpen, setModalOpen } = useContext(ModalContext);

  return (
    <div className='w-[80px] h-auto flex flex-col justify-center items-center mx-1'>
      <div className='h-[70px] w-[70px] rounded-full mr-3 relative overflow-hidden cursor-pointer border solid flex flex-col justify-center items-center' onClick={()=>{
        setModalOpen({type: 'story', content: [user, story.story]});
      }}>
        <img className="w-[62px] h-auto absolute rounded-full" src={`${story.thumbnail}`}/>
      </div>
      <div className='w-[70px] text-xs text-center mt-1 mr-3 font-light'>
        {story.name}
      </div>
    </div>

  )
}


export default ProfileStoryCluster;