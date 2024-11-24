import React,{useContext,useEffect,useState} from 'react';
import { PostAuthor } from '../components/PostAuthor';
import { Link, useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import {DeletePost} from './DeletePost'
import { UserContext } from '../context/userContext';
import axios from 'axios'

import like from '../popup-image/like.png';
import comment from '../popup-image/command.png';

export const PostDetail = () => {

  const {id} = useParams()
  const [post,setPosts]=useState(null)
  const [error,setError]=useState(null)
  const [isLoading,setIsLoading]=useState(false)

  const {currentUser} =  useContext(UserContext)

useEffect(()=>{
  const getPost = async () => {
    setIsLoading(true);
    try{
      const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5000/api'
      const response = await axios.get(`${baseUrl}/posts/${id}`)
      setPosts(response.data)
    }catch(error){
      setError(error)
    }
    setIsLoading(false)
  }
  getPost();
},[id])

if(isLoading){
  return<Loader/>
}

const base_Ass_Url = process.env.REACT_APP_ASSETS_URL || 'http://localhost:5000'

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-5">
      {error && <p>{error}</p>}
      {post && <div className="bg-white shadow-lg p-5 rounded-lg w-full max-w-3xl text-center">
        <div className="mb-4 flex flex-col md:flex-row justify-between">
          <PostAuthor authorID={post.creator} createdAt={post.createdAt}/>
          {currentUser?.id === post?.creator &&
         <div className="flex justify-center  gap-3 mt-4 md:mt-0">
            <Link to={`/posts/${post?._id}/edit`}>
              <h5 className="bg-violet-400 w-16 p-1 text-center rounded">Edit</h5>
            </Link>
            <DeletePost postId={id}/>
          </div>
      }
      {/*likes & comment*/}
      <div className="flex gap-2 justify-end items-center mt-2">
            <img
              src={like}
              alt="Like"
              className="w-7 h-7 cursor-pointer"
            />
            <span>{post.likes.length}</span>
            <img
              src={comment}
              alt="Comment"
              className="w-7 h-7 cursor-pointer"
            />
            <span>{post.comments.length}</span>
        </div>
        </div>
        

        <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
        <div className="mb-4">
          <img src={`${base_Ass_Url}/uploads/${post.thumbnail}`} alt="Post Thumbnail" className="w-full h-auto max-w-lg mx-auto object-cover rounded" />
        </div>
        <div className="text-left space-y-4 mt-10 px-2 ">
          <p dangerouslySetInnerHTML={{__html:post.description}} className='lg:p-10  text-justify'></p>
        </div>
      </div>}
    </div>
  );
}
