import validator from "validator";
import UserModell from "../models/userSchema.js";
import bcrypt from "bcrypt";
import { generateToken } from "./jwtController.js";
import jwt from "jsonwebtoken";

/******************************************************
 *    registerController
 ******************************************************/

export const registerController = async (req, res) => {
  try {
    const {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      address,
      geoCode,
      followUsers,
      groups,
    } = req.body;

    // Check if email already exists
    const existingUser = await UserModell.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .send({ message: "Email already exists. Please try again." });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = await UserModell.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      address,
      geoCode,
      followUsers,
      groups,
    });

    // Send success response
    res.status(201).send({ message: "User successfully registered" });
  } catch (error) {
    console.error("Registration failed.", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

/******************************************************
 *    loginController
 ******************************************************/

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModell.findOne({ email }).populate("groups");

    if (!user) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const plainUserObj = user.toObject();
    delete plainUserObj.password;
    delete plainUserObj.groups;
    delete plainUserObj.marketItems;

    const userForJwt = { ...plainUserObj };

    // Use the generateToken function
    const accessToken = generateToken(userForJwt);

    res
      .cookie("token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "lax",
      })
      .send({ user: plainUserObj });
  } catch (error) {
    next(error);
  }
};

/******************************************************
 *    logoutController
 ******************************************************/
//! muss hier noch ein JWT Token gelöscht werden?

export const logoutController = async (req, res) => {
  console.log("user ausgeloggt");
  res.clearCookie("token");
  res.status(200).send("cookie cleared. User logged out.");
};

/******************************************************
 *    editUser
 ******************************************************/
//! Id muss frontendseitig mitgeschickt werden
//! so kann nutzer sowie admin den controller verwenden

export const editUser = async (req, res, next) => {
  const {
    aboutMe,
    street,
    number,
    zip,
    image,
    email,
    firstName,
    lastName,
    ...rest
  } = req.body;

  // console.log('Received data for update:', req.body); // Log incoming data

  // Initialize an empty object for updates
  const structuredObj = {};

  // Validate and handle address fields
  if (street !== undefined) {
    structuredObj["address.0.street"] = street === null ? "" : street;
  }
  if (number !== undefined) {
    structuredObj["address.0.number"] = number === null ? "" : number;
  }
  if (zip !== undefined) {
    structuredObj["address.0.zip"] = zip === null ? "" : zip;
  }

  // Validate and handle image field
  if (image !== undefined) {
    structuredObj["image"] =
      image === null ? "" : typeof image === "object" ? "" : image;
  }

  // Validate and handle firstName field
  if (aboutMe !== undefined) {
    if (typeof aboutMe !== "string" || aboutMe.length > 1000) {
      return res.status(400).send({ message: "Invalid aboutMe format" });
    }
    structuredObj["aboutMe"] = aboutMe;
  }

  // Validate and handle firstName field
  if (firstName !== undefined) {
    if (typeof firstName !== "string" || firstName.length > 100) {
      return res.status(400).send({ message: "Invalid firstName format" });
    }
    structuredObj["firstName"] = firstName;
  }

  // Validate and handle lastName field
  if (lastName !== undefined) {
    if (typeof lastName !== "string" || lastName.length > 100) {
      return res.status(400).send({ message: "Invalid lastName format" });
    }
    structuredObj["lastName"] = lastName;
  }

  // Validate and handle email field
  if (email !== undefined) {
    if (email === "") {
      return res.status(400).send({ message: "Email cannot be empty" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).send({ message: "Invalid email format" });
    }
    try {
      // Check for duplicate email
      const existingUser = await UserModell.findOne({ email });
      if (existingUser && existingUser._id.toString() !== req.params.id) {
        return res.status(400).send({ message: "Email already in use" });
      }
      structuredObj["email"] = email;
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Error checking email uniqueness" });
    }
  }

  try {
    const userId = req.params.id;
    const options = { new: true };

    // console.log('Updating user with:', structuredObj); // Log what is being updated

    // Update user with the structured object
    const user = await UserModell.findByIdAndUpdate(
      userId,
      { $set: structuredObj },
      options
    );
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ message: "User successfully edited", user });
  } catch (error) {
    console.error("Error editing user:", error);
    res.status(error.status || 500).send({ message: error.message });
  }
};

/******************************************************
 *    deleteUser
 ******************************************************/

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    await UserModell.findByIdAndDelete(userId);
    res.status(200).send({ message: "User successfully deleted" });
  } catch (error) {
    next(error);
  }
};

/******************************************************
 *Nighbour  Controller
 ******************************************************/

export const neighbourController = async (req, res, next) => {
  try {
    const { zip } = req.body;

    const zipNeighbours = await UserModell.find({ "address.zip": `${zip}` });
    if (!zipNeighbours || zipNeighbours.length === 0) {
      return res
        .status(404)
        .send({ message: "No neighbours found in this zipcode area." });
    }

    res.send({ zipNeighbours });
  } catch (error) {
    console.error("Error finding neighbours:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
