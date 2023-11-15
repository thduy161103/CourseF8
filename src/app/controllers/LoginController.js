const { check, validationResult } = require('express-validator');
const passport = require('passport');
const User = require('../models/User');

//[GET] /
exports.index = function (req, res, next) {
  res.render('login/index');
};
//[GET] /signin
exports.getSignIn = function (req, res, next) {
  var messages = req.flash('error');
  res.render('login/signin', {
    messages: messages,
    hasErrors: messages.length > 0,
  });
};
//[POST] /signin
exports.postSignIn = function(req, res, next){
  User.findOne({ 'username': req.body.username })
  .then((user) => {
    if (!user) {
      res.render("login/signin").status(400).json({ error: 'Not user found' });
    }
    else if (!user.validPassword(req.body.password)) {
      res.render("login/signin").status(400).json({ error: 'Wrong password' });
    }
    else {
      res.redirect("/home");
      //res.status(200).json({ message: 'Sign in successfully' });
    }
  })
  .catch(next);
};

//[GET] /signup
exports.getSignUp = function (req, res, next) {
  var messages = req.flash('error');
  res.render('login/signup', {
    messages: messages,
    hasErrors: messages.length > 0,
  });
};
// [POST] /signup
exports.postSignUp = function(req, res, next) {
  User.findOne({ 'username': req.body.username })
  .then( (user) => {
    if (user) {
      res.render("login/signup");
      return res.status(400).json({ error: 'Username is already in use.' });
    }
    var newUser = new User();
    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.password = newUser.encryptPassword(req.body.password);
    newUser.save()
    .then(() => {
      res.render('login/signin').status(200).json({ message: 'User registered successfully' });
    })
    .catch((err) => {
      console.error(err);
      res.render("login/signup").status(500).json({ error: 'Internal Server Error' });
    });
  })
  .catch(next);
};
//res.session.user = user;
