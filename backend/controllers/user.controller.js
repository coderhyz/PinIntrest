import User from "../models/user.model.js";
// 获取用户信息
export const getUserByUserName = async (req, res) => {
    const { username } = req.params;
    console.log(username)
    // 根据用户名查询用户信息
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    // console.log(user)
    const { hashedPassword, ...userData } = user.toObject(); // 从用户对象中剔除敏感信息
    return res.status(200).json({ message: "User information retrieved successfully", data: userData });
}