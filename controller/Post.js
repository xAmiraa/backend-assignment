const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const sortArray = require("sort-array");
const cachePosts = require("../routeCache");

fetch("https://api.hatchways.io/assessment/blog/posts?tag=tech")
  .then((response) => response.json())
  .then((data) => {
    router.get("/api/posts", cachePosts(300), (request, response) => {
      const tags = request.query.tag;
      const sort = request.query.sortBy;
      const direction = request.query.direction;
      const arrayOfSortedKey = ["id", "reads", "likes", "popularity"];
      const arrayofDirections = ["asc", "desc"];
      var result;
      if (tags) {
        if (tags.search(",") != -1) {
          var allTas = tags.split(",");
          var filterdPosts = data.posts.filter((item) => {
            for (let i = 0; i < allTas.length; i++) {
              if (item.tags.includes(allTas[i])) return item;
            }
          });

          var sortedArray = sortArray(filterdPosts, {
            by: arrayOfSortedKey.includes(sort) ? sort : "id",
            order: direction,
          });
          result = sortedArray;
        } else {
          var filterdBySingleTag = data.posts.filter((item) => {
            if (item.tags.includes(tags)) return item;
          });
          result = filterdBySingleTag;
        }

        if (
          (arrayOfSortedKey.includes(sort) || sort === undefined) &&
          (arrayofDirections.includes(direction) || direction === undefined)
        ) {
          var sortedArray = sortArray(result, {
            by: sort,
            order: direction,
          });
          response.status(200).json({ posts: sortedArray });
        } else {
          response.json({
            error: "sortBy parameter is invalid",
          });
        }
      } else {
        response.status(400).json({ error: "Tags parameter is required" });
      }
    });
  });

router.get("/api/ping", cachePosts(300), (request, response) => {
  return response.status(200).json({
    success: true,
  });
});

module.exports = router;
