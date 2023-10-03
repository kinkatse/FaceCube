import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButtons from './ProfileButtons';
import './NavBar.css';
import Search from '../Search';
import AuthForm from '../AuthForm';
import { openModal } from '../../store/modal';

const NavBar = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const handleOpenModal = (modalType) => {
    dispatch(openModal(modalType));
  }
  
  let leftNavBar = (
    <section className='left-nav-bar'>
      <button onClick={() => handleOpenModal("sidebar")} className="hamburger-menu">
        <i className="fa-solid fa-bars"/>
      </button>
      <NavLink exact to="/">Home</NavLink>
    </section>
  )

  let middleNavBar = (
    <section className='mid-nav-bar'>
      <Search/>
    </section>
  )

  let rightNavBar;
  if (sessionUser) {
    rightNavBar = (
      <section className='right-nav-bar'>
        <ProfileButtons user={sessionUser}/>
      </section>
    );
  } else {
    rightNavBar = (
      <section className='right-nav-bar'>
        <AuthForm/>
      </section>
    );
  }

  return (
    <nav>
      {leftNavBar}
      {middleNavBar}
      {rightNavBar}
    </nav>
  );
}

export default NavBar;