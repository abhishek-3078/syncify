const User = require('../models/User');


const GetUserDetails = async (req, res) => {
    try {
        //username from querystring
        const { username } = req.query;
        const user = await User.findOne({
            username: username
        });
        res.status(200).json({ user });
            
    }catch (error) {
        console.error("Error fetching user details:", error.message);
        res.status(500).json({ message: error.message });
    }
}

module.exports = { GetUserDetails };