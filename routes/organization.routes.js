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
    // creator,
    // reviews,
  } = req.body;
  console.log("this is req.body", req.body);
  console.log("req payload", req.payload);
  geocoder
    .forwardGeocode({
      query: street + " " + city + " " + country,
      limit: 1,
    })
    .send()

    // body.features[0].geometry;
    .then((res) => {
      const geometry = res.body.features[0].geometry;

      //   console.log("geometry", geometry);
      //   console.log("creating organization");
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
          console.log("new organization", response);
          res.json(response);
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

/*
//  GET /api/projects -  Retrieves all of the projects
router.get("/new-org", (req, res, next) => {
    Org.find()
        .populate("tasks")
        .then((allOrgs) => res.json(allOrgs))
        .catch((err) => res.json(err));
});

//  GET /api/projects/:projectId -  Retrieves a specific project by id
router.get("/orgs/:orgId", (req, res, next) => {
    const {
        orgId
    } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orgId)) {
        res.status(400).json({
            message: "Specified id is not valid"
        });
        return;
    }

    // Each Project document has `tasks` array holding `_id`s of Task documents
    // We use .populate() method to get swap the `_id`s for the actual Task documents
    Org.findById(OrgId)
        .populate("tasks")
        .then((org) => res.status(200).json(org))
        .catch((error) => res.json(error));
});

// PUT  /api/projects/:projectId  -  Updates a specific project by id
router.put("/orgs/:orgId", (req, res, next) => {
    const {
        orgId
    } = req.params;

    if (!mongoose.Types.ObjectId.isValid(OrgId)) {
        res.status(400).json({
            message: "Specified id is not valid"
        });
        return;
    }

    Org.findByIdAndUpdate(orgId, req.body, {
            new: true
        })
        .then((updatedOrg) => res.json(updatedOrg))
        .catch((error) => res.json(error));
});

// DELETE  /api/projects/:projectId  -  Deletes a specific project by id
router.delete("/orgs/:orgId", (req, res, next) => {
    const {
        projectId
    } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orgId)) {
        res.status(400).json({
            message: "Specified id is not valid"
        });
        return;
    }

    Org.findByIdAndRemove(projectId)
        .then(() =>
            res.json({
                message: `Project with ${orgId} is removed successfully.`,
            })
        )
        .catch((error) => res.json(error));
});
*/

module.exports = router;
