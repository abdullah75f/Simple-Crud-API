require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { errorHandlerFunction } = require("../utils/errorHandlerFunction");
const { registerUser, loginUser,allUsers } = require("../Database/Users");

const registration = errorHandlerFunction(async (req, res) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const name = req.body.name;
  const password = hashedPassword;

  await registerUser(name, password);
  res.status(200).send("Registered Successfully!");
});

const login = errorHandlerFunction(async (req, res) => {
  const current_user = [req.body.name, req.body.password];

  const selected_user = await loginUser(current_user);

  if (selected_user === null || !selected_user) {
    return res.status(200).send("Incorrect user name, please try again!");
  }

  if (await bcrypt.compare(req.body.password, selected_user[1])) {
    const authData = { user_id: selected_user[2] };
    const accessToken = jwt.sign(authData, process.env.ACCESS_TOKEN_SECRET);
    res.status(200).json({ accessToken: accessToken });
  } else {
    res.status(401).send("Incorrect Password, please try again !");
  }

  req.selected_user = selected_user;
});

const getUsers = (req, res) => {


  res.status(200).send("The users are listed below");
};

module.exports = {
  registration,
  login,
  getUsers,
};
