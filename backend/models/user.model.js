import { Schema } from "mongoose";
import mongoose from "mongoose";

const userSchema = new Schema(
    {
        // 用户昵称
        displayName: {
            type: String,
            required: true,
        },
        // 用户名（唯一）
        username: {
            type: String,
            required: true,
        },
        // 邮箱（唯一）
        email: {
            type: String,
            required: true,
        },
        // 用户头像
        img: {
            type: String,
        },
        // 用户密码（哈希值）
        hashedPassword: {
            type: String,
            required: true,
        }
    },
    // 自动添加 时间戳字段
    { timestamps: true }
);

export default mongoose.model("User", userSchema)