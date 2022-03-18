import mongoose, { Schema } from "mongoose";
import uniquerValidator from "mongoose-unique-validator";
import { config } from "../shared/config";
import { IUserModel} from './user';
import {IArticle} from './article'

export interface IComment {
    _id: mongoose.Types.ObjectId;
    Comment: string;
    ariticle: IArticle;
    tagList:{
        tag: string;
    },
    created: Date;
    updated: Date;
    author: IUserModel;
    like : {
        likedBy: IUserModel;
        created: Date;
    };
    likeCount: number;

}

const commentSchema = new Schema({
    comment:{type: String, required: true},
    article:{type: mongoose.Types.ObjectId, ref:"IComment", required: true},
    tagList:[{type: String, required:false}],
    created:{type: Date, required: true},
    updated:{type: Date, required:true},
    author: {type: mongoose.Types.ObjectId,
        ref: "IUserModel", required: true},
    like: [
        {likedBy:{type: mongoose.Types.ObjectId,
        ref: "IUserModel", required:false},
        created: Date,
        }
    ],
    likeCount:{type: Number,default:0, required: false}
});

commentSchema.plugin(uniquerValidator);
export default mongoose.model(config.tableNames.comments, commentSchema);
