const express = require('express')
const router = express.Router();
import checkJWT from "../middlewares/checkJwt";
import checkRole from "../middlewares/checkRole";


const userController = require ("../controllers/userController") 
const commentController = require( "../controllers/commentController")
const articleController = require("../controllers/articleController")

//User controller 

router.get('/api/users',userController.getAllUsers)
router.post('/api/register',userController.signUp)
router.post('/api/login',userController.signIn)
router.get('/api/users/:user_id',userController.userById)
router.put('/api/users/:user_id',checkJWT,userController.updateUser)
router.delete('/api/users/:user_id',checkJWT,userController.deleteUser)

//Article controller 

router.get('/api/articles', articleController.getAllArticles)
router.get('/api/articles/:article_id', articleController.articlesById)
router.post('/api/articles',checkJWT,checkRole(["Author"]),articleController.createArticle)
router.put('/api/articles/:article_id',checkJWT,checkRole(["Author"]),articleController.updateArticle)
router.delete('/api/articles/:article_id',checkJWT,checkRole(["Author"]),articleController.deleteArticle)
router.get('/api/users/:user_id/articles', articleController.getAllArticlesFromUser)


//Comment controller

router.get('/api/comments', commentController.getAllComments)
router.get('/api/comments/:comment_id', commentController.commentsById)
router.put('/api/articles/:article_id/comments/:comment_id',checkJWT,commentController.updateComment)
router.delete('/api/comments/:comment_id',checkJWT,commentController.deleteComment)
router.get('/api/articles/:articles_id/comments', commentController.getCommFromArt)
router.post('/api/articles/:articles_id/comments',checkJWT,commentController.createComment)
router.get('/api/users/:user_id/comments', commentController.commFromUser)


export default router;
