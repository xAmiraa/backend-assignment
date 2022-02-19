const express = require("express");
const server = express();
const url = "/";
var port = 3001;
const postController = require("./Controller/Post");

server.use(url, postController);
server.listen(port, () => {
  console.log(`server listenning on ${port}`);
});
module.exports = server;
