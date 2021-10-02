const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Organization = require("../models/Organization.model");

router.get("/search", (req, res) => {
  // you can access the query from req.query
  const { q } = req.query;

  Organization.find({ city: q })
    .then((organizationsFound) => res.json(organizationsFound))
    .catch((err) => {
      console.log("Review not updated: ", err);
      res.json(err);
    });
});

module.exports = router;
