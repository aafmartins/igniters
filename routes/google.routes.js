const router = require("express").Router();
const User = require('../models/User.model')

// The client makes a API request to this url sending the data in the body
router.post("/google/info", (req, res, next) => {
  const {firstName, lastName, email, image, googleId, password, name, country} = req.body
  // the name itself will include the last name
  try {
    // Create the user in the DB
    User.create({
      firstName, 
      lastName, 
      googleId, 
      image, 
      email,
      name,
      password,
      country,
    })
      .then((response) => {
        // Save the loggedInInfo in the session
        // We'll stick to using sessions just to not over complicate the students with tokens and cookies
        req.session.loggedInUser = response
        res.status(200).json({data: response})
      })
  }
  catch(error) {
    res.status(500).json({error: `${error}`})
  }
});

module.exports = router;
