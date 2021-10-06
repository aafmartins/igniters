import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

function EditOrganizationPage(props) {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [email, setEmail] = useState("");
  const [categories, setCategories] = useState("");
  const [mainIdiom, setMainIdiom] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

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
        setMainIdiom(oneOrg.mainIdiom);
        setDescription(oneOrg.description);
        setUrl(oneOrg.url);
      })
      .catch((error) => console.log(error));
  }, [orgId]);

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
      .then(() => props.history.push("/"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="EditOrganizationPage">
      <img src="/images/edit.png" alt="Edit Form" className="aboutUsImg" />
      <div className="formContainer orgForm">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="formHeading">
            <h1>Edit Organization</h1>
          </div>
          <div className="formInputContainer">
            <label>Name:</label>
            <input
              placeholder="*required"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="formInputContainer">
            <label>Email:</label>
            <input
              placeholder="*required"
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="formInputContainer">
            <label>Website:</label>
            <input
              type="text"
              name="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div className="formInputContainer">
            <label>Street:</label>
            <input
              type="text"
              name="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>

          <div className="formInputContainer">
            <label>City:</label>
            <input
              placeholder="*required"
              type="text"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="formInputContainer">
            <label>Country:</label>
            <input
              placeholder="*required"
              type="text"
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <div className="formInputContainer">
            <label>Language:</label>
            <input
              type="text"
              name="mainIdiom"
              value={mainIdiom}
              onChange={(e) => setMainIdiom(e.target.value)}
            />
          </div>

          <div className="formInputContainer">
            <label htmlFor="categories">Categories:</label>
            <select
              name="categories"
              id="categories"
              multiple={true}
              onChange={(e) => {
                const values = [...e.target.options]
                  .filter((o) => o.selected)
                  .map((o) => {
                    return o.value;
                  });
                setCategories(values);
              }}
            >
              {/* <option disable="true" value="">
                Select a category from the list
              </option> */}
              <option value="Activism">Activism</option>
              <option value="Gender Discrimination">
                Gender Discrimination
              </option>
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

          <div className="formInputContainer">
            <label>Description:</label>
            <textarea
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="formSubmitButtonContainer">
            <button className="submitButton button-52" type="submit">
              Save
            </button>
          </div>
          <div className="formSubmitButtonContainer">
            <button
              className="submitButton button-52"
              onClick={deleteOrganization}
            >
              Delete Organization
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditOrganizationPage;
