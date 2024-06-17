import React, {useEffect, useState } from 'react'
import { PostItems } from '../components/PostItems';
import axios from 'axios'
import { Loader } from '../components/Loader';
import { useParams } from 'react-router-dom';
export const CategoryPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading , setIsLoading]=useState(false)

  const {category} = useParams()
  useEffect(()=>{
    const fetchPosts=async()=>{
      setIsLoading(true)
      try{
        const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5000/api';
        const response =await axios.get(`${baseUrl}/posts/categories/${category}`)
        setPosts(response?.data)
      }catch(err){
        console.log(err);
      }
      setIsLoading(false)
    }
    fetchPosts();
  },[category])
  if(isLoading){
    return <Loader/>
  }
  return (
    <div>
      {posts.length > 0 ? <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 p-3'>
        {posts.map(({ _id:id, thumbnail, category, title, desc, creator,createdAt }) => <PostItems key={id} PostId={id} thumbnail={thumbnail}
          category={category} title={title} desc={desc} authorID={creator} createdAt={createdAt} />)}
      </div> : <h2 className='text-center mt-32 mb-44 text-3xl font-semibold'>No post found</h2>}
    </div>
  )
}
