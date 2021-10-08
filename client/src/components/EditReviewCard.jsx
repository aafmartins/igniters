import { useState, useEffect } from "react";
import axios from "axios";
import StarRatings from "react-star-ratings";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

let checkedOne = false;
let checkedTwo = false;
let checkedThree = false;
let checkedFour = false;
let checkedFive = false;

export default function EditReviewCard(props) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
  const { reviewId } = props;

  const changeRating = ( newRating ) => {
    setRating(newRating)
  }

  useEffect(() => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneReview = response.data;
        setStarsValue(oneReview.rating);
        setReview(oneReview.review);
        setRating(oneReview.rating);
      })
      .catch((error) => console.log(error));
  }, [reviewId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      review,
      rating,
    };

    setStarsValue(rating);

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .put(`${API_URL}/reviews/edit/${reviewId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        props.toggleForm();
        props.refreshOrg();
      });
  };

  const setStarsValue = (rating) => {
    checkedOne = false;
    checkedTwo = false;
    checkedThree = false;
    checkedFour = false;
    checkedFive = false;
    if (rating === 1) checkedOne = true;
    if (rating === 2) checkedTwo = true;
    if (rating === 3) checkedThree = true;
    if (rating === 4) checkedFour = true;
    if (rating === 5) checkedFive = true;
  };

  const deleteReview = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .delete(`${API_URL}/reviews/delete/${reviewId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        props.refreshOrg();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="EditReview">
      <form className="reviewForm" onSubmit={handleSubmit}>
        <div className="reviewFormInputContainer">
          {/* <label>Comment:</label> */}
          <textarea
            type="text"
            name="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>

        <div className="editReviewFormInputContainer">

          {/* <label>Rating:</label>
          <textarea
            type="Number"
            name="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          /> */}
          {/* <fieldset class="starability-basic">
            <legend>Rating:</legend>

          <fieldset class="starability-basic">

            <input
              type="radio"
              id="no-rate"
              class="input-no-rate"
              name={rating}
              checked={false}
              value="1"
              aria-label="No rating."
            />
            <input
              type="radio"
              id="first-rate1"
              name={rating}
              value="1"
              checked={checkedOne}
              onChange={(e) => setRating(e.target.value)}
            />
            <label for="first-rate1" title="Terrible">
              1 star
            </label>
            <input
              type="radio"
              id="first-rate2"
              name={rating}
              value="2"
              checked={checkedTwo}
              onChange={(e) => setRating(e.target.value)}
            />
            <label for="first-rate2" title="Not good">
              2 stars
            </label>
            <input
              type="radio"
              id="first-rate3"
              name={rating}
              value="3"
              checked={checkedThree}
              onChange={(e) => setRating(e.target.value)}
            />
            <label for="first-rate3" title="Average">
              3 stars
            </label>
            <input
              type="radio"
              id="first-rate4"
              name={rating}
              value="4"
              checked={checkedFour}
              onChange={(e) => setRating(e.target.value)}
            />
            <label for="first-rate4" title="Very good">
              4 stars
            </label>
            <input
              type="radio"
              id="first-rate5"
              name={rating}
              value="5"
              checked={checkedFive}
              onChange={(e) => setRating(e.target.value)}
            />
            <label for="first-rate5" title="Amazing">
              5 stars
            </label>
          </fieldset> */}

          <StarRatings
            rating={rating}
            starRatedColor="rgba(124, 94, 241, 0.5)"
            starHoverColor="rgba(124, 94, 241, 0.5)"	
            starEmptyColor='rgb(140, 140, 140)'
            starDimension='30px'
            starSpacing="0"
            changeRating={changeRating}
            numberOfStars={5}
            name='rating'
          />

        </div>

        <div className="editReviewFormButtonContainer ">
          <button className="button-52 reviewButtons" type="submit">
            Save
          </button>
          <button className="button-52 reviewButtons" onClick={deleteReview}>
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
