import express from "express";
const router = express.Router();
import User, { IUserModel } from "../models/user";

router.post("/", async (req, res) => {
  try {
    await User
      .create({
        displayName: req.body.username,
        email: req.body.email,
        providerId: req.body.providerId,
        photoURL: req.body.photoURL,
        uid: req.body.uid,
      })
      .then((data) => {
        res.status(201).send({
          status: true,
          data: data,
          message: "User created successfully",
        });
      })
      .catch((err) => {
        res.status(400).send({
          status: false,
          message: "Error: Bad request",
        });
      });
  } catch (err) {
    res.status(500).send({
      status: "false",
      message: "Internal server error",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    await User
      .find()
      .then((doc) => {
        res.status(200).send({
          status: true,
          data: doc,
        });
      })
      .catch((err) => {
        res.status(400).send({
          status: false,
          message: "Error getting user",
        });
      });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Unexpected error",
    });
  }
});

router.get("/:uid", async (req, res) => {
  try {
    await User
      .findOne({ email: req.params.uid })
      .then((doc) => {
        if (doc) {
          res.status(200).send({
            status: true,
            data: doc,
          });
        } else {
          res.status(200).send({
            status: false,
            message: "User not found",
            data: doc,
          });
        }
      })
      .catch((err) => {
        res.status(400).send({
          status: false,
          message: "User not found",
        });
      });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Unexpected error",
    });
  }
});

export default router;