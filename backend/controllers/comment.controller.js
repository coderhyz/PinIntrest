import Comment from "../models/comment.model.js";
// 根据pinId获取评论列表
export const getCommentsByPinId = async (req, res) => {
    const { pinId } = req.params;
    try {
        // 根据Pin ID查询评论，并且关联查询用户信息（只获取用户名、显示名称和头像）
        const comments = await Comment.find({ pin: pinId }).populate('user', 'username displayName img').sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch comments', error: error.message });
    }
};
