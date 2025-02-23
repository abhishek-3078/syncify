const express = require("express");
const Post = require("../models/Post");
const Community = require("../models/Community");
const { checkAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", checkAuth, async (req, res) => {
  try {
    const { communityId, content, image, audio, tags } = req.body;
    const userId = req.user.id; // Extracted from JWT

    // 1️⃣ Check if community exists
    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    // 2️⃣ Create a new post
    const newPost = new Post({
      userId,
      username: req.user.username, // Assuming `username` is in JWT payload
      communityId,
      content,
      image,
      audio,
      tags,
    });

    // 3️⃣ Save post & update community
    await newPost.save();
    community.posts.push(newPost._id);
    await community.save();

    res.status(201).json({ message: "Post created successfully!", post: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
