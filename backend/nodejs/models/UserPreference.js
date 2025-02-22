const mongoose = require("mongoose");

const userPreferencesSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User collection

    top_genres: [{type : String}], // Categorized genres by time period

    top_artists: {
        "4_week": [{
            spotify_id: { type: String, required: true },
            name: { type: String },
            popularity: { type: Number },
            profile_image: { type: String },
            genres: [{ type: String }]
        }],
        "6_month": [{
            spotify_id: { type: String, required: true },
            name: { type: String },
            popularity: { type: Number },
            profile_image: { type: String },
            genres: [{ type: String }]
        }],
        "1_year": [{
            spotify_id: { type: String, required: true },
            name: { type: String },
            popularity: { type: Number },
            profile_image: { type: String },
            genres: [{ type: String }]
        }]
    }, // Categorized artists by time period

    top_tracks: {
        "4_week": [{
            spotify_id: { type: String, required: true },
            name: { type: String },
            artist: { 
                spotify_id: { type: String },
                name: { type: String }
            },
            album: { 
                spotify_id: { type: String },
                name: { type: String },
                cover_image: { type: String }
            },
            duration_ms: { type: Number },
            popularity: { type: Number }
        }],
        "6_month": [{
            spotify_id: { type: String, required: true },
            name: { type: String },
            artist: { 
                spotify_id: { type: String },
                name: { type: String }
            },
            album: { 
                spotify_id: { type: String },
                name: { type: String },
                cover_image: { type: String }
            },
            duration_ms: { type: Number },
            popularity: { type: Number }
        }],
        "1_year": [{
            spotify_id: { type: String, required: true },
            name: { type: String },
            artist: { 
                spotify_id: { type: String },
                name: { type: String }
            },
            album: { 
                spotify_id: { type: String },
                name: { type: String },
                cover_image: { type: String }
            },
            duration_ms: { type: Number },
            popularity: { type: Number }
        }]
    },
    playlists: [{type : String}], 
    created_at: { type: Date, default: Date.now }
});

const UserPreferences = mongoose.model("UserPreferences", userPreferencesSchema);

module.exports = UserPreferences;
