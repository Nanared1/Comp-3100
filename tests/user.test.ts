import User from "../src/models/user";
import request from "request";
import { expect } from "chai";
import { signupUser } from "../src/controllers/user";

describe("User API Tests", () => {
  beforeEach((done) => {
    signupUser({
      email: "test@gmail.com",
      password: "test1234#",
      username: "test_name",
      name: {
        first: "test",
        last: "test",
      },
    })
      .then(() => done())
      .catch(() => done());
  });
  describe("Signup User", () => {
    const url = "http://localhost:5500/api/user/signup";
    it("Should successfully create a new user", (done) => {
      User.collection
        .drop()
        .then(() => {
          request.post(
            url,
            {
              json: {
                email: "test@gmail.com",
                password: "test1234#",
                username: "test_name",
                name: {
                  first: "test",
                  last: "test",
                },
              },
            },
            (err, resp, body) => {
              expect(resp.statusCode).to.equal(201);
              done();
            }
          );
        })
        .catch(() => done());
    });

    it("Should fail to create already existing user", (done) => {
      request.post(
        url,
        {
          json: {
            email: "test@gmail.com",
            password: "test1234#",
            username: "test_name",
            name: {
              first: "test",
              last: "test",
            },
          },
        },
        (err, resp, body) => {
          expect(resp.statusCode).to.equal(400);
          done();
        }
      );
    });
  });

  describe("Login User", () => {
    const url = "http://localhost:5500/api/user/login";

    it("It should login user successfully", (done) => {
      request.post(
        url,
        {
          json: {
            email: "test@gmail.com",
            password: "test1234#",
          },
        },
        (err, resp, body) => {
          expect(resp.statusCode).to.equal(200);
          done();
        }
      );
    });

    it("It should fail to login user with incorrect password", (done) => {
      request.post(
        url,
        {
          json: {
            email: "test@gmail.com",
            password: "test1234#%",
          },
        },
        (err, resp, body) => {
          expect(resp.statusCode).to.equal(400);
          done();
        }
      );
    });

    it("It should fail to login user with not email found", (done) => {
      request.post(
        url,
        {
          json: {
            email: "test@gmail.com",
            password: "test1234#%",
          },
        },
        (err, resp, body) => {
          expect(resp.statusCode).to.equal(400);
          done();
        }
      );
    });
  });
});
