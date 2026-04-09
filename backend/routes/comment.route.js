import express from "express";
import { getCommentsByPinId } from "../controllers/comment.controller.js";
// import { test } from "../controllers/user.controller";
// 创建一个新的路由实例
const commentRouter = express.Router();
commentRouter.get('/:pinId', getCommentsByPinId);
export default commentRouter;