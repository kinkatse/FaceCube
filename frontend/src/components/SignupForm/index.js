import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import AboutLinks from "../NavBar/ProfileAboutLinks";
import "./SignupForm.css"

function SignupForm({ handleOpenModal, handleCloseModal }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.signup({ email, username, password }))
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
  };

  const errorsObj = {
    email: [],
    username: [],
    password: []
  };
  for (let error of errors) {
    if (error.includes("Email")) {
      errorsObj['email'].push(error)
    } else if (error.includes("Username")) {
      errorsObj['username'].push(error)
    } else if (error.includes("Password")) {
      errorsObj['password'].push(error)
    }
  }

  const emailErrors = (<>
    {errorsObj['email'].map(error => <p key={error} className="signup-errors">{error}</p>)}
  </>)
  const usernameErrors = (<>
    {errorsObj['username'].map(error => <p key={error} className="signup-errors">{error}</p>)}
  </>)
  const passwordErrors = (<>
    {errorsObj['password'].map(error => <p key={error} className="signup-errors">{error}</p>)}
  </>)

  return (
    <div className='signup-whole'>
      <form onSubmit={handleSubmit} className="signup-form">
        <h1>Please fill in all the fields below</h1>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        {emailErrors}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        {usernameErrors}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {passwordErrors}
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          required
        />
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
      <section className="other-signup-options">
        <button onClick={() => handleOpenModal("login")} className="signin-button">
          Login into an existing account
        </button>
      </section>
      <AboutLinks fromAuth={true}/>
    </div>
  );
}

export default SignupForm;