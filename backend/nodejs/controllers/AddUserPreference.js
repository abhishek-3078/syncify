const axios = require('axios');

const AddUserPreference = async (req,res) => {

try {
        console.log(req.body);
        const access_token = req.body.token;

        // Fetch user profile from Spotify API
        const response = await axios.get("https://api.spotify.com/v1/me/top/artists?limit=5&time_range=long_term", {
            headers: { Authorization: `Bearer ${access_token}` },
        });

        const topArtist = response.data;

        res.status(200).json({ message: "Artist added successfully", user: topArtist });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error processing request", error: error.message });
    }
}

module.exports = { AddUserPreference }