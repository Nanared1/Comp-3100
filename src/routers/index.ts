import express from "express";
const router = express.Router();

import User from "./user";
import Article from "./articles";
import Comment from "./comments";


router.use("/user", User);
router.use("/article", Article);
router.use("/comment", Comment);

export default router;