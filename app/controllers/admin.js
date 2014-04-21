
/*
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    passport = require('passport'),
    Video = mongoose.model('Video'),
    User = mongoose.model('User')
    ;

var basePath = '/bolmalzemos/';

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
  if (req.isAuthenticated())
    return res.redirect(basePath + 'admin');
  res.render('admin/login');
};


exports.loginPost = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { 
      console.log('err: ' + err);
      return next(err); 
    }

    if (!user) { 
      // check how many admins are registered
      // if no admin is there, create this one as default admin
      console.log('create user');
      User.find(function(err, users) {
        console.log('params: ' + req.param('email') + ' '+ req.param('password'));
        if (users.length == 0) {
          var u = new User({
            name: 'Admin',
            email: req.param('email'),
            username: 'admin',
            password: req.param('password')
          });
          u.provider = 'local';
          u.save(function(e, us) {
            if (e) throw e;

                return res.redirect('/')
            // manually login
            //req.logIn(us, function(err) {
            //  console.log('logging in');
            //  if (err) return next(err)
            //  return res.redirect('/bolmalzemos/admin/')
            //})
          });
        } else {
          if (req.isAuthenticated())
            return res.redirect(basePath + 'admin');
          res.render('admin/login');
        }
      });
    }

    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/bolmalzemos/admin');
    });
  })(req, res, next);
};

exports.logout = function (req, res) {
  req.logout();
  res.redirect(basePath + 'admin');
};

exports.createAdmin = function (req, res) {
  res.render('/admin/createAdmin', {
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

    return res.redirect(basePath + 'users');
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
