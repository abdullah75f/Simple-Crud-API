// brain of the backend
const express = require("express");
const app = express();
const productRoute = require("./routes/product.route.js");
const userRoute = require("./routes/usersauthentication.route.js");

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
app.use((error,req,res,next)=>{
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  res.status(statusCode).json({
    status: error.status,
    message: error.message
  })

})

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
 