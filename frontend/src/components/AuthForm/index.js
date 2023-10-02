import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './AuthForm.css';

const AuthForm = () => {
    const [showMenu, setShowMenu] = useState(false);
  
    const menuButton = () => {
      if (showMenu) setShowMenu(false)
      else setShowMenu(true)
    }
    
    return (
        <>
          <button onClick={menuButton} className="dropdown-button auth-button">
            <i className="fa-regular fa-circle-user navbar-user-icon"/>
            <h1>Sign In</h1>
          </button>
          {showMenu && (
            <ul className="profile-dropdown-whole">
              <NavLink to="/login" className="auth-button">Log In</NavLink>
              <NavLink to="/signup" className="auth-button">Sign Up</NavLink>
            </ul>
          )}
        </>
    )
}

export default AuthForm;