import { UserContext } from '../context/userContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useState,useContext, useEffect } from 'react';
import axios from 'axios';
import { Loader } from '../components/Loader';

export const DeletePost = ({ postId }) => {
  const [isLoading,setIsLoading]=useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const removePost = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(`http://localhost:5000/api/posts/${postId}`, 
        {withCredentials: true,  headers: { Authorization: `Bearer ${token}`}
      });
      if (response.status === 200) {
        if (location.pathname === `/myposts/${currentUser.id}`) {
          navigate(0);
        } else {
          navigate('/');
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Couldn't delete post", error);
    }
  };
if(isLoading){
  return <Loader/>
}
  return (
    <Link onClick={removePost}>
      <h5 className="bg-red-400 w-16 p-1 text-center rounded">Delete</h5>
    </Link>
  );
};
