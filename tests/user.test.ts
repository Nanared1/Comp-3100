import User from "../src/models/user";
import request from "request";
import { expect } from "chai";
import { followUser, signupUser } from "../src/controllers/user";
import { Types } from "mongoose";

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

  afterEach((done) => {
    User.collection.drop(() => done());
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

  describe("Follow and Unfollow users", () => {
    const url = "http://localhost:5500/api/user";
    it("should follow existing user", async () => {
      await User.collection.drop();
      const newUser = await signupUser({
        email: "test@gmail.com",
        password: "test1234#",
        username: "test_name",
        name: {
          first: "test",
          last: "test",
        },
      });

      const userId = newUser._id;
      const followerId = new Types.ObjectId();

      request.post(
        `${url}/follow`,
        {
          json: {
            userId,
            followerId,
          },
        },
        (err, resp, body) => {
          expect(resp.statusCode).to.equal(200);
        }
      );
    });

    it("should throw error for following non existent user", async () => {

      request.post(
        `${url}/follow`,
        {
          json: {
            userId: new Types.ObjectId(),
            followerId: new Types.ObjectId(),
          },
        },
        (err, resp, body) => {
          expect(resp.statusCode).to.equal(200);
          expect(body.data.modifiedCount).equal(0);
        }
      );
    });

    it("should unfollow existing user being followed", async () => {
      await User.collection.drop();
      const newUser = await signupUser({
        email: "test@gmail.com",
        password: "test1234#",
        username: "test_name",
        name: {
          first: "test",
          last: "test",
        },
      });

      const userId = newUser._id;
      const followerId = new Types.ObjectId();

      await followUser(userId, followerId.toHexString());

      request.post(
        `${url}/unfollow`,
        {
          json: {
            userId,
            followerId,
          },
        },
        (err, resp, body) => {
          expect(resp.statusCode).to.equal(200);
        }
      );
    });

    it("should unfollow existing user not being followed", async () => {
      await User.collection.drop();
      const newUser = await signupUser({
        email: "test@gmail.com",
        password: "test1234#",
        username: "test_name",
        name: {
          first: "test",
          last: "test",
        },
      });

      const userId = newUser._id;
      const followerId = new Types.ObjectId();

      request.post(
        `${url}/unfollow`,
        {
          json: {
            userId,
            followerId,
          },
        },
        (err, resp, body) => {
          expect(body.data.modifiedCount).equal(0);
          expect(resp.statusCode).to.equal(200);
        }
      );
    });

  });

  describe("Block and Unblock users", () => {
    const url = "http://localhost:5500/api/user";
    it("should block existing user", async () => {
      await User.collection.drop();
      const newUser = await signupUser({
        email: "test@gmail.com",
        password: "test1234#",
        username: "test_name",
        name: {
          first: "test",
          last: "test",
        },
      });

      const userId = newUser._id;
      const followerId = new Types.ObjectId();

      request.post(
        `${url}/block`,
        {
          json: {
            userId,
            followerId,
          },
        },
        (err, resp, body) => {
          expect(resp.statusCode).to.equal(200);
        }
      );
    });

    it("should throw error for following non existent user", async () => {

      request.post(
        `${url}/block`,
        {
          json: {
            userId: new Types.ObjectId(),
            followerId: new Types.ObjectId(),
          },
        },
        (err, resp, body) => {
          expect(resp.statusCode).to.equal(200);
          expect(body.data.modifiedCount).equal(0);
        }
      );
    });
  });


});
