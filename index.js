// brain of the backend
const express = require("express");
const app = express();
const productRoute = require("./routes/product.route.js");
const userRoute = require("./routes/usersauthentication.route.js");
const customError = require('./utils/customError.js')

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
  const err =  new customError(`Can't find ${req.originalUrl} on the server !`,404);
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
