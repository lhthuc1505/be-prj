var express = require("express");
var router = express.Router({ mergeParams: true });
const { userRegister } = require("../controllers");
const { errorHandler } = require("../middleware/index");
const { authLogin, authToken } = require("../middleware/auth");
const UserModel = require("../models/userModel");
const PostModel = require("../models/postModel");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.post("/register", errorHandler(userRegister));
router.post("/login", authLogin);
router.post("/auth-token", authToken);
router.get("/demo", (req, res, next) => {
  UserModel.find()
    .populate("posts")
    .then((data) => {
      res.json(data[0].posts);
    });
});
router.get("/demo-post", (req, res, next) => {
  // PostModel.create({
  //   title:'New Post',
  //   content:'Demo choi choi',
  //   createdAt:'20/12/2020',
  //   author:'5ee5e04286205625849ae25d'
  // }).then((data)=>{

  // })
//   PostModel.findById({
//     _id: "5ee5e4fa9ad2d614b0376acb",
//   })
//     .populate("author")
//     .then((data) => {
//       UserModel.findOneAndUpdate({ _id: data.author._id },{posts:[data._id]},{new:true}).populate('posts').then((dat) => {
//         console.log(dat);
//       });
//       res.json(data);
//     });
// });

PostModel.findById({
  _id: "5ee5e4fa9ad2d614b0376acb",
})
  .populate("author")
  .populate('posts')
  .then((data) => {
    res.json(data);
  });
});
module.exports = router;
