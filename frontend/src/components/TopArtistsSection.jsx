import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopArtistsSection = ({ topArtists }) => {
  const navigate = useNavigate();
  return (
    <div className="mt-8 bg-transparent p-4 rounded-lg">
      <h2 className="text-3xl font-bold text-white">Top Artists</h2>
      <p className="text-sm text-gray-400 mb-4">Last 4 weeks</p>
      {topArtists.length > 0 ? (
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {topArtists.map(artist => (
            <li 
            onClick={()=>navigate(`/community`)}
             key={artist.id} className="flex flex-col items-center text-center bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer hover:bg-gray-900">
              <img
                src={artist.images?.[0]?.url}
                alt={artist.name}
                className="w-32 h-32 object-cover mb-2 rounded-full"
              />
              <p className="font-medium text-lg text-white">{artist.name}</p>
            </li>
          ))}
        </ul>
      ) : <p className="text-sm text-gray-400">Loading top artists...</p>}
    </div>
  );
};

export default TopArtistsSection;