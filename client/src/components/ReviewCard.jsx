import { AuthContext } from "./../contexts/auth.context";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import EditReviewCard from "./../components/EditReviewCard";
import "../styles/reviews.css";
import StarRatings from "react-star-ratings";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

// We are deconstructing the props object directly in the parentheses of the function
function ReviewCard(props) {
  const { review: comment, rating, reviewer, _id: reviewId } = props;
  const { userToken } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);
  const [review, setReview] = useState(null);

  const getReview = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        setReview(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getReview();
  }, []);

  // const deleteReview = () => {
  //   // Get the token from the localStorage
  //   const storedToken = localStorage.getItem("authToken");

  //   // Send the token through the request "Authorization" Headers
  //   axios
  //     .delete(`${API_URL}/reviews/delete/${reviewId}`, {
  //       headers: { Authorization: `Bearer ${storedToken}` },
  //     })
  //     .then(() => {
  //       props.refreshOrg();
  //     })
  //     .catch((err) => console.log(err));
  // };

  //function to toggle the form AddReview hidden or showing style
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="ReviewCard">
      {!showForm ? (
        <>
          {/* <p class="starability-result" data-rating={rating}>
            Rated: {rating} stars
          </p> */}
          <StarRatings
            rating={rating}
            starRatedColor="rgba(124, 94, 241, 0.5)"
            starHoverColor="rgba(124, 94, 241, 0.5)"	
            starEmptyColor='rgb(140, 140, 140)'
            starDimension='30px'
            starSpacing="0"
            numberOfStars={5}
            name='rating'
            isSelectable='false'
          />
          {/* <h6>Comment:</h6> */}
          <p className="reviewText">
            {comment} <br /> <i>by: {reviewer.name}</i>
          </p>
        </>
      ) : null}
      {userToken._id === reviewer._id ? (
        <>
          <button className="button-52 reviewButtons" onClick={toggleForm}>
            {showForm ? "Cancel" : "Edit"}
          </button>
          <br />
          {showForm ? (
            <div>
              <EditReviewCard
                refreshOrg={props.refreshOrg}
                toggleForm={toggleForm}
                reviewId={reviewId}
              />
              {/* <button
                className="button-52 reviewButtons"
                onClick={deleteReview}
              >
                Delete
              </button> */}
            </div>
          ) : null}
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default ReviewCard;
