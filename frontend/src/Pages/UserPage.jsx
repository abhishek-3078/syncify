import React, { useEffect, useState } from "react";
import axios from "axios";

import { useLocation } from "react-router-dom";
import PlaylistManager from "../components/PlaylistManager";
import moment from "moment";
import CurrentlyPlaying from "../components/utils/CurrentlyPlaying";
import TopSongsSection from "../components/TopSongsSection";
import RecentlyPlayedSection from "../components/RecentlyPlayedSection";
import TopArtistsSection from "../components/TopArtistsSection";
import Soulmates from "../components/Soulmates";

const UserPage = () => {
    const location = useLocation();
    const [accessToken, setAccessToken] = useState("");
    const [userData, setUserData] = useState({});
    const [topArtists, setTopArtists] = useState([]);
    const [topTracks, setTopTracks] = useState([]);
    const [recentTracks, setRecentTracks] = useState([]);
    const [currentTrack, setCurrentTrack] = useState(null);
    

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("access_token");
        const jwt=params.get("token")
        if (token) {
            setAccessToken(token);
            localStorage.setItem("spotify_access_token", token);
            localStorage.setItem("jwt",jwt);
            window.history.replaceState(null, "", location.pathname);

        }else{
            setAccessToken(localStorage.getItem("spotify_access_token") || "");

        }
    }, [location]);
    useEffect(() => {
        if (!accessToken) return;

        // Fetch User Profile
        axios.get("https://api.spotify.com/v1/me", {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
            .then(response => {
                console.log(response)
                setUserData(response.data)
            })
            .catch(error => handleTokenError(error));

        // Fetch Top Artists
        axios.get("https://api.spotify.com/v1/me/top/artists?limit=5", {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
            .then(response => {
                console.log(response.data.items);
                setTopArtists(response.data.items)
            })
            .catch(error => handleTokenError(error));

        // Fetch Top Songs
        axios.get("https://api.spotify.com/v1/me/top/tracks?limit=5", {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
            .then(response => {
                console.log(response.data.items); setTopTracks(response.data.items)
            })
            .catch(error => handleTokenError(error));

        // Fetch Recent Listening History
        axios.get("https://api.spotify.com/v1/me/player/recently-played?limit=5", {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
            .then(response => {
                console.log(response.data.items); setRecentTracks(response.data.items)
            })
            .catch(error => handleTokenError(error));

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

    const handleTokenError = (error) => {
        console.error("Token error:", error);
        if (error.response && error.response.status === 401) {
            alert("Session expired. Please log in again.");
            localStorage.removeItem("spotify_access_token");
            window.location.href = "/";
        }
    };

    return (
        <div className="p-10 bg-[#1B2430] text-white min-h-screen">
            {/* Intro Section */}
            <div className="w-full flex flex-row h-[250px] justify-start">
                {/* User Details Obtained From Spotify */}
                <div className="w-[60%] flex h-full items-center justify-center gap-4 p-4 bg-gray-900 rounded-lg shadow-lg">
                    <div className="w-[200px] h-[200px] rounded-full overflow-hidden border-4 border-gray-700">
                        <img src={userData.images?.[0]?.url} alt="Profile image" className="w-full h-full object-cover"/>
                    </div>
                    <div className="flex flex-col items-start justify-center gap-2">
                        <h1 className="text-3xl text-white font-bold">{userData.display_name}</h1>
                        <h2 className="text-lg text-gray-400">{userData.email}</h2>
                        <h3 className="text-lg text-gray-400">10 Friends</h3>
                        <h4 className="text-lg text-gray-400">Plan</h4>
                    </div>
                </div>

            <Soulmates/>

                <div className="flex flex-col w-[40%] items-center justify-center p-4 bg-gray-800 rounded-lg shadow-lg ml-4">
                    <CurrentlyPlaying currentTrack={currentTrack}/>
                    <button className="mt-4 px-4 py-2 bg-[#1DB954] text-white rounded-lg hover:bg-[#1aa34a] transition duration-300">
                        Send Friend Request
                    </button>
                </div>
            </div>

            <TopArtistsSection topArtists={topArtists} />
            <TopSongsSection topTracks={topTracks} />
            <RecentlyPlayedSection recentTracks={recentTracks} />
        </div>
    );
};

export default UserPage;
