import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaCheck, FaEdit } from 'react-icons/fa';
import axios from 'axios';
import { Popup } from '../components/Popup';
import updated from '../popup-image/updated.png';

const InputField = ({ type, placeholder, name, value, onChange, autoFocus = false }) => (
  <input
    type={type}
    placeholder={placeholder}
    name={name}
    value={value}
    onChange={onChange}
    autoFocus={autoFocus}
    className="bg-white shadow-md border p-3 mt-2 w-60 lg:w-full rounded"
  />
);

export const UserProfile = () => {
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [isAvatarTouched, setIsAvatarTouched] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupIcon, setPopupIcon] = useState(updated);
  const navigate = useNavigate();

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5000/api';
        const response = await axios.get(`${baseUrl}/users/${currentUser.id}`, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } });
        const { name, email, avatar } = response.data;
        setName(name);
        setEmail(email);
        setAvatar(avatar);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [currentUser.id, token]);

  const changeAvatarHandler = async () => {
    setIsAvatarTouched(false);
    try {
      const postData = new FormData();
      postData.set('avatar', avatar);
      const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5000/api';
      const response = await axios.post(`${baseUrl}/users/change-avatar`, postData, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } });
      setAvatar(response?.data.avatar);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserDetails = async (e) => {
    e.preventDefault();
    try {
      const userData = new FormData();
      userData.set('name', name);
      userData.set('email', email);
      userData.set('currentPassword', currentPassword);
      userData.set('newPassword', newPassword);
      userData.set('confirmNewPassword', confirmNewPassword);
      const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5000/api';
      const response = await axios.patch(`${baseUrl}/users/edit-user`, userData, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } });
      if (response.status === 200) {
        setShowPopup(true);
        setPopupMessage('Update Successful!..');
        setPopupIcon(updated);
        setTimeout(() => {
          setShowPopup(false);
          navigate('/logout');
        }, 800); // Adjust the delay as needed
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <section className='profile'>
      <div className="profile__container">
        <Link to={`/myposts/${currentUser.id}`} className='mt-4 text-md font-semibold hover:bg-green-300 rounded p-1 px-2 bg-violet-400'>My Posts</Link>

        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar shadow-xl">
              <img src={`http://localhost:5000/uploads/${avatar}`} alt="" />
            </div>

            <div action='' className='avatar__form'>
              <input type="file" name='avatar' id='avatar' onChange={e => setAvatar(e.target.files[0])} accept='png,ipg,jpeg' />
              <label htmlFor="avatar" onClick={() => setIsAvatarTouched(true)}><FaEdit /></label>
            </div>
            {isAvatarTouched && <button className='profile__avatar-btn' onClick={changeAvatarHandler}><FaCheck /></button>}
          </div>
          <h1 className='text-2xl font-semibold'>❄-{currentUser.name}-❄</h1>

          <div className="flex justify-center items-center">
            <div className="space-y-4 w-full max-w-md">
              <form action="" onClick={updateUserDetails}>
                <div className="flex justify-center items-center">
                  {error && <p className="bg-red-400 p-1 rounded mb-4 lg:w-full w-[250px] text-center mt-4">{error}</p>}
                </div>
                <InputField
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  autoFocus
                />
                <InputField
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <InputField
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                />
                <InputField
                  type="password"
                  placeholder="New Password"
                  name="password2"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                />
                <InputField
                  type="password"
                  placeholder="Confirm New Password"
                  name="password2"
                  value={confirmNewPassword}
                  onChange={e => setConfirmNewPassword(e.target.value)}
                />
                <button type="submit" className="userprofile-btn bg-violet-400 p-2 mt-3 rounded w-60  hover:bg-violet-600 hover:text-gray-100 font-medium ">Update Details</button>
              </form>
              {showPopup && <Popup message={popupMessage} onClose={closePopup} icon={popupIcon} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
