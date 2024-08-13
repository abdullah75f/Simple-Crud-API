require("dotenv").config();
const bcrypt = require("bcrypt");
const users = [];

const registration = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(200).send("Registered Successfully!");
  } catch (err) {
    res.status(404).send("User registration failed!");
  }
};

const login = async(req,res)=>{

}



module.exports = {
    registration,
    login
}