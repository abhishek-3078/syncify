import { useState, useEffect } from "react";
import PostCard from "./PostCard";

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from backend
    fetch("/api/posts")
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Artist Community</h1>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default CommunityPage;
