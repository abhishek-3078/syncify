const express = require('express');

const router = express.Router();

const { Login, Callback } = require('../controllers/auth')

const {AddArtist} = require('../controllers/AddArtist')

const {AddUserPreference} = require('../controllers/AddUserPreference')


router.route('/login').get(Login)
router.route('/callback').get(Callback)

router.route('/testRoute').get(AddUserPreference)


module.exports = router;