import express from "express";
import { getBoardsByUserId } from "../controllers/board.controller.js";
// import { test } from "../controllers/user.controller";
// 创建一个新的路由实例
const boardRouter = express.Router();
boardRouter.get('/:userId', getBoardsByUserId);
export default boardRouter;