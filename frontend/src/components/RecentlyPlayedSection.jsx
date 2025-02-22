import React from 'react';
import moment from 'moment';

const RecentlyPlayedSection = ({ recentTracks }) => {
  return (
    <div className="mt-8 bg-transparent p-4 rounded-lg">
      <h2 className="text-3xl font-bold text-white">Recently Played</h2>
      {recentTracks.length > 0 ? (
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {recentTracks.map((item) => {
            const timeAgo = moment(item.played_at).fromNow();
            return (
              <li key={item.track.id} className="flex flex-col items-center text-center bg-gray-800 p-4 rounded-lg shadow-lg">
                <img
                  src={item.track.album.images?.[0]?.url}
                  alt={item.track.name}
                  className="w-32 h-32 object-cover mb-2 rounded-lg"
                />
                <p className="font-medium text-lg text-white">{item.track.name}</p>
                <p className="text-sm text-gray-400">
                  {item.track.artists.map((artist) => artist.name).join(", ")}
                </p>
                <p className="text-xs text-gray-500">{timeAgo}</p>
              </li>
            );
          })}
        </ul>
      ) : <p className="text-sm text-gray-400">Loading recent tracks...</p>}
    </div>
  );
};

export default RecentlyPlayedSection;