
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
  // @TODO paging

  res.set('Connection', 'close');

  // get all videos
  Video.find(function(error, videos) {
    if (error) throw error;

    res.json(videos);
  });
};
