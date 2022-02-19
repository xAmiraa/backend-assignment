const express = require("express");
const server = express();


var port = 3000;
const postController = require("./Controller/Post");
const url = "/";
server.use(url, postController);
server.listen(port, () => {
  console.log(`server listenning on ${url}`);
});
