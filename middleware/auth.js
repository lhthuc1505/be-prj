const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require("../models/userModel");

const authToken = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        //console.log(user, 'ki');
        if (user) {
            return res.json({
                err: false,
                message: 'Co token',
                id: user._id,
                email: user.email,
                role:user.role

            })

        }
        if (!user) {
            return res.json({
                err: true,
                message: 'Khong co token',
                user: user

            });

        }
    })(req, res);
};

const authLogin = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.json({ user: user, err: true });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                return res.json(err);
            }
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign({ _id: user._id, email: user.email,role:user.role,status:user.status}, 'your_jwt_secret');
            //console.log(token);
            return res.json({token:token});
        });
    })(req, res);
}

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
},
    function (email, password, cb) {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT

        return UserModel.findOne({ email }).lean()
            .then(user => {
                if (!user) {
                    return cb(null, false, { message: 'Incorrect email' });
                }
                bcrypt.compare(password, user.password, function (err, result) {
                    if (result) {
                        return cb(null, user, { message: 'Logged In Successfully' });
                    }
                    return cb(null, false, { message: 'Password sai' });
                });

            })
            .catch(err => cb(err));
    }
));

module.exports = {
    authToken,
    authLogin
};