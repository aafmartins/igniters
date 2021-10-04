import { useState } from "react";
import axios from "axios";
// import React from "react";
const API_URL = "http://localhost:3000/api";

function AddOrganizationPage(props) {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [email, setEmail] = useState("");
  const [categories, setCategories] = useState("");
  const [mainIdiom, setMainIdiom] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  // const [picture, setPicture] = useState("");
  // const [pictureUrl, setPictureUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      name,
      country,
      city,
      street,
      email,
      categories,
      mainIdiom,
      description,
      url,
    };
    // const picture = req.file.path

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .post(`${API_URL}/orgs`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Reset the state
        setName("");
        setCountry("");
        setCity("");
        setStreet("");
        setEmail("");
        setCategories("");
        setMainIdiom("");
        setDescription("");
        setUrl("");
        props.history.push(`/orgs`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddProject">
      <h3>Add Organization</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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

        {/* <label>Categories:</label>
        <textarea
          type="text"
          name="categories"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
        /> */}
        <div>
          <label htmlFor="categories">Search by Category:</label>
          <select
            name="categories"
            id="categories"
            multiple
            onChange={(e) => {
              console.log(e.target.value);
              setCategories(e.target.value);
            }}
          >
            <option disable="true" value="">
              Select a category from the list
            </option>
            <option value="Activism">Activism</option>
            <option value="Gender Discrimination">Gender Discrimination</option>
            <option value="Human Rights">Human Rights</option>
            <option value="Inequality">Inequality</option>
            <option value="Malnutrition">Malnutrition</option>
            <option value="Maternal Health">Maternal Health</option>
            <option value="Reproductive Rights">Reproductive Rights</option>
            <option value="Social Solidarity">Social Solidarity</option>
            <option value="Victim Support">Victim Support</option>
            <option value="Victim Protection">Victim Protection</option>
            <option value="Women in Tech">Women in Tech</option>
          </select>
        </div>
        <hr />

        <label>Language:</label>
        <textarea
          type="text"
          name="mainIdiom"
          value={mainIdiom}
          onChange={(e) => setMainIdiom(e.target.value)}
        />
        <hr />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Url:</label>
        <textarea
          type="text"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddOrganizationPage;
