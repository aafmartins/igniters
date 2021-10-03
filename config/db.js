// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGODB_URI = `${process.env.MONGODB_URL}/${process.env.DB_NAME}`;
const seedUrl = "mongodb://localhost/igniters";

mongoose
  .connect(seedUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.log("url", MONGODB_URI);
    console.error("Error connecting to mongo: ", err);
  });