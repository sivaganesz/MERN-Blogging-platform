import { UserContext } from '../context/userContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react'
import { Dummy_posts } from '../data';
import axios from 'axios';
import { Loader } from '../components/Loader';
import { DeletePost } from './DeletePost';
export const Dashboard = () => {
  const [posts, setPosts] = useState(Dummy_posts);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate()

  const { currentUser } = useContext(UserContext)
  const token = currentUser?.token

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [])

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5000/api';
        const response = await axios.get(`${baseUrl}/posts/users/${id}`,
          { withCredentials: true, headers: { Authorization: `Bearer ${token}` }})
        setPosts(response.data)
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false)
    }
    fetchPosts();
  }, [id])

  if (isLoading) {
    return <Loader/>
  }
  const base_Ass_Url = process.env.REACT_APP_ASSETS_URL || 'http://localhost:5000';

  return (
    <div>
      <h1 className='text-center text-2xl font-medium mt-5'>MyPosts</h1>
      {posts.length ? (
                 <div className="space-y-5 mt-5 p-7">
            {posts.map((post) => (
              <article key={post.id} className='bg-gray-100 p-4 rounded-lg'>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div className="flex gap-4 items-center">
                    <div className="w-16 h-10 lg:w-16 lg:h-16">
                      <img src={`${base_Ass_Url}/uploads/${post.thumbnail}`} alt={post.title} className='w-full h-full object-cover rounded-full' />
                    </div>

                    <h5 className='text-lg font-semibold'>{post.title}</h5>
                  </div>
                  <div className="flex gap-2 justify-center flex-row mt-4 w-full sm:mt-0 sm:w-auto">
                    <Link to={`/posts/${post._id}`} className='hover:bg-gray-400 bg-gray-300 rounded p-1 px-2 text-center'> View</Link>
                    <Link to={`/posts/${post._id}/edit`} className='hover:bg-violet-500 bg-violet-400 rounded px-2 p-1 text-center'>  Edit</Link>
                    <DeletePost postId={post._id}/>
                  </div>
                </div>
              </article>


            ))}
        </div>
      ) : (
        <h1 className='mt-24 text-3xl font-semibold text-center'>
          You have No posts yet
        </h1>
      )}
    </div>
  );
};
