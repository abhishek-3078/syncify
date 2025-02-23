import React from 'react';

const TopArtistsSection = ({ topArtists }) => {
  return (
    <div className="mt-8 bg-transparent p-4 rounded-lg">
      <h2 className="text-3xl font-bold text-white">Top Artists</h2>
      {topArtists.length > 0 ? (
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {topArtists.map(artist => (
            <li key={artist.id} className="flex flex-col items-center text-center bg-gray-800 p-4 rounded-lg shadow-lg">
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