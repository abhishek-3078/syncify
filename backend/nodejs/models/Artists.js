const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
    spotify_id: { type: String, unique: true, required: true },
    name: { type: String },
    genres: [{ type: String }],  // Array of genres
    popularity: { type: Number },
    profile_image: { type: String },
    followers: { type: Number },
    created_at: { type: Date, default: Date.now }
});

const Artist = mongoose.model("Artist", artistSchema);
