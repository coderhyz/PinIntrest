import express from "express";
import User from "../models/user.model.js";
import { getUserByUserName, registerUser, loginUser, logoutUser } from "../controllers/user.controller.js";
import bcrypt from "bcryptjs";
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
export default userRouter;