const express = require('express');
const user = require('../Controller/User')
const pro = require('../Controller/Profile')
const post = require('../Controller/Post')

const router = express.Router();

router.route('/post/create').patch(user.protect,post.createPost)
router.route('/post/:id').get(user.protect,post.getPostID).delete(user.protect,post.deletePost)
router.route('/posts/').get(user.protect,post.getAllPosts)
router.route('/post/likes/:id').patch(user.protect,post.addlike)
router.route('/post/unlike/:id').patch(user.protect,post.unlike)

// comment
router.route('/post/comment/:id').patch(user.protect,post.newComment)
router.route('/post/remove-comment/:id/:comment_id').patch(user.protect,post.removeComment)



module.exports = router;