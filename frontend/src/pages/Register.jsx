import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Popup } from '../components/Popup';
import gif from '../popup-image/tick.gif';



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

  const navigate = useNavigate()

  const changeInputHandler = (e) => {
    setUserData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const registerUser = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5000/api';
      const response = await axios.post(`${baseUrl}/users/register`, UserData);
      const newUser = await response.data;
      console.log(newUser);
      if (!newUser) {
        setError("Couldn;t register user.please try again")
      }
      setShowPopup(true);
      setPopupMessage('Update Successful!..');
      setPopupIcon(gif);
      setTimeout(() => {
        setShowPopup(false);
        navigate('/login')
      }, 1300);

    } catch (err) {
      setError(err.response.data.message)
    }
  }

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-10 rounded-lg w-[650px] shadow-lg border">
        <h2 className="text-center font-semibold text-3xl mt-5 mb-7 mx-auto">Sign Up</h2>
        <form onSubmit={registerUser}>
          <div className="flex justify-center items-center">
            <div className="space-y-4 w-full max-w-md">
              {error && <p className="bg-red-400 p-1 rounded mb-4 text-center">{error}</p>}
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
              <button type="submit" className="bg-violet-400 p-2 rounded w-full hover:bg-violet-600 hover:text-gray-100 font-medium ">Register</button>
              <medium className="block text-center mt-4">Already have an account? <Link to="/login" className="text-violet-700">Login</Link></medium>
            </div>
          </div>
        </form>
        {showPopup && <Popup message={popupMessage} onClose={closePopup} icon={popupIcon} />}
      </div>
    </div>
  );
};
