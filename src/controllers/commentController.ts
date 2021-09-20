import { getRepository } from "typeorm"
import { User } from "../entity/User"
import { Article } from "../entity/Article"
import { Comment } from "../entity/Comment"



export const getAllComments = async (req, res) => {
    const commentRepository = getRepository(Comment)
    const comment = await commentRepository.find();
    return res.json(comment);
}

export const commentsById = async (req, res) => {
    const commentRepository = getRepository(Comment)
    const results = await commentRepository.findOne({id : req.params.article_id});
    return res.send(results);
}

export const updateComment = async (req, res) => {
    const commentRepository = getRepository(Comment)
    const comment = await commentRepository.findOne({id :req.params.comment_id});
    commentRepository.merge(comment, req.body);
    const results = await commentRepository.save(comment);
    return res.send(results);
}

export const deleteComment = async (req, res) => {
    const commentRepository = getRepository(Comment)
    const results = await commentRepository.delete({id: req.params.comment_id});
    return res.send(results);
}
export const getCommFromArt = async (req, res) => {
    const commentRepository = getRepository(Comment)
    const result = await commentRepository.findOne({id: req.params.articles_id})
    return res.send(result);
}

export const createComment = async (req, res) => {
    const commentRepository = getRepository(Comment)
    const { content } = req.body
    const user = await getRepository(User).findOne({id: req.user.id});
    if(!user) req.status(400).send("User not found")
    const article = await getRepository(Article).findOne({id: req.params.article_id});
    if(!article) res.status(404).send("Article not found")
    const comment = commentRepository.create({content, user_id: user.id, article_id: article.id});
    console.log(comment)
    const result = await commentRepository.save(comment);
    console.log(result)
    return res.send(result);

    
}

export const commFromUser = async (req, res) => {
    const commentRepository = getRepository(Comment)
    const result = await commentRepository.findOne({id: req.params.user_id})
    return res.send(result);
}

