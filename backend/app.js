var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// Connect to MongoDB
require("./db");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productsRouter = require("./routes/products");

var app = express();

/**
 * CORS Configuration
 * (Adjust origin for production)
 */
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

/**
 * Middlewares
 */
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/**
 * Routes
 */
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

/**
 * 404 Handler (API-style)
 */
app.use(function (req, res, next) {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

/**
 * Global Error Handler (NO res.render)
 */
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

module.exports = app;
