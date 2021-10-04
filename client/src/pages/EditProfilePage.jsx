import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function EditProfilePage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  //   const [errorMessage, setErrorMessage] = useState(undefined);
  const userId = props.match.params.id;

  useEffect(() => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

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
      })
      .catch((error) => console.log(error));
  }, [userId]);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      name,
      password,
      email,
    };

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");
    const userId = props.match.params.id;
    // Send the token through the request "Authorization" Headers
    axios
      .put(`${API_URL}/users/${userId}/edit`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        props.history.push(`/profile`);
      });
  };

  const deleteUser = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .delete(`${API_URL}/users/${userId}/delete`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => props.history.push("/"))
      .catch((err) => console.log(err));
  };

  //   const handleEditSubmit = (e) => {
  //     e.preventDefault();
  //     // Create an object representing the request body
  //     const requestBody = { email, password, name };

  //     // Make an axios request to the API
  //     // If POST request is successful redirect to login page
  //     // If the request resolves with an error, set the error message in the state
  //     axios
  //       .post(`${API_URL}/users/${userId}/edit`, requestBody)
  //       .then((response) => props.history.push("/login"))
  //       .catch((error) => {
  //         const errorDescription = error.response.data.message;
  //         setErrorMessage(errorDescription);
  //       });
  //   };

  return (
    <div className="ProfilePage">
      <h1>Edit Profile</h1>

      <form onSubmit={handleEditSubmit}>
        <label>Email:</label>
        <input type="text" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          placeholder="******"
          onChange={handlePassword}
        />

        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={handleName} />

        <button type="submit">Save</button>
      </form>

      <button onClick={deleteUser}>Delete User</button>

      {/* {errorMessage && <p className="error-message">{errorMessage}</p>} */}
    </div>
  );
}

export default EditProfilePage;
