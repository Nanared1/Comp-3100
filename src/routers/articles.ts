import express from "express";
import { createArticle, deleteArticle, fetchArticlesByAuthorId, fetchArticlesById, updateArticle } from "../controllers/article";


const router = express.Router();
router.post("/", async (req, res) => {
  try {
    await createArticle({
      authorId: req.body.author_id,
      title: req.body.title,
      tags: req.body.tags,
      body: req.body.body
    })
      .then((doc) => {
        res.status(201).send({
          status: true,
          message: "Stories added successfully",
          data: doc
        });
      })
      .catch(() => {
        res.status(400).send({
          status: false,
          message: "Error while adding stories",
        });
      });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Unexpected error occurred",
    });
  }
});

router.get("/author/:authorId", async (req, res) => {
  try {
    await fetchArticlesByAuthorId(req.params.authorId)
      .then((doc) => {
        res.status(200).send({
          status: true,
          data: doc,
        });
      })
      .catch(() => {
        res.status(400).send({
          status: false,
          message: "Error in fetching articles",
        });
      });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Unexpected error occurred",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    await fetchArticlesById(req.params.id).then((doc) => {
        res.status(200).send({
          status: true,
          data: doc,
        });
      })
      .catch(() => {
        res.status(400).send({
          status: false,
          message: "Error in fetching stories",
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Unexpected error occurred",
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    await updateArticle({
      id: req.params.id,
      title: req.body.title,
      body: req.body.body
    }).then((doc) => {
      res.status(200).send({
        status: true,
        data: doc,
      });
    }).catch(() => {
      res.status(400).send({
        status: false,
        message: "Error in updating story",
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Unexpected error occurred",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await deleteArticle(req.params.id).then((doc) => {
      res.status(200).send({
        status: true,
        data: doc,
      });
    }).catch(() => {
      res.status(400).send({
        status: false,
        message: "Error in deleting article",
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Unexpected error occurred",
    });
  }
});


export default router;