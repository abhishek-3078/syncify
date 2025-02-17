import React, { useState, useEffect } from "react";

const CLIENT_ID = "fab5991fc6894e7c83e376341f7fccfc"; // Replace with your actual Client ID
const REDIRECT_URI = "http://localhost:5173/callback"; // Must match Spotify Dashboard
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPES = "user-top-read user-read-recently-played"; // Modify as needed
 
const SpotifyAuth = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const token=localStorage.getItem("spotify_token");
    if (token) {
      setToken(token);
    }
  }, []);
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const tokenParam = new URLSearchParams(hash.substring(1)).get("access_token");
      if (tokenParam) {
        setToken(tokenParam);
        localStorage.setItem("spotify_token", tokenParam);
        // window.location.hash = "";
      }
    }
  }, []);

  const logout = () => {
    setToken("");
    localStorage.removeItem("spotify_token");
  };

  return (
    <div>
      {!token ? (
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}&response_type=${RESPONSE_TYPE}&show_dialog=true`}
        >
          <button className="p-3 bg-green-400 rounded-xl text-white font-bold cursor-pointer ">Connect to Spotify</button>
        </a>
      ) : (
        <div>
          <button onClick={logout}>Logout</button>
          <SpotifyData token={token} />
        </div>
      )}
    </div>
  );
};

const SpotifyData = ({ token }) => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=5", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setTracks(data.items);
    };

    if (token) fetchData();
  }, [token]);

  return (
    <div>
      <h2>Top Tracks:</h2>
      <ul>
        {tracks.map((track) => (
          <li key={track.id}>{track.name} - {track.artists[0].name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SpotifyAuth;
