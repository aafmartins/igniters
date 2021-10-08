// require database configuration
require("./../config/db");

// bin/seeds.js
const mongoose = require("mongoose");

const orgs = require("./data");

const Organization = require("./../models/Organization.model");


const importData = async () => {
  try {
    await Organization.deleteMany();
    await Organization.insertMany(orgs);
    process.exit();
  } catch (err) {
    console.log("Data not seeded", err);
  }
};

importData();