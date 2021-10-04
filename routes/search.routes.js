const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Organization = require("../models/Organization.model");

router.get("/", (req, res) => {
  // you can access the query from req.query
  const { q } = req.query;

  const query = { $text: { $search: q } };

  const sort = { score: { $meta: "textScore" } };

  Organization.find(query)
    .sort(sort)
    .then((organizationsFound) => res.status(200).json(organizationsFound))
    .catch((err) => {
      console.log("Review not updated: ", err);
      res.json(err);
    });
});

module.exports = router;
