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
  const allProductsQuery = `SELECT * FROM products`;
  return new Promise((resolve, reject) => {
    client.query(allProductsQuery, (err, res) => {
      if (!err) {
        resolve(res.rows);
      } else {
        reject(new Error(err.message));
      }
    });
  });
};

const singleProduct = async (id) => {
  const singleProductQuery = `SELECT * FROM products where product_id = $1`;
  const product = id;
  return new Promise((resolve, reject) => {
    client.query(singleProductQuery, [product], (err, res) => {
      if (!err) {
        resolve(res.rows);
      } else {
        reject(new Error(err.message));
      }
    });
  });
};
const updateSingleProduct = async (id) => {
  const updateProductQuery = `SELECT * FROM products where product_id = $1`;
  const product = id;
  return new Promise((resolve, reject) => {
    client.query(updateProductQuery, [product], (err, res) => {
      if (!err) {
        resolve(res.rows);
      } else {
        reject(new Error(err.message));
      }
    });
  });
};

module.exports = {
  insertProduct,
  allProducts,
  singleProduct,
  updateSingleProduct,
};
