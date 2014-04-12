
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var passportOptions = {
  failureFlash: 'Invalid email or password.',
  failureRedirect: '/login'
};

// controllers
var home = require('home');
var admin = require('admin');

// middlewares
var requiresLogin = function(req, res, next) {
  if (req.isAuthenticated()) return next();
  if (req.method == "GET") req.session.returnTo = req.originalUrl;
  res.redirect('/admin/login');
};


/**
 * Expose
 */
module.exports = function (app, passport) {

  // public pages
  app.get('/', home.index);
  app.get('/videos', home.videos);

  // auth pages
  app.get('/admin/login', admin.login);
  app.post('/admin/login', passport.authenticate(
        'local', 
        { 
          successRedirect: '/admin', 
          failureRedired: '/admin/login' 
        }));

  // admin pages
  app.get('/admin/logout', admin.logout);
  app.get('/admin', requiresLogin, admin.index);
  app.get('/admin/create-admin', admin.createAdmin);
  app.post('/admin/create-admin', admin.createAdminPost);
  app.post('/admin/approve-video', requiresLogin,  admin.approve);
  app.get('/admin/approved-videos', requiresLogin, admin.approved);

};
