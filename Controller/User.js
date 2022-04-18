const User = require('../Models/userModel')
const handler = require('express-async-handler')


exports.authUser = handler(async(req,res,next)=>{
  
  const user = await User.create(req.body)
  
  res.status(201).json(user)
  
  next()
  
})


exports.login = handler(async(req,res,next)=>{
  
  const user = await User.findOne({email:req.body.email})
  
  if(!user){
    return res.status(401).send(`user not found of ${req.body.email}`)
  }
  
  const usera = user.correctPassword(req.password,user.password)
  
  res.status(200).json(user)
  
})