import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Popup } from '../components/Popup';
import gif from '../popup-image/tick.gif';
import userloginsideicon from '../images/userloginsideicon.png';

const InputField = ({ type, placeholder, name, value, onChange, autoFocus = false }) => (
  <input
    type={type}
    placeholder={placeholder}
    name={name}
    value={value}
    onChange={onChange}
    autoFocus={autoFocus}
    className="bg-white shadow p-2 w-full rounded"
  />
);

export const Register = () => {
  const [UserData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupIcon, setPopupIcon] = useState(gif);

  const navigate = useNavigate();

  const changeInputHandler = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5000/api';
      const response = await axios.post(`${baseUrl}/users/register`, UserData);
      const newUser = await response.data;
      if (!newUser) {
        setError("Couldn't register user. Please try again.");
      }
      setShowPopup(true);
      setPopupMessage('Registration Successful!');
      setPopupIcon(gif);
      setTimeout(() => {
        setShowPopup(false);
        navigate('/login');
      }, 1300);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex items-center justify-center mt-10 px-4">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-3xl flex flex-col md:flex-row">
       
      <div className="flex justify-center items-center mt-14 mb-8 md:mb-0 mr-10 w-[300px] md:w-[300px] h-[300px] md:h-[300px]  overflow-hidden ">
  <img src={userloginsideicon} alt="userloginsideicon" className="w-full h-full object-cover  " />
</div>



        <div className="md:w-1/2">
          <h2 className="text-center font-semibold text-3xl mb-7">Sign Up</h2>
          <form onSubmit={registerUser}>
            <div className="space-y-4">
              {error && (
                <p className="bg-red-400 p-1 rounded mb-4 text-center text-white">{error}</p>
              )}
              <InputField
                type="text"
                placeholder="Full Name"
                name="name"
                value={UserData.name}
                onChange={changeInputHandler}
                autoFocus
              />
              <InputField
                type="email"
                placeholder="Email"
                name="email"
                value={UserData.email}
                onChange={changeInputHandler}
              />
              <InputField
                type="password"
                placeholder="Password"
                name="password"
                value={UserData.password}
                onChange={changeInputHandler}
              />
              <InputField
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={UserData.password2}
                onChange={changeInputHandler}
              />
              <button
                type="submit"
                className="bg-violet-400 p-2 rounded w-full hover:bg-violet-600 hover:text-gray-100 font-medium"
              >
                Register
              </button>
              <medium className="block text-center mt-4">
                Already have an account?{' '}
                <Link to="/login" className="text-violet-700">
                  Login
                </Link>
              </medium>
            </div>
          </form>
        </div>
      </div>
      {showPopup && <Popup message={popupMessage} onClose={closePopup} icon={popupIcon} />}
    </div>
  );
};
