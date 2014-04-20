
/**
 * Module dependencies.
 */
var basePath = 'http://report.karbonat.com/bolmalzemos';

var mongoose = require('mongoose');
var passportOptions = {
  failureFlash: 'Invalid email or password.',
  failureRedirect: '/login'
};

// controllers
var home = require('home'),
    admin = require('admin'),
    users = require('users');


// middlewares
var requiresLogin = function(req, res, next) {
  if (req.isAuthenticated()) return next();
  if (req.method == "GET") req.session.returnTo = req.originalUrl;
  res.redirect(basePath + '/admin/login');
};


/**
 * Expose
 */
module.exports = function (app, passport) {

  app.namespace(basePath, function() {
    // public pages
    app.get(basePath, home.index);
    app.get(basePath + '/videos', home.videos);

    // auth pages
    app.get(basePath + '/admin/login', admin.login);
    app.post(basePath + '/admin/login', passport.authenticate(
          'local', 
          { 
            successRedirect: basePath + '/admin', 
            failureRedired: basePath + '/admin/login' 
          }));
    app.get(basePath + '/admin/logout', requiresLogin, admin.logout);
    app.get(basePath + '/admin/create', requiresLogin, admin.createAdmin);
    app.post(basePath + '/admin/create', requiresLogin, admin.createAdminPost);

    // admin pages
    app.get(basePath + '/admin', requiresLogin, admin.index);
    app.post(basePath + '/admin/video/approve', requiresLogin, admin.approve);
    app.post(basePath + '/admin/video/delete', requiresLogin, admin.disapprove);
    app.get(basePath + '/admin/video/ids', requiresLogin, admin.approved);

    // user pages
    app.get(basePath + '/users', requiresLogin, users.index);
    app.post(basePath + '/users/delete', requiresLogin, users.deleteUser);
  });

};
