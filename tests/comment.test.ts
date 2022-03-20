import request from "request";
import { expect } from "chai";
import { createComment } from "../src/controllers/comments";
import Comment, { IComment } from "../src/models/comment";
import { Types } from "mongoose";

describe("Comment API Tests", () => {
  const url = "http://localhost:5500/api/comment";
  it("Should successfully create a new comment", (done) => {
    Comment.collection
      .drop()
      .then(() => {
        request.post(
          url,
          {
            json: {
              body: "this is a test comment",
              articleId: "12345",
              authorId: "12345",
            },
          },
          (err, resp, body) => {
            console.warn(resp.statusMessage);
            expect(resp.statusCode).to.equal(201);
            done();
          }
        );
      })
      .catch(() => done());
  });

  it("Should fetch comment", (done) => {
    createComment({
      body: "this is a test comment",
      articleId: "1234",
      authorId: "12345",
    })
      .then((doc) => {
        request.get(`${url}/${doc._id}`, {}, (err, resp, body) => {
          expect(resp.statusCode).to.equal(200);
          done();
        });
      })
      .catch(() => done());
  });

  it("Should fail to fetch comment", (done) => {
    request.get(`${url}/1234`, {}, (err, resp, body) => {
        expect(resp.statusCode).to.equal(400);
        done();
      });
  });


  it("Should fail to update non existent comment", (done) => {
    request.patch(`${url}/1234`, {
        json: {
            body: "updated comment"
        }
    }, (err, resp, body) => {
        expect(resp.statusCode).to.equal(400);
        done();
      });
  });


  it("Should update comment", (done) => {
    createComment({
      body: "this is a test comment",
      articleId: "1234",
      authorId: "12345",
    })
      .then((doc) => {
        request.patch(`${url}/${doc._id}`, {
            json: {
                body: "updated comment"
            }
        }, (err, resp, body) => {
          expect(resp.statusCode).to.equal(200);
          done();
        });
      })
      .catch(() => done());
  });

  it("Should delete comment", (done) => {
    createComment({
      body: "this is a test comment",
      articleId: "1234",
      authorId: "12345",
    })
      .then((doc) => {
        request.delete(`${url}/${doc._id}`, {}, (err, resp, body) => {
          expect(resp.statusCode).to.equal(200);
          done();
        });
      })
      .catch(() => done());
  });


});
