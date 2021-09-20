import { getRepository } from "typeorm"
import { User } from "../entity/User"
import { Article } from "../entity/Article"
import { Comment } from "../entity/Comment"


export const getAllArticles = async (req, res) => {
    const articleRepository = getRepository(Article)
    const article = await articleRepository.find();
    return res.json(article);
}

export const articlesById = async (req, res) => {
    const articleRepository = getRepository(Article)
    const results = await articleRepository.findOne({id : req.params.article_id});
    return res.send(results);
}

export const createArticle = async (req, res) => {
    const { title, content } = req.body
    const articleRepository = getRepository(Article)
    const user = req.user;
    const newArticle = { title, content, author_id: user.id }
    const article = await articleRepository.create(newArticle);
    const results = await articleRepository.save(article);
    return res.send(results);
}

export const updateArticle = async (req, res) => {
    const articleRepository = getRepository(Article)
    const article = await articleRepository.findOne({id :req.params.article_id});
    articleRepository.merge(article, req.body);
    const results = await articleRepository.save(article);
    return res.send(results);
}

export const deleteArticle = async (req, res) => {
    const articleRepository = getRepository(Article)
    const results = await articleRepository.delete({id: req.params.article_id});
    console.log(results)
    return res.send(results);
}

export const getAllArticlesFromUser = async (req, res) => {
    const articleRepository = getRepository(Article)
    const result = await articleRepository.findOne({id : req.params.user_id})
    return res.send(result);

}