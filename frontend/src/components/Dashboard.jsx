import React, { useEffect, useState } from "react";
import axios from "axios";

import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const [accessToken, setAccessToken] = useState(localStorage.getItem("spotify_access_token") || "");
  const [userData, setUserData] = useState(null);
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [recentTracks, setRecentTracks] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("access_token");
    if (token) {
      setAccessToken(token);
      localStorage.setItem("spotify_access_token", token);
    }
  }, [location]);
  useEffect(() => {
    if (!accessToken) return;

    // Fetch User Profile
    axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(response => setUserData(response.data))
      .catch(error => handleTokenError(error));

    // Fetch Top Artists
    axios.get("https://api.spotify.com/v1/me/top/artists?limit=5", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(response => setTopArtists(response.data.items))
      .catch(error => handleTokenError(error));
    
       // Fetch Top Songs
       axios.get("https://api.spotify.com/v1/me/top/tracks?limit=5", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then(response => setTopTracks(response.data.items))
        .catch(error => handleTokenError(error));
  
      // Fetch Recent Listening History
      axios.get("https://api.spotify.com/v1/me/player/recently-played?limit=5", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then(response => setRecentTracks(response.data.items))
        .catch(error => handleTokenError(error));

  }, [accessToken]);

  const handleTokenError = (error) => {
    console.error("Token error:", error);
    if (error.response && error.response.status === 401) {
      alert("Session expired. Please log in again.");
      localStorage.removeItem("spotify_access_token");
      window.location.href = "/login"; // Redirect to login page
    }
  };
  return (
    <div className="p-10">
      <h1 className="text-xl font-bold">Welcome to Your Dashboard</h1>

      {userData ? (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Hello, {userData.display_name}!</h2>
          <img src={userData.images?.[0]?.url} alt="Profile" className="w-24 h-24 rounded-full mt-2" />
          <p>Email: {userData.email}</p>
          <p>Followers: {userData.followers.total}</p>
        </div>
      ) : <p>Loading user data...</p>}

      <h2 className="text-lg font-semibold mt-6">Top Artists</h2>
      {topArtists.length > 0 ? (
        <ul className="mt-2">
          {topArtists.map(artist => (
            <li key={artist.id} className="mt-2 flex items-center">
              <img src={artist.images?.[0]?.url} alt={artist.name} className="w-12 h-12 rounded-full mr-2" />
              {artist.name}
            </li>
          ))}
        </ul>
      ) : <p>Loading top artists...</p>}
          {/* Top Songs */}
          <h2 className="text-lg font-semibold mt-6">Top Songs</h2>
      {topTracks.length > 0 ? (
        <ul className="mt-2">
          {topTracks.map(track => (
            <li key={track.id} className="mt-2 flex items-center">
              <img src={track.album.images?.[0]?.url} alt={track.name} className="w-12 h-12 rounded-full mr-2" />
              {track.name} - {track.artists.map(artist => artist.name).join(", ")}
            </li>
          ))}
        </ul>
      ) : <p>Loading top songs...</p>}

      {/* Recent Listening History */}
      <h2 className="text-lg font-semibold mt-6">Recently Played</h2>
      {recentTracks.length > 0 ? (
        <ul className="mt-2">
          {recentTracks.map(item => (
            <li key={item.track.id} className="mt-2 flex items-center">
              <img src={item.track.album.images?.[0]?.url} alt={item.track.name} className="w-12 h-12 rounded-full mr-2" />
              {item.track.name} - {item.track.artists.map(artist => artist.name).join(", ")}
            </li>
          ))}
        </ul>
      ) : <p>Loading recent tracks...</p>}

      
    </div>


  );
};

export default Dashboard;
