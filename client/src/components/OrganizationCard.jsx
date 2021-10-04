import { Link } from "react-router-dom";
import react from "react";
import {orgAverageRating} from "../javascripts/orgAverageRating"

function OrganizationCard(props) {
  const {
    _id,
    name,
    country,
    city,
    street,
    email,
    categories,
    mainIdiom,
    description,
    url,
    reviews
  } = props;

  // calculate average rating from the reviews array
  const avgRating = orgAverageRating(reviews);

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
      {reviews.length === 0 ? 
        "no reviews yet" : (
        <div>
          <p class="starability-result" data-rating={avgRating}>Rated: {avgRating} stars</p>
          <p>{reviews.length}</p>
        </div>
        )
      }
    </div>
  );
}

export default OrganizationCard;
