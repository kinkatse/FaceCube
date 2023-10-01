import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './AuthForm.css';

const AuthForm = ({ showMenu, menuButton }) => {
    
    return (
        <>
            <button onClick={menuButton} className="dropdown-button">
                <i className="fa-solid fa-user"/>
            </button>
            {showMenu && (
                <ul className="profile-dropdown">
                    <NavLink to="/login" className="auth-button">Log In</NavLink>
                    <NavLink to="/signup" className="auth-button">Sign Up</NavLink>
                </ul>
            )}
        </>
    )
}

export default AuthForm;