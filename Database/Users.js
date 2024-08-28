const { client } = require("../database.config.js");
const bcrypt = require("bcrypt");
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

const loginUser = async (current_user) => {
  const userQuery = `SELECT name,password,user_id FROM users WHERE name = $1`;
  const user_name = current_user[0];
  const user_password = current_user[1];

  return new Promise((resolve, reject) => {
    client.query(userQuery, [user_name], (err, res) => {
      if (!err && res.rows.length > 0) {
        let userFound = false;
        for (let i = 0; i < res.rows.length; i++) {
          const dbPassword = res.rows[i].password;
          bcrypt.compare(user_password, dbPassword, (err, result) => {
            if (err) {
              return reject(new Error(err.message));
            }
            if (result) {
              const selected_user = [
                res.rows[i].name,
                res.rows[i].password,
                res.rows[i].user_id,
              ];
              userFound = true;
              resolve(selected_user);
            }

            if (i === res.rows.length - 1 && !userFound) {
              return reject(
                new Error("Incorrect credential, please try again!")
              );
            }

            // else {
            //   reject(new Error(`Unsuccesful loggin attempt, ${err.message}`));
            // }
          });
        }
      } else {
        return reject(new Error("User not found"));
      }
    });
  });
};

module.exports = { registerUser, loginUser };
