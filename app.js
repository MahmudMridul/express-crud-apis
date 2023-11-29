"use strict"
// @ts-check

const express = require("express");
const morgan = require("morgan");
const tourRouter = require("./routes/tourRouter");
const userRouter = require("./routes/userRouter");
const app = express();

//MIDDLEWARES
app.use(express.json())

// custome middleware function definition
function getRequestTime(req, res, next) {
   req.requestTime = new Date().toISOString();
   next();
}
app.use(getRequestTime);
app.use(morgan("dev"));
app.use("/api/tours", tourRouter);
app.use("/api/users", userRouter);

module.exports = app;