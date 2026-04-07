import request from '../utils/request.js';
// 获取单个 Pin
export const getPinById = (id) => {
    return request.get(`/pins/${id}`);
}