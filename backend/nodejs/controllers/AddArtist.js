const axios = require('axios');
const User = require('../models/User');

const AddArtist = async (req, res) => {
    try {
        console.log(req.body);
        const access_token = req.body.token;

        // Fetch user profile from Spotify API
        const response = await axios.get("https://api.spotify.com/v1/me", {
            headers: { Authorization: `Bearer ${access_token}` },
        });

        const SpotifyUser = response.data;

        // Create a new user document
        const newUser = await User.create({
            spotify_id: SpotifyUser.id,
            display_name: SpotifyUser.display_name,
            email: SpotifyUser.email,
            country: SpotifyUser.country,
            explicit_content: SpotifyUser.explicit_content,
            external_urls: SpotifyUser.external_urls,
            followers: SpotifyUser.followers,
            href: SpotifyUser.href,
            images: SpotifyUser.images.map(img => img.url), // Extract image URLs if available
            product: SpotifyUser.product,
            type: SpotifyUser.type,
            uri: SpotifyUser.uri,
        });

        console.log('Document inserted:', newUser);
        res.status(200).json({ message: "Artist added successfully", user: newUser });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error processing request", error: error.message });
    }
};

module.exports = { AddArtist };
