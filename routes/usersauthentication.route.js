const express = require("express");
const router1 = express.Router();

const {
  registration,
  login,
  getUsers,
} = require("../controllers/users.controller");

router1.get("/", getUsers);
router1.post("/signup", registration);
router1.post("/login", login);
module.exports = router1;
 


