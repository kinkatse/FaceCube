export const errorManager = (e, type, errors) => {
    const typeText = type[0].toUpperCase() + type.slice(1);
    const credentialText = `${typeText} field needs to be at least 3 characters`;
    const passwordText = `${typeText} field needs to be at least 6 characters`;
    const nameText = `${typeText.slice(0, -4)} name field cannot be empty`;
    let newErrors = { ...errors };
    let fieldArr = newErrors[type];
    let idx;
    if (e.target.value.length > 0) {
      if (type === "email" && fieldArr.includes(credentialText) && e.target.value.length > 2) {
        idx = fieldArr.findIndex(el => el === credentialText);
        fieldArr.splice(idx);
      } else if (type === "username" && fieldArr.includes(credentialText) && e.target.value.length > 2) {
        idx = fieldArr.findIndex(el => el === credentialText);
        fieldArr.splice(idx);
      } else if (type === "password" && fieldArr.includes(passwordText) && e.target.value.length > 5) {
        idx = fieldArr.findIndex(el => el === passwordText);
        fieldArr.splice(idx);
      } else if (type === "firstname" && fieldArr.includes(nameText)) {
        idx = fieldArr.findIndex(el => el === nameText);
        fieldArr.splice(idx);
      } else if (type === "lastname" && fieldArr.includes(nameText)) {
        idx = fieldArr.findIndex(el => el === nameText);
        fieldArr.splice(idx);
      }
    }
    if (fieldArr.includes("Email must be in email format")) {
      idx = fieldArr.findIndex(el => el === "Email must be in email format");
      fieldArr.splice(idx);
    }
    if (fieldArr.includes("Email has already been taken")) {
      idx = fieldArr.findIndex(el => el === "Email has already been taken");
      fieldArr.splice(idx);
    }
    if (fieldArr.includes("Username has already been taken")) {
      idx = fieldArr.findIndex(el => el === "Username has already been taken");
      fieldArr.splice(idx);
    }
    if (fieldArr.includes("Password is too short (minimum is 6 characters)")) {
      idx = fieldArr.findIndex(el => el === "Password is too short (minimum is 6 characters)");
      fieldArr.splice(idx);
    }
    return newErrors
}

export const blurHandler = (e, type, errors, setErrors) => {
    const typeText = type[0].toUpperCase() + type.slice(1);
    const credentialText = `${typeText} field needs to be at least 3 characters`;
    const passwordText = `${typeText} field needs to be at least 6 characters`;
    const nameText = `${typeText.slice(0, -4)} name field cannot be empty`;
    let newErrors = { ...errors };
    let fieldArr = newErrors[type];
    if (e.target.value.length < 3) {
      if (type === "email" && !fieldArr.includes(credentialText)) {
        fieldArr.push(credentialText);
      } else if (type === "username" && !fieldArr.includes(credentialText)) {
        fieldArr.push(credentialText);
      } else if (type === "password" && !fieldArr.includes(passwordText) && e.target.value.length < 6) {
        fieldArr.push(passwordText);
      } else if (type === "firstname" && !fieldArr.includes(nameText) && e.target.value.length < 1) {
        fieldArr.push(nameText);
      } else if (type === "lastname" && !fieldArr.includes(nameText) && e.target.value.length < 1) {
        fieldArr.push(nameText);
      }
    }
    setErrors(newErrors)
}

export const mapErrors = (errors, type) => {
    return (errors[type].map(error => <p key={error} className="signup-errors">{error}</p>))
}

export const checkAnyErrors = (errors, email, username, password, firstname, lastname) => {
    if (errors['email'].length > 0) return true;
    if (errors['username'].length > 0) return true;
    if (errors['password'].length > 0) return true;
    if (errors['firstname'].length > 0) return true;
    if (errors['lastname'].length > 0) return true;
    if (!email || !username || !password || !firstname || !lastname) return true;
    return false;
}
