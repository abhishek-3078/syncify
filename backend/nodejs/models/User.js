const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    spotify_id: { type: String, unique: true, required: true },
    display_name: { type: String },
    email: { type: String, unique: true },
    profile_image: { type: String },
    country: { type: String },
    created_at: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);
