const User = require('../Models/userModel')
const handler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const { promisify } = require('util');



const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};



exports.authUser = handler(async(req,res,next)=>{
  
  const user = await User.create(req.body)
  
 const token = await signToken(user._id)
 console.log(token)
  
  res.status(201).json({user,token})
  
  next()
  
})


exports.login = handler(async(req,res,next)=>{
    
  
  const user = await User.findOne({email:req.body.email}).select("+password")
  
  if(!user){
    return res.status(401).send(`user not found of ${req.body.email}`)
  }
  
  const usera = await user.correctPassword(req.body.password,user.password)
  
  if(!usera){
    return res.send('wrong password')
  }
  
  const token = await signToken(user._id)
  
  return res.status(200).json({user,token})
  next()

})


exports.protect = async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json('You are not logged in! Please log in to get access.')
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return res.status(401).json('The user belonging to this token does no longer exist.') 
  }


  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
};


exports.loadUser = handler(async(req,res,next)=>{
  
  const user = await User.findById(req.user.id).select('-select')
  const token = await signToken(user._id)
  
  res.status(200).json({user,token})
  
  
})

