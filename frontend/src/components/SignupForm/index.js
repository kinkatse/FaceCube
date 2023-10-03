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
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [backendErrors, setBackendErrors] = useState([]);
  const [errors, setErrors] = useState({
    email: [],
    username: [],
    password: [],
    firstname: [],
    lastname: []
  });

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.signup({ email, username, password, firstname, lastname }))
      .then(handleCloseModal)
      .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) setBackendErrors(data.errors);
        else if (data) setBackendErrors([data]);
        else setBackendErrors([res.statusText]);
      });
  };

  // for (let error of backendErrors) {
  //   if (error.includes("Email")) {
  //     let newErrors = { ...errors }
  //     newErrors['email'].push(error)
  //     setErrors(newErrors)
  //   } else if (error.includes("Username")) {
  //     let newErrors = { ...errors }
  //     newErrors['username'].push(error)
  //     setErrors(newErrors)
  //   } else if (error.includes("Password")) {
  //     let newErrors = { ...errors }
  //     newErrors['password'].push(error)
  //     setErrors(newErrors)
  //   }
  // }

  const changeHandler = (e, type) => {
    const typeText = type[0].toUpperCase() + type.slice(1);
    const credentialText = `${typeText} field needs to be at least 3 characters`;
    const passwordText = `${typeText} field needs to be at least 6 characters`;
    const nameText = `${typeText.slice(0, -4)} name field cannot be empty`;
    let newErrors = { ...errors }
    let fieldArr = newErrors[type];
    if (e.target.value.length > 0) {
      if (type === "email" && errors[type].includes(credentialText) && e.target.value.length > 2) {
        let index = fieldArr.findIndex(el => el === credentialText)
        fieldArr.splice(index)
      } else if (type === "username" && errors[type].includes(credentialText) && e.target.value.length > 2) {
        let index = fieldArr.findIndex(el => el === credentialText)
        fieldArr.splice(index)
      } else if (type === "password" && errors[type].includes(passwordText) && e.target.value.length > 5) {
        let index = fieldArr.findIndex(el => el === passwordText)
        fieldArr.splice(index)
      } else if (type === "firstname" && errors[type].includes(nameText)) {
        let index = fieldArr.findIndex(el => el === nameText)
        fieldArr.splice(index)
      } else if (type === "lastname" && errors[type].includes(nameText)) {
        let index = fieldArr.findIndex(el => el === nameText)
        fieldArr.splice(index)
      }
    }
    setErrors(newErrors)
    if (type === "email") setEmail(e.target.value)
    else if (type === "username") setUsername(e.target.value)
    else if (type === "password") setPassword(e.target.value)
    else if (type === "firstname") setFirstname(e.target.value)
    else if (type === "lastname") setLastname(e.target.value)
  }

  const blurHandler = (e, type) => {
    const typeText = type[0].toUpperCase() + type.slice(1);
    const credentialText = `${typeText} field needs to be at least 3 characters`;
    const passwordText = `${typeText} field needs to be at least 6 characters`;
    const nameText = `${typeText.slice(0, -4)} name field cannot be empty`;
    let newErrors = { ...errors }
    let fieldArr = newErrors[type];
    if (e.target.value.length < 3) {
      if (type === "email" && !errors[type].includes(credentialText)) {
        fieldArr.push(credentialText)
      } else if (type === "username" && !errors[type].includes(credentialText)) {
        fieldArr.push(credentialText)
      } else if (type === "password" && !errors[type].includes(passwordText) && e.target.value.length < 6) {
        fieldArr.push(passwordText)
      } else if (type === "firstname" && !errors[type].includes(nameText) && e.target.value.length < 1) {
        fieldArr.push(nameText)
      } else if (type === "lastname" && !errors[type].includes(nameText) && e.target.value.length < 1) {
        fieldArr.push(nameText)
      }
    }
    setErrors(newErrors)
  }

  const emailErrors = (
    errors['email'].map(error => <p key={error} className="signup-errors">{error}</p>)
  )
  const usernameErrors = (
    errors['username'].map(error => <p key={error} className="signup-errors">{error}</p>)
  )
  const passwordErrors = (
    errors['password'].map(error => <p key={error} className="signup-errors">{error}</p>)
  )
  const firstnameErrors = (
    errors['firstname'].map(error => <p key={error} className="signup-errors">{error}</p>)
  )
  const lastnameErrors = (
    errors['lastname'].map(error => <p key={error} className="signup-errors">{error}</p>)
  )

  let isFrontendErrors = false;
  if (errors['email'].length > 0) isFrontendErrors = true;
  if (errors['username'].length > 0) isFrontendErrors = true;
  if (errors['password'].length > 0) isFrontendErrors = true;
  if (errors['firstname'].length > 0) isFrontendErrors = true;
  if (errors['lastname'].length > 0) isFrontendErrors = true;
  if (!email || !username || !password || !firstname || !lastname) isFrontendErrors = true;

  return (
    <div className='signup-whole'>
      <form onSubmit={handleSubmit} className="signup-form">
        <h1>Please fill in all the fields below</h1>
        {emailErrors}
        <input
          type="text"
          value={email}
          onChange={(e) => changeHandler(e, "email")}
          onBlur={(e) => blurHandler(e, "email")}
          placeholder="Email"
          className={emailErrors.length > 0 ? "signup-error" : ""}
          required
        />
        {usernameErrors}
        <input
          type="text"
          value={username}
          onChange={(e) => changeHandler(e, "username")}
          onBlur={(e) => blurHandler(e, "username")}
          placeholder="Username"
          className={usernameErrors.length > 0 ? "signup-error" : ""}
          required
        />
        {passwordErrors}
        <input
          type="password"
          value={password}
          onChange={(e) => changeHandler(e, "password")}
          onBlur={(e) => blurHandler(e, "password")}
          placeholder="Password"
          className={passwordErrors.length > 0 ? "signup-error" : ""}
          required
        />
        {firstnameErrors}
        <input
          type="text"
          value={firstname}
          onChange={(e) => changeHandler(e, "firstname")}
          onBlur={(e) => blurHandler(e, "firstname")}
          placeholder="First Name"
          className={firstnameErrors.length > 0 ? "signup-error" : ""}
          required
        />
        {lastnameErrors}
        <input
          type="text"
          value={lastname}
          onChange={(e) => changeHandler(e, "lastname")}
          onBlur={(e) => blurHandler(e, "lastname")}
          placeholder="Last Name"
          className={lastnameErrors.length > 0 ? "signup-error" : ""}
          required
        />
        {isFrontendErrors && 
          <button type="submit" className="signup-button-cancel">Sign Up</button>
        }
        {!isFrontendErrors && 
          <button type="submit" className="signup-button">Sign Up</button>
        }
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