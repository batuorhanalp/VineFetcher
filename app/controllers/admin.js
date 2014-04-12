
/*
 * Module dependencies.
 */
var request = require('request');

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
 * Tag/Video service
 *
 * @url: /admin/:tag
 */
exports.videos = function (req, res) {
  var page = req.param('page', 1);
  var tag = req.param('tag');

  // this page only returns json
  res.set('ContentType', 'application/json');

  // fetch videos from vine
  request.get("https://api.vineapp.com/timelines/tags/" + tag, function(error, response, body) {
    if (error) {
      res.json({ error: "An error occurred" });
      return;
    };

    // convert the response to json
    var json = JSON.parse(body);

    // check if it is successful
    if (!json.success) {
      res.json({ error: "Couldn't fetch videos" });
      return;
    }

    var records = json.data.records;
    res.json(records);
    res.end();
  });

};
