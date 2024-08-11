// brain of the backend
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Product = require("./models/product.model.js");
const productRoute = require("./routes/product.route.js");
//middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

//routes
app.use("/api/products", productRoute);

app.get("/", (req, res) => {
  res.send("Hello from Node API Server");
});
// delete a product



mongoose
  .connect(
    "mongodb+srv://abdullah75farid:8EaSXlcvGskghVlJ@backenddb.cwpro.mongodb.net/Node-Api?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => {
    console.log("connected to database");
    app.listen(3000, () => {
      console.log("server is listening on port 3000");
    });
  })
  .catch(() => {
    console.log("connection failed!");
  });
