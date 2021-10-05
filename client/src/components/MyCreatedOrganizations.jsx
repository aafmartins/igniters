import {
  useState,
  useEffect
} from "react";
import axios from "axios";
import OrganizationCard from "./OrganizationCard";

const API_URL = process.env.REACT_APP_API_URL;

function MyCreatedOrganizations() {
  const [myCreatedOrgs, setmyCreatedOrgs] = useState([]);

  const getmyCreatedOrgs = () => {
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

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getmyCreatedOrgs();
  }, []);

  return ( <
    div > {
      myCreatedOrgs.map((organization) => ( <
        OrganizationCard key = {
          organization._id
        } {
          ...organization
        }
        />
      ))
    } <
    /div>
  );
}

export default MyCreatedOrganizations;