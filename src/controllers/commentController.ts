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
    const comment = await commentRepository.create(content);
    const result = await commentRepository.save(comment);
    return res.send(result);
}

export const commFromUser = async (req, res) => {
    const commentRepository = getRepository(Comment)
    const result = await commentRepository.findOne({id: req.params.user_id})
    return res.send(result);
}

