const Post = require('../models/postModel');
const User = require('../models/userModel');
const { ExpectationFailed } = require('http-errors');

module.exports={
   async postGetAll(req,res,next){
        let posts=await Post.find().populate('author');
        res.json(posts);
    },
    async postCreate(req,res,next){
         let user= await User.findOne({email:req.body.user});
         let arrNewPost=[...user.posts];
         let post=await Post.create({
            title:req.body.title,
            content:req.body.content,
            createdAt:'17/06/2020',
            author:user._id
         })
         arrNewPost.push(post._id);
         post.execPopulate('author').then((data)=>{
             User.findOneAndUpdate({ _id: data.author._id },{posts:arrNewPost},{new:true}).then((result)=>{
                 res.json({err:false});
             });
               
           
         })
         
    }

    // postNew(req,res,next){
    //     res.render('posts/new');
    // },
    // async postCreate(req,res,next){
    //     const date={
    //         day:(new Date()).getDay().toString(),
    //         month:(new Date()).getMonth().toString(),
    //         year:(new Date()).getFullYear().toString()
    //     }
    //     const data=`${date.day}/${date.month}/${date.year}`
    //    let post =await Post.create({
    //        title:req.body.title,
    //        content:req.body.content,
    //        createdAt:data
    //    });
    //    res.redirect(`/posts/${post._id}`);
    // },
    // async postShow(req,res,next){
    //     let post=await Post.findById(req.params.id);
    //     res.render('posts/show',{post});
    // },
    // async postEdit(req,res,next){
    //     let post =await Post.findById(req.params.id);
    //     res.render('posts/edit',{post});
    // },
    // async postUpdate(req,res,next){
    //     let post =await Post.findByIdAndUpdate(req.params.id,{
    //         title:req.body.title,
    //         content:req.body.content
    //     },{new:true});  
    //     res.json(post.id);
    // },
    // async postDestroy(req,res,next){
    //    let post =await Post.findById(req.params.id);
    //    res.render('posts/delete',{post});
    // },
    // async postDelete(req,res,next){
    //     let result=await Post.findByIdAndDelete(req.params.id);  
    //     res.json(result);
    //}
}