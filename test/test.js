
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

describe('Home', function() {
  beforeEach(function (done) {
    var video1 = new Video({
      videoId:  6,
      thumbnailUrl: "http://mythumb.com/image.png",
      permalink: "http://www.google.com",
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


describe("Admin", function() {
  describe("POST /admin/approve", function(done) {
    var postData = {
      videoId: 3,
      thumbnailUrl: "http://mythumb.com/image.png",
      permalink: "http://www.google.com",
      username: "Ali Koc",
      description: "Super bi video",
      created: Date.now(),
      tag: "Dominos"
    };

    request(app)
      .post('/admin/approve')
      .send(postData)
      .set('Accept', 'application/json')
      .end(function(err, res) {
        should.not.exist(err);
        res.should.have.status(200);
        var body = JSON.parse(res.body);
        res.body.should.be.equal({ 'status': 'success' });
        console.log(res.body);

        Video.find(function(err, videos) {
          videos.length.should.be.equal(1);
          videos[0].videoId.should.be.equal(3);
          done();
        });
      });
  });

  afterEach(function (done) {
    Video.collection.remove(done);
  });
});
