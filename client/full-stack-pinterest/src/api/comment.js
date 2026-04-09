import request from "../utils/request";
// 获取所有评论
export const getCommentsByPinId = (pinId) => {
    return request.get(`/comments/${pinId}`);
};