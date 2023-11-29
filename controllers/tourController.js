"use strict"
// @ts-check
const fs = require("fs");
const path = "./data.json";
const tours = JSON.parse(fs.readFileSync(path));

exports.getAllTours = (req, res) => {
   res.status(200).json({
      status: "success",
      size: tours.length,
      requestTime: req.requestTime,
      data: {
         tours,
      }
   });
}

exports.getTourByID = (req, res) => {
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

exports.addTour = (req, res) => {
   const id = tours[tours.length - 1].id + 1;
   const newTour = { id, ...req.body };
   tours.push(newTour);
   fs.writeFile(
      path,
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

exports.updateTour = (req, res) => {
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
      path,
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

exports.deleteTour = (req, res) => {
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
      path,
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