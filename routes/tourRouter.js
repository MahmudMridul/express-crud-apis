"use strict"
// @ts-check

const express = require("express");
const router = express.Router();
const { getAllTours, addTour, getTourByID, updateTour, deleteTour } = require("./../controllers/tourController");

router.route("/")
   .get(getAllTours)
   .post(addTour);

router.route("/:id")
   .get(getTourByID)
   .patch(updateTour)
   .delete(deleteTour);

module.exports = router;