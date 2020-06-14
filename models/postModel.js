const mongoose=require('../config/dbConnect');

const Schema=mongoose.Schema;

const PostSchema=new Schema({
   title:String,
   content:String,
   author:{
      type:Schema.Types.ObjectId,
      ref:'Users'
   },
   createdAt:String
},{
   collection:'Posts'
});

const PostModel=mongoose.model('Posts',PostSchema);



module.exports=PostModel;