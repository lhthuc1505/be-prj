var express = require('express');
var router = express.Router({mergeParams:true});
const {errorHandler} =require('../middleware/index');
const {postGetAll} =require('../controllers/post');


/* GET home page. */
router.get('/', errorHandler(postGetAll)) ;


module.exports = router;
