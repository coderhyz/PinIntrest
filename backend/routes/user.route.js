import express from "express";
import User from "../models/user.model.js";
import { getUserByUserName } from "../controllers/user.controller.js";
import bcrypt from "bcryptjs";
// 创建一个新的路由实例
const userRouter = express.Router();
/**
 * 创建新用户
 */
userRouter.post("/create", async (req, res) => {
    const userInformation = req.body;
    // 对用户密码进行哈希处理，增加安全性
    const hashedPassword = await bcrypt.hash(userInformation.password, 10);
    console.log(userInformation)
    // 将用户信息保存到数据库中
    await User.create({
        displayName: userInformation.displayName,
        username: userInformation.username,
        email: userInformation.email,
        hashedPassword
    })

    // 状态码201表示资源创建成功
    res.status(201).json({ message: "User created successfully" });
});
/**
 * 获取用户信息
 */
userRouter.get("/:username", getUserByUserName);
export default userRouter;