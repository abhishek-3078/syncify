import React from 'react';
import { useNavigate } from 'react-router-dom';

const FavouriteArtistSection = ({ topArtists }) => {
    const navigate = useNavigate();
  
    // Create a new array without mutating the original
    const filteredArtists = topArtists.slice(1, -1); 
  
    return (
      <div className="mt-8 bg-transparent p-4 rounded-lg">
        <h2 className="text-3xl font-bold text-white">Favourite Artists</h2>
        
        
          <ul className="grid grid-cols-2 pt-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {filteredArtists.map(artist => (
              <li 
                onClick={() => navigate(`/community`)}
                key={artist.id} 
                className="flex flex-col items-center text-center bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer hover:bg-gray-900"
              >
                <img
                  src={artist.images?.[0]?.url}
                  alt={artist.name}
                  className="w-32 h-32 object-cover mb-2 rounded-full"
                />
                <p className="font-medium text-lg text-white">{artist.name}</p>
              </li>
            ))}
            <li 
              onClick={() => navigate('/add-artist')}
              className="flex flex-col items-center justify-center text-center bg-gray-700 p-4 rounded-lg shadow-lg cursor-pointer hover:bg-gray-800">
              <span className="text-6xl text-white">+</span>
              <p className="font-medium text-lg text-white mt-2">Add Artist</p>
            </li>
          </ul>
       
      </div>
    );
  };
  
  
export default FavouriteArtistSection;
