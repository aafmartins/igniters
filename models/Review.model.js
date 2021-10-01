const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const reviewSchema = new Schema({
  review: {
    type: String,
    required: false,
    maxlength: 500
  }, //not required
  rating: {
    type: Number,
  }, //not required
  reviewer: {
    type: Schema.Types.ObjectId,  
    ref: "User",
  },
},
  {
    timestamps: true
  });

const Review = model("Review", reviewSchema);

module.exports = Review;


