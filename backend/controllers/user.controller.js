import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// 注册新用户
export const registerUser = async (req, res) => {
    const { username, displayName, email, password } = req.body;
    try {
        // 检查输入是否完整
        if (!username || !displayName || !email || !password) {
            return res.status(400).json({ message: "请提供完整的注册信息！" });
        }
        // 检查用户名或邮箱是否已存在
        const existingUser = await User.findOne({
            $or:
                [
                    { email }
                ]
        });
        if (existingUser) {
            return res.status(400).json({ message: "邮箱已经存在，不可重复使用！" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // 创建新用户
        const newUser = new User({ username, displayName, email, hashedPassword: hashedPassword });
        await newUser.save();
        return res.status(201).json({ message: "用户注册成功" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
// 用户登录
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // 根据邮箱查询用户信息
        const user = await User.findOne({ email });
        // 验证邮箱
        if (!user) {
            return res.status(404).json({ message: "邮箱未找到" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
        // 验证密码        
        if (!isPasswordValid) {
            return res.status(400).json({ message: "密码不正确" });
        }
        // 登录成功，返回用户信息（不包含敏感信息）
        const { hashedPassword, ...userData } = user.toObject();
        // 生成 JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7天
            sameSite: "strict",
        });
        return res.status(200).json({ message: "登录成功", data: userData, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// 用户登出
export const logoutUser = async (req, res) => {
    res.clearCookie("token");
    // 这里可以根据实际需求清除用户的登录状态，例如删除 token 或清除 session
    res.status(200).json({ message: "用户已退出登录" });
}
// 获取用户信息
export const getUserByUserName = async (req, res) => {
    const { username } = req.params;
    // console.log(username)
    // 根据用户名查询用户信息
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).json({ message: "用户未找到" });
    }
    // console.log(user)
    const { hashedPassword, ...userData } = user.toObject(); // 从用户对象中剔除敏感信息
    return res.status(200).json({ message: "用户信息获取成功", data: userData });
}