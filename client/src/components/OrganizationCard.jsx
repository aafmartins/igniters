import { Link } from "react-router-dom";
import react from "react";
import {orgAverageRating} from "../javascripts/orgAverageRating"
import '../styles/organizationCard.css'
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
    <div className = "container-sm cardcontainers" >
      <Link className="headerlink" to={`/orgs/${_id}`}>
        <h3>{name}</h3>
      </Link>
      <hr />
      <p className="location">
        {city}, {country} <p className="locationHeader">(Location)</p>
      </p>

      <p style={{ maxWidth: "400px" }}>
        {description.substring(0, 150) + "..."}
      </p>
      {reviews.length === 0 ? 
          <div className="reviewDisplay">
          <p class="starability-result" data-rating="0"></p>
          <p lassName="reviewsNum">(0)</p>
        </div> : (
        <div className="reviewDisplay">
          <p class="starability-result" data-rating={avgRating}>Rated: {avgRating} stars</p>
          <p className="reviewsNum">{reviews.length}</p>
        </div>
        )
      }
    </div>
  );
}

export default OrganizationCard;
