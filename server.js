require('dotenv/config')

const createError = require('http-errors');
const express = require('express');

const {
  isAuthenticated
} = require("./middleware/jwt.middleware"); // <== IMPORT

const server = express();

// Functional curling style of loading configuration
require('./config/db')
require('./config/global')(server)

// Handling routes here 👇
const authRouter = require("./routes/auth.routes");
server.use("/auth", authRouter);

// const apiRouter = require('./routes/api');
// server.use('/api', apiRouter);
// const usersRouter = require('./routes/users');
// server.use('/users', usersRouter);

// catch 404 and forward to error handler
server.use(function (req, res, next) {
  next(createError(404));
});

// error handler
server.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    error: err
  });
});

module.exports = server;