const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  userRegister(req, res, next) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(req.body.password, salt, function (err, hash) {
        UserModel.create({
          email: req.body.email,
          password: hash,
        }).then((data) => {
          res.json(data);
        });
      });
    });
  },

};
