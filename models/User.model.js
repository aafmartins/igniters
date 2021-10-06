const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  country: {
    type: String,
    default: "unknown",
  },
  savedOrganizations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      default: [],
    },
  ],
  username: {
    type: String,
    // unique: true -> Ideally, should be unique, but its up to you
  },
  firstName: String, 
  lastName: String, 
  image: String,
  //linkedInId: String, 
  googleId: String, 
  //facebookId: String,
});

const User = model("User", userSchema);

module.exports = User;
