import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import { BACKEND_API } from "../const";
import LoadingSpinner from "./utils/LoadingSpinner";
import { useNavigate } from "react-router-dom"; 
const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    // Fetch posts from backend
    const communityId='67bb04579424255e5ef69d80';
    fetch(`${BACKEND_API}/community/posts?id=${communityId}`,{
      method:'GET',
      credentials: 'include',
    }
      
    )
      .then(res => res.json())
      .then(data => setPosts(data.posts))
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token=localStorage.getItem("jwt");
    const newPost = { title, content,communityId:'67bb04579424255e5ef69d80' };
    setLoading(true);
    const response = await fetch(`${BACKEND_API}/community/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `${token}` },
      body: JSON.stringify(newPost),
    });

    const data = await response.json();
    if (response.ok) {
      setPosts([data, ...posts]); // Add new post to the list
      setTitle(""); // Clear form
      setContent("");
    }else{
        console.log(data)
        
        // navigate("/");
    }
    setLoading(false);
  };

  return (
   <div className="bg-[#1B2430]">
      <div className="p-4 max-w-3xl mx-auto">
                {loading ? <LoadingSpinner /> : ""}
  
        <h1 className="text-2xl font-bold mb-4 text-white">Karan Aujla</h1>
  
        {/* Post Form */}
        <form onSubmit={handleSubmit} className=" bg-gray-800 mb-6 p-4  rounded shadow">
          <h2 className="text-lg  font-semibold mb-2 text-gray-400">Create a Post</h2>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full  border-none bg-gray-700 p-2 text-white mb-2 border rounded"
            required
          />
          <textarea
            placeholder="Write something..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border-none bg-gray-700 p-2 text-white mb-2 border rounded"
            rows="4"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-700 cursor-pointer"
          >
            Post
          </button>
        </form>
  
        {/* Post List */}
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
   </div >
  );
};

export default CommunityPage;
