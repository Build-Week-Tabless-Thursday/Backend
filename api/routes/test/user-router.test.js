const request = require("supertest");
const server = require("../../server.js");

describe("user-router.js", () => {
  describe("GET /me", () => {
    it("should return a JSON object", () => {
      let response;
      return request(server)
        .get("/me")
        .then(res => {
          response = res;

          expect(response.type).toEqual("application/json");
        });
    });

    it("should return a 200 status code if successful", () => {});
  });
});
