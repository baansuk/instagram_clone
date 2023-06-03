import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {posts} from '../data/post';
import {users} from '../data/user';
import Post from '../components/Post'

const PostPage = () => {
  const { postId } = useParams();
  const post = posts.find((e)=> postId === e.id);
  const user = users.find((e)=> post.user === e.id);

  return (
    <div className='my-[80px] flex flex-col justify-start items-start'>
      <Post post={post} user={user} />
    </div>
  )
}

export default PostPage;