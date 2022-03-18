import mongoose, { Schema } from "mongoose";
import uniquerValidator from "mongoose-unique-validator";
import { config } from "../shared/config";
import { IUserModel} from './user';
import {IComment} from './comment'

export interface IArticle {
    _id: mongoose.Types.ObjectId;
    title: string;
    description: string;
    body: string;
    tagList:{
        tag: string;
    },
    created: Date;
    updated: Date;
    author: IUserModel;
    comments : {
        comment: IComment;
        created: Date;
    };
    like : {
        likedBy: IUserModel;
    };
    likeCount: number;

}

const articleSchema = new Schema({
    title:{type: String, required: true},
    description:{type: String, required: false},
    body:{type: String, required: true},
    tagList:[{type: String, required:false}],
    created:{type: Date, required: true},
    updated:{type: Date, required:true},
    author: {type: mongoose.Types.ObjectId,
        ref: "IUserModel", required: true},
    comments: [
        {comment:{type: mongoose.Types.ObjectId,
        ref: "IComment", required: false},    
        }

    ],
    like: [
        {likedBy:{type: mongoose.Types.ObjectId,
        ref: "IUserModel", required:false},
        created: Date,
        }
    ],
    likeCount:{type: Number,default:0, required: false}
});


articleSchema.plugin(uniquerValidator);

export default mongoose.model(config.tableNames.articles, articleSchema);
