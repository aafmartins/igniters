import { Link } from "react-router-dom";
import react from "react";

function OrganizationCard(props) {
  const {
    _id,
    name,
    country,
    city,
    street,
    email,
    categories,
    language,
    description,
  } = props;

  return (
    <div>
      <Link to={`/orgs/${_id}`}>
        <h3>{name}</h3>
      </Link>
      <p>
        {city}, {country}
      </p>
      <p style={{ maxWidth: "400px" }}>
        {description.substring(0, 150) + "..."}
      </p>
    </div>
  );
}

export default OrganizationCard;
