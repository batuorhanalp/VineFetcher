
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
  app.get('/admin', admin.index);
  app.get('/admin/:tag', admin.videos);

};