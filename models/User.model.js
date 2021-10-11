const {
  Schema,
  model
} = require("mongoose");

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
  savedOrganizations: [{
    type: Schema.Types.ObjectId,
    ref: "Organization",
    default: [],
  }, ],
  username: {
    type: String,
  }
});

const User = model("User", userSchema);

module.exports = User;