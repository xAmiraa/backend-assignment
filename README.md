# backend-assignment
To run the server you should run this command on path of nodejs folder

node app
To test apis (Bouns point)
npm test

To test caching server (Bouns point)
you will check the network tap on console you will show the last time you make request it's time less than first time request and you can check test file
and watch the terminal

First Route:
you can call this api after run the server
http://localhost:3001/api/posts?tag=health,tech&sortBy=likes&direction=asc
it will return this result
{ "posts": [ { "author": "Adalyn Blevins", "authorId": 11, "id": 37, "likes": 107, "popularity": 0.55, "reads": 35946, "tags": [ "tech", "health", "history" ] }, { "author": "Lainey Ritter", "authorId": 1, "id": 76, "likes": 122, "popularity": 0.01, "reads": 75771, "tags": [ "tech", "health", "politics" ] }, { "author": "Rylee Paul", "authorId": 9, "id": 1, "likes": 960, "popularity": 0.13, "reads": 50361, "tags": [ "tech", "health" ] }, { "author": "Jon Abbott", "authorId": 4, "id": 95, "likes": 985, "popularity": 0.42, "reads": 55875, "tags": [ "politics", "tech", "health", "history" ] } ] }
Second Route:
http://localhost:3001/api/ping
will return object like this :
{ success: true, }
