import express from "express";
import { createComment, deleteComment, getCommentById, updateComment } from "../controllers/comments";
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    getCommentById(req.params.id)
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

router.post("/", async (req, res) => {
  try {
    createComment({
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
    updateComment({ id: req.params.id, body: req.body.body })
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

router.delete("/:id", async (req, res) => {
  try {
    deleteComment(req.params.id)
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