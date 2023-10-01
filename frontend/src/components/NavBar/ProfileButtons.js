import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';

const ProfileButtons = ({ user, showMenu, menuButton }) => {
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button onClick={menuButton} className="dropdown-button">
        <i className="fa-solid fa-user"/>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <NavLink exact to={`/channel/${user.id}`}>Channel</NavLink>
          <NavLink exact to={`/studio`}>Studio</NavLink>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButtons;