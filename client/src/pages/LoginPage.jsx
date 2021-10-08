import { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "./../contexts/auth.context";
import GoogleButton from "../components/GoogleButton";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { logInUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        const token = response.data.authToken;
        logInUser(token);
        props.history.push("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="LoginPage">
      <img src="/images/login.png" alt="Log in hero" className="images" />
      <div className="formContainer">
        <form onSubmit={handleLoginSubmit}>
          <div className="formHeading">
            <h1>Login</h1>
          </div>
          <div className="formInputContainer">
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={handleEmail}
            />
          </div>
          <div className="formInputContainer">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
            />
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="formSubmitButtonContainer">
            <button className="submitButton button-52 " type="submit">
              Login
            </button>
            <GoogleButton buttonText="Login" />
          </div>

          <div className="formInputContainer prompt">
            <p>Don't have an account yet?</p>
            <Link className="promptLink" to={"/signup"}>
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
