import request from "../utils/request";
// 根据用户名获取用户信息
export const getUserByUserName = (username) => {
    return request.get(`/users/${username}`);
}