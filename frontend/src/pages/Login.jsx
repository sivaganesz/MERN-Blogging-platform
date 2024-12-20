import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/userContext';
import { Popup } from '../components/Popup';
import login from '../popup-image/login.png'
import userloginicon from '../images/userloginicon.png'
import userloginsideicon from '../images/userloginsideicon.png'



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

export const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupIcon, setPopupIcon] = useState('');

  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);

  const changeInputHandler = (e) => {
    setUserData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5000/api';
      const response = await axios.post(`${baseUrl}/users/login`, userData);
      const user = response.data;
      setCurrentUser(user);
      setPopupMessage('Login successfull!');
      setPopupIcon(login)
      setShowPopup(true);
      
      // Delay navigation to give time for the popup to be visible
      setTimeout(() => {
        setShowPopup(false); // Hide the popup
        navigate('/'); // Navigate to the home page
      }, 800); // Adjust the delay as needed
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
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
</div>        <div>
        <h2 className="text-center font-semibold text-3xl mt-2 mb-4 mx-auto">Sign In</h2>
          <div className='flex items-center mt-10 justify-center'><img src={userloginicon} alt="userprofile" className='w-28 h-28 border rounded-full mb-5 it' /></div>
        <form onSubmit={loginUser}>
          <div className="flex justify-center items-center">
            <div className="space-y-4 w-80 max-w-md">
              {error && <p className="bg-red-400 p-1 rounded mb-4 text-center">{error}</p>}
              <InputField
                type="email"
                placeholder="Email"
                name="email"
                value={userData.email}
                onChange={changeInputHandler}
              />
              <InputField
                type="password"
                placeholder="Password"
                name="password"
                value={userData.password}
                onChange={changeInputHandler}
              />
              <button type="submit" className="bg-violet-400 p-2 rounded w-full hover:bg-violet-600 hover:text-gray-100 font-medium">Login</button>
              <small className="block text-center mt-10">Don't have an account? <Link to="/register" className="text-violet-700">register</Link></small>
            </div>
          </div>
        </form>
        </div>
        {showPopup && <Popup message={popupMessage} onClose={closePopup} icon={popupIcon}/>}
      </div>
    </div>
  );
};
