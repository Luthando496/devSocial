const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim:true,
    required: [true, 'Please tell us your name!']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.default.isEmail, 'Please provide a valid email']
  },
  avatar: {
    type: String,
  },

  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 5,
    select: false
  },
  date:{
    type:Date,
    default:Date.now()
  },
},{
  toJSON:{virtuals:true},
  toObject:{virtuals:true}
});

userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);


  next();
});

userSchema.virtual('id').get(function(){
  return this._id.toHexString();
});



userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};





const User = mongoose.model('User', userSchema);

module.exports = User;
