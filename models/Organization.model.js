const { Schema, model } = require("mongoose");

// passing the virtual schema properties to json object to display the popUp org in map
const opts = { toJSON: { virtuals: true } };

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const organizationSchema = new Schema(
  {
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
    }, //required
    street: {
      type: String,
    }, //not required
    email: {
      type: String,
      required: true,
    }, //required
    categories: {
      type: [String],
    }, //not required
    language: {
      type: String,
    }, //not required
    description: {
      type: String,
    }, //not required
    url: {
      type: String,
    }, //not required
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
        default: [],
      },
    ],
    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  opts
);

organizationSchema.index({ name: "text", country: "text", city: "text" });

// virtual property that is displayed when an org is clicked in the cluster map
organizationSchema.virtual("properties.popUpMarkup").get(function () {
  return `<a href="/orgs/${this._id}">${this.name}</a>`;
});

const Organization = model("Organization", organizationSchema);

// Organization.createIndexes({ city: "text" });

module.exports = Organization;
