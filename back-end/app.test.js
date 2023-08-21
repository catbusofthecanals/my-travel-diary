const request = require("supertest");
const app = require("./app");

//learned how to test backend requests with supertest, available here: https://www.codingninjas.com/studio/library/testing-express-app-with-jest

// expect get request status code to equal 200 / success
test("GET method response has status code = 200", () => {
  return request(app).get("/api/pins").expect(200);
});
