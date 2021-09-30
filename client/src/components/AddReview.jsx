import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/api";


function AddReview(props) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);

  
  const handleSubmit = (e) => {
    e.preventDefault(); 
    const { userId, organizationId } = props;
    
    const requestBody = { review, 
        rating, userId };

    // Get the token from the localStorage
    const storedToken = localStorage.getItem('authToken');

    // Send the token through the request "Authorization" Headers   
    axios
      .post(
        `${API_URL}/org/${organizationId}/reviews`,                          // please check---------------------------------------------
        requestBody,
        { headers: { Authorization: `Bearer ${storedToken}` } }        
      )
      .then((response) => {
        // Reset the state to clear the inputs
        setReview("");
        setRating(1);
      
        props.refreshOrganization();
      })
      .catch((error) => console.log(error));
  };

  
  return (
    <div className="AddTask">
      <h3>Add a Review</h3>
      
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

        <button type="submit">Add Review</button>
      </form>
    </div>
  );
}

export default AddReview;