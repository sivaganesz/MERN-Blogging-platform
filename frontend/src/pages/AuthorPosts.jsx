import React, {useEffect, useState } from 'react'
import { PostItems } from '../components/PostItems';
import { Loader } from '../components/Loader';
import { useParams } from 'react-router-dom';
import axios from 'axios'

export const AuthorPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading , setIsLoading]=useState(false)

  const {id} = useParams()
  useEffect(()=>{
    const fetchPosts=async()=>{
      setIsLoading(true)
      try{
        const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5000/api';
        const response =await axios.get(`${baseUrl}/posts/users/${id}`)
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
        {posts.map(({ _id:id, thumbnail, category, title, desc, creator,createdAt ,likes,comments }) => <PostItems key={id} PostId={id} thumbnail={thumbnail}
          category={category} title={title} desc={desc} authorID={creator} createdAt={createdAt} likes={likes.length} comments={comments.length} />)}
      </div> : <h2 className='text-center font-semibold text-2xl mt-24 mb-32'>No post found</h2>}
    </div>
  )
}
