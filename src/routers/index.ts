import express from "express";
const router = express.Router();

import User from "./user";
import Article from "./articles";


router.use("/user", User);
router.use("/article", Article);

export default router;