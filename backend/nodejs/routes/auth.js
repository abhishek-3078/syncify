const express = require('express');

const router = express.Router();

const { Login, Callback } = require('../controllers/auth')


router.route('/login').get(Login)
router.route('/callback').get(Callback)


module.exports = router;