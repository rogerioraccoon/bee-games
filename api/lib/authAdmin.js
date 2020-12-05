const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res
      .status(401)
      .json({ message: "Authorization Access Token is missing" });

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ message: "Authorization Access Token is invalid" });
    else if (user.type !== "admin")
      return res
        .status(403)
        .json({ message: "Authorization level is invalid" });
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
