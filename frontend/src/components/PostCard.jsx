import { useState } from "react";

const PostCard = ({ post }) => {
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setLikes(likes + 1);
    // API call to update like count
  };

  return (
    <div className="border p-4 rounded-lg shadow-lg mb-4">
      <h2 className="font-bold">{post.artistName}</h2>
      <p>{post.content}</p>
      {post.audio && <audio controls src={post.audio}></audio>}
      <div className="flex gap-3 mt-2">
        <button onClick={handleLike} className="text-blue-500">❤️ {likes}</button>
      </div>
    </div>
  );
};

export default PostCard;
