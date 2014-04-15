VineFetcher
===========

VineFetcher is a web app that fetches vine videos from its api and displays them.
It also has an administration back-end to approve the videos that are displayed.


Installation
------------

Install dependencies

    $ npm install

Start the server. See `package.json` for the start script.

    $ npm start

Deployment
----------

There are several ways to deploy node.js on linux server. A simple solution is to run it on the background

    nohup npm start > output.log &

but a better way is to deploy it using `forever` (https://github.com/nodejitsu/forever)

    [sudo] npm install forever -g
    forever start /usr/local/npm start

to see its process issue `forever list`. To kill the process

    forever stop 0

POST /admin/video/approve
-------------------------

Creates a video record on the database. The request parameter is the entire video object in JSON.
JSON data must be post as the request body. See following example:

    curl -X POST -H "Content-Type: application/json" 
      --data '{"videoId": 6,"thumbnailUrl": "http://mythumb.com/image.png",
          "permalink": "http://www.google.com","username": "Ali Koc","description": "Super bi video",
          "created": "2014-04-12T11:49:02.793Z","tag": "Dominos"}' http://localhost:3000/admin/video/approve

Return on success:

    {"status": "success"}

Return on failure:

    {"error": "an error occurred"}

POST /admin/video/delete
------------------------

Deletes the video object from the database by its `videoId`.
Data should be post as key-value parameters.

Example request

    curl -X POST --data "videoId=166" http://localhost:3000/admin/video/delete

Return on success:

    {"status": "success"}

Return on failure:

    {"error": "an error occurred"}

GET /videos
-------

Returns registered videos, 20 items per page.

Params:

  * page: desired page for the pagination. default is 1.

Example Response: 

    {
      "records": [
        {
          "videoId": 6,
          "thumbnailUrl": "http://mythumb.com/image.png",
          "permalink": "http://www.google.com",
          "username": "Ali Koc",
          "description": "Super bi video",
          "created": "2014-04-12T11:49:02.793Z",
          "tag": "Dominos",
          "_id": "5349282e5dbdd63b832c4a99",
          "__v": 0
        }
      ]
    }

GET /admin/video/ids
--------------------

Return just `videoId`s of registered videos. This service needs authentication.

Example Response:

    [
      6,
      7,
      6,
      7,
      6,
      6,
      6,
      126
    ]
