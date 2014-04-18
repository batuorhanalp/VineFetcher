
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

var basePath = '/bolmalzemos';

/**
 * login form
 *
 * @url: /admin/login
 */
exports.login = function (req, res) {
  if (req.isAuthenticated())
    return res.redirect(basePath + '/admin');
  res.render('admin/login');
};

exports.logout = function (req, res) {
  req.logout();
  res.redirect(basePath + '/admin');
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

    return res.redirect(basePath + '/users');
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

  if(!videoJson) 
    return res.json({ error: "No input" });

  var video = new Video(videoJson);
  video.save(function(err, done) {
    res.json({ 'status': 'success' });
  });
};

/**
 * Removes an approved video
 *
 * Accepts HTTP post params
 */
exports.disapprove = function (req, res) {
  var videoId = req.param('videoId');

  Video.findOneAndRemove({ 'videoId': videoId }, function(err, video) {
    if (err) return res.json({ 'error': 'an error occurred' });
    return res.json({ 'status': 'success' });
  });
};

/**
 * Returns approved video ids
 */
exports.approved = function(req, res) {
  res.set('Connection', 'close');

  Video
    .find()
    .select('videoId')
    .exec(function(err, videos) {
      if (err) return res.json({ 'error': 'an error occurred' });
      
      // populate video ids
      var ids = new Array();
      for (var index in videos) {
        ids.push(videos[index].videoId);
      }
      res.json(ids);
    });
};
