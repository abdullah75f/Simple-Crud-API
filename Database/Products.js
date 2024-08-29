const { client } = require("../database.config.js");
const insertProduct = async (name, quantity, price, user_id) => {
  const insertProductQuery = `INSERT INTO products(name, quantity,price,user_id) VALUES($1,$2,$3,$4)`;
  const product = [name, quantity, price, user_id];

  return new Promise((resolve, reject) => {
    client.query(insertProductQuery, product, (err, res) => {
      if (!err) {
        resolve(`Product with name: ${name} is added succesfully!`);
      } else {
        reject(new Error(`Unsuccesful registration", ${err.message}`));
      }
    });
  });
};

const allProducts = async () => {
  const allProudtsQuery = `SELECT * FROM products`;
  return new Promise((resolve, reject) => {
    if (!err) {
      resolve(res.rows);
    } else {
      reject(new Error(err.message));
    }
  });
};

module.exports = { insertProduct,allProducts };
