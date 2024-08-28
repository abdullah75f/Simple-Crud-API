const {client} = require('../database.config.js');
const insertProduct= async (name, quantity,price,user_id)=>{
    const insertProductQuery = `INSERT INTO products(name, quantity,price,user_id) VALUES `

}




module.exports = {insertProduct}