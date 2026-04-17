import jwt from "jsonwebtoken";
// 验证用户的JWT令牌中间件，确保用户已登录并且令牌有效
export const verifyToken = (req, res, next) => {
    // 从请求的cookie中获取token
    const token = req.cookies.token;
    // 如果没有token，返回401未授权状态码 请求要求用户的身份认证
    if (!token) return res.status(401).json({ message: "User Unauthorized" });
    // 验证token的有效性
    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
        if (err) {
            // 403 Forbidden 服务器理解请求客户端的请求，但是拒绝执行此请求
            return res.status(403).json({ message: "Token is invalid,请重新登录" });
        }
        // jwt的payload中包含用户的ID，将其存储在req对象中
        req.userId = payload.userId;

        next();
    });
};