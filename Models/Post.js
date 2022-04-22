const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user'
  },
  text: {
    type: String,
    required: [true,'Text is required']
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [
    {
      user: {
        type:mongoose.SchemaTypes.ObjectId,
        ref: 'user'
      }
    }
  ],
  comments: [
    {
      user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
      },
      text: {
        type: String,
        required: [true,'Text is required']
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now()
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now()
  }
  
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
    timestamps:true
    
});

postSchema.virtual('id').get(function(){
  return this._id.toHexString();
});





const Post = mongoose.model('Post', postSchema);

module.exports = Post;
