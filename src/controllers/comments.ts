import { Types } from "mongoose";
import Comment from "../models/comment";

interface CreateCommentProps {
  body: string;
  articleId: string;
  authorId: string;
}

interface UpdateCommentProps {
  id: string;
  body: string;
}

export const createComment = async (newComment: CreateCommentProps) => {
  return Comment.create({
    body: newComment.body,
    articleId: newComment.articleId,
    authorId: newComment.authorId,
    likes: [],
    created: new Date(),
    updated: new Date(),
  });
};

export const getCommentById = async (id: string) => {
  return Comment.findOne({ _id: new Types.ObjectId(id) });
};

export const getArticleComments = async (id: string) => {
  return Comment.find({ articleId: new Types.ObjectId(id) });
};

export const updateComment = async (updatedComment: UpdateCommentProps) => {
  return Comment.updateOne({ _id: new Types.ObjectId(updatedComment.id) }, { body: updatedComment.body });
};

export const likeComment = async (userId: string, commentId: string) => {
    return Comment.findOneAndUpdate({
        _id: new Types.ObjectId(commentId),
        likes: { $ne: new Types.ObjectId(userId) }
    }, {
        $addToSet: {
            likes: new Types.ObjectId(userId)
        }
    });
};

export const unlikeComment = async (userId: string, commentId: string) => {
    return Comment.findByIdAndUpdate({
        _id: new Types.ObjectId(commentId),
    }, {
        $pull: {
            likes: new Types.ObjectId(userId)
        }
    });
};

export const deleteComment = async (id: string) => {
  return Comment.deleteOne({ _id: new Types.ObjectId(id) });
};

export const deleteAllCommentsForArticle = async (id: string) => {
    return Comment.deleteMany({ articleId: new Types.ObjectId(id) });
};
