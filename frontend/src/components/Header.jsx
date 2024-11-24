import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/logo.jpg';
import { AiOutlineClose } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa';
import { UserContext } from '../context/userContext';
export const Header = () => {
  const [isNavShowing,setIsNavShowing]=useState(window.innerWidth > 800 ? true : false);
  const {currentUser} = useContext(UserContext)

  const closeNavHandle = () =>{
    if(window.innerWidth < 800){
      setIsNavShowing(false);
    }else{
      setIsNavShowing(true)
    }
    
  }
  return (
    <nav className="nav__container flex items-center justify-between h-20 border-b-2 px-6">
      <div className="w-[60px] h-[60px] sticky">
        <Link to="/">
          <img src={Logo} alt="logo" className=" ml-10 object-cover" />
        </Link>
      </div>
      {currentUser && isNavShowing && <ul className="lg:flex md:flex flex-none gap-10 items-center nav__menu">
        <li><Link to={`/profile/${currentUser.id}`} onClick={closeNavHandle} className='text-xl font-medium'>{currentUser?.name}</Link></li>
        <li><Link to="/create" onClick={closeNavHandle}>Create Post</Link></li>
        <li><Link to="/authors" onClick={closeNavHandle}>Authors</Link></li>
        <li><Link to="/logout" onClick={closeNavHandle}>Logout</Link></li>
      </ul>}
      {!currentUser && isNavShowing && <ul className="lg:flex md:flex flex-none gap-10 items-center nav__menu">
        <li><Link to="/authors" onClick={closeNavHandle}>Authors</Link></li>
        <li><Link to="/login" onClick={closeNavHandle}>Login</Link></li>
      </ul>}
      <button className='nav__toggle-btn' onClick={()=> setIsNavShowing(!isNavShowing)}>
        {isNavShowing?<AiOutlineClose/>:<FaBars/> }</button>
    </nav>
  );
};
