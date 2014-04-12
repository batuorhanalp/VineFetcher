
/**
 * Module dependencies
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Video schema
 */
var VideoSchema = new Schema({
  video_id: { type: String },
  thumbnail_url: { type: String },
  permalink; { type: String },
  video_url: { type: String },
  username: { type: String },
  description: { type: String },
  created: { type: Date }
});
