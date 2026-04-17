import User from "../models/user.model.js";
import Follow from "../models/follow.model.js";
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
        // 生成 JWT token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
        // 携带 token 存储在 HttpOnly cookie 中，设置过期时间为 30 天
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

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
        // 验证是否有重复用户
        if (!user) {
            return res.status(404).json({ message: "邮箱未找到" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
        // 验证密码  是否正确      
        if (!isPasswordValid) {
            return res.status(400).json({ message: "密码不正确" });
        }
        // 登录成功，返回用户信息（不包含敏感信息）
        const { hashedPassword, ...userData } = user.toObject();
        // 生成 JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        // 将 token 存储在 HttpOnly cookie 中，设置过期时间为 30 天
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30天
            sameSite: "strict",
        });
        return res.status(200).json({ message: "登录成功", data: userData });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// 用户登出
export const logoutUser = async (req, res) => {
    // 清除 token cookie
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
    // 从用户对象中剔除敏感信息
    const { hashedPassword, ...userData } = user.toObject();
    // 查询用户的粉丝数量和关注数量
    const followersCount = await Follow.countDocuments({ following: user._id });
    const followingCount = await Follow.countDocuments({ follower: user._id });
    // 从请求的cookie中获取token
    const token = req.cookies.token;
    // 如果没有token，返回用户信息和关注状态（默认为未关注）
    if (!token) {
        return res.status(200).json({ message: "用户信息获取成功", data: { ...userData, followersCount, followingCount, isFollowing: false } });
    }
    // 验证token的有效性
    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
        if (!err) {
            const isExists = await Follow.exists({
                follower: payload.userId,
                following: user._id,
            });

            return res.status(200).json({
                ...userData,
                followersCount,
                followingCount,
                isFollowing: isExists ? true : false,
            });
        }
    });
}
// 跟随用户
export const followUser = async (req, res) => {
    // 获取要关注的用户的用户名
    const { username } = req.params;
    try {
        // 1. 查找目标用户
        const user = await User.findOne({ username });
        if (req.userId === user._id.toString()) {
            return res.status(400).json({ message: "你不能关注你自己" });
        }
        // 2. 检查当前关注状态
        const isFollowing = await Follow.exists({ follower: req.userId, following: user._id });
        if (isFollowing) {
            await Follow.deleteOne({ follower: req.userId, following: user._id });
            return res.status(200).json({ message: "取消关注用户成功" });
        } else {
            const newFollow = new Follow({ follower: req.userId, following: user._id });
            await newFollow.save();
            return res.status(200).json({ message: "关注用户成功" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}