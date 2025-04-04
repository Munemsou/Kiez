import jwt from "jsonwebtoken";
import groupsSchema from "../models/groupsSchema.js";
import UserModell from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

const { startSession } = mongoose;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const createGroup = async (req, res, next) => {
  try {
    const { title, text, image, tags, privateGroup } = req.body;

    if (!title || !text) {
      return res.status(400).send({ message: "Title and text are required." });
    }

    const existingGroup = await groupsSchema.findOne({ title });
    if (existingGroup) {
      return res.status(409).send({ message: "Group already exists." });
    }

    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send({ message: "Authorization failed: JWT token not found." });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = decodedToken.user;
    const creatorId = user._id;

    let imgURL = "";
    if (image) {
      const cloudinaryRes = await cloudinary.uploader.upload(image);
      imgURL = cloudinaryRes.secure_url;
    }

    const group = new groupsSchema({
      title,
      text,
      image: imgURL,
      tags,
      admins: [creatorId],
      creator: creatorId,
      privateGroup,
    });

    await group.save();
    await UserModell.findByIdAndUpdate(creatorId, { $push: { groups: group._id } });

    res.status(201).send(group);
  } catch (error) {
    console.error("Error creating group:", error);
    next(error);
  }
};

export const getAllGroups = async (req, res, next) => {
  try {
    const groups = await groupsSchema.find()
      .populate("admins", "firstName lastName")
      .populate("members", "firstName lastName")
      .populate("mods", "firstName lastName");

    res.status(200).send(groups);
  } catch (error) {
    next(error);
  }
};

export const getSearchGroups = async (req, res, next) => {
  try {
    const { search } = req.params;

    if (!search) {
      return res.status(400).send({ message: "Search term is required." });
    }

    const groups = await groupsSchema.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { text: { $regex: search, $options: "i" } },
      ],
    });

    res.status(200).send(groups);
  } catch (error) {
    next(error);
  }
};

export const getFollowedGroups = async (req, res) => {
  try {
    const userId = req.user.user._id;
    const user = await UserModell.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const followedGroupIds = user.groups.map(group => group.groupId);
    const followedGroups = await groupsSchema.find({ _id: { $in: followedGroupIds } });

    res.status(200).send(followedGroups);
  } catch (error) {
    console.error("Error retrieving followed groups:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const getFollowedGroupByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModell.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const followedGroupIds = user.groups.map(group => group.groupId);
    const followedGroups = await groupsSchema.find({ _id: { $in: followedGroupIds } });

    res.status(200).send(followedGroups);
  } catch (error) {
    console.error("Error retrieving followed groups:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const editGroup = async (req, res) => {
  try {
    if (!req.user || !req.user.user._id) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const groupParamId = req.params.id;
    const { title, text, image, tags, privateGroup, members, mods, admins } = req.body;
    const userId = req.user.user._id;

    const group = await groupsSchema.findOne({ _id: groupParamId, admins: userId });
    if (!group) {
      return res.status(403).send({ message: "You are not authorized to edit this group." });
    }

    group.title = title;
    group.text = text;
    group.image = image;
    group.tags = tags;
    group.privateGroup = privateGroup;
    group.members = members;
    group.mods = mods;
    group.admins = admins;

    await group.save();
    res.status(200).send({ message: "Group updated successfully." });
  } catch (error) {
    console.error("Error editing group:", error);
    res.status(500).send({ message: "Internal server error." });
  }
};

export const followGroup = async (req, res) => {
  try {
    const userId = req.user.user._id;
    const groupId = req.params.id;

    const group = await groupsSchema.findOne({ _id: groupId, members: userId });
    if (group) {
      return res.status(400).send({ message: "You are already a member." });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      await groupsSchema.findByIdAndUpdate(groupId, { $push: { members: userId } }, { session });
      const updatedUser = await UserModell.findByIdAndUpdate(userId, { $push: { groups: groupId } }, { session, new: true }).populate("groups");
      await session.commitTransaction();
      res.status(200).send(updatedUser);
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (error) {
    console.error("Error following group:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const unfollowGroup = async (req, res) => {
  try {
    const userId = req.user.user._id;
    const groupId = req.params.id;

    const group = await groupsSchema.findOne({ _id: groupId, members: userId });
    if (!group) {
      return res.status(400).send({ message: "You are not a member of this group." });
    }

    await groupsSchema.findByIdAndUpdate(groupId, { $pull: { members: userId } });
    await UserModell.findByIdAndUpdate(userId, { $pull: { groups: { groupId } } });

    res.status(200).send({ message: "You have successfully unfollowed the group." });
  } catch (error) {
    console.error("Error unfollowing group:", error);
    res.status(500).send({ message: "Internal server error." });
  }
};

export const createGroupPost = async (req, res, next) => {
  try {
    const groupId = req.params.id;
    const { title, text, topic, image } = req.body;

    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send({ message: "Authorization failed: JWT token not found." });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = decodedToken.user;
    const creatorId = user._id;

    const group = await groupsSchema.findById(groupId);
    if (!group) {
      return res.status(404).send({ message: "Group not found." });
    }

    const newPost = { title, text, topic, image, commenter: creatorId, postTime: new Date() };
    group.groupPosts.push(newPost);
    await group.save();

    res.status(201).send({ message: "Post created successfully.", post: newPost });
  } catch (error) {
    next(error);
  }
};

export const deleteGroup = async (req, res) => {
  try {
    const userId = req.user.user._id;
    const groupId = req.params.id;

    const group = await groupsSchema.findOne({ _id: groupId, admins: userId });
    if (!group) {
      return res.status(403).send({ message: "You are not authorized to delete this group." });
    }

    await groupsSchema.findByIdAndDelete(groupId);
    res.status(200).send({ message: "Group deleted successfully." });
  } catch (error) {
    console.error("Error deleting group:", error);
    res.status(500).send({ message: "Internal server error." });
  }
};
