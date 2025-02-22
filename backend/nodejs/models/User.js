const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    spotify_id: { type: String, unique: true, required: true }, // Maps to "id"
    display_name: { type: String },
    email: { type: String, unique: true },
    country: { type: String },
    explicit_content: {
        filter_enabled: { type: Boolean, default: false },
        filter_locked: { type: Boolean, default: false }
    },
    external_urls: {
        spotify: { type: String }
    },
    followers: {
        href: { type: String, default: null },
        total: { type: Number, default: 0 }
    },
    href: { type: String },
    images: { type: [String], default: [] }, // Assuming images are stored as URLs
    product: { type: String },
    type: { type: String },
    uri: { type: String },
    created_at: { type: Date, default: Date.now }
});;

module.exports = mongoose.model("User", userSchema);
