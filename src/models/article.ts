import mongoose, { Schema, Types } from "mongoose";
import uniquerValidator from "mongoose-unique-validator";
import { config } from "../shared/config";

export interface IArticle {
  _id: Types.ObjectId;
  title: string;
  body: string;
  tags: string[];
  created: Date;
  updated: Date;
  authorId: Types.ObjectId;
  comments: Types.ObjectId[];
  likes: Types.ObjectId[];
}

const articleSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  tags: [String],
  created: { type: Date, required: true },
  updated: { type: Date, required: true },
  authorId: { type: mongoose.Types.ObjectId, required: true },
  comments: [mongoose.Types.ObjectId],
  likes: [mongoose.Types.ObjectId]
});

articleSchema.plugin(uniquerValidator);

export default mongoose.model(config.tableNames.articles, articleSchema);
