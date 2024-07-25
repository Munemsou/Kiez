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
      return res.status(409).send({ message: "Email already exists. Please try again." });
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

    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "lax",
    }).send({ user: plainUserObj });
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
  const { street, number, zip, ...rest } = req.body;
  const structuredObj = { ...rest };

  if (street) structuredObj["address.0.street"] = street;
  if (number) structuredObj["address.0.number"] = number;
  if (zip) structuredObj["address.0.zip"] = zip;

  if (street === null) structuredObj["address.0.street"] = "";
  if (number === null) structuredObj["address.0.number"] = "";
  if (zip === null) structuredObj["address.0.zip"] = "";

  try {
    const userId = req.params.id;
    const options = { new: true };

    const user = await UserModell.findByIdAndUpdate(userId, { $set: structuredObj }, options);
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
      return res.status(404).send({ message: "No neighbours found in this zipcode area." });
    }

    res.send({ zipNeighbours });
  } catch (error) {
    console.error("Error finding neighbours:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};


