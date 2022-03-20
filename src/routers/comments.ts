import express from "express";
import { createComment, deleteComment, getCommentById, updateComment } from "../controllers/comments";
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    await getCommentById(req.params.id)
      .then((doc) => {
        res.status(200).send({
            status: true,
          data: doc,
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: err,
        });
      });
  } catch (err) {
    res.status(500).send({
      status: "false",
      message: "Internal server error",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    await createComment({
      body: req.body.body,
      articleId: req.body.articleId,
      authorId: req.body.authorId,
    })
      .then((doc) => {
        res.status(201).send({
          data: doc,
        });
      })
      .catch((err) => {
          console.error(err);
        res.status(400).send({
          message: err,
        });
      });
  } catch (err) {
    res.status(500).send({
      status: "false",
      message: "Internal server error",
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    await updateComment({ id: req.params.id, body: req.body.body })
      .then((doc) => {
        res.status(200).send({
          status: true,
          data: doc,
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: err,
        });
      });
  } catch (err) {
    res.status(500).send({
      status: "false",
      message: "Internal server error",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await deleteComment(req.params.id)
      .then((doc) => {
        res.status(200).send({
          data: doc,
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: err,
        });
      });
  } catch (err) {
    res.status(500).send({
      status: "false",
      message: "Internal server error",
    });
  }
});


export default router;