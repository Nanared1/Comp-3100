import { Types } from "mongoose";
import Article, { IArticle } from "../models/article";
import { deleteAllCommentsForArticle } from "./comments";

interface CreateArticleProps {
  title: string;
  body: string;
  authorId: string;
  tags: string[];
}

interface UpdateArticleProps {
  id: string;
  title: string;
  body: string;
}

/**
 * 
 * @param newArticle {
    * title: string;
    * body: string;
    * authorId: string;
    * tags: string[];
 * }
 * @returns a promise that contains a mongodb document or an error
 */
export const createArticle = async (newArticle: CreateArticleProps) => {
  const article: IArticle = {
    ...newArticle,
    authorId: new Types.ObjectId(newArticle.authorId),
    _id: new Types.ObjectId(),
    updated: new Date(),
    created: new Date(),
    comments: [],
    likes: [],
  };

  return Article.create(article);
};

/**
 * 
 * @param id of author. Will fetch all articles written by author.
 * @returns a promise that contains a mongodb document or an error
 */
export const fetchArticlesByAuthorId = async (id: string) => {
  return Article.find({ authorId: new Types.ObjectId(id) });
};


/**
 * 
 * @param id article id;
 * @returns return a promise with a single mongo document containing article.
 */
export const fetchArticlesById = async (id: string) => {
  return Article.find({ _id: new Types.ObjectId(id) });
};

/**
 * 
 * @param update updates to the body or title of a saved article.
 * @returns a promise with an update result of function.
 */
export const updateArticle = async (update: UpdateArticleProps) => {
  return Article.updateOne(
    {
      _id: new Types.ObjectId(update.id),
    },
    {
      title: update.title,
      body: update.body,
      updated: new Date(),
    }
  );
};

/**
 * 
 * @param id id of article to delete
 * @returns a promise with the deleted article
 */
export const deleteArticle = async (id: string) => {
  return deleteAllCommentsForArticle(id).then(() => {
    return Article.deleteOne({ _id: new Types.ObjectId(id) });
  });
};
