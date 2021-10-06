import { useState } from "react";
import axios from "axios";
import "../styles/formStyle.css";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

function AddOrganizationPage(props) {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [email, setEmail] = useState("");
  const [categories, setCategories] = useState([]);
  const [mainIdiom, setMainIdiom] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

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
        setCategories([]);
        setMainIdiom("");
        setDescription("");
        setUrl("");
        props.history.push(`/orgs`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddOrganization">
      <div className="formContainer">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="formHeading">
            <h1>Create an Organization</h1>
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddOrganizationPage;
