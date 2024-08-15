require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const users = [];

const registration = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = {
      name: req.body.name,
      password: hashedPassword,
      user_id: uuidv4(),
    };
    users.push(user);
    res.status(200).send("Registered Successfully!");
  } catch (err) {
    res.status(404).send("User registration failed!");
  }
};

const login = async (req, res) => {
  const user = users.find((user) => user.name === req.body.name);
  if (user === null || !user) {
    return res
      .status(200)
      .send("Incorrect user name, please try again!");
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const authData = { user_id: user.user_id };
      const accessToken = jwt.sign(authData, process.env.ACCESS_TOKEN_SECRET);
      res.status(200).json({ accessToken: accessToken });
    } else {
      res.status(401).send("Incorrect Password, please try again !");
    }
    
  } catch (error) {
    res.status(500).send("Server error ");
  }
};

const getUsers = (req, res) => {
  res.status(200).send(users);
};

module.exports = {
  registration,
  login,
  getUsers,
};
