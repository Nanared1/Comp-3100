import express from "express";
import { blockUser, followUser, getUserById, loginUser, signupUser, unblockUser, unfollowUser } from "../controllers/user";
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    await signupUser(req.body)
      .then(() => {
        res.status(201).send({
          status: true,
          message: "User Created",
        });
      })
      .catch((err) => {
        res.status(400).send({
          status: false,
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

router.post("/login", async (req, res) => {
  try {
    await loginUser(req.body.email, req.body.password).then((tokenData) => {
      res.status(200).send({
        status: true,
        data: tokenData,
      });
    }).catch((err) => {
      console.error(err);
      res.status(400).send({
        status: false,
        message: err
      });
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Unexpected Error"
    });
  }
});


router.post("/follow", async (req, res) => {
  try {
    await followUser(req.body.userId, req.body.followerId).then((tokenData) => {
      res.status(200).send({
        status: true,
        data: tokenData,
      });
    }).catch((err) => {
      console.error(err);
      res.status(400).send({
        status: false,
        message: err
      });
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Unexpected Error"
    });
  }
});

router.post("/unfollow", async (req, res) => {
  try {
    await unfollowUser(req.body.userId, req.body.followerId).then((tokenData) => {
      res.status(200).send({
        status: true,
        data: tokenData,
      });
    }).catch((err) => {
      console.error(err);
      res.status(400).send({
        status: false,
        message: err
      });
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Unexpected Error"
    });
  }
});

router.post("/block", async (req, res) => {
  try {
    await blockUser(req.body.userId, req.body.followerId).then((tokenData) => {
      res.status(200).send({
        status: true,
        data: tokenData,
      });
    }).catch((err) => {
      console.error(err);
      res.status(400).send({
        status: false,
        message: err
      });
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Unexpected Error"
    });
  }
});

router.post("/unblock", async (req, res) => {
  try {
    await unblockUser(req.body.userId, req.body.followerId).then((tokenData) => {
      res.status(200).send({
        status: true,
        data: tokenData,
      });
    }).catch((err) => {
      console.error(err);
      res.status(400).send({
        status: false,
        message: err
      });
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Unexpected Error"
    });
  }
});

router.get("/:uid", async (req, res) => {
  try {
    await getUserById(req.params.uid)
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