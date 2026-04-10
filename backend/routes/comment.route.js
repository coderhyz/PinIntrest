import express from "express";
import { getCommentsByPinId, addComment } from "../controllers/comment.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
// import { test } from "../controllers/user.controller";
// 创建一个新的路由实例
const commentRouter = express.Router();
// 获取指定 Pin 的评论列表
commentRouter.get('/:pinId', getCommentsByPinId);
// 添加新评论
commentRouter.post('/', verifyToken, addComment);
export default commentRouter;