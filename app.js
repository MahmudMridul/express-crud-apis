"use strict"
// @ts-check

const express = require("express");
const fs = require("fs");
const port = 8001;

const app = express();
app.use(express.json()) //middleware

// custome middleware function definition
function getRequestTime(req, res, next) {
   req.requestTime = new Date().toISOString();
   next();
}

app.use(getRequestTime); // using custom middleware

const tours = JSON.parse(fs.readFileSync(`${__dirname}/data.json`));

function getAllTours(req, res) {
   res.status(200).json({
      status: "success",
      size: tours.length,
      requestTime: req.requestTime,
      data: {
         tours,
      }
   });
}

function getTourByID(req, res) {
   const id = req.params.id * 1;
   const tour = tours.find(tour => tour.id === id);
   if (!tour) {
      return res.status(404).json({
         status: "not found",
         message: `Tour with id ${id} doesn't exist`,
         requestTime: req.requestTime,
      });
   }
   res.status(200).json({
      status: "success",
      size: 1,
      requestTime: req.requestTime,
      data: {
         tour,
      }
   });
}

function addTour(req, res) {
   const id = tours.length;
   const newTour = { id, ...req.body };
   tours.push(newTour);
   fs.writeFile(
      `${__dirname}/data.json`,
      JSON.stringify(tours),
      (err) => {
         res.status(201).json({
            status: "success",
            size: 1,
            requestTime: req.requestTime,
            data: {
               tour: newTour,
            }
         });
      }
   );
}

function addTours(req, res) {
   const newTours = [...req.body];

   newTours.forEach(newTour => {
      let id = tours.length;
      const tour = { id, ...newTour };
      tours.push(tour);
   });

   fs.writeFile(
      `${__dirname}/data.json`,
      JSON.stringify(tours),
      (err) => {
         res.status(201).json({
            status: "success",
            size: newTours.length,
            requestTime: req.requestTime,
            data: {
               tours: newTours,
            }
         });
      }
   );
}

function updateTour(req, res) {
   const id = req.params.id * 1;
   const update = tours.find(tour => tour.id === id);

   if (!update) {
      return res.status(404).json({
         status: "not found",
         message: `Tour with id ${id} doesn't exist`,
         requestTime: req.requestTime,
      });
   }
   const updatedTour = { ...req.body };
   console.log(updatedTour);

   for (let prop in updatedTour) {
      update[prop] = updatedTour[prop];
   }
   console.log(update);

   const updatedTours = tours.map(tour => {
      if (tour.id === id) {
         return update;
      }
      return tour;
   });

   fs.writeFile(
      `${__dirname}/data.json`,
      JSON.stringify(updatedTours),
      (err) => {
         res.status(200).json({
            status: "success",
            size: 1,
            requestTime: req.requestTime,
            data: {
               tour: update,
            }
         });
      }
   );
}

function deleteTour(req, res) {
   const id = req.params.id * 1;
   const tour = tours.find(tour => tour.id === id);

   if (!tour) {
      return res.status(404).json({
         status: "not found",
         message: `Tour with id ${id} doesn't exist`,
         requestTime: req.requestTime,
      });
   }
   const updatedTours = tours.filter(tour => tour.id !== id);

   fs.writeFile(
      `${__dirname}/data.json`,
      JSON.stringify(updatedTours),
      (err) => {
         res.status(200).json({
            status: "success",
            size: 1,
            requestTime: req.requestTime,
            data: {
               tour: tour,
            }
         });
      }
   );
}

app.route("/api/tours")
   .get(getAllTours)
   .post(addTours);

app.route("/api/tour/:id")
   .get(getTourByID)
   .patch(updateTour)
   .delete(deleteTour);

app.route("/api/tour").post(addTour);

app.listen(port, () => {
   console.log(`Listening to port ${port}...`);
});