const express = require('express');
const { GetUserDetails } = require('../controllers/UserDetails');
const router = express.Router();
const { checkAuth } = require('../middleware/auth');


router.get('/', checkAuth, GetUserDetails);



module.exports = router;