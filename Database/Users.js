const client = require("../index");

// Database insertion Logic
const registerUser = async (user_id, name, password) => {
  const registrationQuery = `INSERT INTO users (user_id,name, password) VALUES ($1,$2,$3)`;
  const register = [user_id, name, password];
  client.query(registrationQuery, register, (err, res) => {});

};
