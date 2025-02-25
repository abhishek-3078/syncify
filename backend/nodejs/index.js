require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const querystring = require("querystring");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDB = require('./db/connect')

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:5000/auth/callback";

const AuthRouter = require('./routes/auth');
const CommunityRouter = require('./routes/community');
const MeRouter = require('./routes/userdata');

app.use('/auth',AuthRouter);
app.use('/community',CommunityRouter);
app.use('/me',MeRouter);
 
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
