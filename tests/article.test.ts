import request from "request";
import { expect } from "chai";
import { createArticle } from "../src/controllers/article";
import Article, { IArticle } from "../src/models/article";

describe("Article API Tests", () => {
  beforeEach((done) => {
    createArticle({
      title: "test article",
      body: "Lorem ipsum",
      authorId: "12345",
      tags: [],
    })
      .then((doc) => {
        done();
      })
      .catch(() => done());
  });

  afterEach((done) => {
    Article.collection.drop(() => done());
  });

  it("should create article", (done) => {
    const url = "http://localhost:5500/api/article";

    Article.collection.drop(() => {
      request.post(
        url,
        {
          json: {
            title: "test article",
            body: "Lorem ipsum",
            authorId: "12345",
            tags: [],
          },
        },
        (err, resp, body) => {
          const article: IArticle = body.data;
          expect(resp.statusCode).to.equal(201);
          expect(article.title).equal("test article");
          expect(article.body).equal("Lorem ipsum");
          expect(article.created).equal(article.updated);
          done();
        }
      );
    });
  });

  it("should edit article", (done) => {
    createArticle({
      title: "test article",
      body: "Lorem ipsum",
      authorId: "12345",
      tags: [],
    })
      .then((doc) => {
        const url = `http://localhost:5500/api/article/${doc._id}`;
        request.patch(
          url,
          {
            json: {
              title: "test edit article",
              body: "Lorem ipsums",
            },
          },
          (err, resp, body) => {
            const article: IArticle = body.data;
            expect(resp.statusCode).to.equal(200);
            expect(article.title).equal("test edit article");
            expect(article.body).equal("Lorem ipsums");
            expect(article.created).not.equal(article.updated);
            done();
          }
        );
        done();
      })
      .catch(() => done());
  });

  it("should delete article", (done) => {
    createArticle({
      title: "test article",
      body: "Lorem ipsum",
      authorId: "12345",
      tags: [],
    })
      .then((doc) => {
        const url = `http://localhost:5500/api/article/${doc._id}`;
        request.patch(
          url,
          {},
          (err, resp, body) => {
            expect(resp.statusCode).to.equal(200);
            done();
          }
        );
        done();
      })
      .catch(() => done());
  });

});
