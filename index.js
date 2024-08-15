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

app.get("/", (req, res) => {
  res.send("Hello from Node API Server");
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
