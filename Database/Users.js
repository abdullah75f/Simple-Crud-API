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

const loginUser = async (user_id) => {
  const userQuery = `SELECT user_id,password FROM users WHERE user_id = $1`;

  return new Promise((resolve, reject) => {
    client.query(userQuery, [user_id], (err, res) => {
      if (!err && res.rows.length > 0) {
        const selected_user = [res.rows[0].user_id, res.rows[0].password];
        resolve(selected_user);
      } else {
        reject(new Error(`Unsuccesful loggin attempt", ${err.message}`));
      }
    });
  });
};
// const loginUser = async (user_id) => {
//   const userQuery = `SELECT user_id, password FROM users WHERE user_id = $1`;

//   return new Promise((resolve, reject) => {
//     client.query(userQuery, [user_id], (err, res) => {
//       if (!err && res.rows.length > 0) {
//         const selected_user = [res.rows[0].user_id, res.rows[0].password];
//         resolve(selected_user);
//       } else {
//         reject(new Error(`Unsuccessful login attempt: ${err.message}`));
//       }
//     });
//   });
// };

module.exports = { registerUser, loginUser };
