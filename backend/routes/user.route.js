import express from "express";
import userModel from "../models/user.model.js";
import { test } from "../controllers/user.controller.js";
import bcrypt from "bcryptjs";
// 创建一个新的路由实例
const userRouter = express.Router();
userRouter.post("/create", async (req, res) => {
    const userInformation = req.body;
    // 对用户密码进行哈希处理，增加安全性
    const hashedPassword = await bcrypt.hash(userInformation.password, 10);
    console.log(userInformation)
    // 将用户信息保存到数据库中
    await userModel.create({
        displayName: userInformation.displayName,
        username: userInformation.username,
        email: userInformation.email,
        hashedPassword
    })
    // console.log("创建用户");
    // 状态码201表示资源创建成功
    res.status(201).json({ message: "User created successfully" });
});
userRouter.get('/test', test);
export default userRouter;