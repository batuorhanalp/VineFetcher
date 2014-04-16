
/*!
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Video = mongoose.model('Video');

exports.index = function (req, res) {
  res.render('home', {
    title: 'Node Express Mongoose Boilerplate'
  })
}

exports.videos = function (req, res) {
  var page = req.param('page', 1);
  var itemPerPage = 20;
  var startFrom = (page - 1) * itemPerPage;

  res.set('Connection', 'close');

  // get all videos
  Video
    .find()
    .limit(itemPerPage)
    .skip(startFrom)
    .sort("-order")
    .exec(function(error, videos) {
      if (error) throw error;
      res.json({ records: videos });
    });
};
