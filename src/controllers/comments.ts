import { Types } from "mongoose";
import Comment, { IComment } from "../models/comment";

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
  const _comment: IComment = {
    _id: new Types.ObjectId(),
    body: newComment.body,
    articleId: new Types.ObjectId(newComment.articleId),
    authorId: new Types.ObjectId(newComment.authorId),
    likes: [],
    created: new Date(),
    updated: new Date(),
  };
  return Comment.create(_comment);
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


/**
 * 
 * @param userId id of user liking comment
 * @param commentId comment being liked
 * @returns 
 */
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
