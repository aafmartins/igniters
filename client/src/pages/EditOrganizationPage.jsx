
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/api";

function EditOrganizationPage(props) {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [email, setEmail] = useState("");
  const [categories, setCategories] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [picture, setPicture] = useState("");

  const orgId = props.match.params.id;

  useEffect(() => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/orgs/${orgId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneOrg = response.data;
        setName(oneOrg.name);
        setCountry(oneOrg.country);
        setCity(oneOrg.city);
        setStreet(oneOrg.street);
        setEmail(oneOrg.email);
        setCategories(oneOrg.categories);
        setLanguage(oneOrg.language);
        setDescription(oneOrg.description);
        setUrl(oneOrg.url);
        setPicture(oneOrg.picture);
      })
      .catch((error) => console.log(error));
  }, [orgId]);

  const handleFormSubmit = (e) => {
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
      url,
      picture,
    };

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .put(`${API_URL}/orgs/edit/${orgId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        props.history.push(`/orgs/${orgId}`);
      });
  };

  const deleteOrganization = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .delete(`${API_URL}/orgs/delete/${orgId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => props.history.push("/orgs"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="EditProjectPage">
      <h3>Edit the Project</h3>

      <form onSubmit={handleFormSubmit} enctype="multipart/form-data">
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
        <label>Url:</label>
        <textarea
          type="text"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <label>Picture url:</label>
        <input
          type="file"
          name="picture"
          id="picture"
          value={picture}
          onChange={(e) => setPicture(e.target.value)}
        />

        <button type="submit">Update Organization</button>
      </form>

      <button onClick={deleteOrganization}>Delete Organization</button>
    </div>
  );
}

export default EditOrganizationPage;

