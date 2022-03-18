import mongoose, { Schema, ObjectId } from "mongoose";
import uniquerValidator from "mongoose-unique-validator";
import { config } from "../shared/config";
import { IUserModel } from "./user";
import { IComment } from "./comment";

export interface IArticle {
  _id: ObjectId;
  title: string;
  description: string;
  body: string;
  tagList: {
    tag: string;
  };
  created: Date;
  updated: Date;
  author_id: ObjectId;
  comments: {
    comment: IComment;
    created: Date;
  };
  like: {
    likedBy: IUserModel;
  };
  likeCount: number;
}

const articleSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  body: { type: String, required: true },
  tagList: [{ type: String, required: false }],
  created: { type: Date, required: true },
  updated: { type: Date, required: true },
  author: { type: mongoose.Types.ObjectId, required: true },
  comments: [mongoose.Types.ObjectId],
  likes: [mongoose.Types.ObjectId]
});

articleSchema.plugin(uniquerValidator);

export default mongoose.model(config.tableNames.articles, articleSchema);
