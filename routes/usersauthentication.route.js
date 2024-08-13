const express = require("express");
const router1 = express.Router();

const {registration,login} = require('../controllers/users.controller');

router1.post('/signup',registration);
router1.post('/login', login);
module.exports = router1;

