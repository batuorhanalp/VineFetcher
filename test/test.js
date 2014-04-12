
/*!
 * Module dependencies.
 */

var request = require('supertest');
var should = require('should');
var app = require('../server');
var mongoose = require('mongoose');

// models
var Video = mongoose.model('Video');

describe.skip('Users', function () {
  describe('POST /users', function () {
    it('should create a user', function (done) {
      // fill the test
      done()
    })
  })
})

describe('Videos', function() {
  beforeEach(function (done) {
    var video1 = new Video({
      videoId:  6,
      thumbnailUrl: "http://mythumb.com/image.png",
      permalink: "http://www.google.com",
      videoUrl: "http://www.google.com/video.mkv",
      username: "Ali Koc",
      description: "Super bi video",
      created: Date.now(),
      tag: "Dominos"
    });
    video1.save();

    var video2 = new Video({
      videoId: 7,
      thumbnailUrl: "http://mythumb.com/image2.png",
      permalink: "http://www.google.com",
      videoUrl: "http://www.google.com/video2.mkv",
      username: "Batu Orhanalp",
      description: "Bu daha Super bi video",
      created: Date.now(),
      tag: "Dominos"
    });
    video2.save(done);
  });

  describe('GET /videos', function() {
    it('should display videos', function (done) {
      request(app)
        .get('/videos')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done);
    });
  });

  afterEach(function (done) {
    Video.collection.remove(done);
  });

});
