const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
  try {
    let token = req.header("Authorization");
    if (!token) {
      res.status(403).send("Truy cập bị từ chối");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    // res.json(verified);
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  verifyToken,
};
