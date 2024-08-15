require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = [];

const registration = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = { name: req.body.name, password: hashedPassword, user_id:users.length};
    users.push(user);
    res.status(200).send("Registered Successfully!");
  } catch (err) {
    res.status(404).send("User registration failed!");
  }
};

const login = async (req, res) => {
  const user = users.find((user) => user.user_id === req.body.user_id);
  if (user === null) {
    return res
      .status(400)
      .send("No registered users, please register to cnontinue");
  } 

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
      res.status(200).json({ accessToken: accessToken });
    } else {
      res.status(404).send("Incorrect Password, please try again !");
    }
  } catch (error) {
    res.status(500).send("There is server error");
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
