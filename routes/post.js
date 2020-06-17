var express = require('express');
var router = express.Router({mergeParams:true});
const {errorHandler} =require('../middleware/index');
const {postGetAll,postCreate} =require('../controllers/post');


/* GET home page. */
router.get('/', errorHandler(postGetAll)) ;
router.post('/new', errorHandler(postCreate)) ;


module.exports = router;
