
/*
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Video = mongoose.model('Video'),
    User = mongoose.model('User')
    ;

exports.authCallback = function (req, res) {
  var redirectTo = req.session.returnTo ? req.session.returnTo : '/'
  delete req.session.returnTo
  res.redirect(redirectTo)
};

/**
 * login form
 *
 * @url: /admin/login
 */
exports.login = function (req, res) {
  res.render('admin/login');
};

exports.createAdmin = function (req, res) {
  res.render('admin/createAdmin', {
    user: new User()  
  });
}

exports.createAdminPost = function (req, res) {
  var user = new User(req.body);
  user.provider = 'local'; // local authentication (as opposed to github)
  user.save(function(err) {
    if (err) {
      return res.render('/admin/createAdmin', { 
        error: "Something went wrong",
        user: user
      });
    }

    return res.redirect('/admin');
  });
};

/**
 * The initial admin page with no video displaying
 *
 * @url: /admin
 */
exports.index = function (req, res) {
  var pageTitle = "Admin page";
  res.render('admin/index', {
    title: pageTitle
  });
};

/**
 * Admin approves the video via posting to this controller
 *
 * @url: /admin/approve
 */
exports.approve = function (req, res) {
  // params
  var videoJson = req.body;

  res.set("Connection", "close");

  if(!videoJson) {
    res.json({ error: "No input" });
    return;
  }

  var video = new Video(videoJson);
  video.save(function(err, done) {
    res.json({ 'status': 'success' });
  });

};
