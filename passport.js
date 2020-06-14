const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
var passport = require("passport");
var UserModel = require('./models/userModel');
passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'your_jwt_secret'
    },
    function (jwtPayload, cb) {
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        //console.log(jwtPayload,'okkkk');
        return UserModel.findOne({_id:jwtPayload._id})
            .then(user => {                       
              if(user){
                  // req.user = user
                return cb(null, user);
              }
              return cb(null,false)
            })
            .catch(err => {
                return cb(err);
            });
    }
));

module.exports=passport