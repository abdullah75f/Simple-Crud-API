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
const updateSingleProduct = async (id, updatedFields) => {
  const updateProductQuery = `Update products SET name = $1, quantity = $2, price = $3 WHERE product_id = $4 RETURNING *`;
  const product = id;
  const [name, quantity, price] = updatedFields;
  return new Promise((resolve, reject) => {
    client.query(
      updateProductQuery,
      [name, quantity, price, product],
      (err, res) => {
        if (!err) {
          resolve(res.rows);
        } else {
          reject(new Error(err.message));
        }
      }
    );
  });
};

const deleteSingleProduct = async (id) => {
  const deleteproductQuery = `DELETE FROM products WHERE product_id =$1`;
  const product = id;
  return new Promise((resolve, reject) => {
    client.query(deleteproductQuery, [product], (err, res) => {
      if (!err) {
        resolve("Product deleted succesfully");
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
  deleteSingleProduct,
};
