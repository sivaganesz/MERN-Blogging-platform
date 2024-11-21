import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import { Loader } from '../components/Loader';

export const Authors = () => {

  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const getAuthors = async () => {
      setIsLoading(true);
      try {
        const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5000/api'
        const response = await axios.get(`${baseUrl}/users`);
        setAuthors(response.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
    getAuthors();
  }, [])

if(isLoading){
  return <Loader/>
}

  const base_Ass_Url = process.env.REACT_APP_ASSETS_URL || 'http://localhost:5000'


  return (
    <div className="flex items-center justify-center">
      <div className='mt-20 mb-20'>
        {authors.length > 0 ? <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 p-2 gap-2">
          {
            authors.map(({ _id: id, avatar, name, posts }) => {
              return <Link key={id} to={`/posts/users/${id}`}>
                <div className="flex bg-gray-300 rounded p-2 shadow-lg">
                  <div className="">
                    <img src={`${base_Ass_Url}/uploads/${avatar}`} alt={`Image of ${name}`} className='w-20 h-20 rounded' />
                  </div>
                  <div className="ml-2">
                    <h3>{name}</h3>
                    <p>Post : <span className='bg-gray-800 text-sm text-white px-2 rounded-full'>{posts}</span></p>
                  </div>
                </div>
              </Link>
            })
          }
        </div> : <h1 className='mt-[100px] text-3xl font-semibold text-center'>No Users/ Author Found</h1>}
      </div>
    </div>
  )
}
