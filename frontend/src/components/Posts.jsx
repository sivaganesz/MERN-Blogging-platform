<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
import { PostItems } from './PostItems'
import { Loader } from '../components/Loader';
import axios from 'axios';
export const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true)
      try {
        const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5000/api';
        const response = await axios.get(`${baseUrl}/posts`)
        setPosts(response?.data)
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false)
    }
    fetchPosts();
  }, [])
  if (isLoading) {
    return <Loader />
  }
  return (
    <div>
      {posts.length > 0 ? <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 p-3 gap-5'>
        {posts.map(({ _id: id, thumbnail, category, title, description, creator, createdAt, likes ,comments}) => (
          <PostItems
            key={id}
            PostId={id}
            thumbnail={thumbnail}
            category={category}
            title={title}
            desc={description}
            authorID={creator}
            createdAt={createdAt}
            likes={likes.length}  // Pass initial likes count from backend
            comments={comments.length}  // Pass initial likes count from backend
          />
        ))}

      </div> : <h2 className='text-center font-semibold text-2xl mt-28 mb-44'>No post found</h2>}
    </div>
  )
}
=======
import React, { useEffect, useState } from 'react'
import { PostItems } from './PostItems'
import { Loader } from '../components/Loader';
import axios from 'axios';
export const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading , setIsLoading]=useState(false)
  useEffect(()=>{
    const fetchPosts=async()=>{
      setIsLoading(true)
      try{
        const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5000/api';
        const response =await axios.get(`${baseUrl}/posts`)
        setPosts(response?.data)
      }catch(err){
        console.log(err);
      }
      setIsLoading(false)
    }
    fetchPosts();
  },[])
  if(isLoading){
    return <Loader/>
  }
  return (
    <div>
      {posts.length > 0 ? <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 p-3 gap-5'>
        {posts.map(({ _id:id, thumbnail, category, title, description, creator,createdAt }) => <PostItems key={id} PostId={id} thumbnail={thumbnail}
          category={category} title={title} desc={description} authorID={creator} createdAt={createdAt} />)}
      </div> : <h2 className='text-center font-semibold text-2xl mt-28 mb-44'>No post found</h2>}
    </div>
  )
}
>>>>>>> 8e56e10c44ed715152572326d6bfe6ee3e1ca8fe
