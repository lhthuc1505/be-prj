const mongoose=require('../config/dbConnect');

const Schema=mongoose.Schema;

const UserSchema=new Schema({
   email:String,
   password:String,
   role:{
       type:String,
       default:'admin'
   },
   posts:[{
    type:Schema.Types.ObjectId,
    ref:'Posts'
}],
questions:[{
    type:Schema.Types.ObjectId,
    ref:'Questions'
}],
answers:[{
    type:Schema.Types.ObjectId,
    ref:'Questions'
}],
notify:[{
    type:Schema.Types.ObjectId,
    ref:'Notify'
}],
},{
   collection:'Users'
});

const UserModel=mongoose.model('Users',UserSchema);


module.exports=UserModel;