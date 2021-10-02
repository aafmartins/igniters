const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const organizationSchema = new Schema({
  name: {
    type: String,
    required: true,
  }, //required
  country: {
    type: String,
    required: true,
  }, //required
  city: {
    type: String,
    required: true,
    text: true,
  }, //required
  street: {
    type: String,
    required: false,
  }, //not required
  email: {
    type: String,
    required: true,
  }, //required
  categories: {
    type: [String],
    required: false,
  }, //not required
  language: {
    type: String,
    required: false,
  }, //not required
  description: {
    type: String,
    required: false,
  }, //required
  url: {
    type: String,
    required: false,
  }, //required
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
      default: [],
      required: false,
    },
  ],
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: false,
    },
    coordinates: {
      type: [Number],
      required: false,
    },
  },
});

const Organization = model("Organization", organizationSchema);

module.exports = Organization;
