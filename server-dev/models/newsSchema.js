import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const newsSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String },
  tags: [{ type: String, required: true }],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  creationTime: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      text: { type: String, required: true },
      commenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      commentTime: { type: Date, default: Date.now },
    },
  ],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

//!  zu meinem feed gehören auch bilder! da diese aber seperat gespeichert werden (cloudinary) kann ich nix auf require setzen oder?
// Mein feed soll nach erstellen des Posts geordnet werden.

const NewsModell = model("News", newsSchema, "news");
export default NewsModell;
