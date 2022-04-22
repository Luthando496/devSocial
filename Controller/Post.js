const Post = require('../Models/Post')
const User = require('../Models/userModel')
const Profile = require('../Models/Profile')
const handler = require('express-async-handler')


exports.createPost = handler(async(req,res,next)=>{
  
  const user = await User.findOne({user:req.user._id}).select('-password')
  
  const newPost = {
    text:req.body.text,
    name:user.name,
    avatar: req.body.avatar,
    user: req.user._id
  }
  
  const post = await Post.create(newPost)
  
  res.json(post)
  
  
})


exports.getAllPosts = handler(async(req,res,next)=>{
  
  const post = await Post.find().sort({date:-1})
  
  if(!post){
    return res.json({message:"NO post found"})
  }
  
  return res.json(post)
  
  
  
})




exports.getPostID = handler(async(req,res,next)=>{
  
  const post = await Post.findById(req.params.id)
  
  if(!post){
    return res.json({message:"NO post found"})
  }
  
  return res.json(post)
  
  
  
})





exports.deletePost = handler(async(req,res,next)=>{
  
  const post = await Post.findById(req.params.id)
  
  if(!post){
    return res.json({message:"NO post found"})
  
  }
  
  console.log(post.user.toString(),' ',req.user.id)
  
  if(post.user.toString() !== req.user.id){
    return res.json({message:"Not Authorised To Delete This User Posts"})
  }
  
  await post.remove()
  
  return res.json({message:"post deleted"})
  
  
  
})


exports.addlike = handler(async(req,res,next)=>{
  const profile = await Profile.findOne({ user: req.user.id })
  const post = await Post.findById(req.params.id)
  if(!post){
    return  res.status(404).json({ message: 'No post found' })
    
  }
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
          return res.status(400).json({ alreadyliked: 'User already liked this post' });
        }

        // Add user id to likes array
        post.likes.unshift({ user: req.user.id });

        post.save()
        return res.json(post)
  
})








exports.unlike = handler(async(req,res,next)=>{

    const profile = await Profile.findOne({ user: req.user.id })
    const post = await Post.findById(req.params.id)
    
    if(!post){
      return res.status(404).json({ postnotfound: 'No post found' });
    }
    if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0
            ) {
              return res.status(400).json({ notliked: 'You have not yet liked this post' });
            }
  
    // Get remove index
    const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);
  
            // Splice out of array
            post.likes.splice(removeIndex, 1);
  
            // Save
            post.save() 
            return res.json(post);
           

  
})


exports.newComment = handler(async(req,res,next)=>{
  const post = await Post.findById(req.params.id)
  if(!post){
    res.status(404).json({ message: 'No post found' })
  }

    const newComment = {
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    };

    // Add to comments array
    post.comments.unshift(newComment);

    // Save
    post.save() 
    return res.json(post);
})








exports.removeComment = handler(async(req,res,next)=>{
  const post = await Post.findById(req.params.id)
  
  if(!post){
    res.status(404).json({ message: 'No post found' })
  }
    // Check to see if comment exists
    if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
          return res.status(404).json({ message: 'Comment does not exist' });
        }

        // Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        post.comments.splice(removeIndex, 1);

        post.save()
        return res.json(post)

})