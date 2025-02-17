import React, { useEffect, useState } from "react";
import axios from "axios";

import { useLocation } from "react-router-dom";
import PlaylistManager from "./PlaylistManager";
import moment from "moment"; 
import CurrentlyPlaying from "./utils/CurrentlyPlaying";


const TopSongsSection = ({topTracks}) => {


  return (
    <div>
        {/* make three buttons here for various time periods like  */}
        <h1 className="text-2xl font-bold">Top Songs Here</h1>

        
        <div className="flex items-center justify-center">
          <button className="bg-white text-black px-4 py-2 rounded-md">4 weeks</button>
          <button className="bg-white text-black px-4 py-2 rounded-md">6 months</button>
          <button className="bg-white text-black px-4 py-2 rounded-md">1 Year</button>
        </div>

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
    </div>
  )
}

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
      .then(response =>{
        console.log(response)
       setUserData(response.data)})
      .catch(error => handleTokenError(error));

    // Fetch Top Artists
    axios.get("https://api.spotify.com/v1/me/top/artists?limit=5", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(response =>{
        console.log(response.data.items);
         setTopArtists(response.data.items)})
      .catch(error => handleTokenError(error));
    
       // Fetch Top Songs
       axios.get("https://api.spotify.com/v1/me/top/tracks?limit=5", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then(response =>{
            console.log(response.data.items); setTopTracks(response.data.items)})
        .catch(error => handleTokenError(error));
  
      // Fetch Recent Listening History
      axios.get("https://api.spotify.com/v1/me/player/recently-played?limit=5", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then(response => {
            console.log(response.data.items);setRecentTracks(response.data.items)})
        .catch(error => handleTokenError(error));

  }, [accessToken]);

  const handleTokenError = (error) => {
    console.error("Token error:", error);
    if (error.response && error.response.status === 401) {
      alert("Session expired. Please log in again.");
      localStorage.removeItem("spotify_access_token");
      window.location.href = "/"; 
    }
  };
  return (
    <div className="p-10 bg-black text-white">


      {/* Intro Section */}
      <div className="flex flex-col items-center justify-between">
      <h1 className="text-5xl font-bold">Welcome to Your Dashboard</h1>

      <CurrentlyPlaying/>

      {userData ? (
        <div className="mt-4 flex items-center justify-evenly border-2 border-white rounded-lg p-4">
          <div className="flex items-center justify-center border-2 border-white rounded-full p-4">
          <img src={userData.images?.[0]?.url} alt="Profile" className="w-24 h-24 rounded-full mt-2" />
          </div>
          <div className="flex flex-col items-center justify-center border-2 border-white rounded-lg p-4">
          <h2 className="text-lg font-semibold">Hello, {userData.display_name}!</h2>
          <p>Email: {userData.email}</p>
          <p>Followers: {userData.followers.total}</p>
          </div>
        </div>
      ) : <p>Loading user data...</p>}

      </div>

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

      <TopSongsSection topTracks={topTracks} />

      {/* Recent Listening History */}
      <h2 className="text-lg font-semibold mt-6">Recently Played</h2>
      {recentTracks.length > 0 ? (
        <ul className="mt-2">
        {recentTracks.map((item) => {
          const timeAgo = moment(item.played_at).fromNow(); // Convert time to "x minutes ago"

          return (
            <li key={item.track.id} className="mt-2 flex items-center">
              <img
                src={item.track.album.images?.[0]?.url}
                alt={item.track.name}
                className="w-12 h-12 rounded-full mr-2"
              />
              <div>
                <p>{item.track.name} - {item.track.artists.map((artist) => artist.name).join(", ")}</p>
                <p className="text-sm text-gray-500">{timeAgo}</p>
              </div>
            </li>
          );
        })}
      </ul>
      ) : <p>Loading recent tracks...</p>}
          <PlaylistManager accessToken={accessToken} />
      
    </div> 


  );
};

export default Dashboard;
