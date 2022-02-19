const suprtTest = require("supertest");
const app = require("../app");
const url = "/api/posts?tag=history&sortBy=likes";
describe("posts Api testing", () => {
  it("Get /api/posts", async () => {
    await suprtTest(app)
      .get(url)
      .then((response) => {
        expect(response.body);
        expect.objectContaining({
          posts: expect.arrayContaining([
            expect.objectContaining({
              author: expect.any(String),
              authorId: expect.any(Number),
              id: expect.any(Number),
              likes: expect.any(Number),
              popularity: expect.any(Number),
              reads: expect.any(Number),
              tags: expect.any(Array),
            }),
          ]),
        });
      });
  });
  it("GET /api/ping", () => {
    return suprtTest(app)
      .get("/api/ping")
      .then((response) => {
        expect(response.body);
        expect.objectContaining({
          success: expect.any(String),
        });
      });
  });
});
