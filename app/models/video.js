
/**
 * Module dependencies
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Video schema
 */
var VideoSchema = new Schema({
  videoId: { type: Number },
  thumbnailUrl: { type: String },
  permalink: { type: String },
  videoUrl: { type: String },
  username: { type: String },
  description: { type: String },
  created: { type: Date },
  tag: { type: String }
});

/**
 * Register model
 */
mongoose.model('Video', VideoSchema);
