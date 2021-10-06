var express = require('express');

var logger = require('morgan');

const cookieParser = require("cookie-parser");

const favicon = require("serve-favicon");

const path = require("path");

const session = require('express-session');

const cors = require("cors")

const MongoStore = require('connect-mongo');

// Middleware configuration
module.exports = (server) => {

  // Because this is a server that will accept requests from outside and it will be hosted ona server with a `proxy`, express needs to know that it should trust that setting.
  // Services like heroku use something called a proxy and you need to add this to your server
  server.set("trust proxy", 1);

  // Setup cors to allow split refresh with nodemon in development.
  // The value of localhost:5000 is hard coded. The port (:5000) must match what is set for the create-react-app start script.
  server.use(
    cors({
      origin: process.env.CORS_ORIGIN || "http://localhost:5000"
    })
  );

  // In development environment the app logs
  server.use(logger("dev"));

  // To have access to `body` property in the request
  server.use(express.json());
  server.use(express.urlencoded({
    extended: false
  }));
  server.use(cookieParser());

  // Handles access to the public folder
  server.use(express.static(path.join(__dirname, "..", "client", "build")));

  // Handles access to the favicon
  // app.use(favicon(path.join(__dirname, "..", "public", "images", "favicon.ico")));

  server.use(
    session({
      secret: 'Globtrotters-secret',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000
      },
      store: MongoStore.create({
        mongoUrl: `${process.env.MONGODB_URL}/${process.env.DB_NAME}`
      })
    })
  );

};