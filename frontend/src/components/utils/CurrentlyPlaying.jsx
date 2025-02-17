import React,{useState,useEffect} from 'react'
import axios from 'axios';

const CurrentlyPlaying = () => {

    const [currentTrack, setCurrentTrack] = useState(null);
    const [accessToken, setAccessToken] = useState(localStorage.getItem("spotify_access_token") || "");

useEffect(() => {
  axios.get("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .then(response => {
      if (response.data && response.data.item) {
        setCurrentTrack(response.data.item);
      }
    })
    .catch(error => console.error("Error fetching current song:", error));
}, [accessToken]);

return (
  <div>
    {currentTrack ? (
      <div>
        <h2>Now Playing: {currentTrack.name}</h2>
        <p>Artist: {currentTrack.artists.map(artist => artist.name).join(", ")}</p>
        <img src={currentTrack.album.images[0].url} alt={currentTrack.name} width="100" />
      </div>
    ) : (
      <p>No song is currently playing.</p>
    )}
  </div>
);

  
}

export default CurrentlyPlaying