import mongoose, { Schema, Types } from "mongoose";
import uniquerValidator from "mongoose-unique-validator";
import { config } from "../shared/config";

export interface IComment {
  _id: Types.ObjectId;
  body: string;
  articleId: Types.ObjectId;
  created: Date;
  updated: Date;
  authorId: Types.ObjectId;
  likes: Types.ObjectId[];
}

const commentSchema = new Schema({
  body: { type: String, required: true },
  articleId: { type: mongoose.Types.ObjectId, required: true },
  created: { type: Date, required: true },
  updated: { type: Date, required: true },
  authorId: { type: mongoose.Types.ObjectId, required: true },
  likes: [mongoose.Types.ObjectId],
});

commentSchema.plugin(uniquerValidator);
export default mongoose.model(config.tableNames.comments, commentSchema);
