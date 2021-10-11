import {
  useState,
  useEffect
} from "react";
import axios from "axios";
import OrganizationCard from "./OrganizationCard";
import { Link } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

function MyCreatedOrganizations() {
  const [myCreatedOrgs, setmyCreatedOrgs] = useState([]);

  const getMyCreatedOrgs = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/user-org/my-created-orgs`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        setmyCreatedOrgs(response.data);
      })
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial renders
  // by setting the empty dependency array - []
  useEffect(() => {
    getMyCreatedOrgs();
  }, []);

  return (
    <div>
    {myCreatedOrgs.length===0 ?

    <div className="imageContainer">
    <img src="/images/created-org.png" className="myCreatedOrgImage" alt="" />
      <Link to="/orgs/create">
        <button className="button-52">Create an organization</button>
      </Link>
    </div>
    :
    <div>
        <div className="imageContainer">
      <img src="/images/created-org.png" className="myCreatedOrgImage" alt="" />
    
      {myCreatedOrgs.map((organization) => (
        <div className="container-fluid"> 
          <OrganizationCard key = {organization._id} {...organization}/>
        </div>
        ))
        }
    </div>
    </div>
    }
    
    </div>
  );
}

export default MyCreatedOrganizations;