if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors")
const app = express();
app.use(express.json())

const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theaterRouter = require("./theaters/theaters.router");
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

app.use(cors());
app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theaterRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
