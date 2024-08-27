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

const loginUser = async (value) => {
  const current_user = [req.body.name, req.body.password];

  const userQuery = `SELECT name,password FROM users WHERE name = $1`;

  return new Promise((resolve, reject) => {
    client.query(userQuery, current_user, (err, res) => {
      if (!err && res.rows.length > 0) {
        const selected_user = [res.rows[0].name, res.rows.password];
        console.log(selected_user);
        resolve(selected_user);
      } else {
        reject(new Error(`Unsuccesful loggin attempt", ${err.message}`));
      }
    });
  });
};

module.exports = { registerUser, loginUser };
