
/*
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Video = mongoose.model('Video');

/**
 * The initial admin page with no video displaying
 *
 * @url: /admin
 */
exports.index = function (req, res) {
  var pageTitle = "Admin page";
  res.render('admin', {
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

  if(!videoJson) {
    res.json({ error: "No input" });
    return;
  }

  var video = new Video(videoJson);
  video.save(function(err, done) {
    res.json({ 'status': 'success' });
  });

};
