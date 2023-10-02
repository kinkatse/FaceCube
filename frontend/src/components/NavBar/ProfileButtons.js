import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';

const ProfileButtons = ({ user }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  const closeMenu = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    if (!showMenu) return;
    // Listening for any click on the page, so then it invokes the close Menu function
    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  let profileHeader = (
    <header className="profile-dropdown-header">
      <i className="fa-solid fa-user user-pic"/>
      <div className="profile-dropdown-details">
        {/* <h1>{user.firstName}</h1> */}
        <h1>Kin Ka Tse</h1>
        <h2>{user.username}</h2>
        <h2>{user.email}</h2>
        <button>Edit User Info</button>
      </div>
    </header>
  )

  let userOptions = (
    <section>
      <NavLink exact to={`/channel/${user.id}`}>Channel</NavLink>
      <NavLink exact to={`/studio`}>Studio</NavLink>
      <button onClick={logout}>Sign Out</button>
    </section>
  )

  return (
    <>
      <button onClick={openMenu} className="dropdown-button">
        <i className="fa-solid fa-user"/>
      </button>
      {showMenu && (
        <div className="profile-dropdown">
          {profileHeader}
          {userOptions}
        </div>
      )}
    </>
  );
}

export default ProfileButtons;