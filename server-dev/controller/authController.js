import bcrypt from "bcrypt";
import UserModell from "../models/userSchema.js";
import jwt from "jsonwebtoken";

/******************************************************
 *    authenticateUser
 *    für login
 ******************************************************/
export const authenticateUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await UserModell.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error during authentication:", error);
    next(error);
  }
};

/******************************************************
 *    authorizeUser
 *    wenn der user eingeloggt ist
 ******************************************************/
export const authorizeUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: "No token found. You are not authorized." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Invalid token" });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    console.error("Error during authorization:", error);
    next(error);
  }
};