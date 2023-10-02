import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { openModal } from '../../store/modal';
import './AuthForm.css';

const AuthForm = () => {
    const dispatch = useDispatch();

    const handleOpenModal = (modalType) => {
        dispatch(openModal(modalType));
    }
    
    return (
        <>
          <button onClick={() => handleOpenModal("login")} className="dropdown-button auth-button">
            <i className="fa-regular fa-circle-user navbar-user-icon"/>
            <h1>Sign In</h1>
          </button>
        </>
    )
}

export default AuthForm;