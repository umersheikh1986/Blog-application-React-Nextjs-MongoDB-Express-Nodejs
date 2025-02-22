import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
export const verifyUser = (req, res, next) => {
  console.log("Cookies:", req.cookies); // Debugging: Check if cookies exist
  console.log("Token from cookies:", req.cookies.access_token); // Debugging: Check token value
  console.log("Request Cookies:", req.cookies); // Debugging
  console.log("Token from Cookies:", req.cookies.access_token); // Debugging
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(401, "Unauthorized----1"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized----2"));
    }
    console.log("Decoded User:", user); // Debugging: Check decoded token
    req.user = user;
    next();
  });
};
