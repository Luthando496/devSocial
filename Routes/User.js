const express = require('express');
const user = require('../Controller/User')

const router = express.Router();

router.route('/auth').post(user.authUser)
router.route('/login').post(user.login)


module.exports = router;