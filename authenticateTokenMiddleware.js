function authenticateToken(req, res, next) {
  const authenticationHeader = req.headers["authorization"];
  const token = authenticationHeader && authenticationHeader.split(" ")[1];

  if (token === null) return res.send("You did not logged in, please login!");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.send("Token error");
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
