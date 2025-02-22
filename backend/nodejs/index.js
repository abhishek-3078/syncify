require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const querystring = require("querystring");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDB = require('./db/connect')

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:5000/auth/callback";

const AuthRouter = require('./routes/auth');

app.use('/auth',AuthRouter);
// app.get("/auth/login", (req, res) => {
//   const scope = [
//     "user-read-private",
//     "user-read-email",
//     "user-top-read",         // ✅ Needed for top songs & artists
//     "user-read-recently-played", // ✅ Needed for recent listening history
//     "playlist-read-private", // ✅ If you want to read user playlists
//     "user-library-read",     // ✅ If you want to access saved songs
//     "user-read-playback-state", // ✅ Needed for currently playing song
//   ].join(" ");
//   const authUrl = `https://accounts.spotify.com/authorize?${querystring.stringify({
//     client_id: CLIENT_ID,
//     response_type: "code",
//     redirect_uri: REDIRECT_URI,
//     scope,
//   })}`;

//   res.redirect(authUrl);
// });

// app.get("/auth/callback", async (req, res) => {
//   const code = req.query.code || null;
//   if (!code) return res.status(400).send("Authorization code missing");

//   try {
//     const tokenData = querystring.stringify({
//       grant_type: "authorization_code",
//       code,
//       redirect_uri: REDIRECT_URI,
//       client_id: CLIENT_ID,
//       client_secret: CLIENT_SECRET,
//     });

//     const response = await axios.post("https://accounts.spotify.com/api/token", tokenData, {
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     });

//     const { access_token, refresh_token } = response.data;

//     // Redirect to frontend with access token
//     res.redirect(`http://localhost:5173/dashboard?access_token=${access_token}&refresh_token=${refresh_token}`);
//   } catch (error) {
//     res.status(500).send("Error getting tokens: " + error);
//   }
// });

const start = async() => {
  try {
      await connectDB(process.env.MONGO_URI)
      console.log("Connected to the database")
      app.listen(5000, () => {
          console.log(`Server listening on 5000`)
      })
  } catch (error) {
      console.log(error)
  }
}

start()
