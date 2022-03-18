import { Types } from "mongoose";
import Article, { IArticle } from "../models/article";

interface CreateArticleProps {
    title: string;
    body: string;
    authorId: Types.ObjectId;
    tags: string[];
}

interface UpdateArticleProps {
    id: string;
    title: string;
    body: string;
}

export const createArticle = async(newArticle: CreateArticleProps) => {
    const article: IArticle = {
        ...newArticle,
        _id: new Types.ObjectId(),
        updated: new Date(),
        created: new Date(),
        comments: [],
        likes: [],
    };

    return Article.create(article);
};

export const fetchArticlesByAuthorId = async(id: string) => {
    return Article.find({authorId: new Types.ObjectId(id)});
};

export const fetchArticlesById = async(id: string) => {
    return Article.find({_id: new Types.ObjectId(id)});
};

export const updateArticle = async(update: UpdateArticleProps) => {
    return Article.updateOne({
        _id: new Types.ObjectId(update.id),
        title: update.title,
        body: update.body,
        updated: new Date()
    });
};

export const deleteArticle = async (id: string) => {
    // delete comments
    return Article.deleteOne({_id: new Types.ObjectId(id)});
};