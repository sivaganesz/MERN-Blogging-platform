<<<<<<< HEAD
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { Popup } from '../components/Popup';
import logoutIcon from '../popup-image/logout.png'

export const Logout = () => {
  const { setCurrentUser } = useContext(UserContext);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupicon, setPopupIcon] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    handleLogout();
  }, []); // Run once on component mount

  const handleLogout = () => {
    setCurrentUser(null);
    setPopupMessage('Logout successfull!');
    setPopupIcon(logoutIcon)
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      navigate('/login');
    }, 800);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && <Popup message={popupMessage} onClose={closePopup} icon={popupicon}/>}
    </>
  );
};
=======
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { Popup } from '../components/Popup';
import logoutIcon from '../popup-image/logout.png'

export const Logout = () => {
  const { setCurrentUser } = useContext(UserContext);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupicon, setPopupIcon] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    handleLogout();
  }, []); // Run once on component mount

  const handleLogout = () => {
    setCurrentUser(null);
    setPopupMessage('Logout successfull!');
    setPopupIcon(logoutIcon)
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      navigate('/login');
    }, 800);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && <Popup message={popupMessage} onClose={closePopup} icon={popupicon}/>}
    </>
  );
};
>>>>>>> 8e56e10c44ed715152572326d6bfe6ee3e1ca8fe
