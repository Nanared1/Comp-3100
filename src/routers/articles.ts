import express from "express";
import mongoose from "mongoose";
import Article, { IArticle } from "../models/article";


const router = express.Router();
router.post("/", async (req, res) => {
  try {
    await Article
      .create({
        title: req.body.title,
        content: req.body.content,
        userId: req.body.userId,
      })
      .then((doc) => {
        res.status(201).send({
          status: true,
          message: "Stories added successfully",
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

router.get("/", async (req, res) => {
  try {
    await Article
      .aggregate([
        {
          $lookup: {
            from: "users", //collection to join
            localField: "userId", //field from input document
            foreignField: "_id",
            as: "userDetails", //output array field
          },
        },
      ])
      .exec()
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
    await Article
      .aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(req.params.id) },
        },
        {
          $lookup: {
            from: "users", //collection to join
            localField: "userId", //field from input document
            foreignField: "_id",
            as: "userDetails", //output array field
          },
        },
      ])
      .exec()
      .then((doc) => {
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

router.get("/user/:uid", async (req, res) => {
  try {
    await Article
      .aggregate([
        {
          $match: { userId: new mongoose.Types.ObjectId(req.params.uid) },
        },
        //   {
        //     $lookup: {
        //       from: "users", //collection to join
        //       localField: "userId", //field from input document
        //       foreignField: "_id",
        //       as: "userDetails", //output array field
        //     },
        //   },
      ])
      .exec()
      .then((doc) => {
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

export default router;