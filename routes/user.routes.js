//IMPORT PACKAGES AND USER MODEL
const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const saltRounds = process.env.SALT || 10;

// IMPORTS FUNCTIONS
// const { isAuthenticated } = require("./../middleware/jwt.middleware.js");

//require cloudinary configuration file
// const fileUploader = require("../config/cloudinary");

// //THIS GET METHOD DELETE
// router.get("/:id/delete", (req, res) => {
//   User.findByIdAndDelete(req.params.id)
//     .then((deletedUser) => {
//       res.redirect("/");
//     })
//     .catch((err) => console.log(err));
// });

// //EDIT BOOKS
// router
//   .route("/:id/edit")
//   //THIS GET METHOD RENDERS THE EDIT PROFILE
//   .get((req, res) => {
//     User.findById(req.params.id)
//       .then((user) => {
//         res.render("pages/user/edit-profile", {
//           user,
//           style: "Profile/edit-profile.css",
//         });
//       })
//       .catch((err) => console.log(err));
//   })
//   //THIS POST RECEIVES INFORMATION FROM FORM AND UPDATES USER
//   .post(fileUploader.single("avatarUrl"), (req, res) => {
//     const { username, email, password } = req.body;

//     const avatarUrl = req.file?.path;

//     if (
//       !username ||
//       username === "" ||
//       !password ||
//       password === "" ||
//       !email ||
//       email === "" ||
//       !email.includes("@")
//     ) {
//       res.render("pages/auth/signup", {
//         errorMessage: "Username and password are required",
//         style: "Login-Signup/auth.css",
//       });
//     }

//     const salt = bcrypt.genSaltSync(saltRounds);
//     const hashPassword = bcrypt.hashSync(password, salt);

//     User.findByIdAndUpdate(req.session.currentUser._id, {
//       username,
//       email,
//       password: hashPassword,
//       avatarUrl: avatarUrl || req.session.currentUser.avatarUrl,
//     })
//       .then(() => {
//         req.session.currentUser.avatarUrl =
//           avatarUrl || req.session.currentUser.avatarUrl;
//       })
//       .then(() => res.redirect("/users/profile"))
//       .catch((error) =>
//         res.render("pages/auth/signup", {
//           errorMessage: error,
//           style: "Login-Signup/auth.css",
//         })
//       );
//   });

//THIS GET METHOD DISPLAYS PROFILE
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    // User.findById(req.session.currentUser._id)
    .then((user) => {
      // Send back the object with user data
      res.status(200).json(user);
    })
    .catch((err) => res.json(err));
});

module.exports = router;