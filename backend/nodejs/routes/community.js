const express = require("express");
const Post = require("../models/Post");
const Community = require("../models/Community");
const { checkAuth } = require("../middleware/auth");
const { GetPosts } = require("../controllers/Community");

const router = express.Router(); 

router.post("/posts", checkAuth, async (req, res) => {
  try {
    const { communityId,title, content, image, audio, tags } = req.body;
    const userId = req.userId; 
    // 1️⃣ Check if community exists
    let community = await Community.findById(communityId);
    if (!community) {
      community = new Community({name:"Karan Aujla"});
      await community.save();
      
    }
    console.log(userId)
    

    // 2️⃣ Create a new post
    const newPost = new Post({
      user:userId,
      community: communityId,
      content,
      title,
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

router.get("/posts", GetPosts);


module.exports = router;
