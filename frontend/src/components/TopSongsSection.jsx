import React from 'react';

const TopSongsSection = ({ topTracks }) => {
    return (
        <div className="mt-8 bg-transparent p-4 rounded-lg">
            <h1 className="text-3xl font-bold text-white">Top Songs</h1>
            <p className="text-sm text-gray-400 mb-4">Last 4 weeks</p>
            {topTracks.length > 0 ? (
                <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {topTracks.map(track => (
                        <li key={track.id} className="flex flex-col items-center text-center bg-gray-800 p-4 rounded-lg shadow-lg">
                            <img
                                src={track.album.images?.[0]?.url}
                                alt={track.name}
                                className="w-32 h-32 object-cover mb-2 rounded-lg"
                            />
                            <p className="font-medium text-lg text-white">{track.name}</p>
                            <p className="text-sm text-gray-400">{track.artists.map(artist => artist.name).join(", ")}</p>
                        </li>
                    ))}
                </ul>
            ) : <p className="text-sm text-gray-400">Loading top songs...</p>}
        </div>
    );
};

export default TopSongsSection;