// brain of the backend
const {Client} = require('pg');
const client = new Client({
  user:
  host:
  port:
  password:
  database:


})

const express = require("express");
const app = express();
const productRoute = require("./routes/product.route.js");
const userRoute = require("./routes/usersauthentication.route.js");
const customErrorclass = require("./utils/customErrorClass.js");

//middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

//routes
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.all("*", (req, res, next) => {
  const err = new customErrorclass(
    `Can't find ${req.originalUrl} on the server !`,
    404
  );
  next(err);
});
app.use((error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
  });
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
