import { useState } from "react";

const PostCard = ({ post }) => {
  const [likes, setLikes] = useState(post.likes);
  console.log(post)

  const handleLike = () => {
    setLikes(likes + 1);
    // API call to update like count
  };

  return (
    <div className=" p-4 rounded-lg shadow-lg mb-4 bg-gray-900">
      <div className="flex space-x-3 text-lg text-white">
        <div className="w-10 h-10 bg-gray-400 rounded-full">

        </div>
        <h2 className="font-bold">{post.user.display_name}</h2></div>

      <h3 className="font-bold text-gray-300">{post.title}</h3>
      <p className="text-white">{post.content}</p>
      {post.audio && <audio controls src={post.audio}></audio>}
      <div className="flex gap-3 mt-2">
        <button onClick={handleLike} className="text-blue-500">❤️ {likes}</button>
      </div>
    </div>
  );
};

export default PostCard;
