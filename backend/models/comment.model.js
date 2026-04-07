import { Schema } from "mongoose";
import mongoose from "mongoose";

const commentSchema = new Schema(
    {
        // 评论内容
        description: {
            type: String,
            required: true,
        },
        // 关联的 Pin
        pin: {
            type: Schema.Types.ObjectId,
            ref: "Pin",
            required: true,
        },
        // 关联的用户
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);
const Comment = mongoose.model("Comment", commentSchema);
// 导出 Comment 模型
export default Comment;