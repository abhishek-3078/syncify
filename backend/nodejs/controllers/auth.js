// const connection = require('../config/database');
// const { StatusCodes } = require('http-status-codes')
require("dotenv").config();
const jwt = require("jsonwebtoken");

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:5000/auth/callback";
const querystring = require("querystring");
require("dotenv").config();
const axios = require("axios");

const {AddArtist} = require('./AddArtist')

const Login = (req, res) => {
    const scope = [
      "user-read-private",
      "user-read-email",
      "user-top-read",         // ✅ Needed for top songs & artists
      "user-read-recently-played", // ✅ Needed for recent listening history
      "playlist-read-private", // ✅ Read user's private playlists
      "playlist-read-collaborative", // ✅ Read collaborative playlists
      "playlist-modify-public", // ✅ Create & modify public playlists
      "playlist-modify-private", // ✅ Create & modify private playlists
      "user-library-read",     // ✅ Access saved songs
      "user-read-playback-state", // ✅ Needed for currently playing song
    ].join(" ");
    const authUrl = `https://accounts.spotify.com/authorize?${querystring.stringify({
        client_id: CLIENT_ID,
        response_type: "code",
        redirect_uri: REDIRECT_URI,
        scope,
    })}`;
    console.log("redirected");

    res.redirect(authUrl);
}

const Callback = async (req, res) => {
  const code = req.query.code || null;
  if (!code) return res.status(400).send("Authorization code missing");

  try {
    const tokenData = querystring.stringify({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    });

    const response = await axios.post("https://accounts.spotify.com/api/token", tokenData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const { access_token, refresh_token } = response.data;
    
    await AddArtist(req,res,access_token)
    
    const jwtToken = jwt.sign({user_id:req.user._id,spotify_id:req.user.spotify_id}, "abhishek", { expiresIn: "1h" });

    // Redirect to frontend with access token
    res.cookie("auth_token", "abhishek_spotify", {
      httpOnly: true,  // Prevents client-side access
      secure: true,
      sameSite: "None" 
  });
    res.redirect(`http://localhost:5173/user/${req.user.username}?access_token=${access_token}&token=${jwtToken}`);
  } catch (error) {
    res.status(500).send("Error getting tokens: " + error);
  }
}

module.exports = {
    Callback,Login
}