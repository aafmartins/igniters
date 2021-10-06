import { useState, useEffect } from "react";
import axios from "axios";
import OrganizationCard from "./OrganizationCard";
import '../styles/MyCreatedOrg.css'
import { Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

function MySavedOrganizations(props) {
  const [savedOrgs, setSavedOrgs] = useState([]);

  const getAllSavedOrgs = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/user-org/my-saved-orgs`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        setSavedOrgs(response.data.savedOrganizations);
      })
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllSavedOrgs();
  }, []);

  return (
    <div>
    {savedOrgs.length===0 ?

    <div className="imageContainer">
    <img src="/images/hero.png" className="myCreatedOrgImage" alt="" />
      <Link to="/orgs">
        <button className="button-52">Save organizations</button>
      </Link>
    </div>
    :
    <div>
        <div className="imageContainer">
      <img src="/images/hero.png" className="myCreatedOrgImage" alt="" />
    
      {savedOrgs.map((organization) => (
        <div className="container-fluid"> 
          <OrganizationCard key = {organization._id} {...organization}/>
        </div>
        ))
        }
    </div>
    </div>
    }
    
    </div>





//   <div className="" >
//       {savedOrgs.map((organization) => (
//         <div className="container-fluid" >
//           <OrganizationCard key={organization._id} {...organization} />
//         </div>
//       ))}
// </div>
  );
}

export default MySavedOrganizations;
