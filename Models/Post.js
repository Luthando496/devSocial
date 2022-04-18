const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    content: {
    type: String,
  },
  postedBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref:'User'
  },
  image: {
    public_id: String,
    url: String,
  },
  createdAt:{
    type:Date,
    default:Date.now()
  },
  like:[{type: mongoose.SchemaTypes.ObjectId,ref:'User'}],
  comments:[
    {
      text:String,
      created:{
        type:Date,
        default:Date.now()
      },
      postedBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:'User'
      }
    }
  ]
  
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