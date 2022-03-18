import User, { IUserModel } from "../models/user";
import bcrypt from "bcrypt";
import { config } from "../shared/config";

import { Types } from "mongoose";

export const signupUser = async (req) => {
  const foundUsername = await User.find({ username: req.body.username });
  if (!foundUsername) {
    throw new Error("User already exists");
  }

  const salt: string = await bcrypt.genSalt(config.security.saltRounds);
  const password = await bcrypt.hash(req.body.password, salt);

  const newUser: IUserModel = {
    _id: new Types.ObjectId(),
    email: req.body.email,
    username: req.body.username,
    password: password,
    name: {
      first: req.body.name.first,
      last: req.body.name.last,
    },
    created: new Date(),
    updated: new Date(),
    lastActiveAt: new Date(),
  } as IUserModel;

  const user = new User(newUser);
  return user.save();
};

export const getUserById = async (id: string) => {
  return User.findById(new Types.ObjectId(id));
};

export const getUserByEmail = async (email: string) => {
  return User.findOne({ email: email });
};
