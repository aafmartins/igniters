const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;

const geocoder = mbxGeocoding({
  accessToken: mapBoxToken,
});

const Organization = require("../models/Organization.model");

//  POST /api/orgs  -  Creates a new organization
router.post("/orgs", (req, res, next) => {
  const {
    name,
    country,
    city,
    street,
    email,
    categories,
    language,
    description,
  } = req.body;

  geocoder
    .forwardGeocode({
      query: street + " " + city + " " + country,
      limit: 1,
    })
    .send()
    .then((response) => {
      const geometry = response.body.features[0].geometry;

      Organization.create({
        name,
        country,
        city,
        street,
        email,
        categories,
        language,
        description,
        creator: req.payload._id,
        // reviews,
        geometry,
      })
        .then((response) => {
          res.status(200).json(response);
          console.log("new organization", response);
        })
        .catch((err) => {
          console.log("Organization not created!", err);
          res.json(err);
        });
    })
    .catch((err) => {
      console.log("Geometry not created!", err);
      res.json(err);
    });
});

//  GET /api/orgs -  Retrieves all of the organizations
router.get("/orgs", (req, res, next) => {
  Organization.find()
    .then((allOrgs) => res.json(allOrgs))
    .catch((err) => res.json(err));
});

//  GET /api/orgs/:orgId -  Retrieves a specific organization by id
router.get("/orgs/:orgId", (req, res, next) => {
  const { orgId } = req.params;
  // console.log(req.params);
  if (!mongoose.Types.ObjectId.isValid(orgId)) {
    res.status(400).json({
      message: "Specified id is not valid",
    });
    return;
  }

  // Each Project document has `tasks` array holding `_id`s of Task documents
  // We use .populate() method to get swap the `_id`s for the actual Task documents
  Organization.findById(orgId)
    // .populate("reviews")
    .then((org) => res.status(200).json(org))
    .catch((error) => res.json(error));
});

// PUT  /api/projects/:projectId  -  Updates a specific project by id
router.put("/orgs/edit/:orgId", (req, res, next) => {
  const { orgId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(orgId)) {
    res.status(400).json({
      message: "Specified id is not valid",
    });
    return;
  }

  Organization.findByIdAndUpdate(orgId, req.body, {
    new: true,
  })
    .then((updatedOrg) => res.json(updatedOrg))
    .catch((error) => res.json(error));
});

// DELETE  /api/projects/:projectId  -  Deletes a specific project by id
router.delete("/orgs/delete/:orgId", (req, res, next) => {
  const { orgId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(orgId)) {
    res.status(400).json({
      message: "Specified id is not valid",
    });
    return;
  }

  Organization.findByIdAndRemove(orgId)
    .then(() =>
      res.json({
        message: `Project with ${orgId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
