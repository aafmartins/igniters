const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
// const mapBoxToken = process.env.MAPBOX_TOKEN;
// const geocoder = mbxGeocoding({
//   accessToken: mapBoxToken,
// });
const User = require("../models/User.model");
const Organization = require("../models/Organization.model");

//THIS GET DISPLAYS SAVED BOOKS BOOKSHELF, AND POPULATES USER
router.get("/my-saved-orgs", (req, res) => {
    const userId = req.payload._id
    if (userId) {
        User.findById(userId)
            .populate("savedOrganizations")
            .then((savedOrgs) => {
                res.json(savedOrgs)
            })
            .catch((err) => console.log(err));
    } else res.redirect("/");
});

//THIS GET DISPLAYS CREATED BOOKS BOOKSHELF, AND POPULATES USER
router.get("/my-created-orgs", (req, res) => {

    Organization.find({
            creator: req.payload._id
        })
        .then((createdOrgs) => {
            res.json(createdOrgs)
        })
        .catch((err) => console.log(err));

});

module.exports = router;