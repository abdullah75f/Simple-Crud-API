const client = require("../index");

// Database Registration Logic
const registerUser = async (user_id, name, password) => {
  const registrationQuery = `INSERT INTO users (user_id,name, password) VALUES ($1,$2,$3)`;
  const register = [user_id, name, password];
  client.query(registrationQuery, register, (err, res) => {
    if (!err)
      console.log(`User with Name: ${name} registered succesfully, Thank you!`);
    else {
      console.log("Unsuccesfull registration", err.message);
    }
  });
};
