const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const Organization = require("../models/Organization.model");

// PUT /api/remove-saved-org
router.put("/remove-saved-org", (req, res, next) => {
  const {
    orgId
  } = req.body;
  const userId = req.payload._id;

  console.log("I am inside the put!", orgId, userId);

  User.findByIdAndUpdate(
      userId, {
        $pull: {
          savedOrganizations: orgId,
        },
      }, {
        new: false,
      }
    )
    .then((updatedSavedList) => {
      res.json(updatedSavedList);
    })
    .catch((error) => res.json(error));
});

// POST /api/save-orgs
router.put("/save-org", (req, res, next) => {
  const {
    orgId
  } = req.body;
  const userId = req.payload._id;

  User.findByIdAndUpdate(
      userId, {
        $addToSet: {
          savedOrganizations: orgId,
        },
      }, {
        new: false,
      }
    )
    .then((updatedSavedList) => {
      res.json(updatedSavedList);
    })
    .catch((error) => res.json(error));
});

//THIS GET DISPLAYS SAVED BOOKS BOOKSHELF, AND POPULATES USER
router.get("/my-saved-orgs", (req, res) => {
  const userId = req.payload._id;
  if (userId) {
    User.findById(userId)
      .populate("savedOrganizations")
      .populate({
        path: "savedOrganizations",
        populate: {
          path: "reviews",
          select: "rating",
        },
      })
      .then((savedOrgs) => {
        res.json(savedOrgs);
      })
      .catch((err) => console.log(err));
  } else res.redirect("/");
});

//THIS GET DISPLAYS CREATED BOOKS BOOKSHELF, AND POPULATES USER
router.get("/my-created-orgs", (req, res) => {
  Organization.find({
      creator: req.payload._id,
    })
    .populate("reviews")
    .then((createdOrgs) => {
      res.json(createdOrgs);
    })
    .catch((err) => console.log(err));
});

module.exports = router;