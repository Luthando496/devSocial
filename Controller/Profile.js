const User = require('../Models/userModel')
const Profile = require('../Models/Profile')
const handler = require('express-async-handler')
const request = require('request')




exports.getProfile = handler(async(req,res,next)=>{
  
  const profile = await Profile.findOne({user:req.user._id})
  
  if(!profile){
    return res.status(401).send('no profile found')
  }
  
  return res.send(profile)
  
  next()
})

exports.createProfile = handler(async(req,res,next)=>{
  
  // const profile = await Profile.create(req.body)
  
  // if(!profile){
  //   return res.status(401).send('no profile found')
  // }

    
    console.log(req.user)
      
  const profileFields = {};
    profileFields.user = req.user._id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    // Skills - Spilt into array
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',')
    }
    
    console.log(profileFields.skills)

    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

        // Update
        // let profile = await Profile.create(profileFields)
        let profile = await Profile.findOne({user:req.user._id})
        if(profile){
          profile  = await Profile.findOneAndUpdate({ user: req.user._id },{$set:profileFields},
          {$new:true});
          
          return res.json(profile)
        }
        console.log(profile)
        
        // Check if handle exists
        // Create
         profile = new Profile(profileFields)

          // Save Profile
          await profile.save()
          return res.json(profile)

      
          next()
  
})




exports.getAllProfiles= handler(async(req,res,next)=>{
  
  const profiles = await Profile.find().populate('user',['avatar','name'])
  if(!profiles){
    return res.json({message:"No profiles found"})
  }
  
  return res.json(profiles)
  
})









exports.getGithub= handler(async(req,res,next)=>{
  
  const options = {
    uri:`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.githubid}&client_secret=${process.env.githubsecret}`,
    method:"GET",
    headers:{'user-agent':'node.js'}
  }
  
  request(options,(error,response,body)=>{
    if(error)console.error(error)
    
    if(response.statusCode !== 200){
      return res.status(404).json({message:"Github file not found"})
    }
    
    
    return res.json(JSON.parse(body))
    
  })

  
})







exports.profileById = handler(async(req,res,next)=>{
  
  const profile = await Profile.findOne({user:req.params.id}).populate('user','name')
  if(!profile){
    return res.json({message:"No profiles found for this user"})
  }
  
  return res.json(profile)
  
})


exports.deleteProfile = handler(async(req,res,next)=>{
  
   await Profile.findOneAndRemove({user:req.user._id})
   await User.findOneAndRemove({_id:req.user._id})
 
  
  return res.json({message:"user and profile deleted"})
  
})





exports.addExperience = handler(async(req,res,next)=>{
  
  const profile = await Profile.findOne({ user: req.user.id })
  console.log(req.body.title)
  
  const newExp = {
    title: req.body.title,
    company: req.body.company,
    location: req.body.location,
    from: req.body.from,
    to: req.body.to,
    current: req.body.current,
    description: req.body.description
  };
  
  profile.experience.unshift(newExp)
  
  await profile.save()

  
  
  return res.json(profile)
  
})







exports.addEducation = handler(async(req,res,next)=>{
  
  const profile = await Profile.findOne({ user: req.user.id })

  
  const newExp = {
    school: req.body.school,
    degree: req.body.degree,
    fieldofstudy: req.body.fieldofstudy,
    location: req.body.location,
    from: req.body.from,
    to: req.body.to,
    current: req.body.current,
    description: req.body.description
  };
  
  profile.education.unshift(newExp)
  
  await profile.save()

  
  
  return res.json(profile)
  
})