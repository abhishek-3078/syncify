const Post = require("../models/Post");
const Community = require("../models/Community");

const GetPosts= async (req, res) => {
    const communityId=req.query.id;
    try {
        const community = await Community.findById(communityId)
        .populate({
            path: 'posts',
            populate: {
                path: 'user',
                model: 'User'
            }
        });
        const posts = community.posts;
        console.log(posts)
        res.status(200).json({ posts });
    } catch (error) {
        console.error("Error fetching posts:", error.message);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = { GetPosts };