// require database configuration
require("./../config/db");

// bin/seeds.js
const mongoose = require("mongoose");

const orgs = require("./data");

const Organization = require("./../models/Organization.model");

// Organization.deleteMany()
//   .then((deletedOrgs) =>
//     console.log(`Deleted ${deletedOrgs.deletedCount} organizations`)
//   )
//   .then(
//     Organization.insertMany(orgs).then((insertedOrgs) => {
//       console.log(`Created ${insertedOrgs.length} organizations`);
//       mongoose.connection.close();
//     })
//   )
//   .catch((err) =>
//     console.log(`An error occurred seeding organizations to the DB: ${err}`)
//   );

const importData = async () => {
  console.log(mongoose.connections[0].name);
  try {
    await Organization.deleteMany()
    await Organization.insertMany(orgs);
    console.log("Data seeded");
    process.exit();
  } catch (err) {
    console.log("Data not seeded", err);
  }
};

importData();