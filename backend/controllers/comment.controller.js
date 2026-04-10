import Comment from "../models/comment.model.js";
// 根据pinId获取评论列表
export const getCommentsByPinId = async (req, res) => {
    const { pinId } = req.params;
    try {
        // 根据Pin ID查询评论，并且关联查询用户信息（只获取用户名、显示名称和头像）
        const comments = await Comment.find({ pin: pinId }).populate('user', 'username displayName img').sort({ createdAt: -1 });
        res.status(200).json({ message: '获取评论信息成功', data: comments });
    } catch (error) {
        res.status(500).json({ message: '获取评论信息失败', error: error.message });
    }
};
// 新建评论
export const addComment = async (req, res) => {
    const { description, pinId } = req.body;
    // 中间件verifyToken会将用户ID存储在req.userId中
    try {
        const newComment = new Comment({
            description,
            user: req.userId,
            pin: pinId
        });
        const savedComment = await newComment.save();
        // 201状态码    表示资源创建成功
        res.status(201).json({ message: '评论添加成功', data: savedComment });
    } catch (error) {
        res.status(500).json({ message: '添加评论失败', error: error.message });
    }
};
