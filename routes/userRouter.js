"use strict"
// @ts-check

const express = require("express")
const router = express.Router();
const { getAllUsers, getUser, addUser, updateUser, deleteUser } = require("./../controllers/userController");



router.route("/").get(getAllUsers);

router.route("/:id")
   .get(getUser)
   .post(addUser)
   .patch(updateUser)
   .delete(deleteUser);

module.exports = router;