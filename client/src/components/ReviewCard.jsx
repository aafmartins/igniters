import { AuthContext } from "./../contexts/auth.context";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import EditReviewCard from "./../components/EditReviewCard";

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

  //function to toggle the form AddReview hidden or showing style
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="ReviewCard">
      {!showForm ? (
        <>
          <p class="starability-result" data-rating={rating}>
          </p>
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
