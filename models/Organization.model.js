const { Schema, model } = require("mongoose");

// passing the virtual schema properties to json object to display the popUp org in map
const opts = { toJSON: { virtuals: true} }

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
}, opts);

// virtual property that is displayed when an org is clicked in the cluster map
organizationSchema.virtual('properties.popUpMarkup').get(function () {
    return `<a href="/orgs/${this._id}">${this.name}</a>`
});


const Organization = model("Organization", organizationSchema);

module.exports = Organization;
