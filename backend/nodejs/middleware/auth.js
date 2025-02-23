const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  try {
    // Extract the token from headers (commonly sent as 'Authorization: Bearer <token>')
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization token missing or invalid" });
    }

    const token = authHeader;

    // Verify and decode the token
    const decoded = jwt.verify(token, "abhishek"); // Use an environment variable for security

    // Attach user information to request object
    req.userid = decoded.user_id;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token", error: error.message });
  }
};

module.exports = {checkAuth};
