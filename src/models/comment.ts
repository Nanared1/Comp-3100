import mongoose, { Schema, ObjectId } from "mongoose";
import uniquerValidator from "mongoose-unique-validator";
import { config } from "../shared/config";

export interface IComment {
  _id: mongoose.Types.ObjectId;
  body: string;
  articleId: ObjectId;
  created: Date;
  updated: Date;
  authorId: ObjectId;
  likes: ObjectId[];
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
