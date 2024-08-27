const { Client } = require("pg");
const client = new Client({
  user: "abdullah75farid",
  host: "localhost",
  port: 5432,
  password: "034375",
  database: "cruddb",
});

module.exports = {client}