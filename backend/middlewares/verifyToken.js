import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    // 从请求的cookie中获取token
    const token = req.cookies.token;
    // 如果没有token，返回401未授权状态码
    if (!token) return res.status(401).json({ message: "请先登录!" });
    // 验证token的有效性
    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
        if (err) {
            // 如果token无效，返回403禁止访问状态码
            return res.status(403).json({ message: "令牌无效,请重新登录!" });
        }

        req.userId = payload.userId;

        next();
    });
};