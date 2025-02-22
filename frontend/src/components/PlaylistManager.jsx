import React, { useEffect, useState } from "react";
import axios from "axios";

const PlaylistManager = ({ accessToken }) => {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [trackUri, setTrackUri] = useState("");

  useEffect(() => {
    if (!accessToken) return;

    // Fetch user's playlists
    axios.get("https://api.spotify.com/v1/me/playlists", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then(response => setPlaylists(response.data.items))
    .catch(error => console.error("Error fetching playlists:", error));
  }, [accessToken]);

  // Create a new playlist
  const createPlaylist = () => {
    if (!newPlaylistName) return alert("Enter a playlist name!");

    axios.post("https://api.spotify.com/v1/me/playlists", 
      { name: newPlaylistName, public: false }, 
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    .then(response => {
      setPlaylists([...playlists, response.data]);
      setNewPlaylistName("");
    })
    .catch(error => console.error("Error creating playlist:", error));
  };

  // Add track to selected playlist
  const addTrackToPlaylist = () => {
    if (!selectedPlaylist || !trackUri) return alert("Select playlist and enter track URI!");

    axios.post(`https://api.spotify.com/v1/playlists/${selectedPlaylist}/tracks`, 
      { uris: [trackUri] }, 
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    .then(() => {
      alert("Track added!");
      setTrackUri("");
    })
    .catch(error => console.error("Error adding track:", error));
  };

  // Remove track from selected playlist
  const removeTrackFromPlaylist = () => {
    if (!selectedPlaylist || !trackUri) return alert("Select playlist and enter track URI!");

    axios.delete(`https://api.spotify.com/v1/playlists/${selectedPlaylist}/tracks`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      data: { tracks: [{ uri: trackUri }] }
    })
    .then(() => {
      alert("Track removed!");
      setTrackUri("");
    })
    .catch(error => console.error("Error removing track:", error));
  };

  return (
    <div className="p-5 border rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">Manage Your Playlists</h2>

      {/* Create Playlist */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="New playlist name"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <button onClick={createPlaylist} className="bg-green-500 text-white px-4 py-2 rounded">Create</button>
      </div>

      {/* Display Playlists */}
      <h3 className="text-md font-semibold mt-6">Your Playlists:</h3>
      {playlists.length > 0 ? (
        <ul className="mt-2">
          {playlists.map(playlist => (
            <li key={playlist.id} className="mt-2 flex justify-between">
              <span>{playlist.name} ({playlist.id})</span>
              <button 
                onClick={() => setSelectedPlaylist(playlist.id)} 
                className="bg-blue-500 text-white px-2 py-1 rounded">
                Select
              </button>
            </li>
          ))}
        </ul>
      ) : <p>Loading playlists...</p>}

      {/* Add/Remove Track */}
      {selectedPlaylist && (
        <div className="mt-6">
          <h3 className="text-md font-semibold">Modify Playlist</h3>
          <input
            type="text"
            placeholder="Track URI"
            value={trackUri}
            onChange={(e) => setTrackUri(e.target.value)}
            className="border p-2 rounded mr-2 w-full"
          />
          <div className="flex gap-2 mt-2">
            <button onClick={addTrackToPlaylist} className="bg-green-500 text-white px-4 py-2 rounded">Add Track</button>
            <button onClick={removeTrackFromPlaylist} className="bg-red-500 text-white px-4 py-2 rounded">Remove Track</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistManager;
