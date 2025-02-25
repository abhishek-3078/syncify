import React from "react";

const Login = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/login";
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#1B2430] text-white">
      <h1 className="text-2xl mb-4">Connect Your Spotify</h1>
      <button
        onClick={handleLogin}
        className="bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-700"
      >
        Login with Spotify
      </button>
    </div>
  );
};

export default Login;
