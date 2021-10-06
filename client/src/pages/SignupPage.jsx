import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/formStyle.css";
import GoogleButton from "./../components/GoogleButton";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleCountry = (e) => setCountry(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name, country };

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => props.history.push("/login"))
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="SignupPage">
      <img src="/images/signup.png" alt="Sign up hero" className="images" />

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="formContainer">
        <form onSubmit={handleSignupSubmit}>
          <div className="formHeading">
            <h1>Sign Up</h1>
          </div>
          <div className="formInputContainer">
            <label>Name:</label>
            <input type="text" name="name" value={name} onChange={handleName} />
          </div>
          <div className="formInputContainer">
            <label>Country of residence:</label>
            <input
              type="text"
              name="country"
              value={country}
              onChange={handleCountry}
            />
          </div>
          <div className="formInputContainer">
            <label>Email:</label>
            <input
              placeholder="your_email@igniters.com"
              type="text"
              name="email"
              value={email}
              onChange={handleEmail}
            />
          </div>
          <div className="formInputContainer">
            <label>Password:</label>
            <input
              placeholder="*6+ chars, inc lowercase, uppercase + numbers*"
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
            />
          </div>

          <div className="formSubmitButtonContainer">
            <button className="submitButton button-52 " type="submit">
              Sign Up
            </button>
            <GoogleButton buttonText="Sign Up" />
          </div>

          <div className="formInputContainer prompt">
            <p>Already have account?</p>
            <Link className="promptLink" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
