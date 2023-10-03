import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import AboutLinks from "../NavBar/ProfileAboutLinks";
import { blurHandler, checkAnyErrors, errorManager, mapErrors } from "./ErrorUtils";
import "./SignupForm.css"

function SignupForm({ handleOpenModal, handleCloseModal }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
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
        if (data?.errors) {
          let newErrors = { ...errors }
          for (let error of data.errors) {
            if (error.includes("Email")) {
              newErrors['email'].push(error);
            } else if (error.includes("Username")) {
              newErrors['username'].push(error);
            } else if (error.includes("Password")) {
              newErrors['password'].push(error);
            }
          }
          setErrors(newErrors);
        }
      });
  };

  const changeHandler = (e, type) => {
    const newErrors = errorManager(e, type, errors)
    setErrors(newErrors)
    if (type === "email") setEmail(e.target.value)
    else if (type === "username") setUsername(e.target.value)
    else if (type === "password") setPassword(e.target.value)
    else if (type === "firstname") setFirstname(e.target.value)
    else if (type === "lastname") setLastname(e.target.value)
  }

  const renderInput = (type) => {
    let placeHolder;
    let inputVal;
    let inputType = "text";

    switch(type) {
      case "email":
        inputVal = email;
        placeHolder = "Email";
        break;
      case "username":
        inputVal = username;
        placeHolder = "Username";
        break;
      case "password":
        inputVal = password;
        placeHolder = "Password";
        inputType = "password"
        break;
      case "firstname":
        inputVal = firstname;
        placeHolder = "First Name";
        break;
      case "lastname":
        inputVal = lastname;
        placeHolder = "Last Name";
        break;
      default:
        return null;
    }

    return (
      <>
        {mapErrors(errors, type)}
        <input
          type={inputType}
          value={inputVal}
          onChange={(e) => changeHandler(e, type)}
          onBlur={(e) => blurHandler(e, type, errors, setErrors)}
          placeholder={placeHolder}
          className={mapErrors(errors, type).length > 0 ? "signup-error" : ""}
          required
        />
      </>
    )
  }

  const renderSubmitButton = () => {
    if (checkAnyErrors(errors, email, username, password, firstname, lastname)) {
      return (<button type="submit" className="signup-button-cancel" disabled>Sign Up</button>)
    } else {
      return (<button type="submit" className="signup-button">Sign Up</button>)
    }
  }

  return (
    <div className='signup-whole'>
      <form onSubmit={handleSubmit} className="signup-form">
        <h1>Please fill in all the fields below</h1>
        {renderInput("email")}
        {renderInput("username")}
        {renderInput("password")}
        {renderInput("firstname")}
        {renderInput("lastname")}
        {renderSubmitButton()}
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