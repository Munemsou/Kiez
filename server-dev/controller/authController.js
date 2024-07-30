/******************************************************
 *    authenticateUser
 *    für login
 ******************************************************/
import bcrypt from "bcrypt";
import UserModell from "../models/userSchema.js";
import jwt from "jsonwebtoken";

export const authenticateUser = async (req, res, next) => {
  try {
    // 1. Extract email and password from the request body
    const { email, password } = req.body;

    // 2. Validate input fields
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // 3. Find user by email
    const user = await UserModell.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // 4. Check if password matches
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // 5. Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    next(error); // Delegate to error handling middleware
  }
};


/******************************************************
 *    authorizeUser
 *    wenn der user eingeloggt ist
 ******************************************************/

export const authorizeUser = async (req, res, next) => {
  try {
    // 1. Get token from cookies
    const token = req.cookies.token;

    // 2. Check if token exists
    if (!token) {
      return res.status(401).json({ error: "No token found. You are not authorized." });
    }

    // 3. Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Invalid token" });
      }

      // 4. Attach user to request object
      req.user = user;
      next();
    });
  } catch (error) {
    next(error); // Delegate to error handling middleware
  }
};

