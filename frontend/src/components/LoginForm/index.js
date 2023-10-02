import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import AboutLinks from '../NavBar/ProfileAboutLinks';
import './LoginForm.css';

function LoginForm({ handleOpenModal, handleCloseModal }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [credentialPlaceholder, setCredentialPlaceHolder] = useState('Email')

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ credential, password }))
      .then(handleCloseModal)
      .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  }

  const handleDemo = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({
      credential: "demo@user.io",
      password: "password"
    })).then(handleCloseModal)
  }

  setTimeout(() => {
    const input = document.getElementById("credential")
    if (input && credentialPlaceholder === "Email") {
      setCredentialPlaceHolder("Username")
      // setTimeout(() => {
      //   input.classList.remove("credential-email")
      //   input.classList.add("credential-username")
      // }, 1000)
    } else if (input && credentialPlaceholder === "Username") {
      setCredentialPlaceHolder("Email")
      // setTimeout(() => {
      //   input.classList.remove("credential-username")
      //   input.classList.add("credential-email")
      // }, 1000)
    // } else {
    //   setCredentialPlaceHolder("Email")
    //   setTimeout(() => {
    //     input.classList.remove("credential-username")
    //     input.classList.add("credential-email")
    //   }, 1000)
    }
  }, 2000)

  return (
    <div className='login-whole'>
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Please enter your login and password</h1>
        <ul>
          {errors.map(error => <li key={error} className="login-errors">{error}</li>)}
        </ul>
        {/* <h1 id="credential">{credentialPlaceholder}</h1> */}
        <input
          id="credential"
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          placeholder={credentialPlaceholder}
          required
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className='login-button'>Log In</button>
      </form>
      <section className='other-login-options'>
        <button onClick={handleDemo} className='demo-login'>Demo Login</button>
        <button onClick={() => handleOpenModal("signup")} className='create-button'>Create an account</button>
      </section>
      <AboutLinks fromAuth={true}/>
    </div>
  );
}

export default LoginForm;