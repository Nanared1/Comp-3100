import mongoose, { Schema } from "mongoose";
import uniquerValidator from "mongoose-unique-validator";
import { config } from "../shared/config";

export interface IUserModel extends Document {
    _id: mongoose.Types.ObjectId;
    email: string;
    password: string;
    username: string;
    name: {
        first: string;
        last: string;
    };
    followers: Types.ObjectId[];
    created: Date;
    updated: Date;
    lastActiveAt: Date;
    lastLoginIpAddress: string;
    incorrectLoginTries: number;
    loginAttempts: {
        timeAttempted: Date;
        isSuccessful: boolean;
        ipAddress: string;
    }[];
}

const userSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    name: {
        first: { type: String, required: true },
        last: { type: String },
    },
    followers: [mongoose.Types.ObjectId]
    created: { type: Date, required: true },
    updated: { type: Date, required: true },
    isActive: { type: Boolean, default: false },
    loginAttempts: [
        {
            timeAttempted: Date,
            isSuccessful: Boolean,
            ipAddress: String,
        },
    ],
    incorrectLoginTries: {
        type: Number,
        default: 0,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    lastActiveAt: Date,
    lastLoginIpAddress: String,
});

userSchema.plugin(uniquerValidator);

export default mongoose.model(config.tableNames.users, userSchema);
