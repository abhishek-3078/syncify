const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Who created the post
    required: true,
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community", // Which community the post belongs to
    required: true,
  },
  content: {
    type: String,
    maxlength: 1000,
  },
  image: {
    type: String, // Optional image URL
  },
  audio: {
    type: String, // Optional audio URL
  },
  title:{
    type:String
  },
  likes: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      username: String,
      text: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  tags: [String], // Example: ["guitar", "rap", "music production"]
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
