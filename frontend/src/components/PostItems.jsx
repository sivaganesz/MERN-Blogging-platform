<<<<<<< HEAD
import React, { useContext, useState } from 'react';
// import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PostAuthor } from './PostAuthor';
import like from '../popup-image/like.png';
import likepop from '../popup-image/likepop.gif';
import comment from '../popup-image/command.png';
import commentPop from '../popup-image/chat.png';
import loginimage from '../popup-image/login.png';
import { Popup } from './Popup';
import { CommentModal } from './CommentModal';
import axios from 'axios';
import { UserContext } from '../context/userContext';

export const PostItems = ({ PostId, thumbnail, title, category, desc, authorID, createdAt, likes,comments }) => {
  const [likeCount, setLikeCount] = useState(likes);
  const [commentCount, setCommentCount] = useState(comments);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupIcon, setPopupIcon] = useState('');
  const [showCommentModal, setShowCommentModal] = useState(false);

  // const [posts, setPosts] = useState([]);


  const { currentUser } = useContext(UserContext);

  const baseUrl = process.env.REACT_APP_ASSETS_URL || 'http://localhost:5000';
  const postTitle = title.length > 25 ? title.substr(0, 25) + '...' : title;


  // useEffect(() => {
  //   // Fetch posts from your API
  //   axios.get('http://localhost:5000/api/posts')  // Replace with your API URL
  //     .then(response => {
  //       setPosts(response.data);
  //     })
  //     .catch(error => {
  //       console.error('There was an error fetching the posts!', error);
  //     });
  // }, []);

  // Handle Like Button Click
  const handleLikeClick = async () => {
    if (!currentUser || !currentUser.token) {
      // If not logged in, show popup and redirect to login page
      setPopupMessage('Please login to like posts.');
      setPopupIcon(loginimage);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 1000);
      return;
    }

    try {
      const response = await axios.put(`${baseUrl}/api/posts/${PostId}/like`, {}, {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      });

      setLikeCount(likeCount + 1); // Increment like count
      setPopupMessage(response.data.message);
      setPopupIcon(likepop);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 1000);
    } catch (error) {
      console.error(error);
      setPopupMessage('Error liking the post.');
      setPopupIcon(likepop);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 1000);
    }
  };

  // Show popup for comments --  api write comment
  const showCommentPopup = async () => {
    if(!currentUser || !currentUser.token){
      setPopupMessage("please login to comment posts.");
      setPopupIcon(loginimage);
      setShowPopup(true);
      setTimeout(()=> setShowPopup(false),3000);
      return
    }
    try{
       await axios.put(`${baseUrl}/api/posts/${PostId}/comment`,{},{
        headers:{Authorization:`Bearer ${currentUser.token}`}
      });
      setPopupMessage("Comment submitted successfully.");
      setPopupIcon(commentPop);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 1000);

    }catch(error){
      console.error(error);
      setPopupMessage('Error Comment the post.');
      setPopupIcon(commentPop);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 1000);
    }    
  };

  // Open Comment Modal
  const openCommentModal = () => {
        if(!currentUser || !currentUser.token){
          setPopupMessage("please login to comment posts.");
          setPopupIcon(loginimage);
          setShowPopup(true);
          setTimeout(()=> setShowPopup(false),1000);
          return
        }
        setShowCommentModal(true);
  };
  // Close Comment Modal
  const closeCommentModal = () => {
    setShowCommentModal(false);
  };

  return (
    <div className="max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden p-4">
      <article className="flex flex-col">
        <div>
          <Link to={`/posts/${PostId}`}>
            <img
              src={`${baseUrl}/uploads/${thumbnail}`}
              alt={title}
              className="w-full h-48 object-cover rounded-t-lg hover:scale-105"
            />
          </Link>
        </div>
        <div className="mt-3">
          <Link to={`/posts/${PostId}`}>
            <h3 className="text-lg font-semibold text-gray-900 hover:text-indigo-600">
              {postTitle}
            </h3>
          </Link>
          <p
            className="mt-2 leading-6 line-clamp-4 text-gray-600"
            dangerouslySetInnerHTML={{ __html: desc }}
          />
          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
            <PostAuthor authorID={authorID} createdAt={createdAt} />
            <Link
              to={`/posts/categories/${category}`}
              className="hover:bg-gray-400 bg-gray-300 text-black p-1 px-2 rounded"
            >
              {category}
            </Link>
          </div>

          <div className="flex gap-2 justify-end items-center mt-2">
            <img
              src={like}
              alt="Like"
              className="w-7 h-7 cursor-pointer"  
              onClick={handleLikeClick}
            />
            <span>{likeCount}</span>
            <img
              src={comment}
              alt="Comment"
              className="w-7 h-7 cursor-pointer"
              onClick={openCommentModal}
            />
            <span>{commentCount}</span>
          </div>
        </div>
      </article>

      {/* Popup Window */}
      {showPopup && <Popup message={popupMessage} icon={popupIcon} />}

      {/* Comment Modal */}
      {showCommentModal && (
        <CommentModal
          onClose={closeCommentModal}
          authorID={authorID}
          createdAt={createdAt}
          onCommentCount={() => setCommentCount(commentCount + 1)} // Increment comment count
          onCommentSubmit={showCommentPopup} // Trigger the popup on comment submit
        />
      )}
    </div>
  );
};
=======
import React from 'react';
import { Link } from 'react-router-dom';
import { PostAuthor } from './PostAuthor';

export const PostItems = ({ PostId, thumbnail, title, category, desc, authorID,createdAt }) => {
  const postTitle = title.length > 25 ? title.substr(0, 25) + '...' : title;
  const baseUrl = process.env.REACT_APP_ASSETS_URL || 'http://localhost:5000'
  return (
    <div className="max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden p-4">
      <article className='flex flex-col'>
        <div>
          <img src={`${baseUrl}/uploads/${thumbnail}`} alt={title} className='w-full h-48 object-cover rounded-t-lg hover:scale-105' />
        </div>
        <div className='mt-3'>
          <Link to={`/posts/${PostId}`}>
            <h3 className='text-lg font-semibold text-gray-900  hover:text-indigo-600'>{postTitle}</h3>
          </Link>
          <p className='mt-2 leading-6 line-clamp-4 text-gray-600' dangerouslySetInnerHTML={{__html:desc}}/>
          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
            <PostAuthor authorID={authorID} createdAt={createdAt} />
            <Link to={`/posts/categories/${category}`} className='hover:bg-gray-300 bg-gray-300 text-black p-1 px-2 rounded'>
              {category}
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};
>>>>>>> 8e56e10c44ed715152572326d6bfe6ee3e1ca8fe
