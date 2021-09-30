import { useState } from "react";
import axios from "axios";
import React from "react";

const API_URL = "http://localhost:3000/api";

function AddOrganizationPage(props) {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [email, setEmail] = useState("");
  const [categories, setCategories] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      name,
      country,
      city,
      street,
      email,
      categories,
      language,
      description,
    };

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .post(`${API_URL}/orgs`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Reset the state
        console.log(response);
        setName("");
        setCountry("");
        setCity("");
        setStreet("");
        setEmail("");
        setCategories("");
        setLanguage("");
        setDescription("");
        // props.refreshOrgs();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddProject">
      <h3>Add Organization</h3>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <hr />

        <label>Country:</label>
        <textarea
          type="text"
          name="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <hr />

        <label>City:</label>
        <textarea
          type="text"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <hr />

        <label>Street:</label>
        <textarea
          type="text"
          name="street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <hr />

        <label>Email:</label>
        <textarea
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <hr />

        <label>Categories:</label>
        <textarea
          type="text"
          name="categories"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
        />
        <hr />

        <label>Language:</label>
        <textarea
          type="text"
          name="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />
        <hr />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddOrganizationPage;
