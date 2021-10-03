const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Organization = require("../models/Organization.model");

router.get("/", (req, res) => {
  // you can access the query from req.query
  const { q } = req.query;

  Organization.find({ city: q })
    .then((organizationsFound) => res.status(200).json(organizationsFound))
    .catch((err) => {
      console.log("Review not updated: ", err);
      res.json(err);
    });

  // Organization.index({ city: "text" });
  // Organization.find({ $text: { $search: q } })
  //   const { q } = req.query;
  //   // let query = q.toLowerCase();
  //   console.log("req.query", q);
  //   Organization.find({ $text: { $search: q } })
  //     .then((organizationsFound) => res.json(organizationsFound))
  //     .catch((err) => {
  //       console.log("Organizations not found: ", err);
  //       res.json(err);
  //     });
  // });
});

module.exports = router;
