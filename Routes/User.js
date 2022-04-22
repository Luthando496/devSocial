const express = require('express');
const user = require('../Controller/User')

const router = express.Router();

router.route('/auth').post(user.authUser)
router.route('/login').post(user.login)
router.route('/user').get(user.protect,user.loadUser)


module.exports = router;