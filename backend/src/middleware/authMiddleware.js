const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = (req, res, next) => {
  console.log(process.env.VITE_JWT_SECRET);
  
  const token = req.header("Authorization")?.split(" ")[1]; 
  if (!token) return res.status(401).json({ message: "Access Denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.VITE_JWT_SECRET);
    req.user = decoded;
    console.log("Decoded User from Token:", decoded); 
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error); 
    res.status(400).json({ message: "Invalid Token" });
  }
};
module.exports = authMiddleware;
