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
      <i className="fa-solid fa-user user-pic-icon"/>
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
    <section className="profile-dropdown-user-options">
      <NavLink exact to={`/channel/${user.id}`} className="user-options">
        <i className="fa-regular fa-user channel-icon"/>
        <h1>Your Channel</h1>
      </NavLink>
      <NavLink exact to={`/studio`} className="user-options">
        <i className="fa-solid fa-cube studio-icon"/>
        <h1>FaceCube Studio</h1>
      </NavLink>
      <button onClick={logout} className="user-options">
        <i className="fa-solid fa-right-from-bracket signout-icon"/>
        <h1>Sign Out</h1>
      </button>
    </section>
  )

  let aboutLinks = (
    <section>
      <h1>Github</h1>
      <h1>LinkedIn</h1>
      <h1>Portfolio</h1>
    </section>
  )

  return (
    <>
      <button onClick={openMenu} className="dropdown-button">
        <i className="fa-solid fa-user navbar-user-pic-icon"/>
      </button>
      {showMenu && (
        <div className="profile-dropdown-whole">
          {profileHeader}
          {userOptions}
          {aboutLinks}
        </div>
      )}
    </>
  );
}

export default ProfileButtons;