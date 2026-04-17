import express from "express";
import { getUserByUserName, registerUser, loginUser, logoutUser, followUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
// 创建一个新的路由实例
const userRouter = express.Router();
/**
 * 注册新用户
 */
userRouter.post("/auth/register", registerUser);
/**
 * 用户登录
 */
userRouter.post("/auth/login", loginUser);
/**
 * 用户登出
 */
userRouter.post("/auth/logout", logoutUser);
/**
 * 获取用户信息
 */
userRouter.get("/:username", getUserByUserName);
/**
 * 跟随用户
 */
userRouter.post('/follow/:username', verifyToken, followUser);
export default userRouter;