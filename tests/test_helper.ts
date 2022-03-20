import mongoose from "mongoose";
import Article from "../src/models/article";
import Comment from "../src/models/comment";
import User from "../src/models/user";
import { config } from "../src/shared/config";

mongoose.connect(config.mongodb.host, { dbName: config.mongodb.dbName });

mongoose.connection
  .once("open", () => console.log("Connected to db"))
  .on("error", (error) => {
    console.warn("Error : ", error);
  });

