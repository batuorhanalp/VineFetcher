
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

/**
 * Expose
 */

module.exports = function (app, passport) {

  app.get('/', home.index);
  app.get('/videos', home.videos);

  // admin pages
  app.get('/admin', admin.index);
  app.get('/admin/login', admin.login);
  app.get('/admin/create-admin', admin.createAdmin);
  app.post('/admin/create-admin', admin.createAdminPost);
  app.post('/admin/approve', admin.approve);
  app.post('/admin/login', passport.authenticate(
        'local', 
        { 
          successRedirect: '/admin', 
          failureRedired: '/admin/login' 
        }));
  app.get('/admin/logout', admin.logout);

};
