import User, { IUserModel } from "../models/user";
import bcrypt from "bcrypt";
import { config } from "../shared/config";
import jsonWebToken from "jsonwebtoken";
import moment, { Moment } from "moment";

import { Types } from "mongoose";

export const signupUser = async (_user) => {
  const foundUsername = await User.find({ $or: [{ username: _user.username }, { email: _user.email }] });
  if (!foundUsername) {
    throw new Error("User already exists");
  }

  const salt: string = await bcrypt.genSalt(config.security.saltRounds);
  const password = await bcrypt.hash(_user.password, salt);

  const newUser: IUserModel = {
    _id: new Types.ObjectId(),
    email: _user.email,
    username: _user.username,
    password: password,
    name: {
      first: _user.name.first,
      last: _user.name.last,
    },
    created: new Date(),
    updated: new Date(),
    lastActiveAt: new Date(),
  } as IUserModel;

  const user = new User(newUser);
  return user.save();
};

export const loginUser = async (email, password) => {
  const user: IUserModel | any = await getUserByEmail(email)
    .then((user) => user)
    .catch((err) => {
      throw new Error("user not found");
    });

  const isPasswordMatch = await comparePassword(user.password, password);
  if (!isPasswordMatch) {
    throw new Error("Incorrect password");
  }

  return generateToken(user);
};

export const getUserById = async (id: string) => {
  return User.findById(new Types.ObjectId(id));
};

export const getUserByEmail = async (email: string) => {
  return User.findOne({ email: email });
};

export const followUser = async(userId: string, followerId: string) => {
  return User.findOneAndUpdate({
      _id: new Types.ObjectId(userId),
      followers: { $ne: new Types.ObjectId(followerId) }
  }, {
      $addToSet: {
          followers: new Types.ObjectId(followerId)
      }
  });
};

export const unfollowUser = async(userId: string, followerId: string) => {
  return User.findByIdAndUpdate({
      _id: new Types.ObjectId(userId),
  }, {
      $pull: {
          followers: new Types.ObjectId(followerId)
      }
  });
};

export const blockUser = async(userId: string, blockedUserId: string) => {
  return User.findOneAndUpdate({
      _id: new Types.ObjectId(userId),
      blockedUsers: { $ne: new Types.ObjectId(blockedUserId) }
  }, {
      $addToSet: {
          blockedUsers: new Types.ObjectId(blockedUserId)
      }
  });
};

export const unblockUser = async(userId: string, blockedUserId: string) => {
  return User.findByIdAndUpdate({
      _id: new Types.ObjectId(userId),
  }, {
      $pull: {
          blockedUsers: new Types.ObjectId(blockedUserId)
      }
  });
};

export const generateToken = (user: IUserModel): { expiresIn: number; expiresAt: Moment; token: string } => {
  const jsonUser = JSON.parse(JSON.stringify(user));
  return {
    expiresIn: config.security.tokenExpiry,
    expiresAt: moment().add(config.security.tokenExpiry, "second"),
    token: `JWT ${jsonWebToken.sign(jsonUser, config.security.privateKey, {
      algorithm: config.security.jwtAlgorithm,
      expiresIn: config.security.tokenExpiry, // in seconds,
      issuer: config.security.issuer,
      audience: config.security.audience,
      subject: jsonUser._id.toString(),
    })}`,
  };
};

const comparePassword = async function (actualPassword: string, candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, actualPassword);
  } catch (error) {
    return false;
  }
};
