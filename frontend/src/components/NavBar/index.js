import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButtons from './ProfileButtons';
import './NavBar.css';
import Search from '../Search';
import AuthForm from '../AuthForm';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false);

  const menuButton = () => {
      if (showMenu) setShowMenu(false)
      else setShowMenu(true)
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <section className='nav-dropdown'>
        <ProfileButtons user={sessionUser} showMenu={showMenu} menuButton={menuButton}/>
      </section>
    );
  } else {
    sessionLinks = (
      <section className='nav-dropdown'>
        <AuthForm showMenu={showMenu} menuButton={menuButton}/>
      </section>
    );
  }

  return (
    <nav>
      <NavLink exact to="/">Home</NavLink>
      <Search/>
      {sessionLinks}
    </nav>
  );
}

export default NavBar;