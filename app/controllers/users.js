
/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User');


exports.index = function (req, res) {
  User.find(function(err, users) {
    if (err) throw err;

    res.render('users/index', { 
      users: users,
      user: new User()
    });
  });
};

exports.deleteUser = function (req, res) {
  var userId = req.param('userId');
  //if (!userId) return res.redirect('/');

  User.findByIdAndRemove(userId, function(err) {
    if (err) throw err;
    return res.redirect('/users');
  });
};
