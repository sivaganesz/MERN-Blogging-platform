import React, { useContext, useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Popup } from '../components/Popup';
import create from '../popup-image/create.png';

export const CreatePost = () => {
  const [title,setTitle]=useState('');
  const [category,setCategory]=useState('');
  const [description,setDescription]=useState('');
  const [thumbnail,setThumbnail]=useState('');
  const [error,setError]=useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupIcon, setPopupIcon] = useState(create);


const  navigate = useNavigate()

const {currentUser} = useContext(UserContext)
const token = currentUser?.token

useEffect(()=>{
  if(!token){
    navigate('/login')
  }
},[])

  const modules = {
    toolbar:[
      [{'header':[1,2,3,4,5,6,false]}],
      ['bold','italic','underline','strike','blockquote'],
      [{'list':'ordered'},{'list':'bullet'},{'indent':'-1'},{'indent':'+1'}],
      ['link','image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold','italic','underline','strike','blockquote',
    'list','bullet','indent',
    'link','image'
  ]

  const POST_CATEGORIES = ['Agriculture','Business','Education','Entertainment','Art','Investment',
    'Uncategorized','Weather'];

const createpost = async (e) =>{
  e.preventDefault();
  
  const postData = new FormData();
  postData.set('title',title)     
  postData.set('category',category)
  postData.set('description',description)
  postData.set('thumbnail',thumbnail)

try{
  const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5000/api'
  const response = await axios.post(`${baseUrl}/posts`,postData,{
    withCredentials:true, headers:{Authorization:`Bearer ${token}`}})
    if(response.status == 201){
      setShowPopup(true);
      setPopupMessage('Post Created !..');
      setPopupIcon(create);
      setTimeout(() => {
        setShowPopup(false);
        navigate('/');
      }, 800);
    }
}catch(err){
  setError(err.response.data.message)
}

}

const closePopup = () => {
  setShowPopup(false);
};

  return (
      <div className="bg-gray-100 p-10">
      <form onSubmit={createpost}>
          <div className="flex justify-center items-center">
            <div className="space-y-4 w-full max-w-md">
              <h1 className='text-2xl font-medium'>Create Post</h1>
              {error && <p className="bg-red-400 p-1 rounded mb-4 text-center">{error}</p>}               
               <input type="text" className='border-2 p-2 rounded' placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />
                <select name="category" value={category} onChange={e=>setCategory(e.target.value)} className='p-2 border-2'>
                  {
                    POST_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)
                  }       
                </select>
                <ReactQuill modules={modules} formats={formats} value={description} onChange={setDescription}/>
                <input type="file" onChange={e=>setThumbnail(e.target.files[0])} accept='png,jpg,jpeg' />
              <button type="submit" className="bg-violet-400 p-2 rounded hover:bg-violet-600 hover:text-gray-100 font-medium ">Create</button>
            </div>
          </div>
        </form>
        {showPopup && <Popup message={popupMessage} onClose={closePopup} icon={popupIcon} />}

      </div>
  )
}
