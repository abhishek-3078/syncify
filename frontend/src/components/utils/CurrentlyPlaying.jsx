import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrentlyPlaying = ({currentTrack}) => {

  
  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg text-center">
      {currentTrack ? (
        <div>
          <h2 className="text-xl font-semibold mb-2">Now Playing: {currentTrack.name}</h2>
          <p className="text-sm text-gray-400 mb-4">Artist: {currentTrack.artists.map(artist => artist.name).join(", ")}</p>
          <img src={currentTrack.album.images[0].url} alt={currentTrack.name} className="w-32 h-32 object-cover mx-auto rounded-lg" />
        </div>
      ) : (
        <p className="text-sm text-gray-400">User is not listening to any song currently</p>
      )}
    </div>
  );
}

export default CurrentlyPlaying;