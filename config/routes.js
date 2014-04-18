
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var passportOptions = {
  failureFlash: 'Invalid email or password.',
  failureRedirect: '/login'
};

// controllers
var home = require('home'),
    admin = require('admin'),
    users = require('users');

var basePath = '/bolmalzemos';

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
    app.get('/', home.index);
    app.get('/videos', home.videos);

    // auth pages
    app.get('/admin/login', admin.login);
    app.post('/admin/login', passport.authenticate(
          'local', 
          { 
            successRedirect: basePath + '/admin', 
            failureRedired: basePath + '/admin/login' 
          }));
    app.get('/admin/logout', requiresLogin, admin.logout);
    app.get('/admin/create', requiresLogin, admin.createAdmin);
    app.post('/admin/create', requiresLogin, admin.createAdminPost);

    // admin pages
    app.get('/admin', requiresLogin, admin.index);
    app.post('/admin/video/approve', requiresLogin, admin.approve);
    app.post('/admin/video/delete', requiresLogin, admin.disapprove);
    app.get('/admin/video/ids', requiresLogin, admin.approved);

    // user pages
    app.get('/users', requiresLogin, users.index);
    app.post('/users/delete', requiresLogin, users.deleteUser);
  });

};
