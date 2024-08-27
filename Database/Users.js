const client = require("../index");

// Database Registration Logic
const registerUser = async (user_id, name, password) => {
  const registrationQuery = `INSERT INTO users (user_id,name, password) VALUES ($1,$2,$3)`;
  const register = [user_id, name, password];
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
