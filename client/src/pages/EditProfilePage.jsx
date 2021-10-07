import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

function EditProfilePage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const userId = props.match.params.id;
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/users/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneUser = response.data;
        setName(oneUser.name);
        setPassword(oneUser.password);
        setEmail(oneUser.email);
        setCountry(oneUser.country);
      })
      .catch((error) => console.log(error));
  }, [userId]);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleCountry = (e) => setCountry(e.target.value);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      name,
      password,
      email,
      country,
    };

    // Send the token through the request "Authorization" Headers
    axios
      .put(`${API_URL}/users/${userId}/edit`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        props.history.push(`/profile`);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const deleteUser = () => {
    // Send the token through the request "Authorization" Headers
    axios
      .delete(`${API_URL}/users/${userId}/delete`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => props.history.push("/"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="EditProfilePage">
      <img src="/images/edit.png" alt="Edit Form" className="images" />
      <div className="formContainer">
        <form onSubmit={handleEditSubmit}>
          <div className="formHeading">
            <h1>Edit Profile</h1>
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
              type="password"
              name="password"
              placeholder="******"
              onChange={handlePassword}
            />
          </div>

          <div className="formSubmitButtonContainer">
            <button className="submitButton button-52 " type="submit">
              Save
            </button>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="formSubmitButtonContainer">
            <button className="submitButton button-52 " onClick={deleteUser}>
              Delete Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfilePage;
