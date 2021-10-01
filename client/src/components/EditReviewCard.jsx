import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/api";

export default function EditReviewCard(props) {
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(1);
    const {reviewId} = props;

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

    return (
    <div className="AddReview">
      
      <form onSubmit={handleSubmit}>
        <label>Comment:</label>
        <input
          type="text"
          name="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <label>Rating:</label>
        <textarea
          type="Number"
          name="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}


