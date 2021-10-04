const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Organization = require("../models/Organization.model");

router.get("/", (req, res) => {
  // you can access the query from req.query
  const { q, category } = req.query;

  let query;

  if (q !== "" && category !== "") {
    query = { $text: { $search: q }, categories: category };
  } else if (q === "" && category !== "") {
    query = { categories: category };
  } else if (category === "" && q !== "") {
    query = { $text: { $search: q } };
  } else if (q === "" && category === "") {
    query = null;
  }

  Organization.find(query)
    .then((organizationsFound) => res.status(200).json(organizationsFound))
    .catch((err) => {
      console.log("Review not updated: ", err);
      res.json(err);
    });
});

module.exports = router;
