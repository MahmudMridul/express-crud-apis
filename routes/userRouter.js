"use strict"
// @ts-check

const express = require("express")
const router = express.Router();

function getAllUsers(req, res) {
   res.status(500).json({
      status: "error",
      message: "not implemented"
   });
}

function getUser(req, res) {
   res.status(500).json({
      status: "error",
      message: "not implemented"
   });
}

function addUser(req, res) {
   res.status(500).json({
      status: "error",
      message: "not implemented"
   });
}

function updateUser(req, res) {
   res.status(500).json({
      status: "error",
      message: "not implemented"
   });
}

function deleteUser(req, res) {
   res.status(500).json({
      status: "error",
      message: "not implemented"
   });
}



router.route("/").get(getAllUsers);

router.route("/:id")
   .get(getUser)
   .post(addUser)
   .patch(updateUser)
   .delete(deleteUser);

module.exports = router;