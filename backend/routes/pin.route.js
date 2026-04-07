import express from "express";
import { getPins, getPinById } from "../controllers/pin.controller.js";
// 创建一个新的路由实例
const pinRouter = express.Router();
// 获取所有 Pins
pinRouter.get('/', getPins);
// 获取单个 Pin 详情
pinRouter.get('/:id', getPinById);
export default pinRouter;