const mongoose=require('../config/dbConnect');

const Schema=mongoose.Schema;

const UserSchema=new Schema({
   email:String,
   password:String,
   role:{
       type:String,
       default:'user'
   },
   posts:[{
    type:Schema.Types.ObjectId,
    ref:'Posts'
}],
},{
   collection:'Users'
});

const UserModel=mongoose.model('Users',UserSchema);


module.exports=UserModel;