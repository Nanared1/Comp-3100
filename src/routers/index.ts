import express from "express";
const router = express.Router();

const userRouter = require("./user");
const articleRouter = require("./articles");


router.use("/user", userRouter);
router.use("/articles", articleRouter);

export default router;