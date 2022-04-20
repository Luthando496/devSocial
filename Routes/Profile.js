const express = require('express');
const user = require('../Controller/User')
const pro = require('../Controller/Profile')

const router = express.Router();

router.route('/profile/me').get(user.protect,pro.getProfile).delete(user.protect,pro.deleteProfile)
router.route('/profile/me/create').patch(user.protect,pro.createProfile)
router.route('/profiles/all').get(user.protect,pro.getAllProfiles)
router.route('/profile/experience').patch(user.protect,pro.addExperience)


module.exports = router;