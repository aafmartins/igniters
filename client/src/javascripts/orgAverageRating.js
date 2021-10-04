//function that receives an array of organization reviews and calculates the average rating
// if the array is empty it returns 0
export function orgAverageRating (reviewsArray) {
    if (reviewsArray.length === 0) return 0;
    const ratingArray = reviewsArray.map(element => element.rating)
    return Math.round(ratingArray.reduce((acc, currentRating) => acc + currentRating
    , 0) / ratingArray.length);
}