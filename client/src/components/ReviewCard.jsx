// We are deconstructing the props object directly in the parentheses of the function
function ReviewCard({ review, rating, reviewer }) {
    return (
      <div className="ReviewCard card">
        <h3>{rating} out 5</h3>
        <h4>Comment:</h4>
        <p>{review}</p>
        <p>by: {reviewer}</p>
      </div>
    );
  }
  
  export default ReviewCard;
  
  