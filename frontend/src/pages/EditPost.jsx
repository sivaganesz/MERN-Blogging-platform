import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { Popup } from '../components/Popup';
import updated from '../popup-image/updated.png';

export const EditPost = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Uncategorized');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null); // Initially null
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupIcon, setPopupIcon] = useState(updated);

  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  const POST_CATEGORIES = ['Agriculture', 'Business', 'Education', 'Entertainment', 'Art', 'Investment', 'Uncategorized', 'Weather'];

  useEffect(() => {
    const getPost = async () => {
      try {
        const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5000/api';
        const response = await axios.get(`${baseUrl}/posts/${id}`);
        setTitle(response.data.title);
        setCategory(response.data.category);
        setDescription(response.data.description);
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, [id]);

  const editPost = async (e) => {
    e.preventDefault();

    const postData = new FormData();
    postData.set('title', title);
    postData.set('category', category);
    postData.set('description', description);
    if (thumbnail) {
      postData.set('thumbnail', thumbnail);
    }

    try {
      const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5000/api';
      const response = await axios.patch(`${baseUrl}/posts/${id}`, postData, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        setShowPopup(true);
        setPopupMessage('Update Successful!..');
        setPopupIcon(updated);
        setTimeout(() => {
          setShowPopup(false);
          navigate('/');
        }, 800);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="bg-gray-100 p-10">
      <form onSubmit={editPost}>
        <div className="flex justify-center items-center">
          <div className="space-y-4 w-full max-w-md">
            <h1 className='text-2xl font-medium'>Edit Post</h1>
            {error && <p className="bg-red-400 p-1 rounded mb-4 text-center">{error}</p>}
            <input type="text" className='border-2 p-2 rounded' placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />
            <select name="category" value={category} onChange={e => setCategory(e.target.value)} className='p-2 border-2'>
              {
                POST_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)
              }
            </select>
            <ReactQuill modules={modules} formats={formats} value={description} onChange={setDescription} />
            <input type="file" onChange={e => setThumbnail(e.target.files[0])} accept='image/png, image/jpg, image/jpeg' />
            <button type="submit" className="bg-violet-400 p-2 rounded hover:bg-violet-600 hover:text-gray-100 font-medium">Update</button>
          </div>
        </div>
      </form>
      {showPopup && <Popup message={popupMessage} onClose={closePopup} icon={popupIcon} />}
    </div>
  );
};
