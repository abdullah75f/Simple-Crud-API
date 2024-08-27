const { client } = require("../database.config.js");
// Database Registration Logic
const registerUser = async (name, password) => {
  const registrationQuery = `INSERT INTO users (name, password) VALUES ($1,$2)`;
  const register = [name, password];
  return new Promise((resolve, reject) => {
    client.query(registrationQuery, register, (err, res) => {
      if (!err)
        resolve(`User with Name: ${name} registered succesfully, Thank you!`);
      else {
        reject(new Error(`Unsuccesful registration", ${err.message}`));
      }
    });
  });
};

module.exports = { registerUser };
