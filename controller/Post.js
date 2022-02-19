const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const sortArray = require("sort-array");
const cachePosts = require("../routeCache");
const api = "http://localhost:3000/api/posts?tag=history&sortBy=likes";
fetch("https://api.hatchways.io/assessment/blog/posts?tag=tech")
  .then((response) => response.json())
  .then((data) => {
    router.get("/api/posts", cachePosts(300), (request, response) => {
      console.log(request.originalUrl);
      const tags = request.query.tag;
      const sort = request.query.sortBy;
      const direction = request.query.direction;
      console.log("tags is", tags);
      let tgs = tags.split(",");

      if (!tags) {
        return response
          .status(400)
          .json({ error: "Tags parameter is required" })
          .end();
      } else {
        var dataFilterdByTechTag = data.posts.filter((post) => {
          return post.tags.find((tagPost) => {
            return tgs.find((t) => {
              return tagPost === t;
            });
          });
        });
        console.log(sort);
        if (sort) {
          if (
            direction === "asc" ||
            direction === "desc" ||
            direction === undefined
          ) {
            console.log("INSIDE SORT");
            var sortedByReads = sortArray(dataFilterdByTechTag, {
              by:
                sort === "popularity" || sort === "reads" || sort === "likes"
                  ? sort
                  : "id",
              order: direction,
            });
            return response.status(200).json({ posts: sortedByReads });
          } else {
            return response
              .status(400)
              .json({ error: "sortBy parameter is invalid" })
              .end();
          }
        }
      }
    });
  });
router.get("/tags", cachePosts(300), (req, res) => {
  res.send(["Hello"]);
});
router.get("/api/ping", cachePosts(300), (request, response) => {
  return response.status(200).json({
    success: true,
  });
});

module.exports = router;
